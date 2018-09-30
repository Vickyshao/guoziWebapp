import CommentsService from '../../../service/comments-service';
import {
    MY_COMMENTS_LIST,
    SET_TRAVEL_ROUTE_COMMENTS,
    SET_TRAVEL_NOTES_COMMENTS,
    SET_PROJECT_COMMENTS,
    SET_TOURING_CAR_COMMENTS,
    REFRESH_COMMENTS,
} from '../../mutation-types';

const getTravelRouteComments = ({ commit }, query) =>
CommentsService.getTravelRouteComments(query).then((res) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_TRAVEL_ROUTE_COMMENTS, {
            id: query.id,
            data: res.data,
        });
    }
    return Promise.resolve(res.data);
});

const getTravelNotesComments = ({ commit }, query) =>
CommentsService.getTravelNotesComments(query).then((res) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_TRAVEL_NOTES_COMMENTS, {
            id: query.id,
            data: res.data,
        });
    }

    return Promise.resolve(res.data);
});

const addTravelRouteComment = ({ commit }, query) =>
CommentsService.addTravelRouteComment(query).then(res => Promise.resolve(res.data));

const addTravelNotesComment = ({ commit }, query) =>
CommentsService.addTravelNotesComment(query).then(res => Promise.resolve(res.data));

const getProjectComments = ({ commit }, query) =>
CommentsService.getProjectComments(query).then((res) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_PROJECT_COMMENTS, {
            id: query.projectId,
            data: res.data,
        });
    }
    return Promise.resolve(res.data);
});

const getTouringCarComments = ({ commit }, query) =>
CommentsService.getTouringCarComments(query).then((res) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_TOURING_CAR_COMMENTS, {
            id: query.touringCarId,
            data: res.data,
        });
    }
    return Promise.resolve(res.data);
});

const refreshComments = ({ commit }, { type, query }) => {
    const action = `get${type.replace(/^[a-z]/, c => c.toUpperCase())}Comments`;
    const id = (type === 'project' || type === 'touringCar') ? `${type}Id` : 'id';
    return CommentsService[action](query).then((res) => {
        if (res.data.itemList && res.data.itemList.length) {
            commit(REFRESH_COMMENTS, {
                type,
                id: query[id],
                data: res.data,
            });
        }
        return Promise.resolve(res.data);
    });
};

const getMyComments = ({ commit }, query) =>
CommentsService.getMyComments(query).then((res) => {
    commit(MY_COMMENTS_LIST, {
        data: res.data.itemList,
        page: query.paging.pageIndex,
    });
    return Promise.resolve(res.data);
});

const commentYw = ({ commit }, query) =>
CommentsService.commentYw(query).then(res => Promise.resolve(res.data));

const commentFc = ({ commit }, query) =>
CommentsService.commentFc(query).then(res => Promise.resolve(res.data));


export default {
    getTravelRouteComments,
    refreshComments,
    getMyComments,
    commentYw,
    commentFc,
    getTravelNotesComments,
    addTravelRouteComment,
    addTravelNotesComment,
    getProjectComments,
    getTouringCarComments,
};
