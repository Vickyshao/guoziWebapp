import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SYNC_SESSION,
    SAVE_LOGIN_INFO,
    SET_PHONE_FOR_RESET_PASSWORD,
    CLEAR_PHONE_FOR_RESET_PASSWORD,
    SET_REVISE_PASSWORD,
} from '../../mutation-types';

const initState = {
    userId: null,
    sessionId: null,
    phone: null,
    loginInfo: {},
    phoneForResetPassword: null,
};

const mutations = {
    [SIGN_IN_SUCCESS](state, { userId, sessionId, phone }) {
        Vue.set(state, 'userId', userId);
        Vue.set(state, 'sessionId', sessionId);
        Vue.set(state, 'phone', phone);
    },
    [SIGN_OUT](state) {
        Vue.set(state, 'userId', null);
        Vue.set(state, 'sessionId', null);
        Vue.set(state, 'phone', null);
    },
    [SYNC_SESSION](state, { userId, sessionId, phone }) {
        Vue.set(state, 'userId', userId);
        Vue.set(state, 'sessionId', sessionId);
        Vue.set(state, 'phone', phone);
    },
    [SAVE_LOGIN_INFO](state, data) {
        Vue.set(state, 'loginInfo', data);
    },
    [SET_PHONE_FOR_RESET_PASSWORD](state, { phone }) {
        Vue.set(state, 'phoneForResetPassword', phone);
    },
    [SET_REVISE_PASSWORD](state, data) {
        Vue.set(state, 'phoneForResetPassword', data);
    },
    [CLEAR_PHONE_FOR_RESET_PASSWORD](state) {
        Vue.set(state, 'phoneForResetPassword', null);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
