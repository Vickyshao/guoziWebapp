<template>
        <div id="reset-password-step1">
        <gz-header title="重置密码"></gz-header>
        <div class="content">
            <div class="reset-password-form">
                <gz-input
                    type="tel"
                    placeholder="请输入注册手机号"
                    v-model="phone"
                    :errMsg="phoneErrMsg"
                    @resetErr="phoneErrMsg = ''"
                    @blur="checkPhone"
                    :isFocused="isFocused"
                >
                    <div slot="label">+86</div>
                </gz-input>
                <gz-input
                    type="tel"
                    placeholder="短信验证码"
                    v-model="code"
                    :errMsg="codeErrMsg"
                    @resetErr="codeErrMsg = ''"
                    @blur="checkPhone"
                    :isFocused="isFocused"
                >
                    <button
                        class="addons"
                        :class={disabled:sendCodeBtnIsInvalid}
                        :disabled="sendCodeBtnIsInvalid"
                        @click="sendVerifyCode"
                    >{{ countdown > 0 ? `重新获取(${countdown}s)` : '获取验证码' }}</button>
                </gz-input>
            </div>
            <button
                class="gz-btn"
                :disabled="btnDisabled"
                :class={disabled:btnDisabled}
                @click="resetPasswordStep1"
            >下一步</button>
        </div>
    </div>
</template>

<script>
import Input from '../../../components/common/input.vue';

export default {
    data() {
        return {
            phone: '',
            code: '',
            countdown: 0,
            maxCountDown: 60,
            timeoutHandler: [],
            phoneErrMsg: '',
            codeErrMsg: '',
            isFocused: false,
        };
    },
    components: {
        [Input.name]: Input,
    },
    computed: {
        phoneValid() {
            const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/;
            return this.phone.length === 11 && reg.test(this.phone);
        },
        sendCodeBtnIsInvalid() {
            return !(this.phoneValid && this.countdown === 0);
        },
        btnDisabled() {
            return (
                !this.phoneValid ||
                !this.code ||
                !!this.phoneErrMsg ||
                !!this.codeErrMsg
            );
        },
    },
    methods: {
        checkPhone() {
            if (!this.phoneValid) {
                this.$set(this, 'phoneErrMsg', '请输入正确的手机号');
            }
        },
        sendVerifyCode() {
            this.$set(this, 'countdown', this.maxCountDown);
            if (global.localStorage) {
                global.localStorage.setItem('findPassword-sendVerifyCode', new Date().getTime());
            }
            this.$store.dispatch('sendVerifyCode', {
                phone: this.phone,
                operationType: 'FIND_PASSWORD',
            }).then(() => {
                this.startCountdown(this.maxCountDown);
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
        resetPasswordStep1() {
            const resetPasswordInfo = {
                phone: this.phone,
                code: this.code,
            };
            this.$store.dispatch('resetPasswordStep1', resetPasswordInfo).then(() => {
                this.$router.push('/account/entry/reset-password-step2');
            }).catch((err) => {
                if (err && err.code) {
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
    },
    mounted() {
        this.isFocused = true;
        if (global.localStorage) {
            const lastTime = global.localStorage.getItem('findPassword-sendVerifyCode');
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
    #reset-password-step1 {
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
                    label {
                        line-height: 32px;
                        border-right: 3px solid #999999;
                        padding: 0;
                        margin-right: 30px;
                        width: 85px;
                        font-size: 32dpx;
                        font-weight: normal;
                        color: #999999;
                    }
                    input {
                        font-size: 32dpx;
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
                            border-radius: 6px;
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
                    }
                }
            }
            .gz-btn {
                width: 690px;
                height: 90px;
                line-height: 90px;
                margin: 120px 0;
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
        }
    }
</style>
