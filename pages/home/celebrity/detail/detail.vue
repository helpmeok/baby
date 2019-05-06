<template>
	<view>
		<view class="header-detail flex">
			<view class="flex-r-center" style="width: 30%;">
				<image :src="info.avatar" mode="widthFix" class="portrait"></image>
			</view>
			<view class="" style="width: 70%;">
				<view class="flex-r-between" style="padding: 0 20upx;">
					<view class="flex-c-center">
						<text>{{info.originalNum}}</text>
						<text class="gray">原创</text>
					</view>
					<view class="flex-c-center">
						<text>{{info.fansNum}}</text>
						<text class="gray">粉丝</text>
					</view>
					<view class="flex-c-center">
						<text>{{info.forwardNum}}</text>
						<text class="gray">转发</text>
					</view>
					<view class="flex-c-center">
						<text>0</text>
						<text class="gray">点击</text>
					</view>
				</view>
				<view class="flex-r-between" style="margin-top: 20upx;">
					<view class="attention-btn flex-r-center">关注</view>
					<view class="recommend-btn flex-r-center gray" @click="showRecommend">
						<text style="margin-right: 5upx;">相关推荐</text>
						<text class="iconfont iconxiangxia gray" v-if="!isShowRecommend"></text>
						<text class="iconfont iconxiangshang gray" v-else></text>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="recommend-scroll" :class="{ 'show-recommend-scroll': isShowRecommend }" scroll-x="true">
			<view class="recommend-box" :style="{ width: recommendBoxWidth }">
				<view class="flex-c-center list-item" v-for="(item, index) in recommendList" :key="index">
					<image src="../../../../static/me_list_photo@2x.png" mode="widthFix" class="portrait"></image>
					<text class="font-b blod">宝宝贝</text>
					<text class="gray">标签</text>
					<view class="white">关注</view>
				</view>
			</view>
		</scroll-view>
		<view class="approve flex">
			<text class="iconfont iconiconset0421 gray" style="width: 8%;"></text>
			<view class="" style="width: 92%;">认证：代理费就快了按实际的反馈了爵士岛咖啡阿萨德六块腹肌盛大开放假的六块腹肌</view>
		</view>
		<view class="desc flex">
			<text class="iconfont icongongsijianjie gray" style="width: 8%;"></text>
			<view class="" style="width: 92%;">简介：代理费就快了按实际的反馈了爵士岛咖啡阿萨德六块腹肌盛大开放假的六块腹肌</view>
		</view>
		<view class="" style="height: 20upx;background-color: #F5F5F5;"></view>
		<glanceSlideNavTabBar fontsize="14px" topfixedval="0" :topfixed="true" @clickitem="clickitem" :tabIndex="tabIndex"
		 :data="[
				{ textcontent: '最新发布' },
				{ textcontent: '转发最多' },
				{ textcontent: '评论最多' },
				{ textcontent: '点赞最高' }
			]"></glanceSlideNavTabBar>
		<swiper :duration="500" style="height: 3000upx;" @change="changeSwiper" :current="tabIndex">
			<swiper-item>
				<view class="swiper-item">1</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">2</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">3</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">4</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import glanceSlideNavTabBar from '@/components/glance-SlideNavTabBar.vue';
	let id = ""
	export default {
		components: {
			glanceSlideNavTabBar
		},
		data() {
			return {
				isShowRecommend: false,
				recommendList: [1, 2, 3, 4, 5, 6],
				tabIndex: 0,
				info: {}
			};
		},
		computed: {
			recommendBoxWidth() {
				return uni.upx2px(this.recommendList.length * 270) + 'px';
			}
		},
		onLoad(options) {
			id = options.id
			this.init()
		},
		methods: {
			init() {
				this.api.home.hotVip.get_info({
					vid: id
				}, res => {
					console.log(res)
					this.info = res.data
					uni.setNavigationBarTitle({
						title: res.data.name
					});
				})
			},
			showRecommend() {
				this.isShowRecommend = !this.isShowRecommend;
			},
			clickitem(index, val) {
				this.tabIndex = index
			},
			changeSwiper(e) {
				this.tabIndex = e.target.current
			}
		}
	};
</script>

<style lang="less">
	.header-detail {
		width: 100%;
		height: 200upx;
		padding: 0 30upx 0 0;
		box-sizing: border-box;

		.portrait {
			width: 150upx !important;
			height: 150upx !important;
			border-radius: 50%;
		}

		.attention-btn {
			background-color: #e33;
			height: 50upx;
			width: 280upx;
			border-radius: 25upx;
			color: white;
		}

		.recommend-btn {
			border: 2upx solid #cccccc;
			height: 46upx;
			width: 180upx;
			border-radius: 25upx;
		}
	}

	.approve,
	.desc {
		align-items: flex-start;
		padding: 10upx 20upx;
	}

	.recommend-scroll {
		background-color: #f5f5f5;
		box-sizing: border-box;
		height: 0upx;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		transition: height 0.5s;
		padding: 0 20upx;

		.recommend-box {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;

			.list-item {
				background-color: #ffffff;
				height: 350upx;
				width: 250upx;
				margin-right: 20upx;

				.portrait {
					width: 100upx !important;
					height: 100upx !important;
					border-radius: 50%;
				}
			}
		}
	}

	.show-recommend-scroll,
	.recommend-box {
		height: 400upx;
		transition: height 0.5s;
	}
</style>
