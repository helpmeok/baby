<template>
	<view>
		<view class="uni-mask" v-show="show" @click="hide"></view>
		<view class="uni-popup" :class="{ 'uni-popup-show': show,'child-position':type=='child','home-position':type=='home' }" @click.stop :style="{'top':CustomBar+'px'}">
			<view class="triangle-bottomright" v-if="type=='child'"></view>
			<view class="triangle-bottomleft" v-if="type=='home'"></view>
			<view class="main" :class="{'border-child':type=='child','border-home':type=='home'}">
				<view class="item flex-r-between border-bottom  pd-box" v-for="(el,i) in list" :key="i" @click="chooseBaby">
					<view class="baby-font-size baby-black">
						{{el.babyNick}}
					</view>
					<image src="/static/com_dialog_ic_choose@3x.png" mode="widthFix" class="iconfont"></image>
				</view>
				<view class="item flex pd-box" @click="goBabyHandle">
					<view class="baby-font-size baby-black">新增</view>
					<image src="/static/yuer_dialog_ic_add@3x.png" mode="widthFix" class="iconfont mgl-20"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				list: [],
			}
		},
		created() {
		},
		watch: {
			show(val){
				if(val){
					this.init()
				}
			}
		},
		methods: {
			init() {
				this.list = JSON.parse(uni.getStorageSync('myBabyList'))
			},
			hide() {
				this.$emit('hideMyBabyList');
			},
			chooseBaby() {

			},
			goBabyHandle() {
				this.$emit('hideMyBabyList');
				uni.navigateTo({
					url: '/pages/center/manage/index/index'
				})
			}
		},

	};
</script>
<style lang="scss" scoped>
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.child-position{
		right: 250upx;
	}
	.home-position{
		left: 40upx;
	}
	.uni-popup {
		position: absolute;
		z-index: 999;
		transform: scale(0);
		width: 330upx;
		.main {
			background-color: #FFFFFF;
			box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
			clear: both;
		}

		.border-home {
			border-radius: 0 10upx 10upx 10upx;
		}

		.border-child {
			border-radius: 10upx 0 10upx 10upx;
		}

		.triangle-bottomright {
			width: 0;
			height: 0;
			border-bottom: 20upx solid #FFFFFF;
			border-left: 40upx solid transparent;
			float: right;
		}

		.triangle-bottomleft {
			width: 0;
			height: 0;
			border-bottom: 20upx solid #FFFFFF;
			border-right: 40upx solid transparent;
			float: left;
		}

		.item {
			height: 100upx;
			width: 100%;

			.iconfont {
				width: 30upx !important;
			}
		}
	}

	.uni-popup-show {
		transform: scale(1, 1);
		transition: all .3s ease 0s;
	}
</style>
