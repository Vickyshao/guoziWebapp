<template>
    <div class="hot-travel" v-if="travelShow">
      <gz-list-group :items="travel"></gz-list-group>
      <gz-scroller :options="scrollerOptions">
            <div class="products">
                <div class="product"
                     v-for="product in projectType"
                     :key="product.id"
                     @click="showProjectList(product.id)"
                >
                    <div class="product-image" :style="{backgroundImage: `url(${product.coverImg || icons.default})`}"></div>
                    <div class="product-name">
                        <span>{{product.name}}</span>
                    </div>
                    <div class="product-desc">
                        <span>{{product.description}}</span>
                    </div>
                </div>
            </div>
      </gz-scroller>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ListGroup from '../../common/list-group';

    export default {
        name: 'gz-hot-travel',
        data() {
            return {
                scrollerOptions: {
                    direction: 'horizontal',
                    width: '100%',
                },
                travel: [{
                    url: '#',
                    text: '新鲜旅程',
                }],
                travelShow: false,
                icons: {
                    default: require('../../../../public/img/hotelCover.svg'),
                },
            };
        },
        computed: {
            ...mapGetters([
                'projectType',
            ]),
        },
        methods: {
            ...mapActions([
                'getProjectType',
            ]),
            showProjectList(id) {
                this.$router.push(`/projects/${id}`);
            },
            // imageOnload(img) {
            //     var image = new Image();
            //     image.src = img;
            //     image.onload(() => {
            //         return img
            //     });
            //     return false;
            // }
        },
        mounted() {
            this.getProjectType().then(() => {
                this.$set(this, 'travelShow', true);
            });
        },
        components: {
            [ListGroup.name]: ListGroup,
        },
    };
</script>

<style lang="less">
.hot-travel {
    height: 710px;
    .products {
        width: auto;
        padding-left: 40px;
        .product {
            width: 290px;
            display: inline-block;
            vertical-align: top;
            margin-right: 24px;
            .product-image {
                width: 100%;
                height: 433px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }
            .product-name {
                padding: 24px 0 16px;
                font-weight: 600;
                font-size: 28dpx;
                color: #333;
                span {
                    height: 36px;
                    line-height: 36dpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
            .product-desc {
                font-size: 24dpx;
                line-height: 30dpx;
                color: #666;
                span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>
