const orderAmount = state => state.price * state.quantity;
const contactInfos = state => state.contactInfos;
const beginDate = state => state.beginDate;
const endDate = state => state.endDate;
const carBeginTime = state => state.carBeginTime;
const returnPlaceId = state => state.returnPlaceId;
const returnPlaceName = state => state.returnPlaceName;
const returnPlace = state => state.returnPlace;
const touristSelected = state => state.touristSelected;
const quantity = state => state.quantity;
const price = state => state.price;
const contactName = state => state.contactName;
const contactPhone = state => state.contactPhone;
const specialDemand = state => state.specialDemand;
const postResponse = state => state.postResponse;

export default {
    orderAmount,
    contactInfos,
    beginDate,
    endDate,
    carBeginTime,
    returnPlaceId,
    returnPlaceName,
    returnPlace,
    touristSelected,
    quantity,
    price,
    contactName,
    contactPhone,
    specialDemand,
    postResponse,
};
