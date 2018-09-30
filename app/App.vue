<template>
    <div id="app" class="view">
        <router-view></router-view>
        <gz-notification></gz-notification>
    </div>
</template>

<script>
    import Notification from './components/common/notification';

    export default {
        beforeMount() {
            this.$store.dispatch('syncSession');
        },
        components: {
            [Notification.name]: Notification,
        },
    };
</script>

<style lang="less">
    @import (once) "./global.style.less";
    #app {
        width: 100%;
        height: 100%;
    }
</style>
