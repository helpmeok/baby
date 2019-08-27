<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">全部评论</block>
		</cu-custom>
		<view class="comments-box">
			<view class="pd-box item-list border-bottom" v-for="(el, i) in list" :key="i">
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
			<view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<view class="" :style="{'height':bottomHeight+'px'}"></view>
		<bind-mobile v-on:hideBindMobile="hideBindMobile" :isShow="showBindMobile"></bind-mobile>
		<view class="fixed-bottom  bg-white" id="comment" v-if="!showCommentPublish">
			<view class="flex gray comment-box" @click="comment">
				<view class="mgr-10 iconfont iconpinglun1"></view>
				<text style="font-size: 26upx;">缺少你的评论...</text>
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
</template>

<script>
	let id = "",
		total = 10,
		ctime = parseInt(Date.now());
	import bindMobile from '@/components/bind-mobile/bind-mobile.vue';
	export default {
		components: {
			bindMobile
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				screenHeight: this.screenHeight,
				offset: 0,
				list: [],
				loadingType: 0,
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多评论了'
				},
				showCommentPublish: false,
				showBindMobile: false,
				hasMobile: false,
				publishBottom:0,
				publishText:"",
				bottomHeight:0,
				isCommentPublish:true
			}
		},
		onLoad(options) {
			id = options.id
			uni.showLoading({
				title: "加载中"
			})
			this.init()
			if (uni.getStorageSync("access_token")) { //检查有没有绑定手机
				this.api.center.user.get_detail(null, res => {
					console.log(res);
					this.hasMobile = res.data.phone ? true : false
				});
			}
		},
		methods: {
			init() {
				this.api.home.article.get_comment_list({
						ctime,
						articleId: id,
						offset: this.offset,
						total
					},
					res => {
						console.log(res);
						if (res.data.length) {
							this.list = this.list.concat(res.data)
							if (res.data.length<total) {
								this.loadingType = 2
							} else{
								this.loadingType = 0
							}
						} else {
							this.loadingType = 2
						}
						this.getBottomHeight()
						uni.hideLoading();
					}
				);
			},
			
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				this.offset += total
				this.init()
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
		    async getBottomHeight(){
				let data =await this.getElSize('comment')	
				this.bottomHeight=data.height
			},
			hideBindMobile(bind) {
				this.showBindMobile = false;
				this.hasMobile=bind?true:false
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
			toggleCommentPraise(id, i) {
				this.api.home.comment.toggle_praise({
						commentId: id,
						action: this.list[i].praiseFlag ? 0 : 1
					},
					res => {
						this.list[i].praiseFlag = !this.list[i].praiseFlag;
						console.log(this.list[i].praiseFlag)
						if (this.list[i].praiseFlag) {
							this.list[i].praiseNum++;
							uni.showToast({
								title: '点赞成功'
							});
						} else {
							this.list[i].praiseNum--;
							uni.showToast({
								title: '取消点赞'
							});
						}
					}
				);
			},
			comment() {
				if (this.hasMobile) {
					this.showCommentPublish = true;
				} else {
					this.api.center.user.get_detail(null, res => {
						console.log(res);
						this.hasMobile = res.data.phone ? true : false
						this.showCommentPublish = res.data.phone ? true : false
						this.showBindMobile = res.data.phone ? false : true
					});
				}
			},
			addComment(){
				if (!this.publishText || !this.isCommentPublish) {
					return
				}
				this.isCommentPublish=false
				this.api.home.article.comment({
					articleId:id,
					content:this.publishText
				},res=>{
					console.log(res)
					uni.showToast({
						title:"评论成功"
					})
					this.isCommentPublish=true;//防止点击多次
					this.list.unshift(res.data)
					this.publishText="";
					this.showCommentPublish=false;
				})
			},
			publishFocus(e){
				console.log(e)
				this.publishBottom=e.detail.height;
				console.log(this.publishBottom)
			},
			publishBlur(){
				this.publishBottom=0;
			}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss" scoped>
	.comments-box {
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
	.fixed-bottom {
		border-top: 2upx solid #f5f5f5;
		padding: 20upx 50upx;

		.iconfont {
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
</style>
