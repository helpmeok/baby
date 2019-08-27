<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">积分商城</block>
		</cu-custom>
		<view class="list-box pd-box">
			<view class="list-item flex-c-center" v-for="(el,i) in list" :key="i" @click="goDetail(el)">
				<image :src="el.attachmentList[0].thumbnail" mode="aspectFill" class="img"></image>
				<view class="font-b sigle-line-text" style="text-align: center;">{{el.productName}}</view>
				<view class="flex-r-between" style="margin-bottom: 10upx;">
					<view class="point">{{el.productPrice}}积分</view>
					<!-- <view class="gray">剩余5</view> -->
				</view>
				<view class="btn bg-default-color flex-r-center white" v-if="productPrice>el.productPrice">
					兑换
				</view>
				<view class="btn  white flex-r-center" style="background-color: #C8C8C8;" v-else>
					积分不足
				</view>
			</view>
		</view>
		<empty v-if="list.length==0" msg="暂无商品~"></empty>
		<view class="uni-tab-bar-loading" v-if="list.length>0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 15;
	export default {
		data() {
			return {
				offset: 0,
				list: [],
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多商品了"
				},
				productPrice:0
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.productPrice=JSON.parse(uni.getStorageSync('userInfo')).userPoint;
			this.init()
		},
		methods: {
			init() {
				this.api.task.goods.get_list({
					ctime,
					offset: this.offset,
					total
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
					uni.hideLoading()
				})
			},
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				this.offset += total
				this.init()
			},
			goDetail(el) {
				uni.navigateTo({
					url: "/pages/task/store/detail/detail?id=" + el.productId
				})
			}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss" scoped>
	.list-box {
		display: flex;
		align-items: center;
		width: 100%;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: border-box;

		.list-item {
			width: 32%;
			margin-bottom: 30upx;

			.img {
				width: 210upx !important;
				height: 180upx !important;
			}

			.point {
				color: #FFA904;
			}

			.btn {
				width: 100%;
				height: 70upx;
				border-radius: 40upx;
			}
		}
	}
</style>
