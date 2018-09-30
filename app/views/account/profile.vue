<template>
    <div class="account-profile">
        <gz-header
            title="编辑个人资料"
            :iconHeight="32"
            :iconWidth='32'
            :leftIcon="icons.close"
            @left-icon-click="closePage"
        >
            <span slot="right-icon" @click="save">保存</span>
        </gz-header>
        <div class="profile-avator">
            <img :src="avatarPreview || accountProfile.headImg || icons.default">
            <div class="avator-editor">
                <div class="uploader-wrapper" v-for="picture in pictures" v-if="!picture.deleted">
                    <gz-uploader-progress
                        :index="picture.index"
                        :dataURL="picture.dataURL"
                        :isPrimary="picture.index === primaryIndex"
                        :serverUrl="picture.serverUrl"
                        @setPrimary="setPrimary"
                        @error="imgError"
                        @done="uploadDone">
                    </gz-uploader-progress>
                </div>
                <gz-uploader
                    :multiple="false"
                    :inputType="inputType"
                    @select="fileSelected">
                </gz-uploader>
            </div>
        </div>
        <div class="profile-list">
            <div class="list-item list-name-item">
                <span class="item-title">
                        用户名
                    </span>
                <div class="item-name">
                    {{accountProfile.userName}}
                </div>
            </div>
            <div class="list-item list-name-item">
                <span class="item-title">
                    真实姓名
                </span>
                <input type="text" name="" placeholder="请输入10个字符以内的英文或汉字" class="item-name" v-model="accountRealName">
            </div>
            <div class="list-item list-check-item" @click="ShowPicker(0)">
                <span class="item-title">性别</span>
                <span class="item-content">
                    {{userInfo.sex || accountProfile.sex}}
                </span>
                <img :src="icons.arrRight" alt="">
            </div>

            <div class="list-item list-check-item">
                <span class="item-title">手机</span>
                <span class="item-content">{{accountProfile.phone}}</span>
            </div>
            <div class="list-item list-check-item">
                <span class="item-title">邮箱</span>
                <input class="item-content" v-model="accountEmail">
            </div>
            <div class="list-item list-check-item">
                <span class="item-title">身份证</span>
                <input class="item-content" v-model="accountIdCard">
            </div>
            <div class="list-item list-check-item" @click="ShowPicker(1)">
                <span class="item-title">驾照类型</span>
                <span class="item-content">
                    {{userInfo.driverType || accountProfile.driverType || '请选择'}}
                </span>
                <img :src="icons.arrRight" alt="">
            </div>
            <div class="list-item list-check-item" @click="ShowPicker(2)">
                <span class="item-title">驾龄</span>
                <span class="item-content">
                    {{userInfo.drivingAge || accountProfile.drivingAge || '请选择' }}
                </span>
                <img :src="icons.arrRight" alt="">
            </div>
            <div class="list-item list-check-item" @click="ShowPicker(3)">
                <span class="item-title">生日</span>
                <span class="item-content">
                    {{userInfo.birthday || accountProfile.birthday || '请选择'}}
                </span>
                <img :src="icons.arrRight" alt="">
            </div>
            <div class="list-item list-check-item" @click="ShowPicker(4)">
                <span class="item-title">居住地</span>
                <span class="item-content">
                    {{userInfo.provinceName}} {{userInfo.cityName || '请选择'}}
                </span>
                <img :src="icons.arrRight" alt="">
            </div>
        </div>
        <gz-mask
            :show="areaPickerShow || singlePickerShow || loading"
            @click="cancle"
        >
            <gz-loading :show="loading" type="double-bounce"></gz-loading>
        </gz-mask>
        <gz-picker
            ref="areaPicker"
            :slots="areaSlots"
            v-if="areaPickerShow"
            :showToolbar="true"
            :itemHeight="120"
            @change="areaChange">
            <img class="picker-close" :src="icons.close" @click="cancle">
            <span class="picker-confirm" @click="confirm()">确定</span>
        </gz-picker>
        <gz-datetime-picker
            ref="pickers"
            type="date"
            v-model="defaultDate"
            :startDate="startDate"
            :endDate="endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            :showToolbar="true"
            :itemHeight="120"
            :visible-item-count="5"
            @cancel="cancle"
            v-if="datePickerShow"
            @confirm="dateConfirm"
            >
            <div class="gz-datetime-btn">
                <img class="picker-close" :src="icons.close" @click="cancle">
                <span class="picker-confirm" @click="dateConfirm">确定</span>
            </div>
            <div class="date-text">
                选择日期
            </div>
        </gz-datetime-picker>
        <gz-picker ref="singlePicker"
            :slots="singleSlots"
            v-if="singlePickerShow"
            :showToolbar="true"
            valueKey="single"
            :itemHeight="120">
            <img class="picker-close" :src="icons.close" @click="cancle">
            <span class="picker-confirm" @click="confirm()">确定</span>
        </gz-picker>
        <div class="save-mask" v-show="saveMask">
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import {
    mapActions,
    mapGetters,
} from 'vuex';

