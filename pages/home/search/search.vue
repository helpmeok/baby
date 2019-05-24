<template>
	<view style="height: 100%;">
		<view class="flex-r-between search-box">
			<view class="flex-r-between search">
				<view class="flex">
					<view class="iconfont iconsousuo" style="margin-right: 20upx;"></view>
					<input type="text" v-model="value" placeholder="输入要搜索的内容" @confirm="search" />
				</view>
				<view class="iconfont iconshanchu gray" style="margin-left: 30upx;" @click="value = ''" v-show="show"></view>
			</view>
			<uni-tag text="搜索" type="error" :disabled="!show" :circle="true" @click="search(value)"></uni-tag>
		</view>
		<view class="content" v-if="!show">
			<view class=" blod">大家都在搜</view>
			<view class="flex">
				<view class="item small " v-for="(item,index) in keywordList" :key="index" @click="search(item.title)">
					{{item.title}}
				</view>
			</view>
			<view class="flex-r-between" style="margin-top: 20upx;">
				<text class="blod">历史搜索</text>
				<view class="iconfont icon- gray blod" @click="clearHistoryList"></view>
			</view>
			<view class="flex">
				<view class="item small " v-for="(item,index) in historyList" :key="index" @click="search(item)">
					{{item}}
				</view>
			</view>
		</view>
		<scroll-view @scrolltolower="loadMore()" scroll-y class="scroll-view" v-else>
			<empty v-if="articleList.length == 0" msg="没有任何数据耶~"></empty>
			<article-item :list="articleList" v-on:showOperate="showOperate"></article-item>
			<view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let offset = 0
	let total = 10
	let ctime = parseInt(Date.now())
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
					contentnomore: '没有更多数据了'
				},
				loadingType: 0
			};
		},
		onLoad() {
			this.historyList = uni.getStorageSync('history_keywords').split(';')
			this.init()
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
			search(val) {
				console.log(this.value);
				this.value = val;
				if (this.historyList.indexOf(val) == -1) {
					uni.setStorageSync('history_keywords', uni.getStorageSync('history_keywords') ? uni.getStorageSync(
						'history_keywords') + ';' + this.value : this.value)
					this.historyList = uni.getStorageSync('history_keywords').split(';');
				}
				uni.showLoading({
					title: "加载中"
				})
				this.api.home.search.get_response_list({
					keyword: this.value,
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					this.articleList = res.data
					uni.hideLoading()
				})

			},
			init() {
				this.api.home.search.get_query_list({
					type: 2,
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					this.keywordList = res.data
				})
			},
			loadMore() {
				console.log('11111')
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				offset = total + offset
				this.api.home.search.get_response_list({
					keyword: this.value,
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.articleList = this.articleList.concat(res.data)
						this.loadingType = 0;
					} else {
						this.loadingType = 2;
					}
				})
			},
			clearHistoryList() {
				uni.removeStorageSync('history_keywords');
				this.historyList = [];
			},
			showOperate() {

			}
		}
	};
</script>

<style lang="less">
	.search-box {
		padding: 0 30upx;
		height: 100upx;
		border-bottom: 2upx solid #f1f1f1;
		position: relative;
		left: 0;
		top: 0;

		.search {
			background-color: #f5f5f5;
			padding: 5upx 20upx;
			width: 80%;
			border-radius: 10upx;
		}
	}

	.content {
		padding: 30upx;

		.item {
			border: 2upx solid #cccccc;
			height: 60upx;
			padding: 0upx 20upx;
			border-radius: 30upx;
			line-height: 60upx;
			margin-right: 30upx;
			margin-top: 20upx;
		}
	}

	.scroll-view {
		height: calc(100% - 100upx) !important;
	}
</style>
