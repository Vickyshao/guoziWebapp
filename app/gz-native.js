(function (global) {
    const callbacks = {};
    const events = {};

    let index = 0;
    global.gzNative = {
        __nativeCall(id, error, param) {
            const callback = callbacks[id];
            delete callbacks[id];
            if (typeof callback === 'function') {
                callback(error, param);
            }
        },
        __callNative(name, param, callback) {
            if (typeof callback === 'function') {
                index++;
                callbacks[index] = callback;
            }

            const newParam = JSON.stringify({
                name,
                callbackId: typeof callback === 'function' ? index : -1,
                param,
            });

            if (global.__gzAndroid) {
                global.__gzAndroid.postMessage(newParam);
            } else if (global.webkit) {
                window.webkit.messageHandlers.gziOS.postMessage(newParam);
            }
        },
        __onEvent(name, handler) {
            if (name && handler && typeof handler === 'function') {
                const list = events[name] || (events[name] = []);
                list.push(handler);
            }
        },
        __clearEvent(name) {
            if (name) {
                delete events[name];
            }
        },
        __fireEvent(name, event) {
            const list = events[name];
            if (list) {
                list.forEach((func) => {
                    func(event);
                });
            }
        },
        on(name, handler) {
            gzNative.__onEvent(name, handler);
        },
        off(name) {
            gzNative.__clearEvent(name);
        },
    };

    function addApis() {
        Array.prototype.slice.apply(arguments).forEach((method) => {
            global.gzNative[method] = function (callParam) {
                return new Promise((res, rej) => {
                    global.gzNative.__callNative(method, callParam, (error, result) => {
                        if (error !== null) {
                            rej({
                                error,
                                result,
                            });
                        } else {
                            res(result);
                        }
                    });
                });
            };
        });
    }

    addApis('wechatPay', 'aliPay', 'getGeolocation', 'openLocationSetting', 'selectPhoto', 'selectMultiplePhotos', 'openUrl', 'appVersion', 'socialShare',
        'logEnterPage', 'logExitPage', 'logSignIn', 'logSignOut', 'logEvent',
    );
}(window));
