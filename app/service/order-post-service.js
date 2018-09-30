import Vue from 'vue';
// touring-car
const getUserProfile = () => Vue.axios.get('/users/profile');
const getCarReturnPlaces = () => Vue.axios.get('/touring-car/return-place/search');
const postTourcarOrder = data => Vue.axios.post('/orders/touring-car/create', data);
// campsite
const getSetting = () => Vue.axios.get('/common/project-campsite/setting');
const postCampsiteOrder = data => Vue.axios.post('/orders/project-campsite/create', data);

export default {
    getUserProfile,
    getCarReturnPlaces,
    postTourcarOrder,
    getSetting,
    postCampsiteOrder,
};
