const accountProfile = state => state.accountProfile;
const accountRealName = state => state.accountProfile.realName;
const accountIdCard = state => state.accountProfile.idCard;
const accountEmail = state => state.accountProfile.accountEmail;
const editAccountProfile = state => state.editAccountProfile;
const driverType = state => state.driverType;
const driverAge = state => state.driverAge;
const areaList = state => state.areaList;
const sex = state => state.sex;


export default {
    accountProfile,
    editAccountProfile,
    accountRealName,
    accountIdCard,
    accountEmail,
    driverType,
    driverAge,
    areaList,
    sex,
};
