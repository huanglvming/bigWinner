<template>
	<div class="ranklist-wrapper">
		<div class="rank-tab-wrapper">
			<router-link to="/" class="goback" tag="div"></router-link>
			<div class="rank-tab">
				<router-link to="/ranklist/profit" class="tab-item" tag="div">
					<span>盈利榜</span>
				</router-link>
				<router-link to="/ranklist/win" class="tab-item" tag="div">
					<span>胜率榜</span>
				</router-link>
			</div>
		</div>
		<div class="rank-list">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import RankItem from "../../components/RankItem.vue"
	export default{
		name: 'RankList',
		components:{
			RankItem,
		},
	}
</script>

<style lang="scss" scoped>
	.rank-tab-wrapper{
		background-color: white;
	}
	.rank-tab{
		display: flex;
		width: 60%;
		height: 40px;
		margin: 0 auto;
		line-height: 40px;
		color: #989898;
	}
	.tab-item{
		flex: 1;
		span{
			color: #2c3e50;
    		border-bottom: none;
		}
	}
	.tab-active{
		span{
			padding-bottom: 3px;
		    color: #FFBB8C;
		    border-bottom: 2px solid #FFBB8C;
		}
	}
	.rank-list{
		background: white;
	}
	.goback{
		z-index: 29;
	    position: absolute;
	    top: 5px;
	    left: 12px;
	    width: 30px;
	    height: 30px;
	    background: url("../../static/img/arrow-back.png") no-repeat;
	    background-size: 100%;
	}
</style>