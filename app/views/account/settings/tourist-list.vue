<template>
    <div id="tourist-list">
        <gz-header></gz-header>
        <div class="content">
            <div class="title">常用游客信息</div>
            <div class="no-tourist" v-if="touristList.length === 0">
                <span>暂无常用游客信息，请添加</span>
                <img :src="icons.noTourist">
            </div>
            <div v-else>
                <div v-for="item in touristList" class="tourist">
<!--
                    <div class="checkbox">
                        <img
                            :src="item.isDefault ? '../../../../public/img/checked.svg' : '../../../../public/img/unchecked.svg'"
                            @click="changeDefaultTourist(item)"
                        >
                    </div>
-->
                    <div class="tourist-info">
                        <div>{{ item.name }}</div>
                        <div>{{ item.idCard }}</div>
                        <div>{{ item.phone }}</div>
                    </div>
                    <div class="operation-bar">
                        <div class="operation">
                            <img :src="icons.edit" @click="addOrEditTourist(item.id)">
                            <img :src="icons.delete" @click="deleteTourist(item.id)">
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="btn"
                @click="addOrEditTourist()"
            >新增常用游客信息</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            isSubmitting: false,
            icons: {
                noTourist: require('../../../../public/img/have-not-tourist.svg'),
                edit: require('../../../../public/img/edit.svg'),
                delete: require('../../../../public/img/delete.svg'),
            },
        };
    },
    computed: {
        ...mapGetters([
            'touristList',
            'tourist',
        ]),
    },
    methods: {
//        ...mapActions([
//            'getTouristData',
//            'addTouristData',
//            'updateTouristData',
//            'deleteTouristData',
//            'setDefaultTourist',
//        ]),
        addOrEditTourist(id = undefined) {
            if (id === undefined) {
                this.$router.replace({
                    path: 'tourist',
                    query: {
                        redirect: this.$route.fullPath,
                    },
                });
            } else {
                this.$router.replace({
                    path: `tourist/${id}`,
                    query: {
                        redirect: this.$route.fullPath,
                    },
                });
            }
        },
        deleteTourist(id) {
            if (this.isSubmitting) return;
            this.deleteTourist({ id }).then(() => {
                if (this.touristList.length === 0) {
                    this.$store.dispatch('updateCheckoutTouristId', null);
                }
                this.$set(this, 'isSubmitting', false);
                this.$notify({ message: '删除地址成功！' });
            }).catch((err) => {
                this.$notify({ message: err.errMsg || '' });
            });
            this.$set(this, 'isSubmitting', true);
        },
        isTouristValid(item) {
            return item.province && item.city && item.region
            && (item.provinceId || item.provinceId === 0)
            && (item.cityId || item.cityId === 0)
            && (item.regionId || item.regionId === 0);
        },
        changeDefaultTourist(item) {
            const id = item.id;
            const valid = this.isTouristValid(item);
            if (!this.TouristData(id).isDefault) {
                if (valid) {
                    this.setDefaultTourist({ id }).then(() => {
                        if (this.$route.query.key === 'checkout') {
                            this.$store.dispatch('updateCheckoutTouristId', id);
                        }
                        this.$notify({ message: '设置默认地址成功！' });
                    }).catch((err) => {
                        this.$notify({ message: err.errMsg || '' });
                    });
                } else {
                    this.$notify({ message: '该地址不完善，请先补充！' });
                }
            }
        },
        routerBack() {
            this.$router.go(-1);
        },
        selectedTourist(item) {
            const valid = this.isTouristValid(item);
            if (this.$route.query.key === 'checkout') {
                if (valid) {
                    this.$store.dispatch('updateCheckoutTouristId', item.id);
                    this.$router.replace('/addOrder');
                } else {
                    this.$notify({ message: '该地址不完善，请先补充！' });
                }
            }
        },
    },
    created() {
        if (!this.$store.state.tourist.touristList.length) {
            this.$store.dispatch('getTouristList').catch((err) => {
                this.$notify({ message: err.errMsg || '' });
            });
        }
    },
};
</script>

<style lang="less">
#tourist-list {
    height: 100%;
    width: 100%;
    padding-top:135px;
    .content {
        display: flex;
        flex-direction: column;
        padding: 0 24px;
        .title {
            font-size: 50dpx;
            margin-bottom: 100px;
        }
        .no-tourist {
            display: flex;
            flex-direction: column;
            span {
                font-size: 34dpx;
                color: #666666;
            }
            img {
                width: 320px;
                margin: 300px 0;
                text-align: center;
                align-self: center;
            }
        }
        .tourist {
            .operation-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 20px;
                padding: 0 15px;

                img {
                    width: 17px;
                }
                .checkbox {
                    img {
                        position: relative;
                        top: 2px;
                        margin-right: 10px;
                    }
                    span {
                        font-size: 14dpx;
                    }
                }
                .operation {
                    img {
                        position: relative;
                        top: 2px;
                        margin-left: 30px;
                    }
                }
            }
        }
        .btn {
            width: 690px;
            height: 90px;
            line-height: 90px;
            border: none;
            border-radius: 10px;
            font-size: 32dpx;
            text-align: center;
            color: #ffffff;
            background-color: #FF4847;
            align-self: center;
            &.disabled {
                background-color: #ccc;
                pointer-events: none;
            }
        }
        .tourist-bar .tourist-info {
            padding-left: 0;
            -webkit-tap-highlight-color:rgba(255,255,255,0);
        }
    }
}
</style>
