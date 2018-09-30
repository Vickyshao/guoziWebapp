import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Notify from 'gz-vue/src/components/gz-notify';
import GzMask from 'gz-vue/src/components/gz-mask';
import GzScroller from 'gz-vue/src/components/gz-scroller';
import GzSlider from 'gz-vue/src/components/gz-slider';
import GzSwiper from 'gz-vue/src/components/gz-swiper';
import GzAlert from 'gz-vue/src/components/gz-alert';
import GzCalendar from 'gz-vue/src/components/gz-calendar';
import GzGallery from 'gz-vue/src/components/gz-gallery';
import GzLoading from 'gz-vue/src/components/gz-loading';
import GzLoadmore from 'gz-vue/src/components/gz-loadmore';
import GzPicker from 'gz-vue/src/components/gz-picker';
import GzDatetimePicker from 'gz-vue/src/components/gz-datetime-picker';
import GzRichTextViewer from 'gz-vue/src/components/gz-rich-text-viewer';
import Uploader from 'gz-vue/src/components/gz-uploader';

import Directives from 'gz-vue/src/directives';

import VueAxios from 'vue-axios';
import axios from './service/custom-axios';

import App from './App.vue';
import store from './vuex/store';
import router from './router';
import * as filters from './filters';

import NoEmoji from './utilities/noEmoji';

import Header from './components/common/header';
import Footer from './components/biz/footer-bar';

Vue.use(VueAxios, axios);

Vue.use(Notify);
Vue.use(GzMask);
Vue.use(GzScroller);
Vue.use(GzSlider);
Vue.use(GzSwiper);
Vue.use(GzAlert);
Vue.use(GzCalendar);
Vue.use(GzGallery);
Vue.use(GzLoading);
Vue.use(GzLoadmore);
Vue.use(GzDatetimePicker);
Vue.use(GzPicker);
Vue.use(GzRichTextViewer);
Vue.use(Uploader);
Vue.use(NoEmoji);

Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);

Object.keys(Directives).forEach((key) => {
    Vue.directive(key.replace(/^[A-Z]/, k => k.toLowerCase()), Directives[key]);
});

if (!Vue.prototype.$isServer) {
    // window.__androidBack = function () {
    //     const primaryPath = [
    //         '/category/index',
    //         '/price-trend/index',
    //         '/account/index',
    //     ];
    //     if (primaryPath.indexOf(store.state.route.fullPath) > -1) {
    //         router.push('/home');
    //         return false;
    //     }
    //     if (store.state.route.fullPath === '/home') {
    //         return true;
    //     }
    //     router.back();
    //     return false;
    // };
}

Vue.axios.interceptors.request.use(config => Object.assign({}, config, {
    headers: {
        token: store.getters.sessionId,
    },
}), error => Promise.reject(error));

Vue.axios.interceptors.response.use((res) => {
    if (res.status.toString() === '200') return Promise.resolve(res.data);
    if (res.status.toString() === '400') return Promise.reject(res.data);

    if (res.status.toString() === '401') {
        store.dispatch('cleanSession');
        router.replace('/account/entry/sign-in');
    } else if (res.status.toString() === '502') {
        Notify({
            message: '服务异常502',
        });
    } else if (res.status.toString() === '504') {
        Notify({
            message: '服务异常504',
        });
    } else {
        router.replace(`/error/${res.status}`);
    }
    return Promise.reject();
}, (error) => {
    if (error.code === 'ECONNABORTED') {
        router.replace('/error/timeout');
    }
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        next({
            path: '/home',
        });
    } else if (!Vue.prototype.$isServer && to.matched.some(record => record.meta.requiresAuth)) {
        /* eslint-env browser */
        const sessionId = localStorage && localStorage.getItem('sessionId');
        const userId = localStorage && localStorage.getItem('userId');
        if (!sessionId || !userId) {
            next({
                path: '/account/entry/sign-in',
                query: {
                    goto: to.fullPath,
                },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

router.afterEach(
    () => {},
);
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// register global utility filters.
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
    router,
    store,
    ...App,
});

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export {
    app,
    router,
    store,
};
