<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red">
			<block slot="content">宝宝贝</block>
		</cu-custom>
		<view class="uni-tab-bar">
			<view class="tab-bar flex-r-between">
				<view class="tabs flex">
					<view class="gray item" style="margin-right: 60upx;" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }"
					 @click="changeTab(index)">
						<view :class="{'bottom-line':item.active}"></view>
						<view class="name" :class="{ active: item.active }">{{ item.name }}</view>
					</view>
				</view>
				<view class="icons flex">
					<navigator url="../search/search" hover-class="none">
						<view class="iconfont iconsousuo" style="margin-right: 30upx;"></view>
					</navigator>
					<image src="/static/com_nav_ic_hot_nor@3x.png" mode="widthFix" class="hot-icon" @click="showHotMask = true"></image>
				</view>
			</view>
			<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh"
			 @setEnableScroll="setEnableScroll">
				<swiper class="swiper-box" :current="tabIndex" :duration="300" @change="changeSwiper">
					<swiper-item v-for="(el, i) in tabs" :key="i">
						<scroll-view @scrolltolower="loadMore(i)" :scroll-y="!showArticleOperate" class="scroll-view" :enable-back-to-top="el.active">
							<empty v-if="tabs[i].data.length == 0 && isLoad" msg="暂无资讯，下拉加载试试~"></empty>
							<article-item :list="tabs[i].data" :showOperate="true" v-on:showOperate="showOperate"></article-item>
							<view class="uni-tab-bar-loading">
								<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</mix-pulldown-refresh>
			<view class="mask" v-if="showHotMask" @click="hideHotMask">
				<view class="triangle_border_up" :style="{'margin-top':CustomBar+30+'px'}"></view>
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
			<article-operate :show="showArticleOperate" :top="articleOffsetTop" :articleId="articleId" :userId="userId" :index="articleIndex"
			 v-on:hideArticleOperate="hideArticleOperate" v-on:refreshList="refreshList" v-on:removeArticle="removeArticle"></article-operate>
		</view>
	</view>

</template>

<script>
	import uniTag from '@/components/uni-tag.vue';
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh';
	// import { chGMT } from '@/common/util/date.js';
	import articleOperate from '@/components/article-operate';
	var ctime = parseInt(Date.now());
	const total = 10;
	let isLaunch = true
	export default {
		components: {
			uniTag,
			mixPulldownRefresh,
			articleOperate
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
				tabs: [{
						name: '推荐',
						active: true,
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						name: '关注',
						active: false,
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
				CustomBar: this.CustomBar
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
				imageUrl: '/static/1024.png'
			};
		},
		onLoad(options) {
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
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				let index = parseInt(uni.getStorageSync('articleIndex'))
				try {
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
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		onHide() {
			this.showHotMask = false;
		},
		methods: {
			getHot() {
				this.api.home.get_hotVip_List(null, res => {
					console.log(res);
					this.hotList = res.data;
				});
			},

			init() {
				if (!this.tabs[this.tabIndex].data.length) {
					this.isLoad=false
					uni.showLoading({
						title: '加载中'
					});
					console.log('加载中')
				}
				this.tabs[this.tabIndex].loadingType = 0;
				this.tabs[this.tabIndex].offset = 0;
				return new Promise((onok, onno) => {
					if (this.tabIndex === 0) {
						this.api.home.get_recommend_article({
								type: 2,
								ctime: ctime,
								offset: this.tabs[this.tabIndex].offset,
								total: total,
								isLaunch
							},
							res => {
								console.log('刷新推荐数据');
								console.log(res);
								this.tabs[this.tabIndex].data = res.data.concat(this.tabs[this.tabIndex].data);
								isLaunch = false
								this.isLoad=true
								uni.hideLoading();
								onok(res.data);
							}
						);
					} else {
						this.api.home.get_foucs_article({
								type: 1,
								ctime: ctime,
								offset: this.tabs[this.tabIndex].offset,
								total: total,
								isLaunch
							},
							res => {
								console.log('刷新关注数据');
								console.log(res);
								this.tabs[this.tabIndex].data = res.data.concat(this.tabs[this.tabIndex].data);
								isLaunch = false
								this.isLoad=true
								uni.hideLoading();
								onok(res.data);
							}
						);
					}
				});
			},
			getMoreArticle() {
				this.tabs[this.tabIndex].offset += total;
				if (this.tabIndex === 0) {
					this.api.home.get_recommend_article({
							type: 2,
							ctime: ctime,
							offset: this.tabs[this.tabIndex].offset,
							total: total,
							isLaunch
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
				} else {
					this.api.home.get_foucs_article({
							type: 1,
							ctime: ctime,
							offset: this.tabs[this.tabIndex].offset,
							total: total,
							isLaunch
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
				}
			},
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
				}, 1000);
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
			async refreshList() {
				//刷新列表
				// ctime = parseInt(Date.now());
				// await this.init();
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
					url: '../celebrity/detail/detail?id=' + id
				});
			}
		}
	};
</script>

<style lang="scss">
	.container {
		height: 100%;
		overflow: hidden;
	}

	.tab-bar {
		padding: 0upx 0upx 0upx 30upx;
		// border-bottom: 2upx solid #f1f1f1;
		position: relative;
		left: 0;
		top: 0;
		z-index: 2;
		background-color: #ffffff;

		.tabs {
			.item {
				position: relative;
				left: 0;
				top: 0;
				z-index: 2;

				.name {
					position: relative;
					left: 0;
					top: 0;
					z-index: 2;
					font-size: 34upx;
				}

				.active {
					font-size: 46upx !important;

				}

				.bottom-line {
					position: absolute;
					left: 0;
					bottom: 10upx;
					z-index: 1;
					width: 100%;
					height: 20upx;
					border-radius: 10upx;
					background-color: yellow;
				}
			}
		}

		.active {
			font-weight: bold;
			color: black;
			border: none;
		}

		.hot-icon {
			width: 80upx;
		}
	}

	.iconsousuo {
		font-size: 40upx;
	}

	.portrait {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-right: 30upx;
	}

	.list-item {
		&-icon {
			margin-right: 20upx;

			.iconfont {
				margin-right: 10upx;
			}
		}

		.tag {
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('~@/static/com_list_pic@2x.png');
			padding: 5upx 20upx;
		}

		.icon-more-nor {
			width: 60upx;
		}

		.content {
			box-sizing: border-box;
			background-color: #f5f5f5;
			width: 100%;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}

			.image {
				width: 120upx;
			}
		}
	}

	.scroll-view {
		height: 100%;
	}

	.mask {
		.content {
			background-color: #ffffff;
			width: 90%;
			padding: 30upx;
			box-sizing: border-box;
			border-radius: 20upx 0 20upx 20upx;
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
		border-top: 30upx solid transparent;
		border-right: 50upx solid white;
		margin-left: calc(95% - 50upx);
	}
</style>
