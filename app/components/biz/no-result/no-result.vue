<template>
  <div class="no-result">
    <slot name="customImg"></slot>
    <div class="no-result-img">
      <img :src="img" alt="">
    </div>
    <span class="no-result-line">{{line[0]}}</span>
    <span>{{line[1]}}</span>
    <slot name="customContent"></slot>
  </div>
</template>

<script>
export default {
    name: 'no-result',
    props: {
        line: {
            type: Array,
            default() {
                return [];
            },
        },
        img: '',
    },
};
</script>

<style lang="less" scoped>
.no-result {
    width: 100%;
    left: 50%;
    position: absolute;
    text-align: center;
    // top: 245px;
    transform: translate(-50%,0);
    .no-result-img {
        width: 242px;
        height: 140px;
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
    span {
        display: block;
        color: #cfcfcf;
        margin: 10px auto;
        font-size: 28dpx;
    }
    span.no-result-line {
        margin-top: 45px;
    }
}
</style>
