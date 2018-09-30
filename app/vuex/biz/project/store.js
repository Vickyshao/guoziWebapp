import Vue from 'vue';
import { cloneDeep } from 'lodash';
import getters from './getters';
import actions from './actions';
import {
    SET_CAMPSITE_SETTING,
    SET_PROJECT_LIST,
    SET_PROJECT_INFO,
    SET_PROJECT_BOOKDETAIL,
} from '../../mutation-types';


const initState = {
    campsiteSetting: {},
    projectList: {},
    projectInfo: {},
    projectBookDetail: {},
};

export const mutations = {
    [SET_CAMPSITE_SETTING]: (state, setting) => {
        Vue.set(state, 'campsiteSetting', Object.assign({}, setting));
    },
    [SET_PROJECT_LIST]: (state, { id, data }) => {
        if (!state.projectList[id]) {
            Vue.set(state.projectList, id, {
                page: {
                    index: 0,
                    size: 10,
                },
                data: [],
            });
        }
        const projectList = state.projectList[id];
        Vue.set(projectList.page, 'index', data.paging.currentPage);
        Vue.set(projectList.page, 'size', data.paging.pageSize);
        Vue.set(projectList, 'data', projectList.data.concat(data.itemList.map(item => Object.assign({}, item))));
    },
    [SET_PROJECT_INFO]: (state, data) => {
        Vue.set(state.projectInfo, data.id, cloneDeep(data));
    },
    [SET_PROJECT_BOOKDETAIL]: (state, data) => {
        Vue.set(state, 'projectBookDetail', cloneDeep(data));
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
