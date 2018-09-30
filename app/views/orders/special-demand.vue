<template>
    <div class="special-demand" id="special-demand">
        <gz-header>
          <div  slot="right-icon" class="submit-btn">
              <span @click="commitDemand">提交</span>
          </div>
        </gz-header>
        <div class="demand-title pro-camp-horizontal">
            <h1>特殊要求</h1>
        </div>
        <div class="demand-detail">
            <textarea placeholder="请填写您的要求，200字以内..." v-model="text" @input="checkNum()"></textarea>
            <span class="demand-overflow" v-show="overflow">已经超出{{num}}字</span>
        </div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';

export default {
    data() {
        return {
            text: '',
            overflow: false,
            num: 0,
        };
    },
    computed: {
        ...mapGetters([
            'specialDemand',
        ]),
    },
    methods: {
        ...mapActions([
            'setOrderSpecialdemand',
        ]),
        commitDemand() {
            if (this.overflow) {
                this.$notify({
                    message: '超出规定文字',
                });
                return;
            }
            if (this.filterFill()) {
                this.setOrderSpecialdemand(this.text);
                this.$set(this, 'text', '');
                this.back();
            }
        },
        back() {
            this.$router.back();
        },
        filterFill() {
            if (this.text === '' || this.text.trim(' ') === '') {
                this.$notify({
                    message: '请填写您的特殊要求...',
                });
                return false;
            }
            return true;
        },
        checkNum() {
            if (this.text.length > 200) {
                this.$set(this, 'num', this.text.length - 200);
                this.$set(this, 'overflow', true);
            } else {
                this.$set(this, 'overflow', false);
            }
        },
    },
    mounted() {
        this.$set(this, 'text', this.specialDemand);
    },
};

</script>

<style lang="less" scoped>
    #special-demand {
        padding-top: 128px;
        .pro-camp-horizontal{
            border-bottom: 1px solid #dddddd;
            margin: 0 24px;
        }
        .gz-header{
            border-bottom: none;
        }
        .title-bar{
            width: 100%;
            overflow: hidden;
            .arrow-left {
                float: left;
                width: 45px;
                height: 60px;
                margin-left: 40px;
                padding-top: 26.3px;
                img {
                    width: 15px;
                    height: 28.7px;
                }
            }
            .submit-btn{
                font-size: 32dpx;
                line-height: 32px;
                color: #333333;
            }
        }
        .demand-title{
            padding:64px 0 47px 0;
        }
        .demand-detail{
            padding: 49px 24px;
            textarea{
                font-weight: 300;
                line-height: 1.36;
                text-align: justify;
                font-size: 32dpx;
                width: 100%;
                height: 600px;
                resize: none;
            }
            .demand-overflow{
                color: #ff4847;
                padding-bottom: 50px;
            }
        }
    }
</style>
