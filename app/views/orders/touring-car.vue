<template>
    <div class="touring-car" id="touring-car">
        <gz-header
            title="房车预订"
            :iconWidth="15"
            :iconHeight="28.7"
            :customHandler="true"
            @backHandler="backHandler"
        ></gz-header>
        <gz-order-tourcar @otherPicker="showOtherPicker" ref="orderTourcar">
        </gz-order-tourcar>
        <div class="book-camp">
            <!-- 预留改版，不要删 -->
            <!-- <div class="book-payment">
                <div class="book-money">
                  <span>订金：</span>&nbsp;
                  <span>¥{{touringCarInfo(carId).prices[priceType].price * quantity}}</span>
                </div>
                <div class="book-explain" @click="showExplain">
                  <span>查看订金说明</span>
                </div>
            </div> -->
            <button @click="postOrder">预订</button>
        </div>
        <div class="other-picker" v-if="pickerOther">
          <p>
            <span @click="showOtherPicker"><img :src="icons.close"></span>
            <span @click="confirmOther">确认</span>
          </p>
          <gz-picker
            ref='singlePicker'
            :slots="otherPickerSlot"
            @change="changePicker"
            :itemHeight="120"
          ></gz-picker>
        </div>
        <gz-mask :show="mask">
        </gz-mask>
        <div class="explain" v-if="explain">
            <div class="explain-wrapper">
                <div class="explain-close">
                    <span @click="showExplain"><img :src="icons.close"></span>
                </div>
                <h3>房车订金说明</h3>
                <div class="explain-sum">
                    <span>支付订金</span><span>¥{{touringCarInfo(carId).prices[priceType].price}}&nbsp;x{{quantity}}</span>
                </div>
                <div class="explain-total">
                    <span>合计：¥{{touringCarInfo(carId).prices[priceType].price * quantity}}</span>
                </div>
                <div class="explain-detail">
                    <h4>支付说明：</h4>
                    <span>线上只收取订金，房车的所有租赁费用以客服人员与您确认后的费用为准，并需要在取车当日交付所有租赁费用...</span>
                </div>
            </div>
            <div class="explain-btn">
                <button @click="postOrder">预订</button>
            </div>
        </div>
        <gz-alert :show="showAlert"
          leftButtonText="确定"
          rightButtonText="取消"
          @leftButtonClick="leftButtonClickHandler"
          @rightButtonClick="rightButtonClickHandler">
          <div class="alert-title">是否放弃本次预订？</div>
        </gz-alert>
        <gz-mask :show="loading">
            <gz-loading :show="loading" type="double-bounce"></gz-loading>
        </gz-mask>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';

import OrderTourcarInput from '../../components/biz/orders/order-tourcar-input.vue';

