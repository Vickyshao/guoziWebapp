<template>
    <div class="online-pay" id="online-pay">
        <gz-header
          title="在线支付"
          :iconWidth="15"
          :iconHeight="28.7"
          :customHandler="true"
          @backHandler="backHandler"
        ></gz-header>
        <div class="online-mode-list">
            <div class="mode-list-item" v-for="(item , index) in modeLists" :key="index">
                <div class="list-item">
                    <div class="item-img"><img :src="item.img"></div>
                    <div class="item-name">
                        <span>{{item.name}}</span>
                        <span>推荐使用</span>
                    </div>
                </div>
                <div class="list-item-check" @click="select(index)">
                  <img v-show="!selectType[index].select" :src="icons.checkCircle">
                  <img v-show="selectType[index].select" :src="icons.checkMark">
                </div>
            </div>
        </div>
        <div class="order-detail">
            <div class="order-number">
                <span>订单编号：</span>&nbsp;<span>{{orderId}}</span>
            </div>
            <div class="order-proname">
                <span>产品名称：</span>&nbsp;<span>{{postResponse.productName}}</span>
            </div>
            <div class="order-itemname">
                <span>订单金额：</span>&nbsp;<span>¥{{postResponse.orderAmount}}</span>
            </div>
            <div class="order-sum">
                <span>需支付：</span>&nbsp;<span>¥{{postResponse.orderAmount}}</span>
            </div>
        </div>
        <div class="tourist-add">
            <button @click="goToPay()">确认支付</button>
        </div>
        <gz-alert :show="showAlert"
          leftButtonText="确定"
          rightButtonText="取消"
          @leftButtonClick="leftButtonClickHandler"
          @rightButtonClick="rightButtonClickHandler">
          <div class="alert-title">是否放弃本次支付？</div>
        </gz-alert>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';

export default{
    data() {
        return {
            modeLists: [{
                name: '智慧生活卡支付',
                img: '../../../public/img/wisdom-card.svg',
            },
            {
                name: '微信支付',
                img: '../../../public/img/wechat.svg',
            }],
            selectType: [
                { select: false },
                { select: false },
            ],
            showAlert: false,
            type: 1,
            orderId: '',
            icons: {
                checkCircle: require('../../components/biz/icon/check-circle.svg'),
                checkMark: require('../../components/biz/icon/check-mark.svg'),
            },
        };
    },
    computed: {
        ...mapGetters([
            'postResponse',
        ]),
    },
    methods: {
        ...mapActions([
            'resetOrder',
        ]),
        backHandler() {
            this.$set(this, 'showAlert', true);
        },
        leftButtonClickHandler() {
            this.$set(this, 'showAlert', false);
            this.resetOrder();
            this.$router.push({
                path: '/account/orders',
            });
        },
        rightButtonClickHandler() {
            this.$set(this, 'showAlert', false);
        },
        select(idx) {
            this.selectType = [
                { select: false },
                { select: false },
            ];
            this.$set(this.selectType[idx], 'select', true);
        },
        goToPay() {
            if (this.selectType[0].select === false && this.selectType[1].select === false) {
                this.$notify({
                    message: '请选择支付方式',
                });
            } else if (this.selectType[0].select === true) {
                // console.log(1);
            } else if (this.selectType[1].select === true) {
                // console.log(1);
            }
        },
        back() {
            this.$router.back();
        },
    },
    mounted() {
        this.$set(this, 'type', this.$route.query.type);
        this.$set(this, 'orderId', this.$route.query.orderId);
    },
};

</script>

<style lang="less">
#online-pay{
    padding-top: 128px;
    .tourist-add{
        padding: 30px;
        display: flex;
        button{
            border:none;
            width: 100%;
            height: 98px;
            font-size: 32dpx;
            border-radius: 10rpx;
            text-align: center;
            align-items: center;
            color: #ffffff;
            background: #ff4847;
        }
    }
    .online-mode-list{
        padding: 50px 30px 50px 24px;
        border-bottom: 1rpx solid #dddddd;
        .mode-list-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;
            &:last-child{
                margin-bottom: 0;
            }
            .list-item{
                overflow: hidden;
                .item-img{
                    float: left;
                    margin-right: 45px;
                    height: 52px;
                    width: 59px;
                    img{
                        height: 52px;
                        width: 59px;
                    }
                }
                .item-name{
                    float: left;
                    font-size: 28dpx;
                    color: #666666;
                    span:last-child{
                        font-size: 24dpx;
                        display: block;
                        color: #999999;
                    }
                }
            }
            .list-item-check{
                width: 34px;
                height: 34px;
                img{
                    width: 34px;
                    height: 34px;
                }
            }
        }
    }
    .order-detail{
        padding: 50px 24px;
        font-size: 28dpx;
        color: #666666;
        div{
            margin-bottom: 24px;
            height: 40px;
            &:last-child{
                margin-bottom:0;
            }
        }
        .order-sum{
            color: #333333;
            font-size: 32dpx;
            span:last-child{
                font-size: 46dpx;
            }
        }

    }
}
</style>
