<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">订单确认</block>
		</cu-custom>
		<view class="address-box flex-r-between pd-box bg-white" @click="goBack">
			<view class="">
				<view class="blod font-b">
					<text>{{addressInfo.name}}</text>
					<text class="mgl-20">{{addressInfo.phone}}</text>
				</view>
				<view class="gray">
					{{addressInfo.provinceName}}{{addressInfo.cityName}}{{addressInfo.districtName}}{{addressInfo.address}}
				</view>
			</view>
			<view class="iconfont gray blod iconarrow-right-copy"></view>
		</view>
		<view class="flex-r-between">
			<image src="/static/order_card_bg@2x.png" mode="widthFix" style="width: 15%;" v-for="(el,i) in 6" :key="i"></image>
		</view>
		<view class="good-box bg-white pd-box flex" style="margin-top: 30upx;">
			<image :src="goodInfo.attachmentList[0].url" mode="widthFix" style="width: 200upx;height: 200upx;" class="mgr-20"></image>
			<view class="">
				<view class="font-b blod">
					{{goodInfo.productName}}
				</view>
				<view class="gray">
					数量：1
				</view>
				<view class="color-FFA904">
					{{goodInfo.productPrice}}积分
				</view>
			</view>
		</view>
		<view class="fixed-bottom fixed-bottom-height bg-default-color white flex-r-center font-b" @click="create">
			确认兑换
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressInfo: {
					name: "",
					phone: "",
					provinceName: "",
					cityName: "",
					districtName: "",
					address: ""
				},
				goodInfo: {}
			}
		},

		onLoad(options) {
			this.addressInfo = JSON.parse(uni.getStorageSync('addressInfo'))
			this.goodInfo = JSON.parse(uni.getStorageSync('goodInfo'))
			console.log(this.addressInfo)
			console.log(this.goodInfo)
		},
		onShow() {

		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			create() {
				uni.showModal({
					title: '提示',
					content: '确定使用' + this.goodInfo.productPrice + '积分兑换该商品吗？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.api.task.goods.create_order({
								productId: this.goodInfo.productId,
								num: 1,
								addrId: this.addressInfo.addrId
							}, res => {
								uni.showToast({
									title: "兑换成功",
									success: () => {
										setTimeout(()=>{
											uni.setStorageSync('goOrder',1)
											uni.reLaunch({
												url: '/pages/center/index/index',
											})
										},1000)
									}
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f8f8f8;
		height: 100%;

	}
</style>
