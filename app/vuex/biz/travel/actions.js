import travelService from '../../../service/travel-service';
import {
    SET_TRAVEL_ROUTE_LIST,
    SET_TRAVEL_ROUTE_INFO,
    SET_TRAVEL_NOTES_LIST,
    SET_TRAVEL_NOTES_INFO,
} from '../../mutation-types';

const defaultData = {
    data: {},
};

const getTravelRouteList = ({
    commit,
}, page) => travelService.getTravelRouteList(page).then((res = defaultData) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_TRAVEL_ROUTE_LIST, res.data);
    }
    return Promise.resolve(res.data);
});

const getTravelNotesList = ({
    commit,
}, page) => travelService.getTravelNotesList(page).then((res = defaultData) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_TRAVEL_NOTES_LIST, res.data);
    }
    return Promise.resolve(res.data);
});

const getTravelRouteInfo = ({
    commit,
}, id) => travelService.getTravelRouteInfo(id).then((data) => {
    commit(SET_TRAVEL_ROUTE_INFO, data.data);
    return Promise.resolve(data.data);
});

const getTravelNotesInfo = ({
    commit,
}, id) => travelService.getTravelNotesInfo(id).then((data) => {
    commit(SET_TRAVEL_NOTES_INFO, data.data);
    return Promise.resolve(data.data);
});

export default {
    getTravelRouteList,
    getTravelNotesList,
    getTravelRouteInfo,
    getTravelNotesInfo,
};
