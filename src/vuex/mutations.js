export default{
	changeDate(state,val){
		console.log("已经触发了mutation");
		state.date = val;
	},
	changeBlockTime(state,arr){
		state.blockTime = arr;
	}
}