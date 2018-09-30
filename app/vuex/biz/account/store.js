import { cloneDeep } from 'lodash';
import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    ACCOUNT_PROFILE,
    SET_ACCOUNT_PROFILE,
    SET_ACCOUNT_PROFILE_EMAIL,
    SET_ACCOUNT_PROFILE_IDCARD,
    SET_ACCOUNT_PROFILE_REALNAME,
    DIRVER_AGE,
    DIRVER_TYPE,
    AREA_LIST,
} from '../../mutation-types';

const initState = {
    accountProfile: {},
    editAccountProfile: {},
    driverType: [],
    driverAge: [],
    areaList: [],
    sex: [{
        name: '男',
        id: 1,
    }, {
        name: '女',
        id: 2,
    }, {
        name: '保密',
        id: 3,
    }],
};

const mutations = {
    [ACCOUNT_PROFILE](state, data) {
        Vue.set(state, 'accountProfile', cloneDeep(data));
    },
    [SET_ACCOUNT_PROFILE](state, data) {
        Vue.set(state, 'editAccountProfile', cloneDeep(data));
    },
    [SET_ACCOUNT_PROFILE_EMAIL](state, data) {
        Vue.set(state.accountProfile, 'email', data);
    },
    [SET_ACCOUNT_PROFILE_IDCARD](state, data) {
        Vue.set(state.accountProfile, 'idCard', data);
    },
    [SET_ACCOUNT_PROFILE_REALNAME](state, data) {
        Vue.set(state.accountProfile, 'realName', data);
    },
    [DIRVER_AGE](state, data) {
        Vue.set(state, 'driverAge', data);
    },
    [DIRVER_TYPE](state, data) {
        Vue.set(state, 'driverType', data);
    },
    [AREA_LIST](state, data) {
        Vue.set(state, 'areaList', cloneDeep(data));
    },
};

export default {
    state: initState,
    actions,
    getters,
    mutations,
};
