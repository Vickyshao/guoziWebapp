const travelRouteListPage = state => state.travelRouteList.page;
const travelRouteListData = state => state.travelRouteList.data;
const travelRouteInfo = state => id => state.travelRouteInfo[id] || {};
const travelNotesListPage = state => state.travelNotesList.page;
const travelNotesListData = state => state.travelNotesList.data;
const travelNotesInfo = state => id => state.travelNotesInfo[id] || {};

export default {
    travelRouteListPage,
    travelRouteListData,
    travelRouteInfo,
    travelNotesListPage,
    travelNotesListData,
    travelNotesInfo,
};
