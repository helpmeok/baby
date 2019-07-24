<template>
	<view>
		<view class="cu-modal flex-r-center" :class="{'show':isShow}">
			<view class="flex-c-around">
				<view class="bg-white cu-content">
					<view class="font-b blod">
						提示
					</view>
					<view class="pd-box gray">
						为了响应国家法律规定,使用以下功能需要绑定您的手机号。
					</view>
					<view class="bg-default-color">
						<button plain="true" open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="mobile-btn white">
							绑定手机号
						</button>
					</view>
				</view>
				<view class="white close flex-r-center" @tap="hideModal">
					<view class="iconfont iconcuowutishilimiandecha "></view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxSessionKey: ""
			}
		},
		props: {
			isShow: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			isShow(newValue) {
				if (newValue) {
					uni.checkSession({
						success: () => {
							this.wxSessionKey = uni.getStorageSync('wxSessionKey')
							console.log('wxSessionKey有效')
							if (!this.wxSessionKey) {
								this.getWxSessionKey()
							}
						},
						fail: () => {
							console.log('wxSessionKey过期')
							this.getWxSessionKey()
						}
					})
				}
			}
		},
		created() {},
		methods: {
			getWxSessionKey() {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						console.log(loginRes)
						// this.code = loginRes.code;
						this.api.home.get_wx_sessionKey({
							code: loginRes.code
						}, res => {
							console.log(res)
							this.wxSessionKey = res.data
							uni.setStorageSync('wxSessionKey', res.data)
						})
					}
				});
			},
			getphonenumber(e) {
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					let encryptedData = e.detail.encryptedData;
					let iv = e.detail.iv;
					this.api.home.get_wx_mobile({
						encryptedData,
						iv,
						sessionKey: this.wxSessionKey
					}, res => {
						console.log(res)
						this.api.home.bind_mobile({
							phone: res.data
						}, res => {
							uni.showToast({
								title: "绑定成功",
								success: () => {
									this.$emit('hideBindMobile', true)
								}
							})
						})
					})
				}
			},
			hideModal() {
				this.$emit('hideBindMobile', false)
			}
		}
	}
</script>

<style lang="scss">
	.cu-modal {
		.cu-content {
			width: 60%;
			border-radius: 20upx;
			overflow: hidden;
			padding-top: 20upx;

			.mobile-btn {
				border: none !important;
				color: white !important;

			}

		}

		.close {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			border: 4upx solid white;
			margin-top: 50upx;
		}
	}
</style>
