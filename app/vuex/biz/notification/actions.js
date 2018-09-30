import {
    NEW_NOTICE,
    CLOSE_NOTICE,
} from '../../mutation-types';

const actions = {
    newNotice({
        commit,
    },options) {
        commit(NEW_NOTICE, options);
    },
    closeNotice({
        commit,
    }) {
        commit(CLOSE_NOTICE);
    },
};

export default actions;
