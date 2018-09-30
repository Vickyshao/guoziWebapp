<template>
  <div class="order-detail">
   <div class="order-title">
    <span v-if="detail.state==0">订单状态：待付款</span>
    <span v-if="detail.state==1">订单状态：待确认</span>
    <span v-if="detail.state==2">订单状态：待取车</span>
    <span v-if="detail.state==3">订单状态：已完成</span>
    <span v-if="detail.state==5">订单状态：已取消</span>

   </div>
   <!-- 支付相关隐藏勿删 -->
    <!-- <div class="order-price-detail" v-if="detail.orderType == 1">
      <span class="price">{{detail.state==0?&quot;待支付&quot;:&quot;在线支付&quot;}}：￥{{detail.price*detail.quantity | toFixed(2)}}</span>
      <span class="weixin-pay" v-if="detail.state !=0">微信支付</span>
      <div class="">
       <span class="check-detail" @click="checkDetail()">查看费用明细</span>
       <span class="cate-list-arrow"></span>
      </div>
   </div> -->
   <div class="order-cancel-detail" v-if="detail.state == 5">
    <div class="control-group">
     <span class="span-title" v-if="detail.operateType==1">用户取消： <span class="info">{{detail.cancelReason}}</span> </span>
     <span class="span-title" v-if="detail.operateType==3">支付超时取消：</span>
     <span class="span-title" v-if="detail.operateType==2">客服取消：<span class="info">{{detail.cancelReason}}</span> </span>
     <span class="button-cancel" @click="orderAgain">再次预订</span>
    </div>
    <div class="control-group">
     <span class="span-title">取消时间：<span class="info">{{detail.cancelTime | time(detail.cancelTime)}}</span></span>
    </div>
     <!-- 支付相关隐藏勿删 -->
    <!-- <div class="control-group" v-if="detail.orderType == 1 && detail.refundInfo && detail.refundInfo.refundState!=4">

     <span class="span-title">退款状态：<span class="info" v-if="detail.refundInfo && detail.refundInfo.refundState==1">退款审核中</span> <span class="info" v-if=" detail.refundInfo && detail.refundInfo.refundState==2">退款失败，原因：{{detail.refundInfo && detail.refundInfo.refundNote}}</span>
      <span class="info" v-if="detail.refundInfo && detail.refundInfo.refundState==3">退款成功，退款金额：{{detail.refundInfo && detail.refundInfo.refundAmount}}</span> </span>
    </div> -->
   </div>
 <div class="order-button">
    <!-- 支付相关隐藏勿删 -->
    <!-- <span class="cancel" v-if="detail.state ==0">付款</span> -->
    <!--<span class="cancel" v-if="detail.state ==3" @click="goComment()">{{detail.isComment?&quot;已点评&quot;:&quot;点评&quot;}}</span>-->
    <div v-if="detail.state ==3" @click="goComment()">
        <div v-if="detail.isComment" class="order-icon">
            <img class="iscomment-icon" :src="icons.isComment">
            已点评
        </div>
        <span class="cancel" v-else="detail.isComment">点评</span>
    </div>
    <span class="cancel" v-if="detail.state ==1 || detail.state ==2" @click="cancelOrder">取消订单</span>
    <span class="again" v-if="detail.state ==1 || detail.state ==2 || detail.state ==3" @click="orderAgain">再次预订</span>
   </div>
    <div class="order-content">
      <span>订单编号：{{detail.code}}</span>
      <div>
          <span>{{detail.orderType == 1 ? '车辆名称：' : '营位名称：'}}</span><span>{{detail.orderType == 1 ? detail.touringCarName : detail.campsiteName}}</span>
      </div>
      <div v-show="detail.orderType ==1">
          <span>取车地点：</span><span>{{detail.pickUpPlaceName}}</span>
      </div>
      <div v-if="detail.orderType ==1">
          <span>还车地点：</span><span>{{detail.returnPlaceName}}</span>
      </div>
      <span>下单时间：{{detail.createAt | time(detail.createAt)}}</span>
      <span>{{detail.orderType == 1 ? '取车日期：' : '入场日期：'}}{{detail.orderType == 1? detail.beginDate : detail.beginDate | splitTime(detail.beginDate)}} {{detail.beginTime}}</span>
      <!-- <span>{{detail.orderType == 1 ? '取车时间：' : '入场时间：'}}{{detail.beginTime}}   </span> -->
      <span>{{detail.orderType == 1 ? '还车日期：' : '离场日期：'}}{{detail.endDate}} (共{{detail.reserveDays}}天)</span>
      <span>{{detail.orderType == 1 ? '租车数量：' : '营位数量：'}}{{detail.quantity}}</span>
      <span v-if="detail.orderType ==1 && detail.state == 3">车辆使用情况：</span>

      <div class="order-result" v-if="detail.orderType ==1 && detail.state == 3" v-for="(item,index) in detail.orderCarPickUps">
       <div class="">
          <span>车辆{{index+1}}： </span><span>{{item.numberPlate}}</span>
       </div>
       <div class="">
          <span>真实取车日期：</span><span>{{item.takeCarDate | splitTime(item.takeCarDate)}}</span>
       </div>
       <div class="">
          <span>真实取车时间：</span><span>{{item.takeCarTime }}</span>
       </div>
      </div>

   </div>



   <div class="order-tourist-info">
    <div class="title">
      {{detail.orderType == 1? '游客信息': '入场车辆联系人信息'}}
    </div>
    <div class="content" v-for="item in detail.tourists" v-if="detail.orderType == 1">
     <div class="controll">
      <div class="common label">
        姓名
      </div>
      <div class="common value">
        {{item.name}}
      </div>
     </div>
     <div class="controll">
      <div class="common label">
        手机号
      </div>
      <div class="common value">
        {{item.phone}}
      </div>
     </div>
     <div class="controll">
      <div class="common label">
        身份证号
      </div>
      <div class="common value">
        {{item.idCard}}
      </div>
     </div>
     <div class="controll">
      <div class="common label">
        驾照类型
      </div>
      <div class="common value">
        {{item.driverTypeName?item.driverTypeName:"未填写"}}
      </div>
     </div>
     <div class="controll">
      <div class="common label">
        驾龄
      </div>
      <div class="common value">
        {{item.driverAgeName?item.driverAgeName:"未填写"}}
      </div>
     </div>
    </div>
    <div class="content contactInfos" v-if="detail.orderType == 2">
     <div class="controll" v-for="item in detail.contactInfos">
      <div class="common label">
        {{item.name}}
      </div>
      <div class="common value">
        {{item.phone}}
      </div>
      <div class="" style="clear:both">
      </div>
     </div>
    </div>
   </div>
   <div class="order-tourist-info">
    <div class="title">
      预订人信息
    </div>
    <div class="content orderer">
     <div class="controll">
      <div class="common label">
        姓名
      </div>
      <div class="common value">
        {{detail.contactName?detail.contactName:'未填写'}}
      </div>
     </div>
     <div class="controll">
      <div class="common label">
        手机号
      </div>
      <div class="common value">
        {{detail.contactPhone?detail.contactPhone:'未填写'}}
      </div>
     </div>
    </div>
   </div>
   <div class="order-require" @click="goRequirement">
    <span>特殊要求</span>
    <div class="">
     <span class="already-write">{{detail.specialDemand ? '已填写' : '无'}}</span>
     <span class="cate-list-arrow" v-if="detail.specialDemand"></span>
    </div>
   </div>
   <div class="customer-comment" v-if="detail.note">
    <span>客服备注</span>
    <p>{{detail.note}}</p>
   </div>
   <div class="btn" v-if="(detail.state == 3 || detail.state == 5) &amp;&amp; detail.orderType == 1" @click="call">
    <span class="button">申请售后</span>
   </div>
   <gz-mask :show="show" class="demand-mask">
    <div class="tel-wrap">
     <div class="tel">
      <div class="close" @click="checkDetail()">
       <img :src="icons.group" alt="" />
      </div>
      <div class="title">
        房车费用明细
       <div class="detail">
        <span>支付定金</span>
        <span>￥{{detail.price | toFixed(2)}} x{{detail.quantity}}</span>
       </div>
      </div>
      <div class="total">
        合计：￥{{detail.price*detail.quantity | toFixed(2)}}
      </div>
     </div>
    </div>
   </gz-mask>
  </div>
