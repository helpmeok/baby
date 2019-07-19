<template>
	<scroll-view scroll-y class="scroll-view" :scroll-into-view="scrollIntoId" enable-back-to-top="true" @scroll="scroll"
	 @scrolltolower="scrolltolower">
		<cu-custom bgColor="bg-gradual-red" :isCustom="true" :helper="true">
			<block slot="backText"></block>
			<block slot="content">宝宝贝</block>
		</cu-custom>
		<view>
			<view class="pd-box blod " style="font-size: 42upx;">{{ info.title }}</view>
			<view class="pd-box flex-r-between author">
				<view class="flex" @click="goFamous">
					<image :src="info.userAvatar" mode="widthFix"></image>
					<view class="mgl-20">
						<view class=" blod article-font">{{ info.author }}</view>
						<view class=" small gray">{{ info.oauthIntro }}</view>
					</view>
				</view>
				<view class="tag white small" v-if="info.categoryName" @click="goCategory">{{ info.categoryName }}</view>
			</view>
			<view class="question-box">
				<view class="question">
					<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
					<view class="font-b blod text">
						孕妈如何撒孕妈如何撒孕妈如何撒孕妈如何撒孕妈如何撒
					</view>
				</view>
				<view class="flex-r-between">
					<view class="gray">
						29个回答
					</view>
					<view class="flex" @click="answer()">
						<view class="default-color">
							我来回答
						</view>
						<image src="/static/qa_card_ic_answer_nor@3x.png" mode="widthFix" class="answer-icon"></image>
					</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		<view class="pd-box item-list border-bottom" v-for="(el,i) in commentList" :key="i">
			<view class="flex">
				<view class="" style="width: 15%;">
					<image :src="el.avatar" mode="widthFix" class="header"></image>
				</view>
				<view class="" style="width: 85%;">
					<view class="flex-r-between">
						<text>{{el.nickName}}</text>
						<view class="flex">
							<text>{{el.praiseNum | articleDataNum}}</text>
							<text class="iconfont icondianzan11 mgl-10 gray" :class="{'red':el.praiseFlag}" @click="toggleCommentPraise(el.commentId,i)"></text>
						</view>
					</view>
					<view class="" style="padding: 20upx 0;">
						{{el.content}}
					</view>
					<view class="flex small">
						<text class="mgr-20">{{el.ctime | transformDate}}</text>
						<button plain="true" open-type="launchApp" :app-parameter="parames" @error="launchAppError" class="launchApp-btn flex gray comment-box">
							<view class="small">{{el.replyNum>0?el.replyNum:"" | articleDataNum}}回复</view>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-tab-bar-loading">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
		<view class="fixed-bottom flex-r-between">
			<navigator url="/pages/home/question/commit/commit" hover-class="none" class="bg-default-color white confrim-btn flex-r-center">
				发布新问题
			</navigator>
			<button open-type="share" plain="true" hover-class="none" type="default" class="share-btn">
				<view class="iconfont iconweixin" style="color:#09BB07;"></view>
			</button>
		</view>
	</scroll-view>
</template>

