<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">问题集</block>
		</cu-custom>
		<view class="pd-box fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="title flex">
				<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix"></image>
				<view class="">{{name}}</view>
			</view>
		</view>
		<empty v-if="list.length==0" msg="没有任何数据耶~"></empty>
		<view class="list" :style="[{top:CustomBar + 'px'}]">
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
				screenHeight: this.screenHeight
			};
		},
		onLoad(options) {
			qaId = options.id
			this.name = options.name
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
				this.api.helper.get_qaset_list({
					qaId,
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						this.loadingType = 0
						if (res.data.length < total) {
							this.loadingType = 2
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
			showOperate() {}
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss">
	.title {
		height: 100upx;
		box-sizing: border-box;
		font-size: 34upx;
		color: #FC4041;
		background-color: #FFECEC;
		font-weight: bold;
		letter-spacing: 2upx;
		border-radius: 10upx;
		padding: 0 30upx;
		image{
			width: 40upx;
			margin-right: 20upx;
		}
	}
	.fixed{
		position: fixed;
		left: 0;
		width: 100%;
		background-color: white;
		z-index: 999;
	}
	.list{
		position: relative;
		left: 0;
		width: 100%;
	}
</style>


