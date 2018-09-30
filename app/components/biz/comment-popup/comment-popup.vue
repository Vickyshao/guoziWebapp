<template>
    <div class="gz-comment-popup" v-show="show">
        <gz-mask :show="show"></gz-mask>
        <div class="comment-area">
            <div class="comment-header">
                <div class="button-area" @click="close">
                    <img :src="icons.close" alt="">
                </div>
                <div class="button-area" @click="submit">
                    <span>提交</span>
                </div>
            </div>
            <div class="comment-title">{{ title }}</div>
            <div class="comment-content">
                <textarea cols="30" rows="20" v-model="comment" v-focus placeholder='10-200字之间...'></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gz-comment-popup',
        data() {
            return {
                show: false,
                error: '',
                comment: '',
                icons: {
                    close: require('../../../../public/img/close.svg'),
                },
            };
        },
        props: {
            title: {
                type: String,
                default: '评论：',
            },
        },
        methods: {
            open() {
                this.$set(this, 'show', true);
            },
            close() {
                this.$set(this, 'show', false);
                this.$set(this, 'error', '');
                this.$set(this, 'comment', '');
            },
            validate() {
                const length = this.comment.trim().length;
                if (length >= 10 && length <= 200) return true;
                let error = '';
                if (!length) error = '请输入评论内容';
                else if (length < 10) error = '请输入最少10字';
                else if (length > 200) error = `已超出${length - 200}字`;
                this.$set(this, 'error', error);
                return false;
            },
            submit() {
                if (this.validate()) {
                    this.$emit('submit', this.comment);
                    this.close();
                } else {
                    this.$notify({ message: this.error, duration: 600 });
                }
            },
        },
        directives: {
            focus: {
                update(el) {
                    el.focus();
                },
            },
        },
    };
</script>

<style lang="less">
    .gz-comment-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 199;
        .comment-area {
            position: absolute;
            top: 250px;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            padding: 0 24px;
            z-index: 1900;
            .comment-header {
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 34dpx;
                color: #333333;
                .button-area {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    img {
                        width: 32px;
                        height: 32px;
                    }
                }
            }
            .comment-title {
                font-size: 32dpx;
                font-weight: 300;
                padding: 50px 0;
                color: #999999;
                border-bottom: solid 1px #dddddd;
            }
            .comment-content {
                textarea {
                    width: 100%;
                    height: 100%;
                    font-size: 30dpx;
                    margin-top: 50px;
                    font-weight: 300;
                }
            }
        }
    }
</style>
