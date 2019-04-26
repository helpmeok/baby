<template>
	<view class="flex-c-center" style="margin-top: 200upx;">
		<!-- <view class="iconfont iconzanwuchiyouzhongdingdan default-color" style="font-size: 150upx;"></view> -->
		<image src="/static/com_ic_no@2x.png" mode="widthFix"></image>
		<view class="gray">{{msg}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			msg: {
				type: String,
				default: ""
			},
		},
	}
</script>

<style>
	image {
		width: 300upx;
	}
</style>
