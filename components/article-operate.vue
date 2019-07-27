<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }" @click="hide"></view>
		<view class="uni-popup" :class="{ 'uni-popup-show': show }" @click.stop :style="{ top: top + 'px' }">
			<view class="item flex" @click="unInterest(articleId,index)">
				<text class="iconfont iconerror-1"></text>
				<text>不感兴趣</text>
			</view>
			<view class="item flex" @click="shield(userId,index)">
				<text class="iconfont iconpingbi1"></text>
				<text>屏蔽作者</text>
			</view>
			<view class="item flex" @click="unInterest(articleId,index)">
				<text class="iconfont iconzhongfubaojing"></text>
				<text>内容重复</text>
			</view>
			<view class="item flex" style="border: none;" @click="unInterest(articleId,index)">
				<text class="iconfont iconbuganxingqu"></text>
				<text>内容引起不适</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			top: {
				type: Number,
				default: 0
			},
			articleId: {
				type: Number,
				default: 0
			},
			userId: {
				type: Number,
				default: 0
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			offsetTop = 44;
			//#endif
			return {};
		},
		methods: {
			hide() {
				this.$emit('hideArticleOperate');
			},
			shield(userId) {
				console.log(userId)
				this.api.home.article.toggle_shield({
					vid: userId,
					action: 1
				}, res => {
					this.hide();
					this.$emit('refreshList');
					uni.showToast({
						title:"屏蔽成功",
					})
				})
			},
			unInterest(articleId, index) {
				console.log(articleId)
				this.api.home.article.un_interest({
					articleId
				}, res => {
					this.hide();
					this.$emit('removeArticle', index);
					uni.showToast({
						title:"谢谢您的反馈",
						icon:"none"
					})
				})
			}
		},

	};
</script>
<style lang="scss" scoped>
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}


	.uni-popup {
		position: absolute;
		z-index: 999;
		right: 30upx;
		box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
		border-radius: 10upx;
		height: 200px;
		transform: scale(0);

		.item {
			height: 50px;
			border-bottom: 2upx solid #f5f5f5;
			padding: 0upx 30upx;

			.iconfont {
				margin-right: 20upx;
				font-size: 50upx;
				color: gray;
			}
		}
	}

	.uni-popup-show {
		transform: scale(1, 1);
		transition: all .3s ease 0s;
	}
</style>
