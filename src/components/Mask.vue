<template>
	<div class="mask-wrapper">
		<div class="mask-content" v-if="type === 0">
			<div class="content-sup">您的床币不足，是否需要充值？</div>
			<div class="content-sub">
				<div class="btn btn-cancle" @click="cancleEvent">取消</div>
				<div class="btn btn-confirm" @click="toCharge">去充值</div>
			</div>
		</div>
		<div class="mask-success" v-if="type === 1">
			<div class="success-sup">
				<img src="../static/img/success.png">
			</div>
			<div class="content-sub">
				<div class="btn btn-more" @click="moreGame">更多比赛</div>
				<div class="btn btn-continue" @click="cancleEvent">继续下注</div>
			</div>
		</div>
		<div class="mask-tips" v-if="type === 2">
			<div class="tips-sup">
				{{msg}}
			</div>
			<div class="content-sub">
				<div class="btn btn-confirm" @click="cancleEvent">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Popups',
		props: ['type','msg'],
		methods:{
			cancleEvent(){
				this.$emit('callOff');
			},
			moreGame(){
				history.back(-1);
			},
			toCharge(){
				this.$emit('callOff');
				native.skip("chuangshang://recharge/bedpoint/");
			}
		}
	}
</script>

<style lang='scss' scoped>
	.mask-wrapper{
		z-index: 29;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.mask-content,.mask-success,.mask-tips{
		position: relative;
		top: 40%;
		left: 50%;
		width: 6rem;
		border-radius: 8px;
		transform: translateX(-50%) translateY(-50%);
		background: white;
	}
	.content-sup{
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom: 1px solid #dedede;
		color: black;
	}
	.content-sub{
		display: flex;
		height: 0.8rem;
		line-height: 0.8rem;
		.btn{
			flex: 1;
		}
		.btn-confirm{
			color: #39D0C1;
		}
		.btn-cancle{
			color: #989898;
		}
	}
	.btn+.btn{
		border-left: 1px solid #dedede;
	}
	.success-sup{
		height: 2rem;
		border-bottom: 1px solid #dedede;
		img{
			height: 70%;
			transform: translateY(15%);
		}
	}
	.btn-more{
		color: black;
	}
	.btn-continue{
		color: #4C97EA;
	}
	.tips-sup{
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		border-bottom: 1px solid #dedede;
	}
</style>