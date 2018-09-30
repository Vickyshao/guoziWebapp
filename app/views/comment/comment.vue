<template>
  <div class="">
    <gz-header class="header">
      <span slot="right-icon" class="right-icon" @click="publish">发表</span>
    </gz-header>
    <rate class="comment-rate" :star-list="xmStarList" :title="title"></rate>
    <div class="comment-input">
       <textarea
       v-model="comment"
           placeholder="输入您的评论，500字以内..."
           onpropertychange="this.style.height='0px';this.style.height=this.scrollHeight + 'px'"
           oninput="this.style.height='0px';this.style.height=this.scrollHeight + 'px'"
           @input="checkNum"
       ></textarea>
       <span class="comment-overflow" v-show="overflow">已经超出{{num}}字</span>
    </div>
    <gz-mask :show="loading">
      <gz-loading :show="loading" type="double-bounce"></gz-loading>
    </gz-mask>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import Rate from '../../components/biz/rate';

export default {
    components: {
        [Rate.name]: Rate,
    },
    computed: {
        ...mapGetters([
            'commentsList',
        ]),
    },
    methods: {
        ...mapActions(['commentYw', 'commentFc']),
        checkNum() {
            if (this.comment.length > 500) {
                this.$set(this, 'num', this.comment.length - 500);
                this.$set(this, 'overflow', true);
            } else {
                this.$set(this, 'overflow', false);
            }
        },
        publish() {
            let flag = true;
            for (let i = 0; i < this.xmStarList.length; i += 1) {
                if (this.xmStarList[i].score === 0) {
                    flag = false;
                    this.$notify({
                        message: '请给所有的评分选项评分',
                    });
                    break;
                } else {
                    const num = i + 1;
                    const test = `score${num}`;
                    this.param[test] = this.xmStarList[i].score;
                }
            }
            if (flag) {
                if (this.$noEmoji(this.comment).trim() === '') {
                    this.$notify({
                        message: '请输入评论内容',
                    });
                } else if (this.$noEmoji(this.comment).trim().length < 15) {
                    this.$notify({
                        message: '请输入最少15字',
                    });
                } else if (this.$noEmoji(this.comment).trim().length > 500) {
                    this.$notify({
                        message: '已超出500字',
                    });
                } else {
                    this.param.content = this.$noEmoji(this.comment);
                    const query = {
                        id: this.$route.query.orderId,
                        key: 'isComment',
                        value: true,
                    };
                    this.$set(this, 'loading', true);
                    if (this.$route.query.orderType == 2) { // eslint-disable-line
                      // 1:房车订单 2：项目营位订单 ,
                        setTimeout(() => {
                            this.commentYw(this.param).then(() => {
                                this.$set(this, 'loading', false);
                                this.$store.commit('SET_IS_COMMENT', query);
                                this.$router.back();
                            });
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.commentFc(this.param).then(() => {
                                this.$set(this, 'loading', false);
                                this.$store.commit('SET_IS_COMMENT', query);
                                this.$router.back();
                            });
                        }, 1000);
                    }
                }
            }
        },
    },
    data() {
        return {
            loading: false,
            overflow: false,
            num: 0,
            title: this.$route.query.name,
            param: {
                orderId: this.$route.query.orderId,
                score1: 0,
                score2: 0,
                score3: 0,
                score4: 0,
                content: 'string',
            },
            comment: '',
            xmStarList: [{
                name: this.$route.query.orderType == 2 ? '环境' : '性能', // eslint-disable-line
                value: 'env',
                score: 0,
                starList: [],
            },
            {
                name: this.$route.query.orderType == 2 ? '周边' : '舒适',// eslint-disable-line
                value: 'around',
                score: 0,
                starList: [],
            },
            {
                name: this.$route.query.orderType == 2 ? '交通' : '操控',// eslint-disable-line
                value: 'tra',
                score: 0,
                starList: [],
            },
            {
                name: this.$route.query.orderType == 2 ? '服务' : '服务',// eslint-disable-line
                value: 'ser',
                score: 0,
                starList: [],
            },
            ],
        };
    },
};
</script>

<style lang="less" scoped>
.comment-input {
    margin: 0 50px;
    padding-top: 123px;
    textarea {
        width: 100%;
        min-height: 80px;
        resize: none;
        font-size: 28dpx;
        font-weight: 300;
        line-height: 1.36;
        text-align: justify;
        overflow: hidden;
        // color: #999999;
        border-bottom: 2rpx solid #dddddd;
        padding-bottom: 30px;
    }
    .comment-overflow{
        color: #ff4847;
        padding-bottom: 50px;
    }
}
.header {
    height: 88px;
    .right-icon {
        font-size: 32dpx;
        line-height: 32px;
        color: #333333;
    }
}
.comment-rate {
    margin-top: 88px !important;
}
</style>
