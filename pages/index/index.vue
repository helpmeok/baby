<template>
	<view class="" style="height: 100%;width: 100%;">
		<cu-custom bgColor="bg-gradual-red" :isBack="true" v-if="isBack">
			<block slot="backText"></block>
			<block slot="content">登录</block>
		</cu-custom>
		<cu-custom bgColor="bg-gradual-red" :isHome="true" v-else>
			<block slot="content">登录</block>
		</cu-custom>
		<view class="container" :style="{'height':'calc(100% - '+CustomBar+'px)'}">
			<view class="content" v-if="isShow">
				<image src="http://boblbee.superpapa.com.cn/boblbee/static/App Store-1024.png" class="logo"></image>
				<view class="font-b blod default-color">宝宝贝</view>
				<view class="default-color">了解更多育儿专业知识</view>
				<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" style="margin-top: 150upx;">
					微信快捷授权登录
				</button>
				<!-- <navigator url="/pages/home/index/index" open-type="switchTab" class="gray" style="margin-top: 100upx;" hover-class="none">
						暂不登录，前往首页
					</navigator> -->
			</view>
		</view>
		<relevance-label :show="showRelevanceLabel" v-on:routePush="routePush"></relevance-label>
	</view>
</template>

<script>
	let redirect = "";
	import relevanceLabel from '@/components/relevance-label';
	import myMixin from '@/common/mixins.js'
	export default {
		mixins: [myMixin.publicApi],
		data() {
			return {
				title: 'Hello',
				CustomBar: this.CustomBar,
				code: '',
				isShow: false,
				wxSessionKey: "",
				showRelevanceLabel: false,
				isBack: false
			};
		},
		components: {
			relevanceLabel
		},
		async onLoad(options) {
			// uni.removeStorageSync('access_token')
			// uni.removeStorageSync('wxSessionKey')
			if (Object.keys(options).length == 0) {
				this.isBack = true
			}
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
				await this.saveBabyInfoData();
				this.isShow = false;
				this.routePush()
			} else {
				this.isShow = true;
				this.getWXCode();
				// uni.checkSession({
				// 	success: () => {
				// 		this.wxSessionKey = uni.getStorageSync('wxSessionKey')
				// 		console.log('wxSessionKey值：' + uni.getStorageSync('wxSessionKey'))
				// 		console.log('wxSessionKey有效')
				// 		if (!this.wxSessionKey) {
				// 			this.getWXCode()
				// 		}
				// 	},
				// 	fail: () => {ssss
				// 		console.log('wxSessionKey过期')
				// 		this.getWXCode();
				// 	}
				// })
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
						title: '登录中',
						mask: true
					});
					let data = {};
					if (!this.wxSessionKey) {
						//token过期时重新获取code
						this.wxSessionKey = await this.getWXCode();
					}
					Object.assign(data, e.detail, {
						sessionKey: this.wxSessionKey
					});
					this.api.home.wx_login(
						data,
						async res => {
							let access_token = res.data.userId + "_" + res.data.token;
							uni.setStorageSync('access_token', access_token);
							await this.saveBabyInfoData();
							uni.$emit('changeBabyType');//传递全局事件
							uni.$emit('loginSucceed');//成功登陆
							this.routePush();
							uni.hideLoading();
						},
						err => {
							this.getWXCode();
							uni.hideLoading();
						}
					);
				}
			},
			routePush() {
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
						url: '/pages/child/index/index',
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
			border-radius: 20upx;
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
