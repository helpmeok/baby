<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="search">
				<view class="search-box flex">
					<text class="iconfont iconsousuo gray"></text>
					<input type="text" v-model="value" :focus="!value" placeholder="请输入问题" placeholder-class="gray" class="input mgl-20" />
					<text class="iconfont iconshanchu gray" v-show="value" @click="value=''"></text>
				</view>
			</block>
		</cu-custom>
		<view class="pd-box">
			<view class="gray">
				共找到3个相似问题
			</view>
			<view class="list-item flex-r-center" v-for="(el, i) in 3" :key="i">
				<view class="content">
					<view class="question">
						<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
						<view class="font-b blod text">
							孕妈如何撒孕妈如何撒孕妈如何撒孕妈如何撒孕妈如何撒
						</view>
					</view>
					<view class="flex-r-between">
						<view class="gray">
							共有400个内容
						</view>
					</view>
				</view>
				<view class="iconfont iconarrow-right-copy gray blod"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ""
			}
		},
		onLoad(options) {
			this.value=options.text
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #F8F8F8;
		padding: 0 20upx;
		border-radius: 30upx;

		.input {
			color: black;
		}
	}
	.list-item {
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 40upx 30upx;
		box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
		margin-top: 30upx;
		width: 100%;
		.content{
			width: 90%;
			.question {
				margin-bottom: 20upx;
				width: 100%;
				.question-icon {
					width: 40upx !important;
					position: relative;
					top: 15upx;
					left: 0;
					float: left;
				}
			}
		}
		
	}
</style>
