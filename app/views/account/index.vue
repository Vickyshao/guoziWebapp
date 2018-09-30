<template>
    <div class="account">
        <div class="account-head" :style="{backgroundImage: `url(${icons.background})`}">
            <div class="user-info">
                <span class="info-name">{{sessionId ? accountProfile.userName : 'hi，等你好久了'}}</span>
                <div class="info-sign" v-show="!sessionId">
                    <router-link to="/account/entry/sign-in">登录</router-link>
                    <router-link to="/account/entry/sign-up" class="sign-on">没帐号? 快去注册 ></router-link>
                </div>
            </div>
            <div class="user-avatar">
                <img :src="userAvatar">
            </div>
        </div>
        <gz-list-group :items="navs">
            <div class="gz-list-group-item" @click="showTel">
                <img class="type" :src="icons.phone">
                <a class="list-group-item">呼叫客服 15687614825 (24h)</a>
                <img class="go" :src="icons.arrowRight">
            </div>
        </gz-list-group>
        <tel-mask phone="0871-65878888-3700" ref="telmask"></tel-mask>
        <gz-footer-bar></gz-footer-bar>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ListGroup from '../../components/common/list-group';
    import TelMask from '../../components/biz/tel-mask';

    export default {
        data() {
            return {
                navs: [{
                    url: '/account/orders',
                    text: '我的订单',
                    icon: require('../../../public/img/group-7.svg'),
                    hasArrow: true,
                }, {
                    url: '/account/comments',
                    text: '我的点评',
                    icon: require('../../../public/img/group-9.svg'),
                    hasArrow: true,
                }, {
                    url: '/account/setting',
                    text: '设置',
                    icon: require('../../../public/img/setting.svg'),
                    hasArrow: true,
                }, {
                    content: 'slot',
                }],
                icons: {
                    phone: require('../../../public/img/phone-black.svg'),
                    arrowRight: require('../../components/common/list-group/angle-right.svg'),
                    background: '../../../public/img/user-background.svg',
                    defaultAvatar: require('../../../public/img/default-avator.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'accountProfile',
                'sessionId',
            ]),
            userAvatar() {
                return (this.sessionId && this.accountProfile.headImg)
                    ? this.accountProfile.headImg
                    : this.icons.defaultAvatar;
            },
        },
        components: {
            [ListGroup.name]: ListGroup,
            [TelMask.name]: TelMask,
        },
        methods: {
            ...mapActions([
                'getAccountProfile',
                'signIn',
            ]),
            showTel() {
                this.$refs.telmask.toggle();
            },
            fetchData() {
                this.getAccountProfile().catch((error) => {
                    this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                });
            },
        },
        mounted() {
            if (this.$store.getters.sessionId) this.fetchData();
        },
    };
</script>

<style lang="less">
    @import "../../global.style.less";
    .account{
        .account-head{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 410px;
            background-color: rgba(211, 211, 211, 0.22);
            background-size: cover;
            padding: 160px 60px 0 70px;
            .user-info{
                flex: 1;
                margin-right: 77px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .info-name{
                    width: 100%;
                    font-size: 50dpx;
                }
                .info-sign{
                    margin-top: 38px;
                    font-size: 32dpx;
                    .sign-on{
                        margin-left: 26px;
                        font-size: 24dpx;
                    }
                }
            }
            .user-avatar{
                width: 130px;
                height: 130px;
                border-radius: 75px;
                overflow: hidden;
                border: 1px solid #ccc;
                & > img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        .list-group-item{
            display: inline-block;
        }
    }
</style>
