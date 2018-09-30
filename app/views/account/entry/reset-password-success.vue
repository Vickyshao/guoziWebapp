<template>
    <div id="reset-password-success">
        <gz-header
            :leftToBack="false"
            title="重置密码"
        ></gz-header>
        <div class="content">
            <img :src="icons.resetPasswordSuccess"/>
            <p>重置密码成功！</p>
            <button @click="signIn">重新登录</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            id: '',
            icons: {
                resetPasswordSuccess: require('../../../../public/img/reset-password-success.svg'),
            },
        };
    },
    methods: {
        signIn() {
            this.$router.replace('sign-in');
        },
    },
    mounted() {
        this.id = this.$route.params.id;
    },
};
</script>

<style lang="less">
#reset-password-success {
    .content {
        width: 100%;
        margin-top: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 310px;
            margin-bottom: 50px;
        }

        p {
            font-size: 28dpx;
            color: #999999;
        }
        button {
            height: 90px;
            width: 690px;
            margin-top: 100px;
            border-width: 0;
            border-radius: 24px;
            font-size: 28dpx;
            color: #fff;
            background-color: #ff4847;
            text-align: center;
            text-decoration: none;
        }
    }
}
</style>
