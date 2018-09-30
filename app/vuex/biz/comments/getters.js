const getters = {
    commentsList: state => state.commentsList,
    travelRouteComments: state => id => state.travelRouteComments[id] || {},
    travelNotesComments: state => id => state.travelNotesComments[id] || {},
    projectComments: state => id => state.projectComments[id] || {},
    touringCarComments: state => id => state.touringCarComments[id] || {},
};

export default getters;
