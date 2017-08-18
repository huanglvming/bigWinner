<template>
	<div class="bet-wrapper">
		<img src="../../static/img/loading.gif" class="loading" v-if="loading">
		<div class="black-mask" v-if="animate" @click='changeStatus()'></div>
		<div class="banner basketball">
			<router-link to="/list/basketball" tag="div" class="goback"></router-link>
			<div class="banner-item">
				<img :src="'https://roi.skst.cn/logo/'+homeTeam.logo">
				<p class="player">{{homeTeam.name}}(主队)</p>
			</div>
			<div class="banner-item">
				<p class="title">{{cup_name}}</p>
				<p class="vs" v-if="status === -1">{{home_scores}}:{{away_scores}}</p>
				<p class="vs" v-else>VS</p>
				<p class="date">{{start_time | formateTime}}</p>
			</div>
			<div class="banner-item">
				<img :src="'https://roi.skst.cn/logo/'+guestTeam.logo">
				<p class="player">{{guestTeam.name}}(客队)</p>
			</div>
		</div>
		<div class="bet-content" v-if="status === -1">
			<div class="game-over">比赛已结束，无法下单</div>
		</div>
		<div class="bet-content" v-else>
			<div class="bet-type" v-if="op">
				<div class="type-content">
					<div class="bet-type-title-container">
						<div class="bet-type-title">
							胜负
						</div>
					</div>
					<div class="bet-type-choose">
						<div class="choose-item" :class="{'already-bet':op_bets && op_support.win}" @click="itemClick($event,6)">
							<p class='item-title'>主队胜</p>
							<p class='item-roi'>赔率<span class='roi'>{{opObj.home_roi}}</span></p>
						</div>
						<div class="choose-item" :class="{'already-bet':op_bets && op_support.loose}" @click="itemClick($event,6)">
							<p class='item-title'>客队胜</p>
							<p class='item-roi'>赔率<span class='roi'>{{opObj.away_roi}}</span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="bet-type" v-if="jc">
				<div class="type-info" v-if="jcObj.handicap>0">—— 客队让{{jcObj.handicap | absolute}}分 ——</div>
				<div class="type-info" v-else>—— 主队让{{jcObj.handicap | absolute}}分 ——</div>
				<div class="type-content">
					<div class="bet-type-title-container">
						<div class="bet-type-title bet-handicap-wrapper">
							让分<p class="bet-handicap" v-if="jcObj.handicap>0">+{{jcObj.handicap}}</p>
							<p class="bet-handicap" v-else>{{jcObj.handicap}}</p>
						</div>
					</div>
					<div class="bet-type-choose">
						<div class="choose-item" :class="{'already-bet':jc_bets && jc_support.home}" @click="itemClick($event,7)">
							<p class='item-title'>主队胜</p>
							<p class='item-roi'>赔率<span class='roi'>{{jcObj.home_roi}}</span></p>
						</div>
						<div class="choose-item" :class="{'already-bet':jc_bets && jc_support.guest}" @click="itemClick($event,7)">
							<p class='item-title'>客队胜</p>
							<p class='item-roi'>赔率<span class='roi'>{{jcObj.away_roi}}</span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="bet-type" v-if="size">
				<div class="type-info">—— 全场比赛（含加时）两队得分总数 ——</div>
				<div class="type-content">
					<div class="bet-type-title-container">
						<div class="bet-type-title">
							大小球
						</div>
					</div>
					<div class="bet-type-choose">
						<div class="choose-item" :class="{'already-bet':size_support.big}" @click="itemClick($event,9)">
							<p class='item-title'>大于{{sizeObj.handicap}}分</p>
							<p class='item-roi'>赔率<span class='roi'>{{sizeObj.big_roi}}</span></p>
						</div>
						<div class="choose-item" :class="{'already-bet':size_support.small}" @click="itemClick($event,9)">
							<p class='item-title'>小于{{sizeObj.handicap}}分</p>
							<p class='item-roi'>赔率<span class='roi'>{{sizeObj.tiny_roi}}</span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="bet-type" v-if="oddeven">
				<div class="type-info">—— 全场比赛（含加时）两队得分总数 ——</div>
				<div class="type-content">
					<div class="bet-type-title-container">
						<div class="bet-type-title">
							单双球
						</div>
					</div>
					<div class="bet-type-choose">
						<div class="choose-item" :class="{'already-bet':oddeven_bets && oddeven_support.odd}" @click="itemClick($event,10)">
							<p class='item-title'>单数</p>
							<p class='item-roi'>赔率<span class='roi'>{{odd_roi}}</span></p>
						</div>
						<div class="choose-item" :class="{'already-bet':oddeven_bets && oddeven_support.even}" @click="itemClick($event,10)">
							<p class='item-title'>双数</p>
							<p class='item-roi'>赔率<span class='roi'>{{even_roi}}</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="order-wrapper" :class="{'order-active': animate}" v-if="status === 0">
			<div class="order-sup" v-show="!animate">
				<div>我的床币：<span>{{gold | conversion}}</span></div>
			</div>
			<div class="order-sup-vice" v-show="animate" @click='changeStatus()'>
				下单：{{this.order_text}}
			</div>
			<div class="order-content">
				<div class="content-info">
					<div class="info-wealth">
						我的床币：<span class="wealth-value">{{gold | conversion}}</span>
					</div>

					<div class="info-bet" v-if="bet_value>0">
						猜对可赢：<span class="win-value">{{parseInt(temp_rio*bet_value)}}</span>
					</div>
				</div>
				<div class="bet-items">
					<div class="bet-item" @click="betItem($event,500)">500</div>
					<div class="bet-item" @click="betItem($event,1000)">1000</div>
					<div class="bet-item" @click="betItem($event,5000)">5000</div>
				</div>
				<div class="order-sub">
					<input type="text" maxlength='6' onkeyup="value=value.replace(/[^\d]/g,'')" ng-pattern="/[^a-zA-Z]/"  class="bet-number" placeholder="请输入下单床币金额" v-model="bet_value">
					<div class="bet-button" @click="orderEvent()">下单</div>
				</div>
			</div>
		</div>
		<Popups v-show="mask" v-on:callOff="callOff" :type="tipsType" :msg="message"></Popups>
	</div>
