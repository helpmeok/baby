<template>
	<view class="container">
		<cu-custom>
			<block slot="task" style="color: white;">
				<view class="flex-r-between pd-box" style="position: relative;z-index: 999;">
					<view class="font-b blod">今日任务</view>
					<view class="white flex">
						<view class="">当前拥有：</view>
						<image src="/static/center/me_list_ic_integral@3x.png" mode="widthFix" style="width: 40upx;"></image>
						<view class="font-b mgl-10">
							160
						</view>
					</view>
					<view class="" style="opacity: 0;">今日任务吗</view>
				</view>
			</block>
		</cu-custom>
		<image src="/static/task/dailytasks_bg_picture@3x.png" mode="widthFix" class="welfar-bg"></image>
		<scroll-view scroll-y class="scroll-view" :style="[{height:scrollHeight+ 'px'}]">
			<view class="list-item bg-white flex-r-between pd-box" v-for="(el,i) in list" :key="i">
				<view class="item-l">
					<image src="/static/center/me_list_ic_integral@3x.png" mode="widthFix" class="icon"></image>
					<view class="point">
						<text>X</text>
						<text class="font-b">{{el.taskPoint}}</text>
					</view>
				</view>
				<view class="item-c">
					<view class="task-name">
						{{el.taskName}}
					</view>
				</view>
				<view class="item-r">
					<view class="btn white" @click="showModel()">
						好的
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal flex-r-center align-left" :class="{'show':isShowModel}" @tap="hideModal">
			<view class="cu-content bg-white " @tap.stop="">
				<view class="font-b blod pd-box">
					阅读一篇文章
				</view>
				<view class="gray pd-box">
					阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德
				</view>
				<view class="btn font-b bg-default-color white flex-c-center pd-box" @click="showAward()">
					我已完成
				</view>
			</view>
		</view>
		<view class="cu-modal flex-r-center" :class="{'show':isShowAward}" >
			<view class="flex-c-around">
				<view class="cu-award flex-c-around">
					<image src="/static/task/dailytasks_popup_bg@2x.png" mode="widthFix" class="bg-img"></image>
					<view class="text font-b blod">
						恭喜您获得
					</view>
					<view class="flex-r-center point">
						<image src="/static/center/me_list_ic_integral@3x.png" mode="widthFix" class="icon"></image>
						<text class="mgl-10">X</text>
						<text class="font-b mgl-10">20</text>
					</view>
				</view>
				<view class="white close flex-r-center" @tap="hideModal">
					<view class="iconfont iconcuowutishilimiandecha ">
					</view>
				</view>
			</view>
			
		</view>
		<view class="flex-r-center bottom-box">
			<navigator url="/pages/task/store/index/index" class="white bg-default-color white btn flex-r-center font-b"
			 hover-class="none">
				去兑换
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: this.windowHeight - 80 - this.CustomBar,
				list: [],
				isShowModel: false,
				isShowAward:false
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.api.task.get_list(null, res => {
					console.log(res)
					this.list = res.data
				})
			},
			showModel() {
				this.isShowModel = true
			},
			showAward(){
				this.isShowModel = false
				this.isShowAward = true
			},
			hideModal() {
				this.isShowModel = false
				this.isShowAward = false
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100%;
		background-color: #FFF2EF;
		width: 100%;
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
		.close{
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			border: 4upx solid white;
			margin-top: 50upx;
		}
	}

	.welfar-bg {
		width: 100% !important;
		position: fixed;
		left: 0;
		top: 0;
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80px;

		.btn {
			height: 40px;
			width: 60%;
			border-radius: 20px;
		}
	}

	.scroll-view {
		padding-top: 50upx;
	}

	.list-item {
		width: 90%;
		margin-left: 5%;
		margin-bottom: 50upx;
		border-radius: 20upx;
		height: 150upx;

		.item-l {
			position: relative;

			.icon {
				width: 80upx;
			}

			.point {
				color: #FF893D;
				position: absolute;
				bottom: -10upx;
				right: -10upx;
			}
		}

		.item-c {
			.task-name {
				font-size: 32upx;
			}
		}

		.item-r {
			.btn {
				background-color: #FFA904;
				padding: 10upx 30upx;
				border-radius: 40upx;
			}
		}
	}
</style>