</template>

<script>
//     <!--
//    订单状态，1：待付款，2：待确认，3：待取车，4：已完成,-1=已取消 , old
//    0：待付款，1：待确认，2：待取车（待入场），3：已完成，5：已取消 , new
//   -->
//
// <!--1=退款待处理、2=需要退款未退款、3=需要退款已退款、4=不需要退款  -->
export default {
    name: 'order-detail',
    data() {
        return {
            show: false,
            icons: {
                group: require('../../../../public/img/group.svg'),
                isComment: require('../../../../public/img/is-comment.svg'),
            },
        };
    },
    props: {
        detail: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        goRequirement() {
            if (this.detail.specialDemand) {
                this.$router.push({
                    path: '/special-requirement',
                });
            }
        },
        checkDetail() {
            this.show = !this.show;
        },
        call() {
            this.$emit('call');
        },
        orderAgain() {
            this.$emit('orderAgain', this.detail.orderType);
        },
        goComment() {
            if (!this.detail.isComment) {
                this.$router.push({
                    path: '/comments',
                    query: {
                        orderId: this.detail.id,
                        name: this.detail.orderType === 1 ?
                        this.detail.touringCarName : this.detail.productName,
                        orderType: this.detail.orderType,
                    },
                });
            }
        },
        cancelOrder() {
            const query = {
                number: this.detail.id,
                name: this.detail.orderType == 1 ? // eslint-disable-line
                this.detail.touringCarName : this.detail.projectName,
                price: this.detail.orderAmount,
                orderType: this.detail.orderType,
                code: this.detail.code,
            };
            this.$store.commit('SET_CANCEL_ORDER_DETAIL', query);
            this.$router.push({
                path: '/order-cancel',
                query: query,
            });
        },
    },
};
</script>

