<template>
	<div class="order-wrapper" :class="{'order-active': status}">
		<div class="order-sup" @click='changeStatus()'>当前共有：<span>{{wealth}}</span>床币</div>
		<div class="order-sub">
			<input type="number" class="bet-number" placeholder="请输入下单床币金额">
			<input type="button" value='下单' class='bet-button' @click="orderEvent()">
		</div>
	</div>
</template>

<script>
	import jq from 'jquery';
	export default{
		name: 'Order',
		props: ['wealth'],
		data(){
			return{
				status: false,
			}
		},
		methods:{
			changeStatus(){
				this.status = !this.status;
			},
			orderEvent(){
				if(this.$store.state.isActive && jq('.bet-number').val() && jq('.bet-number').val()<this.wealth){
					console.log('isActive:'+this.$store.state.isActive);
					console.log('contest_id:'+this.$store.state.contest_id);
					console.log('play_id:'+this.$store.state.play_id);
					console.log('support:'+this.$store.state.support);
					console.log('r1:'+this.$store.state.r1);
					console.log('r2:'+this.$store.state.r2);
					console.log('r3:'+this.$store.state.r3);
					console.log('bet_value:'+jq('.bet-number').val());
				}else{
					console.log('false');
					console.log('bet_value:'+jq('.bet-number').val());
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.order-wrapper{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background: white;
		transform: translateY(70px);
		transition: all 300ms linear;
	}
	.order-active{
		transform: translateY(0px) !important;
	}
	.order-sup{
		height: 20px;
		padding: 0 10px;
		line-height: 20px;
		text-align: left;
		color: #4B6586;
		font-size: 10px;
		border-bottom: 1px solid #DCDCDC;
		span{
			color: #506FCA;
		}
	}
	.order-sub{
		display: flex;
		justify-content: space-around;
		padding: 20px 10px;
		height: 70px;
		box-sizing: border-box;
	}
	.bet-number{
		width: 3rem;
		height: 0.4rem;
		padding: 0.1rem;
		border-radius: 4px;
		border: none;
		background-color: #F0F0F0;
		text-align: center;
	}
	.bet-number::-webkit-input-placeholder{
		color: #AAAAAA;
	}
	.bet-button{
		display: block;
		width: 2rem;
		border: none;
		background: #1E5EB8;
		color: white;
		font-size: 10px;
	}
</style>