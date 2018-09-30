//静态页面，做完再拆
<template>
    <div class="project-campsite" id="project-campsite">
        <gz-header
          :iconWidth="15"
          :iconHeight="28.7"
          :customHandler="true"
          @backHandler="backHandler"
        ></gz-header>
        <div class="pro-camp-title">
            <h1>{{orderTitle}}</h1>
        </div>
        <gz-order-campsite
            ref="orderCampsite"
            @showDatePicker="showCalendar"
            @NumPicker="showNumPicker">
        </gz-order-campsite>
        <div class="book-camp">
            <button @click="postOrder()">预订</button>
        </div>
        <gz-calendar-popup
            ref="calendarPopup"
            :options="calendarOptions"
            :setting="campsiteSetting"
            @select="updateDate"
        ></gz-calendar-popup>
        <div class="num-picker" v-if="NumPicker">
          <p>
            <span @click="showNumPicker">
                <img :src="icons.close">
            </span>
            <span @click="confirmNum">确认</span>
          </p>
          <gz-picker
            ref="picker1"
            :slots="numPickerSlot"
            @change="changeNum"
            :itemHeight="120"
            ></gz-picker>
        </div>
        <gz-alert :show="showAlert"
          leftButtonText="确定"
          rightButtonText="取消"
          @leftButtonClick="leftButtonClickHandler"
          @rightButtonClick="rightButtonClickHandler">
          <div class="alert-title">是否放弃本次预订？</div>
        </gz-alert>
        <gz-mask :show="mask">
        </gz-mask>
        <gz-mask :show="loading">
            <gz-loading :show="loading" type="double-bounce"></gz-loading>
        </gz-mask>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import moment from 'moment';
import CalendarPopup from '../../components/biz/calendar-popup';
import OrderCampsiteInput from '../../components/biz/orders/order-campsite-input.vue';

