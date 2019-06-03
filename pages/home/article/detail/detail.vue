<template>
	<scroll-view scroll-y class="scroll-view" :scroll-into-view="scrollIntoId" enable-back-to-top="true" @scroll="scroll"
	 @scrolltolower="scrolltolower">
		<view>
			<!-- <view class="pd-box rich-box" :style="{'height':richTextHeight+'px'}">
				<rich-text :nodes="content | imgConversion" id="rich"></rich-text>
				<view class="fuzzy-box" v-if="isShowMore">
				</view>
			</view>
			<view class="fake-box">
				<rich-text :nodes="content | imgConversion" id="fake-rich"></rich-text>
			</view>
			<view class="pd-box" v-if="isShowMore" @click="showAll">
				<view class="read-all red flex-r-center">
					<text>阅读全文</text>
					<text class="iconfont iconxiangxia mgl-10 red"></text>
				</view>
			</view> -->
			<view class="pd-box blod " style="font-size: 42upx;">{{ info.title }}</view>
			<view class="pd-box flex-r-between author">
				<view class="flex" @click="goFamous">
					<image :src="info.userAvatar" mode="widthFix"></image>
					<view class="mgl-20">{{ info.author }}</view>
				</view>
				<view class="tag white small" v-if="info.categoryName" @click="goCategory">{{ info.categoryName }}</view>
			</view>
			<view class="pd-box rich-box">
				<!-- <rich-text :nodes="info.content | imgConversion" id="rich"></rich-text> -->
				<u-parse :content="info.content | imgConversion" @preview="preview" />
			</view>
			<view class="fixed-bottom  bg-white">
				<view class="flex-r-between">
					<button plain="true" open-type="launchApp" :app-parameter="parames" @error="launchAppError" class="launchApp-btn flex gray comment-box">
						<!-- <view class="flex gray comment-box"> -->
						<view class="mgr-10 iconfont iconpinglun1"></view>
						<text style="font-size: 26upx;">缺少你的评论...</text>
						<!-- </view> -->
					</button>
					<view class="" style="position: relative;" @click="scrollIntoComment">
						<view class="iconfont iconpinglun2"></view>
						<view class="comment-num bg-default-color flex-r-center" v-if="info.commentNum > 0">{{ info.commentNum>99?"99+":info.commentNum }}</view>
					</view>
					<view class="iconfont " :class="{ iconshoucang: info.faFlag, iconshoucang1: !info.faFlag, red: info.faFlag }"
					 @click="toggleCollect"></view>
					<view class="iconfont icondianzan11" :class="{ red: info.praiseFlag }" @click="togglePraise"></view>
					<button open-type="share" plain="true" hover-class="none" type="default" class="share-btn">
						<view class="iconfont iconweixin" style="color:#09BB07;"></view>
					</button>
				</view>
			</view>
		</view>
		<view class="pd-box" id="comments">
			<view class="blod">
				<text class="mgr-10">全部评论</text>
				<text>{{ info.commentNum }}</text>
			</view>
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
		<view class="" style="height: 80px;"></view>
	</scroll-view>
</template>

