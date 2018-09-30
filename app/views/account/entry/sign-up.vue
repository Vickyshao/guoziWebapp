<template>
    <div id="sign-up">
        <gz-header title="注册"></gz-header>
        <div class="content">
            <div class="logo">
                <img :src="icons.logo">
            </div>
            <div class="sign-up-form">

                <gz-input
                    type="tel"
                    placeholder="输入注册手机号"
                    v-model="phone"
                    required="true"
                    :errMsg="phoneErrMsg"
                    @resetErr="phoneErrMsg = ''"
                    @blur="checkPhone"
                    :isFocused="isFocused"
                >
                    <div slot="label">+86</div>
                </gz-input>
                <gz-input
                    type="text"
                    placeholder="输入验证码"
                    v-model="code"
                    required="true"
                    :errMsg="codeErrMsg"
                    @resetErr="codeErrMsg = ''"
                >
                    <button
                        class="addons"
                        :class={disabled:sendCodeBtnIsInvalid}
                        size="block"
                        @click="sendVerifyCode"
                        :disabled="sendCodeBtnIsInvalid"
                    >{{countdown > 0 ? `重新获取(${countdown}s)` : '获取验证码'}}</button>
                </gz-input>
                <gz-input
                    type="text"
                    placeholder="设置用户名（20字符内，不能含特殊字符）"
                    v-model="userName"
                    required="true"
                    :errMsg="userNameErrMsg"
                    @resetErr="userNameErrMsg = ''"
                    @blur="checkUserName()"
                    :isFocused="isFocused"
                ></gz-input>
                <gz-input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="设置密码（8-20个字符）"
                    v-model="password"
                    required="true"
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
                <div
                    class="terms"
                >＊注册表示您已同意 <span @click="saveLoginInfo">《国资文旅服务协议》</span></div>
            </div>
            <button
                class="gz-btn no-disabled"
                :class={disabled:signUpBtnDisabled}
                :disabled="signUpBtnDisabled"
                @click="signUp"
            >注册</button>
        </div>
    </div>
</template>

<script>
import Input from '../../../components/common/input.vue';
import Checkbox from '../../../components/common/checkbox.vue';
import Cookies from '../../../utilities/cookies';

