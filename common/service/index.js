// const __api = 'https://wkf.088wanmei.com';
const __api = 'http://59.61.216.123:18980/jeezero-ucenter-app/';

function Request() {

	this.m_send = function(url, method, data, onok, onno, complete) {
		var token = '2_8e0069b12fad4b0f8f14a73939a25e09';
		data.uid = 2;
		var _data = {
			url: __api + url,
			method: method,
			header: {
				// Authorization: token,
				authorization: token,
				appname: "boblbee"
			},
			data: data,
			success(res) {

				// console.log(token)
				// 				if (res.header.Authorization) {
				// 					uni.setStorageSync('access_token', res.header.Authorization)
				// 				}
				if (res.data.code == 0) {
					onok ? onok(res.data) : null
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
			let _url = "v1/miniApp/wxlogin";
			_req.m_send(_url, "Post", d, onok, onno);
		},
		get_recommend_article: function(d, onok, onno) { //“首页”模块的推荐数据
			let _url = "v1/article/queryRecommendArticle";
			_req.m_send(_url, "Get", d, onok, onno);
		},
		get_foucs_article: function(d, onok, onno) { //“首页”模块的关注数据
			let _url = "v1/article/queryFocusArticle";
			_req.m_send(_url, "Get", d, onok, onno);
		},
	},
	center: {
		user: {
			get_detail: function(d, onok, onno) { //“我的”模块获取用户资料
				let _url = "v1/my/getDetail";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		},
		address: {
			add: function(d, onok, onno) { //收货地址添加
				let _url = "v1/my/addAddress";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			update: function(d, onok, onno) { //收货地址修改
				let _url = "v1/my/updateAddress";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			deleted: function(d, onok, onno) { //收货地址删除
				let _url = "v1/my/delAddress";
				_req.m_send(_url, "Post", d, onok, onno);
			},
			get_list: function(d, onok, onno) { //获取收货地址列表
				let _url = "v1/my/getAddressList";
				_req.m_send(_url, "Get", d, onok, onno);
			},
			get_region: function(d, onok, onno) { //获取省市县街道的接口
				let _url = "v1/my/getRegion";
				_req.m_send(_url, "Get", d, onok, onno);
			},
		}
	},
	order: {
		list: function(d, onok, onno) { //获取会员订单分页数据
			let _url = "/api/customer/order/list?page={page}&pagesize={pagesize}&type={type}";
			_url = _url.replace('{page}', d.page).replace('{pagesize}', d.pagesize).replace('{type}', d.type)
			_req.m_send(_url, "Get", null, onok, onno);
		},
		info_byId: function(d, onok, onno) { //通过id获取会员订单详情
			let _url = "/api/customer/order/info/{id}";
			_url = _url.replace('{id}', d.id)
			_req.m_send(_url, "Get", null, onok, onno);
		},
		pay: function(d, onok, onno) { //订单支付
			let _url = "/api/customer/order/pay";
			_req.m_send(_url, "Post", d, onok, onno);
		},
		cancel: function(d, onok, onno) { //订单取消
			let _url = "/api/customer/order/cancel";
			_req.m_send(_url, "Post", d, onok, onno);
		},
		delete: function(d, onok, onno) { //订单删除
			let _url = "/api/customer/order/delete";
			_req.m_send(_url, "Post", d, onok, onno);
		},
		confirm: function(d, onok, onno) { //订单确认
			let _url = "/api/customer/order/confirm";
			_req.m_send(_url, "Post", d, onok, onno);
		},
		forout: function(d, onok, onno) { //从购物车结算外卖订单。并生成订单
			let _url = "/api/customer/settlement/forout";
			d.share_id = uni.getStorageSync('shareId') ? uni.getStorageSync('shareId') : "";
			console.log("上级id" + d.share_id)
			_req.m_send(_url, "Post", d, onok, onno);
		},
		forhere: function(d, onok, onno) { //从购物车结算堂食订单。并生成订单
			let _url = "/api/customer/settlement/forhere";
			d.share_id = uni.getStorageSync('shareId') ? uni.getStorageSync('shareId') : "";
			console.log("上级id" + d.share_id)
			_req.m_send(_url, "Post", d, onok, onno);
		},
	}
}
