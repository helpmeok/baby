<template>
	<view class="container">
		<!-- 自定义导航栏 -->
		<channel-operate :show="showChannelOperate" v-on:hideChannelOperate='hideChannelOperate' :myChanelList="tabs"
		 :addChanelList="addChanelList" v-on:addChanelOperate="addChanelOperate" v-on:delChanelOperate="delChanelOperate"
		 v-on:changeChanelOperate="changeChanelOperate"></channel-operate>
		<view class="header-custom flex-r-between" :style="[{height:CustomBar + 'px','padding-top':StatusBar+'px'}]">
			<view class="flex search-box" @click="goSearch">
				<image src="/static/com_search_ic_search@3x.png" mode="widthFix" style="width: 30upx;margin-right: 10upx;"></image>
				<view class="gray">
					{{issueKeyword}}
				</view>
			</view>
			<image src="/static/com_nav_ic_hot_nor@3x.png" mode="widthFix" class="hot-icon" @click="showHotMask = true"></image>
		</view>
		<!-- 自定义导航栏 -->
		<view class="uni-tab-bar">
			<!-- 头部tabs -->
			<view class="tab-bar flex-r-between">
				<view class="tabs">
					<scroll-view scroll-x class="tabs-scroll-view flex" scroll-with-animation :scroll-left="scrollLeft">
						<view class="flex item-box">
							<view class="gray item" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }" @click="changeTab(index)">
								<view :class="{'bottom-line':item.active}"></view>
								<view class="name" :class="{ active: item.active }">{{ item.channelName }}</view>
							</view>
						</view>
						<!-- <view class="blur"></view> -->
					</scroll-view>
				</view>
				<view class="icons flex-r-center">
					<!-- <image src="/static/com_nav_ic_search_nor@3x.png" @click="goSearch" mode="widthFix" class="hot-icon"></image>
					<image src="/static/com_nav_ic_hot_nor@3x.png" mode="widthFix" class="hot-icon" @click="showHotMask = true"></image> -->
					<image src="/static/home_nav_ic_more_nor@3x.png" mode="widthFix" @click="showChannelOperate=true" class="nav-more-icon"></image>
				</view>
			</view>
			<!-- 头部tabs -->
			<!-- 滚动列表区域 -->
			<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh"
			 @setEnableScroll="setEnableScroll">
				<swiper class="swiper-box" :current="tabIndex" :duration="300" @change="changeSwiper">
					<swiper-item v-for="(el, i) in tabs" :key="i">
						<scroll-view @scrolltolower="loadMore(i)" :scroll-y="!showArticleOperate" class="scroll-view" :style="{height:articleScrollHeight+'px'}"
						 :enable-back-to-top="el.active">
							<view class="" v-if="el.channelName!='关注'">
								<!-- 问答头部 -->
								<view class="qa-box" v-if="el.channelName=='问答'&&isLogin">
									<view class="qa-user">
										<view class="flex-r-between">
											<view class="flex">
												<image :src="userInfo.avatar" mode="aspectFill" class="user-avatar"></image>
												<view class="">
													<view class="name">
														{{userInfo.nickname}}
													</view>
													<view class="ans-count gray">
														回答获得{{praiseNum}}个赞
													</view>
												</view>
											</view>
											<view class="flex gray" @click="goQa()">
												<text>我的回答</text>
												<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
											</view>
										</view>
										<view class="flex-r-center">
											<view class="flex-r-center btn bg-default-color" @click="goAskQuestion()">
												<image src="/static/bigv_list_ic_follow@3x.png" mode="widthFix" class="icon"></image>
												<text class="white">提问</text>
											</view>
										</view>
									</view>
									<view class="cut-off"></view>
								</view>
								<empty v-if="tabs[i].data.length == 0 && isLoad" msg="暂无资讯，下拉加载试试~"></empty>
								<article-item :list="tabs[i].data" :showOperate="true" v-on:videoHandle="videoHandle" v-on:showOperate="showOperate"></article-item>
								<view class="uni-tab-bar-loading">
									<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
								</view>
							</view>
							<!-- 关注列表 -->
							<view class="" v-if="el.channelName=='关注'">
								<view class="" v-if="isLogin">
									<view class="attention-no" v-if="tabs[i].data.length == 0 &&isLoad">
										<view class="pd-box celebrity-box flex-c-center">
											<view class="flex-r-center avatar-box">
												<image :src="el.avatar" mode="aspectFill" v-for="(el,i) in hotList" :key="i" class="celebrity-avatar"
												 :style="{left:-(i*8)+'px'}"></image>
											</view>
											<view class="title font-b blod">
												与大V们一起来探讨育儿的方法
											</view>
											<navigator url="/pages/home/celebrity/more/more" hover-class="none">
												<view class="flex-r-center btn bg-default-color white">
													开始吧
												</view>
											</navigator>
										</view>
										<view class="cut-off"></view>
										<view class="pd-box care-celebrity-box">
											<view class="title font-b blod baby-black">
												你可能感兴趣的人
											</view>
											<view class="list-item flex-r-between" v-for="(el,index) in hobbyVipList" :key="index" @click="goDetail(el.userId)">
												<view class="list-item-l">
													<!-- <view class="cu-avatar round lg">{{item.letter}}</view> -->
													<image :src="el.avatar" mode="aspectFill" lazy-load class="avatar mgr-20"></image>
													<view class="content">
														<view class="article-font blod baby-black baby-font-size">{{el.name}}</view>
														<view class="text-gray text-sm">
															{{el.oauthIntro}}
														</view>
														<view class="text-gray text-sm">
															已有{{el.fansNum}}人关注
														</view>
													</view>
												</view>
												<view class=" bg-default-color  pd-lr btn flex-r-center" :class="{'followed':el.isFollowed ,'white':!el.isFollowed }"
												 @click.stop="toggleFollowed(el,index)">
													<text class="iconfont iconjiahao white small mgr-10" v-if="!el.isFollowed"></text>
													<text class="">{{el.isFollowed ?"已关注":"关注"}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="attention-yes" v-else>
										<navigator url="/pages/home/celebrity/more/more" hover-class="none">
											<view class="flex-r-between box">
												<view class="title blod font-b baby-black">
													发现更多感兴趣的人
												</view>
												<view class="flex">
													<view class="flex-r-center avatar-box">
														<image :src="el.avatar" mode="aspectFill" v-for="(el,i) in hotList" :key="i" class="celebrity-avatar"
														 :style="{left:-(i*8)+'px'}"></image>
													</view>
													<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
												</view>
											</view>
										</navigator>
										<view class="cut-off"></view>
									</view>
									<empty msg="暂无资讯，下拉加载试试~" v-if="tabs[i].data==0"></empty>
									<article-item :list="tabs[i].data" v-on:videoHandle="videoHandle" :showOperate="true" v-on:showOperate="showOperate"></article-item>
									<view class="uni-tab-bar-loading">
										<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
									</view>
								</view>
								<view class="" v-else>
									<empty msg="登录后才能看到关注的信息哦~" :isLogin="true"></empty>
								</view>
							</view>
							<!-- 关注列表 -->
						</scroll-view>
					</swiper-item>
				</swiper>
			</mix-pulldown-refresh>
			<!-- 滚动列表区域 -->
			<!-- 热门大V遮罩 -->
			<view class="mask" v-if="showHotMask" @click="hideHotMask">
				<view class="triangle_border_up" :style="{'margin-top':CustomBar+'px'}"></view>
				<view class="content flex" @click.stop>
					<view class="flex-c-center" style="width: 20%;" v-for="(el, i) in hotList" :key="i">
						<image :src="el.avatar" mode="widthFix" @click="goDetail(el.userId)"></image>
						<text class="sigle-line-text">{{ el.name }}</text>
					</view>
					<view class="flex-c-center" style="width: 20%;">
						<image src="../../../static/home_popup_ic_more_nor@3x.png" mode="widthFix" style="width: 100upx;" @click="goMore"></image>
						<text>更多</text>
					</view>
				</view>
			</view>
			<!-- 热门大V遮罩 -->
			<article-operate :show="showArticleOperate" :top="articleOffsetTop" :articleId="articleId" :userId="userId" :index="articleIndex"
			 v-on:hideArticleOperate="hideArticleOperate" v-on:refreshList="refreshList" v-on:removeArticle="removeArticle"></article-operate>
		</view>
	</view>

</template>

<script>
	import uniTag from '@/components/uni-tag.vue';
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh';
	// import { chGMT } from '@/common/util/date.js';
	import articleOperate from '@/components/article-operate'; //文章操作组件
	import channelOperate from '@/components/channel-operate'; //频道操作组件
	var ctime = parseInt(Date.now());
	var videoPlay;
	const total = 10;
	export default {
		components: {
			uniTag,
			mixPulldownRefresh,
			articleOperate,
			channelOperate
		},
		data() {
			return {
				isLoad: false,
				hotList: [],
				showHotMask: false,
				tabIndex: 0,
				enableScroll: true,
				showArticleOperate: false,
				articleId: '',
				userId: '',
				articleIndex: '',
				articleOffsetTop: 0,
				changeArticleIndex: "",
				showChannelOperate: false,
				tabs: [{
						channelName: '推荐',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						channelId: -1
					},
					{
						channelName: '关注',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						channelId: -2
					}
				],
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				WindowHeight: this.windowHeight,
				isLogin: false,
				userInfo: {},
				issueKeyword: "",
				addChanelList: [],
				hobbyVipList: [],
				praiseNum:0
			};
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: "了解更多育儿专业知识",
				path: '/pages/home/index/index',
				imageUrl: '/static/logo.png'
			};
		},
		onLoad(options) {
			this.getKeyWord()
			this.getUserChanelList()
			this.getAddChanelList()
			this.currentTab()
			this.init();
			if (options.articleId) {
				uni.navigateTo({
					url: '../article/detail/detail?id=' + options.articleId
				});
			}
			if (options.qaId) {
				uni.navigateTo({
					url: '../question/detail/detail?id=' + options.qaId
				});
			}
		},
		onShow() {
			this.getHot();
			this.hasLogin()
			if (this.isLogin) {
				this.getHobbyVipList();
				this.getPraiseNum();
			}
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
				}
			}
		},
		onHide() {
			this.showHotMask = false;
		},
		computed: {
			scrollLeft() {
				return (this.tabIndex - 1) * 40
			},
			articleScrollHeight() {
				return (this.WindowHeight - this.CustomBar - uni.upx2px(88))
			}
		},
		watch: {
			tabs: {
				handler(newVal, oldVal) {
					let hasActive = newVal.find((el) => {
						return el.active
					})
					if (!hasActive) {
						this.tabIndex = 0
					}
				},
				deep: true
			}
		},
		methods: {
			getUserChanelList() { //获取用户已选频道列表
				this.api.home.get_user_chanel_list(null, res => {
					let myChanelList = res.data.map((el) => {
						let obj = {
							channelName: el.channelName,
							active: false,
							data: [],
							offset: 0,
							loadingType: 0,
							channelId: el.channelId
						}
						return obj
					})
					this.tabs = this.tabs.concat(myChanelList)
				})
			},
			getAddChanelList() { //获取用户可选频道列表
				this.api.home.get_chanel_add_list(null, res => {
					this.addChanelList = res.data.map((el) => {
						let obj = {
							channelName: el.channelName,
							active: false,
							data: [],
							offset: 0,
							loadingType: 0,
							channelId: el.channelId
						}
						return obj
					})
				})
			},
			getHobbyVipList() { //获取感兴趣的大V列表
				this.api.home.hotVip.get_hobby_list_byUser(null, res => {
					this.hobbyVipList = res.data
				})
			},
			getPraiseNum() {
				this.api.center.qa.get_header(null, res => {
					console.log(res)
					this.praiseNum = res.data.praiseNum
				})
			},
			addChanelOperate(el, i) {
				this.addChanelList.splice(i, 1)
				this.tabs.push(el)
			},
			delChanelOperate(el, i) {
				this.tabs.splice(i, 1)
				this.addChanelList.unshift(el)
			},
			changeChanelOperate(i) {
				this.tabIndex = i
			},
			currentTab() {
				this.tabs[this.tabIndex].active = true;
			},
			hasLogin() { //判断是否登录
				this.isLogin = uni.getStorageSync('access_token') ? true : false
				this.userInfo = this.isLogin ? JSON.parse(uni.getStorageSync('userInfo')) : {};
			},
			getHot() {
				this.api.home.get_hotVip_List(null, res => {
					this.hotList = res.data;
				});
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/home/search/search'
				})
			},
			goAskQuestion() {
				uni.navigateTo({
					url: "/pages/home/question/commit/commit"
				})
			},
			getKeyWord() { //获取问题关键词
				this.api.home.search.get_query_list({ //问题关键词
						type: 2,
						ctime,
						offset: 0,
						total: 10
					},
					res => {
						console.log(res);
						if (res.data.length) {
							var index = Math.floor((Math.random() * res.data.length));
							this.issueKeyword = res.data[index].keywordName
						} else {
							this.issueKeyword = "搜索感兴趣的内容"
						}
					}
				);
			},
			init(type) { //初始化首页列表数据
				if (!this.tabs[this.tabIndex].data.length) {
					this.isLoad = false
					uni.showLoading({
						title: '加载中'
					});
				}
				this.tabs[this.tabIndex].loadingType = 0;
				this.tabs[this.tabIndex].offset = 0;
				return new Promise((onok, onno) => {
					this.api.home.get_article_by_chanelId({
							channelId: this.tabs[this.tabIndex].channelId,
							ctime: ctime,
							offset: this.tabs[this.tabIndex].offset,
							total: total
						},
						res => {
							console.log(this.tabs[this.tabIndex].channelName + '数据列表');
							console.log(res);

							this.tabs[this.tabIndex].data = res.data.concat(this.tabs[this.tabIndex].data);
							if (type == 'pull-down' && (this.tabs[this.tabIndex].channelId == -2 || this.tabs[this.tabIndex].channelId ==
									-4 || this.tabs[this.tabIndex].channelId == -5)) { //关注,视频，音频列表
								this.tabs[this.tabIndex].data = res.data
							}
							this.isLoad = true
							this.$forceUpdate()
							uni.hideLoading();
							onok();
						}
					);
				});
			},
			getMoreArticle() {
				this.tabs[this.tabIndex].offset += total;
				this.api.home.get_article_by_chanelId({
						channelId: this.tabs[this.tabIndex].channelId,
						ctime: ctime,
						offset: this.tabs[this.tabIndex].offset,
						total: total
					},
					res => {
						console.log(res);
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
					}
				);
			},
			changeTab(index) {
				this.tabs.forEach(item => {
					item.active = false;
				});
				this.tabIndex = index;
				this.tabs[index].active = true;
			},
			async changeSwiper(e) {
				if (!!videoPlay) {
					videoPlay.pause()
				}
				this.hasLogin();
				this.changeTab(e.target.current);
				if (!this.tabs[this.tabIndex].data.length) {
					await this.init();
				}
			},
			loadMore(i) {
				if (!this.tabs[this.tabIndex].data.length) {
					return;
				}
				if (this.tabs[i].loadingType !== 0) {
					return;
				} else {
					this.tabs[i].loadingType = 1;
					this.getMoreArticle();
				}
			},
			hideHotMask() {
				this.showHotMask = false;
			},
			async onPulldownReresh() {
				ctime = parseInt(Date.now()); //刷新时间
				this.tabs[this.tabIndex].offset = 0;
				setTimeout(async () => {
					await this.init('pull-down');
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
				}, 500);
			},
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},
			showOperate(e, article_id, user_id, article_index) {
				this.articleId = article_id;
				this.userId = user_id;
				this.articleIndex = article_index;
				uni.getSystemInfo({
					success: res => {
						if (e.detail.y + 220 > res.windowHeight) {
							this.articleOffsetTop = e.detail.y - 210;
						} else {
							this.articleOffsetTop = e.detail.y + 20;
						}
						this.showArticleOperate = true;
					}
				});
			},
			hideArticleOperate() {
				this.showArticleOperate = false;
			},
			hideChannelOperate() {
				this.showChannelOperate = false
			},
			async refreshList() { //刷新列表
				this.onPulldownReresh();
				uni.showToast({
					title: '屏蔽成功'
				});
			},
			removeArticle(index) {
				this.tabs[this.tabIndex].data.splice(index, 1);
			},
			goMore() {
				uni.navigateTo({
					url: '../celebrity/more/more'
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/home/celebrity/detail/detail?id=' + id
				});
			},
			goQa() {
				uni.navigateTo({
					url: "/pages/center/question/list/list"
				});
			},
			toggleFollowed(el, index) {
				this.api.home.hotVip.toggle_followed({
					vid: el.userId,
					action: el.isFollowed ? 0 : 1
				}, res => {
					this.hobbyVipList[index].isFollowed = !this.hobbyVipList[index].isFollowed
				})
			},
			videoHandle(video) {
				videoPlay = video;
			}
		}
	};
