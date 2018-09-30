<template>
  <div class="touring-car-order" id="touring-car-order">
      <div class="touring-car-name">
          <h1>{{touringCarInfo(carId).name}}</h1>
      </div>
      <div class="touring-car-location">
          <img :src="icons.location">
          <span>取车地点：{{touringCarInfo(carId).pickUpPlace}}</span>
      </div>
      <div class="touring-car-usetime">
        <div class="select-left">
            <p class="begin-date">{{touringCarDate(carId).pickup}}</p>
            <p>取车<span v-if="touringCarSetting.leastAdvanceReserveDays == 0">(今天)</span></p>
        </div>
        <img :src="icons.fromto">
        <div class="select-right">
          <p class="end-date">{{touringCarDate(carId).return}}</p>
          <p>还车(共<span>{{totalDays}}</span>天)</p>
        </div>
      </div>
      <div class="touring-car-useinfo">
          <div class="useinfo-title">租车</div>
          <div class="useinfo-detail" :class="{'err':err && (carBeginTime.trim(' ') == '' || returnPlaceName.trim(' ') == '')}">
              <div class="fetchcar-time">
                  <span :class="{'err-text':err && carBeginTime.trim(' ') == ''}">取车时间</span>
                  <div class="select-item" @click="selectOther(0)">
                    <span v-if="carBeginTime" class="exist">{{carBeginTime}}</span>
                    <span v-if="!carBeginTime">选择</span>
                    <img :src="icons.angleLeft">
                  </div>
              </div>
              <div class="returncar-site">
                  <span :class="{'err-text':err && returnPlaceName.trim(' ') == ''}">还车地点</span>
                  <div class="select-item" @click="selectOther(1)">
                    <span v-if="!returnPlaceName.trim(' ') == ''" class="exist">{{returnPlaceName}}</span>
                    <span v-if="returnPlaceName.trim(' ') == ''">选择</span>
                    <img :src="icons.angleLeft">
                  </div>
              </div>
              <div class="fetchcar-sum">
                  <span>车辆数</span>
                  <div class="select-item">
                    <div class="item-num">
                      <span @click="changeCarQuantity(0)">-</span>
                      <span class="car-quantity">{{quantity}}</span>
                      <span @click="changeCarQuantity(1)">+</span>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="touring-car-tourist" v-if="!selectTourist" @click="selectCustom">
          <span :class="{'err-text':err && (touristSelected.length == 0 || touristSelected.length != quantity)}">选择游客</span>
          <img :src="icons.angleLeft">
      </div>
      <div class="touring-car-touristInfo" v-if="selectTourist">
          <span :class="{'err-text':err && (touristSelected.length == 0 || touristSelected.length != quantity)}">游客信息</span>
          <div class="tourist-item" v-for="(item, index) in touristSelected" :key="index">
              <div class="tourist-item-detail">
                  <span>姓名</span><p>{{item.name}}</p>
              </div>
              <div class="tourist-item-detail">
                  <span>手机号</span><p>{{item.phone}}</p>
              </div>
              <div class="tourist-item-detail">
                  <span>身份证号</span><p>{{item.idCard}}</p>
              </div>
              <div class="tourist-item-detail">
                  <span>驾照类型</span><p>{{item.driverType}}</p>
              </div>
              <div class="tourist-item-detail">
                  <span>驾龄</span><p>{{item.driverAge}}</p>
              </div>
          </div>
          <div class="tourist-item-reset">
              <span @click='selectCustom'>重新选择游客&nbsp;></span>
          </div>
      </div>
      <div class="touring-car-custominfo">
          <span>预订人信息</span>
          <div class="touring-car-custominfo" :class="{'err':err && (checkName(contactData.realName) || checkPhone(contactData.phone))}">
              <div class="custominfo-contact">
                  <span :class="{'err-text':err && checkName(contactData.realName)}">联系人</span>
                  <input type="text" placeholder="请输入姓名" v-model="contactData.realName" @input="updateContact">
              </div>
              <div class="custominfo-phone">
                  <span :class="{'err-text':err && checkPhone(contactData.phone)}">手机号码</span>
                  <input type="text" placeholder="请输入手机号" v-model.number="contactData.phone" @input="updateContact">
              </div>
          </div>
      </div>
      <div class="touring-car-special-demand" @click='writeSpecialDemand'>
          <span>特殊要求</span>
          <div>
            <span v-show="demandFill">已填写</span>&nbsp;
            <img :src="icons.angleLeft">
          </div>
      </div>
      <div class="touring-car-order-clause" :class="{'err':err && !clauseCheck}">
          <div class="clause-item">
            <div class="clause-circle" @click="checkClause">
                <img v-show="clauseCheck" :src="icons.checkMark">
                <img v-show="!clauseCheck" :src="icons.checkCircle">
            </div>
                <p>已认真阅读并同意遵守&nbsp;
                  <a href="javascript:;" @click='goToTerm'>《房车预订条款》</a>
                </p>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
    name: 'gz-order-tourcar',
    data() {
        return {
            clauseCheck: true,
            err: false,
            demandFill: false,
            contactData: {
                realName: '',
                phone: '',
            },
            carId: '',
            icons: {
                location: require('../../biz/icon/location.svg'),
                fromto: require('../../biz/icon/fromto.svg'),
                angleLeft: require('../../biz/icon/angle-left.svg'),
                checkMark: require('../../biz/icon/check-mark.svg'),
                checkCircle: require('../../biz/icon/check-circle.svg'),
            },
        };
    },
    computed: {
        ...mapGetters([
            'touringCarInfo', 'touringCarDate',
            'touringCarSetting', 'pickupPlace',
            'carBeginTime',
            'returnPlaceId', 'returnPlaceName', 'returnPlace',
            'quantity', 'touristSelected', 'contactName', 'contactPhone', 'specialDemand',
        ]),
        totalDays() {
            return moment(this.touringCarDate(this.carId).return).add(1, 'days').diff(moment(this.touringCarDate(this.carId).pickup), 'days');
        },
        selectTourist() {
            if (this.touristSelected.length === 0) {
                return false;
            }
            return true;
        },
    },
    methods: {
        ...mapActions([
            'getOrderTourcarReturn', 'setOrderQuantity', 'getOrderCantact',
        ]),
        goToTerm() {
            this.$router.push({
                path: '/reverse-terms',
                orderType: 1,
            });
        },
        writeSpecialDemand() {
            this.$router.push({
                path: '/special-demand',
            });
        },
        selectCustom() {
            this.$router.push({
                path: '/account/tourists',
                query: {
                    select: true,
                    carId: this.carId,
                    type: this.$route.query.type,
                },
            });
        },
        changeCarQuantity(_type) {
            if (_type === 0) {
                if (this.quantity === 1) {
                    this.$notify({
                        message: '不能少于一辆',
                    });
                    return;
                }
                this.setOrderQuantity(this.quantity - 1);
            } else {
                this.setOrderQuantity(this.quantity + 1);
            }
        },
        updateContact() {
            this.$store.commit('GET_ORDER_CANTACT', this.contactData);
        },
        selectOther(_type) {
            this.$emit('otherPicker', _type);
        },
        checkClause() {
            this.clauseCheck = !this.clauseCheck;
        },
        checkName(name) {
            const textName = new RegExp('^[A-Za-z\\u4e00-\\u9fa5]{1,9}$');
            if (!textName.test(name)){
                return true;
            }
            return false;
        },
        checkPhone(phone) {
            const textPhone = new RegExp('^[1][3-9][0-9]{9}$');
            if (!textPhone.test(phone)) {
                return true;
            }
            return false;
        },
        fetchData() {
            if (!(this.contactName && this.contactPhone)) {
                this.getOrderCantact()
                  .then(() => {
                      const obj = {
                          realName: this.contactName || '',
                          phone: this.contactPhone || '',
                      }
                      this.$set(this, 'contactData', obj);
                  })
                  .catch((error) => {
                      this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                  });
            } else {
                  const obj = {
                      realName: this.contactName || '',
                      phone: this.contactPhone || '',
                  }
                  this.$set(this, 'contactData', obj);
            }
        },
    },
    created() {
        this.$set(this, 'carId', this.$route.query.carId);
        if (this.specialDemand !== '' || this.specialDemand.trim(' ') !== '') {
            this.demandFill = true;
        }
        this.fetchData();
    },
};
</script>

