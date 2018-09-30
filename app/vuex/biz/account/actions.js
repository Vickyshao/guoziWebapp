import { cloneDeep } from 'lodash';
import moment from 'moment';
import accountService from '../../../service/account-service';

import {
    ACCOUNT_PROFILE,
    SET_ACCOUNT_PROFILE,
    DIRVER_TYPE,
    DIRVER_AGE,
    AREA_LIST,
} from '../../mutation-types';

const formatSex = (type) => {
    let result = '';
    switch (type) {
        case 0:
            result = '保密';
            break;
        case 1:
            result = '男';
            break;
        case 2:
            result = '女';
            break;
        default:
            result = '保密';
            break;
    }
    return result;
};

const getAccountProfile = ({
    commit,
}) => accountService.getAccountProfile().then((res = {}) => {
    if (res.data) {
        res.data.sex = formatSex(res.data.sex);
        res.data.birthday = res.data.birthday ? moment(res.data.birthday).format('YYYY-MM-DD') : '';
        commit(ACCOUNT_PROFILE, res.data);
    }
    return Promise.resolve(res.data);
});

const editAccountProfile = ({
    commit,
}, queryCondition) => accountService.editAccountProfile(cloneDeep(queryCondition))
    .then((res = {}) => {
        commit(SET_ACCOUNT_PROFILE, res.data);
        return Promise.resolve(res.data);
    });

const editAccountProfileAvator = ({
    commit,
}, avator) => accountService.editAccountProfileAvator(Object.assign({}, avator))
    .then((res = {}) => Promise.resolve(res.data));

const getAreaList = ({
    commit,
}, query) => accountService.getAreaList(Object.assign({}, query)).then((res = {}) => {
    commit(AREA_LIST, res.data);
    return Promise.resolve(res.data);
});

const getDriverType = ({
    commit,
}) => accountService.getDriverType().then((res = {}) => {
    commit(DIRVER_TYPE, res.data);
    return Promise.resolve(res.data);
});

const getDriverAge = ({
    commit,
}) => accountService.getDriverAge().then((res = {}) => {
    commit(DIRVER_AGE, res.data);
    return Promise.resolve(res.data);
});

const setUploadImg = () => accountService.setUploadImg()
    .then((res = {}) => Promise.resolve(res.data));


export default {
    getAccountProfile,
    editAccountProfile,
    editAccountProfileAvator,
    getAreaList,
    getDriverType,
    getDriverAge,
    setUploadImg,
};
