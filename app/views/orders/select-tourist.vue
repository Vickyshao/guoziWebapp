<template>
    <div class="select-tourist" id="select-tourist">
        <gz-header
        class="select"
        v-if="!select"
        :customHandler='true'
        @backHandler='backHandlerTo'
        ></gz-header>
        <gz-header
        title="房车预订"
        v-if="select"
        :customHandler='true'
        @backHandler='backHandlerTo'
        >
          <div  slot="title-bar-right" class="submit-btn">
              <span @click="confirm">提交</span>
          </div>
        </gz-header>
        <div class="tourist-list">
            <h1 v-if="!select">常用游客信息</h1>
            <gz-loading
              :show='showLoading'
            ></gz-loading>
            <div class="tourist-item"  v-for="(item,index) in tourists">
                <div class="tourist-check"  v-if="select" @click="add(index)">
                    <img v-show="!item.select" :src="icons.checkCircle">
                    <img v-show="item.select" :src="icons.checkMark">
                </div>
                <div class="tourist-info">
                    <div class="tourist-name">{{item.name}}</div>
                    <div class="tourist-idcard"><span>身份证号：</span>{{item.idCard}}</div>
                    <div class="tourist-phone"><span>手机号：</span>{{item.phone}}</div>
                </div>
                <div class="tourist-operation">
                    <span @click="editTourist(item.id)">
                        <img :src="icons.editTourist">
                    </span>
                    <span @click="deleteOrNot(item.id)">
                        <img :src="icons.trash">
                    </span>
                </div>
            </div>
            <div class="have-no-tourist" v-if="noTourist">
                <span>暂无常用游客信息，请添加</span>
                <div class="noTourist-icon">
                    <img :src="icons.haveNotTourist">
                </div>
            </div>
        </div>
        <div class="tourist-add" v-if='!showLoading'>
            <button @click="addTourist">新增常用游客信息</button>
        </div>
        <gz-alert :show="showAlert"
          leftButtonText="确定"
          rightButtonText="取消"
          @leftButtonClick="leftButtonClickHandler"
          @rightButtonClick="rightButtonClickHandler">
          <div class="alert-title">确认删除该游客信息？</div>
        </gz-alert>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { cloneDeep } from 'lodash';

