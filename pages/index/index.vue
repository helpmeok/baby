<template>
	<view class="content" v-if="isShow">
		<image src="../../static/1024.png" class="logo"></image>
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">
			微信授权登录
		</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			code: '',
			isShow: false
		};
	},
	onLoad(options) {
		uni.switchTab({
			url: '/pages/home/index/index',
			success: () => {}
		});
		if (uni.getStorageSync('access_token')) {
			this.isShow = false;
			uni.switchTab({
				url: '/pages/home/index/index',
				success: () => {}
			});
		} else {
			this.isShow = true;
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					console.log(loginRes)
					this.code = loginRes.code;
				}
			});
		}
	},
	methods: {
		getWXCode() {
			return new Promise((res, rej) => {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						res(loginRes.code);
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
				if (!this.code) {
					//token过期时重新获取code
					this.code = await this.getWXCode();
				}
				console.log(e.detail.userInfo)
				Object.assign(data, e.detail.userInfo, {
					jsCode: this.code
				});
				this.api.home.wx_login(
					data,
					res => {
						console.log(res)
						// uni.setStorageSync('access_token', res.data.access_token);
					},
					err => {
						uni.hideLoading();
					}
				);
			}
		}
	}
};
</script>

<style>
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
</style>
