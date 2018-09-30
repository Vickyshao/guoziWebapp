<template>
    <div class="gz-header" :class="{ transparent: isTransparent }">
        <div class="gz-header-left" @click="leftHandler">
            <slot name="left-icon">
                <img
                    v-if="leftIcon"
                    :src="leftIcon"
                    :height="iconHeight"
                    :width="iconWidth"
                    class='other-icon'
                >
                <img
                    v-else-if="leftToBack"
                    :src="icons.back"
                    :height="iconHeight"
                    :width="iconWidth"
                >
            </slot>
        </div>
        <div class="gz-header-title">
            <slot name="header-title">
                {{title}}
            </slot>
        </div>
        <div class="gz-header-right" @click="rightHandler">
            <slot name="right-icon">
                <img
                    v-if="rightIcon"
                    :src="rightIcon"
                    :width="iconWidth"
                    :height="iconHeight"
                >
            </slot>
        </div>
        <slot name="title-bar-right"></slot>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'gz-header',
    data() {
        return {
            icons: {
                back: require('../../../../public/img/back.svg'),
            },
        };
    },
    props: {
        title: String,
        leftIcon: String,
        rightIcon: String,
        iconWidth: {
            type: Number,
            default: 50,
        },
        iconHeight: {
            type: Number,
            default: 50,
        },
        backUrl: {
            type: String,
            default: '',
        },
        leftToBack: {
            type: Boolean,
            default: true,
        },
        customHandler: {
            type: Boolean,
            default: false,
        },
        isTransparent: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        leftHandler() {
            if (this.leftIcon) {
                this.$emit('left-icon-click');
            } else if (this.leftToBack) {
                if (this.customHandler) {
                    this.$emit('backHandler');
                } else if (this.backUrl) {
                    this.$router.replace(this.backUrl);
                } else {
                    this.$router.back();
                }
            }
        },
        rightHandler() {
            if (this.rightIcon) this.$emit('right-icon-click');
        },
    },
};
</script>

<style lang="less" scoped>
    .gz-header {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        text-align: center;
        height: 88px;
        background-color: #fff;
        color: #333;
        font-size: 32dpx;
        border-bottom: solid 1rpx #ddd;
        z-index:99;
        .gz-header-left, .gz-header-right {
            width: 120px;
            display: flex;
            align-items: center;
            padding: 0 3%;
        }
        .gz-header-left {
            justify-content: flex-start;
            img {
                width: 45px;
                height: 45px;
            }
            .other-icon{
                width: 32px;
                height: 32px;
            }
        }
        .gz-header-right {
            justify-content: flex-end;
        }
        .gz-header-title {
            flex: 1;
        }
        &.transparent {
            border-bottom: none;
            background-color: transparent;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.0));
        }
    }
</style>
