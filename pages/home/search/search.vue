<template>
	<view style="height: 100%;">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">搜索</block>
		</cu-custom>
		<view class="container">
			<view class="flex-r-between search-box" :style="[{top:CustomBar + 'px'}]">
				<view class="flex-r-between search">
					<view class="flex">
						<!-- <view class="iconfont iconsousuo" style="margin-right: 20upx;"></view> -->
						<image src="/static/com_nav_ic_search_pre@3x.png" mode="widthFix" style="width: 60upx;"></image>
						<input type="text" focus="true" confirm-type="search" v-model="value" placeholder="输入要搜索的内容" @confirm="inputConfirm" />
					</view>
					<view class="iconfont iconshanchu gray" style="margin-left: 30upx;" @click="value = ''" v-show="show"></view>
				</view>
				<!-- <uni-tag text="搜索" type="error" :disabled="!show" :circle="true" @click="search(value)"></uni-tag> -->
				<navigator open-type="navigateBack" delta="1" hover-class="none">取消</navigator>
			</view>
			<view class="contents" v-if="!show" :style="[{top:CustomBar+50 + 'px'}]">
				<view class=" blod">大家都在搜</view>
				<view class="flex">
					<view class="item small " v-for="(item, index) in keywordList" :key="index" @click="search(item.keywordName)">{{ item.keywordName }}</view>
				</view>
				<view class="flex-r-between" style="margin-top: 20upx;" v-if="historyList.length>0">
					<text class="blod">历史搜索</text>
					<image src="/static/search_list_ic_delete_nor@3x.png" style="width: 88upx;" mode="widthFix" @click="clearHistoryList"></image>
					<!-- <view class="iconfont icon- gray blod"></view> -->
				</view>
				<view class="flex">
					<view class="item small " v-for="(item, index) in historyList" :key="index" @click="search(item)">{{ item }}</view>
				</view>
			</view>
			<view class="" v-else>
				<empty class="empty-box" v-if="articleList.length == 0" msg="没有任何数据耶~" :style="[{top:CustomBar+50 + 'px',height:screenHeight-CustomBar-50+'px'}]"></empty>
				<scroll-view @scrolltolower="loadMore()" :scroll-y="true" class="scroll-view" :style="[{top:CustomBar+50 + 'px',height:screenHeight-CustomBar-50+'px'}]">
					<article-item :list="articleList" :showOperate="false" v-on:showOperate="showOperate"></article-item>
					<view class="uni-tab-bar-loading" v-if="articleList.length > 0">
						<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</view>

		</view>

	</view>
</template>

<script>
	let offset = 0;
	let total = 10;
	let ctime = parseInt(Date.now());
	export default {
		data() {
			return {
				value: '',
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
				screenHeight: this.screenHeight
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
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				let index = parseInt(uni.getStorageSync('articleIndex'))
				uni.removeStorageSync('articleIndex')
				let articleId = this.articleList[index].articleId
				if (articleId.toString()) {
					this.api.home.article.get_detail({
						article_id: articleId,
						request_type: "h5"
					}, res => {
						console.log(res.data)
						this.articleList[index].clickNum = res.data.clickNum
						this.articleList[index].commentNum = res.data.commentNum
						this.articleList[index].praiseNum = res.data.praiseNum
						this.articleList[index].forwardNum = res.data.forwardNum
						this.$forceUpdate()
					})
				}
			}
			if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
				let index = parseInt(uni.getStorageSync('questionIndex'))
				uni.removeStorageSync('questionIndex')
				let questionId = this.articleList[index].articleId
				if (questionId.toString()) {
					this.api.home.qa.question.get_detail({
						questionId
					}, res => {
						console.log(res.data)
						this.articleList[index].clickNum = res.data.clickNum;
						this.articleList[index].forwardNum = res.data.forwardNum
						this.articleList[index].answerNum = res.data.answerNum
						this.$forceUpdate()
					})
				}
			}
		},
		onUnload() {
			offset = 0;
		},
		watch: {
			value(val) {
				this.show = val ? true : false;
				if (!val) {
					offset = 0;
				}
			}
		},
		methods: {
			inputConfirm(e) {
				this.search(e.target.value)
			},
			search(val) {
				console.log(this.value);
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
				uni.showLoading({
					title: '加载中'
				});
				offset = 0
				this.articleList = [];
				this.loadingType = 0;
				this.api.home.search.get_response_list({
						keyword: this.value,
						ctime,
						offset,
						total
					},
					res => {
						console.log(res);
						this.articleList = res.data;
						uni.hideLoading();
					}
				);
			},
			init() {
				this.api.home.search.get_query_list({
						type: 2,
						ctime,
						offset,
						total
					},
					res => {
						console.log(res);
						this.keywordList = res.data ? res.data : [];
					}
				);
			},
			loadMore() {
				console.log('11111');
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				offset = total + offset;
				this.api.home.search.get_response_list({
						keyword: this.value,
						ctime,
						offset,
						total
					},
					res => {
						console.log(res);
						if (res.data.length) {
							this.articleList = this.articleList.concat(res.data);
							this.loadingType = 0;
						} else {
							this.loadingType = 2;
						}
					}
				);
			},
			clearHistoryList() {
				uni.removeStorageSync('history_keywords');
				this.historyList = [];
			},
			showOperate() {}
		}
	};
</script>

<style lang="less">
	.search-box {
		padding: 0 30upx;
		height: 50px;
		border-bottom: 2upx solid #f1f1f1;
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

		.scroll-view {
			position: fixed;
			left: 0;
			width: 100%;
			padding: 0;
			margin: 0;
		}

		.empty-box {
			position: fixed;
			left: 0;
			width: 100%;
			padding: 0;
			margin: 0;
		}
	}
</style>
