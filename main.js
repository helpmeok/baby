import Vue from 'vue'
import App from './App'

import Service from './common/service/index.js'
Vue.config.productionTip = false
Vue.prototype.api = Service

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
