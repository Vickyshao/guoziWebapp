<template>
  <div class="my-order-list">
    <div class="order-list" v-for="item in orderList" @click="goDetail(item.id,item.orderType)">
      <div class="order-tite">
        <span class="icon"><img :src="item.orderType == 2 ? icons.campsiteOrder : icons.touringCarOrder"></span>
        <span class="title">{{item.productName}}</span>
        <span class="status failed" v-if="item.state==0">待付款</span>
        <span class="status failed" v-if="item.state==1">待确认</span>
        <span class="status failed" v-if="item.state==2">{{item.orderType==1?"待取车":"待入场"}}</span>
        <span class="status success" v-if="item.state==3">已完成</span>
          <span class="status success" v-if="item.state==5">已取消</span>
        <!--

        0：待付款，1：待确认，2：待取车（待入场），3：已完成，5：已取消 ,
       -->
      </div>
      <div class="order-content">
        <span class="time">{{item.orderType==1?"下单时间： ":"下单时间： "}} {{item.createAt | time(item.createAt)}}</span>
        <!-- 预留改版，不要删 -->
        <!-- <span class="money" v-if="item.orderType==1">￥{{item.orderAmount}}</span> -->
      </div>
      <div class="order-button">
        <div class="order-icon">
          <img class="iscomment-icon" :class="{'comment-show':item.isComment}" :src="icons.isComment" alt="">
          <label for="" :class="{'comment-show':item.isComment}" class="isComment">已点评</label>
        </div>
        <div class="">
          <span class="comment" v-if="item.state==1|| item.state==2 " @click="cancelOrder(item,$event)">取消订单</span>
          <span class="comment" v-if="item.state==3 && !item.isComment" @click="comment(item,$event)">{{item.isComment?"已点评":"点评"}}</span>
          <span class="order-again" v-if="item.state==3 || item.state==2 ||item.state==1||item.state==5" @click="orderAgain(item,$event)">再次预订</span>
          <!-- <span class="order-pay" v-if="item.state==0">付款</span> -->
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import NoResult from '../no-result';

export default {
    name: 'order-list',
    props: {
        orderList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            line: ['没有订单哦！'],
            showNoResult: false,
            icons: {
                campsiteOrder: require('../../../../public/img/campsite-order.svg'),
                touringCarOrder: require('../../../../public/img/touring-car-order.svg'),
                isComment: require('../../../../public/img/is-comment.svg'),
            },
        };
    },
    components: {
        [NoResult.name]: NoResult,
    },
    methods: {
        cancelOrder(item, event) {
            event.stopPropagation();
            const query = {
                number: item.id,
                name: item.productName,
                price: item.orderAmount,
                orderType: item.orderType,
                code: item.code,
            };
            this.$store.commit('SET_CANCEL_ORDER_DETAIL', query);
            this.$router.push({
                path: '/order-cancel',
                query,
            });
        },
        orderAgain(item, e) {
            e.stopPropagation();
            this.$emit('orderAgain', item);
        },
        goDetail(id, orderType) {
            this.$router.push({
                path: '/order-detail',
                query: {
                    id,
                    orderType,
                },
            });
        },
        comment(item, event) {
            event.stopPropagation();
            if (!item.isComment) {
                this.$router.push({
                    path: '/comments',
                    query: {
                        orderId: item.id,
                        name: item.productName,
                        orderType: item.orderType,
                    },
                });
            }
        },
    },
};
</script>

<style lang="less">
.my-order-list{
  .no-result-list {
      padding-top: 150px;
  }
  .order-icon{
    display: flex;
  }
  .iscomment-icon{
    margin-left: 69px;
    width: 30px;
    height: 30px;
    opacity: 0;
  }
  .isComment{
    margin-left: 5px !important;
    font-size: 24dpx;
    text-align: center;
    color: #f5a623;
    opacity: 0;
  }
  .comment-show{
    opacity: 1;
  }
  .customContent {
      margin: 0 24px;
      border-radius: 10px;
      background-color: #ff4847;
      span {
          color: white !important;
      }
      font-size: 32dpx;
      margin-top: 122px;
      height: 80px;
      line-height: 80px;
  }
  .order-list {
      // height: 301px;
      border-bottom: 2rpx solid #dddddd;
      margin: 0 24px;
      .order-tite {
          padding-top: 53px;
          .icon {
              width: 40px;
              height: 40px;
              display: inline-block;
              font-size: 32dpx;
              color: #4a4a4a;
              img{
                width: 100%;
                height: 100%;
              }
          }
          .title {
              display: inline-block;
              margin-left: 29px;
              font-size: 32dpx;
              color: #4a4a4a;
              max-width: 330px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
          }
          .status {
              float: right;
              font-size: 28dpx;
          }
          .success {
              color: #7ed321;
          }
          .failed {
              color: #ff4544;
          }
      }
      .order-content {
          padding-top: 28px;
          .icon {
              font-size: 32dpx;
              color: #4a4a4a;
              opacity: 0;
          }
          .time {
              margin-left: 69px;
              font-size: 28dpx;
              color: #666666;
          }
          .money {
              float: right;
              color: #4a4a4a;
              font-size: 32dpx;
          }
      }
      .order-button {
          width: 100%;
          padding-top: 28px;
          padding-bottom: 30px;
          display: flex;
          justify-content: space-between;
          label{
            margin-left: 69px;
          }
          span {
              width: 160px;
              height: 60px;
              border-radius: 10px;
              font-size: 28dpx;
              text-align: center;
              display: inline-block;
              line-height: 60px;
          }
          // float: right;
          .comment {
              border: solid 1rpx #dddddd;
              color: #666666;
              margin-right: 30px;
          }
          .order-again {
              background-color: #333333;
              color: #ffffff;
          }
          .order-pay {
              background-color: #ff4847;
              color: #ffffff;
          }
      }
  }
}

</style>
