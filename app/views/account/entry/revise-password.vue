<template>
    <div id="revise-password">
      <gz-header title="修改密码"></gz-header>
      <div class="content">
            <gz-input
                type="password"
                placeholder="*原密码"
                v-model="originalPassword"
                required="true"
                :isFocused="isFocused"
            ></gz-input>
            <gz-input
                type="password"
                placeholder="*输入新密码"
                v-model="newpassword"
                :required="true"
                :errMsg="passwordErrMsg"
                @resetErr="passwordErrMsg = ''"
                @blur="checkPassword"
                :isFocused="isFocused"
            ></gz-input>
            <gz-input
                type="password"
                placeholder="*请再次输入新密码"
                v-model="confirmPassword"
                :required="true"
                :errMsg="confirmPasswordErrMsg"
                @resetErr="confirmPasswordErrMsg = ''"
                @blur="checkPasswordAgain"
                :isFocused="isFocused"
            ></gz-input>
            <div class="passwordTitle passwordAgain">*密码设置必须在8至20个字符之内</div>
            <div class="confirmBox">
                <button
                    :disabled="disableValue"
                    :class={disabled:disableValue}
                    @click="revisePassword"
                >完成</button>
            </div>
        </div>
    </div>
</template>

<script>
import Input from '../../../components/common/input.vue';

export default {
    data() {
        return {
            originalPassword: '',
            newpassword: '',
            confirmPassword: '',
            passwordErrMsg: '',
            confirmPasswordErrMsg: '',
            isFocused: false,
        };
    },
    components: {
        [Input.name]: Input,
    },
    computed: {
        disableValue() {
            return !(
                this.confirmPassword === this.newpassword
                && this.newpassword.length >= 8
                && this.newpassword.length <= 20
                && this.originalPassword.length > 0
            );
        },
    },
    methods: {
        goBack() {
            this.$router.replace(this.$route.query.redirect || '/account/index');
        },
        checkPassword() {
            const reg = /^[A-Za-z0-9]+$/;
            if (!reg.test(this.newpassword) || this.newpassword.length < 8
                || this.newpassword.length > 20) {
                this.$set(this, 'passwordErrMsg', '密码设置必须在8至20个字符之内');
            }
        },
        checkPasswordAgain() {
            if (this.newpassword !== this.confirmPassword) {
                this.$set(this, 'confirmPasswordErrMsg', '请确保新旧密码相同');
            }
        },
        revisePassword() {
            const revisePasswordInfo = {
                oldPassword: this.originalPassword,
                newpassword: this.newpassword,
                againPassword: this.confirmPassword,
            };
            this.$store.dispatch('revisePassword', revisePasswordInfo).then(() => {
                this.$router.push('/account/entry/revise-password-success');
            }).catch((err) => {
                this.$notify({ message: err.msg || err });
            });
        },
    },
    mounted() {
        this.isFocused = true;
    },
};
</script>

<style lang="less">
    #revise-password {
        height: 100%;
        width: 100%;
        .gz-header {
            border-bottom: 1rpx solid #dddddd;
        }
        .content {
            padding:80px 25px 0 25px;
            color: #999999;
            .fade-enter-active, .fade-leave-active {
                transition: opacity .5s
            }
            .fade-enter, .fade-leave-active {
                opacity: 0
            }
            button{
                border: 0;
                color: #fff;
                background-color: #ff4544;
                &.disabled {
                    background-color: #ccc;
                }
            }
            .confirmBox {
                padding-top: 80px;
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
            .gz-input {
                border-bottom: 2rpx solid #eee;
                border-top: none;
                padding:0 30px;
                border-bottom: 2px solid #dddddd;
                input {
                    font-size: 32dpx;
                }
                .errHint {
                    font-size: 28dpx;
                }
                .addons {
                    height: 50px;
                    width: 180px;
                    font-size: 24dpx;
                    button{
                        color: white;
                        background-color: #6ac82a;
                    }
                }
            }
            .passwordTitle {
                margin-top: 94px;
                margin-left: 30px;
                font-size: 24dpx;
                &.passwordAgain {
                    margin-top: 40px;
                }
            }
        }
    }
</style>
