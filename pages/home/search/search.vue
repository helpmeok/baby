<template>
	<view style="height: 100%;">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">搜索</block>
		</cu-custom>
		<view class="container">
			<view class="flex-r-between search-box" :style="[{top:CustomBar + 'px'}]" :class="{'border-bottom':!show}">
				<view class="flex-r-between search">
					<view class="flex" style="width: 100%;">
						<!-- <view class="iconfont iconsousuo" style="margin-right: 20upx;"></view> -->
						<image src="/static/com_search_ic_search@3x.png" mode="widthFix" style="width: 30upx;margin-right: 10upx;"></image>
						<input class="search-int" type="text" focus="true" confirm-type="search" v-model="value" placeholder="输入要搜索的内容"
						 @confirm="inputConfirm" />
					</view>
					<view class="iconfont iconshanchu gray" style="margin-left: 30upx;" @click="value = ''" v-show="show"></view>
				</view>
				<navigator open-type="navigateBack" delta="1" hover-class="none">取消</navigator>
			</view>
			<view class="contents" v-if="!show" :style="[{top:CustomBar+50 + 'px'}]">
				<view class=" blod">大家都在搜</view>
				<view class="flex">
					<view class="item small " v-for="(item, index) in keywordList" :key="index" @click="search(item.keywordName)">{{ item.keywordName }}</view>
				</view>
				<view class="flex-r-between" style="margin-top: 20upx;" v-if="historyList.length>0">
					<text class="blod">历史搜索</text>
					<image src="/static/search_list_ic_delete_nor@3x.png" style="width: 32upx;" mode="widthFix" @click="clearHistoryList"></image>
					<!-- <view class="iconfont icon- gray blod"></view> -->
				</view>
				<view class="flex">
					<view class="item small " v-for="(item, index) in historyList" :key="index" @click="search(item)">{{ item }}</view>
				</view>
			</view>
			<view class="" v-else>
				<scroll-view scroll-x class="tabs flex" scroll-with-animation :style="[{top:CustomBar+50 + 'px'}]">
					<view class="flex item-box">
						<view class="gray item" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }" @click="changeTab(index)">
							<view :class="{'bottom-line':item.active}"></view>
							<view class="name" :class="{ active: item.active }">{{ item.tabName }}</view>
						</view>
					</view>
				</scroll-view>
				<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" @refresh="onPulldownReresh" :top="90"
				 @setEnableScroll="setEnableScroll" :style="[{top:CustomBar+80 + 'px'}]">
					<swiper class="swiper-box" :current="tabIndex" :duration="300" @change="changeSwiper" :style="[{height:screenHeight-CustomBar-80+'px'}]">
						<swiper-item class="swiper-item" v-for="(el, i) in tabs" :key="i">
							<empty class="empty-box" v-if="el.data.length == 0 && isLoad" msg="没有任何数据耶~"></empty>
							<scroll-view @scrolltolower="loadMore(i)" :scroll-y="true" class="scroll-view" :enable-back-to-top="el.active">
								<article-item :list="el.data" :showOperate="false" v-on:showOperate="showOperate"></article-item>
								<view class="uni-tab-bar-loading" v-if="el.data.length > 0">
									<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</mix-pulldown-refresh>
			</view>
		</view>
	</view>
</template>

