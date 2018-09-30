// error page
<template>
    <div class="error">
        <img :src="icons.error"/>
        <template v-if="id==='404'">
            <div>{{id}} 抱歉，您访问的页面失联了～</div>
        </template>
        <template v-else-if="id==='500'">
            <div>{{id}} 抱歉，服务器开小差了～</div>
        </template>
        <template v-else-if="id==='503'">
            <div>{{id}} 抱歉，请稍后重试～</div>
        </template>
        <template v-else-if="id==='timeout'">
            <div>抱歉，请求超时，请稍后重试～</div>
        </template>
        <template v-else>
            <div>{{id}} 抱歉，请稍后重试～</div>
        </template>
        <button class="btn" @click="goIndex">返回首页</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            icons: {
                error: require('../../../public/img/error.svg'),
            },
        };
    },
    methods: {
        goIndex() {
            this.$router.push('/');
        },
    },
    mounted() {
        this.id = this.$route.params.id;
    },
};
</script>

<style lang="less" scoped>
.error {
    width: 100%;
    margin-top: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 310px;
        margin-bottom: 50px;
    }

    .btn {
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
</style>
