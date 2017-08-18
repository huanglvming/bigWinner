<template>
	<div class="list-item">
		<div class="item-content">
			<div class="info info-player">
				<img :src="'https://roi.skst.cn/logo/'+obj.h_t.logo">
				<p class="player-name">{{obj.h_t.name}}</p>
			</div>
			<div class="info info-content">
				<p class="info-title">{{obj.start_time | formateTime}} {{obj.cup_name}}</p>
				<p class="info-score" v-if="obj.status===0">VS</p>
				<p class="info-score" v-else>{{obj.home_scores}}:{{obj.away_scores}}</p>
				<p class="info-status" :class="{'status-on':(obj.status===1)||(obj.status===2)||(obj.status===3)||(obj.status===4),'status-bet':(obj.status===0)}">{{obj.status | status}}</p>
			</div>
			<div class="info info-player">
				<img :src="'https://roi.skst.cn/logo/'+obj.a_t.logo">
				<p class="player-name">{{obj.a_t.name}}</p>
			</div>
		</div>
		<div class="rate-content">
			<div class="rate-bar">
				<div class="rate-item" :style="{width: obj.home_ratio+'%'}"></div>
				<div class="rate-item" :style="{width: obj.away_ratio+'%'}"></div>
			</div>
			<div class="rate-data">
				<div class="rate-data-item">{{obj.home_ratio}}%支持率</div>
				<div class="rate-data-item">{{obj.away_ratio}}%支持率</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'ListItem',
		props: ['obj'],
		filters:{
			status(val){
				switch(val){
					case -1:
						return '完场';
						break;
					case 0:
						return '可下单';
						break;
					case -10:
						return '取消';
						break;
					case 1:
						return '上半场';
						break;
					case 2:
						return '中场';
						break;
					case 3:
						return '下半场';
						break;
					case 4:
						return '加时';
						break;
					case -11:
						return '待定';
						break;
					case -12:
						return '腰斩';
						break;
					case -13:
						return '中断';
						break;
					case -14:
						return '推迟';
						break;
					default:
						return '出错';
				}
			},
			formateTime(utc){
				var date = new Date(utc);
				let hour = date.getHours()>10?date.getHours():'0'+date.getHours();
				let min = date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes();
				return hour+':'+min;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list-item{
		padding: 5px 0; 
		border-bottom: 1px solid #D4D4D4;
	}
	.item-content{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.info{
		height: 80px;
		flex: 1;
		img{
			height: 50px;
		}
		.player-name{
			max-width: 125px;
			height: 30px;
			line-height: 30px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 0 auto;
		}
	}
	.info-content{
		width: 100px;
	}
	.info-title{
		font-size: 12px;
	}
	.info-score{
		font-weight:bold;
		font-size: 18px;
		line-height: 26px;
	}
	.info-status{
		width: 70px !important;
		border-radius: 10px;
		margin: 0 auto;
		height: 20px;
		line-height: 20px;
		background-color: gray;
		color: white;
		font-size: 12px;
	}
	.status-on{
		background: orange;
	}
	.status-bet{
		background: #7EE126;
	}
	.rate-content{
		width: 100%;
		margin: 0 auto;
		margin-top: 5px;
	}
	.rate-bar{
		display: flex;
		width: 96%;
		height: 5px;
		margin: 0 auto;
		margin-top: 5px;
	}
	.rate-item{
		width: 50%;
	}
	.rate-item:nth-child(1){
		background-color: #F8716B;
		border-top-left-radius: 2px;
		border-bottom-left-radius: 2px;
	}
	.rate-item:nth-child(2){
		background-color: #72CDFA;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}
	.rate-data{
		display: flex;
		justify-content: space-between;
		width: 96%;
		margin: 0 auto;
		margin-top: 3px;
		font-size: 12px;
	}
	.rate-data-item:nth-child(1){
		color: #F8716B;
	}
	.rate-data-item:nth-child(2){
		color: #72CDFA;
	}
</style>