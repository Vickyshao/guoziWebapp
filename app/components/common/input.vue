<template>
    <div
        class="gz-input"
        :class="{'danger': !valid, 'disabled': disabled}"
    >
        <label v-if="hasLabel">
            <slot name="label">
                <span v-if="required" class="star">*</span>
                {{ label }}
            </slot>
        </label>
        <input
            v-if="!errMsg"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            v-bind="{'disabled': disabled}"
            @change="nativeEventHandler('change')"
            @focus="nativeEventHandler('focus')"
            @blur="nativeEventHandler('blur')"
            @input="inputHandler($event)"
            v-focus:isFocused="isFocused"
        >
        <div
            v-else
            class="errHint"
            @click="resetErr"
        >
            <span>{{ errMsg }}</span>
        </div>
        <!--<div class="addons" v-if="hasAddons">-->
        <div class="addons" v-if="hasDefaultSlot">
            <slot></slot>
        </div>
    </div>

</template>

<script>
export default {
    name: 'gz-input',
    props: {
        type: {
            type: String,
            default: 'text',
            required: true,
            validator(value) {
                return ['text', 'number', 'email', 'password', 'tel'].indexOf(value) >= 0;
            },
        },
        label: String,
        placeholder: String,
        value: null,
        required: {
            type: [Boolean, String],
            default: false,
        },
        disabled: null,
        hasErr: {
            type: Boolean,
            default: false,
        },
        errMsg: {
            type: String,
            default: '',
        },
        isFocused: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            modelValue: null,
            modelHasErr: null,
            valid: true,
            hasDefaultSlot: !!this.$slots.default,
        };
    },
    watch: {
        modelValue(val) {
            this.$emit('input', val);
        },
        value(val) {
            this.$set(this, 'modelValue', val);
        },
    },
    computed: {
//        hasAddons() {
//            return !!this.$slots.default;
//        },
        hasLabel() {
            return !!this.label || !!this.$slots.label;
        },
    },
    methods: {
        nativeEventHandler(eventType) {
            this.$emit(eventType, this.modelValue);
            if (eventType === 'blur') {
                this.validate(this.modelValue);
            }
        },
        inputHandler(e) {
            this.$set(this, 'modelValue', e.target.value);
        },
        validate(value) {
            if (this.required && !this.modelValue) {
                return this.$set(this, 'valid', false);
            }
            let regexp = null;
            switch (this.type) {
                case 'email':
                    regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    break;
                case 'number':
                    regexp = /^\d$/;
                    break;
                case 'tel':
                    regexp = /^1\d{10}$/;
                    break;
                default:
                    regexp = /.*/;
            }
            return this.$set(this, 'valid', regexp.test(value));
        },
        resetErr() {
            this.$emit('resetErr', this.errMsg);
        },
    },
    directives: {
        focus: {
            inserted(el, binding) {
                if (binding.value) el.focus();
            },
        },
    },
    beforeUpdate() {
        this.hasDefaultSlot = !!this.$slots.default;
    },
    mounted() {
        if (this.value) {
            this.$set(this, 'modelValue', this.value);
        }
    },
};
</script>

<style lang="less">
.gz-input {
    min-height: 128px;
    line-height: 128px;
    padding: 0 20px;
    border-top: 2rpx solid #ccc;
    display: flex;
    align-items: center;

    &:last-child {
        border-bottom: 2rpx solid #ccc;
    }

    label {
        display: flex;
        padding: 20px;
        width: 230px;
        .star {
            position: absolute;
            margin-left: -20px;
            color: red;
        }
    }

    input, .errHint {
        flex: 1;
        display: flex;
        align-items: center;
        height: 42px;
        line-height: 42px;
        min-width: 0;
        outline: none;
        border: 0;
        font-size: 28dpx;

        &::placeholder {
            color: #ccc;
            font-weight: normal;
        }
    }
    .errHint {
        height: 126px;
        color: #ff0000;
    }
    .addons {
        width: 240px;
    }
    &.disabled {
        color: #999;
        background-color: #f1f1f1;
        input {
            background-color: #f1f1f1;
            color: #999;
            cursor: not-allowed;
        }
    }
}
</style>
