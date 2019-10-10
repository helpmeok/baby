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
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}" v-if="info.attachment.length>0">
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
			<view class="header-custom flex-r-between" :style="{width:ScreenWidth+'px'}" v-else>
				<image src="/static/task/task_details_default@2x.png" mode="aspectFill" class="header-bg-img"></image>
			</view>
			<view class="pd-box desc border-bottom" style="padding-bottom: 60upx;">
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
			<view class="cu-content flex-c-around">
				<image src="/static/task/dailytasks_card_ic_integral2@3x.png" mode="widthFix" class="point-icon"></image>
				<view class="desc">
					<view class="title font-b blod">
						成功领取任务积分
					</view>
					<view class="point font-b">
						<text class="small mgr-10">X</text>
						<text class="blod">{{info.taskPoint}}</text>
					</view>
				</view>
				<view class="btn white bg-default-color" @tap="hideModal">
					好的
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
						uni.setStorageSync('updateTask', taskNo)
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
			width: 440upx;
			border-radius: 20upx;
			background-color: #FFFFFF;

			.point-icon {
				width: 180upx;
				position: relative;
				left: 0;
				top: -90upx;
			}

			.point {
				color: #FF893D;
			}

			.desc {
				position: relative;
				left: 0;
				top: -20upx;
			}

			.title {
				color: #090909;

			}

			.btn {
				width: 344upx;
				height: 72upx;
				line-height: 72upx;
				border-radius: 40upx;
				font-size: 30upx;
				text-align: center;
				margin: 40upx 0;
			}
		}
	}
</style>
