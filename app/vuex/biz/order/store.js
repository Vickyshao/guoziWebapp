import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    MY_ORDER_LIST,
    FC_ORDER_DETAIL,
    YW_ORDER_DETAIL,
    SET_SPECIAL_REQUIREMENT,
    SET_ORDER_SCROLLY,
    SET_CANCEL_ORDER_DETAIL,
    CANCEL_REASON,
    SET_IS_COMMENT,
    OTHER_INFO,
} from '../../mutation-types';

const initState = {
    orderList: [],
    fcOrderDetail: {},
    ywOrderDetail: {},
    specailRequirement: '',
    orderScrollY: '',
    cancelOrderDetail: {},
    cancelReason: [],
    otherInfo: {
        content: '',
    },
};

const mutations = {
    [MY_ORDER_LIST](state, data) {
        // for (let i = 0; i < data.data.length; i += 1) {
        //     data.data[i].state = 3; // eslint-disable-line
        // }
        if (data.page === 1) {
            if (data.data) {
                Vue.set(state, 'orderList', data.data.map(item => Object.assign({}, item)));
            } else {
                Vue.set(state, 'orderList', []);
            }
        } else {
            Vue.set(state, 'orderList',
        [...state.orderList, ...data.data.map(item => Object.assign({}, item))]);
        }
    },
    [SET_IS_COMMENT](state, data) {
        const index =  state.orderList.findIndex(item => item.id == data.id); // eslint-disable-line
        // console.log(state.orderList[index]);
        if (index) {
            Vue.set(state.orderList[index], data.key, data.value);
        }
    },
    [FC_ORDER_DETAIL](state, data) {
        data.orderType = 1; // eslint-disable-line
      //  data.state = 3; // eslint-disable-line
        data.endDate = data.endDate.split('T')[0];// eslint-disable-line
        Vue.set(state, 'fcOrderDetail', Object.assign({}, data));
    },
    [YW_ORDER_DETAIL](state, data) {
        data.orderType = 2; // eslint-disable-line
        data.endDate = data.endDate.split('T')[0];// eslint-disable-line
        Vue.set(state, 'ywOrderDetail', Object.assign({}, data));
    },
    [SET_SPECIAL_REQUIREMENT](state, data) {
        Vue.set(state, 'specailRequirement', data);
    },
    [SET_ORDER_SCROLLY](state, data) {
        Vue.set(state, 'orderScrollY', data);
    },
    [SET_CANCEL_ORDER_DETAIL](state, data) {
        Vue.set(state, 'cancelOrderDetail', Object.assign({}, data));
    },
    [CANCEL_REASON](state, data) {
        for (let i = 0; i < data.length; i += 1) {
            data[i] = { // eslint-disable-line
                id: i,
                sort: data[i],
            };
        }
        Vue.set(state, 'cancelReason', data.map(item => Object.assign({}, item)));
    },
    [OTHER_INFO](state, data) {
        Vue.set(state, 'otherInfo', Object.assign({}, data));
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
