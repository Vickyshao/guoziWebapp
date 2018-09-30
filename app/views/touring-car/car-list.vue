<template>
    <div class="touring-car-list">
        <gz-header
            title="房车"
            :rightIcon="icons.customerService"
            @right-icon-click="showTel"
            :leftToBack='false'
        ></gz-header>
        <div class="selectedArea" @click="showPicker">
            <span class="selectAddress">取车地点：</span>
            <span class="selectInput">{{pickupPlace.name}}</span>
            <span class="icon"><img :src="icons.arrowDown"/></span>
        </div>
        <gz-loadmore
            key="car"
            ref="loadMore"
            :load-bottom-fuc="fetchData"
            :autoFill="false"
        >
            <div class="camper-list">
                <div class="camper-item"  v-for="(item, index) in touringCarListData" @click="showCarInfo(item.id)">
                    <div class="picArea">
                        <img :src="item.coverImg || icons.default"/>
                    </div>
                    <div class="camperInfo">
                        <h2>{{item.name.length>8?item.name.substring(0,8)+'...':item.name}}</h2>
                        <p class="address">
                            <span>取车地点：</span>
                            <span>{{item.pickUpPlace}}</span>
                        </p>
                        <div class="settingInfo">
                            <div  class="peopleInfo">
                                <span><img :src="icons.multiPeople"/></span>
                                <span>{{item.suitableNumber}}</span>
                                <span>人</span>
                            </div>
                            <div class="carInfo">
                                <span><img :src="icons.touringCar"/></span>
                                <span class="car-pic">{{item.brand}}</span>
                            </div>
                        </div>
                         <p class="price">
                            <span>￥</span>
                            <span class="num">{{item.price}}</span>
                            <span>起／定金</span>
                         </p>
                    </div>
                </div>
            </div>
        </gz-loadmore>
        <no-result v-if="noResult" :img="icons.noResult" :line="noResultTexts">
            <div slot="customContent">
                <button @click="showPicker">重新选择</button>
            </div>
        </no-result>
        <gz-footer-bar></gz-footer-bar>
        <gz-mask :show="isShowPicker"></gz-mask>
        <tel-mask phone="0871-65878888-3700" ref="telMask"></tel-mask>
        <div class="address-pic" v-show="isShowPicker">
            <gz-picker
                v-if="isShowPicker"
                :slots="pickerSlots"
                :showToolbar="true"
                :itemHeight="120"
                ref="placePicker"
            >
                <div>
                    <span class="select-cancel" @click="hidePicker"></span>
                    <span class="select-confirm" @click="changePlace" >确定</span>
                    <h3>选择取车地点</h3>
                </div>
            </gz-picker>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TelMask from '../../components/biz/tel-mask';
import NoResult from '../../components/biz/no-result';

export default {
    data() {
        return {
            loadingData: true,
            isShowPicker: false,
            noResultTexts: ['该取车地点没有搜索到符合条件的房车，请重新选择～'],
            icons: {
                customerService: require('../../../public/img/customer-service-black.svg'),
                default: require('../../../public/img/hotcar.svg'),
                multiPeople: require('../../../public/img/multi-people.svg'),
                touringCar: require('../../../public/img/touring-car.svg'),
                noResult: require('../../../public/img/no-result.svg'),
                arrowDown: require('../../../public/img/arrow-down.svg'),
            },
        };
    },
    computed: {
        ...mapGetters([
            'touringCarList',
            'pickupPlaceList',
            'pickupPlace',
        ]),
        touringCarListData() {
            return this.touringCarList.data || [];
        },
        touringCarListPage() {
            return this.touringCarList.page || {
                index: 0,
                size: 10,
            };
        },
        pickupPlaceId() {
            return this.pickupPlace.id.toString().replace('all', '');
        },
        paging() {
            return {
                pageIndex: this.touringCarListPage.index + 1,
                pageSize: this.touringCarListPage.size,
            };
        },
        pickerSlots() {
            return [{
                flex: 1,
                textAlign: 'center',
                values: this.pickupPlaceList.map(item => item.name),
            }];
        },
        noResult() {
            return !this.loadingData
                && this.pickupPlaceList.length
                && !this.touringCarListPage.index
                && !this.touringCarListData.length;
        },
    },
    methods: {
        ...mapActions([
            'getPickupPlaceList',
            'getTouringCarList',
            'setPickupPlace',
        ]),
        showTel() {
            this.$refs.telMask.toggle();
        },
        showCarInfo(id) {
            this.$router.push(`/touring-car/${id}`);
        },
        showPicker() {
            this.$set(this, 'isShowPicker', true);
            this.$nextTick(() => {
                const singp = this.$refs.placePicker;
                singp.setSlotValue(0, this.pickupPlace.name);
            });
        },
        hidePicker() {
            this.$set(this, 'isShowPicker', false);
        },
        changePlace() {
            // todo: 重构 picker 组件
            const picker = this.$refs.placePicker;
            const name = picker.values[picker.slots[0].valueIndex];
            const place = this.pickupPlaceList.find(item => item.name === name);
            this.setPickupPlace(place);
            if (!this.touringCarListData.length
                && !this.touringCarListPage.index) this.fetchData();
            this.hidePicker();
        },
        fetchData() {
            this.$set(this, 'loadingData', true);
            this.getTouringCarList({
                pickUpPlaceId: this.pickupPlaceId,
                paging: this.paging,
            }).then((data) => {
                this.$set(this, 'loadingData', false);
                if (!(data.itemList && data.itemList.length) && this.paging.pageIndex > 1) {
                    this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                    if (this.$refs.loadMore) this.$refs.loadMore.setBottomLoaded();
                }
                // todo: 优化这块逻辑
                if (this.paging.pageIndex > 2 && this.$refs.loadMore) {
                    this.$refs.loadMore.setBottomLoaded();
                }
            }).catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
        },
    },
    mounted() {
        if (!this.pickupPlaceList.length) {
            this.getPickupPlaceList().then(() => {
                this.fetchData();
            }).catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
        } else {
            this.$set(this, 'loadingData', false);
        }
    },
    components: {
        [TelMask.name]: TelMask,
        [NoResult.name]: NoResult,
    },
};
</script>

