<template>
	<view class="uni-tab-bar">
		<view class="tab-bar flex-r-between">
			<view class="tabs flex">
				<view class="gray" style="margin-right: 60upx;" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }" @click="changeTab(index)">
					{{ item.name }}
				</view>
			</view>
			<view class="icons flex">
				<navigator url="../search/search" hover-class="none"><view class="iconfont iconsousuo" style="margin-right: 30upx;"></view></navigator>
				<image src="/static/com_nav_ic_hot_nor@3x.png" mode="widthFix" class="hot-icon" @click="showHotMask = true"></image>
			</view>
		</view>
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<swiper class="swiper-box" :current="tabIndex" :duration="300" @change="changeSwiper">
				<swiper-item v-for="(el, i) in tabs" :key="i">
					<scroll-view @scrolltolower="loadMore(i)" :scroll-y="!showArticleOperate" class="scroll-view" :enable-back-to-top="el.active">
						<empty v-if="tabs[i].data.length == 0" msg="暂无资讯，下拉加载试试~"></empty>
						<view class="list-item" v-for="(item, index1) in tabs[i].data" :key="index1">
							<view class="flex-r-between">
								<view class="flex">
									<image src="../../../static/me_list_photo@2x.png" mode="widthFix" class="portrait"></image>
									<text class="blod">{{ item.author }}</text>
								</view>
								<view class="tag white small">{{ item.keywords}}</view>
							</view>
							<view class="flex-r-between content">
								<view class="desc" style="width: 72%;">{{ item.description }}</view>
								<image :src="item.image" mode="widthFix" class="image"></image>
							</view>
							<view class="flex-r-between">
								<view class="flex">
									<view class="list-item-icon flex">
										<text class="iconfont iconliulan gray"></text>
										<text class="small gray">999</text>
									</view>
									<view class="list-item-icon flex">
										<text class="iconfont iconiconfontzhizuobiaozhun44 gray"></text>
										<text class="small gray">999</text>
									</view>
									<view class="list-item-icon flex">
										<text class="iconfont iconpinglun gray"></text>
										<text class="small gray">999</text>
									</view>
									<view class="list-item-icon flex">
										<text class="iconfont iconzhuanfa gray"></text>
										<text class="small gray">999</text>
									</view>
								</view>
								<image
									src="../../../static/com_list_ic_more_nor@2x.png"
									mode="widthFix"
									class="icon-more-nor"
									@click="showMoreMask($event, item.articleId)"
								></image>
							</view>
						</view>
						<view class="uni-tab-bar-loading"><uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		<view class="mask" v-if="showHotMask" @click="hideHotMask">
			<view class="triangle_border_up"></view>
			<view class="content flex" @click.stop>
				<view class="flex-c-center" style="width: 20%;">
					<image src="../../../static/home_popup_ic_more_nor@3x.png" mode="widthFix" style="width: 100upx;" @click="goDetail"></image>
					<text>大V</text>
				</view>
				<view class="flex-c-center" style="width: 20%;">
					<image src="../../../static/home_popup_ic_more_nor@3x.png" mode="widthFix" style="width: 100upx;" @click="goDetail"></image>
					<text>大V</text>
				</view>
				<view class="flex-c-center" style="width: 20%;">
					<image src="../../../static/home_popup_ic_more_nor@3x.png" mode="widthFix" style="width: 100upx;" @click="goDetail"></image>
					<text>大V</text>
				</view>
				<view class="flex-c-center" style="width: 20%;">
					<image src="../../../static/home_popup_ic_more_nor@3x.png" mode="widthFix" style="width: 100upx;" @click="goDetail"></image>
					<text>大V</text>
				</view>
				<view class="flex-c-center" style="width: 20%;">
					<image src="../../../static/home_popup_ic_more_nor@3x.png" mode="widthFix" style="width: 100upx;" @click="goMore"></image>
					<text>更多</text>
				</view>
			</view>
		</view>
		<article-operate :show="showArticleOperate" :top="articleOffsetTop" :id="articleId" v-on:hideArticleOperate="hideArticleOperate"></article-operate>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more.vue';