import ListGroup from '../../components/common/list-group';
import Update from '../../components/common/upload/img.vue';

export default {
    data() {
        return {
            queryCondition: {},
            avatarPreview: '',
            areaSlots: [{
                flex: 1,
                values: [],
                textAlign: 'center',
            }, {
                flex: 1,
                values: [],
                textAlign: 'center',
            }],
            singleSlots: [{
                values: [],
                textAlign: 'center',
            }],
            datePickerShow: false,
            singlePickerShow: false,
            areaPickerShow: false,
            typeTag: 0,
            accountProfileInfo: {},
            userInfo: {
                driverTypeId: '',
                drivingAgeId: '',
                provinceList: [],
                provinceName: '',
                cityName: '',
                provinceCode: '',
                cityCode: '',
                birthday: '',
            },
            defaultDate: '1980-01-01',
            startDate: '',
            endDate: '',
            icons: {
                arrRight: require('../../../public/img/arr-right.svg'),
                close: require('../../../public/img/group-89.svg'),
                default: require('../../../public/img/avator-default.svg'),
            },
            saveMask: false,
            pictures: [],
            inputType: 1,
            primaryIndex: 0,
            loadFlag: false,
            loading: false,
        };
    },
    components: {
        [ListGroup.name]: ListGroup,
        [Update.name]: Update,
    },
    methods: {
        ...mapActions([
            'getAccountProfile',
            'editAccountProfile',
            'editAccountProfileAvator',
            'signIn',
            'getAreaList',
            'getDriverType',
            'getDriverAge',
            'setUploadImg',
        ]),
        closePage() {
            this.$router.go(-1);
        },
        setPrimary(index) {
            this.$set(this, 'primaryIndex', index);
        },
        fileSelected(file) {
            this.setUploadImg().then((res) => {
                this.pictures.push({
                    index: 0,
                    dataURL: file,
                    serverUrl: res,
                });
            });
            this.$set(this, 'avatarPreview', file);
        },
        sendEditor() {
            // todo: 后端应该加事务锁，但一期时间上来不及，这里先暂时用 setTimeout 处理下
            this.$set(this, 'loading', true);
            if (this.$store.getters.sessionId) {
                setTimeout(() => {
                    this.editAccountProfile(Object.assign({}, this.queryCondition)).then(() => {
                        this.$set(this, 'loading', false);
                        this.$notify({
                            duration: 1800,
                            message: '修改成功',
                            customClass: 'editor-tip',
                        });
                        this.$router.go(-1);
                    }).catch((err) => {
                        this.$set(this, 'loading', false);
                        this.$notify({
                            duration: 1800,
                            message: err.msg || err,
                            customClass: 'editor-tip',
                        });
                    });
                });
            }
        },
        saveMaskState() {
            this.$set(this, 'saveMask', true);
            setTimeout(() => {
                this.$set(this, 'saveMask', false);
            }, 1000);
        },
        save() {
            const regRealName = /^[A-Za-z\u4e00-\u9fa5]{0,9}$/;
            const regEmail = /^(([\w_-])+@([\w_-])+((\.[\w_-]{2,3}){1,2})){0,30}$/;
            const regIdCard = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i;
            if (this.accountRealName && !regRealName.test(this.accountRealName)) {
                this.$notify({
                    duration: 1800,
                    message: '请输入正确的真实姓名',
                });
                return;
            }
            if (this.accountEmail && !regEmail.test(this.accountEmail)) {
                this.$notify({
                    duration: 1800,
                    message: '请输入正确的邮箱',
                });
                return;
            }
            if (this.accountIdCard && !regIdCard.test(this.accountIdCard)) {
                this.$notify({
                    duration: 1800,
                    message: '请输入正确的身份证',
                });
                return;
            }
            this.saveMaskState();
            this.queryCondition = {
                realName: this.accountRealName,
                email: this.accountEmail,
                idCard: this.accountIdCard,
                sex: this.formatSex(this.userInfo.sex
                    || this.accountProfileInfo.sex
                    || 1),
                driverTypeId: this.userInfo.driverTypeId
                    || this.findTypeId(this.accountProfileInfo.driverType)
                    || '0',
                drivingAgeId: this.userInfo.drivingAgeId
                    || this.findAgeId(this.accountProfileInfo.drivingAge)
                    || '0',
                birthday: this.userInfo.birthday
                    || this.accountProfileInfo.birthday
                    || null,
                region: {
                    provinceCode: this.userInfo.provinceCode
                        || this.accountProfileInfo.region.province.code
                        || '0',
                    cityCode: this.userInfo.cityCode
                        || this.accountProfileInfo.region.city.code
                        || '0',
                },
            };
            this.sendEditor();
        },
        formatSex(value) {
            let result = 1;
            switch (value) {
                case '男':
                    result = 1;
                    break;
                case '女':
                    result = 2;
                    break;
                case '保密':
                    result = 3;
                    break;
                default:
                    result = 3;
                    break;
            }
            return result;
        },
        imgError(info) {
            this.$notify({
                duration: 1800,
                message: info,
                customClass: 'editor-tip',
            });
        },
        cancle() {
            this.$set(this, 'datePickerShow', false);
            this.$set(this, 'singlePickerShow', false);
            this.$set(this, 'areaPickerShow', false);
        },
        findTypeId(name) {
            const value = this.$store.getters.driverType.find(i =>
                i.name === name);
            return value ? value.id : null;
        },
        findAgeId(name) {
            const value = this.$store.getters.driverAge.find(i =>
                i.name === name);
            return value ? value.id : null;
        },
        confirm() {
            const singlePicker = this.$refs.singlePicker;
            const areaPicker = this.$refs.areaPicker;
            if (this.typeTag === 0) {
                this.$set(this.userInfo, 'sex', singlePicker.values[singlePicker.slots[0].valueIndex]);
            } else if (this.typeTag === 1) {
                this.$set(this.userInfo, 'driverType', singlePicker.values[singlePicker.slots[0].valueIndex]);
                const id = this.findTypeId(singlePicker.values[singlePicker.slots[0].valueIndex]);
                this.$set(this.userInfo, 'driverTypeId', id);
            } else if (this.typeTag === 2) {
                this.$set(this.userInfo, 'drivingAge', singlePicker.values[singlePicker.slots[0].valueIndex]);
                const id = this.findAgeId(singlePicker.values[singlePicker.slots[0].valueIndex]);
                this.$set(this.userInfo, 'drivingAgeId', id);
            } else if (this.typeTag === 4) {
                this.$set(this.userInfo, 'provinceName', areaPicker.values[this.$refs.areaPicker.slots[0].valueIndex]);
                this.$set(this.userInfo, 'cityName', areaPicker.values[this.$refs.areaPicker.slots[1].valueIndex]);
            }
            this.$set(this, 'singlePickerShow', false);
            this.$set(this, 'areaPickerShow', false);
        },
        ShowPicker(type) {
            this.typeTag = type;
            this.singleSlots[0].values = [];
            const getters = this.$store.getters;
            if (type === 0) {
                this.$set(this, 'singlePickerShow', true);
                this.singleSlots[0].values = ['男', '女', '保密'];
                this.$nextTick(() => {
                    const singp = this.$refs.singlePicker;
                    singp.setSlotValue(0, this.userInfo.sex
                        || this.accountProfileInfo.sex
                        || this.singleSlots[0].values[0]);
                });
            } else if (type === 1) {
                this.$set(this, 'singlePickerShow', true);
                getters.driverType.forEach((i) => {
                    this.singleSlots[0].values.push(i.name);
                });
                this.$nextTick(() => {
                    const singp = this.$refs.singlePicker;
                    singp.setSlotValue(0, this.userInfo.driverType
                        || this.accountProfileInfo.driverType
                        || getters.driverType[0].name);
                });
            } else if (type === 2) {
                this.$set(this, 'singlePickerShow', true);
                getters.driverAge.forEach((i) => {
                    this.singleSlots[0].values.push(i.name);
                });
                this.$nextTick(() => {
                    const singp = this.$refs.singlePicker;
                    singp.setSlotValue(0, this.userInfo.drivingAge
                        || this.accountProfileInfo.drivingAge
                        || getters.driverAge[0].name);
                });
            } else if (type === 3) {
                this.$set(this, 'datePickerShow', true);
            } else if (type === 4) {
                this.$set(this, 'areaPickerShow', true);
                this.$nextTick(() => {
                    const areaPicker = this.$refs.areaPicker;
                    areaPicker.setSlotValue(0, this.userInfo.provinceName || '云南省');
                    if (this.userInfo.cityCode) {
                        areaPicker.setSlotValue(1, this.userInfo.cityName);
                    }
                });
            }
        },
        areaChange(picker, values) {
            const fItem = this.userInfo.provinceList.find(obj => obj.name === values[1]);
            const fId = fItem ? fItem.id : '0';
            const arr = [];
            if (!this.loadFlag) {
                this.$set(this, 'loadFlag', true);
                this.getAreaList({
                    level: 1,
                    code: fId,
                }).then((data) => {
                    this.$set(this, 'loadFlag', false);
                    data.forEach((i) => {
                        arr.push(i.name);
                    });
                    this.$set(this.areaSlots[1], 'values', arr);
                    const sItem = data.find(i => i.name === values[2]);
                    const sId = sItem ? sItem.id : '0';
                    this.$set(this.userInfo, 'provinceCode', fId);
                    this.$set(this.userInfo, 'cityCode', sId);
                });
            }
        },
        dateConfirm() {
            const currentValue = this.$refs.pickers.currentValue;
            const birthday = currentValue ? moment(currentValue).format('YYYY-MM-DD') : '';
            this.$set(this, 'datePickerShow', false);
            this.$set(this.userInfo, 'birthday', birthday);
        },
        uploadDone(data) {
            this.pictures[data.index].url = data.url;
            this.avatar = this.pictures[data.index].url;
            this.editAccountProfileAvator({
                avatar: this.avatar,
            }).then(() => {
                this.$notify({
                    message: '头像上传成功！',
                });
            });
        },
    },
    computed: {
        ...mapGetters(['accountProfile']),
        accountRealName: {
            get() {
                return this.$store.state.account.accountProfile.realName;
            },
            set(value) {
                this.$store.commit('SET_ACCOUNT_PROFILE_REALNAME', value);
            },
        },
        accountEmail: {
            get() {
                return this.$store.state.account.accountProfile.email;
            },
            set(value) {
                this.$store.commit('SET_ACCOUNT_PROFILE_EMAIL', value);
            },
        },
        accountIdCard: {
            get() {
                return this.$store.state.account.accountProfile.idCard;
            },
            set(value) {
                this.$store.commit('SET_ACCOUNT_PROFILE_IDCARD', value);
            },
        },
    },
    mounted() {
        this.$set(this, 'startDate', new Date('1900-01-01'));
        this.$set(this, 'endDate', new Date());
        if (this.$store.getters.sessionId) {
            this.getAccountProfile().then((res) => {
                this.$set(this.userInfo, 'provinceName', res.region.province.name || '');
                this.$set(this.userInfo, 'cityName', res.region.city.name || '');
                this.$set(this, 'defaultDate', res.birthday || '1980-01-01');
                this.$set(this, 'accountProfileInfo', res);
            });
            if (!this.loadFlag) {
                this.$set(this, 'loadFlag', true);
                this.getAreaList({
                    level: 0,
                    code: 0,
                }).then((res) => {
                    this.$set(this, 'loadFlag', false);
                    this.$set(this.userInfo, 'provinceList', res);
                    res.forEach((i) => {
                        this.areaSlots[0].values.push(i.name);
                    });
                }).catch((err) => {
                    this.$notify({
                        duration: 1800,
                        message: err.msg,
                        customClass: 'editor-tip',
                    });
                });
            }
            this.getDriverType();
            this.getDriverAge();
        }
    },
};
</script>

