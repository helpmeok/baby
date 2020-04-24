<template>
	<view class="container">
		<view class="uni-mask" v-show="show" @click="hide"></view>
		<view class="uni-popup" :class="{ 'uni-popup-show': show }" @click.stop :style="{'top':top}">
			<view class="triangle-bottomleft"></view>
			<view class="main pd-box">
				<view class="title blod">
					图标说明
				</view>
				<view class="" v-if="type==0">
					<view class="flex">
						<image src="/static/yuer_list_ic_remind@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">日程提醒</text>
					</view>
				</view>
				<view class="" v-if="type==1">
					<view class="flex">
						<image src="/static/yuer_list_ic_examine@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">孕检</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_feel@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">反应</text>
					</view>
				</view>
				<view class="" v-if="type==2">
					<view class="flex">
						<image src="/static/yuer_list_ic_height@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">身高</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_weight@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">体重</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_milk@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">奶量</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_d3@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">维生素D3</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" @click="showMask">
			<view class="flex" v-if="type==0">
				<image src="/static/yuer_list_pic_reference1_nor@2x.png" mode="widthFix" class="reference-icon"></image>
				<view class="">
					<view class="flex">
						<image src="/static/yuer_list_ic_remind@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">进入排卵日程，赶紧哦～</text>
					</view>
					<view class="">
						<text class="desc-text">预祝您早日怀孕成功！</text>
					</view>
				</view>
			</view>
			<view class="flex" v-if="type==1">
				<image src="/static/yuer_list_pic_reference2_nor@2x.png" mode="widthFix" class="reference-icon"></image>
				<view class="">
					<view class="flex">
						<image src="/static/yuer_list_ic_examine@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">胎心检查、血尿常规</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_feel@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">孕吐、失眠等</text>
					</view>
				</view>
			</view>
			<view class="flex" v-if="type==2">
				<image src="/static/yuer_list_pic_reference3_nor@2x.png" mode="widthFix" class="reference-icon"></image>
				<view class="">
					<view class="flex">
						<image src="/static/yuer_list_ic_height@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">85-90cm</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_milk@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">500ml</text>
					</view>
				</view>
				<view class="mgl-30">
					<view class="flex">
						<image src="/static/yuer_list_ic_weight@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">10-11kg</text>
					</view>
					<view class="flex">
						<image src="/static/yuer_list_ic_d3@3x.png" mode="widthFix" class="icon-s"></image>
						<text class="desc-text">400iu</text>
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
			type: {
				type: Number,
				default: -1
			},
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
			width: 28upx;
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
	}
</style>
