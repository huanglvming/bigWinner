<template>
	<div class="football-wrapper">
			<Listblock :category='0'></Listblock>
	</div>
</template>

<script>
	import Listblock from './Listblock.vue'
	export default{
		name: 'football',
		components:{
			Listblock,
		},
	}
</script>

<style lang="scss" scoped>
	.block-time{
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #EFEFEF;
	}
	.date{
		z-index: 9;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    background-color: #EFEFEF;
	}
</style>
