<!--
    简易上传（ 只支持选择→立即上传→返回URL ）
    :multiple= 是否支持多选
    :upper= 上传图片上限
    :previewDate= 返回所有图片Base64 用于预览
    :error= 上传报错回调
    :success= 上传成功回调(返回是所有图片的url)
    :start= 在上传开始前调用(比如 加载loading)
    :serverUrl= 图片的上传地址

    组件中有removeQueue方法（删除某项，返回值是删除后的{previewDate(所有图片Base64),urlList(所有图片的url)}）

    视情况 todo: 进度条/选择→选择...→点击上传→返回URL
-->

<template>
<div :class="`${styleDiv} gz-upload`" >
    <div :class="`${styleBtn} btn`">
        {{text}}
        <input type="file" accept="image/*" ref="gzfile" @change="change" name="files">
    </div>
</div>
</template>

<script>
import _ from './utils.js'
import {
    flowRight
} from 'lodash'
import Vue from 'vue'

export default {
    name: 'gz-upload',
    data() {
        return {
            files: [],
            fileslist: [],
            urllist: []
        }
    },
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        styleBtn: {
            type: String,
            default: ''
        },
        styleDiv: {
            type: String,
            default: ''
        },
        upper: {
            type: Number,
            default: 5
        },
        serverUrl: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: '选择图片'
        },
        error: {
            type: Function,
            default: () => {}
        },
        success: {
            type: Function,
            default: () => {}
        },
        previewDate: {
            type: Function,
            default: () => {}
        },
        start: {
            type: Function,
            default: () => {}
        },
    },
    mounted() {
        if (this.multiple) {
            this.$refs.gzfile.setAttribute('multiple', this.multiple);
        }
    },
    methods: {
        change() {
            let start = flowRight(this.upload, this.showPreview, this.joinQueue, this.checkUpper)
            start(this.$refs.gzfile.files)
        },
        checkUpper(files) {
            if (this.upper < this.fileslist.length + files.length) {
                this.error('too much')
            } else {
                return files
            }
        },
        joinQueue(files) {
            if (!files) return
            //this.files = this.files.concat(_.toArray(files))
            this.files = files
            return files
        },
        removeQueue(item, callback) {
            let index = this.fileslist.indexOf(item)
            if (index != -1) {
                this.fileslist.splice(index, 1)
                this.urllist.splice(index, 1)
            }
            callback({
                previewDate: this.fileslist,
                urlList: this.urllist
            })
        },
        showPreview(files) {
            if (!files) return
            for (let index in files) {
                if (typeof(files[index]) != 'object') return
                _.getImgBase64(files[index], (url) => {
                    this.fileslist.push(url)
                    this.previewDate(this.fileslist)
                })
            }
        },
        upload(files) {
            this.start()
            for (let index in this.files) {
                if (typeof(this.files[index]) != 'object') return
                if (this.serverUrl) {
                    _.upload(this.serverUrl, this.files[index], (info) => {
                        this.urllist.push(info.linkurl)
                        if (index * 1 + 1 == this.files.length) {
                            this.success(this.urllist)
                        }
                    }, (info) => {
                        this.error(info)
                    })
                } else {
                    new Promise((resolve, reject) => {
                        Vue.axios.get('/common/upload-path')
                            .then((res) => {
                                let jsonToken = res.data;
                                if(this.files[index].size != 0){
                                    _.upload2(jsonToken, this.files[index], (info) => {
                                        this.urllist.push(info[0].file)
                                        if (index * 1 + 1 == this.files.length) {
                                            this.success(this.urllist)
                                        }
                                    }, (info) => {
                                        this.error(info)
                                    })
                                } else {
                                    //this.success('')
                                }
                                return resolve(res.data);
                            })
                    });
                }

            }
        }
    },
};
</script>

<style>
.gz-upload .btn input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    opacity: 0;
    direction: ltr;
    font-size: 30dpx;
}
</style>
