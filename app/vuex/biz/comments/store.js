import Vue from 'vue';

import actions from './actions';
import getters from './getters';
import {
    MY_COMMENTS_LIST,
    SET_TRAVEL_ROUTE_COMMENTS,
    SET_TRAVEL_NOTES_COMMENTS,
    SET_PROJECT_COMMENTS,
    SET_TOURING_CAR_COMMENTS,
    REFRESH_COMMENTS,
} from '../../mutation-types';

const initState = {
    commentsList: [],
    travelRouteComments: {},
    travelNotesComments: {},
    projectComments: {},
    touringCarComments: {},
};

const mutations = {
    [MY_COMMENTS_LIST](state, data) {
        if (data.page === 1) {
            if (data.data) {
                Vue.set(state, 'commentsList', data.data.map(item => Object.assign({}, item)));
            } else {
                Vue.set(state, 'commentsList', []);
            }
        } else {
            Vue.set(state, 'commentsList', [...state.commentsList, ...data.data.map(item => Object.assign({}, item))]);
        }
    },
    [SET_TRAVEL_ROUTE_COMMENTS](state, { id, data }) {
        if (!state.travelRouteComments[id]) {
            Vue.set(state.travelRouteComments, id, {
                page: {
                    index: 0,
                    size: 10,
                },
                data: [],
            });
        }
        const travelRouteComments = state.travelRouteComments[id];
        Vue.set(travelRouteComments.page, 'index', data.paging.currentPage);
        Vue.set(travelRouteComments.page, 'size', data.paging.pageSize);
        Vue.set(travelRouteComments.page, 'total', data.paging.total);
        Vue.set(travelRouteComments, 'data', travelRouteComments.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_TRAVEL_NOTES_COMMENTS](state, { id, data }) {
        if (!state.travelNotesComments[id]) {
            Vue.set(state.travelNotesComments, id, {
                page: {
                    index: 0,
                    size: 10,
                },
                data: [],
            });
        }
        const travelNotesComments = state.travelNotesComments[id];
        Vue.set(travelNotesComments.page, 'index', data.paging.currentPage);
        Vue.set(travelNotesComments.page, 'size', data.paging.pageSize);
        Vue.set(travelNotesComments.page, 'total', data.paging.total);
        Vue.set(travelNotesComments, 'data', travelNotesComments.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_PROJECT_COMMENTS](state, { id, data }) {
        if (!state.projectComments[id]) {
            Vue.set(state.projectComments, id, {
                page: {
                    index: 0,
                    size: 10,
                },
                data: [],
            });
        }
        const projectComments = state.projectComments[id];
        Vue.set(projectComments.page, 'index', data.paging.currentPage);
        Vue.set(projectComments.page, 'size', data.paging.pageSize);
        Vue.set(projectComments.page, 'total', data.paging.total);
        Vue.set(projectComments, 'data', projectComments.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_TOURING_CAR_COMMENTS](state, { id, data }) {
        if (!state.touringCarComments[id]) {
            Vue.set(state.touringCarComments, id, {
                page: {
                    index: 0,
                    size: 10,
                },
                data: [],
            });
        }
        const touringCarComments = state.touringCarComments[id];
        Vue.set(touringCarComments.page, 'index', data.paging.currentPage);
        Vue.set(touringCarComments.page, 'size', data.paging.pageSize);
        Vue.set(touringCarComments.page, 'total', data.paging.total);
        Vue.set(touringCarComments, 'data', touringCarComments.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [REFRESH_COMMENTS](state, { type, id, data }) {
        const comments = state[`${type}Comments`][id] || {};
        Vue.set(comments.page, 'index', data.paging.currentPage);
        Vue.set(comments.page, 'size', data.paging.pageSize);
        Vue.set(comments.page, 'total', data.paging.total);
        Vue.set(comments, 'data', data.itemList.map(item => Object.assign({}, item)));
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
