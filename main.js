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
Vue.filter('imgConversion', function(value) { //过滤富文本的图片问题
	if (!value) return ''
	value = value.replace(/<img/g, '<img style="max-width:100%;"')
	return value
})
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
