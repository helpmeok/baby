<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" class="cu-custom" :style="{'opacity':opacity}">
			<block slot="backText"></block>
			<block slot="content">标题</block>
		</cu-custom>
		<cu-custom :isBack="true"  class="cu-custom1">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="container" :style="{height:ScreenHeight+'px',width:ScreenWidth+'px'}">
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}">
				<image src="/static/12483715_143815299000_2.jpg" mode="aspectFill" :style="{width:ScreenWidth+'px'}" class="header-bg-img"></image>
			</view>
			<view class="pd-box desc border-bottom">
				<view class="title baby-black blod">
					玩跳跃游戏，锻炼双腿力量
				</view>
				<view class="content font-b">
					宝宝辅食添加全攻略，科学添加喂养让宝宝茁壮成长没烦恼宝宝辅食添加全攻略科学添加喂养让宝宝茁壮成长没烦恼宝宝辅食添加全攻科学添加喂养让宝宝茁壮成长没烦恼壮成长没烦恼宝宝辅食添加全攻科学喂养让宝宝茁壮成长没烦恼壮成长没烦恼宝宝辅
				</view>
			</view>
			<view class="pd-box flex-r-between">
				<view class="flex-r-center avatar-box">
					<image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKxRpvZNm1MXWEvpFlgTYRGA37XkBzsyRQiaTJZnodRcyKalc29Evzv00WbsqiaibcgujzAlZvzMUp8w/132" mode="aspectFill" v-for="(el,i) in 4" :key="i" class="celebrity-avatar" :style="{left:-(i*8)+'px'}"></image>
				</view>
				<view class="gray">
					5000人已完成
				</view>
			</view>
			<view class="" style="height: 160upx;width: 100%;"></view>
		</view>
		<view class="fixed-bottom flex-r-center pd-box">
			<view class="btn bg-default-color white baby-font-size flex-r-center">
				完成
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

	.cu-custom1 {
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
		}
		.desc{
			.title{
				font-size: 44upx;
				margin: 20upx 0;
			}
			.content{
				color: #404040;
			}
			
		}
		
		.avatar-box {
			position: relative;
			left: 0;
			top: 0;
		
			.celebrity-avatar {
				width: 64upx;
				height: 64upx;
				border-radius: 50%;
				position: relative;
				top: 0;
				border: 4upx solid #FFFFFF;
			}
		}
	}

	.fixed-bottom {
		padding-bottom:40upx;
		background-color: #FFFFFF;
		.btn{
			width: 100%;
			border-radius: 40upx;
			height: 80upx;
		}
	}
</style>
