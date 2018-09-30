<template>
    <div class="gz-checkbox" @click="clickEventHandler" :class="[type]">
        <div class="checkbox-mask" :class="{ 'checked': modelValue }">
            <div class="checkbox-tick"></div>
        </div>
        <label>{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'gz-checkbox',
    data() {
        return {
            modelValue: false,
        };
    },
    props: {
        type: {
            type: String,
            default: 'checkbox',
        },
        label: String,
        name: String,
        value: false,
    },
    watch: {
        value(status) {
            this.$set(this, 'modelValue', status);
        },
    },
    methods: {
        clickEventHandler(e) {
            this.$set(this, 'modelValue', !this.modelValue);
            this.$emit('input', this.modelValue);
        },
    },
    mounted() {
        if (this.value) {
            this.$set(this, 'modelValue', !!this.value);
        }
    },
};
</script>

<style lang="less">
.gz-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px 10px;

    &.checkbox {
        .checkbox-mask {
            position: relative;
            width: 40px;
            height: 40px;
            background-color: #fff;
            transition: background-color 200ms;
            border: 0.03rem solid #cacaca;
            border-radius: 20px;
            overflow: hidden;
            flex: none;

            &:after {
                content: '';
                position: absolute;
                transform: rotate(-45deg);
                width: 15px;
                height: 8px;
                top: 8px;
                left: 8px;
                border-color: #fff;
                border-style: solid;
                border-width: 0 0 2px 2px;
                opacity: 0;
                transition: opacity 200ms;
            }

            &.checked {
                background-color: #6ac82a;
                border: 0;

                &:after {
                    opacity: 1;
                }
            }
        }

        &.circle .checkbox-mask {
            border-radius: 50%;
        }

        label {
            flex: 1;
            margin-left: 12px;
        }
    }

    &.toggle {
        .checkbox-mask {
            position: relative;
            margin-right: 40px;
            order: 2;
            flex: none;
            width: 80px;
            height: 40px;
            background-color: #eee;
            border: 1rpx solid #eee;
            border-radius: 20px;
            transition: 200ms;

            &:after {
                content: '';
                display: block;
                position: absolute;
                left: 8px;
                top: 8px;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background-color: #aaa;
                transition: 200ms;
            }

            &.checked {
                background-color: #fff;

                &:after {
                    left: 40px;
                    background: rgba(83, 176, 56, 0.87);
                }
            }
        }

        label {
            order: 1;
            flex: 3;
        }
    }
}
</style>
