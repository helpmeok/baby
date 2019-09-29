<template>
	<scroll-view scroll-y class="scroll-view" :scroll-into-view="scrollIntoId" enable-back-to-top="true" @scroll="scroll">
		<cu-custom bgColor="bg-gradual-red" v-on:closeAudio="closeAudio" :isCustom="true" :helper="true">
			<block slot="backText"></block>
			<block slot="content">宝宝贝</block>
		</cu-custom>
		<empty v-if="emptyData" msg="抱歉,该文章失踪了~"></empty>
		<view class="show-container" v-show="isLoad">
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
					<!-- <view class="tag white small" v-if="info.categoryName" @click="goCategory">{{ info.categoryName }}</view> -->
					<view class="flex">
						<view class="tag" v-for="(el,i) in info.tagList" :key="i" @click.stop="geTagDetail(el.tagId)">
							{{el.name}}
						</view>
					</view>
				</view>

				<view class="pd-box rich-box" v-if="info.showType==0 || info.showType==1 || info.showType==2 || info.showType==3 ">
					<u-parse :content="info.content | imgConversion" @preview="preview" />
				</view>
				<!-- http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4 -->
				<view class="flex-r-center" style="margin-bottom: 30upx;" v-if="info.showType==4">
					<imt-audio color="#FC4041" :isPause="isPause" :src="info.attachment[0].url" :title="info.title" :singer="info.userName"
					 :duration="info.attachment[0].duration"></imt-audio>
				</view>
				<view class="flex-r-center" style="margin-bottom: 30upx;" v-if="info.showType==5">
					<video class="video"  id="myVideo" objectFit="fill" :poster="info.attachment[0].thumbnail"
					 :src="info.attachment[0].url" controls :autoplay="!iscover">
						<cover-view style="width: 100%;height: 100%;position: relative;" v-show="showPoster">
							<cover-image style="width: 100%;height: 100%;" :src="info.attachment[0].thumbnail"></cover-image>
							<cover-view class="flex-c-center" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;" @click="listenPlay()">
								<cover-image style="width: 130upx;height: 130upx;" src="/static/details_list_ic_play_nor@3x.png"></cover-image>
							</cover-view>
						</cover-view>
						<cover-view class="cover-mask flex-r-center" v-show="iscover">
							<cover-view class="cover-container bg-white">
								<cover-view class="flex-c-center cover-container-top">
									<cover-view>
										<cover-view class="blod font-b align-center">
											当前非WIFI流量，
										</cover-view>
										<cover-view class="blod font-b pd-box align-center">
											将消耗流量是否继续播放？
										</cover-view>
									</cover-view>
									<cover-view class="cover-container-center gray flex-r-center pd-box ">
										<cover-image class="cover-container-center-img" @click="checkbok(true)" v-if="!isCheckbok" src="/static/babymanage_list_ic_checkbok_nor@2x.png"></cover-image>
										<cover-image class="cover-container-center-img" @click="checkbok(false)" v-if="isCheckbok" src="/static/babymanage_list_ic_checkbok_sel@2x.png"></cover-image>
										<cover-view class="gray mgl-20 font-b">
											一周内不再提醒
										</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="cover-container-bottom flex">
									<cover-view class="align-center btn font-b" @click="cancelVideoCover">取消播放</cover-view>
									<cover-view class="align-center btn bg-default-color white font-b" @click="playvideo">继续播放</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</video>
				</view>
				<view class="fixed-bottom  bg-white" v-if="!showCommentPublish">
					<view class="flex-r-between">
						<view class="launchApp-btn flex gray comment-box" @click="comment">
							<view class="mgr-10 iconfont iconpinglun1"></view>
							<text style="font-size: 26upx;">缺少你的评论...</text>
						</view>
						<view class="flex-r-center" style="position: relative;" @click="scrollIntoComment">
							<!-- <view class="iconfont iconpinglun2"></view> -->
							<image src="/static/com_tab_ic_comment_nor@3x.png" mode="widthFix" class="app-icon"></image>
							<view class="comment-num bg-default-color flex-r-center" v-if="info.commentNum > 0">{{ info.commentNum > 99 ? '99+' : info.commentNum }}</view>
						</view>
						<!-- 	<view class="iconfont " :class="{ iconshoucang: info.faFlag, iconshoucang1: !info.faFlag, red: info.faFlag }"
						 @click="toggleCollect"></view> -->
						<image src="/static/com_tab_ic_like_nor@3x.png" v-if="!info.faFlag" mode="widthFix" class="app-icon" @click="toggleCollect"></image>
						<image src="/static/com_tab_ic_like_sel@3x.png" v-if="info.faFlag" mode="widthFix" class="app-icon" @click="toggleCollect"></image>
						<image src="/static/com_tab_ic_praise_nor@3x.png" v-if="!info.praiseFlag" mode="widthFix" class="app-icon" @click="togglePraise"></image>
						<image src="/static/com_tab_ic_praise_sel@3x.png" v-if="info.praiseFlag" mode="widthFix" class="app-icon" @click="togglePraise"></image>
						<button open-type="share" plain="true" hover-class="none" type="default" class="share-btn flex-r-center">
							<!-- <view class="iconfont iconweixin" style="color:#09BB07;"></view> -->
							<image src="/static/com_tab_ic_forwar_nor@3x.png" mode="widthFix" class="app-icon"></image>
						</button>
					</view>
				</view>
				<view class="mask publish-mask" v-else @click="showCommentPublish=false">
					<view class="fixed-bottom  bg-white" @click.stop :style="[{'bottom':publishBottom+'px'}]">
						<textarea placeholder-class="gray" v-model="publishText" :focus="showCommentPublish" @blur="publishBlur" @focus="publishFocus"
						 :adjust-position="false" placeholder="缺少你的评论..." class="publish-textarea break-word" />
						<view class="flex-r-between">
							<view class=""></view>
							<view class=" publish-btn-out" :class="{'publish-btn-on':publishText}" @click="addComment()">
								发布
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view> -->
			<view class="questions-box" >
				<view class="" style="height: 3upx;background-color: #f5f5f5;width: 100%;"></view>
				<view class="flex pd-box question-list-box" style="padding-top: 0;">
					<view class="list-item pd-lr mgr-20 flex-r-center" v-for="(el,i) in info.questionList" :key="i" @click="goQuestionList(el.questionId,el.questionName)">
						{{el.questionName}}
					</view>
				</view>
			</view>
			<view class="cut-off"></view>
			<view class="comments-box">
				<view class="pd-box" id="comments" style="padding-bottom: 0;">
					<view class="blod flex-r-between">
						<text class="mgr-10 font-b">热门评论</text>
						<view class="gray flex" @click="goAllComments" v-if="info.hotCommentList.length>0">
							<text>更多</text>
							<view class="iconfont iconarrow-right-copy mgl-10"></view>
						</view>
					</view>
				</view>
				<view class="flex-c-center pd-box gray" v-if="info.hotCommentList.length==0">
					暂无评论
				</view>
				<view class="pd-box item-list border-bottom" v-for="(el, i) in info.hotCommentList" :key="i">
					<view class="flex" style="align-items: flex-start;">
						<view class="" style="width: 15%;">
							<image :src="el.avatar" mode="aspectFill" class="header"></image>
						</view>
						<view class="" style="width: 85%;">
							<view class="flex-r-between">
								<text>{{ el.nickName }}</text>
								<view class="flex">
									<text class="gray">{{ el.praiseNum | articleDataNum }}</text>
									<!-- <text class="iconfont icondianzan11 mgl-10 gray" :class="{ red: el.praiseFlag }" @click="toggleCommentPraise(el.commentId, i)"></text> -->
									<image src="/static/com_tab_ic_praise_pre@3x.png" v-if="!el.praiseFlag" mode="widthFix" class="app-icon-praise-s" @click="toggleCommentPraise(el.commentId, i)"></image>
									<image src="/static/com_tab_ic_praise_sel@3x.png" v-if="el.praiseFlag" mode="widthFix" class="app-icon-praise-s" @click="toggleCommentPraise(el.commentId, i)"></image>
								</view>
							</view>
							<view class="break-word" style="padding: 20upx 0;">{{ el.content }}</view>
							<view class="flex small">
								<text class="mgr-20">{{ el.ctime | transformDate }}</text>
								<button plain="true" open-type="launchApp" :app-parameter="parames" @error="launchAppError" class="launchApp-btn flex gray comment-box">
									<view class="small">{{ el.replyNum > 0 ? el.replyNum : '' | articleDataNum }}回复</view>
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cut-off"></view>
			<view class="expend-box" v-if="info.expendList.length>0">
				<view class="pd-box" style="padding-bottom: 0;">
					<view class="blod flex-r-between">
						<text class="mgr-10 font-b">延展阅读</text>
					</view>
				</view>
				<view class="flex-r-between pd-box expend-list">
					<view class="list-item" v-for="(el,i) in info.expendList" :key="i" @click="goOtherArticle(el)">
						<image :src="el.attachment[0].url" v-if="el.attachment.length>0" mode="widthFix" class="image"></image>
						<view class="sigle-line-text-2" style="font-size: 32upx;margin-bottom: 10upx;">
							{{el.title}}
						</view>
						<view class="gray">
							<text class="mgr-20">
								{{el.author}}
							</text>
							<text class="mgr-20">
								{{el.commentNum | articleDataNum}}评论
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cut-off"></view>
			<view class="recommend-box" v-if="info.recommendList.length>0">
				<view class="pd-box" style="padding-bottom: 0;">
					<view class="blod flex-r-between">
						<text class="mgr-10 font-b">推荐阅读</text>
					</view>
				</view>
				<view class="recommend-list">
					<view class="list-item flex-r-between pd-box" v-for="(el,i) in info.recommendList" :key="i" @click="goOtherArticle(el)">
						<image :src="el.attachment[0].url" v-if="el.attachment.length>0" mode="widthFix" class="image"></image>
						<view class="desc">
							<view class="sigle-line-text-2" style="font-size: 32upx;margin-bottom: 10upx;">
								{{el.title}}
							</view>
							<view class="gray">
								<text class="mgr-20">
									{{el.author}}
								</text>
								<text class="mgr-20">
									{{el.commentNum | articleDataNum}}评论
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="height: 80px;"></view>
			<bind-mobile v-on:hideBindMobile="hideBindMobile" :isShow="showBindMobile"></bind-mobile>
		</view>
	</scroll-view>
