import Vue from 'vue';

const getTravelRouteList = data => Vue.axios.post('/play/raider', data);
const getTravelNotesList = data => Vue.axios.post('/play/travel-note', data);
const getTravelRouteInfo = id => Vue.axios.get(`/play/raider/${id}`);
const getTravelNotesInfo = id => Vue.axios.get(`/play/travel-note/${id}`);

export default {
    getTravelRouteList,
    getTravelNotesList,
    getTravelRouteInfo,
    getTravelNotesInfo,
};
