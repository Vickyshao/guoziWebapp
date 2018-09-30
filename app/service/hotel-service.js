
import Vue from 'vue';

// const projectList = data => Vue.axios.get('/project-campsite', data);
const getHotelList = queryCondition => new Promise((resolve) => {
    if (queryCondition.queryCondition.paging.pageIndex === 3) {
        resolve({
            data: [],
        });
    } else {
        resolve({
            data: [
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥289',
                    content: '大理海景别墅套房',
                },
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥129',
                    content: '大理海景别墅套房别墅套房大理海景别墅套房别墅套房大理海景别墅套房别墅套',
                },
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥99',
                    content: '大理海景',
                },
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥789',
                    content: '大理海景别墅套房别墅套房别墅',
                },
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥1234',
                    content: '大理海景别墅套房别墅套房',
                },
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥289',
                    content: '大理海景别墅套房',
                },
                {
                    srcImg: '../../../public/img/hotelCover.svg',
                    price: '￥129',
                    content: '大理海景别墅套房别墅套房大理海景别墅套房别墅套房大理海景别墅套房别墅套',
                },
            ],
        });
    }
});

const getProjectDetail = queryCondition => Vue.axios.get(`/project-campsite/${queryCondition.id}`);


export default {
    getHotelList,
    getProjectDetail,
};
