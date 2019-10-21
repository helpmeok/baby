// const __api = 'http://59.61.216.123:18980/jeezero-boblbee-app/v1';
// const __api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/v1';//开发服务器
// const __api = 'https://beta.jeezero.com:18980/jeezero-boblbee-app/v1';//仿正式服务器地址
const __api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/v1';//正式服务器

function Request() {
	this.m_send = function(url, method, data, onok, onno, complete) {
		let access_token = uni.getStorageSync('access_token');
		let system_info = uni.getSystemInfoSync()
		var _data = {
			url: __api + url,
			method: method,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				authorization: access_token,
				appName: "boblbee",
				devicePlatform: 2,
				deviceModel: system_info.model,
				appVersion: system_info.version,
				deviceOs: system_info.system,
				deviceUuid: ""
			},
			data: data,
			success(res) {
				if (res.data.code == 0) {
					onok ? onok(res.data) : null
				} else if (res.data.code >= 10112 && res.data.code <= 10115 || res.data.code == 10103 || res.data.code == 10105) {
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
				} else if (res.data.code == 10110) {
					console.log(res)
					if (res.data.message) {
						uni.showToast({
							title: "请重新点击登录",
							icon: "none",
							duration: 2000
						})
					}
					uni.removeStorageSync('access_token')
					uni.removeStorageSync('wxSessionKey')
					onno ? onno(res.data) : null
				} else {
					console.log(res)
					if (res.data.message) {
						uni.showToast({
							title: res.data.message,
							icon: "none",
							duration: 2000
						})
					}
					onno ? onno(res.data) : null
				}
			},
			fail(err) {
				if (res.data.message) {
					uni.showToast({
						title: err.data.message,
						icon: "none",
						duration: 2000
					})
				}
				console.log(err)
				onno ? onno(err) : null
			},
			complete: () => {
				complete ? complete() : null
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
			_req.m_send(_url, "POST", d, onok, onno);
		},
		get_adv: function(d, onok, onno) {
			let _url = "/adv/getAdv";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_wx_mobile: function(d, onok, onno) { //微信小程序获取手机号码，调用的接口
			let _url = "/miniApp/getPhone";
			_req.m_send(_url, "POST", d, onok, onno);
		},
		get_wx_sessionKey: function(d, onok, onno) {
			let _url = "/miniApp/code2SessionKey";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		bind_mobile: function(d, onok, onno) { //登陆界面绑定手机号用
			let _url = "/setting/updatePhone";
			_req.m_send(_url, "POST", d, onok, onno);
		},
		get_recommend_article: function(d, onok, onno) { //“首页”模块的推荐数据
			let _url = "/home/queryRecommendArticle";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_foucs_article: function(d, onok, onno) { //“首页”模块的关注数据
			let _url = "/home/queryFocusArticle";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_hotVip_List: function(d, onok, onno) { //APP“首页”模块，点击“火”图标，显示推送4个大V账号。这4个大V账号是获取转发数最多的四个，如果无转发数，则以原创数最多排序。
			let _url = "/home/getHotVipList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_tag_list: function(d, onok, onno) { //【首页】 获取所有标签列表
			let _url = "/home/getTagList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_user_tag_list: function(d, onok, onno) { //【首页】 获取用户已选标签
			let _url = "/home/getUserTagList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		save_tag: function(d, onok, onno) { //【首页】 用户保存标签
			let _url = "/home/saveUserTagList";
			_req.m_send(_url, "POST", d, onok, onno);
		},
		get_chanel_list: function(d, onok, onno) { //【首页】 获取频道列表(暂时没用)
			let _url = "/home/getChanelList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_chanel_add_list: function(d, onok, onno) { //【首页】 获取可添加频道列表
			let _url = "/home/getChanelListForAdd";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_user_chanel_list: function(d, onok, onno) { //【首页】 获取用户已选的频道列表
			let _url = "/home/getUserChanelList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		save_chanel: function(d, onok, onno) { //【首页】 保存用户选择的频道列表
			let _url = "/home/saveUserChanelList";
			_req.m_send(_url, "POST", d, onok, onno);
		},
		get_article_by_chanelId:function(d, onok, onno) { //【首页】 根据频道id获取内容数据
			let _url = "/home/getArticleByChannelId";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		search: {
			get_query_list: function(d, onok, onno) { //获取APP“搜索”模块的热门问题列表。
				let _url = "/search/query";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_response_list: function(d, onok, onno) { //根据输入的关键字搜索对应的内容列表
				let _url = "/search/searchPageList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		},
		hotVip: {
			get_info: function(d, onok, onno) { //APP“首页”模块，点击“火”的图标，进行大V列表，再点击某个大V进入大V主界面的顶部大V信息数据。
				let _url = "/home/getVipInfo";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_all_list: function(d, onok, onno) { //APP“首页”模块，点击导航右侧“火”的图标，点击“更多”按钮，获取大V账号数据列表，且带首字字母索引，一次性获取完所有的大V数据
				let _url = "/home/getVipPageList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			toggle_followed: function(d, onok, onno) { //关注或取消关注大V用户
				let _url = "/home/attentionVipOrNo";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			get_article: function(d, onok, onno) { //APP“首页”模块，点击“火”的图标，进行大V列表，再点击某个大V进入大v主界面，底部4种分类数据列表（最新发布、转发最多、评论最多、点赞最多）
				let _url = "/home/getVipArticlePageList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_recommend_list: function(d, onok, onno) { //APP“首页”模块，大V详情主界面里的相关推荐功能
				let _url = "/home/getRecommendVipList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_hobby_list_byUser: function(d, onok, onno) { //某用户可能感兴趣的所有大V列表	
				let _url = "/home/getVipListByUser";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		},
		article: {
			get_detail: function(d, onok, onno) { //内容相关功能，获取内容详情数据时用
				let _url = "/article/getArticleDetail";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			toggle_collect: function(d, onok, onno) { //内容相关功能，收藏或取消收藏文章
				let _url = "/article/faOrNoArticle";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			toggle_praise: function(d, onok, onno) { //内容相关功能，点赞或取消点赞该文章
				let _url = "/article/praiseArticleOrNo";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			get_comment_list: function(d, onok, onno) { //内容相关功能，获取文章评论列表
				let _url = "/article/queryArticleCommentPageList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			toggle_shield: function(d, onok, onno) { //内容相关功能，屏蔽作者
				let _url = "/article/blockVipOrNo";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			un_interest: function(d, onok, onno) { //内容相关功能，屏蔽文章
				let _url = "/article/blockArticle";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			add_count: function(d, onok, onno) { //内容相关功能，增加文章的“分享数”或“点击数”
				let _url = "/article/addArticleCountNum";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			comment: function(d, onok, onno) { //内容相关功能，针对某篇文章进行评论
				let _url = "/article/commentArticle";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		comment: {
			toggle_praise: function(d, onok, onno) { //内容相关功能，评论列表里点赞或取消点赞某条评论
				let _url = "/article/praiseCommentOrNo";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		qa: {
			get_qiuniu_info: function(d, onok, onno) { //获取七牛云信息
				let _url = "/other/getQiniuUploadInfo";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			question: {
				get_detail: function(d, onok, onno) { //问答相关功能，某个问题的详情
					let _url = "/questionReply/getQuestionDetail";
					_req.m_send(_url, "GET", d, onok, onno);
				},
				add: function(d, onok, onno) { //发布问题
					let _url = "/questionReply/addQuestion";
					_req.m_send(_url, "POST", d, onok, onno);
				},
				add_count: function(d, onok, onno) { //增加问答的“分享数”或“点击数”
					let _url = "/questionReply/addAnswerQuestionCountNum";
					_req.m_send(_url, "POST", d, onok, onno);
				},
			},
			answer: {
				add: function(d, onok, onno) { //回答
					let _url = "/questionReply/replyOneQuestion";
					_req.m_send(_url, "POST", d, onok, onno);
				},
				get_list: function(d, onok, onno) { //回答列表
					let _url = "/questionReply/getOneQuestionReplyList";
					_req.m_send(_url, "GET", d, onok, onno);
				},
				toggle_praise: function(d, onok, onno) { //点赞取消点赞
					let _url = "/questionReply/praiseAnswerReplyOrNo";
					_req.m_send(_url, "POST", d, onok, onno);
				},
			}
		}
	},
	helper: {
		get_query_list: function(d, onok, onno) { //获取APP“助手”模块的热门问题列表。
			let _url = "/search/query";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_qaset_list: function(d, onok, onno) { //APP“助手”的问题集列表
			let _url = "/search/qaset";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_list_by_search: function(d, onok, onno) { //搜索APP“助手”模块，搜索热门问题列表。
			let _url = "/search/findQaByKeyword";
			_req.m_send(_url, "GET", d, onok, onno);
		},
	},
	center: {
		user: {
			get_detail: function(d, onok, onno) { //“我的”模块获取用户资料
				let _url = "/my/getDetail";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		},
		address: {
			add: function(d, onok, onno) { //收货地址添加
				let _url = "/my/addAddress";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			update: function(d, onok, onno) { //收货地址修改
				let _url = "/my/updateAddress";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			deleted: function(d, onok, onno) { //收货地址删除
				let _url = "/my/delAddress";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			get_list: function(d, onok, onno) { //获取收货地址列表
				let _url = "/my/getAddressList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_region: function(d, onok, onno) { //获取省市县街道的接口
				let _url = "/my/getRegion";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		},
		record: {
			get_list: function(d, onok, onno) { //APP“我的”模块获取用户的浏览记录列表
				let _url = "/my/queryHistoryList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			remove_article_list: function(d, onok, onno) { //内容相关功能，批量删除浏览文章
				let _url = "/my/batchDelHistoryList";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		collect: {
			get_list: function(d, onok, onno) { //APP“我的”模块获取用户收藏的文章数据
				let _url = "/my/queryFaArticlePageList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			remove_article_list: function(d, onok, onno) { //内容相关功能，批量删除收藏文章
				let _url = "/my/delFaArticles";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		comment: {
			get_list: function(d, onok, onno) { //APP“我的”获取我的评论列表
				let _url = "/my/queryUserComment";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		},
		classify: {
			// get_list: function(d, onok, onno) { //内容相关功能，获取用户关注的主题列表
			// 	let _url = "/my/getAttentionCategoryPageList";
			// 	_req.m_send(_url, "GET", d, onok, onno);
			// },
			// delete_attention: function(d, onok, onno) { //内容相关功能，删除用户收藏的文章
			// 	let _url = "/my/delAttentionCategory";
			// 	_req.m_send(_url, "POST", d, onok, onno);
			// },
			get_list: function(d, onok, onno) { //内容相关功能，获取我关注的话题列表
				let _url = "/my/getUserTagList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_add_list: function(d, onok, onno) { //内容相关功能，获取我可关注的话题列表
				let _url = "/my/getUserAddTagList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			delete_attention: function(d, onok, onno) { //内容相关功能，删除我关注的话题列表
				let _url = "/my/batchDelUserTag";
				_req.m_send(_url, "POST", d, onok, onno);
			},
			get_tag_top_info: function(d, onok, onno) { //获取某话题的详情
				let _url = "/home/getTagExtInfo";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_article_by_tagId: function(d, onok, onno) { //底部4种分类数据列表（最新发布、转发最多、评论最多、点赞最多）
				let _url = "/home/getArticleByTagId";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			toggle_followed: function(d, onok, onno) {
				let _url = "/home/addOrDeleteUserTag";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		tag: {
			get_list: function(d, onok, onno) { //获取我关注的话题列表
				let _url = "/my/getUserTagList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_add_list: function(d, onok, onno) { //获取我可关注的话题列表
				let _url = "/my/getUserAddTagList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			remove: function(d, onok, onno) { //删除我关注的话题列表
				let _url = "/my/batchDelUserTag";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		shield: {
			get_author_list: function(d, onok, onno) { //内容相关功能，取得用户屏蔽的作者数据
				let _url = "/my/getBlockVipPageList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_article_list: function(d, onok, onno) { //APP“我的”模块获取用户屏蔽的文章数据
				let _url = "/my/getBlockArticleList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			remove_article_list: function(d, onok, onno) { //内容相关功能，批量删除用户屏蔽的文章
				let _url = "/my/batchDelBlockArticle";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		about: {
			get_website: function(d, onok, onno) { //APP“设置”模块的隐私政策页面数据
				let _url = "/setting/getPageData";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		},
		attention: {
			get_author_list: function(d, onok, onno) { //APP“我的”模块获取关注作者列表
				let _url = "/my/getAttentionVipList";
				_req.m_send(_url, "GET", d, onok, onno);
			}
		},
		manage: {
			baby: {
				get_list: function(d, onok, onno) { //APP“我的”模块获取用户的宝宝数据，一次性给完宝宝列表数据
					let _url = "/my/getBabyList";
					_req.m_send(_url, "GET", d, onok, onno);
				},
				add: function(d, onok, onno) { //APP“我的”模块，宝宝管理，添加宝宝
					let _url = "/my/addBaby";
					_req.m_send(_url, "POST", d, onok, onno);
				},
				update: function(d, onok, onno) { //APP“我的”模块，宝宝管理，修改宝宝资料
					let _url = "/my/updateBaby";
					_req.m_send(_url, "POST", d, onok, onno);
				},
				delete: function(d, onok, onno) { //APP“我的”模块，宝宝管理，删除宝宝资料
					let _url = "/my/delBaby";
					_req.m_send(_url, "POST", d, onok, onno);
				},
			}
		},
		qa: {
			get_header: function(d, onok, onno) { //我的问答头部
				let _url = "/my/getUserAnswerQuestionHeaderInfo";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			question: {
				get_list: function(d, onok, onno) { //我的问题列表
					let _url = "/my/getUserAnswerQuestionList";
					_req.m_send(_url, "GET", d, onok, onno);
				},
			},
			answer: {
				get_list: function(d, onok, onno) { //我的回答列表
					let _url = "/my/getUserAnswerReplyList";
					_req.m_send(_url, "GET", d, onok, onno);
				},
				delete_byId: function(d, onok, onno) { //删除回答
					let _url = "/questionReply/delAnswerReply";
					_req.m_send(_url, "POST", d, onok, onno);
				},
			}
		},
		order: {
			get_list: function(d, onok, onno) { //我的订单
				let _url = "/my/getUserOrderList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
		}
	},
	classify: {
		// get_top_category: function(d, onok, onno) { //获取分类头部数据列表
		// 	let _url = "/category/getTopCategory";
		// 	_req.m_send(_url, "GET", d, onok, onno);
		// },
		// get_sub_category: function(d, onok, onno) { //获取某个分类下的子类
		// 	let _url = "/category/getSubCategory";
		// 	_req.m_send(_url, "GET", d, onok, onno);
		// },
		// get_category_article: function(d, onok, onno) { //APP“分类”模块，点击某个小类进入该小类详情主界面，底部4种分页菜单列表（最新发布、转发最多、评论最多、点赞最多）
		// 	let _url = "/category/queryArticleByCategory";
		// 	_req.m_send(_url, "GET", d, onok, onno);
		// },
		// get_sub_category_header: function(d, onok, onno) { //获取某个小类的详情头部信息
		// 	let _url = "/category/getSubCategoryHeader";
		// 	_req.m_send(_url, "GET", d, onok, onno);
		// },
		// toggle_followed: function(d, onok, onno) { //关注或取消关注某分类
		// 	let _url = "/category/attentionCategoryOrNo";
		// 	_req.m_send(_url, "POST", d, onok, onno);
		// },

	},
	subject: {
		get_list: function(d, onok, onno) { //获取专题列表
			let _url = "/subject/getList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		add_count_num: function(d, onok, onno) { //增加专题统计数
			let _url = "/subject/addCountNum";
			_req.m_send(_url, "POST", d, onok, onno);
		},
		get_detail_byId: function(d, onok, onno) { //根据专题ID获取某专题下的文章列表
			let _url = "/subject/getArticle";
			_req.m_send(_url, "GET", d, onok, onno);
		},
	},
	task: {
		get_list: function(d, onok, onno) { //APP“福利”模块获取每日任务列表，一次性给完所有任务列表数据
			let _url = "/mall/taskList";
			_req.m_send(_url, "GET", d, onok, onno);
		},
		get_award: function(d, onok, onno) { //APP“福利”模块，“每日任务”，完成任务，领取奖励
			let _url = "/mall/completeTask";
			_req.m_send(_url, "POST", d, onok, onno);
		},
		goods: {
			get_list: function(d, onok, onno) { //APP“福利”模块获取兑换商品列表
				let _url = "/mall/productList";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			get_detail: function(d, onok, onno) { //APP“福利”模块，“兑换商城”，商品详情
				let _url = "/mall/productDetail";
				_req.m_send(_url, "GET", d, onok, onno);
			},
			create_order: function(d, onok, onno) { //APP“福利”模块，“兑换商城”，兑换商品
				let _url = "/mall/createOrder";
				_req.m_send(_url, "POST", d, onok, onno);
			},
		},
		get_detail_byId: function(d, onok, onno) { //任务详情接口
			let _url = "/mall/taskDetail";
			_req.m_send(_url, "GET", d, onok, onno);
		},

	}
}
