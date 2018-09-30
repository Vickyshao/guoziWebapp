<template>
    <div id="tourist">
        <gz-header>
            <div slot="right-icon" @click="addOrEditTourist">保存</div>
        </gz-header>
        <div class="content">
            <div class="title">常用游客信息设置</div>
            <div class="notice">＊以下信息必须真实有效</div>
            <div class="tourist-form">
                <div class="item">
                    <label>姓名</label>
                    <input
                        type="text"
                        v-model="tourist.name"
                    >
                    <img :src="icons.angleRight">
                </div>
                <div class="item">
                    <label>性别</label>
                    <input
                        type="text"
                        placeholder="请选择"
                        :value="tourist.sex"
                        @click="setPickerSlotsType('sex')"
                        onfocus="this.blur()"
                    >
                    <img :src="icons.angleRight">
                </div>
                <div class="item">
                    <label>出生年月</label>
                    <input
                        type="text"
                        placeholder="请选择"
                        :value="tourist.birthday"
                        @click="dateTimePickerToggle = true"
                        onfocus="this.blur()"
                    >
                    <img :src="icons.angleRight">
                </div>
                <div class="item">
                    <label>手机号码</label>
                    <input
                        type="text"
                        v-model="tourist.phone"
                    >
                    <img :src="icons.angleRight">
                </div>
                <div class="item">
                    <label>身份证号</label>
                    <input
                        type="text"
                        v-model="tourist.idCard"
                    >
                    <img :src="icons.angleRight">
                </div>
                <div class="item">
                    <label>驾照类型</label>
                    <input
                        type="text"
                        placeholder="请选择"
                        :value="tourist.driverType"
                        @click="setPickerSlotsType('driverType')"
                        onfocus="this.blur()"
                    >
                    <img :src="icons.angleRight">
                </div>
                <div class="item">
                    <label>驾龄</label>
                    <input
                        type="text"
                        placeholder="请选择"
                        :value="tourist.driverAge"
                        @click="setPickerSlotsType('driverAge')"
                        onfocus="this.blur()"
                    >
                    <img :src="icons.angleRight">
                </div>
            </div>
            <div class="picker-pane" v-if="pickerToggle || dateTimePickerToggle">
                <div class="picker-mask" @click="dismissPickerPanel"></div>
                <div class="picker-panel">
                    <gz-picker
                        v-if="pickerToggle"
                        ref="singlePicker"
                        :visible-item-count="5"
                        :slots="pickerSlots[pickerSlotsType]"
                        @change="changeTouristPicked"
                        :showToolbar="true"
                        :itemHeight="120"
                    >
                        <div class="picker-btn">
                            <span @click="dismissPickerPanel"><img :src="icons.close"></span>
                            <span @click="confirmTourist">确定</span>
                        </div>
                    </gz-picker>
                    <gz-datetime-picker
                        :visible-item-count="5"
                        v-if="dateTimePickerToggle"
                        type="date"
                        :value='tourist.birthday'
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        @confirm="confirmBirthday"
                        @cancel="dismissPickerPanel"
                        :startDate='startDate'
                        :endDate="endDate"
                        :itemHeight="120"
                        ref="pickers"
                    >
                    <div class="gz-datetime-btn">
                        <img class="picker-close" :src="icons.close" @click="dismissPickerPanel">
                        <span class="picker-confirm" @click="confirmBirthday">确定</span>
                    </div>
                  </gz-datetime-picker>
                </div>
            </div>
        </div>
        <gz-mask :show="loading">
            <gz-loading :show="loading" type="double-bounce"></gz-loading>
        </gz-mask>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import moment from 'moment';

