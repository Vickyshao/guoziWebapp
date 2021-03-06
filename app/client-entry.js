import 'es6-promise/auto';
import {
    app,
    store,
} from './app';

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
/* eslint-disable no-underscore-dangle,no-undef */
store.replaceState(window.__INITIAL_STATE__);

// actually mount to DOM
app.$mount('#app');
