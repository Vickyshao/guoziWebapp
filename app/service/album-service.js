import Vue from 'vue';

const getProjectAlbum = id => Vue.axios.get(`project/project-campsite/${id}/pictures`);
const getCarAlbum = id => Vue.axios.get(`/touring-car/${id}/pictures`);

export default {
    getProjectAlbum,
    getCarAlbum,
};
