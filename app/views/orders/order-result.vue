<template>
    <div class="order-result" id="order-result">
        <gz-header
            :leftToBack='false'
            :title="typeOfOrder == 2 ? '营位预订' : '房车预订'"
        ></gz-header>
        <div class="order-state">
            <div class="order-sate-img">
                <img :src="icons.paySuccess" v-if="paySuccess">
                <img :src="icons.payFail" v-if="!paySuccess">
            </div>
            <div class="order-state-content" v-if="typeOfOrder == 2">
                <p>预订成功</p>
                <p>随后我们会与您联系</p>
            </div>
            <div class="order-state-content" v-if="typeOfOrder == 1 && paySuccess">
                <p>预订成功</p>
                <p>随后我们会与您联系</p>
            </div>
            <div class="order-state-content" v-if="typeOfOrder == 1 && !paySuccess">
                <p>&nbsp;</p>
                <p>支付失败</p>
            </div>
        </div>
        <div class="order-detail">
            <div class="order-number">
                 <span>订单编号：</span>
                 <span>{{orderCode}}</span>
            </div>
            <div class="order-proname" v-if="typeOfOrder == 2">
                 <span>项目名称：</span>
                 <span>{{projectName}}</span>
            </div>
            <div class="order-itemname" v-if="typeOfOrder == 2">
                 <span>营位名称：</span>
                 <span>{{campsiteName}}</span>
            </div>
            <div class="order-proname" v-if="typeOfOrder == 1">
                 <span>产品名称：</span>
                 <span>{{carName}}</span>
            </div>
            <!-- 预留改版，不要删 -->
            <!-- <div class="order-itemname" v-if="typeOfOrder == 1">
                 <span>订单金额：</span>
                 &nbsp;<span>¥&nbsp;{{orderAmount}}</span>
            </div> -->
        </div>
        <div class="order-next-step" v-if="paySuccess">
            <button @click="nextTodo(0)">查看订单详情</button>
            <button @click="nextTodo(1)">继续探索</button>
        </div>
        <div class="order-payFail" v-if="!paySuccess">
            <button @click="nextTodo(3)">重新支付</button>
        </div>
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
            // 2 营位； 1 房车
            typeOfOrder: 2,
            paySuccess: true,
            orderCode: '',
            projectName: '',
            campsiteName: '',
            carName: '',
            orderAmount: '',
            icons: {
                paySuccess: require('../../../public/img/pay-success.svg'),
                payFail: require('../../../public/img/pay-fail.svg'),
            },
        };
    },
    computed: {
        ...mapGetters([
            'postResponse',
        ]),
        // orderAmountComputed() {
        //     const num = parseInt(this.orderAmount * 100, 10).toString();
        //     return num.splice(-2, 0, '.');
        // },
    },
    mounted() {
        this.$set(this, 'typeOfOrder', this.$route.query.orderType);
        this.$set(this, 'orderCode', this.$route.query.orderCode);
        if (parseInt(this.typeOfOrder, 10) === 2) {
            this.$set(this, 'projectName', this.postResponse.projectName);
            this.$set(this, 'campsiteName', this.postResponse.campsiteName);
        } else {
            this.$set(this, 'carName', this.postResponse.productName);
            this.$set(this, 'orderAmount', this.postResponse.orderAmount);
        }
    },
    methods: {
        ...mapActions([
            'resetOrder',
        ]),
        nextTodo(_type) {
            this.resetOrder();
            if (_type === 0) {
                this.$router.push({
                    path: '/order-detail',
                    query: {
                        id: this.$route.query.orderId,
                        orderType: this.typeOfOrder,
                    },
                });
            } else if (_type === 1) {
                this.$router.push({
                    path: '/home',
                });
            }
        },
    },
};

</script>

<style lang="less">
#order-result{
    color: #333333;
    padding-top: 128px;
    .order-result-title{
        padding: 72px 0 24px;
        display: flex;
        justify-content: center;
        border-bottom: 1rpx solid #dddddd;
        h1{
            font-size: 32dpx;
        }
    }
    .order-state{
        color: #666666;
        padding: 50px 0 ;
        display: flex;
        justify-content: center;
        align-items: center;
        .order-sate-img{
            width: 114px;
            height: 75px;
            margin-right: 24px;
            img{
                width: 114px;
                height: 75px;
            }
        }
        .order-state-content{
            line-height: 45dpx;
            font-size: 32dpx;
        }
    }
    .order-detail{
        padding: 50px 24px;
        color: #666666;
        border-top: 1rpx solid #DDDDDD;
        font-size: 28dpx;
        div{
            margin-bottom: 24px;
            span {
                display: inline-block;
                vertical-align: top;
                &:nth-child(2) {
                    margin-left: 10px;
                    width: 70%;
                }
            }
        }
    }
    .order-next-step{
        padding: 24px;
        display: flex;
        justify-content: space-between;
        button{
            color: #ffffff;
            width: 340px;
            height: 98px;
            font-size: 28dpx;
            text-align: center;
            line-height: 98px;
            background: #333333;
            border: none;
            border-radius: 10rpx;
        }
        button:nth-child(2){
            background: #ff4847;
        }
    }
    .order-payFail{
        padding: 30px;
        button{
            color: #FFF;
            background-color: #FF4847;
            width: 690px;
            height: 98px;
            font-size: 28dpx;
            text-align: center;
            line-height: 98px;
            border: none;
            border-radius: 10rpx;
        }
    }
}
</style>
