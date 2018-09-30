<template>
    <div id="sign-in">
      <gz-header title="登录"></gz-header>
      <div class="content">
            <div class="logo">
                <img :src="icons.logo">
            </div>
            <div class="sign-in-form">
                <gz-input
                    type="tel"
                    placeholder="输入注册手机号"
                    v-model="phone"
                    :errMsg="phoneErrMsg"
                    @resetErr="phoneErrMsg = ''"
                    @blur="checkPhone"
                    :isFocused="isFocused"
                >
                    <div slot="label">+86 | </div>
                </gz-input>
                <gz-input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="输入密码"
                    v-model="password"
                    :errMsg="passwordErrMsg"
                    @resetErr="passwordErrMsg = ''"
                    @blur="checkPassword"
                    :isFocused="isFocused"
                >
                <div class="seePassword" @click="isShowPassword">
                   <img :src="icons.eyeClose" v-show="!showPassword">
                   <img :src="icons.eyeOpen" v-show="showPassword">
                </div>
                </gz-input>
            </div>
            <button
                class="gz-btn"
                :disabled="signInBtnDisabled"
                :class={disabled:signInBtnDisabled}
                @click="signIn"
            >登录</button>
            <div class="links">
                <router-link to="reset-password-step1">忘记密码</router-link>
                <router-link :to="signUpUrl">还没有账号？快速注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Input from '../../../components/common/input.vue';
import Cookies from '../../../utilities/cookies';

export default {
    data() {
        return {
            phone: '',
            password: null,
            countdown: 0,
            maxCountDown: 60,
            timeoutHandler: [],
            phoneErrMsg: '',
            passwordErrMsg: '',
            codeErrMsg: '',
            isFocused: false,
            showPassword: false,
            icons: {
                logo: require('../../../../public/img/logo-small.png'),
                eyeClose: require('../../../../public/img/eye-close.svg'),
                eyeOpen: require('../../../../public/img/eye-open.svg'),
            },
        };
    },
    computed: {
        signInBtnDisabled() {
            return (
                !this.phone ||
                !this.password ||
                !!this.phoneErrMsg ||
                !!this.passwordErrMsg
            );
        },
        signUpUrl() {
            return {
                path: 'sign-up',
                query: this.$route.query,
            };
        },
    },
    components: {
        [Input.name]: Input,
    },
    methods: {
        isShowPassword() {
            this.$set(this, 'showPassword', !this.showPassword);
        },
        startCountdown(maxCounter) {
            let counter = maxCounter;
            while (counter >= 0) {
                ((e) => {
                    this.timeoutHandler.push(setTimeout(() => {
                        this.$set(this, 'countdown', e);
                    }, 1000 * (maxCounter - e)));
                })(counter);
                counter -= 1;
            }
        },
        checkPhone() {
            const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/;
            if (!reg.test(this.phone) || this.phone.length !== 11) {
                this.$set(this, 'phoneErrMsg', '请输入正确的手机号');
            }
        },
        checkPassword() {
            if (this.signInType === 'password' && !this.password) {
                this.$set(this, 'passwordErrMsg', '请输入密码');
            }
        },
        signIn() {
            this.$store.dispatch('signIn', {
                phone: this.phone,
                password: this.password,
            }).then((data) => {
                if (!this.$isServer) {
                    global.localStorage.setItem('phone', data.phone);
                    global.localStorage.setItem('userId', data.userId);
                    global.localStorage.setItem('sessionId', data.sessionId);

                    Cookies.setCookie('phone', data.phone, 15);
                    Cookies.setCookie('userId', data.userId, 15);
                    Cookies.setCookie('sessionId', data.sessionId, 15);
                }

                if (this.$route.query.back) {
                    this.$router.back();
                } else {
                    this.$router.replace(this.$route.query.goto || '/account/index');
                }
            }).catch((err) => {
                if (err.code) {
                    switch (err.code.toString()) {
                        case '1015':
                            this.codeErrMsg = err.msg;
                            break;
                        case '1016':
                            this.passwordErrMsg = err.msg;
                            break;
                        case '2001':
                            this.phoneErrMsg = err.msg;
                            break;
                        default:
                            this.$notify({ message: err.msg || err });
                    }
                } else {
                    this.$notify({ message: err.msg || err });
                }
            });
        },
    },
    mounted() {
        this.isFocused = true;
        if (global.localStorage) {
            const lastTime = global.localStorage.getItem('signUp-sendVerifyCode');
            const timeGap = lastTime ? parseInt((new Date().getTime() - lastTime) / 1000, 10) : 0;
            const counter = lastTime ? Math.max(this.maxCountDown - timeGap, 0) : 0;
            this.$set(this, 'countdown', counter);
            if (counter > 0) this.startCountdown(counter);
        }
    },
    destroy() {
        this.timeoutHandler.forEach(clearTimeout);
    },
};
</script>

<style lang="less">
#sign-in {
    height: 100%;
    width: 100%;
    padding-top:100px;
    .content {
        padding: 0 30px;
        z-index: 20;
        position: relative;

        .logo {
            height: 160px;
            margin: 74px 0;
            padding: 0 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 160px;
            }
        }

        .sign-in-form {
            margin: 0 70px;

            .gz-input {
                border-top: 0px;
                padding: 0;
                border-bottom: 3px solid #eee;
                label {
                    padding: 0;
                    width: 90px;
                    font-size: 28dpx;
                    font-weight: normal;
                    color: #999999;
                }
                input {
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
                        background-color: #6ac82a;
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
            line-height: 100px;
            margin: 140px auto 80px;
            border: none;
            border-radius: 10px;
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

        .links {
            width: 550px;
            margin: 30px 70px;
            display: flex;
            justify-content: space-between;
            a {
                color: #666666;
                text-decoration: none;
                font-size: 28dpx;
            }
        }
    }
}
</style>