<style lang="less">
#touring-car-order {
    padding: 50px 24px 0;
    .touring-car-name{
        width: 100%;
        h1{
            font-size: 50dpx;
        }
    }
    .touring-car-location{
        display: flex;
        font-size: 24dpx;
        align-items: center;
        color: #666666;
        line-height: 38dpx;
        padding-top:30px;
        padding-bottom: 100px;
        border-bottom: 1rpx solid #dddddd;
        img{
            display: inline-block;
            width: 26px;
            height: 28px;
            margin-right:20px;
        }
    }
    .touring-car-usetime{
        height: 187px;
        border-bottom:1rpx solid #dddddd;
        padding: 50px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999999;
        font-size: 24dpx;
        .begin-date,
        .end-date{
            line-height: 150%;
            font-size: 36dpx;
            color: #333333;
            margin-bottom: 24px;
        }
        img{
            height: 85px;
            width: 85px;
        }
    }
    .touring-car-useinfo{
        padding-top: 100px;
        color: #666666;
        .useinfo-title{
            font-size: 36dpx;
        }
        .useinfo-detail{
            display: flex;
            flex-direction: column;
            margin-top: 50px;
            height: 423px;
            background: #dddddd;
            border: 1rpx solid #dddddd;
            border-radius: 10rpx;
            padding: 50px;
            .fetchcar-time,
            .returncar-site,
            .fetchcar-sum{
                font-size: 32dpx;
                line-height: 69px;
                height: 69px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 63px;
                &>span{
                    width: 215px;
                    display: block;
                }
                .select-item{
                    width: 482px;
                    height: 69px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1rpx solid #dddddd;
                    span{
                        color: #999999;
                        &.exist{
                            color: #333333;
                        }
                    }
                    img {
                        transform: rotate(180deg);
                        width: 14px;
                        height: 25.9px;
                    }
                }
            }
            .fetchcar-sum{
                margin-bottom: 0;
                .item-num{
                    width: 263px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 36dpx;
                    .car-quantity{
                        color: #333333;
                    }
                }
            }
        }
    }
    .touring-car-tourist{
        height: 117px;
        padding: 50px 0 30px 0;
        width: 100%;
        border: 1rpx solid #ffffff;
        border-bottom:1rpx solid #dddddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>span{
            font-size: 36dpx;
            color: #333333;
            display: block;
        }
        img{
            transform: rotate(180deg);
            width: 14px;
            height: 25.9px;
        }
    }
    .touring-car-touristInfo{
        padding: 127px 0 0 0;
        font-size: 36dpx;
        color: #666666;
        .tourist-item{
            margin-top: 50px;
            background: #F0F0F0;
            border-radius: 10rpx;
            padding: 56px 47.2px 71px 50px;
            .tourist-item-detail{
                margin-top: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 32dpx;
                &:first-of-type{
                    margin-top: 0;
                }
                p{
                    display: flex;
                    align-items: center;
                    color: #333333;
                    height: 69px;
                    border-bottom: 1rpx solid #dddddd;
                    width: 432.8px;
                }
            }
        }
        .tourist-item-reset{
            margin-top: 50px;
            display: flex;
            justify-content: center;
        }
    }
    .touring-car-custominfo{
        padding-top: 100px;
        color: #666666;
        span{
            font-size: 36dpx;

        }
        .touring-car-custominfo{
            display: flex;
            flex-direction: column;
            margin-top: 50px;
            padding: 50px;
            font-size: 32 dpx;
            border: 1rpx solid #F0F0F0;
            background: #F0F0F0;
            border-radius: 10rpx;
            .custominfo-contact,
            .custominfo-phone{
                width: 100%;
                overflow: hidden;
                margin-bottom:62px;
                span{
                    display: inline-block;
                    vertical-align: top;
                    height: 70px;
                    line-height: 70px;
                    padding-right: 30px;
                }
                input{
                    display: inline-block;
                    vertical-align: top;
                    background: #F0F0F0;
                    width: 400px;
                    line-height: 70px;
                    border-bottom:1rpx solid #dddddd;
                    font-size: 32dpx;
                }
            }
            .custominfo-phone{
                margin-bottom: 0;
            }
        }
    }
    .touring-car-special-demand{
        padding-top: 100px;
        overflow: hidden;
        padding-bottom:30px;
        border-bottom:1rpx solid #dddddd;
        font-size:36dpx;
        span{
            display: block;
            float: left;
        }
        div{
            float: right;
            color: #999999;
            font-size: 28dpx;
            img{
                transform: rotate(180deg);
                width: 14px;
                height: 25.9px;
            }
        }
    }
    .touring-car-order-clause{
        padding: 100px 0;
        width: 100%;
        border: 1rpx solid #ffffff;
        .clause-item{
            font-size:28dpx;
            color: #999999;
            .clause-circle{
                float: left;
                width: 34px;
                height: 34px;
                margin-right: 24px;
                img{
                    width: 34px;
                    height: 34px;
                }
            }
            p{
                float: left;
                line-height: 34dpx;
                a {
                    text-decoration: underline;
                }
            }
        }
    }
    .err{
        border: 1rpx solid #FF4847 !important;
        border-radius: 10rpx;
    }
    .err-text{
        color: #FF4847 !important;
    }
}
</style>
