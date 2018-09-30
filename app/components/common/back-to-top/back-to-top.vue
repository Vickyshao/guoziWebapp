<template>
    <img :src="icons.goTop" class="goTopButton" v-show="scrollTop >= setScrollTopShow" @click="goTop">
</template>

<script>
export default {
    name: 'back-to-top',
    data() {
        return {
            scrollTop: 0,
            icons: {
                goTop: require('../../../../public/img/go-top.svg'),
            },
        };
    },
    methods: {
        goTop() {
            const elementClass = this.elementClass;
            const timer = setInterval(() => {
                let distance,
                    speed;
                global.addEventListener('touchmove', () => {
                    clearInterval(timer);
                });
                distance = elementClass ? document.querySelector(elementClass).scrollTop : document.body.scrollTop;
                speed = Math.floor(-distance / 3);
                elementClass ? (document.querySelector(elementClass).scrollTop = distance + speed) : (document.body.scrollTop = distance + speed);
                if (distance == 0) {
                    clearInterval(timer);
                }
            }, 30);
        },
        scrollHandler() {
            if (global.addEventListener) {
                this.$set(this, 'scrollTop', global.scrollY);
            }
            if (this.elementClass) {
                this.$set(this, 'scrollTop', document.querySelector(this.elementClass).scrollTop);
            }
        },
        addScrollEvent() {
            if (global.addEventListener) {
                global.addEventListener('scroll', this.scrollHandler);
            }
            if (this.elementClass) {
                document.querySelector(this.elementClass).addEventListener('scroll', this.scrollHandler);
            }
        },
    },
    mounted() {
        this.addScrollEvent();
    },
    props: {
        setScrollTopShow: {   // 传入显示回到顶部距离值 必传
            type: Number,
            default() {
                return 500;
            },
        },
        elementClass: {     // 有wrap需要传入wrap的class
            type: String,
            default() {
                return '';
            },
        },
    },
};
</script>

<style lang="less">
    .goTopButton {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        position: fixed;
        z-index: 10;
        bottom: 195px;
        right: 20px;
    }
</style>
