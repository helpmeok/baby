<template>
	<view>
		<view class="pd-box rich-box" :style="{'height':richTextHeight+'px'}">
			<rich-text :nodes="content | imgConversion" id="rich"></rich-text>
			<view class="fuzzy-box" v-if="isShowMore">
			</view>
		</view>
		<view class="fake-box">
			<rich-text :nodes="content | imgConversion" id="fake-rich"></rich-text>
		</view>
		<view class="pd-box" v-if="isShowMore" @click="showAll">
			<view class="read-all red flex-r-center">
				<text>阅读全文</text>
				<text class="iconfont iconxiangxia mgl-10 red"></text>
			</view>
		</view>
	</view>
</template>

<script>
	let id = ""
	let timer;
	let heightArr=[]
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
			setTimeout(() => {
				this.richTextHeight = Math.max.apply(null,heightArr)
				clearInterval(timer)
			}, 5000)
		},
		async onReady() {
			timer = setInterval(async () => {
				var size = await this.getElSize('fake-rich')
				heightArr.push(size.height)
				console.log(Math.max.apply(null,heightArr))
				if (Math.max.apply(null,heightArr) >= this.screenHeight * 2) {
					this.richTextHeight = this.screenHeight * 2
					this.isShowMore = true
				} else {
					this.richTextHeight = Math.max.apply(null,heightArr) 
					this.isShowMore = false
				}
			}, 100)
		},
		onUnload() {
			clearInterval(timer)
		},
		methods: {
			init() {
				this.api.home.article.get_detail({
					article_id: id,
					request_type: "app"
				}, res => {
					console.log(res.data)
					this.content = res.data.content
					
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
				clearInterval(timer)
				this.richTextHeight = Math.max.apply(null,heightArr) 
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
	.fake-box{
		height: 0 !important;
		overflow: hidden;
	}
</style>
