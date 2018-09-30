<template>
    <div class="gz-list-group">
        <template v-for="item in items">
            <template v-if="item.content">
                <slot></slot>
                <!-- <div class="gz-list-group-item">
                    <template v-if="item.icon">
                        <span class="group-item-icon">
                            <img :src="item.icon">
                        </span>
                    </template>
                    <template v-if="item.hasArrow">
                        <img class="go" src="./angle-right.svg">
                    </template>
                </div> -->
            </template>
            <template v-else>
                <router-link :to="item.url" class="gz-list-group-item">
                    <template v-if="item.icon">
                        <img class="type" :src="item.icon">
                    </template>
                    <template v-if="item.text">
                        <span>{{item.text}}</span>
                    </template>
                    <template v-if="item.hasArrow">
                        <img class="go" :src="icons.angleRight">
                    </template>
                </router-link>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'gz-list-group',
    components: {

    },
    props: {
        items: {
            type: Array,
        },
    },
    data() {
        return {
            icons: {
                angleRight: require('./angle-right.svg'),
            },
        };
    },
};
</script>

<style lang='less'>
.gz-list-group {
    padding: 0 24px 0 32px;
    img {
        width: 14px;
        height: 26px;
    }
}

.gz-list-group-item {
    position: relative;
    display: flex;
    border-bottom: 1rpx solid #cecece;
    color: #3d3d3d;
    line-height: 130px;
    height: 130px;
    padding-left: 10px;
    text-decoration: none;
    font-size: 32dpx;
    overflow: hidden;
    align-items: center;
    img.go {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10px;
    }
    &:hover {
        text-decoration: none;
    }

    .tip {
        color: #cfcfcf;
        float: right;
    }
    img.type{
        width: 47px;
        height: 35px;
        margin-right: 18px;
    }
}
</style>
