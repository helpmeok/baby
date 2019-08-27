<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="header-detail flex">
			<view class="flex-r-center" style="width: 30%;">
				<image src="/static/classify_list_ic_special@2x.png" mode="widthFix" class="portrait"></image>
			</view>
			<view class="" style="width: 70%;">
				<view class="flex-r-between" style="padding: 0 20upx;">
					<view class="flex-c-center">
						<text class="font-b blod">{{info.original | articleDataNum}}</text>
						<text class="gray">原创</text>
					</view>
					<view class="flex-c-center">
						<text class="font-b blod">{{info.fans | articleDataNum}}</text>
						<text class="gray">粉丝</text>
					</view>
					<view class="flex-c-center">
						<text class="font-b blod">{{info.forwarding | articleDataNum}}</text>
						<text class="gray">转发</text>
					</view>
					<view class="flex-c-center">
						<text class="font-b blod">{{info.clicknum | articleDataNum}}</text>
						<text class="gray">点击</text>
					</view>
				</view>
				<view class="flex-r-between" style="margin-top: 20upx;">
					<view class="attention-btn flex-r-center" @click="toggleFollowed(info)" :class="{'white':!info.isFollowed,'followed':info.isFollowed}">
						<!-- <text class="iconfont iconjiahao  mgr-10" v-if="!info.isFollowed"></text> -->
						<text>{{info.isFollowed?"已关注":"关注"}}</text>
					</view>
					<view class="recommend-btn flex-r-center gray" @click="showRecommend">
						<text style="margin-right: 5upx;">相关推荐</text>
						<text class="iconfont iconxiangxia gray mgl-10" style="font-size: 22upx;" v-if="!isShowRecommend"></text>
						<text class="iconfont iconxiangshang gray mgl-10" style="font-size: 22upx;" v-else></text>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="recommend-scroll" :class="{ 'show-recommend-scroll': isShowRecommend }" scroll-x="true">
			<view class="recommend-box" :style="{ width: recommendBoxWidth }">
				<view class="flex-c-center list-item" v-for="(el, index) in recommendList" :key="index" @click="goOther(el)">
					<view class="iconfont iconcuowutishilimiandecha gray" @click.stop="removeItem(index)"></view>
					<image :src="el.avatar" mode="widthFix" class="portrait"></image>
					<view class="name blod sigle-line-text">{{ el.name }}</view>
					<view class="gray label sigle-line-text small">{{ el.oauthIntro }}</view>
					<view class="attention-btn flex-r-center" @click.stop="toggleVipFollowed(el, 2, index)" :class="{ white: !el.isFollowed, followed: el.isFollowed }">
						{{ el.isFollowed ? '已关注' : '关注' }}
					</view>
				</view>
				<navigator url="/pages/home/celebrity/more/more" hover-class="none">
					<view class="flex-c-center list-item">
						<view class="iconfont iconarrow-right-copy red"></view>
						<view class="red" style="margin: 20upx 0;">更多大V</view>
						<view class="small gray">查看更多</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
		<view class="" style="height: 20upx;background-color: #F5F5F5;"></view>
		<view id="sticky" :class="{'fixed-top':isFixed}" :style="{'top':isFixed?CustomBar+'px':0}">
			<!-- <wuc-tab :tab-list="[
						{ name: '全部' },
						{ name: '音频' },
						{ name: '视频' }
					]"
			 :tabCur.sync="tabIndex" tab-class="text-center bg-white wuc-tab" :tab-style="CustomBar" select-class="text-blue"
			 @change="clickitem"></wuc-tab> -->
			 <detail-tabs :tabIndex="tabIndex" v-on:changeTabIndex="changeTabIndex"></detail-tabs>
		</view>
		<swiper class="swiper-box" :current="tabIndex" @change="changeSwiper" :style="{ height: swiperHeight + 'px','margin-top':isFixed?stickyHeight:0+'px' }">
			<swiper-item v-for="(el, i) in tabs" :key="i">
				<scroll-view @scrolltolower="loadMore(i)" :scroll-y="isFixed" class="scroll-view" :enable-back-to-top="el.active"
				 :style="{'height':swiperHeight+'px'}">
					<empty v-if="tabs[i].data.length == 0" msg="暂无资讯~"></empty>
					<article-item :list="tabs[i].data" :showOperate="false" v-on:showOperate="showOperate"></article-item>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import glanceSlideNavTabBar from '@/components/glance-SlideNavTabBar.vue';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import detailTabs from '@/components/detail-tabs.vue';
	let id = ""
	var ctime = parseInt(Date.now());
	const total = 10;
	export default {
		components: {
			// glanceSlideNavTabBar
			WucTab,
			detailTabs
		},
		data() {
			return {
				swiperHeight: 0,
				stickyHeight: 0,
				isShowRecommend: false,
				isFixed: false,
				recommendList: [],
				tabIndex: 0,
				info: {},
				tabs: [{
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						data: [],
						offset: 0,
						loadingType: 0
					}
				],
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				stickyTop: 0,
				title:"",
				CustomBar: this.CustomBar
			};
		},
		computed: {
			recommendBoxWidth() {
				return uni.upx2px((this.recommendList.length + 1) * 270) + 'px';
			}
		},
		watch: {
			isShowRecommend(val) {
				setTimeout(() => {
					this.getStickyTop()
				}, 600)
			}
		},
		onLoad(options) {
			id = options.id
			this.init()
		},
		onShow() {
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				let index = parseInt(uni.getStorageSync('articleIndex'))
				let articleId = this.tabs[this.tabIndex].data[index].articleId
				if (articleId.toString()) {
					this.api.home.article.get_detail({
						article_id: articleId,
						request_type: "h5"
					}, res => {
						console.log(res.data)
						this.tabs[this.tabIndex].data[index].clickNum = res.data.clickNum
						this.tabs[this.tabIndex].data[index].commentNum = res.data.commentNum
						this.tabs[this.tabIndex].data[index].praiseNum = res.data.praiseNum
						this.tabs[this.tabIndex].data[index].forwardNum = res.data.forwardNum
						uni.removeStorageSync('articleIndex')
						this.$forceUpdate()
					})
				}
			}
			if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
				let index = parseInt(uni.getStorageSync('questionIndex'))
				try {
					let questionId = this.tabs[this.tabIndex].data[index].articleId
					if (questionId.toString()) {
						this.api.home.qa.question.get_detail({
							questionId
						}, res => {
							console.log(res.data)
							this.tabs[this.tabIndex].data[index].clickNum=res.data.clickNum;
							this.tabs[this.tabIndex].data[index].forwardNum = res.data.forwardNum
							this.tabs[this.tabIndex].data[index].answerNum = res.data.answerNum
							this.tabs[this.tabIndex].data[index].answerReplyList = res.data.answerReplyList

							uni.removeStorageSync('questionIndex')
							this.$forceUpdate()
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		onPullDownRefresh() {
			this.init();
		},
		methods: {
			init() {
				uni.showLoading({
					title:"加载中"
				})
				this.api.classify.get_sub_category_header({
					categoryId: id
				}, res => {
					console.log(res)
					this.info = res.data
					this.title=res.data.categoryName
					uni.setNavigationBarTitle({
						title: res.data.categoryName
					});
				})
				this.getArticle()
				this.getRecommend()
				this.getStickyTop()
			},
			async getStickyTop() {
				let size = await this.getElSize('sticky')
				this.swiperHeight = this.screenHeight - size.height;
				this.stickyHeight = size.height;
				this.stickyTop = size.top;
				console.log(this.stickyTop)
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
			getRecommend() {
				this.api.home.hotVip.get_recommend_list({
						id,
						type: 2
					},
					res => {
						console.log(res);
						this.recommendList = res.data
						// this.recommendList = res.data.map(el => {
						// 	let approve = '';
						// 	if (el.weixinOauthStatus == '2') {
						// 		approve = '母婴领域知名微信公众号';
						// 		el.approve = approve;
						// 		return el;
						// 	} else {
						// 		if (el.toutiaoOauthStatus == '2') {
						// 			approve = '今日头条APP知名作者';
						// 			el.approve = approve;
						// 			return el;
						// 		} else {
						// 			if (el.douyinOauthStatus == '2') {
						// 				approve = '知名母婴抖音号';
						// 				el.approve = approve;
						// 				return el;
						// 			} else {
						// 				if (el.appOauthStatus == '2') {
						// 					approve = '宝宝贝APP特邀作者';
						// 					el.approve = approve;
						// 					return el;
						// 				}
						// 			}
						// 		}
						// 	}
						// });
					}
				);
			},
			getArticle() {
				this.api.classify.get_category_article({
					categoryId: id,
					type: this.tabIndex,
					ctime,
					offset: this.tabs[this.tabIndex].offset,
					total
				}, res => {
					console.log(res)
					uni.hideLoading()
					this.tabs[this.tabIndex].data = res.data;
				})
			},
			toggleVipFollowed(el, type, index) {
				this.api.home.hotVip.toggle_followed({
						vid: el.userId,
						action: el.isFollowed ? 0 : 1
					},
					res => {
						console.log(res);
						if (type == 1) {
							this.info.isFollowed = !this.info.isFollowed;
						} else {
							this.recommendList[index].isFollowed = !this.recommendList[index].isFollowed;
						}
						if (el.isFollowed==1) {
							uni.showToast({
								title:"关注成功"
							})
						} else{
							uni.showToast({
								title:"取消关注成功"
							})
						}
					}
				);
			},
			toggleFollowed(el) {
				this.api.classify.toggle_followed({
					categoryId: id,
					action: el.isFollowed ? 0 : 1
				}, res => {
					console.log(res)
					this.info.isFollowed = !this.info.isFollowed
					if (el.isFollowed==1) {
						uni.showToast({
							title:"关注成功"
						})
					} else{
						uni.showToast({
							title:"取消关注成功"
						})
					}
				})
			},
			showRecommend() {
				this.isShowRecommend = !this.isShowRecommend;
			},
			changeTabIndex(index) {
				this.tabIndex = index
				// this.changeTab(index);
			},
			changeSwiper(e) {
				this.tabIndex = e.target.current
				this.changeTab(e.target.current);
			},
			getMoreArticle() {
				console.log('111')
				this.tabs[this.tabIndex].offset += total;
				this.api.classify.get_category_article({
						categoryId: id,
						type: this.tabIndex,
						ctime,
						offset: this.tabs[this.tabIndex].offset,
						total
					}, res => {
						console.log(res)
						if (res.data.length) {
							this.tabs[this.tabIndex].data = this.tabs[this.tabIndex].data.concat(res.data);
							this.tabs[this.tabIndex].loadingType = 0;
						} else {
							this.tabs[this.tabIndex].loadingType = 2;
						}
					},
					err => {
						this.tabs[this.tabIndex].offset -= total;
						this.tabs[this.tabIndex].loadingType = 0;
					})
			},
			async changeTab(index) {
				if (!this.tabs[this.tabIndex].data.length) {
					await this.init();
				}
			},
			loadMore() {
				if (!this.tabs[this.tabIndex].data.length) {
					return;
				}
				if (this.tabs[this.tabIndex].loadingType !== 0) {
					return;
				} else {
					this.tabs[this.tabIndex].loadingType = 1;
					this.getMoreArticle();
				}
			},
			removeItem(i) {
				this.recommendList.splice(i, 1);
			},
			goOther(el) {
				uni.navigateTo({
					url: '/pages/home/celebrity/detail/detail?id=' + el.userId
				});
			},
			showOperate(e) {
				// console.log(e);
				// uni.getSystemInfo({
				// 	success: res => {
				// 		console.log(res.windowHeight);
				// 		if (e.detail.y + 220 > res.windowHeight) {
				// 			this.articleOffsetTop = e.detail.y - 210;
				// 		} else {
				// 			this.articleOffsetTop = e.detail.y + 20;
				// 		}
				// 		this.showArticleOperate = true;
				// 	}
				// });
			},
			hideArticleOperate() {
				this.showArticleOperate = false;
			},
		},
		// onReachBottom() {
		// 	this.loadMore()
		// },
		onPageScroll(e) {
			if (this.stickyTop >= (this.CustomBar+e.scrollTop)) {
				this.isFixed = false
			} else {
				this.isFixed = true
			}
		}
	};
</script>

<style lang="scss">
	.header-detail {
		width: 100%;
		height: 220upx;
		padding: 0 30upx 20upx 0;

		.portrait {
			width: 150upx !important;
			height: 150upx !important;
			border-radius: 50%;
		}

		.attention-btn {
			background-color: $uni-color-default;
			border: 2upx solid $uni-color-default;
			height: 60upx;
			width: 280upx;
			border-radius: 30upx;
		}

		.followed {
			background-color: #ffffff;
			border: 2upx solid #f1f1f1;
		}

		.recommend-btn {
			border: 2upx solid #E8E8E8;
			height: 60upx;
			width: 190upx;
			border-radius: 30upx;
		}
	}
.introduce-box {
		.approve,
		.desc {
			align-items: flex-start;
			padding: 10upx 20upx;
		}
	}
	.recommend-scroll {
		background-color: #f5f5f5;
		box-sizing: border-box;
		height: 0upx;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		transition: height 0.5s;
		padding: 0 20upx;

		.recommend-box {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;

			.list-item {
				background-color: #ffffff;
				height: 380upx;
				width: 250upx;
				margin-right: 20upx;
				position: relative;

				.iconcuowutishilimiandecha {
					position: absolute;
					right: 10upx;
					top: 10upx;
					font-size: 26upx;
				}

				.label,
				.name {
					width: 80%;
					text-align: center;
				}

				.attention-btn {
					background-color: $uni-color-default;
					border: 2upx solid $uni-color-default;
					height: 60upx;
					width: 160upx;
					border-radius: 30upx;
					position: absolute;
					left: calc((100% - 160upx) / 2);
					bottom: 20upx;
				}

				.followed {
					background-color: #ffffff;
					border-color: #f1f1f1;
				}

				.portrait {
					width: 100upx !important;
					height: 100upx !important;
					border-radius: 50%;
				}
			}
		}
	}

	.show-recommend-scroll,
	.recommend-box {
		height: 400upx;
		transition: height 0.5s;
	}

	.swiper-box {
		.scroll-view {}
	}
</style>
