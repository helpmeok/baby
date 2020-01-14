<template>
	<view class="container">
		<view class="header-custom flex-r-between" :style="[{height:CustomBar + 'px','padding-top':StatusBar+'px'}]">
			<view class="font-b blod title">专题</view>
			<view class="baby-btn flex-r-center" @click="goBaby" v-if="isLogin">宝宝管理</view>
		</view>
		<scroll-view scroll-y :style="{height:scrollHeight+'px'}" @scrolltolower="loadMore()">
			<empty v-if="list.length == 0" msg="暂无任何专题~"></empty>
			<!-- <view class="pd-box">
				<view class="list-item" v-for="(el,i) in list" :key="i" @click="goDetail(el,i)">
					<image :src="el.image" mode="aspectFill" class="bg-img"></image>
					<view class=" mask"></view>
					<view class="white font-b title flex-r-center">
						{{el.name}}
					</view>
				</view>
			</view> -->
			<view class="list-box pd-box">
				<view class="list-item flex-c-center" v-for="(el,i) in list" :key="i" @click="goDetail(el,i)">
					<image :src="el.image" mode="aspectFill" class="img"></image>
					<view class="sigle-line-text" >{{el.name}}</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				WindowHeight: this.windowHeight,
				list: [],
				offset: 0,
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: ''
				},
				loadingType: 0,
				isLogin: false
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		computed: {
			scrollHeight() {
				return this.WindowHeight - this.CustomBar
			}
		},
		onShow() {
			this.isLogin = uni.getStorageSync('access_token') ? true : false
		},
		methods: {
			init() {
				this.api.subject.get_list({
					ctime,
					total,
					offset: this.offset
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						if (res.data.length < total) {
							this.loadingType = 2
						} else {
							this.loadingType = 0
						}
					} else {
						this.loadingType = 2
					}
					uni.hideLoading()
				})
			},
			goBaby() {
				if (uni.getStorageSync('access_token')) {
					uni.navigateTo({
						url: '/pages/center/manage/index/index'
					})
				} else {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			},
			goDetail(el, i) {
				this.api.subject.add_count_num({
					subjectId: el.subjectId,
					type: "clickNum"
				}, res => {
					console.log(res)
				})
				uni.setStorageSync('subjectItem', JSON.stringify(el))
				uni.navigateTo({
					url: "/pages/classify/special-detail/special-detail?id=" + el.subjectId
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
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		width: 100%;
	}

	.header-custom {
		padding: 40upx 220upx 0 30upx;

		.title {
			font-size: 40upx;
			color: #090909;
		}

		.baby-btn {
			width: 160upx;
			height: 60upx;
			color: white;
			background-color: #FC4041;
			border-radius: 30upx;

		}

	}

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
			margin-bottom: 40upx;

			.img {
				width: 214upx !important;
				height: 160upx !important;
				border-radius: 10upx;
			}
			.sigle-line-text{
				text-align: left;
				font-size: 28upx;
				margin-top: 20upx;
				font-weight: 400;
				color: #090909;
			}
		}
	}

	// .list-item {
	// 	width: 100%;
	// 	height: 220upx;
	// 	border-radius: 20upx;
	// 	position: relative;
	// 	left: 0;
	// 	top: 0;
	// 	margin-bottom: 30upx;
	// 	overflow: hidden;

	// 	.bg-img {
	// 		width: 100%;
	// 		height: 100%;
	// 		position: absolute;
	// 		left: 0;
	// 		top: 0;
	// 		z-index: 1;
	// 	}

	// 	.mask {
	// 		position: absolute;
	// 		left: 0;
	// 		top: 0;
	// 		width: 100%;
	// 		height: 100%;
	// 		background-color: #000000;
	// 		opacity: 0.4;
	// 		z-index: 2;
	// 		font-weight: 500;
	// 	}

	// 	.title {
	// 		position: absolute;
	// 		left: 0;
	// 		top: 0;
	// 		width: 100%;
	// 		height: 100%;
	// 		z-index: 3;
	// 		font-weight: 500;
	// 	}
	// }
</style>
