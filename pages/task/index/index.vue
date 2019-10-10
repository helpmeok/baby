<template>
	<view class="container">
		<image src="/static/task/dailytasks_top_bg@2x.png" id="welfarBg" mode="widthFix" class="welfar-bg"></image>
		<view class="main" :style="[{height:mainHeight+ 'px',top:mainTop+'px'}]">
			<view class="flex-r-between title-box">
				<view class="title blod">
					每日任务
				</view>
				<view class="flex">
					<view class="flex mgr-30">
						<image src="/static/task/dailytasks_card_ic_integral2@3x.png" mode="widthFix" class="point-icon mgr-10"></image>
						<view class="point blod font-b">
							{{userInfo.userPoint}}
						</view>
					</view>
					<navigator url="/pages/task/store/index/index" class="btn white bg-default-color" hover-class="none">
						兑换
					</navigator>
				</view>
			</view>
			<scroll-view scroll-y class="scroll-view" :style="[{height:scrollHeight+ 'px'}]" @scrolltoupper="scrolltoupper">
				<view class="list-item bg-white flex-r-between" style="padding-right: 0;" v-for="(el,i) in list" :key="i" @click="goDetail(el,i)">
					<image src="/static/task/dailytasks_card_ic_integral2@3x.png" mode="widthFix" class="icon"></image>
					<view class="item-c">
						<view class="task-name align-left">
							{{el.taskName}}
						</view>
						<view class="point">
							任务积分<text class="small mgl-10">x</text>{{el.taskPoint}}
						</view>
					</view>
					<view class="item-r flex-r-between" v-if="!el.completeStatus">
						<text class="task-color">去完成</text>
						<image src="/static/com_list_ic_arrow@3x.png" class="iconarrow-right" mode="widthFix"></image>
					</view>
					<view class="item-r flex-r-between" v-if="el.completeStatus">
						<view class="">
						</view>
						<text class="gray">已完成</text>
					</view>
				</view>
				<view class="" style="height: 50upx;width: 100%;">

				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				task: {
					taskId: "",
					taskRemark: "",
					taskName: "",
					taskPoint: 0,
					taskNo: ""
				},
				taskIndex: 0,
				userInfo: {
					userPoint: 0
				},
				welfarBgHeight: 0,
				mainTop: -55,
				mainHeight: 0,
				scrollHeight: 0
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			this.getUserInfo()
			if (uni.getStorageSync('updateTask')) {
				this.list.forEach((el) => {
					if (el.taskNo == uni.getStorageSync('updateTask')) {
						el.completeStatus = true
						uni.removeStorageSync('updateTask')
					}
				})
			}
		},
		mounted() {},
		computed: {

		},
		methods: {
			init() {
				this.list = []
				this.api.task.get_list(null, res => {
					console.log(res)
					this.list = res.data
				})
				let res = uni.getSystemInfoSync()
				this.mainHeight = res.windowHeight - this.mainTop - Math.ceil(res.windowWidth * 37 / 75)
				this.scrollHeight = res.windowHeight - this.mainTop - Math.ceil(res.windowWidth * 37 / 75) - uni.upx2px(110)
			},
			getUserInfo() {
				this.api.center.user.get_detail(null, res => {
					console.log(res);
					this.userInfo = res.data;
					uni.setStorageSync('userInfo', JSON.stringify(res.data))
				});
			},
			goDetail(el) {
				uni.navigateTo({
					url: '/pages/task/detail/detail?id=' + el.taskId + '&taskNo=' + el.taskNo
				})
			},
			scrolltoupper() {

			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		width: 100%;

		.welfar-bg {
			width: 100%;
		}

		.main {
			width: 90%;
			margin-left: 5%;
			position: relative;
			left: 0;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2upx 20upx 0px rgba(0, 0, 0, 0.3);
			border-radius: 20upx 20upx 0px 0px;
			padding: 0 30upx;

			.title-box {
				height: 108upx;
				border-bottom: 2upx solid #EEEEEE;

				.title {
					color: #090909;
					font-size: 40upx;
				}

				.point-icon {
					width: 40upx;

				}

				.point {
					color: #FFA904;

				}

				.btn {
					width: 100upx;
					height: 48upx;
					text-align: center;
					line-height: 48upx;
					border-radius: 25upx;
					font-size: 26upx;
				}
			}

			.scroll-view {
				overflow: hidden;

				.list-item {
					margin-top: 30upx;

					.icon {
						width: 70upx;
					}


					.item-c {
						width: 55%;

						.task-name {
							font-size: 30upx;
							color: #090909;
							font-weight: 500;
						}

						.point {
							color: #FF893D;
							font-size: 24upx;
						}
					}

					.item-r {
						width: 20%;

						.iconarrow-right {
							width: 15upx;
						}
					}
				}
			}
		}

	}
</style>
