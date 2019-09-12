<template>
	<view>
		<view class="uni-mask" v-show="show" @click="hide">
		</view>
		<view class="content bg-white" :class="{'animation':show}" @click.stop :style="{height:contentHeight+'px'}">
			<image src="/static/home_more_ic_close_nor@3x.png" mode="widthFix" @click="hide" class="close-icon"></image>
			<!-- <text class="iconfont iconguanbi close-icon" @click="hide"></text> -->
			<view class="flex-r-between pd-box">
				<view class="font-b blod title">当前频道</view>
				<view class=" white edit-btn" @click="edit">
					{{isEdit?"完成":"编辑"}}
				</view>
			</view>
			<view class="pd-box present-list">
				<view class="present-list-item" v-for="(el,i) in myChanelList" :key="i">
					<view class="item" v-if="i<2" :class="{'disable':isEdit}" @click="goChanel(el,i)">
						{{el.channelName}}
					</view>
					<view class="item" v-else @click="goChanel(el,i)">
						{{el.channelName}}
						<image src="/static/home_more_ic_clean_nor@3x.png" mode="widthFix" class="del-icon" v-if="isEdit"></image>
					</view>
				</view>
			</view>

			<view class="line-gray"></view>
			<view class="flex-r-between pd-box">
				<view class="font-b blod title">添加频道</view>
			</view>
			<view class="pd-box add-list">
				<view class="add-list-item" v-for="(el,i) in addChanelList" :key="i" @click="addChanel(el,i)">
					<view class="item flex-r-center">
						<image src="/static/home_more_ic_add@3x.png" mode="widthFix" class="add-icon"></image>
						<text class="mgl-10">{{el.channelName}}</text>
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
			},
			myChanelList: {
				type: Array,
				default () {
					return [];
				}
			},
			addChanelList: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				WindowHeight: this.windowHeight,
				CustomBar: this.CustomBar,
				isEdit: false
			};
		},
		computed: {
			contentHeight() {
				let res = uni.getSystemInfoSync()
				return res.windowHeight - this.CustomBar - 10
			},
			channelId() {
				return this.myChanelList.map((el) => {
					return el.channelId
				})
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				this.api.home.get_user_chanel_list(null, res => {
					console.log(res)
				})
			},
			hide() {
				this.saveChanel()
				this.isEdit=false;
				this.$emit('hideChannelOperate');
			},
			edit() {
				this.isEdit = !this.isEdit
				if (!this.isEdit) {
					this.saveChanel()
				}
			},
			saveChanel(){
				this.api.home.save_chanel({
					"channelId[]": this.channelId
				}, res => {
					console.log(res)
				})
			},
			goChanel(el, i) {
				if (this.isEdit) {
					this.$emit('delChanelOperate', el, i);
				}else{
					this.hide();
					this.$emit('changeChanelOperate',i)
				}
			},
			addChanel(el, i) {
				this.$emit('addChanelOperate', el, i);
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

				.item.disable {
					border-color: #E8E8E8;
					color: #A3A3A3;
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

					.add-icon {
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
