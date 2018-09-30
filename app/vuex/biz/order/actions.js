import orderService from '../../../service/order-service';
import {
    MY_ORDER_LIST,
    FC_ORDER_DETAIL,
    YW_ORDER_DETAIL,
    SET_SPECIAL_REQUIREMENT,
    CANCEL_REASON,
    OTHER_INFO,
} from '../../mutation-types';


const getMyOrder = ({ commit }, queryCondition) =>
orderService.getMyOrder(queryCondition).then((res) => {
    commit(MY_ORDER_LIST,
        { data: res.data.itemList,
            page: queryCondition.paging.pageIndex });
    return Promise.resolve(res.data.itemList);
});

const getFcDetail = ({ commit }, queryCondition) =>
orderService.getFcDetail(queryCondition).then((res) => {
    commit(SET_SPECIAL_REQUIREMENT, res.data.specialDemand);
    commit(FC_ORDER_DETAIL, res.data);
    return Promise.resolve(res.data);
});

const getYwDetail = ({ commit }, queryCondition) =>
 orderService.getYwDetail(queryCondition).then((res) => {
     commit(SET_SPECIAL_REQUIREMENT, res.data.specialDemand);
     commit(YW_ORDER_DETAIL, res.data);
     return Promise.resolve(res.data);
 });

const getCancelReason = ({ commit }) =>
  orderService.getCancelReason().then((res) => {
      commit(CANCEL_REASON, res.data);
      return Promise.resolve(res.data);
  });

const getOtherInfo = ({ commit }, type) =>
orderService.getOtherInfo(type).then((res) => {
    commit(OTHER_INFO, res.data);
    return Promise.resolve(res.data);
});

const cancelFc = ({ commit }, queryCondition) =>
orderService.cancelFc(queryCondition).then(res => Promise.resolve(res.data));
const cancelYw = ({ commit }, queryCondition) =>
orderService.cancelYw(queryCondition).then(res => Promise.resolve(res.data));
const getFcId = ({ commit }, orderId) =>
orderService.getFcId(orderId).then(res => Promise.resolve(res.data));
const getYwId = ({ commit }, orderId) =>
orderService.getYwId(orderId).then(res => Promise.resolve(res.data));

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
