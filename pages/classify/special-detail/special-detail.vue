<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" class="cu-custom" :style="{'opacity':opacity}">
			<block slot="backText"></block>
			<block slot="content">{{info.name}}</block>
		</cu-custom>
		<cu-custom   :isBack="true" class="cu-custom1">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="container" :style="{height:ScreenHeight+'px',width:ScreenWidth+'px'}">
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}">
				<image :src="info.image" mode="aspectFill" :style="{width:ScreenWidth+'px'}" class="header-bg-img"></image>
				<view class="mask" :style="{width:ScreenWidth+'px'}">

				</view>
				<view class="desc white" :style="{width:ScreenWidth+'px','padding-top':CustomBar+'px'}">
					<view class="title  blod">
						{{info.name}}
					</view>
					<view class="content">
						{{info.description}}
					</view>
				</view>
			</view>
			<view class="">
				<article-item :list="list"></article-item>
				<view class="uni-tab-bar-loading" v-if="list.length>0">
					<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const total = 10;
	let id=""
	export default {
		data() {
			return {
				list: [],
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				ScreenWidth: this.screenWidth,
				opacity: 0,
				CustomBar: this.CustomBar,
				info:{},
			}
		},
		onLoad(options) {
			id=options.id
			this.info=JSON.parse(uni.getStorageSync('subjectItem'))
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		methods: {
			init() {
				this.api.subject.get_detail_byId({
					subjectId:id,
					total
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
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				this.init()
			},
		},
		onPageScroll(e) {
			this.opacity = Number(e.scrollTop / uni.upx2px(415)) >= 1 ? 1 : Number(e.scrollTop / uni.upx2px(415));
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.cu-custom {
		position: fixed;
		left: 0;
		z-index: 999;

	}
	.cu-custom1{
		position: fixed;
		left: 0;
		z-index: 9999;
	}
	.container {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;

		.header-custom {
			height: 415upx !important;

			.header-bg-img {
				position: absolute;
				z-index: 1;
				height: 415upx !important;
			}

			.mask {
				position: absolute;
				width: 100%;
				height: 415upx !important;
				background: linear-gradient(159deg, rgba(252, 102, 63, 1) 0%, rgba(231, 50, 45, 1) 100%);
				opacity: 0.8;
				z-index: 2;
			}

			.desc {
				position: absolute;
				height: 415upx !important;
				z-index: 3;
				padding:20upx 30upx;
				width: 100%;
				
				.title {
					font-size: 44upx;
					margin-bottom: 20upx;
				}

				.content {
					font-size: 30upx;
					font-weight: 500;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
					overflow: hidden;
					line-height: 40upx;
				}
			}

		}
	}
</style>