</template>

<script>
	import jq from 'jquery';
	import Popups from '../../components/Mask.vue';
	export default{
		name: 'BkBet',
		components:{
			Popups,
		},
		data(){
			return{
				cup_id: 0,
				contest_id: 0,
				contest_type: 0,
				op: false,
				jc: false,
				opObj: {},
				jcObj: {},
				sizeObj: {},
				size: false,
				oddeven: false,
				even_roi: 0,
				odd_roi: 0,
				cup_name: '',
				start_time: '',
				homeTeam: {},
				guestTeam: {},
				gold: 0,
				status: 0,
				mask: false,
				animate: false,
				tipsType: 0,
				oddeven_bets: false,
				oddeven_support: {},
				op_bets: false,
				op_support: {},
				jc_bets: false,
				jc_support: {},
				size_bets: false,
				size_support: {},
				isActive: false,
				play_id: 0,
				r1: 0,
				r2: 0,
				r3: 0,
				support: 0,
				message: '',
				order_text: '',
				bet_value: '',
				temp_rio: 0,
				loading: false,
				baseURL: this.utils.urlPrefix,
				home_scores: 0,
				away_scores: 0,

			}
		},
		mounted(){
			this.$nextTick(() =>{
				this.contest_type = this.$route.query.contest_type;
				this.contest_id = this.$route.query.contest_id;
				this.getDetails();
			});
		},
		methods:{
			goback(){
				history.back(-1);
			},
			getDetails(){
				let vm = this;
				jq.ajax({
					url: vm.baseURL + '/activity/contest/odds',
					type: 'get',
					timeout: 1000,
					headers: {
						'ticket': localStorage.getItem('ticket')
					},
					data: {
						contest_id: this.contest_id,
						contest_type: this.contest_type,
					},
					beforeSend: function(){
						vm.loading = true;
					},
				})
				.done(function(res) {
					vm.loading = false;
					console.log(res);
					let obj = res.data;
					if(obj.contest){
						vm.status = obj.contest.status;
						vm.cup_name = obj.contest.cup_name;
						vm.start_time = obj.contest.start_time;
						vm.homeTeam = obj.contest.h_t;
						vm.guestTeam = obj.contest.a_t;
						vm.home_scores = obj.contest.home_scores;
						vm.away_scores = obj.contest.away_scores;
					}
					vm.gold = obj.gold;
					if(!obj.op){
						vm.op = false;
					}else{
						vm.op = true;
						vm.opObj = obj.op;
					}
					if(!obj.jc){
						vm.jc = false;
					}else{
						vm.jc = true;
						vm.jcObj = obj.jc;
					}
					if(!obj.size){
						vm.size = false;
					}else{
						vm.size = true;
						vm.sizeObj = obj.size;
						if(obj.size_bets){
							obj.size_bets.size_bets.forEach(function(item,index){
								if(item.support === 0){
									vm.size_support.big = true;
								}
								if(item.support === 1){
									vm.size_support.small = true;
								}
							});
						}
					}
					if(!obj.oddeven){
						vm.oddeven = false;
					}else{
						vm.oddeven = true;
						vm.even_roi = obj.oddeven.even_roi;
						vm.odd_roi = obj.oddeven.odd_roi;
					}
					if(obj.oddeven_bets){
						vm.oddeven_bets = true;
						obj.oddeven_bets.oddeven_bets.forEach(function(item,index){
							if(item.support === 0){
								vm.oddeven_support.odd = true;
							}
							if(item.support === 1){
								vm.oddeven_support.even = true;
							}
						});
					}
					if(obj.op_bets){
						vm.op_bets = true;
						obj.op_bets.op_bets.forEach(function(item,index){
							if(item.support === 0){
								vm.op_support.win = true;
							}
							if(item.support === 1){
								vm.op_support.loose = true;
							}
						});
					}
					if(obj.jc_bets){
						vm.jc_bets = true;
						obj.jc_bets.jc_bets.forEach(function(item,index){
							if(item.support === 0){
								vm.jc_support.home = true;
							}
							if(item.support === 1){
								vm.jc_support.guest = true;
							}
						});
					}
				})
				.fail(function(err) {
					console.log(err);
				});
				
			},
			itemClick(event,type){
				if(!jq(event.currentTarget).hasClass('already-bet') && this.status === 0){
					this.animate = true;
					this.isActive = true;
					jq('.choose-item').removeClass('choose-active');
					jq(event.currentTarget).addClass('choose-active');
					let $list = jq(event.currentTarget).parent('.bet-type-choose').children('.choose-item');
					let index = jq('.choose-active').index();
					this.contest_id = this.$route.query.contest_id;
					this.play_id = type;
					this.temp_rio = jq(event.currentTarget).find('.roi').text();
					switch(type){
						case 6:
							if(index === 0){
								this.order_text = this.homeTeam.name+'胜 (赔率'+this.opObj.home_roi+')';
							}else{
								this.order_text = this.guestTeam.name+'胜 (赔率'+this.opObj.away_roi+')';
							}
							break;
						case 7:
							if(index === 0){
								if(this.jcObj.handicap<0){
									this.order_text = this.homeTeam.name+'让'+Math.abs(this.jcObj.handicap)+'分 '+this.homeTeam.name+'胜 (赔率'+this.jcObj.home_roi+')';
								}else{
									this.order_text = this.guestTeam.name+'让'+Math.abs(this.jcObj.handicap)+'分 '+this.homeTeam.name+'胜 (赔率'+this.jcObj.home_roi+')';
								}
							}else{
								if(this.jcObj.handicap<0){
									this.order_text = this.homeTeam.name+'让'+Math.abs(this.jcObj.handicap)+'分 '+this.guestTeam.name+'胜 (赔率'+this.jcObj.home_roi+')';
								}else{
									this.order_text = this.guestTeam.name+'让'+Math.abs(this.jcObj.handicap)+'分 '+this.guestTeam.name+'胜 (赔率'+this.jcObj.home_roi+')';
								}
							}
							break;
						case 9:
							if(index === 0){
								this.order_text = '得分总数大于'+this.sizeObj.handicap+'分 (赔率'+this.sizeObj.big_roi+')';
							}else{
								this.order_text = '得分总数小于'+this.sizeObj.handicap+'分 (赔率'+this.sizeObj.tiny_roi+')';
							}
							break;
						case 10:
							if(index === 0){
								this.order_text = '得分总数为单数 (赔率'+this.odd_roi+')';
							}else{
								this.order_text = '得分总数为双数 (赔率'+this.even_roi+')';
							}
							break;
					}

					this.r1 = $list.eq(0).find('.roi').text();
					this.r2 = null;
					this.r3 = $list.eq(1).find('.roi').text();
					switch(index){
						case 0:
							this.support = 0;
							break;
						case 1:
							this.support = 1;
							break;
					}
				}else if(jq(event.currentTarget).hasClass('already-bet')){
					this.tipsType = 2;
					this.mask = true;
					this.message = '你已下注过了';
				}
			},
			changeStatus(){
				this.animate = !this.animate;
			},
			orderEvent(){
				let vm = this;
				if(jq('.bet-number').val()>this.gold){
					this.tipsType = 0;
					this.mask = true;
				}else if(jq('.bet-number').val()<100){
					vm.tipsType = 2;
					vm.mask = true;
					vm.message = "下单金额应大于100床币";
				}else if(parseInt(jq('.bet-number').val())>100000){
					vm.tipsType = 2;
					vm.mask = true;
					vm.message = "下单金额上限为100000床币";
				}else if(this.isActive && parseInt(jq('.bet-number').val())>=100 && this.status === 0){
					jq.ajax({
						url: vm.baseURL + '/activity/contest/bb/bet',
						type: 'post',
						headers: {
							'ticket': localStorage.getItem('ticket')
						},
						data: {
							contest_id: this.contest_id,
							play_id: this.play_id,
							support: this.support,
							r1: this.r1,
							r2: this.r2,
							r3: this.r3,
							bet: jq('.bet-number').val(),
							longbi: true
						},
						beforeSend: function(){
							vm.isActive = false;
							vm.loading = true;
						},
					})
					.done(function(res) {
						vm.isActive = true;
						vm.loading = false;
						console.log(res);
						if(res.code === 1000){
							vm.getDetails();
							vm.tipsType = 1;
							vm.mask = true;
						}else{
							vm.tipsType = 2;
							vm.mask = true;
							vm.message = res.msg;
						}
					})
					.fail(function() {
						vm.isActive = true;
						vm.loading = false;
						vm.tipsType = 2;
						vm.mask = true;
						vm.message = '网络连接超时~';
						console.log("error");
					});
				}else{
					vm.tipsType = 2;
					vm.mask = true;
					vm.message = "请检查下单信息";
				}
			},
			callOff(val){
				this.mask = false;
				this.animate = false;
			},
			betItem(event,val){
				jq('.bet-item').removeClass('bet-item-active');
				jq(event.currentTarget).addClass('bet-item-active');
				this.bet_value = val;
			},
		},
		filters:{
			formateTime(utc){
				var date = new Date(utc);
				let month = (date.getMonth()+1<10)?('0'+(date.getMonth()+1)):date.getMonth()+1;
				let day = (date.getDate()<10)?('0'+date.getDate()):date.getDate();
				let hour = date.getHours()>10?date.getHours():'0'+date.getHours();
				let min = date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes();
				let str = month+'-'+day+' '+hour+':'+min;
				return str;
			},
			absolute(val){
				return Math.abs(val);
			},
			conversion(val){
				return parseInt(val);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bet-wrapper{
		overflow: hidden;
		overflow-y: scroll;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #161A23;
	}
	.banner{
		position: relative;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 150px;
		overflow: hidden;
		color: white;
		.banner-item{
			flex: 1;
			overflow: hidden;
		}
	}
	.goback{
		z-index: 29;
		position: absolute;
	    top: 6px;
	    left: 6px;
	    width: 30px;
	    height: 30px;
	    border-radius: 50%;	    
	    background: url("../../static/img/nav.png") no-repeat;
	    background-size: 70%;
	    background-position: center;
	    background-color: rgba(0,0,0,0.4);
	}
	.banner-item{
		flex: 1;
	}
	.basketball{
		background: url("../../static/img/bbh.png") no-repeat;
		background-size: 100% 100%;
	}
	.football{
		background: url("../../static/img/fbh.png") no-repeat;
		background-size: 100% 100%;
	}
	.bet-type{
		position: relative;
		margin-bottom: 36px;
	}
	.bet-content{
		width: 94%;
		margin: 0 auto;
		margin-top: 30px;
		color: white;
	}
	.type-content{
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
	}
	.type-info{
		position: absolute;
		top: -32px;
		width: calc(100% - 34px);
    	margin-left: 34px;
		text-align: center;
		font-size: 10px;
		line-height: 36px;
		color: #6A6E77;
	}
	.bet-type-title-container{
		height: 56px;
	}
	.bet-type-title{
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		font-size: 12px;
		margin-right: 14px;
		word-wrap: break-word;
		.bet-handicap{
		    position: absolute;
		    left: 50%;
		    white-space: nowrap;
		    transform: translateX(-50%);
		}
	}
	.bet-handicap-wrapper{
		padding-bottom: 14px;
	}
	.bet-type-choose{
		display: flex;
		width: calc(100% - 34px);
	}
	.choose-item{
		flex: 1;
		height: 56px;
		background: #1E283B;
	}
	.choose-active{
		background: #1F5CB5;
	}
	.choose-item+.choose-item{
		border-left: 2px solid #161A23;
	}
	.item-title{
		margin-top: 12px;
		margin-bottom: 2px;
	}
	.item-roi{
		font-size: 10px;
	}
	.banner-item>img{
		height: 60px;
	}
	.player{
		white-space: nowrap;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.order-wrapper{
		z-index: 19;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #182031;
		transform: translateY(170px);
		transition: all 500ms linear;
	}
	.order-active{
		transform: translateY(0px) !important;
	}
	.order-sup{
		display: flex;
		justify-content: space-between;
		height: 30px;
		padding: 0 10px;
		line-height: 30px;
		text-align: left;
		color: white;
		font-size: 10px;
		background: #1C2435;
		span{
			color: #FFC348;
		}
	}
	.order-sub{
		display: flex;
		justify-content: space-around;
		box-sizing: border-box;
		height: 60px;
		align-items: center;
	}
	.bet-number{
		width: 4.71rem;
	    height: 32px;
	    padding: 5px;
	    border: none;
	    background: #F2F2F2;
	    text-align: center;
	    border-radius: 4px;
	    color: #333;
	    font-size: 14px;
	}
	.bet-number::-webkit-input-placeholder{
		color: #AAAAAA;
	}
	.bet-button{
		display: block;
		width: 2rem;
		height: 42px;
		line-height: 42px;
		border: none;
		background: #FF929F;
		color: white;
		font-size: 10px;
		border-radius: 4px;
		font-size: 14px;
	}
	.already-bet{
		background-image: url("../../static/img/selected.png");
		background-position-x: 98%;
		background-position-y: 3px;
		background-repeat: no-repeat;
		background-size: 20px;
		background-color: #0A0D12;
		color: #A1A5A8;
	}
	.game-over{
		position: absolute;
	    left: 0;
	    top: 160px;
	    width: 100%;
	    line-height: 2;
	    font-size: 10px;
		background: #292D36;
	}
	.order-sup-vice{
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #333;
		background: #F8F8F8;
	}
	.content-info{
		display: flex;
	    justify-content: space-between;
	    padding: 0 10px;
	    height: 30px;
	    line-height: 30px;
	    color: #666;
	}
	.bet-items{
		display: flex;
	    justify-content: space-around;
	    width: 240px;
	    height: 80px;
	    margin: 0 auto;
	    align-items: center;
	}
	.bet-item{
		width: 60px;
		height: 60px;
		line-height: 60px;
		border-radius: 50%;
		background: #DCDCDC;
		color: white;
		text-align: center;
	}
	.bet-item-active{
		background: #FFBD48;
	}
	.order-content{
		background: white;
	}
	.black-mask{
		z-index: 9;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	.wealth-value,.win-value{
		color: #FFC348;
	}
	.loading{
		position: absolute;
	    z-index: 99;
	    top: 30%;
	    left: 50%;
	    transform: translateX(-50%);
	    width: 30px;
	}
	.vs{
		font-size: 16px;
	    line-height: 1.8;
	    font-weight: bold;
	}
</style>