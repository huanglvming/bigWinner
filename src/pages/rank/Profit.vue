<template>
	<div class="profit-wrapper">
		<img src="../../static/img/loading.gif" class="loading" v-if="loading">
		<div class="user-info">
			<div class="avatar-name">
				<img :src="photoPrefix+avatar" alt="用户头像">
				<span class="user-name">{{name}}</span>
			</div>
			<div class="user-rank" v-if="rank === -1">
				<span class="current-rank">未上榜</span>
			</div>
			<div class="user-rank" v-else>
				<span class="current-rank">当前排名：</span>{{rank}}
			</div>
		</div>
		<div class="win-list">
			<router-link :to="{path:'/record',query:{target_id:item.user_id}}" class="record" tag="div" v-for="(item,index) in ranks" :key="index">
				<RankItem :index="index" :obj="item" :type="1"></RankItem>
			</router-link>
		</div>
	</div>
</template>

<script>
	import RankItem from "../../components/RankItem.vue";
	export default{
		name: 'Win',
		data(){
			return{
				photoPrefix: this.utils.photoPrefix,
				avatar: '',
				name: '',
				rank: 0,
				ranks: [],
				loading: false,
			}
		},
		components:{
			RankItem,
		},
		mounted(){
			this.getData();
		},
		methods:{
			getData(){
				this.loading = true;
				this.$axios('/activity/contest/rank?type=1').then(res =>{
					this.loading = false;
					let obj = res.data.data;
					console.log(res.data);
					this.avatar = obj.head;
					this.name = obj.name;
					this.rank = obj.rank;
					this.ranks = obj.ranks;
				}).catch(err =>{
					console.log(err);
				})
			}
		},
		filters:{
			avatar(url){
				return this.photoPrefix + url;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.loading{
		position: absolute;
	    top: 40%;
	    left: 50%;
	    transform: translateX(-50%);
	    width: 30px;
	    height: 30px;
	}
	.user-info{
		box-sizing: border-box;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 10px;
		border-bottom: 1px solid #DBDBDB;
		background: #F8F8F8;
	}
	.avatar-name{
		display: flex;
		align-items: center;
		img{
			width: 30px;
			height: 30px;
			margin-right: 10px;
			border-radius: 50%;
		}
		.user-name{
			display: inline-block;
			font-size: 14px;
			max-width: 200px;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		}
	}
	.user-rank{
		color: #656565;
	}
	@media screen and (max-width: 320px){
		.avatar-name>.user-name{
			max-width: 170px;
		}
	}
</style>