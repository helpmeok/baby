<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" class="cu-custom" :style="{'opacity':opacity}">
			<block slot="backText"></block>
			<block slot="content">标题</block>
		</cu-custom>
		<cu-custom   :isBack="true" class="cu-custom1">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="container" :style="{height:ScreenHeight+'px',width:ScreenWidth+'px'}">
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}">
				<image src="/static/12483715_143815299000_2.jpg" mode="aspectFill" :style="{width:ScreenWidth+'px'}" class="header-bg-img"></image>
				<view class="mask" :style="{width:ScreenWidth+'px'}">

				</view>
				<view class="desc white" :style="{width:ScreenWidth+'px','padding-top':CustomBar+'px'}">
					<view class="title  blod">
						标题
					</view>
					<view class="content">
						描述
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
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
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
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.api.center.record.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res.data)
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

		},
		onPageScroll(e) {
			this.opacity = Number(e.scrollTop / uni.upx2px(415)) >= 1 ? 1 : Number(e.scrollTop / uni.upx2px(415));
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
				padding-left: 30upx;

				.title {
					font-size: 44upx;
				}

				.content {
					font-size: 30upx;
					font-weight: 500;
				}
			}

		}
	}
</style>
