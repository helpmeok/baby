<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" class="cu-custom" :isCustom="true" :helper="true" :searchCelebrity="true" :hotId="hotId">
			<block slot="backText"></block>
			<block slot="content" class="sigle-line-text content">{{title}}</block>
		</cu-custom>
		<view class="header-detail flex">
			<view class="flex-r-center" style="width: 30%;">
				<image :src="info.avatar" mode="widthFix" class="portrait" @click="previewImage(info.avatar)"></image>
			</view>
			<view class="" style="width: 70%;">
				<view class="flex-r-between" style="padding: 0 20upx;">
					<view class="flex-c-center">
						<text class="font-b blod">{{ info.originalNum | articleDataNum }}</text>
						<text class="gray">原创</text>
					</view>
					<view class="flex-c-center">
						<text class="font-b blod">{{ info.fansNum | articleDataNum }}</text>
						<text class="gray">粉丝</text>
					</view>
					<view class="flex-c-center">
						<text class="font-b blod">{{ info.forwardNum | articleDataNum }}</text>
						<text class="gray">转发</text>
					</view>
					<view class="flex-c-center">
						<text class="font-b blod">{{info.clickNum | articleDataNum}}</text>
						<text class="gray">点击</text>
					</view>
				</view>
				<view class="flex-r-between" style="margin-top: 20upx;">
					<view class="attention-btn flex-r-center" @click="toggleFollowed(info, 1)" :class="{ white: !info.isFollowed, followed: info.isFollowed }">
						<!-- <text class="iconfont iconjiahao  mgr-10" v-if="!info.isFollowed"></text> -->
						<text>{{ info.isFollowed ? '已关注' : '关注' }}</text>
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
					<view class="attention-btn flex-r-center" @click.stop="toggleFollowed(el, 2, index)" :class="{ white: !el.isFollowed, followed: el.isFollowed }">
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
		<view class="introduce-box">
			<view class="approve flex">
				<view class="" style="width: 7%;">
					<image src="/static/com_list_ic_authentication@3x.png" mode="widthFix" style="width: 42upx;position: relative;top: 2upx;"></image>
				</view>
				<view class="" style="width: 93%;">{{ info.oauthIntro }}</view>
			</view>
		</view>
		<view class="" style="height: 20upx;background-color: #F5F5F5;"></view>
		<view id="sticky" :class="{'fixed-top':isFixed}" :style="{'top':isFixed?CustomBar+'px':0}">
			<detail-tabs :tabIndex="tabIndex" :tabList="tabList" :typeList="typeList" v-on:changeTabIndex="changeTabIndex"
			 v-on:changeTypeListIndex="changeTypeListIndex"></detail-tabs>
		</view>
		<swiper class="swiper-box" :current="tabIndex" @change="changeSwiper" :style="{ height: swiperHeight + 'px','margin-top':isFixed?stickyHeight:0+'px' }">
			<swiper-item v-for="(el, i) in tabs" :key="i">
				<scroll-view @scrolltolower="loadMore(i)" :scroll-y="isFixed" class="scroll-view" :enable-back-to-top="el.active"
				 :style="{ height: swiperHeight + 'px' }">
					<empty v-if="tabs[i].data.length == 0" msg="暂无资讯~"></empty>
					<article-item :list="tabs[i].data" v-on:videoHandle="videoHandle" :showOperate="false" v-on:showOperate="showOperate"
					 id="articleItem"></article-item>
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
	var videoPlay;
	let id = '';
	var ctime = parseInt(Date.now());
	const total = 10;
	export default {
		components: {
			// glanceSlideNavTabBar,
			WucTab,
			detailTabs
		},
		data() {
			return {
				hotId: "",
				swiperHeight: 0,
				stickyHeight: 0,
				isShowRecommend: false,
				isFixed: false,
				recommendList: [],
				tabIndex: 0,
				info: {},
				tabList: [{
					name: '全部',
					showType: ""
				}, {
					name: '音频',
					showType: 4
				}, {
					name: '视频',
					showType: 5
				}],
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
					}
				],
				typeIndex: 0,
				typeList: [{
					name: "最新发布",
					active: true,
					type: 0
				}, {
					name: "转发最多",
					active: false,
					type: 1
				}, {
					name: "评论最多",
					active: false,
					type: 2
				}, {
					name: "点赞最多",
					active: false,
					type: 3
				}],
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				stickyTop: 0,
				title: "",
				CustomBar: this.CustomBar
			};
		},
		computed: {
			recommendBoxWidth() {
				return uni.upx2px((this.recommendList.length + 1) * 270) + 'px';
			},
		},

		onLoad(options) {
			this.hotId = options.id
			id = options.id;
			this.init();

		},
		onShow() {
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				try {
					let index = parseInt(uni.getStorageSync('articleIndex'))
					uni.removeStorageSync('articleIndex')
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
							this.$forceUpdate()
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
			if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
				try {
					let index = parseInt(uni.getStorageSync('questionIndex'))
					uni.removeStorageSync('questionIndex')
					let questionId = this.tabs[this.tabIndex].data[index].articleId
					if (questionId.toString()) {
						this.api.home.qa.question.get_detail({
							questionId
						}, res => {
							console.log(res.data)
							this.tabs[this.tabIndex].data[index].clickNum = res.data.clickNum;
							this.tabs[this.tabIndex].data[index].forwardNum = res.data.forwardNum
							this.tabs[this.tabIndex].data[index].answerNum = res.data.answerNum
							this.tabs[this.tabIndex].data[index].answerReplyList = res.data.answerReplyList
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
		watch: {
			isShowRecommend(val) {
				setTimeout(() => {
					this.getStickyTop()
				}, 500)
			},
		},
		methods: {
			init() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.api.home.hotVip.get_info({
						vid: id
					},
					res => {
						console.log(res);
						if (res.data.videoNum == 0) {
							this.tabList.splice(2, 1)
						}
						if (res.data.audioNum == 0) {
							this.tabList.splice(1, 1)
						}
						this.info = res.data;
						this.title = res.data.name
						uni.setNavigationBarTitle({
							title: res.data.name
						});

					}
				);
				this.getArticle();
				this.getRecommend();
				setTimeout(() => {
					this.getStickyTop()
				}, 500)
			},
			previewImage(url) {
				let arr = []
				arr.push(url)
				uni.previewImage({
					urls: arr
				})
			},
			async getStickyTop() {
				let size = await this.getElSize('sticky')
				this.swiperHeight = this.screenHeight - size.height;
				this.stickyHeight = size.height;
				this.stickyTop = size.top
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
						type: 1
					},
					res => {
						console.log(res);
						this.recommendList = res.data
					}
				);
			},
			getArticle() {
				this.api.home.hotVip.get_article({
						vid: id,
						type: this.typeList[this.typeIndex].type,
						ctime,
						offset: this.tabs[this.tabIndex].offset,
						total,
						keyword: "",
						showType: this.tabList[this.tabIndex].showType
					},
					res => {
						console.log(res);
						uni.hideLoading();
						this.tabs[this.tabIndex].data = res.data;
					}
				);
			},
			toggleFollowed(el, type, index) {
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
						if (el.isFollowed == 1) {
							uni.showToast({
								title: "关注成功"
							})
						} else {
							uni.showToast({
								title: "取消关注成功"
							})
						}
					}
				);
			},

			showRecommend() {
				this.isShowRecommend = !this.isShowRecommend;
			},
			changeTabIndex(index) {
				this.tabIndex = index
				// this.changeTab(index);
				if (videoPlay) {
					videoPlay.pause()
				}
			},
			changeSwiper(e) {
				if (videoPlay) {
					videoPlay.pause()
				}
				this.tabIndex = e.target.current;
				this.changeTab(e.target.current);
			},
			changeTypeListIndex(index) {
				if (videoPlay) {
					videoPlay.pause()
				}
				if (this.typeList[index].active) {
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.typeList.forEach((el) => {
					el.active = false
				})
				console.log(index)
				this.typeList[index].active = true
				this.tabs[this.tabIndex].data = [];
				this.typeIndex = index;
				this.tabs[this.tabIndex].offset = 0;
				this.getArticle();
			},
			getMoreArticle() {
				let currentTabIndex = this.tabIndex;
				this.tabs[currentTabIndex].offset += total;
				this.api.home.hotVip.get_article({
						vid: id,
						type: this.typeList[this.typeIndex].type,
						ctime,
						offset: this.tabs[currentTabIndex].offset,
						total,
						keyword: "",
						showType: this.tabList[currentTabIndex].showType
					},
					res => {
						console.log(res);
						if (res.data.length) {
							this.tabs[currentTabIndex].data = this.tabs[currentTabIndex].data.concat(res.data);
							this.tabs[currentTabIndex].loadingType = 0;
						} else {
							this.tabs[currentTabIndex].loadingType = 2;
						}
					},
					err => {
						this.tabs[currentTabIndex].offset -= total;
						this.tabs[currentTabIndex].loadingType = 0;
					}
				);
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
			showOperate(e) {},
			hideArticleOperate() {
				this.showArticleOperate = false;
			},
			removeItem(i) {
				this.recommendList.splice(i, 1);
			},
			goOther(el) {
				uni.navigateTo({
					url: '/pages/home/celebrity/detail/detail?id=' + el.userId
				});
			},
			videoHandle(video) {
				videoPlay = video;
			}
		},
		onPageScroll(e) {
			if (this.stickyTop >= (this.CustomBar + e.scrollTop)) {
				this.isFixed = false
			} else {
				this.isFixed = true
			}
		}
	};
</script>

<style lang="scss">
	.cu-custom {
		.content {
			width: 200upx !important;
			text-align: center;
		}
	}

	.header-detail {
		width: 100%;
		height: 200upx;
		padding: 0 30upx 0 0;
		box-sizing: border-box;

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
			border-color: #f1f1f1;
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
