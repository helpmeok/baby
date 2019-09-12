<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" class="cu-custom" :style="{'opacity':opacity}">
			<block slot="backText"></block>
			<block slot="content">{{info.taskName}}</block>
		</cu-custom>
		<cu-custom :isBack="true" class="cu-custom1" :isMaskBg="isMaskBg">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="container" :style="{height:ScreenHeight+'px',width:ScreenWidth+'px'}">
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" v-if="info.attachmentType==1"
				 :style="{width:ScreenWidth+'px'}">
					<swiper-item>
						<view class="swiper-item" v-for="(el,i) in info.attachment" :key="i">
							<image :src="el.url" mode="aspectFill" class="header-bg-img"></image>
						</view>
					</swiper-item>
				</swiper>
				<video class="video" :style="{width:ScreenWidth+'px'}" id="myVideo" objectFit="fill" :poster="info.attachment[0].thumbnail"
				 :src="info.attachment[0].url" controls v-if="info.attachmentType==2">
				</video>
			</view>
			<view class="pd-box desc border-bottom">
				<view class="title baby-black blod">
					{{info.taskName}}
				</view>
				<view class="content font-b">
					<u-parse :content="info.taskRemark | imgConversion" @preview="preview" />
				</view>
			</view>
			<view class="pd-box flex-r-between">
				<view class="flex-r-center avatar-box">
					<image :src="el" mode="aspectFill" v-for="(el,i) in info.completeAvatarList" :key="i" class="celebrity-avatar"
					 :style="{left:-(i*8)+'px'}"></image>
				</view>
				<view class="gray">
					{{info.completeNum}}人已完成
				</view>
			</view>
			<view class="" style="height: 160upx;width: 100%;"></view>
		</view>
		<view class="fixed-bottom flex-r-center pd-box">
			<view class="btn bg-default-color white baby-font-size flex-r-center" :class="{'complete':info.completeStatus}"
			 @click="showAward">
				完成
			</view>
		</view>
		<view class="cu-modal flex-r-center" :class="{'show':isShowAward}">
			<view class="flex-c-around">
				<view class="cu-award flex-c-around">
					<image src="/static/task/dailytasks_popup_bg@2x.png" mode="widthFix" class="bg-img"></image>
					<view class="text font-b blod" style="position: relative;top: -40upx;">
						成功领取任务积分
					</view>
					<view class="flex-r-center point">
						<image src="/static/center/me_list_ic_integral@3x.png" mode="widthFix" class="icon"></image>
						<text class="mgl-10">X</text>
						<text class="font-b mgl-10">{{info.taskPoint}}</text>
					</view>
				</view>
				<view class="white close flex-r-center" @tap="hideModal">
					<view class="iconfont iconcuowutishilimiandecha ">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	let id = "",
		taskNo = "";
	import uParse from '@/components/un-parse/u-parse.vue'; //由于插件上传命名问题在目录上加了一个n
	export default {
		components: {
			uParse
		},
		data() {
			return {
				list: [],
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				ScreenWidth: this.screenWidth,
				opacity: 0,
				CustomBar: this.CustomBar,
				isMaskBg: true,
				isShowAward: false,
				info: {}
			}
		},
		onLoad(options) {
			id = options.id
			taskNo = options.taskNo
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		methods: {
			init() {
				this.api.task.get_detail_byId({
					taskId: id
				}, res => {
					console.log(res)
					this.info = res.data
					uni.hideLoading()
				})
			},
			showAward() {
				if (!this.info.completeStatus) {
					this.api.task.get_award({
						taskNo
					}, res => {
						console.log(res)
						this.isShowAward = true
						uni.setStorageSync('updateTask', true)
						this.init();
					})
				}
			},
			hideModal() {
				this.isShowAward = false
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

		.header-custom {
			height: 415upx !important;

			.header-bg-img,
			.video {
				position: absolute;
				z-index: 1;
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

		.avatar-box {
			position: relative;
			left: 0;
			top: 0;

			.celebrity-avatar {
				width: 64upx;
				height: 64upx;
				border-radius: 50%;
				position: relative;
				top: 0;
				border: 4upx solid #FFFFFF;
			}
		}
	}

	.fixed-bottom {
		padding-bottom: 40upx;
		background-color: #FFFFFF;

		.btn.complete {
			background-color: #C8C8C8 !important;
		}

		.btn {
			width: 100%;
			border-radius: 40upx;
			height: 80upx;
		}
	}

	.cu-modal {
		.cu-content {
			width: 80%;
			display: flex;
			flex-direction: column;
			border-radius: 10upx;
			overflow: hidden;

			.btn {
				width: 100%;
			}
		}

		.cu-award {
			width: 450upx !important;
			height: 450upx !important;
			position: relative;
			left: 0;
			top: 0;
			box-sizing: border-box;

			.bg-img {
				width: 450upx !important;
				height: 450upx !important;
				position: absolute;
				left: 0;
				top: 0;
			}

			.text {
				position: relative;
				z-index: 2;
				color: #FFC438;
			}

			.point {
				position: relative;
				z-index: 2;
				color: #FFC438;

				.icon {
					width: 50upx;
				}
			}
		}

		.close {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			border: 4upx solid white;
			margin-top: 50upx;
		}
	}
</style>
