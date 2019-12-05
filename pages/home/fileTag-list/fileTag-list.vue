<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="file-filter-box pd-box flex bg-white border-bottom gray" id="sticky" :style="{'top':CustomBar+'px'}">
			<view class="item flex-r-center" :class="{'blod on':ftab.active}" @click="refreshFileList(fi)" v-for="(ftab,fi) in fileTabs"
			 :key="fi">
				<view class="">
					{{ftab.name}}
				</view>
				<view class="mgl-10 flex-r-center" v-if="ftab.active">
					<image src="/static/home/home_file_ic_sort_up@3x.png" v-if="ftab.orderSort==0" mode="widthFix" class="icon"></image>
					<image src="/static/home/home_file_ic_sort_down@3x.png" v-if="ftab.orderSort==1" mode="widthFix" class="icon"></image>
				</view>
			</view>
		</view>
		<view class="" style="height: 100upx;"></view>
		<empty v-if="list.length==0" msg="暂无文件数据~"></empty>
		<view class="">
			<article-item :list="list" :showOperate="false" v-on:showOperate="showOperate"></article-item>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	export default {

		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				title: "",
				fileTabs: [{
						name: "按发布时间",
						orderField: 0,
						orderSort: 1,
						active: true,
					},
					{
						name: "按查阅数",
						orderField: 1,
						orderSort: 1,
						active: false,
					},
					{
						name: "按转发数",
						orderField: 2,
						orderSort: 1,
						active: false,
					}
				],
				fileTabIndex: 0,
				tagPoolId: "",
				offset: 0,
				CustomBar: this.CustomBar,
			};
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中"
			})
			this.title = options.title;
			this.tagPoolId = options.id;
			this.init()
			setTimeout(()=>{
				uni.createSelectorQuery()
					.select('#sticky')
					.fields({
							size: true,
							scrollOffset: true,
							rect: true
						},
						data => {
							console.log(data)
							this.placeHeight=data.height;
						}
					).exec()
			},500)
		},
		methods: {
			init(type) {
				this.api.home.get_article_by_chanelId({
						channelId: -6,
						ctime: ctime,
						offset: this.offset,
						total: total,
						orderSort: this.fileTabs[this.fileTabIndex].orderSort,
						orderField: this.fileTabs[this.fileTabIndex].orderField,
						tagPoolId: this.tagPoolId
					},
					res => {
						if (res.data.length) {
							if (type == "refresh") {
								console.log(this.list)
								this.list = res.data
								uni.pageScrollTo({
								scrollTop: 0,
								duration: 300
								});
							} else {
								this.list = this.list.concat(res.data)
							}
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
				this.offset += total
				this.init()
			},
			showOperate() {},
			refreshFileList(index) {
				uni.showLoading({
					title: "加载中"
				})
				this.fileTabIndex = index;
				if (this.fileTabs[index].active) {
					this.fileTabs[index].orderSort = this.fileTabs[index].orderSort == 0 ? 1 : 0;
				} else {
					this.fileTabs.forEach((el) => {
						el.active = false
					})
					this.fileTabs[index].active = true;
				}
				this.init('refresh')
				
			},
		},
		onShow() {
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				try {
					let index = parseInt(uni.getStorageSync('articleIndex'))
					uni.removeStorageSync('articleIndex')
					let articleId = this.list[index].articleId
					if (articleId.toString()) {
						this.api.home.article.get_detail({
							article_id: articleId,
							request_type: "h5"
						}, res => {
							console.log(res.data)
							this.list[index].clickNum = res.data.clickNum
							this.list[index].commentNum = res.data.commentNum
							this.list[index].praiseNum = res.data.praiseNum
							this.list[index].forwardNum = res.data.forwardNum
							this.$forceUpdate()
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
			if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
				try {
					let index = parseInt(uni.getStorageSync('questionIndex'))
					uni.removeStorageSync('questionIndex')
					let questionId = this.list[index].articleId
					if (questionId.toString()) {
						this.api.home.qa.question.get_detail({
							questionId
						}, res => {
							console.log(res.data)
							this.list[index].clickNum = res.data.clickNum;
							this.list[index].forwardNum = res.data.forwardNum
							this.list[index].answerNum = res.data.answerNum
							this.list[index].answerReplyList = res.data.answerReplyList
							this.$forceUpdate()
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.file-filter-box {
		width: 100%;
		position: fixed;
		z-index: 999;
		left: 0;
		height: 100upx;
		.item {
			margin-right: 50upx;
		}

		.item.on {
			color: #FC4041;
			font-size: 30upx;
		}

		.icon {
			width: 20upx;
		}
	}
</style>
