<template>
  <div class="my-order">
    <div class="no-product">
      <no-result class="no-result-list" v-if="showNoProduct" :line="line" :img="icons.error">
          <div class="submit-button" slot="customContent">
            <span @click="checkElse">看看其他</span>
          </div>
      </no-result>
    </div>

    <gz-header @backHandler="backHandler" :custom-handler="true" class="header">
      <div class="title-center" slot="header-title" @click="showType">
        {{title}}
        <img :src="icons.triangleDown" alt="">
      </div>
    </gz-header>
    <gz-loadmore v-if="!showNoProduct" :load-bottom-fuc="loadingBottomHandler" :autoFill="false" ref="pullup">
        <order-list class="content-list" @orderAgain="orderAgain"  :order-list="orderList"></order-list>
    </gz-loadmore>

    <div class="collapse" v-if="show">
      <ul>
        <li v-for="item in typeList" :class="{'active':item.name == title}" @click="chooseType(item)">
          <div>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import NoResult from '../../components/biz/no-result';
import OrderList from '../../components/biz/order-list';

export default {
    data() {
        return {
            showNoProduct: false,
            isFromDetail: false,
            show: false,
            line: ['该产品已失效'],
            title: '全部订单',
            queryCondition: {
                orderType: 0, // 订单类型，0：所有订单， 1:房车订单， 2：营位订单 ,
                paging: {
                    pageIndex: 1,
                    pageSize: 10,
                },
            },
            typeList: [{
                value: 0,
                name: '全部订单',
            }, {
                value: 1,
                name: '房车订单',
            }, {
                value: 2,
                name: '营位订单',
            }],
            loadflag: false,
            pending: false,
            icons: {
                triangleDown: require('../../../public/img/triangle-down.svg'),
                error: require('../../../public/img/error.svg'),
                noResult: require('../../../public/img/group-2.svg'),
            },
        };
    },
    components: {
        [OrderList.name]: OrderList,
        [NoResult.name]: NoResult,
    },
    computed: {
        ...mapGetters([
            'orderList', 'orderScrollY',
        ]),
    },
    beforeRouteLeave(to, from, next) { // eslint-disable-line
        if (!this.showNoProduct) {
            this.$store.commit('SET_ORDER_SCROLLY',
          document.querySelector('.page-loadmore-wrapper').scrollTop); // eslint-disable-line
        }

        next();
    },
    beforeRouteEnter(to, from, next) {
        // console.log(to, from);
        next((vm) => {
            const tab = vm.$route.query.tab;
            if (tab) {
                vm.title = vm.typeList[tab].name; // eslint-disable-line
                vm.queryCondition.orderType = tab; // eslint-disable-line
            }
            if ((from.path === '/order-detail' || from.path === '/comments' || from.path === '/order-cancel') && vm.orderScrollY) {
                vm.isFromDetail = true; // eslint-disable-line
                document.querySelector('.page-loadmore-wrapper').scrollTop = vm.orderScrollY; // eslint-disable-line
                vm.queryCondition.paging.pageIndex = Math.ceil(vm.orderList.length / 10) + 1; // eslint-disable-line
            } else {
                vm.fetchData();
                vm.isFromDetail = false; // eslint-disable-line
            }
    // 通过 `vm` 访问组件实例
        });
  // 在渲染该组件的对应路由被 confirm 前调用
  // 不！能！获取组件实例 `this`
  // 因为当钩子执行前，组件实例还没被创建
    },
    methods: {
        ...mapActions(['getMyOrder', 'getFcId', 'getYwId']),
        chooseType(item) {
            this.$set(this.$data, 'title', item.name);
            this.$set(this.queryCondition, 'orderType', item.value);
            this.$set(this.queryCondition.paging, 'pageIndex', 1);
            this.$set(this.queryCondition.paging, 'pageSize', 10);
            this.$router.replace({
                path: this.$route.fullPath,
                query: {
                    tab: item.value,
                },
            });
            this.showType();
            this.fetchData();
        },
        checkElse() {
            this.$router.push({
                path: '/home',
            });
            // this.showNoProduct = false;
        },
        backHandler() {
            if (this.showNoProduct && this.orderList.length !== 0) {
                this.showNoProduct = false;
            } else {
                this.$router.push({
                    path: '/account/index',
                });
            }
        },
        orderAgain(item) {
            if (this.pending) return;
            if (item.orderType === 1) {
                this.$set(this, 'pending', true);
                this.getFcId(item.id).then((data) => {
                    this.$set(this, 'pending', false);
                    this.$router.push({
                        path: `/touring-car/${data}`,
                    });
                }).catch((err) => { // eslint-disable-line
                    this.$set(this, 'pending', false);
                    this.showNoProduct = true;
                });
            } else {
                this.$set(this, 'pending', true);
                this.getYwId(item.id).then((data) => {
                    this.$set(this, 'pending', false);
                    this.$router.push({
                        path: `/project/${data}`,
                    });
                }).catch((err) => { // eslint-disable-line
                    // if (err.code === 1004) {
                    this.$set(this, 'pending', false);
                    this.showNoProduct = true;
                    // }
                });
            }
        },
        showType() {
            this.$set(this.$data, 'show', !this.show);
        },
        loadingBottomHandler() {
            if (!this.loadflag) {
                this.loadflag = true;
                this.getMyOrder(this.queryCondition).then((data) => {
                    this.loadflag = false;
                    if (this.$refs.pullup) this.$refs.pullup.setBottomLoaded();
                    if (data.length === 0 || !data) {
                        this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                    } else {
                        this.queryCondition.paging.pageIndex += 1;
                    }
                });
            }
        },
        fetchData() {
            this.showNoProduct = false;
            this.getMyOrder(this.queryCondition).then((data) => {
                this.queryCondition.paging.pageIndex += 1;
                this.loadflag = false;
                // if (this.$refs.pullup) this.$refs.pullup.setBottomLoaded();
                if (!data || data.length === 0) {
                    // this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                    this.showNoProduct = true;
                    this.line = ['没有订单哦！'];
                    this.icons.error = this.icons.noResult;
                } else {
                    document.querySelector('.page-loadmore-wrapper').scrollTop = 0; // eslint-disable-line
                }
            });
        },
    },
    mounted() {
        // if (!this.isFromDetail && !this.orderScrollY) {
        //     this.fetchData();
        // }

        // if (!this.isFromDetail) {
        //     this.fetchData();
        // } else if (this.orderScrollY) {
        //       document.querySelector('.page-loadmore-wrapper').scrollTop = this.orderScrollY;
        // }
    },
};
</script>

<style lang="less">
.my-order{
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
  .title-center {
      font-size: 32dpx;
      color: #4a4a4a;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        margin-left: 10px;
        width: 18px;
        height: 10px;
      }
  }
  .header {
      border-bottom: 1rpx solid #dddddd;
  }
  .content-list {
      padding-top: 88px !important;
  }
  .collapse {
      position: fixed;
      height: 301px;
      transition: height 1s;
      top: 88px;
      background: white;
      width: 100%;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
      li {
          text-align: center;
          width: 100%;
          font-size: 32dpx;
          letter-spacing: -1.9px;
          color: #666666;
          height: 100px;
          line-height: 100px;
          div {
              margin: 0 24px;
              border-bottom: 1rpx solid #dddddd;
          }
          div:last-child {
              border: 0;
          }
      }
      .active {
          background: #333333;
          color: white;
      }
  }
}

</style>
