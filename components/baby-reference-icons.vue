<template>
	<view class="container">
		<view class="uni-mask" v-show="show" @click="hide"></view>
		<view class="uni-popup" :class="{ 'uni-popup-show': show }" @click.stop :style="{'top':top}">
			<view class="triangle-bottomleft"></view>
			<view class="main pd-box">
				<view class="title blod">
					图标说明
				</view>
				<view class="">
					<view class="flex" v-for="(el,i) in list" :key="i">
						<image v-if="el.paraImg" :src="el.paraImg" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">{{el.paraMsg}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" @click="showMask">
			<view class="flex">
				<image src="/static/yuer_list_pic_reference2_nor@2x.png" mode="widthFix" class="reference-icon"></image>
				<view class="parameter-desc-box">
					<view class="flex item" v-for="(el,i) in list" :key="i">
						<image v-if="el.paraImg" :src="el.paraImg" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">{{el.paraName}}</text>
						<text class="desc-text mgl-10">{{el.paraUnit}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'baby-reference-icons',
		props: {
			list:{
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				show: false,
				CustomBar: this.CustomBar,
			};
		},
		computed: {
			top() {
				return (this.CustomBar + uni.upx2px(130)) + 'px'
			}
		},
		methods: {
			hide() {
				this.show = false
			},
			showMask() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin-bottom: 40upx;

		.uni-mask {
			position: fixed;
			z-index: 998;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.uni-popup {
			position: absolute;
			z-index: 999;
			transform: scale(0);
			width: 280upx;

			.main {
				background-color: #FFFFFF;
				box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
				clear: both;
				border-radius: 0 10upx 10upx 10upx;
				.title{
					font-size: 32upx;
					}
			}
		}

		.uni-popup-show {
			transform: scale(1, 1);
			transition: all .3s ease 0s;
			left: 80upx;
		}

		.reference-icon {
			width: 100upx;
			margin-right: 20upx;
		}

		.icon-s {
			width: 30upx;
			margin-right: 10upx;
		}

		.desc-text {
			color: #A3A3A3;
			font-size: 24upx;
		}

		.triangle-bottomleft {
			width: 0;
			height: 0;
			border-bottom: 20upx solid #FFFFFF;
			border-right: 30upx solid transparent;
			float: left;
		}
		.parameter-desc-box{
			height: 120upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-wrap: wrap;
			.item{
				height: 50upx;
				align-items: center;
				margin-right: 20upx;
			}
		}
	}
</style>
