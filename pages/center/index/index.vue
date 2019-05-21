<template>
	<view>
		<view class="header">
			<view class="flex">
				<image :src="userInfo.avatar" mode="widthFix" class="portrait"></image>
				<view class="flex">
					<view class="nick-name">{{userInfo.nickname}}</view>
				<!-- 	<image src="../../../static/center/me_list_ic_babyattestation@2x.png" v-if="userInfo.appOauthStatus" mode="widthFix" class="icon"></image>
					<image src="../../../static/center/me_list_ic_douyinattestation@2x.png"  v-if="userInfo.douyinOauthStatus" mode="widthFix" class="icon"></image>
					<image src="../../../static/center/me_list_ic_toutiaoattestation@2x.png"  v-if="userInfo.toutiaoOauthStatus" mode="widthFix" class="icon"></image>
					<image src="../../../static/center/me_list_ic_wechatattestation@2x.png"  v-if="userInfo.weixinOauthStatus" mode="widthFix" class="icon"></image> -->
				</view>
				<!-- <open-data type="userNickName"  class="font-b blod"></open-data> -->
			</view>
			<!-- <view class="flex-r-between exchange">
				<view class="flex">
					<image src="../../../static/me_list_ic_baby@2x.png" mode="widthFix" class="icon"></image>
					<text>宝宝贝：3087</text>
				</view>
				<view class="">前往兑换</view>
			</view> -->
		</view>
		<!-- <view class="list-cell flex-r-between">
			<view class="list-cell-left flex-r-center">
				<image src="../../../static/me_list_ic_babyadministration@2x.png" mode="widthFix" class="icon"></image>
				<text class="">宝宝管理</text>
			</view>
			<view class="list-cell-right flex-r-center">
				<text class="iconfont iconarrow-right-copy" style="color:
				 #B2B2B2;"></text>
			</view>
		</view>
		<navigator url="../address/address-list/address-list" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<image src="../../../static/me_list_ic_address@2x.png" mode="widthFix" class="icon"></image>
					<text class="">收件地址</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator> -->
		<navigator url="../collect/list/list" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<image src="../../../static/me_list_ic_collection@2x.png" mode="widthFix" class="icon"></image>
					<text class="">文章收藏</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator>
		<view class="list-cell flex-r-between">
			<view class="list-cell-left flex-r-center">
				<image src="../../../static/me_list_ic_follow@2x.png" mode="widthFix" class="icon"></image>
				<text class="">主题关注</text>
			</view>
			<view class="list-cell-right flex-r-center">
				<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
			</view>
		</view>
		<!-- <navigator url="../comment/list/list" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<image src="../../../static/me_list_ic_comment@2x.png" mode="widthFix" class="icon"></image>
					<text class="">我的评论</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator> -->
		<navigator url="../shield-author/shield-author" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<image src="../../../static/me_list_ic_shield@2x.png" mode="widthFix" class="icon"></image>
					<text class="">我屏蔽的作者</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator>
		<navigator url="../record/list/list" hover-class="none">
			<view class="list-cell flex-r-between">
				<view class="list-cell-left flex-r-center">
					<image src="../../../static/me_list_ic_record@2x.png" mode="widthFix" class="icon"></image>
					<text class="">浏览记录</text>
				</view>
				<view class="list-cell-right flex-r-center">
					<text class="iconfont iconarrow-right-copy" style="color: #B2B2B2;"></text>
				</view>
			</view>
		</navigator>
		<!-- <button open-type="launchApp" app-parameter="wechat" binderror="launchAppError">打开APP</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {

		},
		onShow() {
			this.api.center.user.get_detail({}, res => {
				console.log(res)
				this.userInfo = res.data
			})
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fdfdfd;
		padding: 30upx;
		box-sizing: border-box;
	}

	.header {
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 30upx;
		box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
		margin-bottom: 40upx;
		.icon{
			width: 50upx;
		}
		.nick-name{
			font-size: 32upx;
		}
		.portrait {
			width: 100upx !important;
			height: 100upx !important;
			border-radius: 50%;
			margin-right: 10upx;
		}
	}

	.exchange {
		height: 60upx;
		border-radius: 30upx;
		background-color: #ffecec;
		color: #FC4041;
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
	}
</style>
