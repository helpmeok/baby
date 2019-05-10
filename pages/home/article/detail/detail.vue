<template>
	<view>
		<view class="pd-box rich-box" :style="{'height':richTextHeight+'px'}">
			<rich-text :nodes="content" id="rich"></rich-text>
			<view class="fuzzy-box" v-if="isShowMore">
			</view>
		</view>
		<view class="pd-box" v-if="isShowMore" @click="showAll">
			<view class="read-all red flex-r-center">
				<text>阅读全文</text>
				<text class="iconfont iconbottom mgl-10"></text>
			</view>
		</view>

	</view>
</template>

<script>
	let id = ""
	export default {
		data() {
			return {
				content: "",
				richTextHeight: 0,
				isShowMore: false,
				articleHeight: 0
			}
		},
		onLoad(options) {
			id = options.id
			this.init()
		},
		async onReady() {
			let timer = setInterval(async () => {
				var size = await this.getElSize('rich')
				if (size.height > 0) {
					clearInterval(timer)
					this.articleHeight = size.height
					if (size.height > this.screenHeight * 1.5) {
						this.richTextHeight = this.screenHeight * 1.5
						this.isShowMore = true
					} else {
						this.richTextHeight = size.height + 30
						this.isShowMore = false
					}
				}
			}, 100)
		},
		methods: {
			init() {
				this.api.home.article.get_detail({
					article_id: id,
					request_type: "app"
				}, res => {
					console.log(res.data)
					this.content = res.data.content
					uni.setNavigationBarTitle({
						title: res.data.title
					});
				})
			},
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
			showAll() {
				this.richTextHeight = this.articleHeight + 30
				this.isShowMore = false
			}
		}
	}
</script>

<style lang="scss">
	.rich-box {
		overflow: hidden;
		position: relative;
		z-index: 1;

		.fuzzy-box {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 200upx;
			filter: blur(2px);
			background-color: white;
			opacity: 0.8;
			z-index: 2;
		}
	}

	.read-all {
		height: 60upx;
		border-radius: 31upx;
		border: 2upx solid #e33;
	}
</style>
