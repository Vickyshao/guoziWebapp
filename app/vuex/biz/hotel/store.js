import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_HOTEL_LIST,
} from '../../mutation-types';
// import Format from '../../../utilities/format';

const initState = {
    hotelList: [],
};

const mutations = {
    [SET_HOTEL_LIST]: (state, data) => {
        Vue.set(state, 'hotelList', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
