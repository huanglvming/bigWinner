<template>
	<div class="rank-item">
		<div class="list-num" v-if="index>2">{{index+1}}</div>
		<div class="list-num" v-else></div>
		<div class="list-user">
			<img :src="photoPrefix+obj.user.head" alt="用户头像">
			<div class="user-content">
				<p class="user-name" v-if="obj.user.gender === 1">{{obj.user.name}}<i class="gender gender-boy"></i></p>
				<p class="user-name" v-else>{{obj.user.name}}<i class="gender gender-girl"></i></p>
				<p class="rate-win" v-if="type === 0">胜率：{{obj.winning | roi}}</p>
				<p class="rate-win" v-else>盈利率：{{obj.roi | roi}}</p>
				<p class="total-count">竞猜：{{obj.bet_count}}场</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'RankItem',
		props: ['obj','index','type'],
		data(){
			return {
				photoPrefix: this.utils.photoPrefix,
			}
		},
		filters:{
			roi(val){
				return (val*100).toFixed(2)+'%';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rank-item,.list-user{
		display: flex;
		align-items: center;
	}
	.rank-item{
		box-sizing: border-box; 
		height: 75px;
		padding: 8px 0px;
		border-bottom: 1px solid #DBDBDB;
		// background: url("../static/img/arrow.png") no-repeat;
		// background-position: center;
		// background-position-x: 96%;
	}
	.list-num{
		width: 50px;
		height: 50px;
		margin-right: 10px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		font-weight: bold;
	}
	.record:nth-child(1){
		.list-num{
			background: url("../static/img/rank-1.png") no-repeat;
			background-size: 56%;
			background-position: top;
		}
	}
	.record:nth-child(2){
		.list-num{
			background: url("../static/img/rank-2.png") no-repeat;
			background-size: 56%;
			background-position: top;
		}
	}
	.record:nth-child(3){
		.list-num{
			background: url("../static/img/rank-3.png") no-repeat;
			background-size: 56%;
			background-position: top;
		}
	}
	.list-user{
		img{
			width: 40px;
			height: 40px;
			margin-right: 10px;
			border-radius: 50%;
		}
	}
	.user-content{
		text-align: left;
		p{
			margin-bottom: 5px;
		}
	}
	.user-name{
		position: relative;
		max-width: 200px;
		overflow: hidden;
		text-oveflow: ellipsis;
		white-space: nowrap;
		.gender{
			display: inline-block;
			width: 16px;
			height: 16px;
			margin-left: 5px;
		}
		.gender-boy{
			background: url("../static/img/boy.png") no-repeat;
			background-size: contain;
		}
		.gender-girl{
			background: url("../static/img/girl.png") no-repeat;
			background-size: contain;
		}
	}
	.rate-win,.total-count{
		padding-left: 5px;
		font-size: 10px;
		line-height: 1;
		color: #808080;
	}
	.rate-win{
		border-left: 2px solid #E33B38;
	}
	.total-count{
		border-left: 2px solid #3C8FD1;
	}
</style>