export default {
    data() {
        return {
            orderTitle: '营位预订',
            mask: false,
            showDatePicker: false,
            dateType: 'begin',
            NumPicker: false,
            confirmSelectNum: '1',
            showAlert: false,
            type: '',
            projectId: '',
            calendarOptions: {},
            icons: {
                close: require('../../components/biz/icon/close.svg'),
            },
            numPickerSlot: [],
            loading: false,
        };
    },
    components: {
        [OrderCampsiteInput.name]: OrderCampsiteInput,
        [CalendarPopup.name]: CalendarPopup,
    },
    computed: {
        ...mapGetters(['projectInfo', 'campsiteSetting',
            'quantity', 'contactInfos', 'beginDate',
            'endDate', 'contactName', 'contactPhone',
            'specialDemand',
        ]),
        totalDays() {
            return moment(this.endDate).add(1, 'days').diff(moment(this.beginDate), 'days');
        },
    },
    methods: {
        ...mapActions([
            'setOrderQuantity',
            'setOrderCampsiteDate', 'getOrderCantact',
            'resetOrder', 'postOrderCampsite',
        ]),
        showCalendar(type) {
            this.$set(this, 'dateType', type);
            const setting = this.campsiteSetting;
            const availableStartDate = type === 'begin'
                ? moment().add(setting.leastAdvanceReserveDays, 'days').format('YYYY-MM-DD')
                : moment(this.beginDate).add(1, 'days').format('YYYY-MM-DD');
            const availableDaysCount = type === 'begin'
                ? parseInt(setting.mostAdvanceReserveDays, 10)
                - parseInt(setting.leastAdvanceReserveDays, 10)
                : parseInt(setting.mostReserveDays, 10) - 1;
            this.$set(this, 'calendarOptions', {
                dateType: type === 'begin' ? 0 : 1,
                availableStartDate,
                availableDaysCount,
                initStartDate: this.beginDate,
                initEndDate: this.endDate,
                startDateLabel: '入场',
                endDateLabel: '离场',
            });
            this.$refs.calendarPopup.toggle();
        },
        updateDate(date) {
            if (this.dateType === 'begin') {
                this.setOrderCampsiteDate({
                    beginDate: date,
                    endDate: this.endDate,
                });
                if (this.endDate <= this.beginDate) {
                    this.setOrderCampsiteDate({
                        beginDate: this.beginDate,
                        endDate: moment(this.beginDate).add(1, 'days').format('YYYY-MM-DD'),
                    });
                } else if (this.totalDays > this.campsiteSetting.mostReserveDays) {
                    this.setOrderCampsiteDate({
                        beginDate: this.beginDate,
                        endDate: moment(this.beginDate).add(this.campsiteSetting.mostReserveDays - 1, 'days').format('YYYY-MM-DD'),
                    });
                }
            } else {
                this.setOrderCampsiteDate({
                    beginDate: this.beginDate,
                    endDate: date,
                });
            }
            this.$refs.calendarPopup.toggle();
        },
        backHandler() {
            this.$set(this, 'showAlert', true);
        },
        leftButtonClickHandler() {
            this.$set(this, 'showAlert', false);
            this.resetOrder();
            this.$router.back();
        },
        rightButtonClickHandler() {
            this.$set(this, 'showAlert', false);
        },
        showNumPicker() {
            this.$set(this, 'NumPicker', !this.NumPicker);
            this.$set(this, 'mask', !this.mask);
            if (this.NumPicker === true) {
                const arr = [];
                for (let i = 1; i < 100; i += 1) {
                    arr.push(i.toString());
                }
                const slot = [{
                    values: arr,
                    textAlign: 'center',
                }];
                this.$set(this, 'numPickerSlot', slot);
                this.$nextTick(() => {
                    const numpicker1 = this.$refs.picker1;
                    numpicker1.setSlotValue(0, this.quantity === 1 ? arr[0] : this.quantity);
                });
            }
        },
        changeNum(picker, values) {
            this.$set(this, 'confirmSelectNum', values[1]);
        },
        confirmNum() {
            this.$set(this, 'NumPicker', false);
            this.$set(this, 'mask', false);
            this.setOrderQuantity(this.confirmSelectNum);
        },
        pickerHandler(_type) {
            this.$set(this, 'dateType', _type);
            this.$set(this, 'showDatePicker', true);
        },
        isShowData(value) {
            this.showDatePicker = value;
        },
        setInitDates() {
            const dates = {
                beginDate: moment().add(this.campsiteSetting.leastAdvanceReserveDays, 'days').format('YYYY-MM-DD'),
                endDate: moment().add(this.campsiteSetting.leastAdvanceReserveDays, 'days').add(1, 'days').format('YYYY-MM-DD'),
            };
            this.setOrderCampsiteDate(dates);
        },
        postOrder() {
            const contactInfosFilter = [];
            this.contactInfos.forEach((item) => {
                contactInfosFilter.push({
                    name: this.$noEmoji(item.name),
                    phone: item.phone,
                });
            });
            const params = {
                projectId: this.projectInfo(this.projectId).id,
                projectName: this.projectInfo(this.projectId).name,
                campsiteId: this.projectInfo(this.projectId).campsiteInfo[this.type].id,
                campsiteName: this.projectInfo(this.projectId).campsiteInfo[this.type].name,
                price: this.projectInfo(this.projectId).campsiteInfo[this.type].price,
                quantity: this.quantity,
                orderAmount: this.quantity
                           * this.projectInfo(this.projectId).campsiteInfo[this.type].price,
                contactInfos: contactInfosFilter,
                beginDate: this.beginDate,
                endDate: this.endDate,
                contactName: this.$noEmoji(this.contactName),
                contactPhone: this.contactPhone,
                specialDemand: this.$noEmoji(this.specialDemand),
            };
            if (this.filterClause() && !this.filter(params) && this.filterDate(params)) {
                this.$refs.orderCampsite.err = false;
                // todo: 后端应该加事务锁，但一期时间上来不及，这里先暂时用 setTimeout 处理下
                this.$set(this, 'loading', true);
                setTimeout(() => {
                    this.postOrderCampsite(params)
                        .then((data) => {
                            this.$set(this, 'loading', false);
                            this.afterPost(data);
                        }).catch((error) => {
                            this.$set(this, 'loading', false);
                            this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
                        });
                }, 1000);
            } else {
                this.$refs.orderCampsite.err = true;
            }
        },
        filter(params) {
            let flag = 0;
            params.contactInfos.forEach((item) => {
                if (!this.filterName(item.name)) {
                    this.$notify({
                        message: '请输入正确的驾驶员名字',
                    });
                    flag += 1;
                }
                if (!this.filterPhone(item.phone)) {
                    this.$notify({
                        message: '请输入正确的驾驶员手机号',
                    });
                    flag += 1;
                }
            });
            if (!this.filterName(params.contactName)) {
                this.$notify({
                    message: '请输入正确的联系人名字',
                });
                flag += 1;
            }
            if (!this.filterPhone(params.contactPhone)) {
                this.$notify({
                    message: '请输入正确的联系人手机号',
                });
                flag += 1;
            }
            return flag;
        },
        afterPost(data) {
            this.$router.push({
                path: '/order-result',
                query: {
                    orderCode: data.code,
                    orderId: data.id,
                    orderType: 2,
                },
            });
        },
        filterDate(params) {
            if (moment(params.beginDate).isAfter(params.endDate)) {
                this.$notify({
                    message: '请选择正确的入场或离场日期',
                });
                return false;
            }
            return true;
        },
        filterClause() {
            if (!this.$refs.orderCampsite.clauseCheck === true) {
                this.$notify({
                    message: '未勾选预订条款，不能继续下一步',
                });
                return false;
            }
            return true;
        },
        filterName(name) {
            const textName = new RegExp('^[A-Za-z\\u4e00-\\u9fa5]{1,9}$');
            if (!textName.test(name)) {
                return false;
            }
            return true;
        },
        filterPhone(phone) {
            const textPhone = new RegExp('^[1][3-9][0-9]{9}$');
            if (!textPhone.test(phone)) {
                return false;
            }
            return true;
        },
    },
    mounted() {
        this.setInitDates();
        this.$set(this, 'type', parseInt(this.$route.query.type, 10));
        this.$set(this, 'projectId', this.$route.query.projectId);
    },
};
</script>

<style lang="less">
#project-campsite {
    padding-bottom:145px;
    padding-top: 40px;
    .gz-header{
        border-bottom: none;
    }
    .pro-camp-horizontal{
        border-bottom: 1rpx solid #dddddd;
        margin: 0 24px;
    }
    .pro-camp-title{
        padding-top: 64px;
        padding-left: 24px;
        width: 100%;
        h1{
            font-size: 50dpx;
        }
    }
    .book-camp{
        border-top:1rpx solid #dddddd;
        background: #ffffff;
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 24px 30px;
        button{
            width: 100%;
            height: 92px;
            border-radius: 10rpx;
            background: #FF4847;
            border:none;
            line-height: 92dpx;
            font-size:32dpx;
            color: #ffffff;
        }
    }
    .num-picker{
        background: #ffffff;
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 9999;
        p{
            width: 100%;
            display: flex;
            justify-content: space-between;
            span{
                padding: 20px;
                font-size: 32dpx;
                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }
}
</style>
