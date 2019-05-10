<template>
	<view>
		<empty v-if="list.length==0" msg="您还没有收藏的文章~"></empty>
		<view class="container">
			<view class="list-item flex-r-between" v-for="(item,index) in list" :key="index">
				<view class="flex">
					<image src="../../../static/me_list_photo@2x.png" mode="widthFix" style="width: 100upx;height: 100upx;border-radius: 50%;margin-right: 20upx;"></image>
					<view class="">
						<view class="font-b">小丸子妈咪</view>
						<view class="gray">
							<text style="margin-right: 20upx;">41篇原创</text>
							<text>200万粉丝</text>
						</view>
					</view>
				</view>
				<uni-tag text="取消屏蔽" type="error" :circle="true" @click="cancel"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				list: []
			}
		},
		methods: {
			cancel() {

			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-left: 30upx;
		.list-item {
			border-bottom: 2upx solid #f5f5f5;
			padding: 20upx 20upx 20upx 0;
		}
	}
</style>
