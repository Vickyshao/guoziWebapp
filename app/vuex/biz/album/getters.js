const albumOptions = state => state.options;
const projectAlbum = state => id => state.album.project[id] || [];
const carAlbum = state => id => state.album.car[id] || [];

export default {
    albumOptions,
    projectAlbum,
    carAlbum,
};
