
<!--
  	简易上传（ 只支持选择→立即上传→返回URL ）
	:multiple= 是否支持多选
	:upper= 上传图片上限
	:previewDate= 返回所有图片Base64 用于预览
	:error= 上传报错回调
	:success= 上传成功回调(返回是所有图片的url)
	:start= 在上传开始前调用(比如 加载loading)
	:serverUrl= 图片的上传地址
    :styleBtn= 上传按钮样式

    组件中有removeQueue方法（删除某项，返回值是删除后的{previewDate(所有图片Base64),urlList(所有图片的url)}）

   	视情况 todo: 进度条/选择→选择...→点击上传→返回URL
-->

<template>
    <div class="test-upload">
     	<h1>upload</h1>
     	<gz-upload
     		:multiple="true"
     		:upper="3"
     		:previewDate="previewDate"
     		:error="error"
     		:success="success"
     		:start="start"
     		:styleBtn="`filebtn`"
     >
     	</gz-upload>
     	<div class="show">
     		<div v-for="img in imgs" class="item">
     			<img :src="img">
     			<div @click="deleteItem(img)">remove</div>
     			<div>{{text}}</div>
     		</div>
     	</div>
    </div>
</template>

<script>
import upload from '../../components/common/upload/img.vue'
export default {
    components: {
        [upload.name]: upload,
    },
    data() {
        return {
            imgs: [],
            text: ''
        }
    },
    methods: {
        start() {
            this.text = '上传中'
        },
        error(info) {
            this.text = ''
        },
        success(info) {
            this.text = ''
        },
        previewDate(info) {
            this.imgs = info
        },
        deleteItem(item) {
            this.$children[0].removeQueue(item, (info) => {
            })
        }
    },
    computed: {}
};
</script>

<style>
.test-upload .filebtn {
    position: relative;
    overflow: hidden;
    display: inline-block;
    color: #fff;
    padding: 6px 12px;
    background-color: #5cb85c;
    border-color: #4cae4c;
    margin: 0;
    font-size: 14dpx;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
}

.test-upload .show .item {
    width: 160px;
    height: 160px;
    float: left;
    margin: 20px;
}

.test-upload img {
    width: 100%
}
</style>
