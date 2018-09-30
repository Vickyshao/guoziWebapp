<template>
    <div class="hotel-detail">
        <gz-header
            :isTransparent="true"
            :leftIcon="icons.back"
            @left-icon-click="goBack()"
        >
            <a slot="right-icon" class="start" @click="setCollect()">
                <img :src="isCollect? icons.start : icons.notCollect" >
            </a>
            <a slot="right-icon" href="tel:400-188-0871">
                <img :src="icons.phone">
            </a>
        </gz-header>
        <!-- 轮播图 -->
        <div class="pro-banner">
            <gz-slider :options="sliderOptions" :items="sliderItems"></gz-slider>
        </div>
        <!-- 详情部分 -->
        <div class="hotel-detail-section">
            <div class="block title">
                <h2>花园酒店</h2>
                <p>五星级 <span>2015年开业</span> <span>2015年装修</span> <router-link to="/hotelFacility">查看详情/设施</router-link></p>
            </div>
            <div class="block contact">
                <p><i class="icon"><img :src="icons.proPlace"></i><span class="txt">云南省昆明市滇池度假区静海园56栋3楼</span></p>
                <p class="last"><i class="icon"><img :src="icons.phoneBlack"></i><span class="txt">0871-66666666</span></p>
            </div>
            <!-- 项目特色 -->
            <div class="block server">
                <ul class="server-list">
                    <li v-for="item in features">
                        <i class="icon"><img :src="item.iconImg"></i>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>

            <!-- 推荐列表 -->
            <div class="block recommend-hotel">
                <ul class="hotel-recommend-list">
                    <li class="item" v-for="item in hotelRecommendList" @click="showRecommendDetail()">
                        <div class="item-pic fn-left" :style="{backgroundImage: 'url('+item.coverImg+')'}"></div>
                        <div class="item-content">
                            <h3>{{item.title}}</h3>
                            <p>{{item.content}}</p>
                            <div class="price"><span>￥{{item.price}}</span> 起</div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 入住须知 -->
            <div class="block notice">
                <div class="title">入住须知</div>
                <div class="content">
                    <p>1.说走就走的旅程游记内容文字说走就走的旅程游记内容文字说走就说走就说走就，说走就走的旅程游记内容文字说走就走。</p>
                    <p>2.的旅程游记内容文字说走就说走就说走就说走就走的旅程游记旅程游记旅程游记旅程游记旅程旅程游</p>
                </div>
            </div>
        </div>
        <div class="btn">
            <router-link to="#">预订</router-link>
        </div>
        <div class="mask" v-if="show"></div>
        <div class="hide-detail" v-if="show">
            <div class="detailBad">
                <div class="close" @click="close()"><img :src="icons.lgClose" alt="a"></div>
                <h2>优质大床房</h2>
                <div class="banner">
                    <gz-slider :options="sliderOptions" :items="sliderItems"></gz-slider>
                </div>
                <div class="desc">30m² | 12楼 | 有窗 | 含双早</div>
                <div class="content">
                    <p>提供导游服务程游记内容文字说走就说走就说走就说走就走的旅程游记旅程游记旅程游记旅程提供导游服务程游记内容文字说走就说走就说走就说走就走的旅程游记旅程。</p>
                    <p>提供导游服务程游记内容文字说走就说走就说走就说走就走的旅程游记旅程游记旅程游记旅程提供导游服务程游记内容文字说走就说走就说走就说走就走的旅程游记旅程。</p>
                    <p>提供导游服务程游记内容文字说走就说走就说走就说走就走的旅程游记旅程游记旅程游记旅程提供导游服务程游记内容文字说走就说走就说走就说走就走的旅程游记旅程。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                isCollect: true,
                sliderOptions: {
                    height: '100%',
                    width: '100%',
                    showPreNextButton: false,
                    showPagination: true,
                    autoplay: 2500,
                    direction: 'horizontal',
                    lazyLoading: true,
                },
                sliderItems: [
                    {
                        url: '',
                        background: 'http://img4.cache.netease.com/photo/0010/2017-02-20/CDO06R7E50CB0010.jpg',
                    },
                    {
                        url: '',
                        background: '/public/img/projectImage.svg',
                    },
                    {
                        url: '',
                        background: 'http://img4.cache.netease.com/photo/0010/2017-02-20/CDO06R7E50CB0010.jpg',
                    },
                    {
                        url: '',
                        background: '/public/img/projectImage.svg',
                    },
                ],
                features: [
                    {
                        name: '无线网',
                        iconImg: require('../../../public/img/wifi.svg'),
                    },
                    {
                        name: '吹风机',
                        iconImg: require('../../../public/img/blower.svg'),
                    },
                    {
                        name: '电视',
                        iconImg: require('../../../public/img/tv.svg'),
                    },
                    {
                        name: '空调',
                        iconImg: require('../../../public/img/condition.svg'),
                    },
                ],
                hotelRecommendList: [
                    {
                        coverImg: '../../../public/img/recommendCover.svg',
                        title: '豪华大床房',
                        content: '30m² | 大床 | 含双早',
                        price: '188.00',
                    },
                    {
                        coverImg: '../../../public/img/recommendCover.svg',
                        title: '豪华小床房',
                        content: '20m² | 大床 | 含双早',
                        price: '138.00',
                    },
                    {
                        coverImg: '../../../public/img/recommendCover.svg',
                        title: '豪华超大床房',
                        content: '50m² | 大床 | 含双早',
                        price: '1008.00',
                    },
                ],
                icons: {
                    back: require('../../../public/img/back.svg'),
                    phone: require('../../../public/img/phone.svg'),
                    start: require('../../../public/img/start.svg'),
                    notCollect: require('../../../public/img/group-67.svg'),
                    proPlace: require('../../../public/img/proPlace.svg'),
                    phoneBlack: require('../../../public/img/phone-black.svg'),
                    lgClose: require('../../../public/img/lgClose.svg'),
                },
            };
        },
        components: {
        },
        methods: {
            showRecommendDetail() {
                this.$set(this, 'show', true);
            },
            close() {
                this.$set(this, 'show', false);
            },
            setCollect() {
                this.isCollect = !this.isCollect;
            },
            goBack() {
                this.$router.back();
            },
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';

    .hotel-detail {
        .inline-block {
            display: inline-block;
            vertical-align: top;
        }
        .text-right {
            text-align: right;
        }
        /* header样式 */
        .gz-header {
            &-right {
                .start {
                    .inline-block;
                    padding-right: 20px;
                }
            }
        }
        .arrow-left {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            margin-left: 20px;
        }
        .pro-banner {
            width: 100%;
            height: 500px;
        }
        &-section {
            padding: 0 24px;
            .icon {
                .inline-block;
                width: 47px;
                height: 47px;
                text-align: center;
                vertical-align: middle;
                img {
                    vertical-align: middle;
                }
            }
            .block {
                padding: 50px 0;
                border-bottom: 1rpx solid #ddd;
                &:last-child {
                    border-bottom: none;
                }
                &.title {
                    h2 {
                        font-size: 50dpx;
                        color: #4a4a4a;
                        padding-bottom: 50px;
                    }
                    p {
                        font-size: 24dpx;
                        line-height: 38dpx;
                        color: #999;
                        span {
                            padding-left: 20px;
                        }
                        a {
                            .inline-block;
                            padding-left: 20px;
                            color: #666;
                            text-decoration: underline;
                        }
                    }
                }
                &.contact {
                    font-size: 28dpx;
                    line-height: 38dpx;
                    color: #666;
                    .last {
                        padding-top: 24px;
                    }
                    .txt {
                        .inline-block;
                        vertical-align: -3px;
                        padding-left: 15px;
                    }
                }
                &.server {
                    padding-top: 38px;
                    font-size: 28dpx;
                    line-height: 38dpx;
                    color: #999;
                    .server-list {
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: flex-start;

                        li {
                            width: 175.5px;
                            text-align: center;
                            i {
                                img {
                                    max-width: 100%;
                                    max-height: 100%;
                                }
                            }
                            p {
                                padding-top: 15px;
                            }

                        }
                    }
                }
                &.notice {
                    .title {
                        font-size: 32dpx;
                        line-height: 38dpx;
                        color: #333;
                        padding-bottom: 24px;
                    }
                    .content {
                        p {
                            font-size: 28dpx;
                            text-align: justify;
                            line-height: 38dpx;
                            color: #666;
                        }
                    }
                }
                &.recommend-hotel {
                    .item {
                        font-size: 0;
                        padding-bottom: 46px;
                        &:last-child {
                            padding-bottom: 0;
                        }
                        &-pic {
                            .inline-block;
                            width: 150px;
                            height: 150px;
                            background-repeat: no-repeat;
                            background-position: center;
                            -webkit-background-size: cover;
                            background-size: cover;
                            /*background-image: url();*/
                        }
                        &-content {
                            .inline-block;
                            font-size: 28dpx;
                            width: 552px;
                            padding-left: 50px;
                            h3 {
                                font-size: 28dpx;
                                color: #4a4a4a;
                                padding-bottom: 17px;
                            }
                            p {
                                font-size: 24dpx;
                                line-height: 38dpx;
                                color: #999;
                                padding-bottom: 17px;
                            }
                            .price {
                                text-align: right;
                                font-size: 24dpx;
                                color: #4a4a4a;
                                span {
                                    font-size: 40dpx;
                                }
                            }


                        }
                    }
                }
            }
        }
        .btn {
            padding: 60px 24px;
            border-top: 1rpx solid #ddd;
            a {
                .inline-block;
                width: 100%;
                height: 90px;
                line-height: 90px;
                font-size: 32dpx;
                color: #fff;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                text-align: center;
                background: #ff4847;
                &:visited,&:hover,&:active {
                    opacity: .7;
                }
            }
        }
        .mask {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.7);
        }
        .hide-detail {
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 4;
            width: 100%;
            padding-bottom: 100px;
            background: #fff;
            .detailBad {
                position: relative;
                .close {
                    position: absolute;
                    top: 50px;
                    left: 24px;
                    z-index: 5;
                }
                h2 {
                    width: 100%;
                    padding: 50px 0;
                    font-size: 32dpx;
                    color: #333;
                    text-align: center;
                }
                .banner {
                    width: 100%;
                    height: 350px;
                    background: #000;
                }
                .desc {
                    padding: 24px 24px 43px;
                    font-size: 28dpx;
                    line-height: 38dpx;
                    color: #666;
                }
                .content {
                    padding: 0 24px;
                    p {
                        font-size: 28dpx;
                        line-height: 34dpx;
                        color: #999;
                        padding-bottom: 43px;
                        text-align: justify;
                    }
                }

            }
        }

    }
</style>
