<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">商品详情</block>
		</cu-custom>
		<view class="pd-box content-box">
			<swiper class="swiper" indicator-dots :autoplay="false" circular>
				<swiper-item v-for="(el,i) in info.attachmentList" :key="i">
					<image :src="el.url" mode="aspectFill" class="good-img" @click="previewImage(info.attachmentList,i)"></image>
				</swiper-item>
			</swiper>
			<view class="blod font-b" style="margin-top: 20upx;">
				{{info.productName}}
			</view>
			<view class="point">
				{{info.productPrice}}积分
			</view>
			<view class="line"></view>
			<view class="" style="padding: 20upx 0;">
				<u-parse :content="info.productDetail | imgConversion" @preview="preview" />
			</view>
			<view class="" style="height: 120upx;"></view>
		</view>
		<view class="fixed-bottom fixed-bottom-height bg-default-color white flex-r-center font-b" :class="{'disable':!isEnough}"
		 @click="chooseAddress">
			{{isEnough?'立即兑换':'积分不足'}}
		</view>
	</view>
</template>

<script>
	let id = ""
	import uParse from '@/components/un-parse/u-parse.vue'; //由于插件上传命名问题在目录上加了一个n
	export default {
		components: {
			uParse
		},
		data() {
			return {
				info: {
					productPrice: "",
					productName: "",
					attachmentList: []
				},
				isEnough: false
			}
		},
		onLoad(options) {
			id = options.id
			this.init()
		},
		methods: {
			init() {
				uni.showLoading({
					title: "加载中"
				})
				this.api.task.goods.get_detail({
					productId: id
				}, res => {
					console.log(res)
					this.info = res.data
					if (Number(res.data.productPrice) > Number(JSON.parse(uni.getStorageSync('userInfo')).userPoint)) {
						this.isEnough = false
					} else {
						this.isEnough = true
					}
					uni.hideLoading()
				})
			},
			
			previewImage(list, i) {
				let urls = [];
				urls = list.map(el => {
					return el.url;
				});
				uni.previewImage({
					current: i,
					urls: urls
				});
			},
			chooseAddress() {
				if (this.isEnough) {
					var newObj = Object.assign({}, this.info);
					delete(newObj["productDetail"]);
					console.log(newObj)
					uni.setStorageSync('goodInfo', JSON.stringify(newObj))
					uni.navigateTo({
						url: "/pages/center/address/address-list/address-list?choose=1"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.content-box {
			display: flex;
			flex-direction: column;

			.good-img,
			.swiper {
				width: 100%;
				height: 400upx !important;
			}

			.point {
				color: #FFA904;
				margin-bottom: 30upx;
			}

			.line {
				height: 2upx;
				width: 100%;
				background-color: #f5f5f5;
			}
		}

		.disable {
			background-color: #C8C8C8 !important;
		}
	}
</style>
