<template>
    <div class="hot-play" v-if="playShow">
        <gz-list-group :items="play"></gz-list-group>
        <ul>
            <li class="flag"
                v-for="(item, index) in hotPlay"
                @click="showTravel(item)"
                :data-url="item.contentUrl"
                v-externalLink
            >
                <div class="text">
                    <p class="title">
                        <span class="left">
                            {{ item.title.length > 30 ? `${item.title.slice(0,20)}...` : item.title }}
                        </span>
                    </p>
                    <p class="sub-title">{{ item.subTitle }}</p>
                    <span class="destination">{{ item.destination }}</span>
                    <p class="publish-date">{{ item.publishDate && item.publishDate.slice(0,9)}}</p>
                    <p class="reading-count">
                        <img :src="icons.reading" alt="">&nbsp;
                        <span>{{ item.readingQuantity }}</span>
                    </p>
                </div>


                <div class="figure">
                   <!-- | formatImg('.200-200') -->
                    <img :src="item.coverImg || icons.default" alt="">
                    <span v-if="item.isEssence">精华</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ListGroup from '../../common/list-group';

    export default {
        name: 'gz-hot-play',
        data() {
            return {
                play: [{
                    url: '/travels',
                    text: '热门玩法',
                    hasArrow: true,
                }],
                playShow: false,
                icons: {
                    reading: require('../../../../public/img/reading.svg'),
                    default: require('../../../../public/img/hotplay.svg'),
                },
            };
        },
        components: {
            [ListGroup.name]: ListGroup,
        },
        methods: {
            ...mapActions([
                'getHotPlay',
            ]),
            fetchData() {
                this.getHotPlay().then(() => {
                    this.$set(this, 'playShow', true);
                });
            },
            showTravel(item) {
                if (!item.contentUrl) this.$router.push(`/travel/notes/${item.id}`);
            },
        },
        computed: {
            ...mapGetters([
                'hotPlay',
            ]),
        },
        mounted() {
            this.fetchData();
        },
    };
</script>

<style lang="less">
    .hot-play ul {
        padding: 0 0 0 40px;
        .flag {
            display: flex;
            flex-direction: row;
            width: 100%;
            background-color: #fff;
            padding: 0 0 100px;
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
                        max-height: 80px;
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
            .figure {
                width: 50%;
                height: 240px;
                display: inline-block;
                position: relative;
                img {
                    width: 363px;
                    height: 238px;
                }
                span {
                    position: absolute;
                    right: 0;
                    bottom: 2px;
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
</style>
