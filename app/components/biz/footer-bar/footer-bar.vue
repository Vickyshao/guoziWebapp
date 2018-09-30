<template>
<div class="home-footer-bar">
    <router-link to="/home" class="home-item">
        <div class="home-img">
            <img src="" alt="">
        </div>
        <p class="home-header-bar-title">探索</p>
    </router-link>
    <router-link to="/travels" class="home-item">
        <div class="home-img">
            <img src="" alt="">
        </div>
        <p class="home-header-bar-title">玩法</p>
    </router-link>
    <router-link to="/touring-car" class="home-item">
        <div class="home-img">
            <img src="" alt="">
        </div>
        <p class="home-header-bar-title">房车</p>
    </router-link>
    <router-link to="/account/index" class="home-item" :class="{ 'red-user': this.$route.path === '/account/entry/sign-in' }">
        <div class="home-img">
            <img src="" alt="">
        </div>
        <p class="home-header-bar-title">我的</p>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'gz-footer-bar',
};
</script>

<style lang="less" scoped>
.mixin (@name) {
    background: url('../../../../public/img/@{name}.svg') no-repeat;
    background-size: 100% 100%;
}

.mixinActiveImg (@name) {
    background: url('../../../../public/img/@{name}-active.svg') no-repeat;
    background-size: 100% 100%;
}

.home-footer-bar {
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    box-align: center;
    box-pack: justify;
    padding: 12px 0 8px;
    backdrop-filter: blur(3.5px);
    background-color: #FFF;
    border-top: solid 1rpx #999;
    a.home-item {
        font-size: 0;
        flex: 1;
        text-align: center;
        color: #666;
        &.router-link-active {
            color: #ff4544;
        }
        .home-img {
            width: 40px;
            height: 40px;
            display: inline-block;
            margin-top: 3px;
        }
        .home-header-bar-title {
            margin-top: 10px;
            font-size: 18dpx;
        }
    }
    a.home-item:nth-child(1) {
        .home-img {
            .mixin('explore');
        }
    }
    a.home-item:nth-child(2) {
        .home-img {
            .mixin('play');
        }
    }
    a.home-item:nth-child(3) {
        .home-img {
            .mixin('car');
        }
    }
    a.home-item:nth-child(4) {
        .home-img {
            .mixin('user');
        }
        &.red-user {
            color: #ff4544;
            .home-img {
                .mixinActiveImg('user');
            }
        }
    }
    a.router-link-active:nth-child(1) {
        .home-img {
            .mixinActiveImg('explore');
        }
    }
    a.router-link-active:nth-child(2) {
        .home-img {
            .mixinActiveImg('play');
        }
    }
    a.router-link-active:nth-child(3) {
        .home-img {
            .mixinActiveImg('car');
        }
    }
    a.router-link-active:nth-child(4) {
        .home-img {
            .mixinActiveImg('user');
        }
    }
}
</style>
