<template>
    <div class="travel-route-notes">
        <div class="header">
            <ul class="tab">
                <li class="route"
                    :class="{ active: tab === 'route' }"
                    @click="switchTab('route')"
                >攻略</li>
                <li class="notes"
                    :class="{ active: tab === 'notes' }"
                    @click="switchTab('notes')"
                >游记</li>
                <hr />
            </ul>
        </div>
        <gz-loadmore
                key="travel"
                ref="loadMore"
                :autoFill="false"
                :load-bottom-fuc="fetchData"
        >
            <div class="container">
                <div class="route" v-show="tab === 'route'">
                    <div class="route-bar"
                         v-for="(item, index) in travelRouteListData"
                         :style="{ backgroundImage: `url(${item.coverImg || icons.default})` }"
                         @click="showRouteInfo(item)"
                         :data-url="item.contentUrl"
                         v-externalLink
                    >
                        <div class="mask"></div>
                        <p class="title">{{ item.title }}</p>
                        <p class="sub-title">{{ item.subTitle }}</p>
                    </div>
                </div>
                <div class="notes" v-show="tab === 'notes'">
                    <div class="notes-bar"
                         v-for="item in travelNotesListData"
                         @click="showNotesInfo(item)"
                         :data-url="item.contentUrl"
                         v-externalLink
                    >
                        <div class="text">
                            <p class="title">
                                <span class="left">
                                    {{ item.title.length > 30 ? `${item.title.slice(0,20)}...` : item.title }}
                                </span>
                            </p>
                            <p class="sub-title">
                                <!--{{ item.subTitle.length > 20 ? `${item.subTitle.slice(0,20)}...` : item.subTitle }}-->
                                {{item.subTitle}}
                            </p>
                            <span class="destination">{{ item.destination }}</span>
                            <p class="publish-date">{{ item.publishDate.slice(0, 10) }}</p>
                            <p class="reading-count">
                                <img :src="icons.reading" alt="">&nbsp;
                                <span>{{ item.readingQuantity }}</span>
                            </p>
                        </div>
                        <div class="image">
                            <img :src="item.coverImg || icons.default2" alt="">
                            <span v-if="item.isEssence">精华</span>
                        </div>
                    </div>
                </div>
            </div>
        </gz-loadmore>
        <gz-footer-bar></gz-footer-bar>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                tab: '',
                scrollTop: {
                    route: 0,
                    notes: 0,
                },
                icons: {
                    reading: require('../../../public/img/reading.svg'),
                    default: require('../../../public/img/homesmall.svg'),
                    default2: require('../../../public/img/hotplay.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'travelRouteListPage',
                'travelRouteListData',
                'travelNotesListPage',
                'travelNotesListData',
            ]),
            travelListPage() {
                return this.tab === 'route' ? this.travelRouteListPage : this.travelNotesListPage;
            },
            travelListData() {
                return this.tab === 'route' ? this.travelRouteListData : this.travelNotesListData;
            },
            getTravelList() {
                return this.tab === 'route' ? this.getTravelRouteList : this.getTravelNotesList;
            },
        },
        methods: {
            ...mapActions([
                'getTravelRouteList',
                'getTravelNotesList',
            ]),
            initData() {
                Promise.all([
                    this.getTravelRouteList({
                        pageIndex: this.travelRouteListPage.index + 1,
                        pageSize: this.travelRouteListPage.size,
                    }),
                    this.getTravelNotesList({
                        pageIndex: this.travelNotesListPage.index + 1,
                        pageSize: this.travelNotesListPage.size,
                    }),
                ]).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
            fetchData() {
                this.getTravelList({
                    pageIndex: this.travelListPage.index + 1,
                    pageSize: this.travelListPage.size,
                }).then((data) => {
                    if (!data.itemList || !data.itemList.length) {
                        this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                    }
                    if (this.$refs.loadMore) this.$refs.loadMore.setBottomLoaded();
                }).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
            switchTab(name) {
                const scrollBox = this.$isServer ? false : document.querySelector('.page-loadmore-wrapper'); // eslint-disable-line
                const scrollTop = scrollBox ? scrollBox.scrollTop : 0;
                this.$set(this.scrollTop, this.tab, scrollTop);
                this.$set(this, 'tab', name);
                setTimeout(() => {
                    if (scrollBox) scrollBox.scrollTop = this.scrollTop[name];
                }, 10);
                this.$router.replace({
                    path: this.$route.fullPath,
                    query: {
                        tab: name,
                    },
                });
            },
            showRouteInfo(item) {
                if (!item.contentUrl) this.$router.push(`/travel/route/${item.id}`);
            },
            showNotesInfo(item) {
                if (!item.contentUrl) this.$router.push(`/travel/notes/${item.id}`);
            },
        },
        mounted() {
            let tab = this.$route.query.tab;
            if (!tab) tab = 'route';
            this.$set(this, 'tab', tab);
            if (!this.travelListData.length) this.initData();
        },
    };
</script>

<style lang="less">
    .travel-route-notes {
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            border-bottom: solid 1rpx #dddddd;
            z-index: 10;
            ul.tab {
                li {
                    display: inline-block;
                    width: 50%;
                    line-height: 88px;
                    text-align: center;
                    font-size: 32dpx;
                    color: #4a4a4a;
                }
                li.active {
                    font-weight: 600;
                }
                hr {
                    height: 8px;
                    width: 125px;
                    margin-left: 125px;
                    background: #ff7271;
                    border: none;
                    transition: 0.2s ease-in-out;
                }
                .route.active ~ hr {
                    margin-left: 125px;
                }
                .notes.active ~ hr {
                    margin-left: 500px;
                }
            }
        }
        .container {
            margin: 90px 0;
            .route-bar {
                height: 350px;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #fff;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.3;
                    background-color: #000;
                };
                .title {
                    font-size: 36dpx;
                    margin-bottom: 20px;
                    height: 70px;
                    z-index: 1;
                    color: #fff;
                    font-weight: 600;
                }
                .sub-title {
                    font-size: 24dpx;
                    line-height: 38dpx;
                    z-index: 1;
                }
            }
            .notes-bar {
                display: flex;
                padding: 0 20px;
                margin-bottom: 100px;
                &:first-child {
                    padding-top: 55px;
                }
                &:last-child {
                    padding-bottom: 55px;
                }
                .text {
                    position: relative;
                    width: 50%;
                    display: inline-block;
                    padding-right: 40px;
                    .title {
                        position: relative;
                        font-size: 28dpx;
                        font-weight: 600;
                        line-height: 36px;
                        color: #4a4a4a;
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        .left {
                            display: -webkit-box;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            flex: 1;
                            font-size: 28dpx;
                            font-weight: 600;
                            line-height: 36dpx;
                            height: 80px;
                            color: #4a4a4a;
                        }
                    }
                    .sub-title {
                        font-size: 24dpx;
                        line-height: 38px;
                        color: #666666;
                        width: 100%;
                        height: 76px;
                        line-clamp: 2;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        box-orient: vertical;
                        display: -webkit-box;
                        display: box;
                        overflow: hidden;
                    }
                    .destination {
                        position: absolute;
                        bottom: 35px;
                        left: 0;
                        min-width: 60px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ff4544;
                        font-size: 20dpx;
                        font-weight: 300;
                        padding: 0 4px;
                        padding-top: 2px;
                        border-radius: 8px;
                        border: 1rpx solid #ff4544;
                    }
                    .publish-date, .reading-count {
                        position: absolute;
                        bottom: 0;
                        font-size: 20dpx;
                        font-weight: 300;
                        color: #999999;
                    }
                    .publish-date {
                        left: 0;
                    }
                    .reading-count {
                        right: 60px;
                        img {
                            position: relative;
                            top: 8px;
                            width: 30px;
                        }
                    }
                }
                .image {
                    width: 50%;
                    height: 240px;
                    display: inline-block;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 60px;
                        text-align: center;
                        font-size: 20dpx;
                        padding: 9px 0;
                        color: #ffffff;
                        background-color: #4a4a4a;
                    }
                }
            }
        }
    }
</style>
