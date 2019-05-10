<template>
	<view class="uni-tab-bar">
		<view class="tab-bar flex-r-between">
			<view class="tabs flex-r-around">
				<view class="gray" style="margin-right: 60upx;" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }"
				 @click="changeTab(index)">
					{{ item.name }}
				</view>
			</view>
		</view>
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh"
		 @setEnableScroll="setEnableScroll">
			<swiper class="swiper-box" :current="tabIndex" :duration="300" @change="changeSwiper">
				<swiper-item v-for="(el, i) in tabs" :key="i">
					<scroll-view @scrolltolower="loadMore(i)" scroll-y class="scroll-view" :enable-back-to-top="el.active">
						<empty v-if="tabs[i].data.length == 0" msg="暂无资讯，下拉加载试试~"></empty>
						<view class="list-item" v-for="(item, index1) in tabs[i].data" :key="index1">
							<view class="pd-box">
								<view class="blod font-b">
									{{item.name}}
								</view>
								<view class="flex">
									<view class="sub-class mgr-20" @click="goDetail(sub.categoryId)" v-for="(sub,index2) in item.category_list"
									 :key="index2">
										{{sub.categoryName}}
									</view>
								</view>
							</view>
							<view class="cut-off"></view>
						</view>
						<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
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
	const total = 20;
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
				tabIndex: 0,
				tabs: [],
				enableScroll: true,
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
			};
		},
		onLoad() {
			this.get_top_category();
		},
		onHide() {},
		methods: {
			async init() {
				return new Promise((onok, onno) => {
					this.api.classify.get_sub_category({
						categoryId: this.tabs[this.tabIndex].id,
						status: 1,
						total: total,
						offset: this.tabs[this.tabIndex].offset,
						ctime: ctime
					}, res => {
						console.log(res)
						this.tabs[this.tabIndex].data = res.data;
						onok(res.data)
					})
				})
			},
			get_top_category() {
				this.api.classify.get_top_category(null, res => {
					this.tabs = res.data.map((el, i) => {
						if (i == 0) {
							el.active = true
						} else {
							el.active = false
						}
						el.data = [];
						el.offset = 0;
						el.loadingType = 0;
						return el;
					});
					this.init()
				})
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
			async onPulldownReresh() { //下拉刷新
				ctime = parseInt(Date.now() / 1000); //刷新时间
				this.tabs[this.tabIndex].offset = 0;
				await this.init();
				this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
			},
			getMore() {
				this.tabs[this.tabIndex].offset += total;
				this.api.home.get_sub_category({
						categoryId: this.tabs[this.tabIndex].id,
						status: 1,
						total: total,
						offset: this.tabs[this.tabIndex].offset,
						ctime: ctime
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
			loadMore(i) {
				if (!this.tabs[this.tabIndex].data.length) {
					return;
				}
				if (this.tabs[i].loadingType !== 0) {
					return;
				} else {
					this.tabs[i].loadingType = 1;
					this.getMore();
				}
			},
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: "../detail/detail?id=" + id
				})
			}
		}
	};
</script>

<style lang="scss">
	.tab-bar {
		.tabs {
			width: 100%;
		}

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
	}

	.list-item {
		.sub-class {
			width: auto;
			height: 40upx;
			padding: 10upx 30upx;
			border-radius: 30upx;
			border: 2upx solid #f1f1f1;
			line-height: 40upx;
			margin-top: 20upx;

		}
	}

	.scroll-view {
		height: 100%;
	}
</style>
