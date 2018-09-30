<template>
    <div class="project-list">
        <gz-header :title="projectTypeName"></gz-header>
        <div class="project-section">
            <gz-loadmore :load-bottom-fuc="fetchData" :autoFill="false" ref="loadMore">
                <ul class="list">
                    <li class="list-item"
                        v-for="(item, index) in projectListData"
                        :style="{ backgroundImage: `url(${item.coverImg || icons.default})` }"
                        @click='showProjectInfo(item)'
                        :data-url="item.contentUrl"
                        v-externalLink
                    >
                        <div class="mask">
                            <h2>{{item.name}}</h2>
                            <p>{{item.subTitle}}</p>
                        </div>
                    </li>
                </ul>
            </gz-loadmore>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                icons: {
                    default: require('../../../public/img/homesmall.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'projectType',
                'projectList',
            ]),
            projectTypeName() {
                const type = this.projectType.find(item => item.id === this.$route.params.id);
                return type ? type.name : '';
            },
            projectListData() {
                return this.projectList(this.$route.params.id).data || [];
            },
            projectListPage() {
                return this.projectList(this.$route.params.id).page || {
                    index: 0,
                    size: 10,
                };
            },
            paging() {
                return {
                    pageIndex: this.projectListPage.index + 1,
                    pageSize: this.projectListPage.size,
                };
            },
        },
        methods: {
            ...mapActions([
                'getProjectList',
            ]),
            fetchData() {
                this.getProjectList({
                    typeId: this.$route.params.id,
                    paging: this.paging,
                }).then((data) => {
                    if (!(data.itemList && data.itemList.length)) {
                        if (this.paging.pageIndex > 1) {
                            this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                            if (this.$refs.loadMore) this.$refs.loadMore.setBottomLoaded();
                        } else {
                            this.$notify({ message: '噢噢，暂无内容:(', duration: 800 });
                        }
                    }
                    if (this.paging.pageIndex > 2 && this.$refs.loadMore) {
                        this.$refs.loadMore.setBottomLoaded();
                    }
                }).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
            showProjectInfo(item) {
                if (!item.contentUrl) this.$router.push(`/project/${item.id}`);
            },
        },
        mounted() {
            if (!this.projectListData.length) this.fetchData();
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';
    .project-list {
        padding-top : 88px;
        .arrow-left {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
        }
        .project-section {
            background: rgba(0,0,0,.5);
            font-size: 12dpx;
            .list {
                &-item {
                    width: 100%;
                    height: 350px;
                    color: #fff;
                    text-align: center;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    background-color: #fff;
                    .mask {
                        width: 100%;
                        height: 100%;
                        padding: 130px 0 0;
                        overflow: hidden;
                        background: rgba(0,0,0,.3);
                        h2 {
                            height: 70px;
                            font-size: 36dpx;
                            font-weight: 600;
                            margin-bottom: 20px;
                        }
                        p {
                            font-size: 24dpx;
                            line-height: 38dpx;
                            z-index: 1;
                        }
                    }
                }
            }
        }
    }
</style>
