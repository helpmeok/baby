<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">月龄常见问题</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="没有更多数据了~"></empty>
		<view class="" style="margin-top: 30upx;">
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
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	let ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	import myMixin from '@/common/mixins.js'
	export default {
		mixins: [myMixin.publicApi],
		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
			};
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getCurrentBabyInfo()
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.child.get_more_question_list({
						groupId: this.babyInfoGroupId,
						offset,
						total,
					},
					res => {
						console.log(res.data)
						if (res.data.length) {
							this.list = this.list.concat(res.data)
							if (res.data.length < total) {
								this.loadingType = 2
							} else {
								this.loadingType = 0
							}
						} else {
							this.loadingType = 2
						}
						uni.hideLoading()
					}
				);
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
			goDetail(el) {
				uni.navigateTo({
					url: "/pages/helper/list/list?id=" + el.questionId + "&name=" + el.questionName
				})
			},
		},
		onShow() {

		},
		onReachBottom() {
			this.loadMore()
		},
		
	}
</script>

<style lang="scss">
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
</style>
