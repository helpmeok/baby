<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isDelete="true" v-on:deleteHandle="deleteHandle" v-if="cuText=='我的回答'">
			<block slot="backText"></block>
			<block slot="content">{{cuText}}</block>
		</cu-custom>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" v-else>
			<block slot="backText"></block>
			<block slot="content">{{cuText}}</block>
		</cu-custom>
		<view class="header">
			<view class="pd-box flex-r-between author">
				<view class="flex" @click="goFamous">
					<image :src="info.userAvatar" mode="widthFix"></image>
					<view class="mgl-20">
						<view class=" blod article-font">{{ info.userName }}</view>
						<view class=" small gray">{{ info.oauthIntro }}</view>
					</view>
				</view>
				<view class="tag white small" v-if="info.categoryName" @click="goCategory">{{ info.categoryName }}</view>
			</view>
			<view class="question-box">
				<view class="question">
					<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
					<view class="font-b blod text">
						{{info.title}}
					</view>
				</view>
				<scroll-view scroll-x  style="height: 160upx;margin-bottom: 30upx;width: 100%;" v-if="info.attachment.length>0">
					<view class="image-box" :style="{'width':imageScrollWidth+'px'}">
						<image class="img" :src="el.url" mode="aspectFill" @click="previewImage(info.attachment,i)" v-for="(el,i) in info.attachment" :key="i"></image>
					</view>
				</scroll-view>
				<view class="flex-r-between">
					<view class="gray">
						{{info.answerCnt}}个回答
					</view>
					<view class="flex" @click="goAnswer()" v-if="!info.isAnswered">
						<view class="default-color">
							我来回答
						</view>
						<image src="/static/qa_card_ic_answer_nor@3x.png" mode="widthFix" class="answer-icon"></image>
					</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		<view class="pd-box comment-box border-bottom">
			<view class="flex-r-between">
				<view class="flex">
					<image :src="answer.userAvatar" mode="widthFix" class="header mgr-20"></image>
					<view class="">
						<view class="article-font">{{answer.userName}}</view>
						<view class="gray">{{answer.userOauthIntro}}</view>
					</view>
				</view>
				<view class="flex"  @click="toggleCommentPraise()">
					<text>{{answer.supportCnt | articleDataNum}}</text>
					<text class="iconfont icondianzan11 mgl-10 gray" :class="{'red':answer.praiseFlag}"></text>
				</view>
			</view>
			<view class="sigle-line-text-2" style="padding: 20upx 0;">
				{{answer.content}}
			</view>
			<view class="image-box" v-if="answer.attachment.length>0">
				<image :src="el.url" mode="aspectFill" class="image" @click="previewImage(answer.attachment,i)" v-for="(el,i) in answer.attachment" :key="i"></image>
			</view>
		</view>
	</view>
</template>

<script>
	let questionId = "",
		replayId = ""
	export default {
		data() {
			return {
				cuText: "",
				userId: "",
				info: {
					attachment: [],
					answerCnt: 0,
					title: "",
					userOauthIntro: "",
					userName: "",
					userAvatar: ""
				},
				answer: {
					userAvatar: "",
					userName: "",
					userOauthIntro: "",
					supportCnt: "",
					content: ""
				}
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中"
			})
			this.answer = JSON.parse(uni.getStorageSync('answerInfo'))
			this.api.center.user.get_detail(null, res => {
				console.log(res);
				this.userId = options.userId
				this.cuText = options.userId==res.data.uid ? "我的回答" : this.answer.userName+'的回答'
				console.log(this.cuText)
				console.log(options)
				console.log(res.data.uid)
			});	
			questionId = this.answer.questionId
			replayId = this.answer.id
			console.log(this.answer)
			this.init()
		},
		computed: {
			imageScrollWidth() {
				return uni.upx2px(180 * this.info.attachment.length)
			}
		},
		methods: {
			init() { //初始化详情
				this.api.home.qa.question.get_detail({
						questionId
					},
					res => {
						console.log(res);
						this.info = res.data;
						uni.hideLoading()
					}
				);
			},
			previewImage(list, i) {
				let urls = [];
				urls = list.map(el => {
					return el.url;
				});
				uni.previewImage({
					current: i,
					urls: urls
				});
			},
			deleteHandle() {
				uni.showModal({
					title: '是否确认删除',
					content: '确定删除您的回答内容吗？',
					success: (res) => {
						if (res.confirm) {
							this.api.center.qa.answer.delete_byId({
								replayId,
								questionId
							}, res => {
								uni.showToast({
									title: "删除成功",
									success: () => {
										uni.setStorageSync('refreshPage', true)
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 1000)
									}
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			goFamous() {
				uni.navigateTo({
					url: '../../celebrity/detail/detail?id=' + this.info.userId
				});
			},
			toggleCommentPraise() {
				this.api.home.qa.answer.toggle_praise({
						replayId,
						action: this.answer.praiseFlag ? 0 : 1
					},
					res => {
						this.answer.praiseFlag = !this.answer.praiseFlag;
						uni.setStorageSync('refreshPage', true)
						if (this.answer.praiseFlag) {
							this.answer.supportCnt++
							uni.showToast({
								title: "点赞成功"
							})
						} else {
							this.answer.supportCnt--
							uni.showToast({
								title: "取消点赞"
							})
						}
					}
				);
			},
			goAnswer() {
				let obj = {
					title: this.info.title,
					answerCnt: this.info.answerCnt
				}
				uni.setStorageSync('questionInfo', JSON.stringify(obj))
				uni.navigateTo({
					url: "/pages/home/question/commit/commit?id=" + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
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

		.line {
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

			.image-box {
				display: flex;
				flex-direction: row;
				.img {
					width: 160upx !important;
					height: 160upx !important;
					margin-right: 20upx;
				}
			}

			.answer-icon {
				width: 40upx;
			}
		}
	}

	.comment-box {
		.header {
			width: 80upx !important;
			height: 80upx !important;
			border-radius: 50%;
		}
		.image-box {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.image {
				width: 30% !important;
				height: 220upx !important;
				margin-right: 3%;
				margin-bottom: 20upx;
			}
		}
	}
</style>
