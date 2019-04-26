<template>
	<view>
		<view class="address-list flex-r-between" v-for="(item,index) in list" :key="index">
			<view class="list-l" @click="goBack(item.id)">
				<view class="blod">
					{{item.province}}{{item.city}}{{item.area}}{{item.address}}
				</view>
				<view class="gray">
					{{item.mobile}}&#X3000;{{item.consignee}}<text style="margin-left: 30upx;" v-if="addressId==item.id" class="iconfont default-color icon-dagou"></text>
				</view>
			</view>
			<view class="list-r">
				<text class="iconfont icon-bianji-copy gray" @click="edit(item.id)"></text>
				<text class="iconfont icon-shanchu gray" @click="deleted(item.id,index)"></text>
			</view>
		</view>
		<view class="fixed-bottom flex-r-center" @click="addressAdd">
			<text class="iconfont icon-jiahao white"></text>
			<text class="white font-b">添加地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				addressId: ""
			};
		},
		onLoad() {},
		onShow() {
			this.addressId = uni.getStorageSync('addressId')
			uni.removeStorageSync('addressId')
			this.api.center.address.all(null, res => {
				console.log(res)
				this.list = res.data
			}, err => {

			})
		},
		methods: {

			edit(id) {
				uni.navigateTo({
					url: '../address-handle/address-handle?id=' + id
				})
			},
			deleted(id, index) {
				uni.showModal({
					title: "确定要删除吗？",
					success: (res) => {
						if (res.confirm) {
							this.api.center.address.delete({
								id
							}, res => {
								uni.showToast({
									title: res.message,
									icon: "success",
									success: () => {
										this.list.splice(index, 1)
									}
								})
							}, err => {

							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			goBack(id) {
				uni.setStorageSync('addressId', id);
				uni.navigateBack({
					delta: 1
				})
			},
			addressAdd() {
				// #ifdef MP-WEIXIN
				uni.authorize({
					scope: "scope.address",
					success: () => {
						uni.chooseAddress({
							success: (res) => {
								let model = {
									id: 0,
									sort: 0,
									sex: 1,
									is_default: 1,
								}
								model.consignee = res.userName;
								model.province = res.provinceName;
								model.city = res.cityName;
								model.area = res.countyName
								model.address = res.detailInfo;
								model.mobile = res.telNumber;
								console.log(model)
								this.api.center.address.handle(model, res => {
									uni.showToast({
										title: "操作成功",
										icon: "success"
									})
								}, err => {

								})
							}
						})
					},
					fail: () => {
						uni.navigateTo({
							url: "../address-handle/address-handle"
						})
					}
				})

				// #endif
				// #ifdef H5
				uni.navigateTo({
					url: "../address-handle/address-handle"
				})
				// #endif
			}
		}
	}
</script>

<style>
	.fixed-bottom {
		background-color: #EBA91F;
		padding: 20upx 0;
	}

	.address-list {
		width: 94%;
		margin-left: 3%;
		border-bottom: 2upx solid #BBBBBB;
		padding: 10upx 0;
	}

	.list-r .iconfont {
		font-size: 60upx;
		margin-left: 20upx;
	}

	.default-address {
		display: inline-block;
		background-color: #EBA91F;
		color: white;
		padding: 0 20upx;
		border-radius: 10upx;
		margin-left: 20upx;
	}
</style>
