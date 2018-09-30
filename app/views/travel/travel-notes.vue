<template>
    <div class="travel-notes-info">
        <gz-header
            :iconHeight="36"
            :iconWidth="36"
            :isTransparent="true"
            :leftIcon="icons.back"
            @left-icon-click="goBack"
            :rightIcon="icons.phone"
            @right-icon-click="showTel"
        ></gz-header>
        <div class="container">
            <div class="cover">
                <img :src="travelNotesData.coverImg || icons.default" alt="">
                <span v-if="travelNotesData.isEssence">精华</span>
            </div>
            <div class="content">
                <div class="title">{{ travelNotesData.title }}</div>
                <div class="meta-info">
                    <span>{{ publishDate }} 发布</span>
                    <span class="reading"><img :src="icons.reading" alt="">&nbsp;</span>
                    <span>{{ travelNotesData.readingQuantity }}</span>
                    <span class="comment"><img :src="icons.comment" alt="">&nbsp;</span>
                    <span>{{ travelNotesData.commentQuantity }}</span>
                </div>
                <div class="travel-info">
                    <div class="left-part">
                        <div class="item">
                            <img :src="icons.time" alt="">
                            <span>出发日期：{{ departureDate }}</span>
                        </div>
                        <div class="item">
                            <img :src="icons.person" alt="">
                            <span>人均消费：￥{{ travelNotesData.consumptionPerPerson }}</span>
                        </div>
                        <div class="item">
                            <img :src="icons.flag" alt="">
                            <span>出发城市：{{ travelNotesData.departureCity }}</span>
                        </div>
                        <div class="item">
                            <img :src="icons.calendar" alt="">
                            <span>行程天数：{{ travelNotesData.travelDays }}天</span>
                        </div>
                    </div>
                    <div class="right-part">
                        {{ travelNotesData.destination }}
                    </div>
                </div>
                <div class="main">
                    <gz-rich-text-viewer :contents="notesRichText"></gz-rich-text-viewer>
                </div>
                <div class="comment">
                    <img :src="icons.floatComment" @click="comment()" alt="">
                </div>
            </div>
        </div>
        <tel-mask phone="0871-65878888-3700" ref="telMask"></tel-mask>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapGetters, mapActions } from 'vuex';
    import TelMask from '../../components/biz/tel-mask';

    export default {
        data() {
            return {
                icons: {
                    back: require('../../../public/img/back-white.svg'),
                    phone: require('../../../public/img/phone.svg'),
                    reading: require('../../../public/img/reading.svg'),
                    comment: require('../../../public/img/comment.svg'),
                    floatComment: require('../../../public/img/float-comment.svg'),
                    time: require('../../../public/img/time.svg'),
                    person: require('../../../public/img/person.svg'),
                    flag: require('../../../public/img/flag.svg'),
                    calendar: require('../../../public/img/calendar.svg'),
                    default: require('../../../public/img/group-5.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'travelNotesInfo',
            ]),
            travelNotesData() {
                return this.travelNotesInfo(this.$route.params.id);
            },
            notesRichText() {
                const content = this.travelNotesData.content;
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
                return this.travelNotesData.publishDate
                    && moment(this.travelNotesData.publishDate).format('YYYY-MM-DD');
            },
            departureDate() {
                return this.travelNotesData.departureDate
                    && moment(this.travelNotesData.departureDate).format('YYYY-MM');
            },
        },
        methods: {
            ...mapActions([
                'getTravelNotesInfo',
            ]),
            goBack() {
                this.$router.back();
            },
            showTel() {
                this.$refs.telMask.toggle();
            },
            comment() {
                this.$router.push(`${this.$route.fullPath}/comments`);
            },
            formatDate(date) {
                return moment(date).format('YYYY-MM');
            },
        },
        mounted() {
            this.getTravelNotesInfo(this.$route.params.id).catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
        },
        components: {
            [TelMask.name]: TelMask,
        },
    };
</script>

<style lang="less">
    .travel-notes-info {
        .gz-header-right {
            img {
                width: 36px;
                height: 36px;
            }
        }
        img[slot] {
            background-color: #ffffff;
        }
        .container {
            .cover {
                width: 100%;
                height: 500px;
                margin-bottom: 45px;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    &+span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 100px;
                        height: 64px;
                        text-align: center;
                        font-size: 28dpx;
                        padding: 18px 0;
                        color: #ffffff;
                        background-color: #333333;
                    }
                }
            }
            .content {
                position: relative;
                padding: 0 24px;
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
                .travel-info {
                    display: flex;
                    position: relative;
                    margin-top: 90px;
                    font-size: 28dpx;
                    line-height: 38px;
                    color: #666666;
                    margin-bottom: 100px;
                    .left-part {
                        width: 65%;
                        .item {
                            margin-bottom: 20px;
                            &>img {
                                width: 35px;
                                position: absolute;
                            }
                            &>span {
                                margin-left: 50px;
                            }
                        }
                    }
                    .right-part {
                        width: 35%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        border-left: solid 1rpx #dddddd;
                        font-size: 50dpx;
                        line-height: 1.2;
                        font-weight: 600;
                        color: #666666;
                    }
                }
                .main {
                    margin: 50px 0;
                    word-break: break-all;
                }
                &>.comment {
                    position: fixed;
                    right: 50px;
                    bottom: 50px;
                    &>img {
                        width: 108px;
                    }
                }
            }
        }
    }
</style>
