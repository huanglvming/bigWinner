<template>
	<div>
		<div class="list-block" :style="{height: viewHeight+'px'}" @scroll='scrollFn($event)'>
			<img src="../static/img/loading.gif" class="loading" v-if="loading">
			<div class='list-scroll'>
				<div v-for="i in contests.length">
					<div class="block-item" v-if="contests[i-1]">
						<div class="block-time">{{blockTime[i-1]}}</div>
						<router-link v-if="category === 0" :to="{path:'/fbet',query:{contest_id:item.contest_id,contest_type:category}}" tag="div" v-for="(item,key) in contests[i-1]" :key="key">
							<ListItem :obj="item"></ListItem>
						</router-link>
						<router-link v-if="category === 1" :to="{path:'/bbet',query:{contest_id:item.contest_id,contest_type:category}}" tag="div" v-for="(item,key) in contests[i-1]" :key="key">
							<ListItem :obj="item"></ListItem>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import jq from 'jquery';
	import ListItem from './ListItem';
	export default{
		name: 'Listblock',
		components:{
			ListItem,
		},
		props: ['category'],
		data(){
			return {
				firstLoad: true,
				viewHeight: 0,
				counter: 0,
				arrLenth: 0,
				formerCounter: 0,
				formerDate: '',
				scrollTop: 0,
				contests: [],
				date: '',
				blockAnchor: [],
				blockTime: [],
        blockTime_fb: [],
        blockTime_bb: [],
				currentdate: this.GetDateStr(0),
				loading: false,
				timer: null,
				urlPrefix: this.utils.urlPrefix,
			}
		},
		created(){
			this.viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
			this.viewHeight = this.viewHeight - 40;
			console.log('viewHeight:'+this.viewHeight);
		},
		mounted(){
			this.$nextTick(() =>{
				this.getData(this.category,this.currentdate);
			});
		},
		updated(){
			this.getAnchor();
			this.judgeDate(this.scrollTop);
		},
		watch:{
			date(){
				this.$store.commit('changeDate',this.date);
			},
			blockTime(){
				this.$store.commit('changeBlockTime',this.blockTime);
			},
		},
		methods:{
			getData(category,date){
				let vm = this;
				this.$nextTick(() =>{
					jq.ajax({
						url: this.urlPrefix + '/activity/contest/list',
						type: 'get',
						timeout: 3000,
						headers: {
							'ticket': vm.utils.request('ticket')
						},
						data: {
							contest_type: category,
							time: date
						},
						beforeSend: function(){
							vm.loading = true;
						},
					})
					.done(res =>{
						this.loading = false;
						let obj = res.data;
						this.counter ++;
						this.currentdate = this.GetDateStr(this.counter);
						console.log('date:'+date);
						console.log(obj);
						if(obj.contests && obj.contests.length>0){
							this.blockTime.push(date);
							if(category === 0){
							  this.blockTime_fb.push(date);
              }else{
							  this.blockTime_bb.push(date);
              }
							let tempArr = new Array();
							obj.contests.forEach(function(item){
								tempArr.push(item);
							});
							let tempContests = new Array();
							tempContests.push(tempArr);
							this.contests = this.contests.concat(tempContests);
						}
						if(this.counter < 5){
							this.foo();
						}
					})
					.fail(function() {
						console.log("error");
					});
				});
			},
			getFormerData(category){
				this.formerCounter -= 1;
				this.formerDate = this.GetDateStr(this.formerCounter);
				if(!this.loading){
					let vm = this;
					this.$nextTick(() =>{
						jq.ajax({
							url: this.urlPrefix + '/activity/contest/list',
							type: 'get',
							headers: {
								'ticket': vm.utils.request('ticket')
							},
							timeout: 3000,
							data: {
								contest_type: category,
								time: this.formerDate
							},
							beforeSend: function(){
								vm.loading = true;
							},
						})
						.done(res =>{
							this.loading = false;
							let obj = res.data;
							console.log("formerDate:"+this.formerDate);
							console.log(obj);
							if(obj.contests && obj.contests.length>0){
								this.date = this.formerDate;
								let tempArr = new Array();
								tempArr.push(this.formerDate);
								this.blockTime = tempArr.concat(this.blockTime);
								tempArr = [];
								obj.contests.forEach(function(item){
									tempArr.push(item);
								});
								let tempContests = new Array();
								tempContests.push(tempArr);
								this.contests = tempContests.concat(this.contests);
								document.querySelector(".list-block").scrollTop = 1;
							}
						})
						.fail(function() {
							this.loading = false;
						});
					});
				}
			},
			foo(){
				if(!this.loading){
					this.getData(this.category,this.currentdate);
				}
			},
			GetDateStr(AddDayCount) {
				var dd = new Date();
				dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
				var y = dd.getFullYear();
				var m = (dd.getMonth()+1<10)?('0'+(dd.getMonth()+1)):(dd.getMonth()+1);
				var d = (dd.getDate()<10)?('0'+dd.getDate()):dd.getDate();
				return y+"-"+m+"-"+d;
			},
			scrollFn($event){
				this.scrollTop = $event.currentTarget.scrollTop;
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.judgeDate(this.scrollTop);
				},200);
				if(this.scrollTop === 0 && !this.loading && this.formerCounter>-8){
					this.getFormerData(this.category);
				}else if((document.querySelector('.list-scroll').scrollHeight - $event.currentTarget.scrollTop === this.viewHeight) && !this.loading && this.counter<8){
					this.getData(this.category,this.currentdate);
				}
			},
			judgeDate(e){
				var vm = this;
				if(vm.blockAnchor.length>0){
					for(var i=vm.blockAnchor.length;i>=0;i--){
						if(e > vm.blockAnchor[i-1] - 5){
							vm.index = i;
							vm.date = vm.blockTime[i];
							break;
						}else if(e < vm.blockAnchor[0]){
							vm.date = vm.blockTime[0];
						}
					}
				}else{
					vm.getAnchor();
				}
			},
			getAnchor(){
				var temp = 0,vm = this;
				this.blockAnchor = [];
				var arr = jq(".block-item");
				for(var i=0;i<arr.length;i++){
					temp = temp + arr[i].scrollHeight;
					vm.blockAnchor.push(temp);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list-block{
		width: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling : touch;
	}
	.list-block::-webkit-scrollbar{
	    width: 0;
	    height: 0;
	    background-color: transparent;
	}
	.list-scroll{
		height: 100%;
	}
	.block-time,.date-container{
		width: 100%;
    	height: 30px;
    	line-height: 30px;
    	text-align: center;
    	background-color: #EFEFEF;
	}
	.date-container{
		position: fixed;
		left: 0;
		top: 40px;
		z-index: 39;
		color: #2c3e50;
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
