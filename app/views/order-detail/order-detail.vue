<template>
  <div class="view-order-detail">
    <gz-header class="header" title="订单详情" @backHandler="backHandler" :custom-handler="true" :right-icon="`/public/img/customer-service-black.svg`" @right-icon-click="showTel()">
    </gz-header>
    <div class="no-product">
      <no-result class="no-result-list" v-if="showNoProduct" :line="line" :img="icons.noResult">
          <div class="submit-button" slot="customContent">
            <span @click="checkElse">看看其他</span>
          </div>
      </no-result>
    </div>
    <order-detail  v-if="!showNoProduct"  class="margin88" @orderAgain="orderAgain" :detail="orderType== 1 ? fcOrderDetail : ywOrderDetail" @call="showTel"></order-detail>
    <tel-mask  @cancel="showTel" phone="0871-65878888-3700" ref="telmask"> </tel-mask>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import NoResult from '../../components/biz/no-result';
import TelMask from '../../components/biz/tel-mask';
import OrderDetail from '../../components/biz/order-detail';

export default {
    components: {
        [OrderDetail.name]: OrderDetail,
        [TelMask.name]: TelMask,
        [NoResult.name]: NoResult,
    },
    computed: {
        ...mapGetters([
            'ywOrderDetail', 'fcOrderDetail',
        ]),
    },
    methods: {
        ...mapActions(['getYwDetail', 'getFcDetail', 'getFcId', 'getYwId']),
        showTel() {
            this.$refs.telmask.toggle();
        },
        orderAgain(orderType) {
            if (orderType === 1) {
                this.getFcId(this.$route.query.id).then((data) => {
                    this.$router.push({
                        path: `/touring-car/${data}`,
                    });
                // not done
                // jump to fc product detail
                }).catch((err) => { // eslint-disable-line
                    this.showNoProduct = true;
                });
            } else {
                this.getYwId(this.$route.query.id).then((data) => {
                    this.$router.push({
                        path: `/project/${data}`,
                    });
                }).catch((err) => { // eslint-disable-line
                    this.showNoProduct = true;
                });
            }
        },
        checkElse() {
            this.$router.push({
                path: '/account/orders',
            });
        },
        backHandler() {
            if (this.showNoProduct) {
                this.showNoProduct = false;
            } else {
                this.$router.push({
                    path: '/account/orders',
                });
            }
        },
    },
    mounted() {
        if (this.$route.query.orderType == 1) { // eslint-disable-line
            this.getFcDetail({ id: this.$route.query.id }).then((data) => { //eslint-disable-line
            });
        } else {
            this.getYwDetail({ id: this.$route.query.id }).then((data) => { // eslint-disable-line
            });
        }
    },
    data() {
        return {
            orderType: this.$route.query.orderType,
            showNoProduct: false,
            line: ['该产品已失效'],
            icons: {
                noResult: require('../../../public/img/error.svg'),
            },
        };
    },
};
</script>

<style lang="less">
.view-order-detail{
    .header {
        border-bottom: 1rpx solid #dddddd;
          .gz-header-right {
              padding-right: 30px;
              padding-left: 0px;
              img {
                  width: 42px;
                  height: 68px;
              }
          }
      }
  .no-product{
    .no-result-list {
        padding-top: 300px;
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
            color: white;
            width: 100%;
            line-height: 80px;
        }
    }
  }
  .title-bar-right{
    max-width: 50px;
    position: absolute;
    right: 30px;
    font-size: 20dpx;
    text-align: justify;
    color: #666666;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .margin88 {
      padding-top: 88px !important;
  }
}

</style>
