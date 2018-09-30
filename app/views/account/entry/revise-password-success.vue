<template>
    <div id="revise-password-success">
      <gz-header
          title="修改密码"
      ></gz-header>
        <div class="content">
          <div class="successInfo">
              <img :src="icons.group81"/>
              <p>密码修改成功！</p>
          </div>
          <div class="confirmBox">
              <button @click="signIn"
              >重新登陆</button>
          </div>
        </div>
    </div>
</template>

<script>
import Input from '../../../components/common/input.vue';

export default {
    data() {
        return {
            icons: {
                group81: require('../../../../public/img/group-81.svg'),
            },
        };
    },
    methods: {
        signIn() {
            this.$router.push('/account/entry/sign-in');
        },
    },
    components: {
        [Input.name]: Input,
    },
};
</script>

<style lang="less">
    #revise-password-success {
        height: 100%;
        width: 100%;

        .title-bar {
            font-size: 32dpx;
        }

        .content{
            margin-top: 227px;
            .successInfo{
                width: 100%;
                height:300px;
                text-align: center;
                img{
                    width: 270px;
                    height: 142px;
                }
                p {
                    margin-top: 56px;
                    font-size: 28dpx;
                    color: #999999;
                }
            }
        }

        .confirmBox {
            padding-top: 52px;
            font-size: 32dpx;
            text-align: center;

            button {
                width: 690px;
                height: 80px;
                line-height: 80px;
                border-radius: 6px;
                color: #fff;
                background-color: #ff4847;
                font-size:32dpx;
                &.disabled {
                    background-color: #ccc;
                }
            }
        }
    }
</style>
