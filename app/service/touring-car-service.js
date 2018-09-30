import Vue from 'vue';

const getTouringCarSetting = () => Vue.axios.get('common/touring-car/setting');
const getPickupPlaceList = () => Vue.axios.get('touring-car/pick-up-place/search');
const getTouringCarList = data => Vue.axios.post('touring-car', data);
const getTouringCarInfo = id => Vue.axios.get(`touring-car/${id}`);
const getTouringCarComments = data => Vue.axios.post('comments/touring-car', data);

// todo: 放在其它地方
const revisePassword = passwordInfo => Vue.axios.put('users/authorization/modify-password', passwordInfo);

export default {
    getTouringCarSetting,
    getPickupPlaceList,
    getTouringCarList,
    getTouringCarInfo,
    getTouringCarComments,
    revisePassword,
};
