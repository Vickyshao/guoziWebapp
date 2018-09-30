import touringCarService from '../../../service/touring-car-service';

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

const defaultData = {
    data: {},
};

const actions = {
    getTouringCarSetting: ({
        commit,
    }) => touringCarService.getTouringCarSetting().then((res = {}) => {
        commit(SET_TOURING_CAR_SETTING, res.data);
        return Promise.resolve(res.data);
    }),
    getPickupPlaceList: ({
        commit,
    }) => touringCarService.getPickupPlaceList().then((res = {}) => {
        commit(SET_PICKUP_PLACE_LIST, res.data);
        commit(INIT_TOURING_CAR_LIST);
        return Promise.resolve(res.data);
    }),
    getTouringCarList: ({
        commit,
    }, query) => touringCarService.getTouringCarList(query).then((res = defaultData) => {
        if (res.data.itemList && res.data.itemList.length) {
            commit(SET_TOURING_CAR_LIST, res.data);
        }
        return Promise.resolve(res.data);
    }),
    getTouringCarInfo: ({
        commit,
    }, id) => touringCarService.getTouringCarInfo(id).then((res = {}) => {
        commit(SET_TOURING_CAR_INFO, res.data);
        return Promise.resolve(res.data);
    }),
    initTouringCarDate({
        commit,
    }, data) {
        commit(INIT_TOURING_CAR_DATE, data);
    },
    setTouringCarDate({
        commit,
    }, data) {
        commit(SET_TOURING_CAR_DATE, data);
    },
    setPickupPlace({
        commit,
    }, data) {
        commit(SET_PICKUP_PLACE, data);
    },
};

export default actions;