export default {
    data() {
        const tourist = {
            id: null,
            name: '',
            birthday: moment().format('YYYY-MM-DD'),
            phone: '',
            idCard: '',
            sex: '',
            sexId: null,
            driverType: '',
            driverTypeId: '',
            driverAge: '',
            driverAgeId: '',
        };
        const touristPicked = {
            sex: '',
            driverType: '',
            driverAge: '',
        };
        const icons = {
            angleRight: require('../../../../public/img/go.svg'),
            close: require('../../../../public/img/group-89.svg'),
        };
        return {
            tourist,
            touristPicked,
            pickerSlotsType: '',
            type: this.$route.params.id ? 'edit' : 'add',
            pickerToggle: false,
            dateTimePickerToggle: false,
            reg: /^[A-Za-z0-9]+$/,
            icons,
            select: false,
            endDate: new Date(),
            loading: false,
        };
    },
    computed: {
        pickerSlots() {
            return {
                sex: [{
                    flex: 1,
                    values: this.$store.getters.sex.map(item => item.name),
                    textAlign: 'center',
                }],
                driverType: [{
                    flex: 1,
                    values: this.$store.getters.driverType.map(item => item.name),
                    textAlign: 'center',
                }],
                driverAge: [{
                    flex: 1,
                    values: this.$store.getters.driverAge.map(item => item.name),
                    textAlign: 'center',
                }],
            };
        },
        startDate() {
            return moment('1900-01-01').toDate();
        },
    },
    components: {
    },
    methods: {
        dismissPickerPanel() {
            this.pickerToggle = false;
            this.dateTimePickerToggle = false;
        },
        setPickerSlotsType(type) {
            this.pickerSlotsType = type;
            this.pickerToggle = true;
            this.$nextTick(() => {
                const singp = this.$refs.singlePicker;
                singp.setSlotValue(0, this.tourist[this.pickerSlotsType]
                || this.touristPicked[this.pickerSlotsType]
                || this.pickerSlots[this.pickerSlotsType][0].values[0]);
                if (!(this.tourist[this.pickerSlotsType] &&
                    this.touristPicked[this.pickerSlotsType])) {
                    this.touristPicked[this.pickerSlotsType] =
                    this.pickerSlots[this.pickerSlotsType][0].values[0];
                }
            });
        },
        changeTouristPicked(picker, values) {
            // TODO: 本地环境需要换成 values[1]，原因暂不明
            this.touristPicked[this.pickerSlotsType] = values[1];
        },
        confirmTourist() {
            if (this.touristPicked[this.pickerSlotsType]) {
                this.tourist[this.pickerSlotsType] = this.touristPicked[this.pickerSlotsType];
                this.tourist[`${this.pickerSlotsType}Id`] = this.$store.getters[this.pickerSlotsType].find(
                    item => item.name === this.tourist[this.pickerSlotsType],
                ).id;
            }
            this.pickerToggle = false;
        },
        confirmBirthday() {
            const currentValue = this.$refs.pickers.currentValue;
            this.tourist.birthday = moment(currentValue).format('YYYY-MM-DD');
            this.dateTimePickerToggle = false;
        },
        addOrEditTourist() {
            if (this.validator()) {
                const tourist = cloneDeep(this.tourist);
                // TODO: 存数据库时把 sexId 换回 sex
                tourist.sex = tourist.sexId;
                delete tourist.sexId;
                delete tourist.driverType;
                delete tourist.driverAge;
                this.$set(this, 'loading', true);
                if (this.type === 'add') {
                    delete tourist.id;
                    // todo: 后端应该加事务锁，但一期时间上来不及，这里先暂时用 setTimeout 处理下
                    setTimeout(() => {
                        this.$store.dispatch('addTourist', tourist).then(() => {
                            this.$set(this, 'loading', false);
                            this.toTourists();
                            this.$notify({ message: '常用游客保存成功！' });
                        }).catch((err) => {
                            this.$set(this, 'loading', false);
                            this.$notify({ message: err.errMsg || '' });
                        });
                    }, 1000);
                } else {
                    // todo: 后端应该加事务锁，但一期时间上来不及，这里先暂时用 setTimeout 处理下
                    setTimeout(() => {
                        this.$store.dispatch('updateTourist', { id: tourist.id, data: tourist }).then(() => {
                            this.$set(this, 'loading', false);
                            this.toTourists();
                            this.$notify({ message: '常用游客修改成功！' });
                        }).catch((err) => {
                            this.$set(this, 'loading', false);
                            this.$notify({ message: err.errMsg || '' });
                        });
                    }, 1000);
                }
            }
        },
        toTourists() {
            if (this.select === true) {
                this.$router.push({
                    path: '/account/tourists',
                    query: {
                        select: true,
                        type: this.$route.query.type,
                        carId: this.$route.query.carId,
                    },
                });
            } else {
                this.$router.push({
                    path: '/account/tourists',
                });
            }
        },
        validator() {
            if (!this.tourist.name) {
                this.$notify({ message: '请输入姓名' });
                return false;
            } else if (!/^[A-Za-z\u4e00-\u9fa5]{0,9}$/.test(this.tourist.name)) {
                this.$notify({ message: '请输入正确的游客姓名' });
                return false;
            }
            if (!this.tourist.sexId) {
                this.$notify({ message: '请选择性别' });
                return false;
            }
            if (!this.tourist.birthday) {
                this.$notify({ message: '请选择出生年月' });
                return false;
            }
            if (!this.tourist.phone) {
                this.$notify({ message: '请输入手机号码' });
                return false;
            } else if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/.test(this.tourist.phone)) {
                this.$notify({ message: '手机号格式不正确' });
                return false;
            }
            if (!this.reg.test(this.tourist.idCard) || this.tourist.idCard.length !== 18) {
                this.$notify({ message: '请输入正确的身份证号' });
                return false;
            }
            if (!this.tourist.driverTypeId) {
                this.$notify({ message: '请选择驾照类型' });
                return false;
            }
            if (!this.tourist.driverAgeId) {
                this.$notify({ message: '请选择驾龄' });
                return false;
            }
            return true;
        },
    },
    mounted() {
        this.$store.dispatch('getDriverType');
        this.$store.dispatch('getDriverAge');
        if (this.$route.params.id) {
            this.$set(this, 'tourist', cloneDeep(this.$store.getters.tourist(this.$route.params.id)));
            // TODO: 为了抽出几个 pickerSlots 的公用逻辑，做了个小转换，把 sex 换成 sexId
            this.tourist.sexId = this.tourist.sex;
            this.tourist.sex = this.$store.getters.sex.find(
                item => item.id === this.tourist.sex,
            ).name;
            this.tourist.driverType = this.$store.getters.driverType.find(
                item => item.id === this.tourist.driverTypeId,
            ).name;
            this.tourist.driverAge = this.$store.getters.driverAge.find(
                item => item.id === this.tourist.driverAgeId,
            ).name;
        }
        if (this.$route.query.select) {
            this.$set(this, 'select', true);
        }
    },
};
</script>

