import albumService from '../../../service/album-service';
import {
    SET_PROJECT_ALBUM,
    SET_CAR_ALBUM,
} from '../../mutation-types';

const getProjectAlbum = ({
    commit,
}, id) => albumService.getProjectAlbum(id).then((res) => {
    commit(SET_PROJECT_ALBUM, {
        id,
        data: res.data,
    });
    return Promise.resolve(res.data);
});

const getCarAlbum = ({
    commit,
}, id) => albumService.getCarAlbum(id).then((res) => {
    commit(SET_CAR_ALBUM, {
        id,
        data: res.data,
    });
    return Promise.resolve(res.data);
});

export default {
    getProjectAlbum,
    getCarAlbum,
};