</template>

<script>
	let id = '';
	let timer;
	let heightArr = [];
	let ctime = parseInt(Date.now());
	let offset = 0,
		total = 10;
		let video;
	import {
		getImgsrc
	} from '@/common/util/index.js';
	import uParse from '@/components/un-parse/u-parse.vue'; //由于插件上传命名问题在目录上加了一个n
	import	imtAudio from '@/components/imt-audio/imt-audio.vue';
	import	bindMobile from '@/components/bind-mobile/bind-mobile.vue';
	export default {
		components: {
			uParse,
			imtAudio,
			bindMobile
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
		watch: {
			// showCommentPublish(newValue, oldValue) {
			// 	console.log(newValue)
			// 	if (newValue) {
			// 		video.pause()
			// 	} else{
			// 		setTimeout(()=>{
			// 			video.play()
			// 		},500)
			// 	}
			// }
		},
		data() {
			return {
				showBindMobile:false,
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
				hasMobile: false,
				publishBottom:0,
				publishText:"",
				wxSessionKey:"",
				isLoad:false,
				iscover:false,
				isCheckbok:true,
				showPoster:false,
				isPause:false,
				isCommentPublish:true,
				emptyData:false
			};
		},
		onReady (res) {
           video = uni.createVideoContext('myVideo')
        },
		watch:{
			isCheckbok(val){
				console.log(val)
				if (val) {
					uni.setStorageSync('networkType',true)
				} else{
					uni.setStorageSync('networkType',false)
				}
			}
		},
		onLoad(options) {
			id = options.id;
			console.log('id============' + id);
			if (uni.getStorageSync("access_token")) {//检查有没有绑定手机
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
			if (this.info.showType==4) {
				const backgroundAudioManager = uni.getBackgroundAudioManager()
				backgroundAudioManager.stop();
			}
			if (this.info.showType==5) {
				video.pause()
			}
		},
		onHide(){
			if (this.info.showType==5) {
				video.pause()
			}
		},
		methods: {
			getNetworkType(){//判断是否使用wifi环境
				// if (uni.getStorageSync('networkType')) {
				// 	this.iscover=false;
				// } else{
				// 	uni.getNetworkType({
				// 		success: (res) => {
				// 			console.log(res)
				// 			if (res.networkType=="wifi") {
				// 				this.iscover=false;
				// 			}else{
				// 				this.iscover=true;
				// 				video.pause();
				// 			}
				// 		}
				// 	})
				// }
			},
			checkbok(val){
				this.isCheckbok=val
			},
			listenPlay(){
				this.getNetworkType();
			},
			cancelVideoCover(){
				this.iscover=false;
				this.showPoster=true
			},
			closeAudio(){
				this.isPause=true;
			},
			playvideo(){
				if (this.isCheckbok) {
					uni.setStorageSync('networkType',true)
				}else{
					uni.setStorageSync('networkType',false)
				}
				this.iscover=false;
				this.showPoster=false;
				video.play();
			},
			hideBindMobile(bind){
				this.showBindMobile=false
				this.hasMobile=bind?true:false
			},
			comment(){
				if (this.hasMobile) {
					this.showCommentPublish=true;
				} else{
					this.api.center.user.get_detail(null, res => {
						console.log(res);
						this.hasMobile = res.data.phone ? true : false
						this.showCommentPublish = res.data.phone ? true : false
						this.showBindMobile = res.data.phone ? false : true
					});
				}
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
						if (res.data) {
							this.info = res.data;
							this.isLoad=true;
							this.getNetworkType()
							uni.hideLoading();
						} else{
							uni.hideLoading();
							this.emptyData=true
						}
					},err=>{
						if (err.code==-2) {
							this.emptyData=true
						} 
					}
				);
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
			addComment(){
				if (!this.publishText || !this.isCommentPublish) {
					return
				}
				this.isCommentPublish=false;
				this.api.home.article.comment({
					articleId:id,
					content:this.publishText
				},res=>{
					console.log(res)
					uni.showToast({
						title:"评论成功"
					})
					this.isCommentPublish=true;
					this.scrollIntoId = 'comments';
					this.publishText="";
					this.showCommentPublish=false;
					if (this.info.hotCommentList.length<3) {
						this.info.hotCommentList.push(res.data)
					}
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
			geTagDetail(id) {
				uni.navigateTo({
					url: "/pages/classify/detail/detail?id=" + id
				})
			},
			goQuestionList(id, name) {
				uni.navigateTo({
					url: "/pages/helper/list/list?id=" + id + "&name=" + name
				})
			},
			goOtherArticle(el){
				uni.navigateTo({
					url: "/pages/home/article/detail/detail?id=" +el.articleId
				})
			},
			goAllComments(){
				uni.navigateTo({
					url: "/pages/home/article/comment/comment?id=" +id
				})
			},
			preview() {},
			toggleCollect() {
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
						action: this.info.hotCommentList[i].praiseFlag ? 0 : 1
					},
					res => {
						this.info.hotCommentList[i].praiseFlag = !this.info.hotCommentList[i].praiseFlag;
						console.log(this.info.hotCommentList[i].praiseFlag)
						if (this.info.hotCommentList[i].praiseFlag) {
							this.info.hotCommentList[i].praiseNum++;
							uni.showToast({
								title: '点赞成功'
							});
						} else {
							this.info.hotCommentList[i].praiseNum--;
							uni.showToast({
								title: '取消点赞'
							});
						}
					}
				);
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
		}
	};
</script>

<style lang="scss" scoped>
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
			// background-repeat: no-repeat;
			// background-size: 100% 100%;
			// background-image: url('~@/static/com_list_pic@2x.png');
			// padding: 5upx 20upx;
			font-size: 22upx;
			border: 2upx solid #E8E8E8;
			border-radius: 20upx;
			padding: 0 10upx;
			margin-right: 10upx;
			color: #404040;
		}
	}

	.fixed-bottom {
		border-top: 2upx solid #f5f5f5;
		// padding-bottom: env(safe-area-inset-bottom);
		// padding-bottom: constant(safe-area-inset-bottom);
		padding: 20upx 50upx;
		.iconfont{
			font-size: 40upx;
		}
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
	.comments-box{
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
	.publish-mask{
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
	}
	
	.video{
		width: 90%;
	}
	.question-list-box{
		.list-item {
			border: 2upx solid #f1f1f1;
			height: 80upx;
			border-radius: 40upx;
			margin-top: 20upx;
		}
	}
	.expend-list{
		width: 100%;
		box-sizing: border-box;
		.list-item {
				width: 48%;
				.image{
					width: 100%;
					height: 230upx !important;
				}
		}
	}
	.recommend-list{
		width: 100%;
		box-sizing: border-box;
		.list-item {
				width: 100%;
				border-bottom: 2upx solid #f5f5f5;
				box-sizing: border-box;
				.image{
					width: 220upx !important;
					height: 170upx !important;
				}
				.desc{
					width: calc(100% - 240upx);
				}
		}
	}
	.cover-mask{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 999;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .3);
		.cover-container{
			width: 90%;
			height: 90%;
			border-radius: 10upx;
			position: absolute;
			.cover-container-top{
				height:calc(100% - 100upx);
			}
			.cover-container-bottom{
				position: absolute;
				bottom: 0;
				left: 0;
				height: 100upx;
				width: 100%;
				border-top: 3upx solid #f5f5f5;
				.btn{
					width: 50%;
					height: 100%;
					line-height: 100upx;
				}
			}
			.cover-container-center{
				.cover-container-center-img{
					width: 50upx;
				}
			}
			
		}
		
		}
</style>
