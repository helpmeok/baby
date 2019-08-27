<template>
	<view class="">
		<view class="tabs-box flex-r-between">
			<view class="tabs flex">
				<view class="item mgr-60" v-for="(el,i) in tabs" :key="i" @click="clickItem(i)">
					<view class="gray" :class="{'click':tabIndex==i}">
						{{el}}
					</view>
					<view class="flex-r-center click-icon-box">
						<view class="click-icon" v-if="tabIndex==i"></view>
					</view>
				</view>
			</view>
			<view class="icon-box flex-r-center">
				<image src="/static/com_list_ic_screen_nor@3x.png" mode="widthFix" class="icon" @click="show=true"></image>
			</view>
			
		</view>
		<view class="uni-mask" v-show="show" @click="hide">
		</view>
		<view class="content bg-white" :class="{'animation':show}">
			<view class="flex-r-between">
				<view class="title">
					排序
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabs: ['全部', '音频', '视频'],
				show: false
			};
		},
		methods: {
			clickItem(i) {
				console.log('1111')
				this.$emit('changeTabIndex', i)
			},
			hide() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.content {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		border-radius: 30upx 30upx 0 0;
		width: 100%;
		padding-top: 30upx;
		transform: translateY(100%);
		transition: all 0.3s ease-out;
		z-index: 999;
	}

	.content.animation {
		transform: translateY(0%);
	}

	.tabs-box {
		width: 100%;
		height: 100upx;
		border-bottom: 2upx solid #f5f5f5;
		background-color: white;

		.tabs {
			padding-left: 30upx;
			height: 100%;

			.item {
				position: relative;
				height: 100%;

				.gray {
					font-weight: 500;
					font-size: 30upx;
					line-height: 100upx;
				}

				.click {
					font-size: 34upx;
					color: #FC4041;
					font-weight: bold;
				}

				.click-icon-box {
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;

					.click-icon {
						width: 40upx;
						height: 3upx;
						background-color: #FC4041;
					}
				}
			}
		}

		.icon-box {
			height: 100%;

			.icon {
				width: 88upx;
			}
		}
	}
</style>
