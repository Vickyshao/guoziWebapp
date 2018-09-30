<template>
  <div class="gz-area-select">
    <gz-mask :show="true" @click="cancle" class="demand-mask">
      <div class="gz-area-panel">
        <gz-picker :slots="sortSlots" @change="changeSort"　:showToolbar="true" :itemHeight="120" ref="picker">
          <div class="gz-area-btn">
            <div class="tel">
              <div class="close" @click="cancle">
                  <img :src="icons.group" alt="">
              </div>
              <div class="">
                  <span @click="confirm">确定</span>
              </div>
            </div>
          </div>
        </gz-picker>
      </div>
    </gz-mask>
  </div>
</template>

<script>
import { map, find } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'gz-reason-select',
    computed: {
        ...mapGetters([
            'cancelReason',
        ]),
    },
    props: {
        getSortInfo: {
            type: Function,
            default: () => {},
        },
        isShow: {
            type: Function,
            default: () => {},
        },
        currentSelect: {},
    },
    mounted() {
        this.getCancelReason().then(() => {
            this.initSort();
        });
    },
    data() {
        return {
            sortList: [{
                id: 1,
                sort: '点错了',
            },
            {
                id: 2,
                sort: '不想订了',
            },
            {
                id: 3,
                sort: '行程临时改变',
            },
            {
                id: 4,
                sort: '其它',
            },
            ],
            sortSlots: [{
                flex: 1,
                values: [],
                textAlign: 'center',
            }],
            icons: {
                group: require('../../../../public/img/group.svg'),
            },
        };
    },
    methods: {
        ...mapActions(['getCancelReason']),
        changeSort(picker, values) {
            if (!values[1]) return;
            const sortInfo = find(this.cancelReason, (obj) => { // eslint-disable-line
                return obj.sort === values[1];
            });
            this.selectInfo = {
                sort: sortInfo.sort,
                id: sortInfo.id,
            };
        },
        initSort() {
            if (this.currentSelect) {
                const setSlotValue = this.$refs.picker.setSlotValue;
                setSlotValue(0, this.currentSelect.sort);
            }
            this.$set(this.sortSlots[0], 'values', map(this.cancelReason, 'sort'));
        },
        confirm() {
            this.getSortInfo(this.selectInfo);
            this.isShow(false);
        },
        cancle() {
            this.isShow(false);
        },
    },
};
</script>

<style lang="less" scoped>
.tel {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.title {
    font-size: 32dpx;
    font-weight: 600;
    text-align: justify;
    color: #4a4a4a;
    padding-top: 50px;
    padding-left: 13px;
}
.gz-area-select {
    .gz-area-panel {
        z-index: 1000;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: auto;
        background-color: white;
        padding: 20px 0;
        .gz-area-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            span {
                width: 120px;
                color: #000000;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 32dpx;
                &:last-child {
                    color: #333333;
                }
            }
            img {
                width: 32px;
                height: 32px;
            }
        }
    }
}
</style>
