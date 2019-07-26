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
				<view class="point">{{el.productPrice}}积分</view>
				<view class="btn bg-default-color white flex-r-center">
					兑换
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
	const total = 20;
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
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
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
		flex-wrap: wrap;
		box-sizing: border-box;

		.list-item {
			width: 29.33%;
			margin-bottom: 30upx;
			margin: 0 2% 30upx 2%;

			.img {
				width: 200upx !important;
				height: 200upx !important;
			}

			.point {
				color: #FFA904;
			}

			.btn {
				padding: 10upx 50upx;
				border-radius: 40upx;
			}
		}
	}
</style>
