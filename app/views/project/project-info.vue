<template>
    <div class="project-info">
        <gz-header
                :isTransparent="true"
                :leftIcon="icons.back"
                @left-icon-click="goBack"
                :rightIcon="icons.phone"
                @right-icon-click="showTel"
        ></gz-header>
        <div class="pro-banner" @click.prevent="showAlbum">
            <gz-slider :options="sliderOptions" :items="projectBanners"></gz-slider>
        </div>
        <div class="detail-section">
            <div class="block introduce">
                <h2>{{projectData.name}}</h2>
                <div class="desc">
                    <i class="icon"><img :src="icons.proPlace"></i>
                    <span>{{projectData.address}}</span>
                </div>
            </div>
            <div class="block server">
                <ul class="server-list">
                    <li v-for="item in projectData.features">
                        <i class="icon"><img :src="item.iconImg"></i>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="block comment">
                <router-link :to="`${this.$route.fullPath}/comments`">
                    <div>{{projectData.commentTotal}}条评论
                       <span class="small">{{projectData.commentAverageScore}}分</span>
                       <span class="browser">查看全部
                            <i class="icon">
                                <img :src="icons.arrRight">
                            </i>
                       </span>
                    </div>
                </router-link>
            </div>
            <ul>
                <li class="block proPlace" v-for="(item, index) in projectData.campsiteInfo">
                    <div class="title">房车营位预订
                        <span v-if='campsiteSetting.leastAdvanceReserveDays != 0'>至少提前{{campsiteSetting.leastAdvanceReserveDays || ''}}天预订</span>
                    </div>
                    <div class="banner" :style="{ backgroundImage: `url(${item.coverImg || icons.default})`}"></div>
                    <div class="desc">
                        <span class="txt">{{item.name}} </span>
                        <span class="price"><b>￥{{item.price}}</b>/天起</span>
                    </div>
                    <ul class="feature">
                        <li v-for="item in item.featuresList">
                            <i class="icon"><img :src="icons.checkMark"></i>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <div class="text-right btn-wrap">
                        <button type="button" @click="reserve(item, index)" class="btn">预订</button>
                    </div>
                </li>
            </ul>
            <div class="block info">
                <div class="title">项目介绍</div>
                <div class="content">
                    <gz-rich-text-viewer :contents="projectRichText"></gz-rich-text-viewer>
                </div>
            </div>
            <div class="block">
                <div class="title">周边推荐</div>
                <ul class="recommend-list">
                    <li v-for="item in projectData.arounds">
                        <dl @click="showProject(item)" :data-url="item.contentUrl" v-externalLink>
                            <dt :style="{backgroundImage: `url(${item.coverImg || icons.default2})`}"></dt>
                            <dd>{{item.name}}</dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="block recommendRoute">
                <div class="title">线路推荐</div>
                <div class="banner"
                     v-for="item in projectData.lineRecommend"
                     @click="showRouteInfo(item)"
                     :data-url="item.contentUrl"
                     v-externalLink
                     :style="{ backgroundImage: `url(${item.coverImg || icons.default})` }"
                >
                    <div class="mask">
                        <h2>{{item.title}}</h2>
                        <p>{{item.subTitle}}</p>
                    </div>
                </div>
            </div>
        </div>
        <tel-mask phone="0871-65878888-3700" ref="telMask"></tel-mask>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import TelMask from '../../components/biz/tel-mask';

    export default {
        data() {
            return {
                sliderOptions: {
                    height: '100%',
                    width: '100%',
                    showPreNextButton: false,
                    showPagination: true,
                    autoplay: 2500,
                    direction: 'horizontal',
                    lazyLoading: true,
                },
                icons: {
                    back: require('../../../public/img/back-white.svg'),
                    phone: require('../../../public/img/phone.svg'),
                    start: require('../../../public/img/start.svg'),
                    default: require('../../../public/img/homesmall.svg'),
                    default2: require('../../../public/img/1to1.svg'),
                    proPlace: require('../../../public/img/proPlace.svg'),
                    arrRight: require('../../components/biz/icon/arrow-right.svg'),
                    checkMark: require('../../../public/img/check-mark.png'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'campsiteSetting',
                'projectInfo',
            ]),
            projectData() {
                return this.projectInfo(this.$route.params.id);
            },
            projectBanners() {
                const banners = this.projectData.banners;
                return banners && banners.map((item, index) => ({
//                    url: `${this.$route.fullPath}/album`,
                    background: item,
                    id: index,
                    name: index,
                }));
            },
            projectRichText() {
                const content = this.projectData.summary;
                if (content) {
                    return content.indexOf('[') > -1 ? JSON.parse(content) : [{
                        id: 0,
                        type: 'paragraph',
                        content,
                    }];
                }
                return [];
            },
        },
        methods: {
            ...mapActions([
                'getCampsiteSetting',
                'getProjectInfo',
                'getProjectId',
            ]),
            goBack() {
                this.$router.back();
            },
            showTel() {
                this.$refs.telMask.toggle();
            },
            // todo: gz-slider 组件需要更新，临时处理方案
            showAlbum() {
                this.$router.push(`${this.$route.fullPath}/album`);
            },
            reserve(item, index) {
                const query1 = {
                    price: item.price,
                    fcname: item.name,
                    projectname: this.projectData.name,
                };
                const query2 = {
                    projectId: this.$route.params.id,
                    type: index,
                };
                this.$store.commit('SET_PROJECT_BOOKDETAIL', query1);

                this.$router.push({
                    path: '/project-campsite',
                    query: query2,
                });
            },
            showProject(item) {
                if (!item.contentUrl) {
                    // todo: 后端接口需要优化
                    this.getProjectId(item.projectCode).then((id) => {
                        this.$router.push(`/project/${id}`);
                        this.hotUpdate();
                    }).catch((error) => {
                        this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                    });
                }
            },
            showRouteInfo(item) {
                if (!item.contentUrl) this.$router.push(`/travel/route/${item.id}`);
            },
            hotUpdate() {
                Promise.all([
                    this.getCampsiteSetting(),
                    this.getProjectInfo(this.$route.params.id),
                ]).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
        },
        mounted() {
            this.hotUpdate();
        },
        components: {
            [TelMask.name]: TelMask,
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';
    .project-info {
        .gz-header-right{
            img {
                width: 36px;
                height: 36px;
            }
        }
        .inline-block {
            display: inline-block;
            vertical-align: top;
        }
        .text-right {
            text-align: right;
        }
        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.4);
        }
        .arrow-left {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
        }
        .pro-banner {
            width: 100%;
            height: 500px;
            background: url('../../../public/img/group-5.svg') no-repeat;
            background-size: cover;
        }
        .detail-section {
            padding: 0 24px;
            .server{
                min-height: 189px;
            }
            .block {
                padding: 50px 0;
                border-bottom: 1rpx solid #ddd;
                h2{
                    min-height: 171px;
                }
                .desc{
                    min-height: 85px;
                }
                &:after {
                    content: '';
                    width: 100%;
                    height: 0;
                    clear: both;
                    overflow: hidden;
                    zoom: 1;
                }
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
                .title {
                    font-size: 36dpx;
                    color: #4a4a4a;
                    padding-bottom: 50px;
                    span {
                        font-size: 28dpx;
                        line-height: 38dpx;
                        color: #666;
                        padding-left: 15px;
                    }
                }
                .banner {
                    width: 100%;
                    height: 350px;
                    background-repeat: no-repeat;
                    background-position: center;
                    -webkit-background-size: cover;
                    background-size: cover;
                }
                &.introduce {
                    min-height: 224px;
                    h2 {
                        min-height:57px;
                        font-size: 50dpx;
                        padding: 0 0 24px;
                        color: #4a4a4a;
                    }
                    .desc {
                        min-height: 60px;
                        font-size: 32dpx;
                        line-height: 38dpx;
                        color: #666;
                        .icon {
                            .inline-block;
                            margin-right: 5px;
                            vertical-align: 3px;
                            img {
                                width: 47px;
                                height: 47px;
                            }
                        }
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
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            p {
                                padding-top: 15px;
                            }
                        }
                    }
                }
                &.comment {
                    min-height: 139px;
                    a {
                        div {
                            font-size: 32dpx;
                            line-height: 38dpx;
                            color: #333;
                            .small {
                                padding-left: 24px;
                            }
                            .browser {
                                float: right;
                                font-size: 24dpx;
                                color: #999999;
                                line-height: 38px;
                                img {
                                    width: 14px;
                                    height: 26px;
                                    margin-top: 4px;
                                }
                            }
                        }
                    }
                }
                &.proPlace {
                    .desc {
                        padding-top: 24px;
                        font-size: 32dpx;
                        color: #666;
                        .txt {
                            .inline-block;
                            width: 430px;
                            overflow: hidden;
                            -ms-text-overflow: ellipsis;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .price {
                            font-size: 28dpx;
                            color: #333;
                            float: right;
                            b {
                                font-size: 36dpx;
                            }
                        }
                    }
                    .feature {
                        padding-top: 24px;
                        li {
                            .inline-block;
                            padding-right: 35px;
                            .icon {
                                vertical-align: 3px;
                                img {
                                    width: 80%;
                                }
                            }
                            span {
                                padding-left: 13px;
                                font-size: 28dpx;
                                color: #999;
                            }
                        }
                    }
                    .btn-wrap {
                        padding: 10px 0;
                    }
                    .btn {
                        .inline-block;
                        width: 200px;
                        height: 60px;
                        text-align: center;
                        color: #fff;
                        font-size: 28dpx;
                        border: none;
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                        background: #ff4847;
                        &:visited,&:hover,&:active {
                            opacity: .7;
                        }
                    }
                }
                &.info {
                    width: 100%;
                    min-height: 470px;
                    .title {
                        font-size: 32dpx;
                    }
                    .content {
                        font-size: 24dpx;
                        line-height: 34dpx;
                        color: #999;
                        text-align: justify;
                    }
                }
                .recommend-list {
                    width: 100%;
                    li {
                        .inline-block;
                        font-size: 28dpx;
                        margin-right: 28.5px;
                        &:last-child {
                            margin-right: 0;
                        }
                        dl {
                            width: 215px;
                            color: #4a4a4a;
                            text-align: center;
                            dt {
                                width: 100%;
                                height: 215px;
                                overflow: hidden;
                                background-position: center;
                                background-repeat: no-repeat;
                                background-size: cover;
                            }
                            dd {
                                padding-top: 30px;
                                font-size: 28dpx;
                                color: #4a4a4a;
                            }
                        }
                    }
                }
                &.recommendRoute {
                    border-bottom: none;
                    .banner {
                        position: relative;
                        text-align: center;
                        .mask {
                            color: #ffffff;
                            h2 {
                                font-size: 36dpx;
                                padding: 128px 0 20px;
                            }
                            p {
                                font-size: 24dpx;
                                line-height: 38dpx;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