<script>
	let id = '';
	let ctime = parseInt(Date.now());
	let offset = 0,
		total = 10;
	export default {
		components: {},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			this.addArticleCountNum('forwardNum')
			return {
				title: this.info.title,
				path: '/pages/home/index/index?qaId=' + id,
				imageUrl: this.info.attachment[0].url
			};
		},
		data() {
			return {
				info: {},
				parames: {},
				commentList: [],
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多评论了"
				},
			};
		},
		onLoad(options) {
			id = options.id;
			console.log('id============' + id);
			this.parames = {
				articleId: id,
				target: 'articleDetail'
			};
			this.parames = JSON.stringify(this.parames);
			this.init();
			this.addArticleCountNum('clickNum')
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				uni.showLoading({
					title: "加载中"
				})
				this.api.home.qa.question.get_detail({
						questionId: id,
					},
					res => {
						console.log(res.data);
						this.info = res.data;
						// this.api.home.article.get_comment_list({
						// 	ctime,
						// 	articleId: id,
						// 	offset,
						// 	total
						// }, res => {
						// 	console.log(res)
						// 	this.commentList = res.data
						// 	uni.hideLoading()
						// });
					}
				);
			},
			answer(){
				uni.navigateTo({
					url:"/pages/home/question/commit/commit?id="+id
				})
			},
			addArticleCountNum(type) {
				this.api.home.article.add_count({
					articleId: id,
					type
				}, res => {
					console.log(res)
				})
			},
			getMoreComment() {
				offset += total
				this.api.home.article.get_comment_list({
					ctime,
					articleId: id,
					offset,
					total
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.commentList = this.commentList.concat(res.data)
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
				});
			},
			getElSize(id) {
				//得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.select('#' + id)
						.fields({
								size: true,
								scrollOffset: true,
								rect: true
							},
							data => {
								res(data);
							}
						)
						.exec();
				});
			},
			goFamous() {
				uni.navigateTo({
					url: '../../celebrity/detail/detail?id=' + this.info.userId
				});
			},
			goCategory() {
				uni.navigateTo({
					url: '../../../classify/detail/detail?id=' + this.info.categoryId
				});
			},
			preview() {},
			togglePraise() {
				console.log('id============' + id);
				this.api.home.article.toggle_praise({
						articleId: id,
						action: this.info.praiseFlag ? 0 : 1
					},
					res => {
						this.info.praiseFlag = !this.info.praiseFlag;
						if (this.info.praiseFlag) {
							uni.showToast({
								title: "点赞成功"
							})
						} else {
							uni.showToast({
								title: "取消点赞"
							})
						}
					}
				);
			},
			toggleCommentPraise(id, i) {
				this.api.home.comment.toggle_praise({
						commentId: id,
						action: this.commentList[i].praiseFlag ? 0 : 1
					},
					res => {
						this.commentList[i].praiseFlag = !this.commentList[i].praiseFlag;
						if (this.commentList[i].praiseFlag) {
							this.commentList[i].praiseNum++
							uni.showToast({
								title: "点赞成功"
							})
						} else {
							this.commentList[i].praiseNum--
							uni.showToast({
								title: "取消点赞"
							})
						}
					}
				);
			},
			scrolltolower() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				this.getMoreComment();
			},
		}
	};
</script>

<style lang="scss">
	.fixed-bottom {
		border-top: 2upx solid #f5f5f5;
		padding: 20upx 50upx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.confrim-btn {
			width: 85%;
			height: 70upx;
			border-radius: 40upx;
			font-size: 32upx;
		}

		.share-btn {
			border: none !important;
			margin: 0 !important;
			padding: 0 !important;

			.iconweixin {
				font-size: 40upx;
			}
		}
	}

	.scroll-view {
		width: 100%;
		box-sizing: border-box;
		height: 100% !important;

		.author {
			image {
				width: 80upx !important;
				height: 80upx !important;
				border-radius: 50%;
			}

			.tag {
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('~@/static/com_list_pic@2x.png');
				padding: 5upx 20upx;
			}
		}
		.line{
			width: calc(100% - 60upx);
			margin-left: 30upx;
			height: 2upx;
			background-color: #EEEEEE;
		}

		.question-box {
			box-sizing: border-box;
			background-color: #ffffff;
			border-radius: 20upx;
			padding: 40upx 30upx;
			box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
			width: calc(100% - 60upx);
			margin-left: 30upx;
			margin-bottom: 40upx;
			margin-top: 30upx;

			.question {
				margin-bottom: 20upx;
				width: 100%;
				.question-icon {
					width: 40upx !important;
					position: relative;
					top: 15upx;
					left: 0;
					float: left;
				}
			}

			.answer-icon {
				width: 40upx;
			}
		}

		.item-list {
			.header {
				width: 80upx !important;
				height: 80upx !important;
				border-radius: 50%;
			}


			.comment-box {
				background-color: #f5f5f5;
				border-radius: 30upx;
				padding: 0 10upx !important;
				border: none !important;
				margin: 0 !important;
			}
		}
	}
</style>
