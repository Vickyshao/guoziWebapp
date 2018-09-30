<template>
    <div class="hotel-wrapper">
        <gz-header title="精品酒店"></gz-header>
        <gz-loadmore :load-bottom-fuc="loadingBottomHandler" :autoFill="false" ref="pullup">
          <ul class="hotel-list">
              <li v-for="item in list" @click="toDetail()">
                  <dl class="hotel-item">
                      <dt><img :src="item.srcImg"></dt>
                      <dd>
                          <b>{{item.price}}/起</b>
                          <span>{{item.content}}</span>
                      </dd>
                  </dl>
              </li>
          </ul>
        </gz-loadmore>

        <back-to-top :setScrollTopShow="setScrollTopShow" :element-class="elementClass"></back-to-top>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import GoTop from '../../components/common/back-to-top';

export default {
    data() {
        return {
            elementClass: '.page-loadmore-wrapper',
            setScrollTopShow: 600,
            list: [],
            queryCondition: {
                paging: {
                    pageIndex: 1,
                    pageSize: 10,
                },
            },
        };
    },
    components: {
        [GoTop.name]: GoTop,
    },
    computed: {
        ...mapGetters([
            'hotelList',
        ]),
    },
    methods: {
        ...mapActions([
            'getHotelList',
        ]),
        toDetail() {
            this.$router.push('/hotelListDetail');
        },
        fetchData() {
            this.getHotelList({
                queryCondition: this.queryCondition,
            }).then((data) => {
                this.queryCondition.paging.pageIndex += 1;
                this.list = [...this.list, ...data];
//                if (this.$refs.pullup) this.$refs.pullup.setBottomLoaded();
                if (data.length === 0 || !data) {
                    this.$refs.pullup.setNoResult();
                }
            });
        },
        loadingBottomHandler() {
            this.getHotelList({
                queryCondition: this.queryCondition,
            }).then((data) => {
                this.list = [...this.list, ...data];
                if (this.$refs.pullup) this.$refs.pullup.setBottomLoaded();
                if (data.length === 0 || !data) {
                    this.$refs.pullup.setNoResult();
                } else {
                    this.queryCondition.paging.pageIndex += 1;
                }
            });
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style lang="less">
    @import (reference) '../../global.style.less';

    .hotel-wrapper {
        padding: 100px 50px 50px;
        .inline-block {
            display: inline-block;
            vertical-align: top;
        }
        .text-right {
            text-align: right;
        }
        /* header样式 */
        .gz-header-title {
            font-size: 32dpx;
        }
        .arrow-left {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            margin-left: 20px;
        }
        .hotel-list {
            padding: 0;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            li {
                width: 290px;
                padding-top: 50px;
            }
            .hotel-item {
                dt {
                    width: 290px;
                    height: 430px;
                    overflow: hidden;
                }
                dd {
                    padding-top: 20px;
                    height: 100px;
                    overflow: hidden;
                    .line-clamp(2);
                    b {
                        font-size: 28dpx;
                        color: #333;
                    }
                    span {
                        font-size: 28dpx;
                        line-height: 38dpx;
                        padding-left: 15px;
                        color: #666;
                    }
                }

            }
        }
    }
</style>
