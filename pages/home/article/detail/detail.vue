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
			
			<view class="pd-box rich-box" v-if="info.showType==0 || info.showType==1 || info.showType==2 || info.showType==3 ">
				<u-parse :content="info.content | imgConversion" @preview="preview" />
			</view>
			<!-- http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4 -->
			<view class="flex-r-center" v-if="info.showType==5">
				<imt-audio color="#FC4041" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3" duration="10"></imt-audio>
			</view>
		<!-- 	<view class="flex-r-center" v-if="info.showType==5">
				<video class="video" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4" autoplay   controls></video>
			</view> -->
			<view class="fixed-bottom  bg-white" v-if="!showCommentPublish">
				<view class="flex-r-between">
					<!-- <button plain="true" open-type="launchApp" :app-parameter="parames" @error="launchAppError" class="launchApp-btn flex gray comment-box">
						<view class="mgr-10 iconfont iconpinglun1"></view>
						<text style="font-size: 26upx;">缺少你的评论...</text>
					</button> -->
					<view class="launchApp-btn flex gray comment-box" v-if="hasMobile" @click="showCommentPublish=true">
						<view class="mgr-10 iconfont iconpinglun1"></view>
						<text style="font-size: 26upx;">缺少你的评论...</text>
					</view>
					<button plain="true" open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="launchApp-btn flex gray comment-box"
					 v-else>
						<view class="mgr-10 iconfont iconpinglun1"></view>
						<text style="font-size: 26upx;">缺少你的评论...</text>
					</button>
					<view class="" style="position: relative;" @click="scrollIntoComment">
						<view class="iconfont iconpinglun2"></view>
						<view class="comment-num bg-default-color flex-r-center" v-if="info.commentNum > 0">{{ info.commentNum > 99 ? '99+' : info.commentNum }}</view>
					</view>
					<view class="iconfont " :class="{ iconshoucang: info.faFlag, iconshoucang1: !info.faFlag, red: info.faFlag }"
					 @click="toggleCollect"></view>
					<view class="iconfont icondianzan11" :class="{ red: info.praiseFlag }" @click="togglePraise"></view>
					<button open-type="share" plain="true" hover-class="none" type="default" class="share-btn">
						<view class="iconfont iconweixin" style="color:#09BB07;"></view>
					</button>
				</view>
			</view>
			<view class="mask publish-mask" v-else @click="showCommentPublish=false">
				<view class="fixed-bottom  bg-white" @click.stop :style="[{'bottom':publishBottom+'px'}]">
					<textarea placeholder-class="gray" v-model="publishText" :focus="showCommentPublish" @blur="publishBlur" @focus="publishFocus"
					 :adjust-position="false" placeholder="缺少你的评论..." class="publish-textarea" />
					<view class="flex-r-between">
						<view class=""></view>
						<view class=" publish-btn-out" :class="{'publish-btn-on':publishText}" @click="addComment()">
							发布
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pd-box" id="comments">
			<view class="blod">
				<text class="mgr-10">全部评论</text>
				<text>{{ info.commentNum }}</text>
			</view>
		</view>
		<view class="pd-box item-list border-bottom" v-for="(el, i) in commentList" :key="i">
			<view class="flex">
				<view class="" style="width: 15%;">
					<image :src="el.avatar" mode="widthFix" class="header"></image>
				</view>
				<view class="" style="width: 85%;">
					<view class="flex-r-between">
						<text>{{ el.nickName }}</text>
						<view class="flex">
							<text>{{ el.praiseNum | articleDataNum }}</text>
							<text class="iconfont icondianzan11 mgl-10 gray" :class="{ red: el.praiseFlag }" @click="toggleCommentPraise(el.commentId, i)"></text>
						</view>
					</view>
					<view class="" style="padding: 20upx 0;">{{ el.content }}</view>
					<view class="flex small">
						<text class="mgr-20">{{ el.ctime | transformDate }}</text>
						<button plain="true" open-type="launchApp" :app-parameter="parames" @error="launchAppError" class="launchApp-btn flex gray comment-box">
							<view class="small">{{ el.replyNum > 0 ? el.replyNum : '' | articleDataNum }}回复</view>
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
	import {
		getImgsrc
	} from '@/common/util/index.js';
	import uParse from '@/components/un-parse/u-parse.vue'; //由于插件上传命名问题在目录上加了一个n
	import	imtAudio from '@/components/imt-audio/imt-audio.vue';
	export default {
		components: {
			uParse,
			imtAudio
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			this.addArticleCountNum('forwardNum');
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
				showCommentPublish:false,
				commentList: [],
				loadingType: 0,
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多评论了'
				},
				hasMobile: false,
				publishBottom:0,
				publishText:"",
				wxSessionKey:""
			};
		},
		onLoad(options) {
			id = options.id;
			console.log('id============' + id);
			uni.checkSession({
				success:()=> {
					this.wxSessionKey=uni.getStorageSync('wxSessionKey')
					console.log('wxSessionKey有效')
					if (!this.wxSessionKey) {
						this.getWxSessionKey()
					}
				},
				fail:()=> {
					console.log('wxSessionKey过期')
					this.getWxSessionKey()
				}
			})
			
			if (uni.getStorageSync("access_token")) {
				this.api.center.user.get_detail(null, res => {
					console.log(res);
					this.hasMobile = res.data.phone ? true : false
				});
			}
			this.parames = {
				articleId: id,
				target: 'articleDetail'
			};
			this.parames = JSON.stringify(this.parames);
			this.init();
			this.addArticleCountNum('clickNum');
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			getWxSessionKey(){
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						console.log(loginRes)
						// this.code = loginRes.code;
						this.api.home.get_wx_sessionKey({
							code: loginRes.code
						}, res => {
							console.log(res)
							this.wxSessionKey = res.data
							uni.setStorageSync('wxSessionKey',res.data)
						})
					}
				});
			},
			init() {
				uni.showLoading({
					title: '加载中'
				});
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
							},
							res => {
								console.log(res);
								this.commentList = res.data;
								uni.hideLoading();
							}
						);
					}
				);
			},
			getphonenumber(e) {
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					let encryptedData = e.detail.encryptedData;
					let iv = e.detail.iv;
					this.api.home.get_wx_mobile({
						encryptedData,
						iv,
						sessionKey:this.wxSessionKey
					}, res => {
						console.log(res)
						this.api.home.bind_mobile({
							phone: res.data
						}, res => {
							uni.showToast({
								title: "绑定成功",
								success: () => {
									this.hasMobile = true
								}
							})
						})
					})
				}
			},
			addArticleCountNum(type) {
				this.api.home.article.add_count({
						articleId: id,
						type
					},
					res => {
						console.log(res);
					}
				);
			},
			getMoreComment() {
				offset += total;
				this.api.home.article.get_comment_list({
						ctime,
						articleId: id,
						offset,
						total
					},
					res => {
						console.log(res);
						if (res.data.length) {
							this.commentList = this.commentList.concat(res.data);
							this.loadingType = 0;
						} else {
							this.loadingType = 2;
						}
					}
				);
			},
			addComment(){
				if (!this.publishText) {
					return
				}
				this.api.home.article.comment({
					articleId:id,
					content:this.publishText
				},res=>{
					console.log(res)
					uni.showToast({
						title:"评论成功"
					})
					this.commentList.unshift(res.data);
					this.scrollIntoId = 'comments';
					this.publishText="";
					this.showCommentPublish=false;
				})
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
						if (this.info.faFlag) {
							uni.showToast({
								title: '收藏成功'
							});
						} else {
							uni.showToast({
								title: '取消收藏'
							});
						}
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
						if (this.info.praiseFlag) {
							uni.showToast({
								title: '点赞成功'
							});
						} else {
							uni.showToast({
								title: '取消点赞'
							});
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
							this.commentList[i].praiseNum++;
							uni.showToast({
								title: '点赞成功'
							});
						} else {
							this.commentList[i].praiseNum--;
							uni.showToast({
								title: '取消点赞'
							});
						}
					}
				);
			},

			scrolltolower() {
				if (this.loadingType != 0) {
					return;
				}
				this.loadingType = 1;
				this.getMoreComment();
			},
			launchAppError(e) {
				console.log(e);
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
			},
			publishFocus(e){
				console.log(e)
				this.publishBottom=e.detail.height;
				console.log(this.publishBottom)
			},
			publishBlur(){
				this.publishBottom=0;
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
	.publish-btn-out{
		padding: 0 30upx;
		border-radius: 30upx;
		background-color: #f8f8f8;
	}
	.publish-btn-on{
		padding: 0 30upx;
		border-radius: 30upx;
		background-color: $uni-color-default;
		color: white;
	}
	.publish-textarea{
		background-color: #f8f8f8;
		height: 100px !important;
		width: 100%;
		margin: 20upx 0;
		padding: 20upx;
		border-radius: 10upx;
	}
	.video{
		width: 90%;
		height: 500upx;
	}
</style>
