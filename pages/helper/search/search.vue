<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="search">
				<view class="search-box flex">
					<!-- <text class="iconfont iconsousuo gray"></text> -->
					<image src="/static/com_nav_ic_search_pre@3x.png" mode="widthFix" style="width: 60upx;"></image>
					<input type="text" v-model="keyword" confirm-type="search" placeholder="请输入问题" placeholder-class="gray" @confirm="init('search')"
					 class="input " />
					<!-- <text class="iconfont iconshanchu gray" v-show="keyword" @click="keyword=''"></text> -->
				</view>
			</block>
		</cu-custom>
		<view class="gray header">
			共找到{{total}}个相似问题
		</view>
		<empty class="empty-box" v-if="list.length == 0" msg="找不到问题耶~"></empty>
		<scroll-view @scrolltolower="loadMore()" :scroll-y="true" class="scroll-view" v-else :style="{'height':scrollHeight+'px'}">
			<view class="list-item flex-r-center" v-for="(el, i) in list" :key="i" @click="goDetail(el)">
				<view class="content">
					<view class="question">
						<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
						<view class="font-b blod text">
							{{el.questionName}}
						</view>
					</view>
					<view class="flex-r-between">
						<view class="gray">
							当前有1个标准答案及{{el.articleNum}}篇大V相关文章
						</view>
					</view>
				</view>
				<view class="iconfont iconarrow-right-copy gray blod"></view>
			</view>
			<view class="uni-tab-bar-loading" v-if="list.length > 0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let ctime = parseInt(Date.now());
	let total = 10;
	export default {
		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多问题了"
				},
				keyword: "",
				offset: 0,
				list: [],
				CustomBar: this.CustomBar,
				scrollHeight: this.screenHeight - this.CustomBar - 40,
				total: 0
			}
		},
		onLoad(options) {
			this.keyword = options.text
			this.init()
		},
		methods: {
			init(type) {
				if (!this.list.length || type) {
					uni.showLoading({
						title: "加载中"
					})
					this.offset = 0;
					this.list = []
				}
				this.api.helper.get_list_by_search({
					keyword: this.keyword,
					ctime,
					offset: this.offset,
					total
				}, res => {
					console.log(res.data)
					this.total = res.data.total;
					if (res.data.resultList.length) {
						this.list = this.list.concat(res.data.resultList)
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
					uni.hideLoading()
				})
			},
			goDetail(el) {
				uni.navigateTo({
					url: "../list/list?id=" + el.questionId + "&name=" + el.questionName
				})
			},
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				this.offset += total
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		background-color: #F8F8F8;
		padding: 0 20upx;
		border-radius: 30upx;

		.input {
			color: black;
		}
	}

	.header {
		height: 40px;
		line-height: 40px;
		padding-left: 30upx;
	}

	.scroll-view {
		.list-item {
			box-sizing: border-box;
			background-color: #ffffff;
			border-radius: 20upx;
			padding: 40upx 30upx;
			box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
			margin-bottom: 30upx;
			width: calc(100% - 60upx);
			margin-left: 30upx;
			.content {
				width: 90%;

				.question {
					margin-bottom: 20upx;
					width: 100%;

					.question-icon {
						width: 40upx !important;
						position: relative;
						top: 15upx;
						left: 0;
						float: left;
					}
				}
			}

		}

	}
</style>
