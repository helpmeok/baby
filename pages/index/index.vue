<template>
	<view class="">
		<cu-custom bgColor="bg-gradual-red">
			<block slot="content">登录</block>
		</cu-custom>
		<view class="container">
			<view class="content" v-if="isShow">
				<image src="/static/1024.png" class="logo"></image>
				<view class="font-b blod default-color">宝宝贝</view>
				<view class="default-color">了解更多育儿专业知识</view>
				<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" style="margin-top: 150upx;">
					微信快捷授权登录
				</button>
				<navigator url="/pages/home/index/index" open-type="switchTab" class="gray" style="margin-top: 100upx;" hover-class="none">
					暂不登录，前往首页
				</navigator>
			</view>
		</view>
		<relevance-label :show="showRelevanceLabel" v-on:routePush="routePush"></relevance-label>
	</view>
</template>

<script>
	let redirect = "";
	import relevanceLabel from '@/components/relevance-label'
	export default {
		data() {
			return {
				title: 'Hello',
				code: '',
				isShow: false,
				wxSessionKey: "",
				showRelevanceLabel: false,
			};
		},
		components: {
			relevanceLabel
		},
		onLoad(options) {
			if (options.redirect) {
				redirect = options.redirect
			}
			if (options.queryObj) {
				let queryObj = JSON.parse(options.queryObj)
				let queryStr = ""
				let arr = []
				Object.keys(queryObj).forEach((key) => {
					queryStr = key + "=" + queryObj[key]
					arr.push(queryStr)
				})
				redirect = redirect + "?" + arr.join('&')
			}
			if (uni.getStorageSync('access_token')) {
				this.api.center.user.get_detail({}, res => {
					console.log(res);
					uni.setStorageSync('userInfo', JSON.stringify(res.data))
					if (res.data.isSetTag) {
						this.isShow = false;
						this.routePush()
					} else {
						this.showRelevanceLabel = true;
					}
				});
			} else {
				this.isShow = true;
				uni.checkSession({
					success: () => {
						this.wxSessionKey = uni.getStorageSync('wxSessionKey')
						console.log('wxSessionKey值：' + uni.getStorageSync('wxSessionKey'))
						console.log('wxSessionKey有效')
						if (!this.wxSessionKey) {
							this.getWXCode()
						}
					},
					fail: () => {
						console.log('wxSessionKey过期')
						this.getWXCode();
					}
				})
			}
		},
		methods: {
			getWXCode() {
				return new Promise((res, rej) => {
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							this.api.home.get_wx_sessionKey({
								code: loginRes.code
							}, data => {
								console.log(data)
								this.wxSessionKey = data.data
								uni.setStorageSync('wxSessionKey', data.data)
								res(data.data);
							})
						},
						fail: err => {
							rej(err);
						}
					});
				});
			},
			async getUserInfo(e) {
				if (e.detail.errMsg == 'getUserInfo:ok') {
					uni.showLoading({
						title: '登录中'
					});
					let data = {};
					if (!this.wxSessionKey) {
						//token过期时重新获取code
						this.wxSessionKey = await this.getWXCode();
					}
					Object.assign(data, e.detail, {
						sessionKey: this.wxSessionKey
					});
					console.log(data)
					this.api.home.wx_login(
						data,
						res => {
							console.log(res)
							let access_token = res.data.userId + "_" + res.data.token
							uni.setStorageSync('access_token', access_token);
							this.api.center.user.get_detail({}, res => {
								console.log(res);
								uni.setStorageSync('userInfo', JSON.stringify(res.data))
								if (res.data.isSetTag) {
									this.routePush()
								} else {
									this.showRelevanceLabel = true;
								}
								uni.hideLoading();
							});

						},
						err => {
							this.getWXCode();
							uni.hideLoading();
						}
					);
				}
			},
			routePush() {
				console.log(redirect)
				if (redirect) {
					uni.redirectTo({
						url: redirect,
						success: () => {
							uni.hideLoading();
						},
						fail: () => {
							uni.switchTab({
								url: redirect,
								success: () => {
									uni.hideLoading();
								}
							});
						}
					});
				} else {
					uni.switchTab({
						url: '/pages/home/index/index',
						success: () => {}
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	.container {
		.content {
			text-align: center;
			height: 400upx;
		}

		.logo {
			width: 300upx;
			height: 300upx;
			margin-top: 200upx;
		}

		.title {
			font-size: 36upx;
			color: #8f8f94;
		}

		button {
			width: 80%;
			margin-left: 10%;
		}
	}
</style>
