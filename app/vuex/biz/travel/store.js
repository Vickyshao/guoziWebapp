import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_TRAVEL_ROUTE_LIST,
    SET_TRAVEL_ROUTE_INFO,
    SET_TRAVEL_NOTES_LIST,
    SET_TRAVEL_NOTES_INFO,
} from '../../mutation-types';

const initState = {
    travelRouteList: {
        page: {
            index: 0,
            size: 10,
        },
        data: [],
    },
    travelRouteInfo: {},
    travelNotesList: {
        page: {
            index: 0,
            size: 10,
        },
        data: [],
    },
    travelNotesInfo: {},
};

const mutations = {
    [SET_TRAVEL_ROUTE_LIST]: (state, data) => {
        Vue.set(state.travelRouteList.page, 'index', data.paging.currentPage);
        Vue.set(state.travelRouteList.page, 'size', data.paging.pageSize);
        Vue.set(state.travelRouteList, 'data', state.travelRouteList.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_TRAVEL_ROUTE_INFO](state, data) {
        Vue.set(state.travelRouteInfo, data.id, Object.assign({}, data));
    },
    [SET_TRAVEL_NOTES_LIST]: (state, data) => {
        Vue.set(state.travelNotesList.page, 'index', data.paging.currentPage);
        Vue.set(state.travelNotesList.page, 'size', data.paging.pageSize);
        Vue.set(state.travelNotesList, 'data', state.travelNotesList.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_TRAVEL_NOTES_INFO](state, data) {
        Vue.set(state.travelNotesInfo, data.id, Object.assign({}, data));
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
