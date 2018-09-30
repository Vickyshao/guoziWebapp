import Vue from 'vue';

const getAccountProfile = () => Vue.axios.get('/users/profile'); // eslint-disable-line
const editAccountProfile = queryCondition => Vue.axios.put('/users/profile/edit', queryCondition);
const editAccountProfileAvator = avator => Vue.axios.put('/users/profile/avatar', avator);
const getAreaList = query => Vue.axios.get(`/common/regions/${query.level}/${query.code}`);
const getDriverType = () => Vue.axios.get('/common/driver-type');
const getDriverAge = () => Vue.axios.get('/common/driver-age');
const setUploadImg = () => Vue.axios.get('/common/upload-path');

export default {
    getAccountProfile,
    editAccountProfile,
    editAccountProfileAvator,
    getAreaList,
    getDriverType,
    getDriverAge,
    setUploadImg,
};
