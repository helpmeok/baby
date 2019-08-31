<template>
	<view>
		<view class="uni-mask" v-show="show" @click="hide">
		</view>
		<view class="content bg-white" :class="{'animation':show}"   @click.stop :style="{height:contentHeight+'px'}">
			<image src="/static/home_more_ic_close_nor@3x.png" mode="widthFix" @click="hide" class="close-icon"></image>
			<!-- <text class="iconfont iconguanbi close-icon" @click="hide"></text> -->
			<view class="flex-r-between pd-box">
				<view class="font-b blod title">当前频道</view>
				<view class=" white edit-btn" @click="edit">
					{{isEdit?"完成":"编辑"}}
				</view>
			</view>
			<view class="pd-box present-list">
				<view class="present-list-item" v-for="(el,i) in presentList" :key="i">
					<view class="item">
						{{el}}
						<image src="/static/home_more_ic_clean_nor@3x.png" mode="widthFix" @click="deleted(el,i)" class="del-icon" v-if="isEdit"></image>
					</view>
				</view>
			</view>
		
			<view class="line-gray"></view>
			<view class="flex-r-between pd-box">
				<view class="font-b blod title">添加频道</view>
			</view>
			<view class="pd-box add-list">
				<view class="add-list-item" v-for="(el,i) in presentList" :key="i">
					<view class="item flex-r-center">
						<image src="/static/home_more_ic_add@3x.png" mode="widthFix" class="add-icon"></image>
						<text class="mgl-10">{{el}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'channel-operate',
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				WindowHeight: this.windowHeight,
				CustomBar: this.CustomBar,
				presentList: ['阿萨德', 'asdsad', '奥术师多', '撒打算', 'sad'],
				isEdit: false
			};
		},
		computed: {
			contentHeight() {
				let res= uni.getSystemInfoSync()
				return res.windowHeight - this.CustomBar - 10
			}
		},
		methods: {
			hide() {
				this.$emit('hideChannelOperate');
			},
			edit() {
				this.isEdit = !this.isEdit
			},
			deleted(el, i) {
				this.presentList.splice(i, 1)
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

	.line-gray {
		width: calc(100% - 30upx);
		height: 2upx;
		background-color: #EEEEEE;
		margin: 10upx 0;
		margin-left: 30upx;
	}

	.content {
		box-sizing: border-box;
		.close-icon {
			margin-left: 30upx;
			width: 32upx;
		}

		position: absolute;
		left: 0;
		bottom: 0;
		border-radius: 30upx 30upx 0 0;
		width: 100%;
		padding-top:30upx;
		transform: translateY(100%);
		transition: all 0.3s ease-out;
		z-index: 999;
		.edit-btn {
			width: 110upx;
			height: 60upx;
			text-align: center;
			line-height: 60upx;
			border-radius: 30upx;
			background-color: #FC4041;
		}

		.present-list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;

			.present-list-item {
				width: 33.3333%;
				height: 64upx;
				display: flex;
				justify-content: center;
				margin-bottom: 20upx;

				.item {
					border: 2upx solid #E8E8E8;
					border-radius: 35upx;
					width: 210upx;
					text-align: center;
					line-height: 64upx;
					height: 100%;
					margin-bottom: 20upx;
					color: #404040;
					position: relative;
					left: 0;
					top: 0;

					.del-icon {
						position: absolute;
						width: 32upx;
						height: 32upx;
						right: -10upx;
						top: -10upx;
					}
				}
			}

			.present-list-item:nth-of-type(3n) {
				justify-content: flex-end;
			}

			.present-list-item:nth-of-type(3n-2) {
				justify-content: flex-start;
			}

		}

		.title {
			color: #090909;
		}
		.add-list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
		
			.add-list-item {
				width: 33.3333%;
				height: 64upx;
				display: flex;
				justify-content: center;
				margin-bottom: 20upx;
		
				.item {
					border: 2upx solid #E8E8E8;
					border-radius: 35upx;
					width: 210upx;
					height: 100%;
					margin-bottom: 20upx;
					color: #404040;
					position: relative;
					left: 0;
					top: 0;
					.add-icon{
						width: 20upx;
						height: 20upx;
					}
				}
			}
		
			.add-list-item:nth-of-type(3n) {
				justify-content: flex-end;
			}
		
			.add-list-item:nth-of-type(3n-2) {
				justify-content: flex-start;
			}
		
		}
	}
	.content.animation {
		transform: translateY(0%);
	}
</style>
