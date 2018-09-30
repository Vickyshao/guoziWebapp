import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_PROJECT_ALBUM,
    SET_CAR_ALBUM,
} from '../../mutation-types';

const initState = {
    options: {
        columns: 2,
    },
    album: {
        project: {},
        car: {},
    },
};

export const mutations = {
    [SET_PROJECT_ALBUM]: (state, { id, data }) => {
        Vue.set(state.album.project, id, [...data]);
    },
    [SET_CAR_ALBUM]: (state, { id, data }) => {
        Vue.set(state.album.car, id, [...data]);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
