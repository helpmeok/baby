import Vue from 'vue'
import App from './App'

import Service from './common/service/index.js'
Vue.config.productionTip = false
Vue.prototype.api = Service
import empty from './components/empty-data.vue'
import uniLoadMore from './components/uni-load-more.vue';
Vue.component('empty', empty)
Vue.component('uniLoadMore', uniLoadMore)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
