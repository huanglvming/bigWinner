<template>
	<div class="list-item">
		<div class="item-date">{{createTime}}</div>
		<div class="item-content">
			<div class="title">
				<div class="league">{{obj.cn}}</div>
				<div class="date">{{obj.time | formateTime}}</div>
				<img class="img-status" src="../static/img/flag_pj.png" v-if="obj.status === 1">
				<img class="img-status" src="../static/img/flag_sb.png" v-if="obj.status === 2">
				<img class="img-status" src="../static/img/flag_zp.png" v-if="obj.status === -1">
			</div>
			<div class="content">
				<div class="left">
					<div class="category">{{obj.play}}</div>
					<div>
						<p class="first-line">玩法：{{obj.play}}</p>
						<p>下单：{{obj.support}}({{obj.odds}})</p>
					</div>
				</div>
				<div class="right">
					<p class="first-line color-win" v-if="obj.back && obj.status === 1">开奖：{{obj.back | filBack}}床币</p>
					<template v-else>
						<p class="first-line color-lose" v-if="obj.back && obj.status === 2">开奖：{{obj.back | filBack}}床币</p>
						<template v-else>
							<p class="first-line" v-if="obj.back && obj.status === -1">开奖：{{obj.back | filBack}}床币</p>
							<p class="first-line" v-else></p>
						</template>
					</template>
					<p class="value">{{obj.bet | conversion}}床币</p>
				</div>
			</div>
			<div class="play-info">
				<div class="player">
					<img :src="'http://roi.skst.cn/logo/'+obj.hl">
					<span v-if="obj.handicap!=0 && obj.play.indexOf('让球')>=0">{{obj.hn}}({{obj.handicap | handicap}})</span>
					<span v-else>{{obj.hn}}</span>
				</div>
				<div class="scores" v-if="obj.status === 0">VS</div>
				<div class="scores" v-else>{{obj.hs}}:{{obj.as}}</div>
				<div class="player">
					<span>{{obj.an}}</span>
					<img :src="'http://roi.skst.cn/logo/'+obj.al">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "RecordItem",
		props: ['obj','createTime'],
		filters:{
			filBack(val){
				if(val > 0){
					return '+' + Math.round(parseFloat(val*100));
				}else{
					return Math.round(parseFloat(val*100));
				}
			},
			formateTime(utc){
				if(utc){
					var date = new Date(utc);
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					let hour = date.getHours()>10?date.getHours():'0'+date.getHours();
					let min = date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes();
					return year+'-'+month+'-'+day+' '+hour+':'+min;
				}
			},
			conversion(val){
				return parseInt(val * 100);
			},
			handicap(val){
				if(parseInt(val)>0){
					return '+' + Math.abs(val);
				}else{
					return '-' + Math.abs(val);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-item{
		padding: 2%;
		border-top: 1px solid #dcdcdc;
		border-bottom: 1px solid #dcdcdc;
		background: white;
		text-align: left;
		margin-bottom: 10px;
	}
	.item-date{
		font-size: 10px;
		color: #969696;
	}
	.item-content{
		margin-top: 5%;
		font-size: 12px;
		border: 1px solid #DCDCDC;
		background-color: #F6F7F9;
		.title{
			position: relative;
			display: flex;
			justify-content: space-between;
			padding: 0 10px;
			line-height: 30px;
			border-bottom: 1px solid #EDEFEE;
		}
		.img-status{
			position: absolute;
			right: 10px;
			top: -26px;
			width: 60px;
		}
		.play-info{
			display: flex;
			justify-content: space-between;
			padding: 0 10px;
			line-height: 50px;
			background-color: #EBEBEB;
			border-top: 1px solid #dcdcdc;
			div{
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			}
			.player{
				width: 40%;
			}
			.scores{
				width: 20%;
			}
		}
		.player>span{
			display: inline-block;
		    width: calc(100% - 40px);
		    overflow: hidden;
		    vertical-align: middle;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		}
		.player>img{
			display: inline-block;
	    	height: 30px;
	    	vertical-align: middle;
		}
		.player:first-child{
			text-align: left;
		}
		.player:last-child{
			text-align: right;
		}
		.scores{
			font-weight: bold;
			text-align: center;
		}
		.content{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			.left{
				display: flex;
				align-items: center;
			}
			.category{
				width: 70px;
				height: 40px;
				line-height: 40px;
				margin-right: 5px;
				color: white;
				text-align: center;
				background-color: #F25E5C; 
				white-space: nowrap;
			}
		}
		.first-line{
			width: 91px;
			height: 16px;
			margin-bottom: 5px;
			white-space: nowrap;
		}
		.value{
			color: #E5A342;
		}
	}
	.color-win{
		color: rgb(223, 11, 8)
	}
	.color-lose{
		color: green;
	}
</style>