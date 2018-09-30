<template>
    <div class="travel-route-info">
        <gz-header></gz-header>
        <div class="container">
            <div class="title">{{ travelRouteData.title }}</div>
            <div class="meta-info">
                <span>{{ publishDate }} 发布</span>
                <span class="reading"><img :src="icons.reading" alt="">&nbsp;</span>
                <span>{{ travelRouteData.readingQuantity }}</span>
                <span class="comment"><img :src="icons.comment" alt="">&nbsp;</span>
                <span>{{ travelRouteData.commentQuantity }}</span>
            </div>
            <div class="content">
                <div class="image">
                    <img :src="travelRouteData.coverImg || icons.default" alt="">
                </div>
                <div class="main">
                    <gz-rich-text-viewer :contents="routeRichText"></gz-rich-text-viewer>
                </div>
                <div class="comment">
                    <img :src="icons.floatComment" @click="comment()" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import moment from 'moment';

    export default {
        data() {
            return {
                icons: {
                    reading: require('../../../public/img/reading.svg'),
                    comment: require('../../../public/img/comment.svg'),
                    floatComment: require('../../../public/img/float-comment.svg'),
                    default: require('../../../public/img/homesmall.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'travelRouteInfo',
            ]),
            travelRouteData() {
                return this.travelRouteInfo(this.$route.params.id);
            },
            routeRichText() {
                const content = this.travelRouteData.content;
                if (content) {
                    return content.indexOf('[') > -1 ? JSON.parse(content) : [{
                        id: 0,
                        type: 'paragraph',
                        content,
                    }];
                }
                return [];
            },
            publishDate() {
                return this.travelRouteData.publishDate
                    && moment(this.travelRouteData.publishDate).format('YYYY-MM-DD');
            },
        },
        methods: {
            ...mapActions([
                'getTravelRouteInfo',
            ]),
            comment() {
                this.$router.push(`${this.$route.fullPath}/comments`);
            },
            hotUpdate() {
                this.getTravelRouteInfo(this.$route.params.id).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
        },
        mounted() {
            this.hotUpdate();
        },
    };
</script>

<style lang="less">
    .travel-route-info {
        .container {
            padding: 0 24px;
            margin-top: 160px;
            .title {
                min-height: 57px;
                font-size: 50dpx;
                font-weight: 600;
                color: #4a4a4a;
                margin-bottom: 30px;
            }
            .meta-info {
                min-height: 45px;
                position: relative;
                font-size: 24dpx;
                color: #999999;
                span{
                    min-height: 33px;
                }
                .reading, .comment {
                    padding-left: 25px;
                }
                img {
                    position: relative;
                    top: 11px;
                    width: 40px;
                }
            }
            .content {
                position: relative;
                .image {
                    margin-top: 65px;
                    min-height: 330px;
                    img {
                        width: 100%;
                        height: 325px;
                    }
                }
                .main {
                    margin: 50px 0;
                }
                .comment {
                    min-height: 113px;
                    position: fixed;
                    right: 50px;
                    bottom: 50px;
                    img {
                        width: 108px;
                    }
                }
            }
        }
    }
</style>
