<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的评论</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="您还没有评论,快去评论吧~"></empty>
		<view class="container">
			<view class="list-item" v-for="(el,index) in list" :key="index">
				<view class="item">
					<image :src="el.avatar" mode="widthFix" class="avatar-img"></image>
					<view class="content-box">
						<view class="">
							{{el.nickName}}
						</view>
						<view class="gray">
							{{el.ctime | transformDate}}
						</view>
						<view class="break-word">
							{{el.content}}
						</view>
						<view class="article-box flex-r-between" @click="goDetail(el)">
							<image src="/static/comment_list_ic_article@3x.png" mode="widthFix" v-if="el.articleShowType==0 || el.articleShowType==1 ||el.articleShowType==2 ||el.articleShowType==3"></image>
							<image src="/static/comment_list_ic_voice@3x.png" mode="widthFix" v-if="el.articleShowType==4"></image>
							<image src="/static/comment_list_ic_video@3x.png" mode="widthFix" v-if="el.articleShowType==5"></image>
							<image src="/static/comment_list_ic_question@3x.png" mode="widthFix" v-if="el.articleShowType==6"></image>
							<view class="sigle-line-text-2 title">
								{{el.articleTitle}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	export default {

		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多评论了"
				},
				list: [],
			};
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.center.comment.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res.data)
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
					uni.hideLoading()
				})
			},
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				offset += total
				this.init()
			},
			goDetail(el) {
				if (el.articleShowType !== 6) {
					uni.navigateTo({
						url: "/pages/home/article/detail/detail?id=" + el.articleId
					})
				}
			}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.container {
		padding-left: 30upx;
		width: 100%;
		box-sizing: border-box;

		.list-item {
			border-bottom: 2upx solid #f5f5f5;
			padding: 20upx 20upx 20upx 0;
			width: 100%;

			.item {
				display: flex;
				flex-direction: row;

				.avatar-img {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin-right: 30upx;
				}

				.content-box {
					width: calc(100% - 110upx);

					.article-box {
						margin-top: 20upx;
						width: 100%;
						height: 120upx;
						background-color: #f5f5f5;

						image {
							width: 120upx !important;
							height: 120upx !important;
						}

						.title {
							width: calc(100% - 120upx);
							box-sizing: border-box;
							padding: 10upx;
							height: 120upx;
						}
					}
				}
			}

		}
	}
</style>