<script>
	let total = 10;
	let ctime = parseInt(Date.now());
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh';
	export default {
		components: {
			mixPulldownRefresh
		},
		data() {
			return {
				enableScroll: true,
				value: '',
				isLoad: false,
				show: false,
				keywordList: [],
				historyList: [],
				articleList: [],
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '无更多文章'
				},
				loadingType: 0,
				CustomBar: this.CustomBar,
				screenHeight: this.screenHeight,
				tabIndex: 0,
				tabs: [{
						tabName: '全部',
						active: true,
						data: [],
						offset: 0,
						loadingType: 0,
						showType: ""
					},
					{
						tabName: '图文',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						showType: "0,1,2,3"
					},
					{
						tabName: '音频',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						showType: "4"
					},
					{
						tabName: '视频',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						showType: "5"
					},
					{
						tabName: '问答',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						showType: "6"
					},
					{
						tabName: '文库',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0,
						showType: "7"
					},
				],
			};
		},
		onLoad() {
			this.historyList = uni.getStorageSync('history_keywords').split(';');
			this.historyList = this.historyList.filter(function(s) {
				return s && s.trim();
			});
			this.init();
		},
		onShow() {
			// if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
			// 	let index = parseInt(uni.getStorageSync('articleIndex'))
			// 	uni.removeStorageSync('articleIndex')
			// 	let articleId = this.articleList[index].articleId
			// 	if (articleId.toString()) {
			// 		this.api.home.article.get_detail({
			// 			article_id: articleId,
			// 			request_type: "h5"
			// 		}, res => {
			// 			console.log(res.data)
			// 			this.articleList[index].clickNum = res.data.clickNum
			// 			this.articleList[index].commentNum = res.data.commentNum
			// 			this.articleList[index].praiseNum = res.data.praiseNum
			// 			this.articleList[index].forwardNum = res.data.forwardNum
			// 			this.$forceUpdate()
			// 		})
			// 	}
			// }
			// if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
			// 	let index = parseInt(uni.getStorageSync('questionIndex'))
			// 	uni.removeStorageSync('questionIndex')
			// 	let questionId = this.articleList[index].articleId
			// 	if (questionId.toString()) {
			// 		this.api.home.qa.question.get_detail({
			// 			questionId
			// 		}, res => {
			// 			console.log(res.data)
			// 			this.articleList[index].clickNum = res.data.clickNum;
			// 			this.articleList[index].forwardNum = res.data.forwardNum
			// 			this.articleList[index].answerNum = res.data.answerNum
			// 			this.$forceUpdate()
			// 		})
			// 	}
			// }
		},
		watch: {
			value(val) {
				this.show = val ? true : false;
				if (!val) {
					this.initTabs()
				}
			}
		},
		methods: {
			inputConfirm(e) {
				this.initTabs()
				this.search(e.target.value)
			},
			initTabs() {
				this.tabIndex = 0;
				this.tabs.forEach((el, i) => {
					if (i == 0) {
						el.active = true
					} else {
						el.active = false
					}
					el.offset = 0;
					el.data = [];
					el.loadingType = 0;
				})
			},
			search(val, type) {
				if (!val) {
					return;
				}
				this.value = val;
				if (this.historyList.indexOf(val) == -1) {
					uni.setStorageSync('history_keywords', uni.getStorageSync('history_keywords') ? uni.getStorageSync(
						'history_keywords') + ';' + this.value : this.value);
					this.historyList = uni.getStorageSync('history_keywords').split(';');
					this.historyList = this.historyList.filter(function(s) {
						return s && s.trim();
					});
				}
				this.isLoad = false;
				if (!type) {
					uni.showLoading({
						title: '加载中'
					});
				}
				let currentTabIndex = this.tabIndex;
				this.api.home.search.get_response_list({
						keyword: this.value,
						ctime,
						offset: this.tabs[currentTabIndex].offset,
						total,
						showType: this.tabs[currentTabIndex].showType
					},
					res => {
						console.log(res);
						if (res.data.length) {
							if (type == 'pull-down') {
								this.tabs[currentTabIndex].data = res.data;
								this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
							} else {
								this.tabs[currentTabIndex].data = this.tabs[currentTabIndex].data.concat(res.data);
							}
							this.tabs[currentTabIndex].loadingType = 0;
						} else {
							this.tabs[currentTabIndex].loadingType = 2;
						}
						this.isLoad = true;
						uni.hideLoading();
					},
					err => {
						this.tabs[currentTabIndex].offset -= total;
						this.tabs[currentTabIndex].loadingType = 0;
					}
				);
			},
			init() {
				this.api.home.search.get_query_list({
						type: 2,
						ctime,
						offset: 0,
						total
					},
					res => {
						console.log(res);
						this.keywordList = res.data ? res.data : [];
					}
				);
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
			getMoreArticle() {
				let currentTabIndex = this.tabIndex;
				this.tabs[currentTabIndex].offset += total;
				this.api.home.search.get_response_list({
						keyword: this.value,
						ctime,
						offset: this.tabs[currentTabIndex].offset,
						total,
						showType: this.tabs[currentTabIndex].showType
					},
					res => {
						console.log(res);
						if (res.data.length) {
							this.tabs[currentTabIndex].data = this.tabs[currentTabIndex].data.concat(res.data);
							this.tabs[currentTabIndex].loadingType = 0;
						} else {
							this.tabs[currentTabIndex].loadingType = 2;
						}
						uni.hideLoading();
					},
					err => {
						this.tabs[currentTabIndex].offset -= total;
						this.tabs[currentTabIndex].loadingType = 0;
					}
				);
			},
			onPulldownReresh() {
				ctime = parseInt(Date.now()); //刷新时间
				this.tabs[this.tabIndex].offset = 0;
				this.search(this.value, 'pull-down');
			},
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},
			clearHistoryList() {
				uni.removeStorageSync('history_keywords');
				this.historyList = [];
			},
			showOperate() {},
			changeTab(index) {
				this.tabs.forEach(item => {
					item.active = false;
				});
				this.tabIndex = index;
				this.tabs[index].active = true;
			},
			async changeSwiper(e) {
				this.changeTab(e.target.current);
				if (!this.tabs[this.tabIndex].data.length) {
					await this.search(this.value);
				}
			},
		}
	};
