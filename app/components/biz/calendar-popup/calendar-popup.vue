<template>
    <div class="gz-calendar-popup" v-show="show">
        <div class="popup-close" @click="toggle"></div>
        <div class="popup-title">
            <div v-if="options.dateType === 0">
                <p>请选择{{ options.startDateLabel }}日期</p>
                <p v-if="setting.leastAdvanceReserveDays > 0">
                    提前{{ setting.leastAdvanceReserveDays }}天可预订
                </p>
            </div>
            <div v-else-if="options.dateType === 1">
                <p>请选择{{ options.endDateLabel }}日期</p>
                <p v-if="setting.mostReserveDays > 0">
                    最多可预订{{ setting.mostReserveDays }}天
                </p>
            </div>
        </div>
        <div class="calender">
            <gz-calendar
                v-if="show"
                :chooseDateType="options.dateType"
                :availableStartDate="options.availableStartDate"
                :availableDaysCount="options.availableDaysCount"
                :initStartDate="options.initStartDate"
                :initEndDate="options.initEndDate"
                :startDateLabel="options.startDateLabel"
                :endDateLabel="options.endDateLabel"
                @selectDate="selectHandler"
            ></gz-calendar>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gz-calendar-popup',
        data() {
            return {
                show: false,
            };
        },
        props: {
            options: {
                type: Object,
                default: {},
            },
            setting: {
                type: Object,
                default: {},
            },
        },
        methods: {
            toggle() {
                this.$set(this, 'show', !this.show);
            },
            selectHandler(date) {
                this.$emit('select', date);
            },
        },
    };
</script>

<style lang="less">
    .gz-calendar-popup {
        z-index: 1000;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        padding: 20px 0;
        animation: fadeInUp 1s ease;
        overflow: auto;
        .popup-close {
            margin-left: 30px;
            position: relative;
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url('../../../../public/img/close.svg') no-repeat;
            background-size: cover;
            margin-bottom: 92px;
            overflow: hidden;
        }
        .popup-title {
            padding-left: 24px;
            p:nth-child(1) {
                font-size: 50dpx;
                font-weight: 600;
                color: #4a4a4a;
            }
            p:nth-child(2) {
                font-size: 28dpx;
                color: #4a4a4a;
                margin: 22px 0 58px;
            }
        }
        .calender {
            padding: 20px;
        }
    }
    @keyframes fadeInUp {
        from {
            opacity: 1;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
</style>
