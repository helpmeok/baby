<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">收货地址</block>
		</cu-custom>
		<view class="address-list">
			<view class="list-item  border-bottom flex-r-between" v-for="(item,index) in list" :key="index">
				<view class="list-l">
					<view class="flex">
						<view class="default-address small bg-default-color white mgr-20" v-if="item.isDefault==1">
							默认
						</view>
						<text class="mgr-20 blod font-b" >{{item.name}}</text>
						<text class="blod font-b">{{item.phone}}</text>
					</view>
					<view class="gray" style="margin-top: 20upx;">
						{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}
					</view>
				</view>
				<view class="list-r"  @click="edit(item.addrId)">
					<!-- <text class="iconfont iconGroup- gray" @click="deleted(item.addrId,index)"></text> -->
					<text class="iconfont iconbianji gray mgr-30 mgl-30"></text>
				</view>
			</view>
		</view>
		
		<empty v-if="list.length==0" msg="没有任何收货地址耶~"></empty>
		<view class="fixed-bottom fixed-bottom-height bg-default-color flex-r-center" @click="addressAdd">
			<text class="white font-b">添加新地址</text>
		</view>
	</view>
</template>

<script>
	import empty from '@/components/empty-data.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				list: []
			};
		},
		onLoad() {},
		onShow() {
			this.api.center.address.get_list(null, res => {
				console.log(res)
				this.list = res.data
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
			addressAdd() {
				uni.navigateTo({
					url: "../address-handle/address-handle"
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #f8f8f8;
		height: 100%;
	}

	.address-list {
		margin-top: 30upx;
		background-color: white;
		padding-left: 30upx;
		.list-item{
			 padding: 20upx 0;
			.list-r .iconfont {
				font-size: 50upx;
				margin-left: 30upx;
			}
			
			.default-address {
				border-radius: 20upx;
				padding: 0 20upx;
			}
		}
	}

	
</style>
