import Vue from 'vue';

const getMyOrder = queryCondition => Vue.axios.post('/orders/my-orders', queryCondition);
const getFcDetail = queryCondition => Vue.axios.get(`/orders/touring-car/${queryCondition.id}`);
const getYwDetail = queryCondition => Vue.axios.get(`/orders/project-campsite/${queryCondition.id}`);
const cancelFc = queryCondition => Vue.axios.put('/orders/touring-car/cancel', queryCondition);
const cancelYw = queryCondition => Vue.axios.put('/orders/project-campsite/cancel', queryCondition);
const getFcId = orderId => Vue.axios.get(`/orders/touring-car/reserve-again/${orderId}`);
const getYwId = orderId => Vue.axios.get(`/orders/project-campsite/reserve-again/${orderId}`);
const getCancelReason = () => Vue.axios.get('/common/cancel-reason');
const getOtherInfo = type => Vue.axios.get(`/common/other-info/${type}`);

export default {
    getMyOrder,
    getFcDetail,
    getYwDetail,
    cancelFc,
    cancelYw,
    getFcId,
    getYwId,
    getCancelReason,
    getOtherInfo,
};
