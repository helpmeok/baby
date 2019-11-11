<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">生成海报</block>
		</cu-custom>
		<view class="flex-r-center pd-box">
			<image :src="src" mode="widthFix" class="share-pic"></image>
		</view>
		<view class="placeholder-box"></view>
		<view class="fixed-bottom flex-c-center pd-box" @click="savePic">
			<image src="/static/poster_bottom_ic_download_nor@2x.png" mode="widthFix"></image>
			<view class="gray">
				存相册
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ""
			};
		},
		onLoad() {
			this.src = uni.getStorageSync('share_pic');
		},
		methods: {
			savePic() {
				uni.showLoading({
					title: "下载图片中"
				})
				uni.downloadFile({
					url: this.src, 
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success() {
									uni.hideLoading()
									uni.showToast({
										title:"保存图片成功"
									})
								},
								fail(err) {
									uni.hideLoading()
									uni.showToast({
										title:"保存图片失败",
										icon:"none"
									})
								}
							});
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: "下载图片失败",
							icon: "none"
						})
					}
				});
				
			}
		}
	}
</script>

<style lang="scss">
	.share-pic {
		width: 100%;
		background: linear-gradient(150deg, rgba(255, 135, 55, 1) 0%, rgba(254, 72, 48, 1) 100%);
		box-shadow: 0px 10upx 60upx 0px rgba(255, 84, 57, 0.5);
		border-radius: 20upx;
	}

	.placeholder-box {
		height: 160upx;
	}

	.fixed-bottom {
		background-color: #FFFFFF;
		font-size: 24upx;
	}

	.fixed-bottom image {
		width: 60upx;
	}
</style>
