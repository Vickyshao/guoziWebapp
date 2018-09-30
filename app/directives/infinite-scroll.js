import Vue from 'vue';

let exportObj = {};
const ctx = '@@InfiniteScroll';

if (!Vue.prototype.$isServer) {
    const getScrollEventTarget = (element) => {
        let currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
            const overflowY = getComputedStyle(currentNode).overflowY;
            if (overflowY === 'scroll' || overflowY === 'auto') {
                return currentNode;
            }
            currentNode = currentNode.parentNode;
        }

        return window;
    };

    const getVisibleHeight = (element) => {
        if (element === window) {
            return document.documentElement.clientHeight;
        }

        return element.clientHeight;
    };

    const getElementTop = (element) => {
        if (element === window) {
            return getScrollTop(window);
        }

        return element.getBoundingClientRect().top + getScrollTop(window);
    };

    const isAttached = (element) => {
        let currentNode = element.parentNode;
        while (currentNode) {
            if (currentNode.tagName === 'HTML') {
                return true;
            }
            if (currentNode.nodeType === 11) {
                return false;
            }
            currentNode = currentNode.parentNode;
        }

        return false;
    };

    const throttle = (fn, delay) => {
        let now,
            lastExec,
            timer,
            context,
            args;

        const execute = () => {
            fn.apply(context, args);
            lastExec = now;
        };

        return () => {
            context = this;
            args = arguments;
            now = Date.now();
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            if (lastExec) {
                const diff = delay - (now - lastExec);
                if (diff < 0) {
                    execute();
                } else {
                    timer = setTimeout(() => {
                        execute();
                    }, diff);
                }
            } else {
                execute();
            }
        };
    };

    let getScrollTop = (element) => {
        if (element === window) {
            return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        }

        return element.scrollTop;
    };

    let getComputedStyle = document.defaultView.getComputedStyle;

    const doBind = function() {
        if (this.binded) return;
        this.binded = true;
        const directive = this;
        const element = directive.el;
        directive.scrollEventTarget = getScrollEventTarget(element);
        directive.scrollListener = throttle(doCheck.bind(directive), 200);
        directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);
        const disabledExpr = element.getAttribute('infinite-scroll-disabled');
        let disabled = false;

        if (disabledExpr) {
            this.vm.$watch(disabledExpr, (value) => {
                directive.disabled = value;
                if (!value && directive.immediateCheck) {
                    doCheck.call(directive);
                }
            });
            disabled = Boolean(directive.vm[disabledExpr]);
        }
        directive.disabled = disabled;
        const distanceExpr = element.getAttribute('infinite-scroll-distance');
        let distance = 0;
        if (distanceExpr) {
            distance = Number(directive.vm[distanceExpr] || distanceExpr);
            if (isNaN(distance)) {
                distance = 0;
            }
        }
        directive.distance = distance;
        const immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
        let immediateCheck = true;
        if (immediateCheckExpr) {
            immediateCheck = Boolean(directive.vm[immediateCheckExpr]);
        }
        directive.immediateCheck = immediateCheck;
        if (immediateCheck) {
            doCheck.call(directive);
        }

        const eventName = element.getAttribute('infinite-scroll-listen-for-event');
        if (eventName) {
            directive.vm.$on(eventName, () => {
                doCheck.call(directive);
            });
        }
    };

    let doCheck = function(force) {
        const scrollEventTarget = this.scrollEventTarget;
        const element = this.el;
        const distance = this.distance;

        if (force !== true && this.disabled) return;
        const viewportScrollTop = getScrollTop(scrollEventTarget);
        const viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

        let shouldTrigger = false;

        if (scrollEventTarget === element) {
            shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
        } else {
            const elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

            shouldTrigger = viewportBottom + distance >= elementBottom;
        }

        if (shouldTrigger && this.expression) {
            this.expression();
        }
    };
    exportObj = {
        bind(el, binding, vnode) {
            el[ctx] = {
                el,
                vm: vnode.context,
                expression: binding.value,
            };

            const args = arguments;
            el[ctx].vm.$on('hook:mounted', () => {
                el[ctx].vm.$nextTick(() => {
                    if (isAttached(el)) {
                        doBind.call(el[ctx], args);
                    }

                    el[ctx].bindTryCount = 0;

                    var tryBind = () => {
                        if (el[ctx].bindTryCount > 10) return;
                        el[ctx].bindTryCount++;
                        if (isAttached(el)) {
                            doBind.call(el[ctx], args);
                        } else {
                            setTimeout(tryBind, 50);
                        }
                    };
                    tryBind();
                });
            });
        },

        unbind(el) {
            if (el && el[ctx] && el[ctx].scrollEventTarget) {
                el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
            }
        },
    };
}

export default exportObj;
