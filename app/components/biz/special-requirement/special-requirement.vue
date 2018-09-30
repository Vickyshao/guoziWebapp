<template>
    <div class="content">
        <div class="title">
          特殊要求
        </div>
        <div class="paragraph">
            <p>{{specialDemand}}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'special-requirement',
    props: {
        specialDemand: '',
    },
};
</script>

<style lang="less" scoped>
.content {
    margin: 54px 50px 0 35px;
    .title {
        font-size: 50dpx;
        font-weight: 600;
        color: #4a4a4a;
        padding-bottom: 47px;
        border-bottom: 2rpx solid #dddddd;
    }
    .paragraph {
        margin-top: 50px;
        font-size: 28dpx;
        font-weight: 300;
        line-height: 1.36;
        text-align: justify;
        color: #666666;
    }
}
</style>
