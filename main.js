import './common/util/aldSdk/ald-stat.js' //接入阿拉丁统计数据
// 接入友盟统计
// import uma from 'umtrack-wx'; // 开发微信小程序时导入此模块
// uma.init({
// 	appKey: '5e565bf69f9a0a410a2b10bc',
// 	useOpenid: true,
// 	autoGetOpenid: true,
// 	debug: true
// });

import Vue from 'vue'
import App from './App'
import filters from './common/util/filters.js'; //过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
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
import cuCustom from './components/cu-custom.vue' //自定义导航栏
Vue.component('cu-custom', cuCustom)
import uParse from './components/un-parse/un-parse.vue' //自定义导航栏
Vue.component('u-Parse', uParse)
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