<style lang="less">@import "../../global.style.less";
.account-profile {
    .gz-header-left {
        img {
            width: 36px!important;
            height: 36px!important;
        }
    }
    .profile-avator {
        padding-top: 88px;
        width: 100%;
        height: 591px;
        position: relative;
        background: #d8d8d8;
        img {
            width: 100%;
            height: 100%;
            // outline: none;
        }
        .avator-editor {
            position: absolute;
            right: 46px;
            bottom: 43px;
            width: 108px;
            height: 108px;
            background: url('../../../public/img/avator-editor.svg') no-repeat;
            background-size: 100% 100%;
            .filebtn {
                width: 100%;
                height: 100%;
            }
        }
    }
    .profile-list {
        padding: 56px 24px 0;
        .list-item {
            padding: 58px 0;
            border-bottom: 1rpx solid #ddd;
        }
        .list-name-item {
            .item-name {
                font-size: 48dpx;
                width: 100%;
                margin-top: 36px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .item-title {
                font-size: 34dpx;
            }
        }
        .list-check-item {
            font-size: 32dpx;
            position: relative;
            .item-content {
                position: absolute;
                top: 58px;
                right: 60px;
                width: 482px;
                color: #666;
                font-size: 32dpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
            }
            & > img {
                position: absolute;
                top: 62px;
                right: 0;
                width: 14px;
                height: 26px;
            }
        }
    }
    .picker {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 1000;
        .picker-toolbar {
            overflow: hidden;
            height: 140px;
            padding: 50px 30px 50px 24px;
            .picker-close {
                float: left;
                width: 32px;
                height: 32px;
            }
            .picker-confirm {
                float: right;
                font-size: 32dpx;
            }
        }
    }
    ::-webkit-input-placeholder {
        font-size: 32dpx;
    }
    .bottom-area {
        display: none;
        > div {
            display: none;
        }
    }
    .gz-uploader {
        background-color: transparent;
        background-image: none;

    }
    .save-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .gz-datetime-select {
        .picker-toolbar{
            height: 300px;
            bottom: 1dpx solid #ddd;
        }
        .gz-datetime-panel {
            z-index: 1000;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: auto;
            background-color: white;
            padding: 20px 0;
            .gz-datetime-btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
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
            .date-text{
                padding: 100px 0;
                font-size: 50dpx;
                font-weight: 600;
                color: #4a4a4a;
            }
        }
    }
    input{
        font-size: 32dpx;
    }
}
</style>