export default{
    data() {
        return {
            tourists: [],
            select: false,
            showLoading: true,
            noTourist: false,
            showAlert: false,
            selectTourist: '',
            icons: {
                checkCircle: require('../../components/biz/icon/check-circle.svg'),
                checkMark: require('../../components/biz/icon/check-mark.svg'),
                editTourist: require('../../components/biz/icon/edit-tourist.svg'),
                trash: require('../../components/biz/icon/trash.svg'),
                haveNotTourist: require('../../../public/img/have-not-tourist.svg'),
            },
        };
    },
    computed: {
        ...mapGetters([
            'touristSelected', 'touristList', 'quantity', 'driverType', 'driverAge',
        ]),
    },
    methods: {
        ...mapActions([
            'setOrderTourcarTourist', 'getTouristList', 'deleteTourist', 'getDriverType', 'getDriverAge',
        ]),
        driverTypeComputed(driverType) {
            return this.driverType.filter(item => item.id === driverType)[0].name;
        },
        driverAgeComputed(driverAge) {
            return this.driverAge.filter(item => item.id === driverAge)[0].name;
        },
        editTourist(id) {
            // this.$router.push(`/account/tourist/${id}`);
            if (this.select === true) {
                this.$router.push({
                    path: `/account/tourist/${id}`,
                    query: {
                        select: true,
                        type: this.$route.query.type,
                        carId: this.$route.query.carId,
                    },
                });
            } else {
                this.$router.push({
                    path: `/account/tourist/${id}`,
                });
            }
        },
        backHandlerTo() {
            if (this.select === false) {
                this.$router.push({
                    path: '/account/setting',
                });
            } else {
                this.$router.back();
            }
        },
        deleteOrNot(id) {
            this.$set(this, 'showAlert', true);
            this.$set(this, 'selectTourist', id);
        },
        leftButtonClickHandler() {
            this.$set(this, 'showAlert', false);
            this.deleteT(this.selectTourist);
        },
        rightButtonClickHandler() {
            this.$set(this, 'showAlert', false);
        },
        deleteT(id) {
            this.deleteTourist(id).then(() => {
                this.tourists = cloneDeep(this.touristList);
                if (this.tourists.length === 0) {
                    this.$set(this, 'noTourist', true);
                }
            })
            .catch((err) => {
                this.$notify({ message: err.errMsg || '' });
            });
        },
        add(idx) {
            if (this.tourists[idx].select) {
                this.$set(this.tourists[idx], 'select', false);
            } else {
                this.$set(this.tourists[idx], 'select', true);
            }
        },
        confirm() {
            const arr = [];
            this.tourists.forEach((item) => {
                if (item.select) {
                    const people = {
                        id: item.id,
                        name: item.name,
                        phone: item.phone,
                        idCard: item.idCard,
                        driverType: this.driverTypeComputed(item.driverTypeId),
                        driverAge: this.driverAgeComputed(item.driverAgeId),
                    };
                    arr.push(people);
                }
            });
            if (arr.length !== this.quantity) {
                this.$notify({ message: `请选择${this.quantity}个游客` });
                return;
            }
            this.setOrderTourcarTourist(arr);
            this.back();
        },
        addTourist() {
            if (this.select === true) {
                this.$router.push({
                    path: '/account/tourist',
                    query: {
                        select: true,
                        type: this.$route.query.type,
                        carId: this.$route.query.carId,
                    },
                });
            } else {
                this.$router.push({
                    path: '/account/tourist',
                });
            }
        },
        back() {
            this.$router.push({
                path: '/touring-car-order',
                query: {
                    type: this.$route.query.type,
                    carId: this.$route.query.carId,
                },
            });
        },
        fetchData() {
            this.getTouristList().then(() => {
                this.$set(this, 'showLoading', false);
                this.tourists = cloneDeep(this.touristList);
                if (this.tourists.length === 0) {
                    this.$set(this, 'noTourist', true);
                }
            }).catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
            this.getDriverType().catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
            this.getDriverAge().catch((error) => {
                this.$notify({ message: (error && error.msg) || error.toString() || 'error' });
            });
        },
    },
    mounted() {
        this.fetchData();
        if (this.$route.query.select) {
            this.$set(this, 'select', true);
        }
    },
};
</script>

<style lang="less">
#select-tourist{
    padding-top: 88px;
    .tourist-list{
        padding: 0 24px 50px;
        h1{
            padding: 50px 0;
        }
        .tourist-item{
            padding: 40px 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1rpx solid #dddddd;
            &:last-child{
                border-bottom: none;
            }
            .tourist-check{
                width: 34px;
                height: 34px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .tourist-info{
                font-size: 26dpx;
                color: #999999;
                display: flex;
                flex-direction: column;
                .tourist-name{
                    font-size: 32dpx;
                    color: #666666;
                }
                .tourist-idcard,
                .tourist-phone{
                    margin-top: 24px;
                }
            }
            .tourist-operation{
                height: 100%;
                align-self: flex-end;
                overflow: hidden;
                span{
                    float: left;
                    display: block;
                    width: 34px;
                    height: 34px;
                    &:first-child{
                        margin-right: 60px;
                    }
                    img{
                        width: 34px;
                        height: 34px;
                    }
                }
            }
        }
        .have-no-tourist{
            padding: 30px 0 0 0;
            span{
                display: block;
                color: #666666;
                font-size: 34dpx;
            }
            .noTourist-icon{
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 150px 0;
                img{
                    width: 261px;
                    height: 166px;
                }
            }
        }
    }
    .tourist-add{
        padding: 30px;
        display: flex;
        button{
            border:none;
            width: 100%;
            height: 98px;
            font-size: 32dpx;
            border-radius: 10rpx;
            text-align: center;
            align-items: center;
            color: #ffffff;
            background: #ff4847;
        }
    }
    .select {
        border-bottom: none;
    }
    .gz-header{
        .submit-btn{
            position: absolute;
            right: 0;
            padding-right: 30px;
            font-size: 28dpx;
            line-height: 88px;
        }
    }
}
</style>
