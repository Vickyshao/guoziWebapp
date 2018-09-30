<template>
  <div class="view-order-cancel">
    <gz-header @backHandler="backHandler" :custom-handler="true"  title="取消订单" class="header"></gz-header>
    <order-cancel
        :reason="selectSort.sort"
        @chooseReason="showSorttHandler"
        :step="step"
        :order-detail="cancelOrderDetail"
        @confirm="confirm"
        @submit="submit"
        class="content-list">
    </order-cancel>
    <gz-reason-select
        :current-select="selectSort"
        :isShow="closeSortLayer"
        v-if="showSort"
        :getSortInfo="getSortInfo">
    </gz-reason-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ReasonSelect from '../../components/biz/reason-select';
import OrderCancel from '../../components/biz/order-cancel';

export default {
    components: {
        [OrderCancel.name]: OrderCancel,
        [ReasonSelect.name]: ReasonSelect,
    },
    computed: {
        ...mapGetters([
            'commentsList', 'cancelOrderDetail',
        ]),
    },
    data() {
        return {
            showSort: false,
            // orderDetail: {
            //     orderType: this.$route.query.orderType,
            //     number: this.$route.query.number,
            //     name: this.$route.query.name,
            //     price: this.$route.query.price,
            //     code: this.$route.query.code,
            // },
            queryCondition: {
                id: '',
                note: '',
            },
            step: 1,
            selectSort: {
                sort: '',
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        // console.log(to, from);
        next((vm) => {
            if ((from.path === '/order-cancel/terms')) {
                vm.step = 2; // eslint-disable-line
            }
        });
    },
    methods: {
        ...mapActions(['cancelYw', 'signIn', 'cancelFc']),
        backHandler() {
            if (this.step === 2) {
                this.step = 1;
            } else {
                this.$router.back();
            }
        },
        submit() {
            this.queryCondition = {
                id: this.cancelOrderDetail.number,
                note: this.selectSort.sort,
            };
            const query = {
                id: this.cancelOrderDetail.number,
                key: 'state',
                value: 5,
            };
            if (this.selectSort.sort === '') {
                this.$notify({
                    message: '请选择原因',
                });
            } else {
                const orderType = this.cancelOrderDetail.orderType;
                const cancelFn = orderType === 1 ? this.cancelFc : this.cancelYw;
                cancelFn(this.queryCondition).then(() => {
                    this.step = orderType === 1 ? 4 : 3;
                    this.$store.commit('SET_IS_COMMENT', query);
                }).catch((error) => {
                    if (error.code === '1004' || error.code === '1011'
                      || error.code === '1022' || error.code === '1024') {
                        this.$notify({ message: (error && error.msg) || 'error' });
                        this.$router.push({
                            path: '/order-detail',
                            query: {
                                id: this.cancelOrderDetail.number,
                                orderType,
                            },
                        });
                    }
                });
            }
        },
        chooseReason() {
            this.show = !this.show;
        },
        confirm() {
            this.step = 2;
        },
        getSortInfo(detail) {
            this.selectSort = detail;
        },
        closeSortLayer(flag) {
            if (!flag) {
                this.showSort = false;
            }
        },
        showSorttHandler() {
            this.showSort = true;
        },
    },
    mounted() {},
};
</script>

<style lang="less">
.view-order-cancel{
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
      }

  }
  .header {
      border-bottom: 1rpx solid #dddddd;
  }
  .content-list {
      padding-top: 88px !important;
  }
}

</style>
