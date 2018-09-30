import orderPostService from '../../../service/order-post-service';
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

const actions = {
    setOrderQuantity({
        commit,
    }, quantity) {
        commit(SET_ORDER_QUANTITY, quantity);
    },
    setOrderCantactinfos({
        commit,
    }, cantactInfos) {
        commit(SET_ORDER_CANTACTINFOS, cantactInfos);
    },
    setOrderCampsiteDate({
        commit,
    }, date) {
        commit(SET_ORDER_CAMPSITE_DATE, date);
    },
    getOrderCantact({
        commit,
    }) {
        return new Promise((resolve, reject) => {
            orderPostService.getUserProfile()
                .then((res) => {
                    if (res.data) {
                        commit(GET_ORDER_CANTACT, res.data);
                        resolve(res.data);
                    }
                }).catch((err) => {
                    if (err.code) {
                        reject(err);
                    }
                });
        });
    },
    setOrderSpecialdemand({
        commit,
    }, specialDemand) {
        commit(SET_ORDER_SPECIALDEMAND, specialDemand);
    },
    resetOrder({
        commit,
    }) {
        commit(RESET_ORDER);
    },
    postOrderCampsite({
        commit,
    }, params) {
        return new Promise((resolve, reject) => {
            orderPostService.postCampsiteOrder(params)
                .then((res) => {
                    if (res.data) {
                        commit(SET_ORDER_RESPONSE, res.data);
                        resolve(res.data);
                    }
                }).catch((err) => {
                    if (err.code) {
                        reject(err);
                    }
                });
        });
    },
    // touring-car
    setOrderTourcarTime({
        commit,
    }, time) {
        commit(SET_ORDER_TOURCAR_TIME, time);
    },
    setOrderTourcarReturn({
        commit,
    }, data) {
        commit(SET_ORDER_TOURCAR_RETURN, data);
    },
    getOrderTourcarReturn({
        commit,
    }) {
        return new Promise((resolve, reject) => {
            orderPostService.getCarReturnPlaces()
                .then((res) => {
                    if (res.data) {
                        commit(GET_ORDER_TOURCAR_RETURN, res.data);
                        resolve(res.data);
                    }
                }).catch((err) => {
                    if (err.code) {
                        reject(err);
                    }
                });
        });
    },
    setOrderTourcarTourist({
        commit,
    }, data) {
        commit(SET_ORDER_TOURCAR_TOURIST, data);
    },
    postOrderTourcar({
        commit,
    }, params) {
        return new Promise((resolve, reject) => {
            orderPostService.postTourcarOrder(params)
                .then((res) => {
                    if (res.data) {
                        commit(SET_ORDER_RESPONSE, res.data);
                        resolve(res.data);
                    }
                }).catch((err) => {
                    if (err.code) {
                        reject(err);
                    }
                });
        });
    },
};

export default actions;
