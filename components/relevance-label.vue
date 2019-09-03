<template>
	<view>
		<view class="content bg-white" :class="{'animation':show}" @click.stop :style="{height:contentHeight+'px'}">
			<scroll-view scroll-y class="scroll-view pd-box">
				<view class="title blod">
					请选择你感兴趣的话题
				</view>
				<view class="gray">
					至少选择一个
				</view>
				<view class="add-list" style="padding-top: 40upx;">
					<view class="add-list-item" v-for="(el,i) in list" :key="i">
						<view class="item flex-r-center" @click="choose(el,i)" :class="{active:el.active}">
							<image class="mgr-10 add-icon" src="/static/home_more_ic_add@3x.png" mode="widthFix" v-if="!el.active"></image>
							<text>{{el.name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="bottom-btn-box">
				<view class="btn white flex-r-center" @click="goHome">
					开启我的宝宝贝
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'relevance-label',
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			contentHeight() {
				return this.windowHeight - this.CustomBar
			}
		},
		data() {
			return {
				WindowHeight: this.windowHeight,
				CustomBar: this.CustomBar,
				list: [],
				chooseList: []
			};
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				uni.showLoading({
					title: "加载中"
				})
				this.api.home.get_tag_list(null, res => {
					this.list = res.data.slice(0, 20)
					this.list.map((el) => {
						el.active = false;
						return el
					})
					console.log(this.list)
					uni.hideLoading()
				})
			},
			choose(el, i) {
				this.list[i].active = !this.list[i].active
				console.log(this.list[i].active)
				if (this.list[i].active) {
					this.chooseList.push(this.list[i].tagId)
				} else {
					this.chooseList.splice(this.chooseList.indexOf(this.list[i].tagId), 1)
				}
				console.log(this.chooseList)
				this.$forceUpdate()
			},
			goHome() {
				if (this.chooseList.length) {
					this.$emit('routePush')
				} else {
					uni.showToast({
						title: "请至少选择一个感兴趣的话题",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		left: 0;
		bottom: 0;
		border-radius: 30upx 30upx 0 0;
		width: 100%;
		transform: translateY(100%);
		transition: all 0.3s ease-out;
		z-index: 999;

		.scroll-view {
			height: calc(100% - 160upx);
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
					text-align: center;
					line-height: 64upx;
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

				.item.active {
					background-color: #FC4041;
					color: #FFFFFF;
					border-color: #FC4041;
				}
			}

			.add-list-item:nth-of-type(3n) {
				justify-content: flex-end;
			}

			.add-list-item:nth-of-type(3n-2) {
				justify-content: flex-start;
			}

		}

		.title {
			color: #090909;
			font-size: 48upx;
		}

		.bottom-btn-box {
			height: 160upx;
			padding: 20upx 30upx;

			.btn {
				background-color: #FC4041;
				height: 80upx;
				width: 100%;
				border-radius: 40upx;
				font-size: 30upx;
			}
		}
	}

	.content.animation {
		transform: translateY(0%);
	}
</style>
