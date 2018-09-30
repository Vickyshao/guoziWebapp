<template>
    <div class="account-setting">
        <gz-header
        title="设置"
        :customHandler='true'
        @backHandler='backHandlerTo'
        ></gz-header>
        <gz-list-group :items="navs">
            <!-- <div class="gz-list-group-item" @click="share">
                <span>分享给好友</span>
                <img class="go" src="../../components/common/list-group/angle-right.svg">
            </div> -->
        </gz-list-group>
        <div class="sign-out" @click="signOutConfirm()" v-show="loginIn">
            退出登录
        </div>
        <!-- <gz-mask :show="shareShow" @click="cancel"></gz-mask> -->
        <!-- <div class="share-friend" v-show="shareShow">
            <div class="share-type">
                <div class="share-item" @click="shareTo(0)">
                    <img class="item-icon" src="../../../public/img/user.svg">
                    <span>微信好友</span>
                </div>
                <div class="share-item" @click="shareTo(1)">
                    <img class="item-icon" src="../../../public/img/wechat-round.png">
                    <span>微信朋友圈</span>
                </div>
                <div class="share-item" @click="shareTo(2)">
                    <img class="item-icon" src="../../../public/img/qq.png">
                    <span>QQ好友</span>
                </div>
                <div class="share-item" @click="shareTo(3)">
                    <img class="item-icon" src="../../../public/img/weibo.png">
                    <span>微博好友</span>
                </div>
            </div>
            <div class="share-cancel">
                <span>取消</span>
            </div>
        </div> -->
    </div>
    <!-- TODO 为神马不能引入png.... -->
</template>

<script>
import {
    mapActions,
} from 'vuex';

import ListGroup from '../../components/common/list-group';

export default {
    data() {
        return {
            navs: [{
                url: '/account/profile',
                text: '编辑个人资料',
                hasArrow: true,
            }, {
                url: '/account/tourists',
                text: '常用游客信息',
                hasArrow: true,
            }, {
                url: '/account/entry/revise-password',
                text: '修改密码',
                hasArrow: true,
            }, {
                content: 'share',
            }, {
                url: '/about',
                text: '关于行理',
                hasArrow: true,
            }],
            loginIn: false,
            shareShow: false,
        };
    },
    components: {
        [ListGroup.name]: ListGroup,
    },
    methods: {
        ...mapActions([
            'signOut',
        ]),
        signOutConfirm() {
            this.signOut().then(() => {
                this.$set(this, 'loginIn', false);
                this.$router.push({
                    path: '/account/entry/sign-in',
                });
            }).catch((err) => {
                this.$notify({ message: err.msg || err });
            });
        },
        share() {
            this.$set(this, 'shareShow', true);
        },
        cancel() {
            this.$set(this, 'shareShow', false);
        },
        backHandlerTo() {
            this.$router.push({
                path: '/account/index',
            });
        },
    },
    mounted() {
        if (this.$store.getters.sessionId) {
            this.$set(this, 'loginIn', true);
        } else {
            this.$set(this, 'loginIn', false);
        }
    },
};
</script>

<style lang="less">
    .account-setting{
        padding-top: 100px;
        .sign-out{
            margin: 100px 30px 0 30px;
            height: 92px;
            line-height: 92px;
            text-align: center;
            border-radius: 10rpx;
            font-size: 32dpx;
            background: #333;
            color: #fff;
        }
        .share-friend{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 590px;
            z-index: 1000;
            background: #fff;
            .share-type{
                height: 470px;
                padding: 140px 48px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .share-item{
                    max-width: 25%;
                    text-align: center;
                    & .item-icon{
                        display: block;
                        width: 126px;
                        height: 126px;
                        margin-bottom: 26px;
                    }
                    & > span{
                        font-size: 32dpx;
                        color: #333;
                    }
                }
            }
        }
    }
</style>
