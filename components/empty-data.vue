<template>
	<view class="flex-c-center" style="margin-top: 200upx;">
		<!-- <view class="iconfont iconzanwuchiyouzhongdingdan default-color" style="font-size: 150upx;"></view> -->
		<image class="empty-icon" :src="url" mode="widthFix"></image>
		<view class="gray">{{msg}}</view>
		<navigator url="/pages/index/index" hover-class="none" v-if="isLogin">
			<view class="bg-default-color flex-r-center baby-font-size white btn">
				前往登录
			</view>
		</navigator>
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
			isLogin:{
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {

			};
		},
		
	}
</script>

<style lang="scss">
	.empty-icon {
		width: 300upx !important;
	}
	.btn{
		width: 230upx;
		height: 80upx;
		border-radius: 40upx;
		margin-top: 30upx;
	}
</style>
