const getters = {
    touringCarSetting: state => state.touringCarSetting,
    touringCarList: state => state.touringCarList[state.pickupPlace.id] || {},
    touringCarInfo: state => id => state.touringCarInfo[id] || {},
    touringCarDate: state => id => state.touringCarDate[id] || {},
    pickupPlaceList: state => state.pickupPlaceList,
    pickupPlace: state => state.pickupPlace,
};

export default getters;
