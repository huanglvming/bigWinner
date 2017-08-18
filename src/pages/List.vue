<template>
	<div class="list-wrapper">
		<div class="list-tab">
			<router-link to='/list/football' class="tab-item" tag="div"><span>足球</span></router-link>
			<router-link to='/list/basketball' class="tab-item" tag="div"><span>篮球</span></router-link>
			<router-link to='/record' class="record" tag="div">
				<img :src="'https://avatar2.chuangshangapp.com/'+userAvatar">
			</router-link>
			<router-link to='/ranklist' class="ranklist" tag="div">
				<img src="../static/img/icon-rank.png">
			</router-link>
		</div>
		<div class="list-content">
			<div class="date">{{date}}</div>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
			<!--<router-view></router-view>-->
		</div>
	</div>
</template>

<script>
	export default{
		name: 'List',
		data(){
			return{
				userAvatar: '',
				basketball: false,
				football: true,
				i: 0,
			}
		},
		computed:{
			date(){
				return this.$store.state.date;
			},
			index(){
				return this.$store.state.index;
			},
		},
		mounted(){
			this.getUserInfo();
		},
		methods:{
		  tab(category){
		    if(category === 0){
		      this.$router.push()
        }else{

        }
      },
			getUserInfo(){
				this.$axios('activity/contest/user/bet/info').then(res =>{
					console.table(res.data);
					let obj = res.data;
					this.userAvatar = obj.data.user.head;
				}).catch(err =>{
					console.log(err);
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
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
	.list-tab{
		display: flex;
		width: 60%;
		margin: 0 auto;
		height: 40px;
		line-height: 40px;
		background-color: white;
	}
	.tab-item{
		flex: 1;
		span{
			color: #2c3e50;
			border-bottom: none;
		}
	}
	.tab-active>span{
		padding-bottom: 3px;
		color: #FFBB8C;
		border-bottom: 2px solid #FFBB8C;
	}
	.list-content{
		position: relative;
		left: 0;
		top: 0;
		width: 100%;
	}
	.dynamic-date{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		background-color: #EFEFEF;
		z-index: 9;
	}
	.list-scroll{
		position: relative;
		left: 0;
		top: 0;
		width: 100%;
		overflow-y: scroll;
	}
	.list-scroll::-webkit-scrollbar{
	    width: 0;
	    height: 0;
	    background-color: transparent;
	}
	.record{
		position: absolute;
		left: 12px;
		top: 5px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		img{
			width: 100%;
			border-radius: 50%;
		}
	}
	.ranklist{
		position: absolute;
		right: 12px;
		top: 5px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		img{
			height: 100%;
			border-radius: 50%;
		}
	}
</style>
