<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">月龄适用文库</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="没有更多文库了~"></empty>
		<view class="">
			<article-item :list="list" :showUserInfo="false" :showOperate="false" v-on:showOperate="showOperate"></article-item>
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
			this.getBabyIdAndType()
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.home.get_article_by_chanelId({
						groupId: this.babyInfoGroupId,
						channelId: -6,
						ctime,
						offset,
						total,
						orderSort: 0,
						orderField: 1
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
		},
		onShow() {

		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">

</style>
