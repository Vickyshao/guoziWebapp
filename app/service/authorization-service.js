import Vue from 'vue';

const operationTypes = {
    FIND_PASSWORD: 0,
    SIGN_IN: 1,
    SIGN_UP: 2,
    MODIFY_PHONE: 3,
};

const sendVerifyCode = ({
    phone,
    operationType,
}) => Vue.axios.post('/users/authorization/send-code', {
    phone,
    operationType: operationTypes[operationType],
});

const signUp = ({
    phone,
    password,
    code,
    userName,
}) => Vue.axios.post('/users/authorization/sign-up', {
    phone,
    password,
    code,
    userName,
});

const signOut = () => Vue.axios.post('/users/authorization/sign-out');


const signIn = ({
    phone,
    password,
}) => Vue.axios.post('/users/authorization/sign-in', {
    phone,
    password,
});

const resetPasswordStep1 = ({
    phone,
    code,
}) => Vue.axios.put('/users/authorization/step1/reset-password', {
    phone,
    code,
});

const resetPasswordStep2 = ({
    phone,
    password,
}) => Vue.axios.put('/users/authorization/step2/reset-password', {
    phone,
    password,
});

const modifyPassword = passwordInfo => Vue.axios.post('/authorization/modifyPassword', passwordInfo);
const phoneExisted = phone => Vue.axios.get(`/users/authorization/exist/${phone}`);
// 修改密码接口
const revisePassword = passwordInfo => Vue.axios.put('/users/authorization/modify-password', passwordInfo);

export default {
    sendVerifyCode,
    signUp,
    signIn,
    signOut,
    resetPasswordStep1,
    resetPasswordStep2,
    modifyPassword,
    phoneExisted,
    revisePassword,
};
