
import Vue from 'vue';

const getCampsiteSetting = () => Vue.axios.get('/common/project-campsite/setting');
const getProjectList = (typeId, paging) => Vue.axios.post(`project/${typeId}/project-campsite`, paging);
const getProjectInfo = id => Vue.axios.get(`/project/project-campsite/${id}`);
const getProjectId = code => Vue.axios.get(`/project/get-project-id/${code}`);

export default {
    getCampsiteSetting,
    getProjectList,
    getProjectInfo,
    getProjectId,
};