</script>

<style lang="scss">
	.header-custom {
		padding: 40upx 220upx 0 30upx;

		.search-box {
			background-color: #F8F8F8;
			border-radius: 100upx;
			width: 85%;
			height: 75%;
			padding: 0 20upx;
		}

		.hot-icon {
			width: 80upx !important;
		}
	}

	.container {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
	}

	.tab-bar {
		padding: 0upx 0upx 0upx 30upx;
		position: relative;
		left: 0;
		top: 0;
		z-index: 2;
		background-color: #ffffff;
		height: 88upx !important;

		.tabs {
			width: calc(100% - 100upx) !important;
			height: 100%;

			.tabs-scroll-view {
				width: 100%;
				position: relative;
				height: 100%;

				.item-box {
					width: 100%;
					flex-wrap: nowrap;
					height: 100%;

					.item {
						position: relative;
						left: 0;
						top: 0;
						z-index: 2;
						margin-right: 40upx;

						.name {
							position: relative;
							left: 0;
							top: 0;
							z-index: 2;
							font-size: 34upx;
							white-space: nowrap;
						}

						.active {
							font-size: 46upx !important;

						}

						.bottom-line {
							position: absolute;
							left: 0;
							bottom: 10upx;
							z-index: 1;
							height: 20upx;
							border-radius: 10upx;
							width: 100%;
							background-color: yellow;
						}
					}
				}
			}
		}

		.active {
			font-weight: bold;
			color: black;
			border: none;
		}

		.icons {
			width: 100upx;
			height: 100%;

			.nav-more-icon {
				width: 80upx !important;
				height: 80upx;
			}
		}
	}



	.scroll-view {
		.qa-box {
			.qa-user {
				padding: 20upx 10upx 20upx 30upx;

				.name {
					color: #090909;
					font-weight: bold;
					font-size: 30upx;
				}

				.ans-count {
					font-size: 24upx;
				}

				.user-avatar {
					width: 90upx;
					border-radius: 50%;
					height: 90upx;
					margin-right: 20upx;
				}

				.icon {
					width: 60upx;
				}
			}

			.btn {
				width: 260upx;
				height: 72upx;
				border-radius: 40upx;
				margin: 20upx;

				.icon {
					width: 50upx;
				}

				.white {
					font-size: 30upx;
				}
			}
		}

		.attention-no {
			.celebrity-box {
				.avatar-box {
					position: relative;
					left: 12px;
					top: 0;

					.celebrity-avatar {
						width: 64upx;
						height: 64upx;
						border-radius: 50%;
						position: relative;
						top: 0;
						border: 4upx solid #FFFFFF;
					}
				}

				.btn {
					width: 260upx;
					height: 72upx;
					border-radius: 40upx;
					margin: 20upx;
					font-size: 30upx;
				}

				.title {
					color: #090909;
					margin-top: 20upx;
				}
			}

			.care-celebrity-box {
				.title {
					margin: 20upx 0;
				}

				.list-item {
					box-sizing: border-box;
					padding: 20upx 0;
					border-bottom: 2upx solid #F5F5F5;

					&-l {
						display: flex;
						flex-direction: row;

						.avatar {
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
					}


					.btn {
						height: 60upx;
						border-radius: 30upx;
						width: 160upx;
						border: 2upx solid $uni-color-default;
						font-size: 26upx;

						.iconjiahao {
							font-size: 26upx !important;
							font-weight: blod;
						}
					}

					.followed {
						background-color: #ffffff !important;
						border-color: #f1f1f1 !important;
					}
				}
			}

		}

		.attention-yes {
			.box {
				padding: 20upx 10upx 30upx 30upx;

				.avatar-box {
					position: relative;
					left: 24px;
					top: 0;

					.celebrity-avatar {
						width: 64upx;
						height: 64upx;
						border-radius: 50%;
						position: relative;
						top: 0;
						border: 4upx solid #FFFFFF;
					}
				}

				.icon {
					width: 60upx;
				}
			}
		}
	}

	.mask {
		.content {
			background-color: #ffffff;
			width: 90%;
			padding: 30upx;
			box-sizing: border-box;
			border-radius: 20upx;
			margin-left: 5%;

			image {
				width: 100upx !important;
				height: 100upx !important;
				border-radius: 50%;
			}
		}
	}

	.triangle_border_up {
		width: 0;
		height: 0;
		// border-top: 30upx solid transparent;
		// border-right: 50upx solid white;
		border-left: 30upx solid transparent;
		border-right: 30upx solid transparent;
		border-bottom: 30upx solid white;
		margin-left: calc(100% - 290upx);
	}
</style>
