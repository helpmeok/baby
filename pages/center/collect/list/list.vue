<template>
	<view>
		<empty v-if="list.length==0" msg="您还没有收藏的文章~"></empty>
		<view class="">
			<article-item :list="list" v-on:showOperate="showOperate"></article-item>
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
				title:"加载中"
			})
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.center.collect.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res.data)
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						this.loadingType = 0
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
			showOperate() {}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	
</style>
