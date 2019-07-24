<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">宝宝贝</block>
		</cu-custom>
		<view class="tab-bar flex-r-between" :style="[{top:CustomBar + 'px'}]">
			<view class="tabs flex">
				<view class="gray item" style="margin-right: 60upx;" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }"
				 @click="changeTab(index)">
					<view :class="{'bottom-line':item.active}"></view>
					<view class="name" :class="{ active: item.active }">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<swiper class="scroll-view" :style="[{top:'60px','height':'calc(100% - '+(CustomBar+60)+'px)'}]" :current="tabIndex"
		 :duration="300" @change="changeSwiper">
			<swiper-item v-for="(el, i) in tabs" :key="i" :style="[{'height':'calc(100% - '+(CustomBar+50)+'px)'}]">
				<scroll-view @scrolltolower="loadMore(i)" scroll-y style="height: 100%;" :enable-back-to-top="el.active">
					<empty v-if="tabs[i].data.length == 0 && isLoad" :msg="i==0?'您还没有关注的作者~':'您还没有屏蔽的作者~'"></empty>
					<view class="list-item flex-r-between" v-for="(item,index) in tabs[i].data" :key="index">
						<view class="flex">
							<image :src="item.avatar" mode="widthFix" style="width: 100upx;height: 100upx;border-radius: 50%;margin-right: 20upx;"></image>
							<view class="">
								<view class="font-b">{{item.name}}</view>
								<view class="gray ">
									<text style="margin-right: 20upx;">{{item.originalNum}}篇原创</text>
									<text>{{item.fansNum}}粉丝</text>
								</view>
							</view>
						</view>
						<view class="cancle-btn bg-default-color white" @click="cancel(item.userId,index)">{{i==0?'取消关注':'取消屏蔽'}}</view>
					</view>
					<view class="uni-tab-bar-loading" v-if="tabs[i].data.length >0">
						<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- <empty v-if="list.length==0" msg="您还没有屏蔽的作者~"></empty>
		<view class="container">
			<view class="list-item flex-r-between" v-for="(item,index) in list" :key="index">
				<view class="flex">
					<image :src="item.avatar" mode="widthFix" style="width: 100upx;height: 100upx;border-radius: 50%;margin-right: 20upx;"></image>
					<view class="">
						<view class="font-b">{{item.name}}</view>
						<view class="gray ">
							<text style="margin-right: 20upx;">{{item.originalNum}}篇原创</text>
							<text>{{item.fansNum}}粉丝</text>
						</view>
					</view>
				</view>
				<uni-tag text="取消屏蔽" type="error" :circle="true" @click="cancel(item.userId,index)"></uni-tag>
			</view>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view> -->
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 2;
	export default {
		data() {
			return {
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				// list: [],
				tabs: [{
						name: '关注作者',
						active: true,
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						name: '屏蔽作者',
						active: false,
						data: [],
						offset: 0,
						loadingType: 0
					}
				],
				isLoad: false,
				tabIndex: 0,
				CustomBar: this.CustomBar
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				if (!this.tabs[this.tabIndex].data.length) {
					this.isLoad = false
					uni.showLoading({
						title: '加载中'
					});
					console.log('加载中')
				}
				if (this.tabIndex == 0) {
					this.api.center.attention.get_author_list({
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
						this.isLoad = true;
						uni.hideLoading()
					})
				} else {
					this.api.center.shield.get_author_list({
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
						this.isLoad = true;
						uni.hideLoading()
					})
				}
			},
			async changeTab(index) {
				this.tabs.forEach(item => {
					item.active = false;
				});
				this.tabIndex = index;
				this.tabs[index].active = true;
			},
			changeSwiper(e) {
				this.changeTab(e.target.current);
				if (!this.tabs[this.tabIndex].data.length) {
					this.init();
				}
			},
			loadMore(i) {
				console.log('加载更多')
				if (!this.tabs[this.tabIndex].data.length) {
					return;
				}
				if (this.tabs[i].loadingType !== 0) {
					return;
				}
				this.tabs[i].loadingType = 1;
				this.tabs[this.tabIndex].offset += total;
				this.init();
			},
			cancel(id, index) {
				if (this.tabIndex == 0) {
					this.api.home.hotVip.toggle_followed({
						vid: id,
						action: 0
					}, res => {
						this.tabs[this.tabIndex].data.splice(index, 1)
						uni.showToast({
							title: "取消关注"
						})
					})
				} else {
					this.api.home.article.toggle_shield({
						vid: id,
						action: 0
					}, res => {
						this.tabs[this.tabIndex].data.splice(index, 1)
						uni.showToast({
							title: "取消屏蔽"
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		overflow: hidden;
		background-color: #f8f8f8;
	}

	.tab-bar {
		// border-bottom: 2upx solid #f1f1f1;
		padding-left: 30upx;
		position: fixed;
		left: 0;
		z-index: 2;
		background-color: #ffffff;
		height: 50px;
		width: 100%;

		.tabs {
			width: 100%;

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
	}

	.scroll-view {
		width: 100%;
		position: relative;

		.list-item {
			border-bottom: 2upx solid #f5f5f5;
			padding: 20upx 30upx;
			background-color: white;

			.cancle-btn {
				padding: 10upx 30upx;
				border-radius: 50upx;
			}
		}
	}
</style>
