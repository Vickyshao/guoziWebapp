import Vue from 'vue';

const getHomeBanner = () => Vue.axios.get('/home/banner');
const getHotPlay = () => Vue.axios.get('/home/hot-play');
const getHotCar = () => Vue.axios.get('/home/hot-car');
const getAdvertising = () => Vue.axios.get('/home/advertising');
const getProjectType = () => Vue.axios.get('/home/project-type');

export default {
    getHomeBanner,
    getHotPlay,
    getHotCar,
    getAdvertising,
    getProjectType,
};
