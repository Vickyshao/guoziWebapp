import homeService from '../../../service/home-service';
import {
    SET_HOME_BANNER,
    SET_HOT_PLAY,
    SET_HOT_CAR,
    SET_HOME_ADVERTISING,
    SET_PROJECT_TYPE,
} from '../../mutation-types';

const actions = {
    getHomeBanner: ({ commit }) => homeService.getHomeBanner().then((res = {}) => {
        commit(SET_HOME_BANNER, res.data);
        return Promise.resolve(res.data);
    }),
    getHotPlay: ({ commit }) => homeService.getHotPlay().then((res = {}) => {
        commit(SET_HOT_PLAY, res.data);
        return Promise.resolve(res.data);
    }),
    getHotCar: ({ commit }) => homeService.getHotCar().then((res = {}) => {
        commit(SET_HOT_CAR, res.data);
        return Promise.resolve(res.data);
    }),
    getAdvertising: ({ commit }) => homeService.getAdvertising().then((res = {}) => {
        commit(SET_HOME_ADVERTISING, res.data);
        return Promise.resolve(res.data);
    }),
    getProjectType: ({ commit }) => homeService.getProjectType().then((res = {}) => {
        commit(SET_PROJECT_TYPE, res.data);
        return Promise.resolve(res.data);
    }),
};

export default actions;
