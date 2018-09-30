import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import {
    SET_HOME_BANNER,
    SET_HOT_PLAY,
    SET_HOT_CAR,
    SET_HOME_ADVERTISING,
    SET_PROJECT_TYPE,
} from '../../mutation-types';
// import Format from '../../../utilities/format';

const initState = {
    homeBanner: [],
    hotPlay: [],
    hotCar: [],
    homeAdvertising: [],
    projectType: [],
};

const mutations = {
    [SET_HOME_BANNER]: (state, data = []) => {
        const State = state;
        const resData = [];
        for (let i = 0; i < data.length; i += 1) {
            resData[i] = {
//                url: data[i].contentUrl,
                background: data[i].bannerImg,
                id: data[i].id,
                name: data[i].name,
                // todo: 暂定轮播图外链解决方案
                customClickData: {
                    contentUrl: data[i].contentUrl,
                },
            };
            // Data.data[i].background = Format.formatImg(Data[i].bannerImg, '.750-208');
        }
        State.homeBanner = resData;
    },
    [SET_HOT_PLAY]: (state, data) => {
        Vue.set(state, 'hotPlay', data);
    },
    [SET_HOT_CAR]: (state, data) => {
        Vue.set(state, 'hotCar', data);
    },
    [SET_HOME_ADVERTISING]: (state, data) => {
        Vue.set(state, 'homeAdvertising', data);
    },
    [SET_PROJECT_TYPE]: (state, data) => {
        Vue.set(state, 'projectType', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
