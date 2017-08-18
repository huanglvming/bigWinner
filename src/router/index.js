import Vue from 'vue'
import Router from 'vue-router'
import List from '../pages/List.vue'
import FbBet from '../pages/bet/FbBet.vue'
import BkBet from '../pages/bet/BkBet.vue'
import Yaya from "../components/Yaya"
import Football from "../components/Football.vue"
import Basketball from "../components/Basketball"
import Record from "../pages/Record.vue"
import RankList from "../pages/rank/RankList.vue"
import WinList from "../pages/rank/Win.vue"
import ProfitList from "../pages/rank/Profit.vue"

Vue.use(Router)

export default new Router({
  linkActiveClass: 'tab-active',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/list/football'
    },
    {
      path: '/list',
      name: 'List',
      component: List,
      children:[
      	{path: 'football',component: Football},
      	{path: 'basketball',component: Basketball},
      ]
    },
    {
      path: '/fbet',
      name: 'FbBet',
      component: FbBet
    },
    {
      path: '/bbet',
      name: 'BkBet',
      component: BkBet
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/ranklist',
      redirect: '/ranklist/profit',
      name: 'RankList',
      component: RankList,
      children:[
        {path: 'win',component: WinList},
        {path: 'profit',component: ProfitList},
      ]
    },
  ]
})
