import addressService from '../../../service/tourist-service';
import {
    SET_TOURIST_LIST,
    ADD_TOURIST,
    UPDATE_TOURIST,
    DELETE_TOURIST,
} from '../../mutation-types';

const actions = {
    getTouristList: (
        { commit },
    ) => addressService.getTouristList().then((res = {}) => {
        commit(SET_TOURIST_LIST, res.data);
        return Promise.resolve();
    }),
    addTourist: (
        { commit },
        data,
    ) => addressService.addTourist(data).then((res = {}) => {
        commit(ADD_TOURIST, res.data);
        return Promise.resolve(res.data);
    }),
    updateTourist: (
        { commit },
        { id, data },
    ) => addressService.updateTourist(id, data).then((res = {}) => {
        commit(UPDATE_TOURIST, res.data);
        return Promise.resolve(res.data);
    }),
    deleteTourist: (
        { commit },
        id,
    ) => addressService.deleteTourist(id).then(() => {
        commit(DELETE_TOURIST, id);
        return Promise.resolve();
    }),
};

export default actions;
