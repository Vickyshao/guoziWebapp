const touristList = state => state.touristList;
const tourist = (state, getters) => id => (
    getters.touristList.find((item => item.id.toString() === id.toString()))
);

export default {
    touristList,
    tourist,
};
