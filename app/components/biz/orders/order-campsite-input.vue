<template>
  <div class="pro-camp-order">
      <div class="pro-title">
          <span>{{projectInfo(projectId).name}}</span>
          <span class="pro-title-dot"></span>
          <span>{{projectInfo(projectId).campsiteInfo[type].name}}</span>
      </div>
      <div class="pro-camp-data">
          <div class="pro-order-tips" v-if="campsiteSetting.leastAdvanceReserveDays != 0">
              至少提前{{campsiteSetting.leastAdvanceReserveDays}}天预订
          </div>
          <div class="pro-camp-time">
              <div class="select-left" @click="selectDate('begin')">
                  <p class="begin-date">{{beginDate}}</p>
                  <p>入场
                      <span v-if="campsiteSetting.leastAdvanceReserveDays == 0">(今天)</span>&nbsp;>
                  </p>
              </div>
              <img :src="icons.fromto">
              <div class="select-right" @click="selectDate('end')">
                <p class="end-date">{{endDate}}</p>
                <p>离场（共<span>{{totalDays}}</span>天）&nbsp;></p>
              </div>
          </div>
      </div>
      <div class="pro-camp-num">
          <span>营位数</span>
          <div class="pro-camp-numSelect" @click="selectNum()">
            <span>{{quantity}}个</span>
            <img :src="icons.angleLeft">
          </div>
      </div>
      <div class="pro-camp-car">
          <span>入场车辆联系人信息</span>
          <div class="camp-carinfo" :class="{'err':err && checkContactInfos(contactInfosData)}">
              <div class="camp-carinfo-item" v-for="(item, index) in contactInfosData" :key="index">
                  <div class="carinfo-itemNum">{{index + 1}}</div>
                  <div class="carinfo-detail">
                      <div class="carinfo-detail-name">
                        <span :class="{'err-text':err && checkName(item.name)}">姓名</span>
                        <input type="text" placeholder="请输入姓名" v-model="item.name" @input="updateContactInfos">
                      </div>
                      <div class="carinfo-detail-phone">
                        <span :class="{'err-text':err && checkPhone(item.phone)}">手机号码</span>
                        <input type="text" placeholder="请输入手机号" v-model="item.phone" @input="updateContactInfos">
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="pro-camp-custominfo">
          <span>预订人信息</span>
          <div class="camp-custominfo" :class="{'err':err && (checkName(contactData.realName) || checkPhone(contactData.phone))}">
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
      <div class="camp-special-demand" @click="writeSpecialDemand">
          <span>特殊要求</span>
          <div>
            <span v-show="demandFill">已填写</span>&nbsp;
            <img :src="icons.angleLeft">
          </div>
      </div>
      <div class="camp-order-clause" :class="{'err':err && !clauseCheck}">
          <div class="clause-item">
              <div class="clause-circle" @click="checkClause">
                  <img v-show="clauseCheck" :src="icons.checkMark">
                  <img v-show="!clauseCheck" :src="icons.checkCircle">
              </div><p>已认真阅读并同意遵守&nbsp;<a
                  href="javascript:;" @click='goToTerm'>《营位预订条款》</a></p>
          </div>
      </div>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import moment from 'moment';
    import { cloneDeep } from 'lodash';

    export default {
        name: 'gz-order-campsite',
        data() {
            return {
                clauseCheck: true,
                err: false,
                demandFill: false,
                contactInfosData: [],
                contactData: {
                    realName: '',
                    phone: '',
                },
                type: 0,
                projectId: '',
                icons: {
                    fromto: require('../../biz/icon/fromto.svg'),
                    angleLeft: require('../../biz/icon/angle-left.svg'),
                    checkMark: require('../../biz/icon/check-mark.svg'),
                    checkCircle: require('../../biz/icon/check-circle.svg'),
                },
            };
        },
        methods: {
            ...mapActions([
                'setOrderCantactinfos', 'getOrderCantact',
            ]),
            goToTerm() {
                this.$router.push({
                    path: '/reverse-terms',
                    orderType: 2,
                });
            },
            selectDate(_type) {
                this.$emit('showDatePicker', _type);
            },
            selectNum() {
                this.$emit('NumPicker');
            },
            //数据检查
            checkClause() {
                this.clauseCheck = !this.clauseCheck;
            },
            writeSpecialDemand() {
                this.$router.push({
                    path: '/special-demand',
                    query: {
                        type: 'campsite',
                    },
                });
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
                if (!textPhone.test(phone)){
                    return true;
                }
                return false;
            },
            checkContactInfos(contactInfos) {
                let flag = 0;
                contactInfos.forEach((item) => {
                    if (this.checkName(item.name)) {
                        flag += 1;
                    }
                    if (this.checkPhone(item.phone)) {
                        flag += 1;
                    }
                });
                return flag;
            },
            //数据修改
            updateContactInfos() {
                this.$store.commit('SET_ORDER_CANTACTINFOS', this.contactInfosData);
            },
            updateContact() {
                this.$store.commit('GET_ORDER_CANTACT', this.contactData);
            },
        },
        created() {
            if (this.specialDemand !== '' || this.specialDemand.trim(' ') !== '') {
                this.demandFill = true;
            }
            this.$set(this, 'contactInfosData', cloneDeep(this.contactInfos));
            this.$set(this, 'type', parseInt(this.$route.query.type, 10));
            this.$set(this, 'projectId', this.$route.query.projectId);
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
        computed: {
            ...mapGetters(['projectInfo', 'campsiteSetting',
                'quantity', 'contactInfos',
                'beginDate', 'endDate',
                'contactName', 'contactPhone',
                'specialDemand',
            ]),
            totalDays() {
                return moment(this.endDate).add(1, 'days').diff(moment(this.beginDate), 'days');
            },

        },
        watch: {
            quantity(curVal, oldVal) {
                if (curVal > oldVal) {
                    for (let i = 0; i < curVal - oldVal; i += 1 ) {
                        this.contactInfosData.push({
                            name: '',
                            phone: '',
                        });
                    }
                    this.$store.commit('SET_ORDER_CANTACTINFOS', this.contactInfosData);
                } else if (curVal < oldVal) {
                    for (let i = 0; i < oldVal - curVal; i += 1 ) {
                        this.contactInfosData.pop();
                    }
                    this.$store.commit('SET_ORDER_CANTACTINFOS', this.contactInfosData);
                }
            },
        },
    };
</script>

<style lang="less">
.pro-camp-order{
    padding: 0 24px;
    .pro-title{
        border-bottom: 1rpx solid #dddddd;
        display: flex;
        align-items: center;
        padding:50px 0;
        font-size: 32dpx;
        .pro-title-dot{
            width: 12px;
            height: 12px;
            background: #666;
            display: block;
            margin: 0 25px;
            border-radius: 50%;
        }
    }
    .pro-camp-data{
        border-bottom: 1rpx solid #dddddd;
        padding: 50px 0;
        .pro-order-tips{
            font-size: 28dpx;
            color: #999999;
            line-height: 40px;
            letter-spacing: 3px;

        }
        .pro-camp-time{
            height: 187px;
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
    }
    .pro-camp-num{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 100px 0;
        font-size: 36dpx;
        color: #666666;
        &>span{
            width: 215px;
            height: 64px;
        }
        .pro-camp-numSelect{
            width: 482px;
            height: 64px;
            padding-bottom: 32px;
            border-bottom: 1rpx solid #dddddd;
            img{
                transform: rotate(180deg);
                float: right;
                width: 14px;
                height: 25.9px;
            }
        }
    }
    .pro-camp-car{
        color: #666666;
        span{
            font-size: 36dpx;
        }
        .camp-carinfo{
            margin-top: 50px;
            padding: 54px 58px 50px 63px;
            font-size: 32dpx;
            background: #F0F0F0;
            border-radius: 10rpx;
            border: 1px solid #F0F0F0;
            .camp-carinfo-item{
                display: flex;
                justify-content: space-between;
                margin-bottom: 50px;
                .carinfo-itemNum{
                    width: 67px;
                    height: 67px;
                    border-radius: 50%;
                    margin-top: 48px;
                    background: #DDDDDD;
                    text-align: center;
                    line-height: 67px;
                }
                .carinfo-detail{
                    height: 198px;
                    .carinfo-detail-name,
                    .carinfo-detail-phone{
                        overflow: hidden;
                        padding-bottom:35px;
                        span{
                            display: block;
                            float: left;
                            width: 180px;
                            height: 70px;
                        }
                        input{
                            display: block;
                            float: right;
                            background: #F0F0F0;
                            width: 281.5px;
                            padding-bottom: 35px;
                            border-bottom:1rpx solid #dddddd;
                            font-size: 32dpx;
                        }
                    }
                }
                &:last-of-type{
                  margin-bottom: 0;
                }
            }
        }
    }
    .pro-camp-custominfo{
        padding: 50px 0 100px 0;
        color: #666666;
        span{
            font-size: 36dpx;
            display: block;
        }
       .camp-custominfo{
           margin-top: 50px;
           padding: 50px;
           font-size: 32dpx;
           background: #F0F0F0;
           border: 1px solid #F0F0F0;
           border-radius: 10rpx;
           .custominfo-contact,
           .custominfo-phone{
               display: flex;
               justify-content: space-between;
               align-items: center;
               width: 100%;
               margin-bottom:62px;
               span{
                   display: block;
                   width: 154.8px;
                   height: 70px;
               }
               input{
                   display: block;
                   background: #F0F0F0;
                   width: 423.8px;
                   padding-bottom: 38px;
                   font-size: 32dpx;
                   border-bottom:1rpx solid #dddddd;
               }
           }
           .custominfo-phone{
               margin-bottom: 0;
           }
       }
    }
    .camp-special-demand{
        overflow: hidden;
        padding-bottom:30px;
        font-size:36dpx;
        border-bottom: 1rpx solid #dddddd;
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
    .camp-order-clause{
        padding: 100px 0;
        width: 100%;
        border: 1px solid #ffffff;
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