export default {
    data() {
        return {
            pickerOther: false,
            otherType: 0,
            otherPickerSlot: [],
            selectReturnPlace: '',
            selectPickUpTime: '',
            mask: false,
            explain: false,
            showAlert: false,
            carId: '',
            priceType: '',
            icons: {
                close: require('../../components/biz/icon/close.svg'),
            },
            loading: false,
        };
    },
    components: {
        [OrderTourcarInput.name]: OrderTourcarInput,
    },
    computed: {
        ...mapGetters([
            'touringCarInfo', 'touringCarDate',
            'carBeginTime',
            'returnPlaceId', 'returnPlaceName', 'returnPlace',
            'quantity', 'touristSelected', 'contactName', 'contactPhone', 'specialDemand',
        ]),
        pickTime() {
            const timeArr = [];
            for (let i = 0; i < 24; i += 1) {
                if (i < 10) {
                    timeArr.push(`0${i}:00`);
                } else {
                    timeArr.push(`${i}:00`);
                }
            }
            return timeArr;
        },
    },
    methods: {
        ...mapActions([
            'setOrderTourcarTime', 'setOrderTourcarReturn',
            'getOrderTourcarReturn',
            'resetOrder', 'postOrderTourcar',
        ]),
        backHandler() {
            this.$set(this, 'showAlert', true);
        },
        leftButtonClickHandler() {
            this.$set(this, 'showAlert', false);
            this.resetOrder();
            this.$router.push(`/touring-car/${this.carId}`);
        },
        rightButtonClickHandler() {
            this.$set(this, 'showAlert', false);
        },
        showExplain() {
            this.$set(this, 'explain', !this.explain);
            this.$set(this, 'mask', !this.mask);
        },
        changePicker(picker, values) {
            if (this.otherType === 0) {
                this.$set(this, 'selectPickUpTime', values[1]);
            } else {
                this.$set(this, 'selectReturnPlace', values[1]);
            }
        },
        confirmOther() {
            this.$set(this, 'pickerOther', false);
            this.$set(this, 'mask', false);
            if (this.otherType === 0) {
                this.setOrderTourcarTime(this.selectPickUpTime);
            } else {
                const obj = this.returnPlace.filter(
                    item => item.name === this.selectReturnPlace)[0];
                this.setOrderTourcarReturn(obj);
            }
        },
        postOrder() {
            const params = {
                tourCarId: this.touringCarInfo(this.carId).id,
                priceId: this.touringCarInfo(this.carId).prices[this.priceType].id,
                tourCarName: this.touringCarInfo(this.carId).name,
                orderAmount: this.touringCarInfo(this.carId).prices[this.priceType].price
                          * this.quantity,
                price: this.touringCarInfo(this.carId).prices[this.priceType].price,
                pickUpPlaceId: this.touringCarInfo(this.carId).pickUpPlaceId,
                pickUpPlaceName: this.touringCarInfo(this.carId).pickUpPlace,
                beginDate: this.touringCarDate(this.carId).pickup,
                endDate: this.touringCarDate(this.carId).return,
                beginTime: this.carBeginTime,
                returnPlaceId: this.returnPlaceId,
                returnPlaceName: this.returnPlaceName,
                quantity: this.quantity,
                tourist: this.touristSelected,
                contactName: this.$noEmoji(this.contactName),
                contactPhone: this.contactPhone,
                specialDemand: this.$noEmoji(this.specialDemand),
            };
            if (this.filterClause() && !this.filterParams(params)) {
                this.$refs.orderTourcar.err = false;
                // todo: 后端应该加事务锁，但一期时间上来不及，这里先暂时用 setTimeout 处理下
                this.$set(this, 'loading', true);
                setTimeout(() => {
                    this.postOrderTourcar(params)
                      .then((data) => {
                          this.$set(this, 'loading', false);
                          this.toPay(data);
                      }).catch((error) => {
                          this.$set(this, 'loading', false);
                          this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                      });
                }, 1000);
            } else {
                this.$refs.orderTourcar.err = true;
            }
        },
        filterParams(params) {
            let flag = 0;
            if (params.beginTime === '') {
                this.$notify({
                    message: '请选择取车时间',
                });
                flag += 1;
            }
            if (params.returnPlaceId.trim(' ') === '' || params.returnPlaceName.trim(' ') === '') {
                this.$notify({
                    message: '请选择还车地点',
                });
                flag += 1;
            }
            if (params.tourist.length !== params.quantity) {
                this.$notify({
                    message: '游客数量必须等于预订车辆数',
                });
                flag += 1;
            }
            if (!this.filterName(params.contactName)) {
                this.$notify({
                    message: '请输入正确的联系人名字',
                });
                flag += 1;
            }
            if (!this.filterPhone(params.contactPhone)) {
                this.$notify({
                    message: '请输入正确的联系人手机号',
                });
                flag += 1;
            }
            return flag;
        },
        filterName(name) {
            const textName = new RegExp('^[A-Za-z\\u4e00-\\u9fa5]{1,9}$');
            if (!textName.test(name)) {
                return false;
            }
            return true;
        },
        filterPhone(phone) {
            const textPhone = new RegExp('^[1][3-9][0-9]{9}$');
            if (!textPhone.test(phone)) {
                return false;
            }
            return true;
        },
        filterClause() {
            if (!this.$refs.orderTourcar.clauseCheck === true) {
                this.$notify({
                    message: '未勾选预订条款，不能继续下一步',
                });
                return false;
            }
            return true;
        },
        showOtherPicker(_type) {
            this.$set(this, 'otherType', _type);
            this.$set(this, 'mask', !this.mask);
            this.$set(this, 'pickerOther', !this.pickerOther);
            if (this.pickerOther === true) {
                if (_type === 0) {
                    const slot1 = [{
                        values: this.pickTime,
                        textAlign: 'center',
                    }];
                    this.$set(this, 'otherPickerSlot', slot1);
                    this.$nextTick(() => {
                        const singp = this.$refs.singlePicker;
                        const nowTime = new Date();
                        const timeIndex = parseInt(nowTime.getHours(), 10);
                        singp.setSlotValue(0, this.selectPickUpTime
                          || this.pickTime[timeIndex + 1]
                          || this.pickTime[0]);
                        this.$set(this, 'selectPickUpTime', this.selectPickUpTime
                          || this.pickTime[timeIndex + 1]
                          || this.pickTime[0]);
                    });
                } else {
                    const placeArr = [];
                    for (let i = 0; i < this.returnPlace.length; i += 1) {
                        if (this.returnPlace[i].name) {
                            placeArr.push(this.returnPlace[i].name);
                        }
                    }
                    const slot2 = [{
                        values: placeArr,
                        textAlign: 'center',
                    }];
                    this.$set(this, 'otherPickerSlot', slot2);
                    this.$nextTick(() => {
                        const singp = this.$refs.singlePicker;
                        singp.setSlotValue(0, this.selectReturnPlace || placeArr[0]);
                        this.$set(this, 'selectReturnPlace', this.selectReturnPlace || placeArr[0]);
                    });
                }
            }
        },
        toPay(data) {
            this.$router.push({
                path: '/order-result',
                query: {
                    orderCode: data.code,
                    orderId: data.id,
                    orderType: 1,
                },
            });
        },
    },
    created() {
        this.$set(this, 'carId', this.$route.query.carId);
        this.$set(this, 'priceType', this.$route.query.type);
        this.getOrderTourcarReturn()
        .catch((error) => {
            this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
        });
    },
};

