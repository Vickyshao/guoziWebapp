<template>
  <div class="comments-list">

    <!-- 评论状态，0：待审核，1：审核通过，2：审核失败 new -->

    <!-- 评论状态，2：待审核，1：审核通过，3：审核失败 old -->
    <gz-loadmore  v-if="showList" :load-bottom-fuc="loadingBottomHandler" :autoFill="false" ref="pullup">
      <div class="list-content">
        <div class="program-title"  v-if="showList">
          我的点评
        </div>
        <div class="list" v-for="item in commentsList">
        <div class="title">
          <span class="name">{{ item.productName.length > 18 ? `${item.productName.slice(0,18)}...` : item.productName }}</span>
        </div>
          <p class="status success" v-if="item.state==1">审核通过</p>
          <p class="status wait" v-if="item.state==0">未审核</p>
          <p class="status failed" v-if="item.state==2">审核未通过</p>
        <div class="content">
          <div class="comments-info">
              <div class="avator">
                <img :src="item.userHeadImg || icons.default" alt="">
              </div>
              <div class="detail">
                <div :class="{'line-height':item.type==3 || item.type==4}">
                  <span class="name">{{ item.userName }}</span>
                  <span class="score" v-if="item.type==1 || item.type==2">点评：{{item.avgScore}}分</span>
                  <span class="time">{{item.createAt | time(item.createAt)}}</span>
                </div>
                <ul class="list" v-if="item.type==1 || item.type==2">
                  <li><label>{{item.type==1?"环境":"性能"}}</label>{{ item.score1 }}</li>
                  <li><label>{{item.type==1?"周边":"舒适"}}</label>{{ item.score2 }}</li>
                  <li><label>{{item.type==1?"交通":"操控"}}</label>{{ item.score3 }}</li>
                  <li><label>{{item.type==1?"服务":"服务"}}</label>{{ item.score4 }}</li>
                </ul>
              </div>
          </div>
          <div class="paragraph"><p>{{item.content}}</p></div>
        </div>
      </div>
      </div>

    </gz-loadmore>
    <no-result v-if="showNoResult" class="no-result-list" :line="line" :img="icons.noResult">
    </no-result>
  </div>
</template>

<script>
import NoResult from '../no-result';

export default {
    name: 'comments-list',
    data() {
        return {
            showNoResult: false,
            line: ['暂无评论哦~'],
            icons: {
                default: require('../../../../public/img/default-avator.svg'),
                noResult: require('../../../../public/img/group-2.svg'),
            },
            showList: false,
        };
    },
    props: {
        commentsList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    components: {
        [NoResult.name]: NoResult,
    },
    watch: {
        commentsList() {
            if (this.commentsList && this.commentsList.length) {
                this.$set(this, 'showNoResult', false);
                this.$set(this, 'showList', true);
            } else {
                this.$set(this, 'showNoResult', true);
                this.$set(this, 'showList', false);
            }
        },
    },
    methods: {
        loadingBottomHandler() {
            this.$emit('loadingBottomHandler');
        },
    },
};
</script>

<style lang="less" scoped>

.comments-list {
  padding: 0 24px;

  .list-content{
    padding-top: 88px !important;
  }

  .no-result-list {
      padding-top: 300px;
  }
  .line-height {
      line-height: 100px;
  }
    .program-title {
        padding-top: 42px;
        font-size: 50dpx;
        font-weight: 600;
        color: #4a4a4a;
    }
    .list {
        padding-top: 100px;
        .title {
            .name {
                font-size: 32dpx;
                font-weight: 600;
                color: #4a4a4a;
            }
        }
      .status {
        width: 100%;
        padding-top: 20px;
        font-size: 24dpx;
        text-align: right;
        font-weight: 300;
        &.success {
          color: #7ed321;
        }
        &.wait {
          color: #9b9b9b;
        }
        &.failed {
          color: #ff4847;
        }
      }
        .content {
            padding-top: 40px;
            .paragraph {
                padding-top: 22px;
                padding-bottom: 100px;
                border-bottom: 2rpx solid #dddddd;
                p {
                    font-size: 24dpx;
                    line-height: 1.42;
                    color: #999999;
                }
                .no-score {
                    padding-left: 210px;
                    color: #666666;
                }
            }
            .comments-info {
                display: flex;
                min-height: 100px;
                .avator {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    img{
                      width: 100%;
                      height: 100%;
                      border-radius: 50%;
                    }
                }
                .detail {
                    width: 602px;
                    min-height: 100px;
                    padding-left: 15px;
                    .name {
                        width: 100%;
                        height: 45px;
                        color: #666666;
                        font-size: 32dpx;
                        display: inline-block;
                        vertical-align: top;
                        -ms-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .score {
                        font-size: 24dpx;
                        line-height: 45dpx;
                        color: #666666;
                    }
                    .time {
                        float: right;
                        font-size: 24dpx;
                        line-height: 45dpx;
                        color: #999999;
                    }
                  .line-height {
                    padding-top: 30px;
                    line-height: normal;
                  }
                  .list {
                    padding-top: 24px;
                    display: flex;
                    li {
                      flex: 1;
                      font-size: 20dpx;
                      label {
                        display: inline-block;
                        width: 64px;
                        line-height: 36dpx;
                        margin-right: 12px;
                        text-align: center;
                        color: #fff;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                        background: #333;
                      }
                    }
                  }
                }
            }
        }
    }
}
</style>
