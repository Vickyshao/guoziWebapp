
<template>
    <div class="test-area-select">
     	<h1>test-area-select</h1>
     	<div @click="start">调起地区组件</div>
      <gz-area-select :getAreaInfo="getAreaInfo" v-if="show" :isShow="isShow"></gz-area-select>
      <div>
        {{info.province}} - {{info.city}} -{{info.region}}
      </div>
    </div>
</template>

<script>
	  import areaSelect from '../../components/biz/area-select.vue'
  	export default {
	    components: {
	    	[areaSelect.name]: areaSelect,
	    },
	    data() {
	    	return {
	    		show:false,
          info:{}
	    	}
	    },
	    methods: {
        start() {
          this.show = true
        },
        isShow(info) {
          this.show = info
        },
        getAreaInfo(info) {
          this.info = info
        }
	    },
  	};
</script>

<style>
</style>
