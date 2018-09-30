import Vue from 'vue';
const getOnlineConfiguration = () => Vue.axios.get('/online-configuration');

export default { getOnlineConfiguration };
