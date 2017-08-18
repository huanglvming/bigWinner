<template>
	<div class="record-wrapper">
		<img src="../static/img/loading.gif" class="loading" v-if="loading">
		<div class="user-info">
			<div class="goback" @click="goback()"></div>
			<div class="user-avatar">
				<img :src="'https://avatar2.chuangshangapp.com/'+userAvatar">
			</div>
			<div class="user-name">{{userName}}</div>
			<div class="user-id">ID:{{userId}}</div>
		</div>
		<div class="record-content" :style="{height: viewHeight+'px'}"  @scroll='scrollFn($event)'>
			<div class="record-info">
				<div class="flex-box">
					<div class="flex-item">
						<div>总成绩</div>
						<div>
							<div style="color:#DF0B08;display:inline-block;margin-right: 1em;">{{userInfo.win_count}}赢</div>
							<div style="color: #1CE71B;display:inline-block;">{{userInfo.loss_count}}输</div>
						</div>
					</div>
				</div>
				<div class="flex-box">
					<div class="flex-item">
						<div>总排名:</div>
						<div>{{userInfo.rank}}</div>
					</div>
					<div class="flex-item">
						<div>胜率:</div>
						<div v-if="userInfo.win_count===0 && userInfo.loss_count===0">--</div>
						<div v-else>{{(userInfo.winning * 100).toFixed(2)}}%</div>
					</div>
				</div>
				<div class="flex-box">
					<div class="flex-item">
						<div>连胜记录:</div>
						<div v-if="userInfo.win_count===0 && userInfo.loss_count===0">--</div>
						<div v-else>{{userInfo.con_win_count}}</div>
					</div>
					<div class="flex-item">
						<div>连黑记录:</div>
						<div v-if="userInfo.win_count===0 && userInfo.loss_count===0">--</div>
						<div v-else>{{userInfo.con_loss_count}}</div>
					</div>
				</div>
				<div class="flex-box">
					<div class="flex-item">
						<div>投资回报率:</div>
						<div v-if="userInfo.win_count===0 && userInfo.loss_count===0">--</div>
						<div v-else>{{(userInfo.roi * 100).toFixed(2)}}%</div>
					</div>
					<div class="flex-item">
						<div>总竞猜:</div>
						<div v-if="userInfo.win_count===0 && userInfo.loss_count===0">--</div>
						<div v-else>{{userInfo.bet_count}}</div>
					</div>
				</div>
			</div>
			<div class="record-list">
				<div class="nodata" v-if="nodata">暂无下单记录</div>
				<RecordItem v-else v-for="(item,key) in contents" :key="key" :obj="item.contest" :createTime="item.format_create_time"></RecordItem>
			</div>
		</div>
	</div>
</template>

<script>
	import RecordItem from "../components/RecordItem.vue"
	export default{
		name: 'Record',
		data(){
			return{
				contents: [],
				userInfo: {},
				userName: '',
				userAvatar: '',
				userId: '',
				nodata: false,
				startId: 0,
				viewHeight: 0,
				scrollHeight: 0,
				loading: false,
				target_id: 0,
				first_load: true,
			}
		},
		components:{
			RecordItem,
		},
		created(){
			this.viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
			this.viewHeight = this.viewHeight - 140;
			this.target_id = this.$route.query.target_id;
		},
		mounted(){
			this.$nextTick(()=>{
				if(this.target_id){
					this.getData('',this.target_id);
					this.getUserInfo(this.target_id);
					console.log("target_id:"+this.$route.query.target_id);
				}else{
					this.getData();
					this.getUserInfo();
				}
			});
		},
		updated(){
			this.scrollHeight = document.querySelector(".record-content").scrollHeight;
		},
		methods:{
			getData(s_id,t_id){
				this.$axios('activity/contest/bet/list',{
					params:{
						start_id: s_id || '',
						target_id: t_id || '',
					}
				}).then(res =>{
					this.loading = false;
					console.table(res.data);
					let obj = res.data.data;
					this.startId = obj.startId;
					if(obj.contents){
						this.first_load = false;
						obj.contents.forEach((item)=>{
							this.contents.push(item);
						});
					}else if(this.first_load){
						this.nodata = true;
					}
				}).catch(err =>{
					console.log(err);
				})
			},
			getUserInfo(t_id){
				this.$axios('activity/contest/user/bet/info',{
					params:{
						target_id: t_id || ''
					}
				}).then(res =>{
					console.table(res.data);
					let obj = res.data;
					this.userInfo = obj.data.statistics;
					this.userName = obj.data.user.name;
					this.userAvatar = obj.data.user.head;
					this.userId = obj.data.user.long_no;
				}).catch(err =>{
					console.log(err);
				})
			},
			goback(){
				history.back(-1);
			},
			scrollFn($event){
				if(this.scrollHeight - $event.currentTarget.scrollTop === this.viewHeight){
					if(this.startId != -1){
						this.loading = true;
						this.getData(this.startId);
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.record-wrapper{
		overflow: hidden;
		background-color: #F5F5F5;
	}
	.user-info{
		position: relative;
		width: 100%;
		height: 100px;
		padding: 20px 0;
		text-align: center;
		background: url("../../static/img/bg.png") no-repeat;
		background-size: 100%;
		color: white;
	}
	.goback{
		position: absolute;
	    top: 6px;
	    left: 6px;
	    width: 30px;
	    height: 30px;
	    border-radius: 50%;
	    background: url("../static/img/nav.png") no-repeat;
	    background-size: 70%;
	    background-position: center;
	    background-color: rgba(0,0,0,0.4);	    
	}
	.user-avatar{
		position: relative;
		left: 50%;
		width: 60px;
		height: 60px;
		border: 4px solid rgba(255,255,255,0.4);
		border-radius: 50%;
		transform: translateX(-50%);
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.user-name{
		margin: 5px 0;
		font-size: 14px;
		font-weight: bold;
	}
	.user-id{
		font-size: 12px;
	}
	.record-content{
		box-sizing: border-box;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		padding-top: 10px;
	}
	.record-info{
		box-sizing: border-box;
		width: 94%;
		padding: 10px;
		background: white;
		margin: 0 auto;
		margin-bottom: 10px;
		border-radius: 5px;
		border: 1px solid #DCDCDC;
		font-size: 12px;
		color: #153C5D;
	}
	.flex-box,.flex-item{
		display: flex;
		justify-content: space-between;
	}
	.flex-box{
		margin-bottom: 10px;
	}
	.flex-item{
		flex: 1;
	}
	.flex-item+.flex-item{
		margin-left: 8%;
	}
	.nodata{
		background: white;
	    line-height: 100px;
	    color: #c4c4c4;
	}
	.loading{
		position: absolute;
	    top: 40%;
	    left: 50%;
	    width: 30px;
	    transform: translateX(-50%);
	    z-index: 29;
	}
</style>