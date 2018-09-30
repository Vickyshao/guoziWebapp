import hotelService from '../../../service/hotel-service';
import {
    SET_HOTEL_LIST,

} from '../../mutation-types';

const actions = {
    getHotelList({
        commit,
    }, queryCondition) {
        return new Promise((resolve) => {
            hotelService.getHotelList(queryCondition)
                .then((res) => {
                    commit(SET_HOTEL_LIST, res.data);
                    resolve(res.data);
                });
        });
    },


};

export default actions;
