import Vue from 'vue';

const getTravelRouteComments = data => Vue.axios.post('/comments/raider', data);
const getTravelNotesComments = data => Vue.axios.post('/comments/travel-note', data);
const addTravelRouteComment = data => Vue.axios.post('/comments/raider/create', data);
const addTravelNotesComment = data => Vue.axios.post('/comments/travel-note/create', data);

const getProjectComments = data => Vue.axios.post('/comments/project-campsite', data);
const getTouringCarComments = data => Vue.axios.post('/comments/touring-car', data);

const getMyComments = queryCondition => Vue.axios.post('/comments/my-comments/', queryCondition);
const commentYw = queryCondition => Vue.axios.post('/comments/project-campsite/create', queryCondition);
const commentFc = queryCondition => Vue.axios.post('/comments/touring-car/create', queryCondition);

export default {
    getTravelRouteComments,
    getTravelNotesComments,
    addTravelRouteComment,
    addTravelNotesComment,
    getProjectComments,
    getTouringCarComments,
    getMyComments,
    commentYw,
    commentFc,
};