export default {
    data() {
        return {
            phone: '',
            password: '',
            code: null,
            userName: '',
            countdown: 0,
            maxCountDown: 60,
            timeoutHandler: [],
            phoneErrMsg: '',
            codeErrMsg: '',
            passwordErrMsg: '',
            userNameErrMsg: '',
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
        phoneValid() {
            const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/;
            return reg.test(this.phone);
        },
        passwordValid() {
            return /^[^\u4e00-\u9fa5\s]{8,20}$/.test(this.password);
        },
        userNameValid() {
            return (
                /^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(this.userName) &&
                this.userName.replace(/[\u4e00-\u9fa5]/g, 'aa').length <= 20
            );
        },
        sendCodeBtnIsInvalid() {
            return !(this.phoneValid && this.countdown === 0);
        },
        signUpBtnDisabled() {
            return (
                !this.phoneValid ||
                !this.passwordValid ||
                !this.userNameValid ||
                !this.code ||
                !!this.phoneErrMsg ||
                !!this.codeErrMsg ||
                !!this.passwordErrMsg ||
                !!this.userNameErrMsg
            );
        },
    },
    components: {
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
    },
    methods: {
        isShowPassword() {
            this.$set(this, 'showPassword', !this.showPassword);
        },
        checkPhone() {
            if (!this.phoneValid) {
                this.$set(this, 'phoneErrMsg', '请输入正确的手机号');
            }
        },
        checkPassword() {
            if (!this.passwordValid) {
                this.$set(this, 'passwordErrMsg', '密码格式不正确');
            }
        },
        checkUserName() {
            if (!this.userNameValid) {
                this.$set(this, 'userNameErrMsg', '用户名格式不正确');
            }
        },
        signUp() {
            this.$store.dispatch('signUp', {
                phone: this.phone,
                password: this.password,
                code: this.code,
                userName: this.userName,
            }).then((data) => {
                if (!this.$isServer) {
                    global.localStorage.setItem('phone', data.phone);
                    global.localStorage.setItem('userId', data.userId);
                    global.localStorage.setItem('sessionId', data.sessionId);

                    Cookies.setCookie('phone', data.phone, 15);
                    Cookies.setCookie('userId', data.userId, 15);
                    Cookies.setCookie('sessionId', data.sessionId, 15);
                }
                this.$router.replace('/account/entry/sign-up-success');
            }).catch((err) => {
                if (err.code) {
                    switch (err.code.toString()) {
                        case '1015':
                            this.codeErrMsg = err.msg;
                            break;
                        default:
                            this.$notify({ message: err.msg || err });
                    }
                } else {
                    this.$notify({ message: err.msg || err });
                }
            });
        },
        sendVerifyCode() {
            this.$store.dispatch('phoneExisted', this.phone).then((existed) => {
                if (existed) {
                    this.phoneErrMsg = '用户已存在';
                } else {
                    this.$set(this, 'countdown', this.maxCountDown);
                    if (global.localStorage) {
                        global.localStorage.setItem('signUp-sendVerifyCode', new Date().getTime());
                    }
                    this.$store.dispatch('sendVerifyCode', {
                        phone: this.phone,
                        operationType: 'SIGN_UP',
                    }).then(() => {
                        this.startCountdown(this.maxCountDown);
                    });
                }
            });
        },
        startCountdown(counter) {
            let countdown = counter;
            while (countdown >= 0) {
                ((e) => {
                    this.timeoutHandler.push(setTimeout(() => {
                        this.$set(this, 'countdown', e);
                    }, 1000 * (counter - e)));
                })(countdown);
                countdown -= 1;
            }
        },
        saveLoginInfo() {
            this.$store.dispatch('saveLoginInfo', {
                phone: this.phone,
                code: this.code,
                password: this.password,
                userName: this.userName,
            }).then(() => {
                this.$router.push('terms');
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
        if (this.$store.state.route.from.fullPath === '/account/entry/terms') {
            const loginInfo = this.$store.getters.loginInfo;

            this.phone = loginInfo.phone ? loginInfo.phone : '';
            this.code = loginInfo.code ? loginInfo.code : null;
            this.password = loginInfo.password ? loginInfo.password : '';
            this.userName = loginInfo.userName ? loginInfo.userName : null;
        }
    },
    destroy() {
        this.timeoutHandler.forEach(clearTimeout);
    },
};
</script>

<style lang="less">
#sign-up {
    height: 100%;
    width: 100%;
    padding-top:100px;
    .content {
        padding: 0 30px;

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

        .sign-up-form {
            margin: 0 70px;

            .gz-input {
                height: 110px;
                border-top: 0px;
                padding: 0;
                border-bottom: 3px solid #eee;
                label {
                    line-height: 32px;
                    border-right: 3px solid #999999;
                    padding: 0;
                    margin-right: 30px;
                    width: 75px;
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
                    height: 40px;
                    width: 160px;
                    font-size: 20dpx;
                    display: flex;
                    justify-content: center;
                    button {
                        border: none;
                        border-radius: 10px;
                        color: white;
                        background-color: #333333;
                        display: block;
                    }
                    &.disabled {
                        background-color: #ccc;
                        pointer-events: none;
                    }
                }
                input::-webkit-input-placeholder{
                    color: #999999;
                    font-size: 24dpx;
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
            margin: 0 auto;
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

        .terms {
            padding: 50px 0;
            font-size: 24dpx;
            color: #666666;
            text-decoration: none;
            span{
                text-decoration: underline;
            }
        }
    }
}
</style>
