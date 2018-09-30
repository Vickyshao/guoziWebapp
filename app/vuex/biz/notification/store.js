import actions from './actions';
import getters from './getters';
import {
    NEW_NOTICE,
    CLOSE_NOTICE,
} from '../../mutation-types';


const initState = {
    show: false,
    options: {
        autoClose: false,
        content: 'notice content',
    },
};

const mutations = {
    [NEW_NOTICE](state, options) {
        state.show = true;
        state.options = options;
    },
    [CLOSE_NOTICE](state) {
        state.show = false;
        state.options = {};
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