<style lang="less">

.order-detail {
  .demand-mask {
      color: #585858;
      font-size: 28dpx;
      .tel-wrap {
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: #fff;
          .tel {
              margin: 50px 24px 0;
              height: 634px;
          }
          .title {
              font-size: 50dpx;
              font-weight: 600;
              text-align: justify;
              color: #4a4a4a;
              padding-top: 50px;
              padding-left: 13px;
              .detail {
                  display: flex;
                  justify-content: space-between;
                  padding-top: 233px;
                  font-size: 28dpx;
                  text-align: right;
                  color: #333333;
                  padding-bottom: 51px;
                  border-bottom: 1rpx solid #dddddd;
              }
          }
          .total {
              padding-top: 50px;
              font-size: 32dpx;
              text-align: right;
              color: #333333;
          }
      }

  }
    margin: 50px 24px 0;
    .order-title {
        span {
            font-size: 50dpx;
            font-weight: 600;
            color: #4a4a4a;
        }
    }
    .order-cancel-detail {
        padding-top: 26px;
        font-size: 28dpx;
        line-height: 1.43;
        color: #666666;
        .control-group{
          padding-top: 24px;
          text-align: center;
          display: flex;
          justify-content: space-between;

          .info{
            max-width: 336px;
            max-height: 90px;
            overflow: hidden;
            text-align: left;
          }
        }
        .span-title{
          display: flex;
          justify-content: space-between;
        }
        .button-cancel {
            width: 160px;
            height: 60px;
            border-radius: 10rpx;
            background-color: #333333;
            color: white;
            line-height: 60px;
        }
    }
    .order-price-detail {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding-bottom: 43px;
        border-bottom: solid 1rpx #dddddd;
        padding-top: 24px;
        .price {
            font-size: 28dpx;
            line-height: 1.36;
            text-align: justify;
            color: #666666;
        }
        .weixin-pay {
            padding: 3px 6px;
            border-radius: 8px;
            background-color: #7ed321;
            font-size: 20dpx;
            text-align: center;
            color: #ffffff;
            margin-left: 20px;
        }
        .check-detail {
            color: #999999;
            font-size: 24dpx;
        }
    }
    .order-button {
        padding-top: 50px;
        padding-bottom: 50px;
        border-bottom: 1rpx solid #dddddd;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        span {
            display: inline-block;
            width: 160px;
            height: 60px;
            border-radius: 10px;
            border: solid 1rpx #dddddd;
            font-size: 28dpx;
            text-align: center;
            line-height: 60px;
        }
        .cancel {
            color: #666666;
            margin-right: 21px;
        }
        .again {
            background-color: #333333;
            color: #ffffff;
        }
        .order-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px 10px;
            font-size: 24dpx;
            color: #f5a623;
            margin-right: 50px;
            img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }

        }
    }

    .order-content{
        padding-top: 26px;
        padding-bottom: 50px;
        border-bottom: 1rpx solid #dddddd;
        span {
            display: block;
            margin-top: 24px;
            font-size: 28dpx;
            line-height: 1.43;
            color: #666666;
        }
        div{
            margin-top: 24px;
            span {
                margin-top: 0;
                display: inline-block;
                vertical-align: top;
                &:nth-child(2) {
                    width: 70%;
                }
            }
        }
    }
    .order-result {
        div{
            margin-top: 24px;
            span {
                margin-top: 0;
                display: inline-block;
                vertical-align: top;
                &:nth-child(2) {
                    width: 60%;
                }
            }
        }
    }
    .order-tourist-info {
        padding-top: 50px;
        .title {
            font-size: 36dpx;
            text-align: justify;
            color: #666666;
        }

        .content {
            margin-top: 50px;
            width: 702.1px;
            height: 699px;
            border-radius: 24px;
            background-color: #f0f0f0;
            padding: 0 50px 8px 47px;
            .common {
                font-size: 32dpx;
                text-align: left;
                color: #666666;
                padding-top: 56px;
                padding-bottom: 37px;
            }
            .label {
                float: left;
                width: 180px;
            }
            .value {
                float: right;
                width: 424px;
                border-bottom: solid 1rpx #dddddd;
            }
        }
        .orderer {
            height: 305px;
        }
        .contactInfos {
          height: auto;
          padding-bottom: 40px;
          .controll{
            height: auto;
          }
        }
    }

    .order-require {
        padding-top: 91px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30px;
        margin-bottom: 50px;
        border-bottom: solid 2rpx #979797;
        span {
            font-size: 36dpx;
            color: #4a4a4a;
        }
        div .already-write {
            font-size: 28dpx;
            margin-right: 24px;
            color: #999999;
        }
    }
    .customer-comment {
        padding-top: 50px;

        span {
            color: #333333;
            font-size: 36dpx;
            padding-bottom: 36px;
        }
        p {
            padding-top: 36px;
            font-size: 28dpx;
            color: #666666;
            line-height: 1.43;
            padding-bottom: 52px;
        }

    }
    .btn {
        text-align: center;
        padding-bottom: 60px;
        .button {
            width: 330px;
            height: 92px;
            border-radius: 10px;
            border: solid 1rpx #999999;
            font-size: 32dpx;
            text-align: center;
            line-height: 92px;
            color: #666666;
            display: inline-block;
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
}


</style>
