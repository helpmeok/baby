<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">关于我们</block>
		</cu-custom>
		<navigator url="/pages/center/about/website/index/index?type=1" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<text class="">用户协议</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator>
		<navigator url="/pages/center/about/website/index/index?type=2" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<text class="">隐私政策</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator>
		<view class="gray text-center" style="margin-top: 100upx;">当前版本2.0.1</view>
		<view class="gray text-center">All Rights Reserved By 宝宝贝</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.container{
	background-color: #f5f5f5;
	height: 100%;
	.list-cell {
		background-color: white;
		box-sizing: border-box;
		border-bottom: 2upx solid #f1f1f1;
		padding: 20upx 30upx;
		.icon {
			width: 60upx;
			margin-right: 20upx;
		}
	}
}
</style>
