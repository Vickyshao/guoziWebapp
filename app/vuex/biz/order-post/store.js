import { cloneDeep } from 'lodash';
import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_ORDER_QUANTITY,
    SET_ORDER_CANTACTINFOS,
    SET_ORDER_CAMPSITE_DATE,
    GET_ORDER_CANTACT,
    SET_ORDER_SPECIALDEMAND,
    RESET_ORDER,
    SET_ORDER_TOURCAR_TIME,
    SET_ORDER_TOURCAR_RETURN,
    GET_ORDER_TOURCAR_RETURN,
    SET_ORDER_TOURCAR_TOURIST,
    SET_ORDER_RESPONSE,
} from '../../mutation-types';

const initState = {
    contactInfos: [{
        name: '',
        phone: '',
    }],
    beginDate: '',
    endDate: '',
    carBeginTime: '',
    returnPlaceId: '',
    returnPlaceName: '',
    returnPlace: [],
    touristSelected: [],
    quantity: 1,
    price: '',
    contactName: '',
    contactPhone: '',
    specialDemand: '',
    postResponse: null,
};
const resetState = cloneDeep(initState);
const mutations = {
    [SET_ORDER_QUANTITY](state, quantity) {
        Vue.set(state, 'quantity', quantity);
    },
    [SET_ORDER_CANTACTINFOS](state, contactInfos) {
        Vue.set(state, 'contactInfos', cloneDeep(contactInfos));
    },
    [SET_ORDER_CAMPSITE_DATE](state, data) {
        Vue.set(state, 'beginDate', Object.assign({}, data).beginDate);
        Vue.set(state, 'endDate', Object.assign({}, data).endDate);
    },
    [GET_ORDER_CANTACT](state, data) {
        const object = Object.assign({}, data);
        if (object.realName === null) {
            object.realName = '';
        }
        Vue.set(state, 'contactName', object.realName);
        Vue.set(state, 'contactPhone', object.phone);
    },
    [SET_ORDER_SPECIALDEMAND](state, specialDemand) {
        Vue.set(state, 'specialDemand', specialDemand);
    },
    [RESET_ORDER](state) {
        Object.keys(resetState).forEach((key) => {
            Vue.set(state, key, resetState[key]);
        });
    },
    [SET_ORDER_TOURCAR_TIME](state, beginTime) {
        Vue.set(state, 'carBeginTime', beginTime);
    },
    [SET_ORDER_TOURCAR_RETURN](state, data) {
        Vue.set(state, 'returnPlaceId', Object.assign({}, data).id);
        Vue.set(state, 'returnPlaceName', Object.assign({}, data).name);
    },
    [GET_ORDER_TOURCAR_RETURN](state, data) {
        Vue.set(state, 'returnPlace', data);
    },
    [SET_ORDER_TOURCAR_TOURIST](state, data) {
        Vue.set(state, 'touristSelected', data);
    },
    [SET_ORDER_RESPONSE](state, data) {
        Vue.set(state, 'postResponse', cloneDeep(data));
    },
};
export default {
    state: initState,
    mutations,
    actions,
    getters,
};
