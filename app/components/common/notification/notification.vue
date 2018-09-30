<template>
    <div class="notification fixed" v-if="show" transition="slide">
        <div class="delete" @click="close()"></div>
        <div class="content">
             {{ options.content }}
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'gz-notification',
    data() {
        return {
            show: false,
            options: {},
        };
    },
    props: {
    },
    methods: {
        close() {
            this.show = false;
            this.options = {};
        },
    },
    computed: {
        ...mapGetters([
//            'show',
//            'options',
        ]),
        setStyle() {
            return {
                color: 'pink',
                background: '#fff',
            };
        },
    },
};
</script>

<style lang='less'>
    .fixed{
        position:fixed;
        top:0;
        width: 100%;
        height: 100%;
        z-index: 999;
        font-size: 24dpx;
        background: #fff;
    }
</style>
