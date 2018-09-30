<template>
    <div id="reset-password-step2">
        <gz-header
            :customHandler="true"
            @backHandler="goBack"
            title="重置密码"
        ></gz-header>
        <div class="content">
            <div class="reset-password-form">
                <gz-input
                    :type="showPassword1 ? 'text' : 'password'"
                    placeholder="新密码"
                    v-model="password"
                    :errMsg="passwordErrMsg"
                    @resetErr="passwordErrMsg = ''"
                    @blur="checkPassword"
                    :isFocused="isFocused"
                >
                <div class="seePassword" @click="isShowPassword(1)">
                   <img :src="icons.eyeClose" v-show="!showPassword1">
                   <img :src="icons.eyeOpen" v-show="showPassword1">
                </div>
                </gz-input>
                <gz-input
                    :type="showPassword2 ? 'text' : 'password'"
                    placeholder="确认新密码"
                    v-model="confirmPassword"
                    :errMsg="confirmPasswordErrMsg"
                    @resetErr="confirmPasswordErrMsg = ''"
                    @blur="checkPasswordAgain"
                    :isFocused="isFocused"
                >
                <div class="seePassword" @click="isShowPassword(2)">
                   <img :src="icons.eyeClose" v-show="!showPassword2">
                   <img :src="icons.eyeOpen" v-show="showPassword2">
                </div>
                </gz-input>
                <div
                    class="notice"
                >＊密码设置必须在8至20个字符之内</div>
            </div>
            <button
                class="gz-btn"
                :disabled="disableValue"
                :class={disabled:disableValue}
                @click="resetPasswordStep2"
            >下一步</button>
        </div>
    </div>
</template>

<script>
import Input from '../../../components/common/input.vue';

export default {
    data() {
        return {
            password: '',
            confirmPassword: '',
            passwordErrMsg: '',
            confirmPasswordErrMsg: '',
            isFocused: false,
            showPassword1: false,
            showPassword2: false,
            icons: {
                eyeClose: require('../../../../public/img/eye-close.svg'),
                eyeOpen: require('../../../../public/img/eye-open.svg'),
            },
        };
    },
    components: {
        [Input.name]: Input,
    },
    computed: {
        passwordValid() {
            const reg = /^[A-Za-z0-9]+$/;
            return (
                this.password.length >= 8 &&
                this.password.length <= 20 &&
                reg.test(this.password)
            );
        },
        confirmPasswordValid() {
            return this.password === this.confirmPassword;
        },
        disableValue() {
            return (
                !this.passwordValid ||
                !this.confirmPasswordValid ||
                !!this.passwordErrMsg ||
                !!this.confirmPasswordErrMsg
            );
        },
    },
    methods: {
        isShowPassword(type) {
            if (type === 1) {
                this.$set(this, 'showPassword1', !this.showPassword1);
            } else {
                this.$set(this, 'showPassword2', !this.showPassword2);
            }
        },
        goBack() {
            this.$store.dispatch('clearPhoneForResetPassword');
            this.$router.back();
        },
        checkPassword() {
            if (!this.passwordValid) {
                this.$set(this, 'passwordErrMsg', '请输入正确的密码');
            }
        },
        checkPasswordAgain() {
            if (!this.confirmPasswordValid) {
                this.$set(this, 'confirmPasswordErrMsg', '请确保两次输入的密码相同');
            }
        },
        resetPasswordStep2() {
            const phone = this.$store.getters.phoneForResetPassword;
            if (!phone) {
                this.$notify({ message: '无法获取手机号，请返回重新填写手机号' });
            } else {
                const resetPasswordInfo = {
                    phone,
                    password: this.password,
                };
                this.$store.dispatch('resetPasswordStep2', resetPasswordInfo).then(() => {
                    this.$store.dispatch('clearPhoneForResetPassword');
                    this.$router.push('/account/entry/reset-password-success');
                }).catch((err) => {
                    this.$notify({ message: err.msg || err });
                });
            }
        },
    },
    mounted() {
        this.isFocused = true;
    },
};
</script>

<style lang="less">
    #reset-password-step2 {
        height: 100%;
        width: 100%;
        padding-top:100px;
        .content {
            padding: 0 30px;

            .reset-password-form {
                .gz-input {
                    border-top: 0px;
                    padding: 0 5px;
                    border-bottom: 3px solid #eee;
                    input {
                        font-size: 32dpx;
                        color: #333333;
                    }
                    .errHint {
                    }
                    .addons {
                        height: 50px;
                        width: 160px;
                        font-size: 24dpx;
                        display: flex;
                        justify-content: center;
                        button {
                            border: none;
                            border-radius: 6px;
                            color: white;
                            background-color: #333333;
                        }
                        &.disabled {
                            background-color: #ccc;
                            pointer-events: none;
                        }
                    }
                    input::-webkit-input-placeholder{
                        color: #999999;
                    }
                    .seePassword{
                        width: 46px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        img {
                            width: 46px;
                            height: 46px;
                        }
                    }
                }
            }
            .gz-btn {
                width: 690px;
                height: 90px;
                line-height: 90px;
                margin: 80px 0;
                border: none;
                border-radius: 24px;
                font-size: 32dpx;
                text-align: center;
                color: #ffffff;
                background-color: #FF4847;
                &.disabled {
                    background-color: #ccc;
                    pointer-events: none;
                }
            }
            .gz-btn[disabled]:not(.no-disabled) {
                background-color: #ccc;
            }
            .notice {
                padding-top: 24px;
                font-size: 24dpx;
                color: #666666;
                text-decoration: none;
            }
        }
    }
</style>
