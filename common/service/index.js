// const __api = 'https://wkf.088wanmei.com';
const __api = 'http://59.61.216.123:18980/jeezero-boblbee-app/v1';

function Request() {

	this.m_send = function(url, method, data, onok, onno, complete) {
		let access_token = uni.getStorageSync('access_token');
		var _data = {
			url: __api + url,
			method: method,
			header: {
				// Authorization: token,
				authorization: access_token,
				appname: "boblbee"
			},
			data: data,
			success(res) {
				if (res.data.code == 0) {
					onok ? onok(res.data) : null
				} else if (res.data.code >= 10112 && res.data.code <= 10115) {
					uni.removeStorageSync('access_token')
					console.log(getCurrentPages())
					var route = "/" + getCurrentPages()[getCurrentPages().length - 1].route
					let queryObj = JSON.stringify(getCurrentPages()[getCurrentPages().length - 1].options)
					uni.redirectTo({
						url: "/pages/index/index?redirect=" + route + "&queryObj=" + queryObj,
						success: () => {
							uni.showToast({
								title: res.data.message,
								icon: "none",
								success: () => {}
							})
						}
					})
				} else {
					console.log(res)
					uni.showToast({
						title: res.data.message,
						icon: "none",
						duration: 2000
					})
					onno ? onno(res.data) : null
				}
			},
			fail(err) {
				uni.showToast({
					title: err.data.message,
					icon: "none",
					duration: 2000
				})
				console.log(err)
				onno ? onno(err) : null
			},
			complete: () => {
				complete ? complete() : null
			}
		}
		if (method == "Post" || method == "PUT") {
			_data.header = {
				'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
				Authorization: uni.getStorageSync('access_token')
			}
		}

		uni.request(_data)
	}
}
const _req = new Request()
module.exports = {
	host: __api,
	home: {
		wx_login: function(d, onok, onno) { //微信登陆获取参数
			let _url = "/miniApp/wxlogin";
			_req.m_send(_url, "Post", d, onok, onno);
		},
		get_recommend_article: function(d, onok, onno) { //“首页”模块的推荐数据
			let _url = "/home/queryRecommendArticle";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_foucs_article: function(d, onok, onno) { //“首页”模块的关注数据
			let _url = "/home/queryFocusArticle";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_hotVip_List: function(d, onok, onno) { //APP“首页”模块，点击“火”图标，显示推送4个大V账号。这4个大V账号是获取转发数最多的四个，如果无转发数，则以原创数最多排序。
			let _url = "/home/getHotVipList";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		search:{
			get_query_list: function(d, onok, onno) { //获取APP“搜索”模块的热门问题列表。
				let _url = "/search/query";
				_req.m_send(_url, "Get", d, onok, onno);
			},
			get_response_list: function(d, onok, onno) { //根据输入的关键字搜索对应的内容列表
				let _url = "/search/searchPageList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		},
		hotVip: {
			get_info: function(d, onok, onno) { //APP“首页”模块，点击“火”的图标，进行大V列表，再点击某个大V进入大V主界面的顶部大V信息数据。
				let _url = "/home/getVipInfo";
				_req.m_send(_url, "Get", d, onok, onno);
			},
			get_all_list: function(d, onok, onno) { //APP“首页”模块，点击导航右侧“火”的图标，点击“更多”按钮，获取大V账号数据列表，且带首字字母索引，一次性获取完所有的大V数据
				let _url = "/home/getVipPageList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
			toggle_followed: function(d, onok, onno) { //关注或取消关注大V用户
				let _url = "/home/attentionVipOrNo";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			get_article: function(d, onok, onno) { //APP“首页”模块，点击“火”的图标，进行大V列表，再点击某个大V进入大v主界面，底部4种分类数据列表（最新发布、转发最多、评论最多、点赞最多）
				let _url = "/home/getVipArticlePageList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		},
		article: {
			get_detail: function(d, onok, onno) { //内容相关功能，获取内容详情数据时用
				let _url = "/article/getArticleDetail";
				_req.m_send(_url, "Get", d, onok, onno);
			},
			toggle_collect: function(d, onok, onno) { //内容相关功能，收藏或取消收藏文章
				let _url = "/article/faOrNoArticle";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			toggle_praise: function(d, onok, onno) { //内容相关功能，点赞或取消点赞该文章
				let _url = "/article/praiseArticleOrNo";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			get_comment_list: function(d, onok, onno) { //内容相关功能，获取文章评论列表
				let _url = "/article/queryArticleCommentPageList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		}
	},
	helper: {
		get_query_list: function(d, onok, onno) { //获取APP“助手”模块的热门问题列表。
			let _url = "/search/query";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_qaset_list: function(d, onok, onno) { //APP“助手”的问题集列表
			let _url = "/search/qaset";
			_req.m_send(_url, "Get", d, onok, onno);
		},
	},
	center: {
		user: {
			get_detail: function(d, onok, onno) { //“我的”模块获取用户资料
				let _url = "/my/getDetail";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		},
		address: {
			add: function(d, onok, onno) { //收货地址添加
				let _url = "/my/addAddress";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			update: function(d, onok, onno) { //收货地址修改
				let _url = "/my/updateAddress";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			deleted: function(d, onok, onno) { //收货地址删除
				let _url = "/my/delAddress";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			get_list: function(d, onok, onno) { //获取收货地址列表
				let _url = "/my/getAddressList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
			get_region: function(d, onok, onno) { //获取省市县街道的接口
				let _url = "/my/getRegion";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		},
		record: {
			get_list: function(d, onok, onno) { //APP“我的”模块获取用户的浏览记录列表
				let _url = "/my/queryHistoryList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		},
		collect: {
			get_list: function(d, onok, onno) { //APP“我的”模块获取用户收藏的文章数据
				let _url = "/my/queryFaArticlePageList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		}

	},
	classify: {
		get_top_category: function(d, onok, onno) { //获取分类头部数据列表
			let _url = "/category/getTopCategory";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_sub_category: function(d, onok, onno) { //获取某个分类下的子类
			let _url = "/category/getSubCategory";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_category_article: function(d, onok, onno) { //APP“分类”模块，点击某个小类进入该小类详情主界面，底部4种分页菜单列表（最新发布、转发最多、评论最多、点赞最多）
			let _url = "/category/queryArticleByCategory";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_sub_category_header: function(d, onok, onno) { //获取某个小类的详情头部信息
			let _url = "/category/getSubCategoryHeader";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		toggle_followed: function(d, onok, onno) { //关注或取消关注某分类
			let _url = "/category/attentionCategoryOrNo";
			_req.m_send(_url, "Post", d, onok, onno);
		},
	}
}
