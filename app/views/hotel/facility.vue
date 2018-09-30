<template>
    <div class="facility">
        <gz-header></gz-header>
        <div class="facility-section">
            <h2>详情/设施</h2>
            <div class="info">
                <p>1.说走就走的旅程游记内容文字说走就走的旅程游记内容文字说走就说走就说走就，说走就走的旅程游记内容文字说走就走。</p>
                <p>2.的旅程游记内容文字说走就说走就说走就说走就走的旅程游记。</p>
                <p>3.内容文字说走就走的旅程游记内容文字说走就说走就说走就说走就走的旅程游记内容文字说走就走的旅程游记内容文字说走就说走就说。</p>
                <p>4.走就说走就走的旅程游记。</p>
                <p>5.内容文字说走就走的旅程游记内容文字说走就说走就说走就。</p>
            </div>
            <ul class="facility-list">
                <li v-for="item in facilityList">
                    <span>{{item.name}}</span>
                    <i class="icon"><img :src="item.imgSrc" /></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                facilityList: [
                    {
                        name: '无线网',
                        imgSrc: require('../../../public/img/wifi.svg'),
                    },
                    {
                        name: '吹风机',
                        imgSrc: require('../../../public/img/blower.svg'),
                    },
                    {
                        name: '电视',
                        imgSrc: require('../../../public/img/tv.svg'),
                    },
                    {
                        name: '空调',
                        imgSrc: require('../../../public/img/condition.svg'),
                    },
                ],
            };
        },
        components: {
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';

    .facility {
        padding-top: 80px;

        /* header样式 */
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
        &-section {
            padding: 0 24px 50px;
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
            h2 {
                font-size: 50dpx;
                padding: 50px 0;
                color: #333;
                border-bottom: 1rpx solid #ddd;
            }
            .info {
                padding: 40px 0 20px;
                font-size: 28dpx;
                line-height: 38dpx;
                color: #666;
                text-align: justify;
            }
            .facility-list {
                li {
                    width: 100%;
                    border-bottom: 1rpx solid #ddd;
                    padding: 50px 0;
                    font-size: 32dpx;
                    line-height: 47dpx;
                    color: #4a4a4a;
                    text-align: right;
                    span {
                        float: left;
                    }
                }
            }

        }

    }



</style>
