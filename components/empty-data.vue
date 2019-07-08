<template>
	<view class="flex-c-center" style="margin-top: 200upx;">
		<!-- <view class="iconfont iconzanwuchiyouzhongdingdan default-color" style="font-size: 150upx;"></view> -->
		<image :src="url" mode="widthFix"></image>
		<view class="gray">{{msg}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			msg: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: "/static/com_ic_no@2x.png"
			},
		},
		data() {
			return {

			};
		},
		
	}
</script>

<style lang="scss">
	image {
		width: 300upx;
	}
</style>
