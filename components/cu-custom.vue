<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<image src="/static/details_pic_masking@3x.png" v-if="isMaskBg" mode="aspectFill" class="cu-custom-bg" :style="[{height:CustomBar + 'px',top:StatusBar + 'px'}]"></image>
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="action border-custom" v-if="isCustom" :style="[{width:Custom.width+'px'}]">
					<text class="cuIcon-back" @tap="BackPage"></text>
					<view class="helper-box flex-r-center" @tap="goHelper">
						<image src="/static/com_nav_ic_assistant2_nor@2x.png" mode="widthFix" class="helper" v-if="helper"></image>
					</view>
				</view>
				<view class="action border-custom" v-if="isDelete" :style="[{width:Custom.width+'px'}]">
					<text class="cuIcon-back" @tap="BackPage"></text>
					<view class="helper-box flex-r-center" @click="deleteHandle()">
						<view class="iconfont icon- white" style="font-size: 40upx;">

						</view>
					</view>
				</view>
				<view class="action border-custom" v-if="showCancel" :style="[{width:Custom.width+'px'}]">
					<text class="cuIcon-back" @tap="BackPage"></text>
					<view class="helper-box flex-r-center">
						<text class="cuIcon-edit" v-if="isEdit" style="font-size: 36upx;" @click="edit"></text>
						<text v-if="!isEdit&&showCancel" @click="edit" style="font-size: 26upx;">取消</text>
					</view>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view class="" v-if="searchCelebrity">
					<image src="/static/com_nav_ic_search_nor@3x.png" mode="widthFix" @click="goSearchCelebrity" class="search-icon"
					 :style="[{top:(StatusBar+10) + 'px'}]"></image>
				</view>
				<view class="task" :style="[{top:StatusBar + 'px'}]">
					<slot name="task"></slot>
				</view>
				<view class="search" :style="[{top:StatusBar + 'px'}]">
					<slot name="search"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
		<helper-pop :isHelpShow="isHelpShow" v-on:helpHide="helpHide"></helper-pop>
	</view>
</template>

<script>
	import helperPop from '@/components/helper-pop/helper-pop.vue';
	export default {
		components: {
			helperPop
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				isHelpShow: false
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			isEdit: {
				type: [Boolean, String],
				default: false
			},
			helper: {
				type: [Boolean, String],
				default: false
			},
			showCancel: {
				type: [Boolean, String],
				default: false
			},
			isCustom: {
				type: [Boolean, String],
				default: false
			},
			isDelete: {
				type: [Boolean, String],
				default: false
			},
			isQa: {
				type: [Boolean, String],
				default: false
			},
			searchCelebrity: {
				type: [Boolean, String],
				default: false
			},
			isMaskBg: {
				type: [Boolean, String],
				default: false
			},
			hotId: {
				type: String,
				default: ''
			}
		},
		methods: {
			helpHide() {
				this.isHelpShow = false
			},
			BackPage() {
				this.$emit('closeAudio')
				uni.navigateBack({
					delta: 1
				});
			},
			edit() {
				this.$emit('edit')
			},
			goHelper() {
				// uni.reLaunch({
				// 	url: '/pages/helper/index/index',
				// })
				this.isHelpShow = true
			},
			deleteHandle() {
				this.$emit('deleteHandle')
			},
			goQa() {
				uni.navigateTo({
					url: "/pages/home/question/commit/commit"
				})
			},
			goSearchCelebrity() {
				uni.navigateTo({
					url: '/pages/home/celebrity/detail/search/search?id=' + this.hotId
				})
			}
		}
	}
</script>

<style lang="scss">
	.helper-box {
		width: 90upx;
		height: 30px;

		.helper {
			width: 45upx;
		}
	}

	.content {
		// width: 200upx !important;
	}

	.search-icon {
		width: 40upx;
		position: absolute;
		right: 210upx;
	}

	.cu-custom-bg {
		position: fixed;
		left: 0;
		width: 100%;
		z-index: 9998;
	}
</style>
