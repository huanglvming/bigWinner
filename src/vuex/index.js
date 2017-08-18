import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state.js'
// import mutations from './mutations.js'

Vue.use(Vuex)

// export default{
// 	state,
// 	mutations,
// }

const store = new Vuex.Store({
	state:{
		contest_id: 0,
		play_id: 0,
		support: 0,
		r1: 0,
		r2: 0,
		r3: 0,
		isActive: false,
		mask: false,
		date: '',
		blockTime: [],
		index: 0,
	},
	mutations:{
		changeDate(state,val){
			state.date = val;
		},
		changeBlockTime(state,arr){
			state.blockTime = arr;
		}
	}
});

export default store;