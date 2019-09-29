<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="search">
				<view class="search-box flex">
					<!-- <text class="iconfont iconsousuo gray"></text> -->
					<image src="/static/com_nav_ic_search_pre@3x.png" mode="widthFix" style="width: 60upx;"></image>
					<input type="text" v-model="keyword" confirm-type="search" placeholder="请输入TA的全部内容" placeholder-class="gray"
					 @confirm="init('search')" class="input " />
					<!-- <text class="iconfont iconshanchu gray" v-show="keyword" @click="keyword=''"></text> -->
				</view>
			</block>
		</cu-custom>
		<view class="">
			<empty class="empty-box" v-if="articleList.length == 0" msg="找不到相关内容耶~"></empty>
			<scroll-view @scrolltolower="loadMore()" :scroll-y="true" class="scroll-view" :style="{'height':scrollHeight+'px'}">
				<article-item :list="articleList" :showOperate="false" v-on:showOperate="showOperate"></article-item>
				<view class="uni-tab-bar-loading" v-if="articleList.length > 0">
					<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	let ctime = parseInt(Date.now());
	let total = 10;
	let id = ""
	export default {
		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多内容了"
				},
				keyword: "",
				offset: 0,
				articleList: [],
				CustomBar: this.CustomBar,
				scrollHeight: this.screenHeight - this.CustomBar
			}
		},
		onLoad(options) {
			id = options.id;
			console.log(id)
			this.init()
		},
		onShow() {
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				try{
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
				}catch(e){
					//TODO handle the exception
				}
			}
			if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
				try{
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
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		methods: {
			init(type) {
				if (!this.articleList.length || type) {
					uni.showLoading({
						title: "加载中"
					})
					this.offset = 0;
					this.articleList = []
				}
				this.api.home.hotVip.get_article({
					vid: id,
					type: 0,
					ctime,
					offset: this.offset,
					total,
					keyword: this.keyword,
					showType: ""
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.articleList = this.articleList.concat(res.data)
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
					console.log(this.articleList)
					this.$forceUpdate()
					uni.hideLoading()
				})
			},
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				this.offset += total
				this.init()
			},
			showOperate(){}
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


	.list-item {
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 40upx 30upx;
		box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
		margin-bottom: 30upx;
		width: 100%;

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