<style lang="less">
#tourist {
    height: 100%;
    width: 100%;
    padding-top:135px;
    .gz-header-right {
        width: 120px;
        font-size: 28dpx;
    }
    .content {
        padding: 0 24px;
        .title {
            font-size: 50dpx;
            margin-bottom: 100px;
        }
        .notice {
            font-size: 24dpx;
            color: #666666;
            padding-bottom: 50px;
            border-bottom: 2px solid #dddddd;
        }
        .tourist-form {
            margin: 0 -7px;
            .item {
                height: 140px;
                padding: 0 15px;
                border-bottom: solid 2px #dddddd;
                font-size: 32dpx;
                display: flex;
                align-items: center;
                label {
                    flex: 1;
                }
                input {
                    width: 420px;
                    color: #9b9b9b;
                    outline: none;
                    border: 0;
                    font-size: 32dpx;
                    text-align: right;
                    -webkit-tap-highlight-color:rgba(255,255,255,0);
                }
                img {
                    width: 50px;
                    margin: 0 -15px 0 60px;
                }
            }
        }
        .btn {
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 40px;
            border-radius: 3px;
            margin: 0 auto;
            font-size: 14dpx;
            color: #ffffff;
            background-color: #ff4544;
            -webkit-tap-highlight-color:rgba(255,255,255,0);
            &[disabled] {
                background-color: #ccc;
            }
        }
    }
    .picker-pane {
        .picker-mask {
            z-index: 100;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: black;
            opacity: 0.8;
        }
        .picker-panel {
            z-index: 1000;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: auto;
            background-color: white;
            padding: 20px 0;
            left: 0;
            .picker-btn {
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                span {
                    width: 80px;
                    height: 0;
                    font-size: 32dpx;
                    color: #000000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:last-child {
                        color: #333333;
                    }
                    img {
                        width: 32px;
                        height: 32px;
                    }
                }
            }
            .gz-datetime-btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                img {
                    width: 32px;
                    height: 32px;
                }
                span {
                    width: 120px;
                    color: #000000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 32px;
                    &:last-child {
                        color: #333333;
                    }
                }
            }
        }
    }
}
</style>
