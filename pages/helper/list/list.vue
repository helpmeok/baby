<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">大V解答</block>
		</cu-custom>
		<scroll-view class="scroll-view" scroll-y :style="{'height':scrollHeight+'px'}" enable-back-to-top @scrolltolower="loadMore"
		 @scroll="scroll">
			<view class="fixed-header pd-box" v-show="showHeader" :style="{'top':CustomBar+'px'}">
				<view class="question">
					<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
					<view class="font-b blod text">
						{{name}}
					</view>
				</view>
			</view>
			<view class="question-box" id="header">
				<view class="question">
					<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
					<view class="font-b blod text">
						{{name}}
					</view>
				</view>
				<view class="flex-r-between">
					<view class="gray">
						共有{{total}}篇相关回答
					</view>
					<view class="flex default-color" @click="goAsk">
						<text>没有我要的答案</text>
						<image src="/static/com_list_arrow_nor@2x.png" mode="widthFix" class="arrow-icon"></image>
					</view>
				</view>
			</view>
			<empty v-if="list.length==0" msg="没有任何数据耶~"></empty>
			<view class="list">
				<article-item :list="list" v-on:showOperate="showOperate"></article-item>
				<view class="uni-tab-bar-loading" v-if="list.length>0">
					<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	let qaId = ""
	export default {
		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "无更多文章"
				},
				list: [],
				name: "",
				CustomBar: this.CustomBar,
				screenHeight: this.screenHeight,
				scrollHeight: this.screenHeight - this.CustomBar,
				total: 0,
				headerTop: 0,
				showHeader: false
			};
		},
		onLoad(options) {
			qaId = options.id
			this.name = options.name
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.helper.get_qaset_list({
					qaId,
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					this.total = res.data.total
					if (res.data.resultList.length) {
						this.list = this.list.concat(res.data.resultList)
						this.loadingType = 0
						if (res.data.resultList.length < total) {
							this.loadingType = 2
						}
					} else {
						this.loadingType = 2
					}
					uni.hideLoading()
					this.getHeight()
				})
			},
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				offset += total
				this.init()
			},
			showOperate() {},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async getHeight() {
				let data = await this.getElSize('header')
				this.headerTop = data.height
			},
			scroll(e) {
				if (this.headerTop <= e.detail.scrollTop) {
					this.showHeader = true
				} else {
					this.showHeader = false
				}
			},
			goAsk(){
				uni.navigateTo({
					url:"/pages/home/question/commit/commit"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view {
		position: relative;
		left: 0;
		top: 0;

		.question-box {
			box-sizing: border-box;
			background-color: #ffffff;
			border-radius: 20upx;
			padding: 40upx 30upx;
			box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
			width: calc(100% - 60upx);
			margin-left: 30upx;
			margin-bottom: 40upx;
			margin-top: 30upx;

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

			.arrow-icon {
				width: 50upx;
			}

			.answer-icon {
				width: 40upx;
			}
		}

		.fixed-header {
			box-sizing: border-box;
			background-color: #ffffff;
			box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
			position: fixed;
			left: 0;
			width: 100%;
			z-index: 555;

			.question {
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

		.list {
			position: relative;
			left: 0;
			width: 100%;
		}
	}
</style>
