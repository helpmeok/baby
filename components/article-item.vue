<template>
	<view>
		<view class="list-item" v-for="(item, index1) in list" :key="index1" @click="goDetail(item.articleId)">
			<view class="pd-box">
				<view class="flex-r-between">
					<view class="flex">
						<image :src="item.userAvatar" mode="widthFix" class="portrait"></image>
						<text class="blod">{{ item.userName }}</text>
					</view>
					<view class="tag white small" v-if="item.categoryName">{{ item.categoryName}}</view>
				</view>
				<view class="flex-r-between content">
					<view class="desc" style="width: 72%;">{{ item.title }}</view>
					<image :src="item.image" mode="widthFix" class="image"></image>
				</view>
				<view class="flex-r-between">
					<view class="flex">
						<view class="list-item-icon flex">
							<text class="iconfont iconliulan gray"></text>
							<text class="small gray">{{item.clickNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<text class="iconfont iconiconfontzhizuobiaozhun44 gray"></text>
							<text class="small gray">{{item.praiseNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<text class="iconfont iconpinglun gray"></text>
							<text class="small gray">{{item.commentNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<text class="iconfont iconzhuanfa gray"></text>
							<text class="small gray">{{item.forwardNum}}</text>
						</view>
					</view>
					<image src="../../../static/com_list_ic_more_nor@2x.png" mode="widthFix" class="icon-more-nor" @click.stop="showMoreMask($event, item.articleId)"></image>
				</view>
			</view>
			<view class="cut-off"></view>
		</view>
		<!-- <article-operate :show="showArticleOperate" :top="articleOffsetTop" :id="articleId" v-on:hideArticleOperate="hideArticleOperate"></article-operate> -->
	</view>
</template>

<script>
	export default {
		name: "article-item",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				showArticleOperate: false,
				articleId: '',
				articleOffsetTop: 0,
			};
		},
		methods: {
			showMoreMask(e) {
				this.$emit('showOperate', e)
			},
			hideArticleOperate() {
				this.showArticleOperate = false;
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/home/article/detail/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-item {
		.portrait {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin-right: 30upx;
		}
		
		&-icon {
			margin-right: 20upx;

			.iconfont {
				margin-right: 10upx;
			}
		}

		.tag {
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('~@/static/com_list_pic@2x.png');
			padding: 5upx 20upx;
		}

		.icon-more-nor {
			width: 60upx;
		}

		.content {
			padding: 20upx 30upx;
			box-sizing: border-box;
			background-color: #f5f5f5;
			width: 100%;
			margin: 30upx 0;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}

			.image {
				width: 120upx;
			}
		}
	}
</style>
