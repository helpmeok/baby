<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">浏览历史</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="您还没有浏览过文章~"></empty>
		<view class="">
			<article-item :list="list" removeType="record" v-on:removeArticle="removeArticle" :showOperate="false"
			 v-on:showOperate="showOperate"></article-item>
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
			};
		},
		onLoad() {
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
				this.api.center.record.get_list({
					ctime,
					offset,
					total
				}, res => {
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
			removeArticle(i) {
				this.list.splice(i, 1)
			}
		},
		onShow() {
			if (uni.getStorageSync('articleIndex').toString()) { //监听文章数据改变
				try{
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
				}catch(e){
					//TODO handle the exception
				}
			}
			if (uni.getStorageSync('questionIndex').toString()) { //监听文章数据改变
				try{
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
				}catch(e){
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

</style>
