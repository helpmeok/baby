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
		<swiper class="scroll-view" :style="[{top:'50px','height':'calc(100% - '+(CustomBar+50)+'px)'}]" :current="tabIndex"
		 :duration="300" @change="changeSwiper">
			<swiper-item v-for="(el, i) in tabs" :key="i" :style="[{'height':'calc(100% - '+(CustomBar+50)+'px)'}]">
				<scroll-view @scrolltolower="loadMore(i)" scroll-y style="height: 100%;" :enable-back-to-top="el.active">
					<empty v-if="tabs[i].data.length == 0 && isLoad" :msg="i==0?'您还没有收藏的文章~':'您还没有屏蔽的文章~'"></empty>
					<article-item :list="tabs[i].data" :removeType="i==0?'collect':'shield'" v-on:removeArticle="removeArticle"
					 :showOperate="false" v-on:showOperate="showOperate"></article-item>
					<view class="uni-tab-bar-loading" v-if="tabs[i].data.length >0">
						<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- <empty v-if="list.length==0" msg="您还没有收藏的文章~"></empty>
		<view class="">
			<article-item :list="list" :showOperate="false" v-on:showOperate="showOperate"></article-item>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view> -->
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	export default {
		data() {
			return {
				// loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多文章了"
				},
				// list: [],
				tabs: [{
						name: '文章收藏',
						active: true,
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						name: '文章屏蔽',
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
			uni.showLoading({
				title: "加载中"
			})
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
			// if (uni.getStorageSync('questionIndex').toString()) { //监听问答数据改变
			// 	let index = parseInt(uni.getStorageSync('questionIndex'))
			// 	try {
			// 		let questionId = this.tabs[this.tabIndex].data[index].answerQuestion.id
			// 		if (questionId.toString()) {
			// 			this.api.home.qa.question.get_detail({
			// 				questionId
			// 			}, res => {
			// 				console.log(res.data)
			// 				this.tabs[this.tabIndex].data[index].answerQuestion=res.data;
			// 				uni.removeStorageSync('questionIndex')
			// 				this.$forceUpdate()
			// 			})
			// 		}
			// 	} catch (e) {
			// 		//TODO handle the exception
			// 	}
			// }
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
					this.api.center.collect.get_list({
						ctime,
						offset: this.tabs[this.tabIndex].offset,
						total
					}, res => {
						console.log(res.data)
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
					this.api.center.shield.get_article_list({
						ctime,
						offset: this.tabs[this.tabIndex].offset,
						total
					}, res => {
						console.log(res.data)
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
			showOperate() {},
			removeArticle(i) {
				this.tabs[this.tabIndex].data.splice(i, 1)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		overflow: hidden;
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
	}
</style>
