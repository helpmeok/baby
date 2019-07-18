<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
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
				<!-- <view class="action border-custom" v-if="isQa" :style="[{width:Custom.width+'px'}]">
					<text class="cuIcon-back" @tap="BackPage"></text>
					<view class="helper-box flex-r-center white " @tap="goQa">
						
						<view class="iconfont icontousutiwen">
							
						</view>
					</view>
				</view>
				<view class="">
					<text class="iconfont iconjiahao small"></text>
					<text class="small">提问</text>
				</view> -->
				<view class="action border-custom" v-if="isDelete" :style="[{width:Custom.width+'px'}]">
					<text class="cuIcon-back" @tap="BackPage"></text>
					<view class="helper-box flex-r-center" @click="deleteHandle()">
						<view class="iconfont icon- white" style="font-size: 40upx;">
							
						</view>
					</view>
				</view>
				<!-- <image src="/static/com_nav_ic_assistant2_nor@2x.png" mode="widthFix" class="helper" v-if="helper"></image> -->
				<text class="cuIcon-edit" v-if="isEdit" style="font-size: 36upx;" @click="edit"></text>
				<text v-if="!isEdit&&showCancel" @click="edit">取消</text>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view class="task" :style="[{top:StatusBar + 'px'}]">
					<slot name="task"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				Custom: this.Custom
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
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			edit() {
				this.$emit('edit')
			},
			goHelper() {
				uni.reLaunch({
					url: '/pages/helper/index/index',
				})
			},
			deleteHandle(){
				this.$emit('deleteHandle')
			},
			goQa(){
				uni.navigateTo({
					url:"/pages/home/question/commit/commit"
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.helper-box{
		width: 90upx;
		height: 30px;
		.helper{
			width: 45upx;
		}
	}
	
</style>
