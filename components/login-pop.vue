<template>
	<view class="cu-modal flex-r-center" :class="{'show':show}">
		<view class="cu-content flex-c-around bg-white login-content">
			<view class="blod msg baby-black">
				只有登录状态才可设置宝宝信息
			</view>
			<view class="btn-box flex">
				<view class="btn1 flex-r-center" @click="hide">
					取消
				</view>
				<navigator class="btn2 white flex-r-center" hover-class="none" @click="goLoginPage">
					前往登录
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			};
		},
		methods:{
			hide(){
				this.$emit('hideLoginPop')
			},
			goLoginPage(){
				this.hide();
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-content {
		width: 90%;
		border-radius: 20upx;
		overflow: hidden;

		.msg {
			font-size: 34upx;
			padding: 80upx 0;
		}

		.btn-box {
			width: 100%;
			font-size: 32upx;
			height: 90upx;

			.btn1 {
				width: 50%;
				height: 100%;
				border-top: 2upx solid #EEEEEE;
				color: #404040;
			}

			.btn2 {
				width: 50%;
				height: 100%;
				background-color: #FC4041;
				border-top: 2upx solid #FC4041;
			}
		}
	}
</style>
