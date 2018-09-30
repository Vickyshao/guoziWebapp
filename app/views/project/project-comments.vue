<template>
    <div class="project-comments">
        <gz-header></gz-header>
        <gz-loadmore :load-bottom-fuc="fetchData" :autoFill="false" ref="loadMore" :class="{ loadMoreHeight: projectCommentsData.length <= 2 }">
            <div class="comment-session">
                <h2>
                    {{ projectInfoData.commentTotal }}条点评
                    <span class="score">{{ projectInfoData.commentAverageScore }}</span>分
                </h2>
                 <ul class="comments-list">
                    <li class="comments-list-item" v-for="item in projectCommentsData">
                        <dl class="comment-item">
                            <dt>
                                <img :src="item.userHeadImg || icons.default" alt="">
                            </dt>
                            <dd>
                                <div class="name">{{ item.userName }}</div>
                                <div class="desc">
                                    <!--<span class="desc">-->
                                        <span class="score">点评：{{ item.avgScore }}分</span>
                                        <time>{{item.createAt | time(item.createAt)}}</time>
                                    <!--</span>-->
                                </div>
                                <ul class="list">
                                    <li><label>环境</label>{{ item.score1 }}</li>
                                    <li><label>周边</label>{{ item.score2 }}</li>
                                    <li><label>交通</label>{{ item.score3 }}</li>
                                    <li><label>服务</label>{{ item.score4 }}</li>
                                </ul>
                            </dd>
                        </dl>
                        <p class="content">{{ item.content }}</p>
                    </li>
                </ul>
            </div>
        </gz-loadmore>
        <no-result v-if="noResult" :img="icons.noResult" :line="noResultTexts"></no-result>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import NoResult from '../../components/biz/no-result';

    export default {
        data() {
            return {
                loadingData: true,
                noResultTexts: ['暂无评论哦～'],
                icons: {
                    default: require('../../../public/img/default-avator.svg'),
                    noResult: require('../../../public/img/no-comments.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'projectInfo',
                'projectComments',
            ]),
            projectInfoData() {
                return this.projectInfo(this.$route.params.id);
            },
            projectCommentsData() {
                return this.projectComments(this.$route.params.id).data || [];
            },
            projectCommentsPage() {
                return this.projectComments(this.$route.params.id).page || {
                    index: 0,
                    size: 10,
                    total: 0,
                };
            },
            paging() {
                return {
                    pageIndex: this.projectCommentsPage.index + 1,
                    pageSize: this.projectCommentsPage.size,
                };
            },
            noResult() {
                return !this.loadingData
                    && !this.projectCommentsPage.index
                    && !this.projectCommentsData.length;
            },
        },
        methods: {
            ...mapActions([
                'getProjectComments',
                'refreshComments',
            ]),
            fetchData() {
                this.$set(this, 'loadingData', true);
                this.getProjectComments({
                    projectId: this.$route.params.id,
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
                    type: 'project',
                    query: {
                        projectId: this.$route.params.id,
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
        mounted() {
            if (!this.projectCommentsData.length) {
                this.fetchData();
            } else {
                this.hotUpdate();
            }
        },
        components: {
            [NoResult.name]: NoResult,
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';
    .header{
      height: 88px;
    }
    .noResult {
        padding: 100px 0;
        text-align: center;
        p {
            font-size: 28dpx;
            color: #999;
            padding-top: 45px;
        }
    }
    .right-icon {
        font-size: 32dpx;
    }
    .project-comments {
        padding-top: 100px;
        .title-bar {
            text-align: center;
        }
        .arrow-left {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
        }
        .inline-block {
            display: inline-block;
            vertical-align: top;
        }
        .comment-session {
            padding: 0 24px;
            h2 {
                font-size: 50dpx;
                padding-top: 50px;
                color: #333;
                .score {
                    padding-left: 50px;
                }
            }
            .comments-list {
                &-item {
                    padding: 100px 0;
                    border-bottom: 1rpx solid #ddd;
                    .comment-item {
                        font-size: 0;
                        color: #333;
                        dt {
                            .inline-block;
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 100px;
                            }
                        }
                        dd {
                            .inline-block;
                            width: 602px;
                            padding-left: 15px;
                            .name {
                                width: 100%;
                                height: 45px;
                                color: #666666;
                                font-size: 32dpx;
                                display: inline-block;
                                vertical-align: top;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            }
                            .desc {
                                width: 100%;
                                padding-top: 10px;
                                font-size: 24dpx;
                                color: #666;
                                overflow: hidden;
                                time {
                                    display: inline-block;
                                    vertical-align: top;
                                    float: right;
                                    line-height: 36dpx;
                                    color: #999;
                                }
                                .score {
                                    display: inline-block;
                                    vertical-align: top;
                                    line-height: 36dpx;
                                    font-size: 24dpx;
                                }
                            }
                            .list {
                                /*font-size: 0;*/
                                padding-top: 24px;
                                display: flex;
                                li {
//                                    .inline-block;
                                    flex: 1;
                                    font-size: 20dpx;
                                    /*padding-right: 17px;*/
                                    label {
                                        display: inline-block;
                                        width: 64px;
                                        line-height: 36dpx;
                                        margin-right: 12px;
                                        text-align: center;
                                        color: #fff;
                                        -webkit-border-radius: 8px;
                                        -moz-border-radius: 8px;
                                        border-radius: 8px;
                                        background: #333;

                                    }
                                }
                            }
                        }
                    }
                    .content {
                        width: 100%;
                        padding-top: 22px;
                        font-size: 24dpx;
                        line-height: 34dpx;
                        text-align: justify;
                        color: #999;

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
                margin-top: 10px;
                font-size: 28dpx;
                color: #999999;
                text-align: center;
            }
        }
        .loadMoreHeight{
            height: 1100px !important;
            overflow: hidden;
        }
    }
</style>
