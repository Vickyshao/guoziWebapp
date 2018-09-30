<template>
  <div class="">
    <gz-header class="header">
      <div class="title-center" slot="header-title" @click="showType">
        {{title}}
        <img :src="icons.triangleDown" alt="">
      </div>
    </gz-header>
    <comments-list ref="commentlist" @loadingBottomHandler="loadingBottomHandler" :comments-list="commentsList" class="content-list"></comments-list>
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
import CommentsList from '../../components/biz/comments-list';

export default {
    components: {
        [CommentsList.name]: CommentsList,
    },
    computed: {
        ...mapGetters([
            'commentsList',
        ]),
    },
    data() {
        return {
            line: ['暂无评论哦~'],
            showNoResult: false,
            show: false,
            title: '全部点评',
            typeList: [{
                value: 0,
                name: '全部点评',
            }, {
                value: 1,
                name: '营位点评',
            }, {
                value: 2,
                name: '房车点评',
            }, {
                value: 3,
                name: '游记点评',
            }, {
                value: 4,
                name: '攻略点评 ',
            }],
            queryCondition: {
                type: 0,
                paging: {
                    pageIndex: 1,
                    pageSize: 10,
                },
            },
            icons: {
                triangleDown: require('../../../public/img/triangle-down.svg'),
            },
        };
    },
    methods: {
        ...mapActions(['getMyComments']),
        chooseType(item) {
            this.$set(this.$data, 'title', item.name);
            this.$set(this.queryCondition, 'type', item.value);
            this.$set(this.queryCondition.paging, 'pageIndex', 1);
            this.$set(this.queryCondition.paging, 'pageSize', 10);

            this.showType();
            this.fetchData();
        },
        showType() {
            this.$set(this.$data, 'show', !this.show);
        },
        loadingBottomHandler() {
            this.getMyComments(this.queryCondition).then((data) => {
                if (!this.showNoResult
                    && this.$refs.commentlist
                    && this.$refs.commentlist.$refs.pullup) {
                    this.$refs.commentlist.$refs.pullup.setBottomLoaded();
                }
                if ((data.itemList && data.itemList.length === 0) || !data.itemList) {
                    this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                } else {
                    this.queryCondition.paging.pageIndex += 1;
                }
            });
        },
        fetchData() {
            this.getMyComments(this.queryCondition).then((data) => {
                this.queryCondition.paging.pageIndex += 1;
                if (!data.itemList || data.itemList.length === 0) {
                    // this.$notify({ message: '没有更多数据啦 :)', duration: 600 });
                    this.showNoProduct = true;
                    this.icons.error = this.icons.noResult;
                } else {
                  document.querySelector('.page-loadmore-wrapper').scrollTop = 0; // eslint-disable-line
                }
            });
        },
    },
    mounted() {
        this.fetchData(1);
    },
};
</script>

<style lang="less" scoped>
.no-result-list {
    padding-top: 300px;
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
.collapse {
    position: fixed;
    height: 516px;
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
.content-list {
    //  padding-top: 88px !important;
}
</style>
