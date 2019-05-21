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
Vue.filter('transformDate', function(value) { //时间处理
	let time = new Date(parseInt(value))
	let y = time.getFullYear()
	let m = time.getMonth() + 1
	let d = time.getDate()
	let hh = time.getHours()
	let mm = time.getMinutes()
	let ss = time.getSeconds()
	if (hh < 10) {
		hh = '0' + hh
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	if (ss < 10) {
		ss = '0' + ss
	}
	let specificTime = y + '.' + m + '.' + d + '.   ' + hh + ':' + mm
	// let timeNow=new Date(Date.now())
	// let y1 = timeNow.getFullYear()
	// let m1 = timeNow.getMonth() + 1
	// let d1 = timeNow.getDate()
	
	return specificTime
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
