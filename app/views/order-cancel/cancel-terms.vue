<template>
<div id="terms">
    <gz-header :title="title"></gz-header>
    <div class="terms-wrapper">
        <p>客户在使用行理APP退订房车、营地以前，请务必先阅读本取消预订条款及规定，并根据本条款规定承担因违反规定而造成损失和责任。 本条款及规定由行理制定。通过行理实时在线预订系统所提交的所有预订，均视为预订方已接受本条款。本条款将取代所有文件，除非以其他书面方式另有说明。
        </p>
        <h1>取消与更改</h1>

        <p>1. 预订方如需取消预订，须在行理APP上自行取消。</p>
        <p>2. 预订方如需更改预订须发送邮件或传真到指定地址或号码。</p>
        <p>3. 预订方不得直接联系营地取消或更改预订，若以此方式取消或更改预订，将视作无效。</p>
        <p>4. 请于行理的工作时间内取消、更改预订；若预订方于行理的非工作时间内取消、更改预订则视作无效，或不被受理。</p>
        <p>5. 任何预订的变更需经行理做最终确认。预订取消或更改一经确认，取消或更改前的预订即刻失效。</p>
        <p>6. 于最晚取消期后，预订方若取消预订，以及适用特殊取消规定的预订,将收取100%全额费用。</p>
        <p>7. 已确认或申请的预订，取消规定如有变化，行理将通知预订方。</p>
        <p>8. 平日取消和变更收费规定如下：</p>
        <p>最晚取消期以前：</p>
        <p>取消已确认且未支付的：免费</p>
        <p>取消已确认且已支付的：费用总额扣除5%后将退还至您的指定账户。</p>
        <p>更改已确认：可能收取一定金额的更改手续费（根据实际规定执行）。</p>
        <p>最晚取消期之后：</p>
        <p>取消或更改已确认预订：具体以规定为准，不排除收取全额费用作为罚金。</p>

        <h1>退款说明</h1>
        <p> 1. 在行理规定的最晚取消日期前，预订方在行理APP成功取消预订后，若预订方需办理退款手续，须向行理提出退款申请，行理在收到退款申请的10-15个工作日内办理退款。</p>
        <p>2. 退款申请或其他要求预订方需向行理发送邮件，行理方可受理。退款申请需注明：取消的订单编号、退款帐号、持卡人姓名或公司名称、开卡行名称等。</p>
        <p>3. 预订方若晚于最晚取消日期取消或退订房间，行理将严格按照系统内房车供应商或营地方给出的退款规定办理退款。</p>


    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: this.$route.query.source == 1 ? '房车取消预订条款' : '营位取消预订条款', // eslint-disable-line
        };
    },
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
            margin: 70px 0 20px;
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
            letter-spacing: 0;
        }
    }
}
</style>
