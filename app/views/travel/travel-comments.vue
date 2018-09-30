<template>
    <div class="travel-comments">
        <gz-header>
            <span slot="right-icon" class="right-icon" @click="openCommentPopup">评论</span>
        </gz-header>
        <gz-loadmore
                ref="loadMore"
                :autoFill="false"
                :load-bottom-fuc="fetchData"
        >
            <div class="container"> <!-- v-show="!loadingData" -->
                <div class="title">
                    {{ commentsTitle }}
                </div>
                <div class="comment-bar" v-for="item in travelCommentsData">
                    <div class="profile">
                        <img :src="item.userHeadImg || icons.default" alt="">
                        <div class="right">
                            <span class="name">{{ item.userName }}</span>
                            <span class="time">{{ formatDate(item.createAt) }}</span>
                        </div>
                    </div>
                    <div class="content">
                        评论：{{ item.content }}
                    </div>
                </div>
            </div>
        </gz-loadmore>
        <no-result v-if="noResult" :img="icons.noResult" :line="noResultTexts"></no-result>
        <gz-comment-popup
            ref="commentPopup"
            :title="commentPopupTitle"
            @submit="submitComment"
        >
        </gz-comment-popup>
        <gz-mask :show="loading">
            <gz-loading :show="loading" type="double-bounce"></gz-loading>
        </gz-mask>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapGetters, mapActions } from 'vuex';
    import CommentPopup from '../../components/biz/comment-popup';
    import NoResult from '../../components/biz/no-result';

    export default {
        data() {
            return {
                type: '',
                loadingData: true,
                noResultTexts: ['暂无评论哦～'],
                icons: {
                    default: require('../../../public/img/default-avator.svg'),
                    noResult: require('../../../public/img/no-comments.svg'),
                },
                loading: false,
            };
        },
        computed: {
            ...mapGetters([
                'travelRouteInfo',
                'travelNotesInfo',
                'travelRouteComments',
                'travelNotesComments',
            ]),
            commentsTitle() {
                return `${this.travelCommentsTotal}条${this.type === 'route' ? '攻略' : '游记'}评论`;
            },
            commentPopupTitle() {
                return `评论这篇${this.type === 'route' ? '攻略' : '游记'}：`;
            },
            getTravelComments() {
                return this.type === 'route' ? this.getTravelRouteComments : this.getTravelNotesComments;
            },
            addTravelComment() {
                return this.type === 'route' ? this.addTravelRouteComment : this.addTravelNotesComment;
            },
            travelInfo() {
                return this.type === 'route' ? this.travelRouteInfo : this.travelNotesInfo;
            },
            travelCommentsTotal() {
                return this.travelInfo(this.$route.params.id).commentQuantity;
            },
            travelComments() {
                return this.type === 'route' ? this.travelRouteComments : this.travelNotesComments;
            },
            travelCommentsData() {
                return this.travelComments(this.$route.params.id).data || [];
            },
            travelCommentsPage() {
                return this.travelComments(this.$route.params.id).page || {
                    index: 0,
                    size: 10,
                    total: 0,
                };
            },
            paging() {
                return {
                    pageIndex: this.travelCommentsPage.index + 1,
                    pageSize: this.travelCommentsPage.size,
                };
            },
            noResult() {
                return !this.loadingData
                    && !this.travelCommentsPage.index
                    && !this.travelCommentsData.length;
            },
        },
        methods: {
            ...mapActions([
                'getTravelRouteComments',
                'getTravelNotesComments',
                'addTravelRouteComment',
                'addTravelNotesComment',
                'refreshComments',
            ]),
            formatDate(date) {
                return moment(date).format('YYYY-MM-DD HH:mm');
            },
            openCommentPopup() {
                if (!this.$store.getters.sessionId) {
                    this.$router.push({
                        path: '/account/entry/sign-in',
                        query: {
                            back: true,
                        },
                    });
                } else {
                    this.$refs.commentPopup.open();
                }
            },
            submitComment(content) {
                this.$set(this, 'loading', true);
                setTimeout(() => {
                    this.addTravelComment({
                        id: this.$route.params.id,
                        content: this.$noEmoji(content),
                    }).then(() => {
                        this.$set(this, 'loading', false);
                        this.$notify({ message: `评论${this.type === 'route' ? '攻略' : '游记'}成功！` });
                    }).catch((error) => {
                        this.$set(this, 'loading', false);
                        this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                    });
                }, 1000);
            },
            fetchData() {
                this.$set(this, 'loadingData', true);
                this.getTravelComments({
                    id: this.$route.params.id,
                    paging: this.paging,
                }).then((data) => {
                    this.$set(this, 'loadingData', false);
                    if (!(data.itemList && data.itemList.length) && this.paging.pageIndex > 1) {
                        this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                        if (this.$refs.loadMore) this.$refs.loadMore.setBottomLoaded();
                    }
                    if (this.paging.pageIndex > 2 && this.$refs.loadMore) {
                        this.$refs.loadMore.setBottomLoaded();
                    }
                }).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
            hotUpdate() {
                this.refreshComments({
                    type: `travel${this.type.replace(/^[a-z]/, c => c.toUpperCase())}`,
                    query: {
                        id: this.$route.params.id,
                        paging: {
                            pageIndex: 1,
                            pageSize: this.paging.pageSize,
                        },
                    },
                }).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
        },
        components: {
            [CommentPopup.name]: CommentPopup,
            [NoResult.name]: NoResult,
        },
        mounted() {
            this.$set(this, 'type', this.$route.meta.type);
            if (!this.travelCommentsData.length) {
                this.fetchData();
            } else {
                this.hotUpdate();
            }
        },
    };
</script>

<style lang="less">
    .travel-comments {
        .right-icon {
            font-size: 32dpx;
            line-height: 32px;
            color: #333333;
        }
        .title {
            height: 50px;
            font-size: 50dpx;
            font-weight: 600;
            color: #4a4a4a;
            margin-bottom: 95px;
        }
        .container {
            margin-top: 135px;
            padding: 0 24px;
            .comment-bar {
                .profile {
                    display: flex;
                    height: 100px;
                    margin-bottom: 5px;
                    &>img {
                        width: 100px;
                        height: 100px;
                        border-radius: 50px;
                    }
                    .right {
                        width: 602px;
                        padding-left: 20px;
                        padding-top: 20px;
                        .name {
                            display: inline-block;
                            vertical-align: top;
                            width: 100%;
                            font-size: 38dpx;
                            font-weight: 600;
                            color: #333333;
                            overflow: hidden;
                            -ms-text-overflow: ellipsis;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .time {
                            display: inline-block;
                            vertical-align: top;
                            width: 100%;
                            font-size: 24dpx;
                            padding-top: 10px;
                            text-align: right;
                            color: #999999;
                        };
                    }
                }
                .content {
                    font-size: 24dpx;
                    color: #666666;
                    padding: 20px 0 100px 0;
                    border-bottom: solid 1rpx #dddddd;
                    margin-bottom: 50px;
                }
                &:last-child {
                    .content {
                        border-bottom: none;
                    }
                }
            }
        }
        .no-result {
            top: 380px;
            .no-result-line {
                display: block;
                width: 56%;
                margin-left: 22%;
                margin-top: 45px;
                font-size: 28dpx;
                color: #999999;
                text-align: center;
            }
        }
    }
</style>
