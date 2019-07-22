<template>
	<view>
		<cu-custom bgColor="bg-gradual-red">
			<block slot="content">我的</block>
		</cu-custom>
		<view class="container">
			<view class="flex-r-between pd-box user-box">
				<view class="" style="width: 20%;">
					<image :src="userInfo.avatar" mode="widthFix" class="portrait"></image>
				</view>
				<view class="flex-r-between" style="width: 75%;">
					<view class="">
						<view class="nick-name blod">{{ userInfo.nickname }}</view>
						<view class="flex">
							<image src="/static/center/me_list_ic_integral@3x.png" mode="widthFix" class="integral-icon"></image>
							<view class="gray mgl-20">积分：{{userInfo.userPoint}}</view>
						</view>
					</view>
					<navigator url="/pages/task/store/index/index" hover-class="none">
						<image src="/static/center/me_list_ic_shop_nor@3x.png" mode="widthFix" class="shop-icon"></image>
					</navigator>
				</view>
			</view>
			<view class="header flex-r-around gray">
				<navigator url="../manage/index/index" hover-class="none">
					<view class="flex-c-center">
						<image src="/static/center/me_card_ic_baby_nor@3x.png" mode="widthFix" class="icon"></image>
						<view class="">宝宝管理</view>
					</view>
				</navigator>
				<navigator url="../order/list/list" hover-class="none">
					<view class="flex-c-center">
						<image src="/static/center/me_card_ic_order_nor@3x.png" mode="widthFix" class="icon"></image>
						<view class="">我的订单</view>
					</view>
				</navigator>
				<navigator url="../question/list/list" hover-class="none">
					<view class="flex-c-center">
						<image src="/static/center/me_card_ic_qa_nor@3x.png" mode="widthFix" class="icon"></image>
						<view class="">我的问答</view>
					</view>
				</navigator>
			</view>
			<navigator url="../address/address-list/address-list" hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/me_list_ic_address@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">收件地址</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
			<navigator url="../classify/list/list" :hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/me_list_ic_follow@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">我关注的主题</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
			<navigator url="../collect/list/list" hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/me_list_ic_collection@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">收藏与屏蔽的文章</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
			<navigator url="../shield-author/list/list" hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/me_list_ic_shield@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">关注与屏蔽的作者</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
			<navigator url="../record/list/list" hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/me_list_ic_record@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">文章浏览历史</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
			<navigator url="../comment/list/list" hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/me_list_ic_comment@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">我的评论</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
			<navigator url="../about/index/index" hover-class="none">
				<view class="list-cell flex-r-between">
					<view class="list-cell-left flex-r-center">
						<image src="../../../static/com_tab_ic_me_pre@2x.png" mode="widthFix" class="icon"></image>
						<text class="font-b">关于我们</text>
					</view>
					<view class="list-cell-right flex-r-center"><text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text></view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {},
		onShow() {
			if (uni.getStorageSync('goOrder')) {
				uni.removeStorageSync('goOrder')
				uni.navigateTo({
					url:"/pages/center/order/list/list"
				})
			}
			this.api.center.user.get_detail({}, res => {
				console.log(res);
				this.userInfo = res.data;
				uni.setStorageSync('userInfo',JSON.stringify(res.data))
			});
		}
	};
</script>

<style lang="scss">
	.container {
		background-color: #ffffff;
		padding: 30upx;
		box-sizing: border-box;
	}

	.user-box {
		width: 100%;

		.nick-name {
			font-size: 36upx;
		}

		.portrait {
			width: 100% !important;
			border-radius: 50%;
		}

		.integral-icon {
			width: 40upx;
		}

		.shop-icon {
			width: 100upx;
		}
	}

	.header {
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 30upx;
		box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
		margin-bottom: 40upx;

		.icon {
			width: 80upx;
			margin-bottom: 10upx;
		}

	}

	.exchange {
		height: 60upx;
		border-radius: 30upx;
		background-color: #ffecec;
		color: #fc4041;
		margin-top: 30upx;
		padding: 10upx 20upx;

		.icon {
			width: 65upx;
		}
	}

	.list-cell {
		box-sizing: border-box;
		border-bottom: 2upx solid #f1f1f1;
		padding: 20upx 0;

		.icon {
			width: 60upx;
			margin-right: 20upx;
		}

		.font-b {
			font-size: 32upx;
		}
	}
</style>
