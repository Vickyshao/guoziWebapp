<template>
    <div class="hot-camper" v-if="camperShow">
        <gz-list-group :items="camper"></gz-list-group>
        <gz-scroller :options="scrollerOptions">
            <div class="products">
                <div v-for="product in hotCar" class="product" @click="showTouringCars(product.id)">
                    <div class="product-image" :style="{ backgroundImage: `url(${product.coverImg || icons.default})` }"></div>
                    <div class="product-name">
                        <span>{{product.name}}</span>
                    </div>
                    <div class="product-desc">
                       <div class="settingInfo">
                            <span><img :src="icons.multiPeople"/>&nbsp;</span>
                            <span>{{product.suitableNumber}}人</span>
                            <span><img :src="icons.touringCar"/>&nbsp;</span>
                            <span class="car-brand">{{product.brandName}}</span>
                        </div>
                        <div class="priceInfo">
                            <span>￥</span>
                            <span class="num">{{product.price}}</span>
                            <span>起/定金</span>
                        </div>
                    </div>
                </div>
            </div>
        </gz-scroller>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ListGroup from '../../common/list-group';

    export default {
        name: 'gz-hot-camper',
        data() {
            return {
                scrollerOptions: {
                    direction: 'horizontal',
                    width: '100%',
                },
                camper: [{
                    url: '/touring-car',
                    text: '热门房车',
                    hasArrow: true,
                }],
                camperShow: false,
                icons: {
                    default: require('../../../../public/img/hotcar.svg'),
                    multiPeople: require('../../../../public/img/multi-people.svg'),
                    touringCar: require('../../../../public/img/touring-car.svg'),
                },
            };
        },
        methods: {
            ...mapActions([
                'getHotCar',
            ]),
            fetchData() {
                this.getHotCar().then(() => {
                    this.$set(this, 'camperShow', true);
                });
            },
            showTouringCars(id) {
                this.$router.push(`/touring-car/${id}`);
            },
        },
        computed: {
            ...mapGetters([
                'hotCar',
            ]),
        },
        mounted() {
            this.fetchData();
        },
        components: {
            [ListGroup.name]: ListGroup,
        },
    };
</script>

<style lang="less">
    .hot-camper {
        height: 543px;
        .products {
            width: auto;
            padding-left: 40px;
            .product {
                width: 433px;
                display: inline-block;
                vertical-align: top;
                margin-right: 25px;
                overflow: hidden;
                .product-image {
                    width: 100%;
                    height: 298px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .product-name {
                    padding: 24px 0 16px;
                    font-size: 28dpx;
                    color: #333;
                    span {
                        height: 36px;
                        line-height: 36dpx;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }
                .product-desc {
                    position: relative;
                    font-size: 22px;
                    color: #666666;
                    .settingInfo {
                        overflow: hidden;
                        img {
                            width: 22px;
                        }
                        span {
                            &:nth-child(3) {
                                margin-left: 10px;
                            }
                        }
                    }
                    .priceInfo {
                        position: absolute;
                        right: 0px;
                        bottom: 0px;
                        .num {
                            font-size: 28px;
                            font-weight: bold;
                        }
                        img {
                            width: 28px;
                        }
                    }
                }
            }
        }
    }
</style>
