<template>
	<view class="container">
		<view class="header-custom flex-r-between" :style="[{height:CustomBar + 'px','padding-top':StatusBar+'px'}]">
			<view class="font-b blod title">专题</view>
			<view class="baby-btn flex-r-center" @click="goBaby">宝宝管理</view>
		</view>
		<scroll-view scroll-y :style="{height:scrollHeight+'px'}">
			<view class="pd-box">
				<view class="list-item" v-for="(el,i) in list" :key="i">
					<image src="/static/com_list_pic@2x.png" mode="aspectFill" class="bg-img"></image>
					<view class=" mask"></view>
					<view class="white font-b title flex-r-center">
						撒旦撒旦
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				WindowHeight: this.windowHeight,
				list: 5
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			scrollHeight() {
				return this.WindowHeight - this.CustomBar
			}
		},
		methods: {
			init() {

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
			}
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

	.list-item {
		width: 100%;
		height: 220upx;
		border-radius: 20upx;
		position: relative;
		left: 0;
		top: 0;
		margin-bottom: 20upx;
		overflow: hidden;

		.bg-img {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
		}

		.mask {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: #000000;
			opacity: 0.4;
			z-index: 2;
			font-weight: 500;
		}

		.title {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 3;
			font-weight: 500;
		}
	}
</style>
