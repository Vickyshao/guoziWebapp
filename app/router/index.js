import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/home.vue';

import ProjectList from '../views/project/project-list.vue';
import ProjectInfo from '../views/project/project-info.vue';
import ProjectComments from '../views/project/project-comments.vue';
import ProjectCampsite from '../views/orders/project-campsite.vue';

import TravelList from '../views/travel/travel-list.vue';
import TravelRoute from '../views/travel/travel-route.vue';
import TravelNotes from '../views/travel/travel-notes.vue';
import TravelComments from '../views/travel/travel-comments.vue';

import TouringCarList from '../views/touring-car/car-list.vue';
import TouringCarInfo from '../views/touring-car/car-info.vue';
import TouringCarComments from '../views/touring-car/car-comments.vue';
import TouringCarOrder from '../views/orders/touring-car.vue';
import SelectTourist from '../views/orders/select-tourist.vue';

import Album from '../views/album/album.vue';

import AccountIndex from '../views/account/index.vue';
import AccountSetting from '../views/account/setting.vue';
import AccountProfile from '../views/account/profile.vue';
import AccountTouristEditor from '../views/account/settings/tourist.vue';
// import AccountTouristList from '../views/account/settings/tourist-list.vue';

import AccountEntrySignIn from '../views/account/entry/sign-in.vue';
import AccountEntrySignUp from '../views/account/entry/sign-up.vue';
import AccountEntrySignUpSuccess from '../views/account/entry/sign-up-success.vue';
import AccountEntryTerms from '../views/account/entry/terms.vue';
import OrderCancelTerms from '../views/order-cancel/cancel-terms.vue';
import AccountEntryResetPasswordStep1 from '../views/account/entry/reset-password-step1.vue';
import AccountEntryResetPasswordStep2 from '../views/account/entry/reset-password-step2.vue';
import AccountEntryResetPasswordSuccess from '../views/account/entry/reset-password-success.vue';
import AccountEntryRevisePassword from '../views/account/entry/revise-password.vue';
import AccountEntryRevisePasswordSuccess from '../views/account/entry/revise-password-success.vue';

import MyOrder from '../views/my-order/my-order.vue';
import OrderCancel from '../views/order-cancel/order-cancel.vue';
import OrderDetail from '../views/order-detail/order-detail.vue';
import OnlinePay from '../views/orders/online-pay.vue';
import OrderResult from '../views/orders/order-result.vue';
import MyComments from '../views/my-comments/my-comments.vue';
import Comments from '../views/comment/comment.vue';

import HotelList from '../views/hotel/hotel.vue';
import HotelInfo from '../views/hotel/hotel-detail.vue';
import HotelFacility from '../views/hotel/facility.vue';
import SpecialRequirement from '../views/special-requirement/special-requirement.vue';
import SpecialDemand from '../views/orders/special-demand.vue';
import Error from '../views/error/index.vue';
import Upload from '../views/test-component/fileupload.vue';

import About from '../views/account/about.vue';
import Agreement from '../views/account/about-greement.vue';
import ReserveTerms from '../views/touring-car/reserve-terms.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/home',
        component: Home,
    }, {
        path: '/about',
        component: About,
    }, {
        path: '/reverse-terms',
        component: ReserveTerms,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/about/agreement',
        component: Agreement,
    }, {
        path: '/projects/:id',
        component: ProjectList,
    }, {
        path: '/project/:id',
        component: ProjectInfo,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/project/:id/comments',
        component: ProjectComments,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/project/:id/album',
        component: Album,
        meta: {
            type: 'project',
        },
    }, {
        path: '/travels',
        component: TravelList,
        // meta: {
        //     scrollToTop: true,
        // },
    }, {
        path: '/travel/route/:id',
        component: TravelRoute,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/travel/route/:id/comments',
        component: TravelComments,
        meta: {
            type: 'route',
            scrollToTop: true,
        },
    }, {
        path: '/travel/notes/:id',
        component: TravelNotes,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/travel/notes/:id/comments',
        component: TravelComments,
        meta: {
            type: 'notes',
            scrollToTop: true,
        },
    }, {
        path: '/touring-car',
        component: TouringCarList,
    }, {
        path: '/touring-car/:id',
        component: TouringCarInfo,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/touring-car/:id/comments',
        component: TouringCarComments,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/touring-car/:id/album',
        component: Album,
        meta: {
            type: 'car',
        },
    }, {
        path: '/touring-car-order',
        component: TouringCarOrder,
        meta: {
            requiresAuth: true,
            scrollToTop: true,
        },
    }, {
        path: '/account/orders',
        component: MyOrder,
        meta: {
            requiresAuth: true,
            scrollToTop: true,
        },
    }, {
        path: '/order-detail',
        component: OrderDetail,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/order-cancel',
        component: OrderCancel,
    }, {
        path: '/order-cancel/terms',
        component: OrderCancelTerms,
        meta: {
            scrollToTop: true,
        },
    }, {
        path: '/special-requirement',
        component: SpecialRequirement,
    }, {
        path: '/order-result',
        component: OrderResult,
    }, {
        path: '/account/comments',
        component: MyComments,
        meta: {
            requiresAuth: true,
            scrollToTop: true,
        },
    }, {
        path: '/comments',
        component: Comments,
    }, {
        path: '/account/index',
        component: AccountIndex,
    }, {
        path: '/account/profile',
        component: AccountProfile,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/account/setting',
        component: AccountSetting,
    // }, {
    //     path: '/account/tourist',
    //     component: AccountTouristList,
    //     meta: {
    //         requiresAuth: true,
    //     },
    }, {
        path: '/account/tourist',
        component: AccountTouristEditor,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/account/tourist/:id',
        component: AccountTouristEditor,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/account/tourists',
        component: SelectTourist,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/account/entry/sign-in',
        component: AccountEntrySignIn,
    }, {
        path: '/account/entry/sign-up',
        component: AccountEntrySignUp,
    }, {
        path: '/account/entry/sign-up-success',
        component: AccountEntrySignUpSuccess,
    }, {
        path: '/account/entry/terms',
        component: AccountEntryTerms,
    }, {
        path: '/account/entry/reset-password-step1',
        component: AccountEntryResetPasswordStep1,
    }, {
        path: '/account/entry/reset-password-step2',
        component: AccountEntryResetPasswordStep2,
    }, {
        path: '/account/entry/reset-password-success',
        component: AccountEntryResetPasswordSuccess,
    }, {
        path: '/account/entry/revise-password',
        component: AccountEntryRevisePassword,
        meta: {
            requiresAuth: true,
        },
    }, {
        path: '/account/entry/revise-password-success',
        component: AccountEntryRevisePasswordSuccess,
    }, {
        path: '/project-campsite',
        component: ProjectCampsite,
        meta: {
            requiresAuth: true,
            scrollToTop: true,
        },
    }, {
        path: '/special-demand',
        component: SpecialDemand,
    }, {
        path: '/online-pay',
        component: OnlinePay,
    }, {
        path: '/hotel/list',
        component: HotelList,
    }, {
        path: '/hotel/info',
        component: HotelInfo,
    }, {
        path: '/hotel/facility',
        component: HotelFacility,
    }, {
        path: '/album',
        component: Album,
    }, {
        path: '/upload',
        component: Upload,
    }, {
        path: '/error/:id',
        component: Error,
    }],
    scrollBehavior(to) {
        if (to.matched.some(m => m.meta.scrollToTop)) {
            return {
                x: 0,
                y: 0,
            };
        }
        return false;
    },
});
