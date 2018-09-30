<template>
  <div class="biz-order-cancel">
    <div class="order-cancel-select" v-if="step == 2" @click="chooseReason">
      <span>{{reason == '' ? '请选择取消订单原因' : reason}}</span>
      <span class="cate-list-arrow"></span>
      <div class="bottom">
      </div>
    </div>

    <div class="order-cancel" v-if="step == 1 || step == 3 || step == 4">
      <div class="cancel-img">
        <img :src="img" alt="">
      </div>
      <h1 v-if="step == 1">是否要取消订单？</h1>
      <h1 v-if="step == 4">您的订单取消成功！</h1>
      <h1 v-if="step == 3">您的订单取消申请已提交</h1>
      <h1 v-if="step == 3" style="margin-top:10px;">请等待审核!</h1>
    </div>

    <div class="order-detail">
      <div><span>订单编号：</span><span>{{orderDetail.code}}</span></div>
      <div><span>产品名称：</span><span>{{orderDetail.name}}</span></div>
      <!-- 预留改版，不要删 -->
      <!-- <span v-if="orderDetail.orderType==1">订单金额：￥{{orderDetail.price}}</span> -->
    </div>

    <div class="order-button" v-if="step == 1">
      <span class='confirm' @click="confirm">确定取消</span>
      <span class="cancel" @click="cancel">点错了，返回</span>
    </div>

    <div class="rule-radio"  v-if="step == 2" @click="setRuleChoose">
      <div class="radio-button" :class="{'radio-active':ruleSelect}">
        <div class="check"></div>
      </div>

      <!-- <span>已认真阅读并同意遵守 <span class="link" href="#" @click="goTerms($event)">{{orderDetail.orderType==1?'房车取消预订条款':'营位取消预订条款'}}</span></span> -->

      <p>已认真阅读并同意遵守&nbsp;<span @click="goTerms($event)">{{orderTypeName}}取消预订条款</span></p>

    </div>

    <div class="order-rule" v-if="step == 1">
      <p v-for="item in otherInfo.content.split('\n')">{{ item }}</p>
    </div>

    <div class="submit-button"  v-if="step == 2 || step == 3 || step == 4">
      <span v-if="step == 2" :class="{'actice':ruleSelect}" @click="submit()">提交</span>
      <span v-if="step == 3" @click="check()">查看订单详情</span>
      <span v-if="step == 4" @click="checkMore()">继续探索</span>
    </div>

  </div>
</template>

<script>
// type=1：房车
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'order-cancel',
    data() {
        return {
            // step: 1, // 1:初始2:点了取消3：待审核4：成功
            ruleSelect: false,
            img: require('../../../../public/img/group-2.svg'),
            orderTypeName: '',
        };
    },
    props: {
        reason: '',
        orderDetail: {
            type: Object,
            default() {
                return {};
            },
        },
        step: '',
    },
    computed: {
        ...mapGetters([
            'otherInfo',
        ]),
    },
    methods: {
        goTerms(e) {
            e.stopPropagation();
            this.$router.push({
                path: '/order-cancel/terms',
                query: {
                    source: this.orderDetail.orderType,
                },
            });
        },
        ...mapActions(['getOtherInfo']),
        setRuleChoose() {
            this.ruleSelect = !this.ruleSelect;
        },
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            this.$router.back();
        },
        submit() {
            if (!this.ruleSelect) {
                this.$emit('submit');
                if (this.orderDetail.orderType === 1) {
                    // this.step = 4;
                    this.img = require('../../../../public/img/group-success.svg');
                } else {
                    // this.step = 3;
                }
            }
        },
        chooseReason() {
            this.$emit('chooseReason');
        },
        check() {
            this.$router.push({
                path: '/order-detail',
                query: {
                    id: this.orderDetail.number,
                    orderType: this.orderDetail.orderType,
                },
            });
        },
        checkMore() {
            this.$router.push({
                path: '/home',
            });
        },
    },
    mounted() {
        if (parseInt(this.$route.query.orderType, 10) === 1) {
            this.$set(this, 'orderTypeName', '房车');
            this.getOtherInfo(2).then(() => {
            });
        } else {
            this.$set(this, 'orderTypeName', '营位');
            this.getOtherInfo(3).then(() => {
            });
        }
    },
};
</script>

<style lang="less">
.biz-order-cancel{
  .actice {
      background-color: #dddddd !important;
      border: 1rpx solid #dddddd;
      transition: background-color 200ms;
  }
  .radio-active {
    transition: background-color 200ms;
    background-color: white !important;
    border: 1rpx solid dimgray;
  }
  .order-cancel {
      .cancel-img {
          width: 249px;
          height: 118px;
          margin: 99px auto 0;
          img{
            width: 100%;
            height: 100%;
          }
      }
      h1 {
          font-size: 28dpx;
          letter-spacing: -1.7px;
          color: #4a4a4a;
          text-align: center;
          margin-top: 42px;
      }
  }
  .order-detail {
      margin: 88px 24px 0;
      color: #666666;
      font-size: 28dpx;
      div {
          margin-bottom: 24px;
          span {
              display: inline-block;
              vertical-align: top;
              &:nth-child(2) {
                  width: 70%;
              }
          }
      }
  }
  .order-button {
      margin: 0 25px;
      padding-top: 100px;
      span {
          display: inline-block;
          width: 340px;
          height: 80px;
          border-radius: 10px;
          line-height: 80px;
          text-align: center;
          font-size: 28dpx;
          letter-spacing: -1.7px;
          color: #ffffff;
      }
      .cancel {
          background-color: #ff4847;
          margin-left: 20px;
      }
      .confirm {
          background-color: #333333;
      }
  }
  .order-rule {
      margin: 79px 24px 0;
      p {
          font-size: 24dpx;
          line-height: 1.67;
          color: #999999;
      }
  }
  .order-cancel-select {
      margin: 50px 30px 0;
      font-size: 36dpx;
      color: #4a4a4a;
      .bottom {
          height: 2px;
          background-color: #979797;
          margin-top: 30px;
      }
  }
  .cate-list-arrow {
      float: right;
      display: inline-block;
      width: 25px;
      height: 25px;
      border-top: 1rpx solid #666666;
      border-right: 1rpx solid #666666;
      transform: rotate(45deg);
  }

  .submit-button {
      margin: 101px 24px 0;
      height: 80px;
      border-radius: 10px;
      background-color: #ff4847;
      line-height: 80px;
      text-align: center;
      color: white;
      font-size: 32dpx;
      span {
          width: 100%;
          display: inline-block;
      }
  }

  .rule-radio {
      margin: 102px 24px 0;
      // transition: background-color 200ms;
      p {
          margin-left: 24px;
          font-size: 28dpx;
          // font-weight: 300;
          color: #666666;
          span{
              text-decoration: underline;
          }
      }
      .link {
        color: #666666;
        text-decoration: underline;
      }
      .radio-button {
          float: left;
          width: 34px;
          height: 34px;
          background-color: #ff4544;
          border-radius: 50%;
          line-height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          .check {
              width: 12.8px;
              height: 18px;
              border-right: solid 2rpx #ffffff;
              border-bottom: solid 2rpx #ffffff;
              transform: rotate(30deg);
          }
      }
  }
}

</style>
