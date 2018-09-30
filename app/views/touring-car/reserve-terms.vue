<template>
    <div id="reverse-terms">
        <gz-header title="预订条款"></gz-header>
        <div class="terms-wrapper">
            <div class="reverse-info">
                <p>客户在使用行理APP查询房车、营地资料、价格，或其他产品以前，请务必先阅读本预订条款及规定，并根据本条款规定承担因违反规定而造成损失和责任。<br>本预订条款及规定由行理制定。通过行理实时在线预订系统所提交的所有预订，均视为预订方已接受本条款。本条款将取代所有文件，除非以其他书面方式另有说明。</p>
                <h1>预订</h1>
                <p>预订房车、营位时，需提供如下信息：</p>
                <ul>
                    <li>预订人信息</li>
                    <li>取车、还车日期，或入场时间</li>
                    <li>正确的使用人姓名（须同护照一致的拼音格式）</li>
                    <li>备注：特殊要求或其他申请（如：需安排晚入住、申请非吸烟房等）</li>
                </ul>
                <p>预订房车、营位时，需提供如下信息：</p>
                <p>注意：如客人为非中国国籍，请在备注里标注。</p>
            </div>
            <div class="confirm-info">
                <h1>确认</h1>
                <p>1. 系统里能查到的房车，当时预订即可确认。申请一经提交，且预订一经确认，行理预订系统将自动生成预订单号。</p>
                <p>2. 预订方须保证预订信息和资料的完整性和准确性，任何因资料有误或缺失所造成的损失和失误，行理将不承担任何责任和赔偿。</p>
            </div>
            <div class="pay-info">
                <h1>支付条款</h1>
                <p>1. 行理预订系统内已确认的费用需预先全额支付。付款须以实际到账为准，银行出具的付款水单或付款凭证仅可视为付款依据，而不可视为付款并到账的依据。</p>
                <p>2. 确认的预订若迟于最晚取消日期支付费用，该预订将被取消。</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            orderName: '',
        };
    },
    methods: {
        goBack() {
            this.$router.back();
//            this.$router.push('/account/entry/sign-up');
        },
    },
    mounted() {
        if (this.$route.query.orderType === 1) {
            this.$set(this, 'orderName', '房车预订条款');
        } else {
            this.$set(this, 'orderName', '营位预订条款');
        }
    },
};
</script>

<style lang="less">
#reverse-terms {
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
        p,li {
            font-size: 26dpx;
            color: #666;
            line-height: 48px;
            letter-spacing: 0px;
        }
        li {
            list-style: disc;
            margin-left: 30px;
        }
    }
}
</style>
