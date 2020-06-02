<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" class="cu-custom" :style="{'opacity':opacity}">
			<block slot="backText"></block>
			<block slot="content">{{info.title}}</block>
		</cu-custom>
		<cu-custom :isBack="true" class="cu-custom1" :isMaskBg="isMaskBg">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="container" :style="{height:ScreenHeight+'px',width:ScreenWidth+'px'}">
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :style="{width:ScreenWidth+'px'}" v-if="info.attachment.length">
					<swiper-item>
						<view class="swiper-item" v-for="(el,i) in info.attachment" :key="i">
							<image :src="el.url" mode="aspectFill" class="header-bg-img"></image>
						</view>
					</swiper-item>
				</swiper>
				<image src="https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_detail_top_placeholderimage@3x.png" mode="aspectFill" class="header-bg-img" v-else></image>
			</view>
			<view class="pd-box desc">
				<view class="flex-r-between">
					<view class="title baby-black blod">
						{{info.title}}
					</view>
					<view class="baby-gray baby-font-size">
						适龄：{{info.groupExplain}}
					</view>
				</view>
				<view class="content font-b">
					<u-parse :content="info.guideContent | imgConversion" @preview="preview" />
				</view>
			</view>
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
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				ScreenWidth: this.screenWidth,
				opacity: 0,
				CustomBar: this.CustomBar,
				isMaskBg: true,
				info: {
					title: "",
					guideContent: "",
					groupExplain: "",
					attachment: [],
					description: ""
				}
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: '宝宝成长指南',
				path: '/pages/child/index/index?guideId=' + id,
				imageUrl: '/static/share_logo@3x.png'
			};
		},
		onLoad(options) {
			id = options.id
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		methods: {
			init() {
				this.api.child.get_guide_detail_byId({
					id
				}, res => {
					console.log(res)
					res.data.attachment = res.data.urls?res.data.urls.split(','):[];
					this.info = res.data;
					uni.hideLoading()
				})
			},
			preview() {

			}
		},
		onPageScroll(e) {
			this.opacity = Number(e.scrollTop / uni.upx2px(415)) >= 1 ? 1 : Number(e.scrollTop / uni.upx2px(415));
			this.isMaskBg = this.opacity > 0.5 ? false : true
		}
	}
</script>

<style lang="scss">
	.cu-custom {
		position: fixed;
		left: 0;
		z-index: 999;

	}

	.cu-custom1 {
		position: fixed;
		left: 0;
		z-index: 9999;

	}

	.container {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;

		swiper {
			height: 415upx !important;
		}

		.header-custom {
			height: 415upx !important;

			.header-bg-img,
			.video {
				position: absolute;
				z-index: 1;
				width: 100%;
				height: 415upx !important;
			}
		}

		.desc {
			.title {
				font-size: 44upx;
				margin: 20upx 0;
			}

			.content {
				color: #404040;
			}

		}


	}
</style>
