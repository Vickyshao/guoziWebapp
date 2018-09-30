<template>
    <div class="home">
        <div class="home-banner-wrap">
            <div class="custom-service" @click='showTel'>
                <img :src="icons.customerService">
                <p>客服</p>
            </div>
            <gz-slider :options="sliderOptions" :items="homeBanner" @customClick="openWebView" v-if="showBanner"></gz-slider>
        </div>
        <gz-hot-travel></gz-hot-travel>
        <div class="advertising"
             v-if="showAdvertising"
             :data-url="homeAdvertising[0].contentUrl"
             v-externalLink
        >
            <div :style="{ backgroundImage:`url(${homeAdvertising[0].bannerImg || icons.default})` }"></div>
        </div>
        <gz-hot-camper></gz-hot-camper>
        <div class="advertising"
             v-if="showAdvertising"
             :data-url="homeAdvertising[1].contentUrl"
             v-externalLink
        >
            <div :style="{ backgroundImage:`url(${homeAdvertising[1].bannerImg || icons.default})` }"></div>
        </div>
        <gz-hot-play class="hot-play"></gz-hot-play>
        <gz-footer-bar class="footer-bar"></gz-footer-bar>
        <tel-mask phone="0871-65878888-3700" ref="telMask"></tel-mask>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HotPlay from '../components/biz/hot-play';
import HotCamper from '../components/biz/hot-camper';
import HotTravel from '../components/biz/hot-travel';
import TelMask from '../components/biz/tel-mask';

export default {
    data() {
        return {
            sliderOptions: {
                height: '100%', // 高度
                width: '100%', // 宽度
                showPreNextButton: false, // 是否显示上一页、下一页
                showPagination: true, // 是否显示下方页码
                autoplay: 2500, // 自动播放间隔，false为不自动播放
                direction: 'horizontal', // 方向，默认'horizontal'横向，'vertical'为纵向
                lazyLoading: true,
            },
            showBanner: false,
            phone: '400 188 0871',
            showAdvertising: false,
            icons: {
                default: require('../../public/img/homesmall.svg'),
                customerService: require('../../public/img/customer-service-white.svg'),
            },
        };
    },
    methods: {
        ...mapActions([
            'getHomeBanner',
            'getAdvertising',
        ]),
        showTel() {
            this.$refs.telMask.toggle();
        },
        openWebView(data) {
            if (!global.gzNative) require('../gz-native.js');
            if (data.contentUrl) {
                global.gzNative.openUrl({
                    url: data.contentUrl,
                });
            }
        },
        fetchData() {
            this.getHomeBanner().then(() => {
                this.$set(this, 'showBanner', true);
            }).catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
            this.getAdvertising().then(() => {
                this.$set(this, 'showAdvertising', true);
            }).catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
        },
    },
    computed: {
        ...mapGetters([
            'homeBanner',
            'homeAdvertising',
        ]),
    },
    mounted() {
        this.fetchData();
    },
    components: {
        [HotPlay.name]: HotPlay,
        [HotCamper.name]: HotCamper,
        [HotTravel.name]: HotTravel,
        [TelMask.name]: TelMask,
    },
};
</script>

<style lang="less">
    .home {
        width: 100%;
        overflow: hidden;
        .home-banner-wrap {
            width: 100%;
            height: 510px;
            position: relative;
            background: url('../../public/img/group-5.svg') no-repeat;
            background-size: cover;
            .custom-service {
                width: 60px;
                height: 68px;
                position: absolute;
                z-index: 10;
                top: 15px;
                right: 30px;
                text-align: center;
                img {
                    width: 42px;
                }
                p {
                    font-size: 20dpx;
                    color: #ffffff;
                }
            }
        }
        .advertising {
            width: 100%;
            height: 300px;
            padding: 0 24px 0 40px;
            margin: 66px 0;
            div {
                height: 300px;
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
        .gz-list-group-item {
            img.go {
                margin-right: 0;
            }
        }
        .footer-bar {
            z-index: 200;
        }
        .hot-play {
            padding-bottom: 60px;
        }
        .home-mask {
            color: #585858;
            font-size: 28dpx;
            .tel-wrap {
                position: fixed;
                bottom: 0;
                width: 100%;
                padding: 0 10px 10px;
                .tel {
                    display: block;
                    color: #585858;
                    height: 102px;
                    line-height: 102px;
                    background-color: #fff;
                    text-align: center;
                }
                .cancel {
                    margin-top: 10px;
                    height: 115px;
                    line-height: 115px;
                    background-color: #fff;
                    text-align: center;
                }
            }

        }
        a.gz-list-group-item {
            border-bottom: none;
        }
    }
</style>