<script>
	let id = '';
	let timer;
	let heightArr = [];
	let ctime = parseInt(Date.now());
	let offset = 0,
		total = 10;
	// Page({
	//   launchAppError(e) {
	//     console.log(e.detail.errMsg)
	//   }
	// })
	import {
		getImgsrc
	} from '@/common/util/index.js';
	import uParse from '@/components/un-parse/u-parse.vue'; //由于插件上传命名问题在目录上加了一个n
	export default {
		components: {
			uParse
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			this.addArticleCountNum('forwardNum')
			return {
				title: this.info.title,
				path: '/pages/home/index/index?articleId=' + id,
				imageUrl: this.info.attachment[0].url
			};
		},
		data() {
			return {
				info: {},
				richTextHeight: 0,
				isShowMore: false,
				articleHeight: 0,
				parames: {},
				scrollIntoId: '',
				old: {
					scrollTop: 0
				},
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
			// setTimeout(() => {
			// 	this.richTextHeight = Math.max.apply(null,heightArr)
			// 	clearInterval(timer)
			// }, 5000)
		},
		onUnload() {
			offset = 0;
		},
		// async onReady() {
		// 	timer = setInterval(async () => {
		// 		var size = await this.getElSize('fake-rich')
		// 		heightArr.push(size.height)
		// 		console.log(Math.max.apply(null,heightArr))
		// 		if (Math.max.apply(null,heightArr) >= this.screenHeight * 2) {
		// 			this.richTextHeight = this.screenHeight * 2
		// 			this.isShowMore = true
		// 		} else {
		// 			this.richTextHeight = Math.max.apply(null,heightArr)
		// 			this.isShowMore = false
		// 		}
		// 	}, 100)
		// },
		methods: {
			init() {
				uni.showLoading({
					title: "加载中"
				})
				this.api.home.article.get_detail({
						article_id: id,
						request_type: 'h5'
					},
					res => {
						console.log(res.data);
						this.info = res.data;
						this.api.home.article.get_comment_list({
							ctime,
							articleId: id,
							offset,
							total
						}, res => {
							console.log(res)
							this.commentList = res.data
							uni.hideLoading()
						});
					}
				);
			},
			addArticleCountNum(type){
				this.api.home.article.add_count({
					articleId: id,
					type
				},res=>{
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
			scroll() {
				this.scrollIntoId = '';
			},
			scrollIntoComment() {
				this.scrollIntoId = 'comments';
				console.log(this.scrollIntoId);
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
			toggleCollect() {
				console.log('id============' + id);
				this.api.home.article.toggle_collect({
						articleId: id,
						action: this.info.faFlag ? 0 : 1
					},
					res => {
						this.info.faFlag = !this.info.faFlag;
					}
				);
			},
			togglePraise() {
				console.log('id============' + id);
				this.api.home.article.toggle_praise({
						articleId: id,
						action: this.info.praiseFlag ? 0 : 1
					},
					res => {
						this.info.praiseFlag = !this.info.praiseFlag;
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
						} else {
							this.commentList[i].praiseNum--
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
			launchAppError(e) {
				console.log(e)
				uni.showModal({
					title: '提示',
					content: '更多功能，请下载“宝宝贝”APP',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
			// showAll() {
			// 	clearInterval(timer)
			// 	this.richTextHeight = Math.max.apply(null,heightArr)
			// 	this.isShowMore = false
			// }
		}
	};
</script>

<style lang="scss">
	.rich-box {
		overflow: hidden;
		position: relative;
		z-index: 1;

		.fuzzy-box {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 200upx;
			filter: blur(2px);
			background-color: white;
			opacity: 0.8;
			z-index: 2;
		}
	}

	.comment-num {
		position: absolute;
		color: white;
		right: -20upx;
		top: -5upx;
		width: 40upx;
		height: 30upx;
		border-radius: 15upx;
		font-size: 16upx;
	}

	.read-all {
		height: 60upx;
		border-radius: 31upx;
		border: 2upx solid #e33;
	}

	.fake-box {
		height: 0 !important;
		overflow: hidden;
	}

	.author {
		image {
			width: 60upx !important;
			height: 60upx !important;
			border-radius: 50%;
		}

		.tag {
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('~@/static/com_list_pic@2x.png');
			padding: 5upx 20upx;
		}
	}

	.fixed-bottom {
		border-top: 2upx solid #f5f5f5;
		padding: 20upx 50upx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.comment-box {
			background-color: #f5f5f5;
			border-radius: 30upx;
			padding: 0 100upx 0 20upx !important;
			border: none !important;
			margin: 0 !important;
		}
	}

	.scroll-view {
		box-sizing: border-box;
		height: 100% !important;
	}

	.share-btn {
		border: none !important;
		margin: 0 !important;
		padding: 0 !important;
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
</style>
