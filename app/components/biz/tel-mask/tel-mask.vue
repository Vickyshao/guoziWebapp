<template>
    <gz-mask :show="show" class="tel-mask" @click="toggle">
        <div class="tel-wrap">
            <div class="button tel" @click="call($event)">
                <a :href="`tel:${phone}`">{{phone | fomartPhone(phone)}}</a>
                <!-- {{phone.replace(/\s/g, '').replace(/\B(?=(?:\d{4})+$)/g, '-')}} -->
            </div>
            <div class="button cancel">
                取消
            </div>
        </div>
    </gz-mask>
</template>

<script>
    export default {
        name: 'tel-mask',
        data() {
            return {
                show: false,
            };
        },
        props: {
            phone: '',
        },
        methods: {
            toggle() {
                this.show = !this.show;
            },
            call(event) {
                event.stopPropagation();
                this.toggle();
            },
        },
    };
</script>

<style lang="less" scoped>
    .tel-mask {
        color: #585858;
        font-size: 28dpx;
        .tel-wrap {
            position: fixed;
            left: 30px;
            right: 30px;
            bottom: 0;
            .button{
              height: 120px;
              border-radius: 10px;
              background-color: #ffffff;
              letter-spacing: -2.8px;
              text-align: center;
              line-height: 120px;
              font-size: 36dpx;
            }
            .cancel {
                margin-bottom: 18px;

                color: #4a4a4a;
            }
            .tel{
              margin-bottom: 30px;
              width: 100%;
              a{
                  color: #4a90e2;
              }
            }
        }
    }
</style>