<style lang="less">
    @import (reference) '../../global.style.less';
    .touring-car-list {
        position: relative;
        .gz-header {
            .gz-header-right {
                padding-right: 30px;
                padding-left: 0px;
                img {
                    width: 42px;
                    height: 68px;
                }
            }
        }
        .selectedArea {
            position: fixed;
            background: #fff;
            z-index: 888;
            top: 88px;
            line-height: 96px;
            width: 100%;
            border-bottom: 1rpx solid #dddddd;
            text-align: center;
            span {
                display: inline-block;
                vertical-align: middle;
                font-size: 32dpx;
                color: #4a4a4a;
            }
            .icon {
                margin-left: 18px;
                display: inline-block;
                img {
                    width: 15px;
                    height: 8px;
                    vertical-align: middle;
                }
            }
        }
        .camper-list {
            padding: 200px 18px 96px 24px;;
            width: 100%;
            overflow: hidden;
            .camper-item{
                position: relative;
                padding-top: 50px;
                padding-bottom: 50px;
                overflow: hidden;
                .picArea{
                    width: 276px;
                    height: 188px;
                    float: left;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .camperInfo {
                    float: left;
                    margin-left: 35px;
                    h2 {
                        font-size: 32dpx;
                        color: #4a4a4a;
                        font-weight: normal;
                    }
                    .address {
                        padding-top: 14px;
                        width: 368px;
                        overflow: hidden;
                        font-size: 24dpx;
                        line-height: 38px;
                        color: #999999;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                    }
                    .settingInfo {
                        padding-top: 14px;
                        width: 368px;
                        color: #999999;
                        padding-bottom: 29px;
                        overflow: hidden;
                        div {
                            display: inline-block;
                            vertical-align: bottom;
                            font-size: 0;
                            span {
                                display: inline-block;
                                vertical-align: bottom;
                                font-size: 24dpx;
                                &:nth-child(2){
                                    margin-left: 6px;
                                }
                            }
                        }
                        .peopleInfo {
                            img {
                                width: 22px;
                                height: 22px;
                                vertical-align: middle;
                                margin-bottom: 2px;
                            }
                        }
                        .carInfo {
                            margin-left: 16px;
                            img {
                                width: 26px;
                                height: 26px;
                                vertical-align: middle;
                            }
                        }
                    }
                    .price {
                        position: absolute;
                        bottom: 34px;
                        right: 25px;
                        .num {
                            font-size: 40dpx;
                            color: #4a4a4a;
                        }
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
            button {
                margin-top: 157px;
                width: 86%;
                line-height: 98px;
                color: #fff;
                font-size: 32dpx;
                text-align: center;
                background: #ff4847;
                border-radius: 10rpx;
            }
        }
        .address-pic {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #fff;
            z-index: 999;
            .picker-toolbar{
                height: 300px;
                color: #4a4a4a;
                border-bottom: 1rpx solid #dddddd;
                .select-confirm {
                    float: right;
                    font-size: 32dpx;
                    padding: 20px;
                }
                h3 {
                    line-height: 200px;
                    font-size: 50dpx;
                    font-weight: 600;
                    margin-left: 30px;
                }
                .select-cancel {
                    margin-left: 30px;
                    margin-top: 20px;
                    position: relative;
                    display: inline-block;
                    overflow: hidden;
                    width: 32px;
                    height: 32px;
                    background: url('../../../public/img/close.svg') no-repeat;
                    background-size: cover;
                }
            }
        }
        .home-mask {
            color: #585858;
            font-size: 28dpx;
            .tel-wrap {
                position: fixed;
                bottom: 0;
                width: 100%;
                padding: 0 10px 10px;
                .tel {
                    display: block;
                    color: #585858;
                    height: 102px;
                    line-height: 102px;
                    background-color: #fff;
                    text-align: center;
                }
                .cancel {
                    margin-top: 10px;
                    height: 115px;
                    line-height: 115px;
                    background-color: #fff;
                    text-align: center;
                }
            }
        }
    }
</style>
