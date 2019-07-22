<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的订单</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="暂无订单信息耶~"></empty>
		<view class="">
			<view class="list-item bg-white pd-box flex-r-between" v-for="(el,i) in list" :key="i">
				<image src="/static/1024.png" mode="widthFix" class="good-img"></image>
				<view class="desc">
					<view class="blod" style="margin-bottom: 20upx;font-size: 32upx;">
						阿萨德sad阿萨德阿萨德阿萨德
					</view>
					<view class="gray">
						货品状态：已发货
					</view>
					<view class="gray">
						物流单号：2121321456465
					</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	export default {

		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多订单了"
				},
				list: [],
			};
		},
		onLoad() {
			uni.showLoading({
				title:"加载中"
			})
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.center.order.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res.data)
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
				offset += total
				this.init()
			},
			showOperate() {}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}
	.list-item{
		margin-top: 30upx;
		box-sizing: border-box;
		.good-img{
			width: 200upx;
			height: 200upx;
		}
		.desc{
			width: calc(100% - 230upx)
		}
	}
</style>