import uniTag from '@/components/uni-tag.vue';
import mixPulldownRefresh from '@/components/mix-pulldown-refresh';
// import { chGMT } from '@/common/util/date.js';
import articleOperate from '@/components/article-operate';
import empty from '@/components/empty-data.vue'
var ctime = parseInt(Date.now() / 1000);
const total = 10;
export default {
	components: {
		uniLoadMore,
		uniTag,
		mixPulldownRefresh,
		articleOperate,
		empty
	},
	data() {
		return {
			showHotMask: false,
			tabIndex: 0,
			enableScroll: true,
			showArticleOperate: false,
			articleId: '',
			articleOffsetTop: 0,
			tabs: [
				{
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
			}
		};
	},
	onLoad() {
		this.init();
	},
	onHide() {
		this.showHotMask = false;
	},
	methods: {
		init() {
			if (!this.tabs[this.tabIndex].data.length) {
				uni.showLoading({
					title: '加载中'
				});
			}
			this.tabs[this.tabIndex].loadingType = 0;
			this.tabs[this.tabIndex].offset = 0;
			return new Promise((onok, onno) => {
				if (this.tabIndex === 0) {
					this.api.home.get_recommend_article(
						{
							type: 2,
							ctime: ctime,
							offset: this.tabs[this.tabIndex].offset,
							total: total
						},	
						res => {
							console.log('推荐数据');
							console.log(res);
							this.tabs[this.tabIndex].data = res.data;
							console.log(this.tabs);
							uni.hideLoading();
							onok(res.data);
						}
					);
				} else {
					this.api.home.get_foucs_article(
						{
							type: 1,
							ctime: ctime,
							offset: this.tabs[this.tabIndex].offset,
							total: total
						},
						res => {
							console.log('关注数据');
							console.log(res);
							this.tabs[this.tabIndex].data = res.data;
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
				this.api.home.get_recommend_article(
					{
						type: 2,
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
			} else {
				this.api.home.get_foucs_article(
					{
						type:1,
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
			}
		},
		async changeTab(index) {
			this.tabs.forEach(item => {
				item.active = false;
			});
			this.tabIndex = index;
			if (!this.tabs[this.tabIndex].data.length) {
				await this.init();
			}
			this.tabs[index].active = true;
		},
		changeSwiper(e) {
			this.changeTab(e.target.current);
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
			ctime = parseInt(Date.now() / 1000); //刷新时间
			this.tabs[this.tabIndex].offset = 0;
			await this.init();
			this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
		},
		setEnableScroll(enable) {
			if (this.enableScroll !== enable) {
				this.enableScroll = enable;
			}
		},
		showMoreMask(e) {
			console.log(e);
			uni.getSystemInfo({
				success: res => {
					console.log(res.windowHeight);
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
		goMore() {
			uni.navigateTo({
				url: '../celebrity/more/more'
			});
		},
		goDetail() {
			uni.navigateTo({
				url: '../celebrity/detail/detail'
			});
		}
	}
};
</script>

<style lang="scss">
.tab-bar {
	padding: 20upx 0upx 20upx 30upx;
	border-bottom: 2upx solid #f1f1f1;
	position: relative;
	left: 0;
	top: 0;
	z-index: 1;
	background-color: #ffffff;
	.active {
		font-weight: bold;
		font-size: 40upx;
		color: #fc4041;
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
	margin-bottom: 20upx;
	padding: 20upx 30upx;
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
		padding: 20upx 30upx;
		box-sizing: border-box;
		background-color: #f5f5f5;
		width: 100%;
		margin: 30upx 0;
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
	}
}

.triangle_border_up {
	width: 0;
	height: 0;
	border-top: 30upx solid transparent;
	border-right: 50upx solid white;
	margin-top: 100upx;
	margin-left: calc(95% - 50upx);
}
</style>
