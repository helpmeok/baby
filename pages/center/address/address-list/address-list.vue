<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">收货地址</block>
		</cu-custom>
		<view class="address-list flex-r-between" v-for="(item,index) in list" :key="index">
			<view class="list-l">
				<view class="blod">
					{{item.province}}{{item.city}}{{item.area}}{{item.address}}
				</view>
				<view class="gray">
					{{item.mobile}}&#X3000;{{item.consignee}}<text v-if="item.is_default" class="default-address">默认</text>
				</view>
			</view>
			<view class="list-r">
				<text class="iconfont icon-bianji-copy gray" @click="edit(item.id)"></text>
				<text class="iconfont icon-shanchu gray" @click="deleted(item.id,index)"></text>
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
			this.api.center.address.get_list({}, res => {
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
			addressAdd() {
				uni.navigateTo({
					url: "../address-handle/address-handle"
				})
			}
		}
	}
</script>

<style>
	

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
