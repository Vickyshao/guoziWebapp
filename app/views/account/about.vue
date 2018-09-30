<template>
    <div class="aboutGZ">
        <gz-header
            title="关于行理"
            :isTransparent="true"
            :leftIcon="icons.back"
            @left-icon-click="goBack()"
        >
        </gz-header>
        <div class="logo"><img :src="icons.logo"></div>
        <p>
            行理（行走的理想），作为云南省国有资本运营文旅投资有限公司倾力打造的线上旅游服务平台，在云南省组织部“互联网+党建”的战略部署下，以发展智慧乡村休闲旅游为核心，助力于智慧三农建设。行理作为云南省首个以发展乡村休闲度假旅游为核心的线上旅游服务平台，我们拥有丰富的乡村旅游资源，通过房车与房车营地为切入点，为游客提供独特的房车休闲度假旅游全方位服务。
        </p>
        <p>
            国资文旅作为云南乡村旅游平台投资运营商，将遵循云南旅游产业“转型升级、提质增效”的发展主题，以推动全域旅游发展为主线，助力供给侧结构性改革的推进。拟依托四山十江优越的自然环境，因地制宜发展滇西、滇西北、滇西南、滇东北、滇中五个多业态的特色乡村旅游带，沿线建立房车营地、集装箱酒店、无排放民宿客栈和旅游特色镇，完善集特色农产品、文化、饮食于一体的农村旅游配套服务体系。
        </p>

        <!--<div class="about-link">-->
            <!--<div class="block">-->
                <!--<div class="left wechat"></div>-->
                <!--<div class="right">-->
                    <!--<div class="img"></div>-->
                    <!--<p>行理微信公众号</p>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="block">-->
                <!--<div class="left sina"></div>-->
                <!--<div class="right">-->
                    <!--<div class="img"></div>-->
                    <!--<p>行理官方微博号</p>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="footer">
            <router-link to="/account/entry/terms">《服务协议》</router-link>
            <p>Copyright © 2017 国资文旅版权所有</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                icons: {
                    back: require('../../../public/img/back-white.svg'),
                    logo: require('../../../public/img/logo-middle.png'),
                },
            };
        },
        methods: {
            goBack() {
                this.$router.back();
            },
        },
    };
</script>

<style lang="less">
    .aboutGZ {
        width: 100%;
        padding: 0 24px;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        background-image: url(/public/img/about-bg.png);
        .gz-header.transparent {
            position: static;
            background: none !important;
            color: #fff !important;
            .gz-header-left {
                img {
                    width: 33px!important;
                    height: 33px!important;
                }
            }
        }
        .inline {
            display: inline-block;
            vertical-align: top;
        }
        .logo {
            text-align: center;
            padding: 188px 0 150px;
            img {
                width: 240px;
                height: 240px;
            }
        }
        p {
            text-align: justify;
            color: #666;
            font-size: 28dpx;
            line-height: 36dpx;
            padding: 0 40px 24px;
        }
        .about-link {
            width: 100%;
            margin-top: 76px;
            padding: 0 0 50px;
            border-top: 1rpx solid #fff;
            border-bottom: 1rpx solid #fff;
            .block {
                padding-top: 50px;
                text-align: center;
                .left {
                    .inline;
                    width: 125px;
                    height: 125px;
                    margin-top: 48px;
                    background: #fff;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    background-position: center;
                    background-repeat: no-repeat;
                    -webkit-background-size: cover;
                    background-size: cover;
                    &.wechat {
                        background-image: url(/public/img/wechat.png);
                    }
                    &.sina {
                        background-image: url(/public/img/sina.png);
                    }

                }
                .right {
                    .inline;
                    width: 320px;
                    .img {
                        width: 220px;
                        height: 220px;
                        margin: 0 auto;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        background-color: #ffffff;
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                    }
                    p {
                        width: 100%;
                        text-align: center;
                        padding: 24px 0 0;
                        font-size: 28dpx;
                        color: #666;
                    }
                }
            }
        }
        .footer {
            color: #fff;
            padding: 90px 0 24px;
            text-align: center;
            a {
                color: #fff;
                font-size: 28dpx;
            }
            p {
                color: #fff;
                text-align: center;
                padding-top: 24px;
                font-size: 24dpx;
            }
        }


    }
</style>
