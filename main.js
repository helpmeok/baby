import Vue from 'vue'
import App from './App'

import Service from './common/service/index.js'
Vue.config.productionTip = false
Vue.prototype.api = Service
import empty from './components/empty-data.vue'
import uniLoadMore from './components/uni-load-more.vue';
Vue.component('empty', empty)
Vue.component('uniLoadMore', uniLoadMore)
import uniTag from './components/uni-tag.vue';
Vue.component('uniTag', uniTag)
import articleItem from './components/article-item.vue';
Vue.component('articleItem', articleItem)
import articleOperate from './components/article-operate.vue';
Vue.component('articleOperate', articleOperate)
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