</script>

<style lang="less">
.touring-car{
    padding-top: 90px;
    padding-bottom: 128px;
    .gz-header{
        font-size: 32dpx;
        border-bottom: 1rpx solid #dddddd;
    }
    .book-camp{
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        align-items: center;
        border-top:1rpx solid #dddddd;
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 24px;
        .book-payment{
            color: #333333;
            font-size: 36dpx;
            .book-explain{
                overflow: hidden;
                span{
                    float: right;
                    text-decoration: underline;
                    font-size: 28dpx;
                    color: #666666;
                }
            }
        }
        button{
            display: block;
            width: 100%;
            height: 92px;
            border-radius: 10rpx;
            background: #FF4847;
            border:none;
            line-height: 92px;
            font-size:32dpx;
            color: #ffffff;
        }
    }
    .other-picker{
        background: #ffffff;
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 9999;
        p{
            width: 100%;
            display: flex;
            justify-content: space-between;
            span{
                padding: 20px;
                font-size: 32dpx;
                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }
    .explain{
       position: fixed;
       z-index: 9999;
       bottom: 0;
       left: 0;
       background: #FFFFFF;
       padding-top: 50px;
       .explain-wrapper{
            padding: 0 24px;
           .explain-close{
              span{
                 width: 40px;
                 height: 40px;
              }
           }
           h3{
             padding: 50px 0px;
             font-size: 50dpx;
           }
           .explain-sum,
           .explain-total{
             padding: 50px 0px;
             font-size: 28dpx;
             border-bottom: 1rpx solid #dddddd;
             display: flex;
             justify-content: space-between;
           }
           .explain-total{
             justify-content: flex-end;
           }
           .explain-detail{
             padding: 47px 0 84px;
             h4{
                padding-bottom: 50px;
             }
             span{
                display: block;
                color: #999999;
             }
           }
        }
       .explain-btn{
            border-top:1rpx solid #dddddd;
            background: #ffffff;
            width: 100%;
            padding: 24px 30px;
            button{
                display: block;
                width: 100%;
                height: 92px;
                border-radius: 10rpx;
                background: #FF4847;
                border:none;
                line-height: 92px;
                font-size:32dpx;
                color: #ffffff;
                line-height: 92px;
            }
       }
    }
}

</style>
