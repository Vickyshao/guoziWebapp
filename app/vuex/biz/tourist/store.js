import { cloneDeep } from 'lodash';
import Vue from 'vue';
import getters from './getters';
import actions from './actions';
import {
    SET_TOURIST_LIST,
    ADD_TOURIST,
    UPDATE_TOURIST,
    DELETE_TOURIST,
} from '../../mutation-types';

const initState = {
    touristList: [],
};

const mutations = {
    [SET_TOURIST_LIST]: (state, data = []) => {
        Vue.set(state, 'touristList', data);
    },
    [ADD_TOURIST]: (state, data) => {
        state.touristList.push(cloneDeep(data));
    },
    [UPDATE_TOURIST]: (state, data = {}) => {
        const index = state.touristList.findIndex(item => item.id === data.id);
        Vue.set(state.touristList, index, cloneDeep(data));
    },
    [DELETE_TOURIST]: (state, id) => {
        Vue.set(state, 'touristList', state.touristList.filter(item => item.id !== id));
    },
};

export default {
    state: initState,
    getters,
    actions,
    mutations,
};
