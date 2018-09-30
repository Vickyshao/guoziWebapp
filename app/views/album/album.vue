<template>
    <div class="image-album">
        <gz-header></gz-header>
        <div class="container">
            <h2>相册</h2>
            <div class="album-list">
                <gz-gallery :options="albumOptions" :items="album"></gz-gallery>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'albumOptions',
                'projectAlbum',
                'carAlbum',
            ]),
            album() {
                const id = this.$route.params.id;
                const type = this.$route.meta.type;
                const album = type === 'project' ? this.projectAlbum(id) : this.carAlbum(id);
                return album.map(item => ({
                    imageUrl: item,
                }));
            },
            getAlbum() {
                const type = this.$route.meta.type;
                return type === 'project' ? this.getProjectAlbum : this.getCarAlbum;
            },
        },
        methods: {
            ...mapActions([
                'getProjectAlbum',
                'getCarAlbum',
            ]),
        },
        mounted() {
            this.getAlbum(this.$route.params.id);
        },
    };
</script>

<style lang="less">
    @import (reference) '../../global.style.less';
    .image-album {
        padding-top: 100px;
        .container {
            padding: 0 40px;
            h2 {
                font-size: 50dpx;
                padding: 50px 0;
                color: #333;
                border-bottom: 1rpx solid #ddd;
            }
            .album-list {
                width: 100%;
                padding-top: 50px;
            }
        }

    }
</style>
