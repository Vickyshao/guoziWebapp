<template>
    <div id="terms">
        <gz-header title="国资文旅服务协议"></gz-header>
        <div class="terms-wrapper">
            <p>欢迎阅读国资文旅服务条款。请在注册和接受我们服务前仔细阅读以下条款。</p>
            <h1>1. 接受。</h1>
            <p>您知悉，使用国资文旅服务以同意本条款并完成全部注册程序为前提。点击同意即表示您同意本条款内容，且您将受本条款及国资文旅公示的各项规则、规范之约束。国资文旅可根据业务发展需要随时修改本条款，并将修改后的服务条款公示在国资文旅上。经修订的服务条款一经公示立即自动生效。如您不同意相关修订，可停止使用国资文旅服务。您继续使用本服务将表示您接受修订后的条款。除另行明确声明外，任何使国资文旅服务范围扩大或功能增强的新内容均受本条款约束。</p>
            <p>1) 国资文旅服务仅供根据相关法律能够订立具有法律约束力的合约的个人或组织使用。同时，国资文旅可根据业务需要拒绝、中止或终止向某些个人或组织提供国资文旅服务。</p>
            <p>(a) 提供真实、准确、完整和反映当前情况的资料。</p>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        goBack() {
            this.$router.back();
//            this.$router.push('/account/entry/sign-up');
        },
    },
};
</script>

<style lang="less">
#terms {
    height: 100%;
    width: 100%;
    .terms-wrapper {
        margin-top: 140px;
        padding: 0 30px;
        h1 {
            font-size: 40dpx;
            font-weight: bold;
            margin: 70px 0 20px 0;
        }
        h2 {
            font-size: 32dpx;
            padding-bottom: 10px;
            font-weight: bold;
            margin-top: 40px;
        }
        p {
            font-size: 26dpx;
            color: #666;
            line-height: 48px;
            letter-spacing: 0px;
        }
    }
}
</style>