</script>

<style lang="less">
	.search-box {
		padding: 0 30upx;
		height: 50px;

		position: fixed;
		left: 0;
		z-index: 999;
		background-color: white;
		width: 100%;
		box-sizing: border-box;

		.search {
			background-color: #f5f5f5;
			padding: 5upx 20upx;
			width: 90%;
			border-radius: 10upx;

			.search-int {
				width: 90% !important;
			}
		}
	}

	.container {
		.contents {
			position: fixed;
			left: 0;
			width: 100%;
			padding: 30upx;

			.item {
				border: 2upx solid #E8E8E8;
				height: 60upx;
				padding: 0upx 20upx;
				border-radius: 30upx;
				line-height: 60upx;
				margin-right: 30upx;
				margin-top: 20upx;
			}
		}

		.panel-content {
			position: fixed;
			width: 100%;
		}

		.tabs {
			width: 100%;
			position: fixed;
			height: 30px;
			padding-left: 30upx;
			border-bottom: 2upx solid #F5F5F5;
			background-color: white;
			overflow: hidden;
			z-index: 999;

			.item-box {
				width: 100%;
				flex-wrap: nowrap;
				height: 100%;
				padding: 0 !important;

				.item {
					position: relative;
					left: 0;
					top: 0;
					z-index: 2;
					margin-right: 40upx;
					font-size: 34upx !important;

					.name {
						position: relative;
						left: 0;
						top: 0;
						z-index: 2;
						font-size: 34upx;
						white-space: nowrap;
					}

					.active {
						color: #FC4041;
						font-weight: bold;
					}

					.bottom-line {
						position: absolute;
						left: 20%;
						bottom: -3upx;
						z-index: 1;
						height: 4upx;
						border-radius: 3upx;
						width: 60%;
						background-color: #FC4041;
					}
				}
			}
		}

		.swiper-box,
			{
			position: fixed;
			left: 0;
			width: 100%;
			padding: 0;
			margin: 0;
		}

		.scroll-view,
		.swiper-item {
			width: 100%;
			height: 100%;
		}
	}
</style>
