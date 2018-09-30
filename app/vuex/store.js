import Vue from 'vue';
import Vuex from 'vuex';

import authorizationStore from './biz/authorization/store';
import touristStore from './biz/tourist/store';

import projectStore from './biz/project/store';
import albumStore from './biz/album/store';
import accountStore from './biz/account/store';
import homeStore from './biz/home/store';
import orderPostStore from './biz/order-post/store';
import hotelStore from './biz/hotel/store';
import travelStore from './biz/travel/store';
import touringCarStore from './biz/touring-car/store';
import commentStore from './biz/comments/store';
import orderStore from './biz/order/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authorization: authorizationStore,
        home: homeStore,
        project: projectStore,
        travel: travelStore,
        touringCar: touringCarStore,
        tourist: touristStore,
        album: albumStore,
        account: accountStore,
        orderPost: orderPostStore,
        comments: commentStore,
        order: orderStore,
        hotel: hotelStore,
    },
    strict: process.env.NODE_ENV !== 'production',
});
