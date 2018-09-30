import Vue from 'vue';
import { cloneDeep } from 'lodash';
import actions from './actions';
import getters from './getters';
import {
    SET_TOURING_CAR_SETTING,
    SET_PICKUP_PLACE_LIST,
    INIT_TOURING_CAR_LIST,
    INIT_TOURING_CAR_DATE,
    SET_TOURING_CAR_LIST,
    SET_TOURING_CAR_INFO,
    SET_TOURING_CAR_DATE,
    SET_PICKUP_PLACE,
} from '../../mutation-types';

const initState = {
    touringCarSetting: {},
    pickupPlaceList: [],
    pickupPlace: {
        id: 'all',
        name: '全部',
    },
    touringCarList: {},
    touringCarInfo: {},
    touringCarDate: {},
};

export const mutations = {
    [SET_TOURING_CAR_SETTING]: (state, data = {}) => {
        Vue.set(state, 'touringCarSetting', Object.assign({}, data));
    },
    [SET_PICKUP_PLACE_LIST]: (state, data = []) => {
        Vue.set(state, 'pickupPlaceList', [{
            id: 'all',
            name: '全部',
        }, ...data.map(item => Object.assign({}, item))]);
    },
    [SET_PICKUP_PLACE](state, data = {}) {
        Vue.set(state, 'pickupPlace', Object.assign({}, data));
    },
    [INIT_TOURING_CAR_LIST]: (state) => {
        state.pickupPlaceList.forEach((place) => {
            Vue.set(state.touringCarList, place.id, {
                page: {
                    index: 0,
                    size: 10,
                },
                data: [],
            });
        });
    },
    [SET_TOURING_CAR_LIST]: (state, data) => {
        const carList = state.touringCarList[state.pickupPlace.id];
        Vue.set(carList.page, 'index', data.paging.currentPage);
        Vue.set(carList.page, 'size', data.paging.pageSize);
        Vue.set(carList, 'data', carList.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_TOURING_CAR_INFO](state, data = {}) {
        Vue.set(state.touringCarInfo, data.id, cloneDeep(data));
    },
    [INIT_TOURING_CAR_DATE](state, { id, data }) {
        if (!state.touringCarDate[id] ||
            !state.touringCarDate[id].pickup ||
            !state.touringCarDate[id].return) {
            Vue.set(state.touringCarDate, id, data);
        }
    },
    [SET_TOURING_CAR_DATE](state, { id, type, date }) {
        Vue.set(state.touringCarDate[id], type, date);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
