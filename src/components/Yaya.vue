<template>
	<div class="yaya-wrapper">
		<Listblock :category='0'></Listblock>
	</div>
</template>

<script>
	import Listblock from './Listblock.vue'
	export default{
		name: 'yaya',
		components:{
			Listblock,
		}
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
</style>