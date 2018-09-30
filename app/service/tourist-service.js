import Vue from 'vue';

const getTouristList = () => Vue.axios.get('users/tourist');
const addTourist = data => Vue.axios.post('users/tourist', data);
const updateTourist = (id, data) => Vue.axios.put(`users/tourist/${id}`, data);
const deleteTourist = id => Vue.axios.delete(`users/tourist/${id}`);

export default {
    getTouristList,
    addTourist,
    updateTourist,
    deleteTourist,
};
