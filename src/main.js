// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import utils from './assets/js/utils.js'
import store from './vuex'

Vue.use(infiniteScroll)

const _ticket = utils.request('ticket');
console.log("ticket:"+_ticket);
localStorage.setItem('ticket', _ticket);

const https = axios.create({
	baseURL: utils.urlPrefix,
	timeout: 3000,
	headers: {
		ticket: _ticket,
	}
});
Vue.prototype.$axios = https;
Vue.prototype.utils = utils;



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
