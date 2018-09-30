const campsiteSetting = state => state.campsiteSetting;
const projectList = state => id => state.projectList[id] || {};
const projectInfo = state => id => state.projectInfo[id] || {};
const projectBookDetail = state => state.projectBookDetail;

export default {
    campsiteSetting,
    projectList,
    projectInfo,
    projectBookDetail,
};
