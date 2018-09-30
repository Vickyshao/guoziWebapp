import Vue from 'vue';
import authorizationService from '../../../service/authorization-service';
import Cookies from '../../../utilities/cookies';
import {
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SYNC_SESSION,
    SAVE_LOGIN_INFO,
    SET_PHONE_FOR_RESET_PASSWORD,
    CLEAR_PHONE_FOR_RESET_PASSWORD,
    SET_REVISE_PASSWORD,
} from '../../mutation-types';

const syncSession = ({
    commit,
}) => {
    if (!Vue.$isServer) {
        const userId = global.localStorage.getItem('userId');
        const sessionId = global.localStorage.getItem('sessionId');
        const phone = global.localStorage.getItem('phone');
        commit(SYNC_SESSION, {
            userId,
            sessionId,
            phone,
        });
    }
};

const cleanSession = () => {
    Cookies.deleteCookie('phone');
    Cookies.deleteCookie('userId');
    Cookies.deleteCookie('sessionId');
    global.localStorage.removeItem('phone');
    global.localStorage.removeItem('userId');
    global.localStorage.removeItem('sessionId');
};

const sendVerifyCode = ({
    commit,
}, verifyCodeInfo) => authorizationService.sendVerifyCode(verifyCodeInfo);

const signUp = ({
    commit,
}, params) => authorizationService.signUp(params).then((res) => {
    commit(SIGN_IN_SUCCESS, res.data);
    return Promise.resolve(res.data);
});

const signIn = ({
    commit,
}, params) => authorizationService.signIn(params).then((res) => {
    commit(SIGN_IN_SUCCESS, res.data);
    return Promise.resolve(res.data);
});

const signOut = ({
    commit,
    dispatch,
}) => authorizationService.signOut().then((res = {}) => {
    if (!Vue.$isServer) dispatch('cleanSession');
    commit(SIGN_OUT, res.data);
    return Promise.resolve(res.data);
});

const saveLoginInfo = ({
    commit,
}, loginInfo) => commit(SAVE_LOGIN_INFO, loginInfo);

const resetPasswordStep1 = ({
    commit,
}, resetPasswordInfo) => authorizationService.resetPasswordStep1(
    resetPasswordInfo,
).then(() => {
    commit(SET_PHONE_FOR_RESET_PASSWORD, resetPasswordInfo);
    return Promise.resolve();
});

const resetPasswordStep2 = ({
    commit,
}, resetPasswordInfo) => authorizationService.resetPasswordStep2(
    resetPasswordInfo,
).then(res => Promise.resolve(res.data));

// 修改密码action
const revisePassword = ({
    commit,
}, PasswordInfo) => authorizationService.revisePassword(
    PasswordInfo,
).then(() => {
    commit(SET_REVISE_PASSWORD, PasswordInfo);
    return Promise.resolve();
});

const clearPhoneForResetPassword = ({
    commit,
}) => commit(CLEAR_PHONE_FOR_RESET_PASSWORD);

const phoneExisted = ({
    commit,
}, phone) => authorizationService.phoneExisted(
    phone,
).then(res => Promise.resolve(res.data));

export default {
    syncSession,
    cleanSession,
    sendVerifyCode,
    signUp,
    signIn,
    signOut,
    resetPasswordStep1,
    resetPasswordStep2,
    revisePassword,
    clearPhoneForResetPassword,
    saveLoginInfo,
    phoneExisted,
};
