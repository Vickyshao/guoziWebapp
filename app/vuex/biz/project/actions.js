import projectService from '../../../service/project-service';

import {
    SET_PROJECT_LIST,
    SET_PROJECT_INFO,
    SET_CAMPSITE_SETTING,
} from '../../mutation-types';

const getCampsiteSetting = ({
    commit,
}) => projectService.getCampsiteSetting().then((res) => {
    commit(SET_CAMPSITE_SETTING, res.data);
    return Promise.resolve(res.data);
});

const getProjectList = ({
    commit,
}, {
    typeId, paging,
}) => projectService.getProjectList(typeId, paging).then((res) => {
    if (res.data.itemList && res.data.itemList.length) {
        commit(SET_PROJECT_LIST, {
            id: typeId,
            data: res.data,
        });
    }
    return Promise.resolve(res.data);
});

const getProjectInfo = ({
    commit,
}, id) => projectService.getProjectInfo(id).then((res) => {
    commit(SET_PROJECT_INFO, res.data);
    return Promise.resolve(res.data);
});

const getProjectId = ({
  commit,
}, code) => projectService.getProjectId(code).then(res => Promise.resolve(res.data));

export default {
    getCampsiteSetting,
    getProjectList,
    getProjectInfo,
    getProjectId,
};
