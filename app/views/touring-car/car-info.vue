<template>
    <div class="camper-detail">
        <gz-header
            :isTransparent="true"
            :leftIcon="icons.back"
            @left-icon-click="goBack"
            :rightIcon="icons.phone"
            @right-icon-click="showTel"
        ></gz-header>
        <div class="camper-banner" @click.prevent="showAlbum">
            <gz-slider :options="sliderOptions" :items="carBanners"></gz-slider>
        </div>
        <div class="camper-info">
            <div class="camper-title">
                <h3>{{touringCarData.name}}</h3>
                <div class="camper-address">
                    <img :src="icons.address"/>
                    <span>取车地点：{{touringCarData.pickUpPlace}}</span>
                </div>
            </div>
            <div class="camper-facilities">
                <div class="camper-item" v-for="(item, index) in touringCarData.features">
                    <div class="camper-img">
                        <img :src="item.iconImg" alt="">
                    </div>
                    <p class="camper-header-bar-title">{{item.name}}</p>
                </div>
            </div>
            <div class="camper-comment">
                <router-link :to="`${this.$route.fullPath}/comments`">
                    <div>
                        <span class="num">{{touringCarData.commentTotal}}条评论</span>
                        <span class="score">{{touringCarData.commentAverageScore}}分</span>
                        <span class="all">
                            查看全部
                            <i class="icon"><img :src="icons.arrowRight"></i>
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="camper-reverse">
                <p class="reverse-tips">
                    <span class="camper-reverse">房车预订</span>
                    <span class="advance-day" v-if='touringCarSetting.leastAdvanceReserveDays != 0'>至少提前{{touringCarSetting.leastAdvanceReserveDays}}天预订</span>
                </p>
                <div class="camper-date">
                    <div class="item-left left-margin" @click="showCalendar('pickup')">
                        <span>{{ pickupDate }}</span>
                        <span v-if='touringCarSetting.leastAdvanceReserveDays != 0'>取车 ></span>
                        <span v-if='touringCarSetting.leastAdvanceReserveDays == 0'>取车（今天）></span>
                    </div>
                    <div class="item-center">至</div>
                    <div class="item-right right-margin" @click="showCalendar('return')">
                        <span>{{ returnDate }}</span>
                        <span>还车（共{{ totalDays }}天）></span>
                    </div>
                </div>
            </div>
             <div class="camper-priceList">
                  <ul v-for="(item, index) in touringCarData.prices">
                      <li class="price-item">
                          <div class="price-part">
                              <span class="price-type">{{item.name}}</span>
                              <p class="reverse-money">
                                <span>￥</span>
                                <span class="num">{{item.price}}</span>
                                <span>／订金</span>
                              </p>
                          </div>
                          <div class="intro-part">
                              <p>{{item.instruction}}</p>
                              <button @click="orderCar(index)">预订</button>
                          </div>
                      </li>
                  </ul>
              </div>
        </div>
        <div class="tab-part">
            <div class="tab-header">
                <div class="carInfo" @click="switchTab(1)">
                    <span :class="{ active:isTabActive }">车辆介绍</span>
                </div>
                <div class="reverseInfo" @click="switchTab(0)">
                    <span :class="{ active:!isTabActive }">预订须知</span>
                </div>
            </div>
            <div v-show="isTabActive" class="tab-content-car">
                <gz-rich-text-viewer :contents="carRichText('summary')"></gz-rich-text-viewer>
            </div>
            <div v-show="!isTabActive" class="tab-content-order">
                <gz-rich-text-viewer :contents="carRichText('reservationNotes')"></gz-rich-text-viewer>
            </div>
        </div>
        <gz-calendar-popup
            ref="calendarPopup"
            :options="calendarOptions"
            :setting="touringCarSetting"
            @select="updateDate"
        ></gz-calendar-popup>
        <tel-mask phone="0871-65878888-3700" ref="telMask"></tel-mask>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import moment from 'moment';
    import CalendarPopup from '../../components/biz/calendar-popup';
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
                calendarOptions: {},
                dateType: 'pickup',
                isTabActive: true,
                icons: {
                    back: require('../../../public/img/back-white.svg'),
                    phone: require('../../../public/img/phone.svg'),
                    default: require('../../../public/img/group-5.svg'),
                    address: require('../../../public/img/address.svg'),
                    arrowRight: require('../../components/biz/icon/arrow-right.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'touringCarSetting',
                'touringCarInfo',
                'touringCarDate',
            ]),
            touringCarData() {
                return this.touringCarInfo(this.$route.params.id);
            },
            touringCarDateInfo() {
                return this.touringCarDate(this.$route.params.id);
            },
            pickupDate() {
                return this.touringCarDateInfo.pickup;
            },
            returnDate() {
                return this.touringCarDateInfo.return;
            },
            totalDays() {
                return moment(this.returnDate).add(1, 'days').diff(moment(this.pickupDate), 'days');
            },
            carBanners() {
                const banners = this.touringCarData.banners;
                return banners && banners.map((item, index) => ({
//                    url: `${this.$route.fullPath}/album`,
                    background: item,
                    id: index,
                    name: index,
                }));
            },
            defaultDateInfo() {
                const days = parseInt(this.touringCarSetting.leastAdvanceReserveDays, 10);
                return {
                    pickup: moment().add(days, 'days').format('YYYY-MM-DD'),
                    return: moment().add(days + 1, 'days').format('YYYY-MM-DD'),
                };
            },
        },
        methods: {
            ...mapActions([
                'getTouringCarSetting',
                'getTouringCarInfo',
                'initTouringCarDate',
                'setTouringCarDate',
            ]),
            goBack() {
                this.$router.push('/touring-car');
            },
            showTel() {
                this.$refs.telMask.toggle();
            },
            switchTab(type) {
                this.$set(this, 'isTabActive', type);
            },
            // todo: gz-slider 组件需要更新，临时处理方案
            showAlbum() {
                this.$router.push(`${this.$route.fullPath}/album`);
            },
            showCalendar(type) {
                this.$set(this, 'dateType', type);
                const setting = this.touringCarSetting;
                const availableStartDate = type === 'pickup'
                    ? moment().add(setting.leastAdvanceReserveDays, 'days').format('YYYY-MM-DD')
                    : moment(this.pickupDate).add(1, 'days').format('YYYY-MM-DD');
                const availableDaysCount = type === 'pickup'
                    ? parseInt(setting.mostAdvanceReserveDays, 10)
                    - parseInt(setting.leastAdvanceReserveDays, 10)
                    : parseInt(setting.mostReserveDays, 10) - 1;
                this.$set(this, 'calendarOptions', {
                    dateType: type === 'pickup' ? 0 : 1,
                    availableStartDate,
                    availableDaysCount,
                    initStartDate: this.pickupDate,
                    initEndDate: this.returnDate,
                    startDateLabel: '取车',
                    endDateLabel: '还车',
                });
                this.$refs.calendarPopup.toggle();
            },
            updateDate(date) {
                this.setTouringCarDate({
                    id: this.$route.params.id,
                    type: this.dateType,
                    date,
                });
                if (this.returnDate <= this.pickupDate) {
                    this.setTouringCarDate({
                        id: this.$route.params.id,
                        type: 'return',
                        date: moment(this.pickupDate).add(1, 'days').format('YYYY-MM-DD'),
                    });
                } else if (this.totalDays > this.touringCarSetting.mostReserveDays) {
                    this.setTouringCarDate({
                        id: this.$route.params.id,
                        type: 'return',
                        date: moment(this.pickupDate).add(this.touringCarSetting.mostReserveDays - 1, 'days').format('YYYY-MM-DD'),
                    });
                }
                this.$refs.calendarPopup.toggle();
            },
            carRichText(key) {
                const content = this.touringCarData[key];
                if (content) {
                    return content.indexOf('[') > -1 ? JSON.parse(content) : [{
                        id: 0,
                        type: 'paragraph',
                        content,
                    }];
                }
                return [];
            },
            orderCar(_type) {
                this.$router.push({
                    path: '/touring-car-order',
                    query: {
                        type: _type,
                        carId: this.$route.params.id,
                    },
                });
            },
            hotUpdate() {
                Promise.all([
                    this.getTouringCarSetting(),
                    this.getTouringCarInfo(this.$route.params.id),
                ]).then(() => {
                    this.initTouringCarDate({
                        id: this.$route.params.id,
                        data: this.defaultDateInfo,
                    });
                }).catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
        },
        mounted() {
            this.hotUpdate();
        },
        components: {
            [CalendarPopup.name]: CalendarPopup,
            [TelMask.name]: TelMask,
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';
    .camper-detail {
        .gz-header-right {
            img {
                width: 36px;
                height: 36px;
            }
        }
        .camper-banner {
            width: 100%;
            height: 500px;
            border-bottom: 1rpx solid #ddd;
            background: url('../../../public/img/group-5.svg') no-repeat;
            background-size: cover;
        }
        .camper-info {
            padding-left: 24px;
            padding-right: 24px;
            .camper-title {
                min-height: 224px;
                padding: 50px 0;
                border-bottom: 1rpx solid #ddd;
                h3 {
                    min-height:57px;
                    font-size: 50dpx;
                }
                .camper-address {
                    min-height: 60px;
                    padding-top: 24px;
                    font-size: 32dpx;
                    line-height: 38dpx;
                    color: #666;
                    img {
                        height: 30px;
                    }
                    span {
                        height: 45px;
                        font-size: 32dpx;
                        margin-left: 14px;
                    }
                }
            }
            .camper-facilities {
                min-height: 179.984px;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                padding-top: 37px;
                padding-bottom: 50px;
                background-color: #FFF;
                border-bottom: 1rpx solid #dddddd;
                .camper-item {
                    min-height: 92px;
                    font-size: 0;
                    width: 175.5px;
                    text-align: center;
                    .camper-img {
                        width: 47px;
                        height: 47px;
                        display: inline-block;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .camper-header-bar-title {
                        color: #999999;
                        margin-top: 18px;
                        font-size: 24dpx;
                        letter-spacing: 1.8dpx;
                    }
                }
            }
            .camper-comment {
                min-height: 137px;
                padding-top: 50px;
                padding-bottom: 50px;
                border-bottom: 1rpx solid #dddddd;
                .num {
                    min-height: 45px;
                    font-size: 32dpx;
                    color: #333333;
                }
                .score {
                    min-height: 45px;
                    font-size: 32dpx;
                    color: #333333;
                    margin-left: 24px;
                }
                .all {
                    min-height: 27px;
                    float: right;
                    font-size: 24dpx;
                    color: #999999;
                    img {
                        width: 14px;
                        height: 26px;
                        vertical-align: -4px;
                    }
                }
            }
            .camper-reverse {
                min-height: 275px;
                padding-bottom: 50px;
                border-bottom: 1rpx solid #dddddd;
                .reverse-tips {
                    padding-top: 50px;
                    padding-bottom: 50px;
                    .camper-reverse {
                        min-height: 50px;
                        font-size: 36dpx;
                        color: #4a4a4a;
                        border-bottom: none;
                    }
                    .advance-day {
                        min-height: 40px;
                        font-size: 28dpx;
                        color: #666666;
                        margin-left: 14px;
                    }
                }
                .camper-date {
                    min-height: 116px;
                    display: flex;
                    justify-content: space-between;
                    height: 116px;
                    .item-left, .item-right {
                        min-height: 115px;
                        flex: 1;
                        span:nth-child(1) {
                            display: block;
                            font-size: 36dpx;
                            color: #333;
                            margin-bottom: 24px;
                        }
                        span:nth-child(2) {
                            display: block;
                            min-height: 41px;
                            font-size: 24dpx;
                            color: #666;
                        }
                    }
                    .item-right {
                        text-align: right;
                    }
                    .item-center {
                        width: 76px;
                        height: 76px;
                        text-align: center;
                        font-size: 28dpx;
                        color: #fff;
                        line-height: 76px;
                        border-radius: 38px;
                        box-shadow: 0 2px 4px 0;
                        background-color: #ff4847;
                    }
                }
            }
            .camper-priceList {
                padding-top: 60px;
                padding-bottom: 30px;
                .price-item {
                    padding-bottom: 50px;
                    .price-part {
                        overflow: hidden;
                        line-height: 40px;
                        .price-type {
                            font-size: 28dpx;
                            color: #4a4a4a;
                            display: inline-block;
                            vertical-align: bottom;
                        }
                        .reverse-money {
                            float: right;
                            color: #4a4a4a;
                            .num {
                                font-size: 40dpx;
                            }
                        }
                    }
                    .intro-part {
                        padding-top: 24px;
                        overflow: hidden;
                        p {
                            float: left;
                            font-size: 24dpx;
                            line-height: 1.58;
                            color: #999999;
                            width: 449px;
                        }
                        button {
                            float: right;
                            font-size: 28dpx;
                            color: #ffffff;
                            width: 160px;
                            height: 60px;
                            margin-top: 8px;
                            border-radius: 10rpx;
                            border: none;
                            background: #ff4847;
                        }
                    }
                }
            }
        }
        .tab-part {
            width: 100%;
            .tab-header {
                line-height: 80px;
                color: #4a4a4a;
                font-size: 32dpx;
                display: flex;
                flex-flow: row;
                border-top: 1rpx solid #dddddd;
                border-bottom: 1rpx solid #dddddd;
                .carInfo,.reverseInfo {
                    float: left;
                    flex: 1;
                    text-align: center;
                    span {
                        display: inline-block;
                        line-height: 80px;
                    }
                    .active {
                        color: #4a4a4a;
                        font-weight: 600;
                        border-bottom: 4px solid #000000;
                    }
                }
                .carInfo{
                    border-right: 1rpx solid #dddddd;
                }
            }
            p {
                padding: 77px 24px 40px 24px;
                font-size: 24dpx;
                color: #999999;
            }
        }
    }
</style>
