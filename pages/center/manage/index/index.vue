<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">宝宝管理</block>
		</cu-custom>
		<view class="tab-bar flex-r-between" :style="[{top:CustomBar + 'px'}]">
			<view class="tabs flex">
				<view class="gray item" style="margin-right: 60upx;" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }"
				 @click="changeTab(index)">
					<view :class="{'bottom-line':item.active}"></view>
					<view class="name" :class="{ active: item.active }">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<swiper class="swiper-box" :current="tabIndex" :duration="300" @change="changeSwiper">
			<swiper-item v-for="(el, i) in tabs" :key="i">
				<view class="swiper-box">
					<empty v-if="tabs[i].data.length == 0 && isLoad" url="/static/com_ic_nobaby@2x.png" :msg="i==0?'添加宝宝信息后,获得更适合您的内容哦~':'添加孕期信息后,获得更适合您的内容哦~'"></empty>
					<view class="list-box" v-if="i==0">
						<view class="list-cell flex-r-between pd-box" v-for="(item, index1) in tabs[i].data" :key="index1" @click="goBabyHandle(item)">
							<view class="list-cell-left blod">
								{{item.name}}
							</view>
							<view class="list-cell-right flex">
								<view class="">{{item.months}}</view>
								<view class="iconfont iconarrow-right-copy blod gray mgl-10"></view>
							</view>
						</view>
					</view>
					<view class="list-box" v-if="i==1">
						<view class="list-cell flex-r-between pd-box" v-for="(item, index2) in tabs[i].data" :key="index2" @click="goPregnancyHandle(item)">
							<view class="list-cell-left blod">
								{{item.birthday?"我的预产期":"我正在备孕中"}}
							</view>
							<view class="list-cell-right flex">
							<view class="">{{item.birthday}}</view>
								<view class="iconfont iconarrow-right-copy blod gray mgl-10"></view>
							</view>
						</view>
					</view>
					<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</swiper-item>
		</swiper>
		<view class="fixed-bottom fixed-bottom-height bg-default-color white font-b flex-r-center" @click="goAdd()">
			{{linkText}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						name: "我的宝宝",
						active: true,
						data: []
					},
					{
						name: "我的孕期",
						active: false,
						data: []
					},
				],
				isLoad: false,
				tabIndex: 0,
				CustomBar: this.CustomBar,
			}
		},
		onLoad() {},
		onShow() {
			this.init()
		},
		computed: {
			linkText() {
				return this.tabIndex == 0 ? "新建宝宝" : "新建孕期"
			}
		},
		methods: {
			init() {
				if (!this.tabs[this.tabIndex].data.length) {
					this.isLoad = false
					uni.showLoading({
						title: '加载中'
					});
					console.log('加载中')
				}
				if (this.tabIndex == 0) {
					this.api.center.manage.baby.get_list({
						state: 1
					}, res => {
						console.log(res)
						this.tabs[this.tabIndex].data = res.data
						this.isLoad = true
						uni.hideLoading()
					})
				} else {
					this.api.center.manage.baby.get_list({
						state: 0
					}, res => {
						console.log(res)
						this.tabs[this.tabIndex].data = res.data
						this.isLoad = true
						uni.hideLoading()
					})
				}

			},
			async changeTab(index) {
				this.tabs.forEach(item => {
					item.active = false;
				});
				this.tabIndex = index;
				this.tabs[index].active = true;
			},
			changeSwiper(e) {
				this.changeTab(e.target.current);
				this.init()
			},
			goAdd() {
				if (this.tabIndex == 0) {
					uni.navigateTo({
						url: "../baby/handle/handle"
					})
				} else {
					if (this.tabs[this.tabIndex].data.length) {
						uni.showToast({
							title: "只能有一个预产期",
							icon: "none"
						})
					} else {
						uni.navigateTo({
							url: "../pregnancy/handle/handle"
						})
					}
				}
			},
			goBabyHandle(el) {
				uni.navigateTo({
					url: "../baby/handle/handle?id=" + el.babyInfoId
				})
			},
			goPregnancyHandle(el){
				uni.navigateTo({
					url: "../pregnancy/handle/handle?id=" + el.babyInfoId
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.tab-bar {
		// border-bottom: 2upx solid #f1f1f1;
		padding-left: 30upx;
		position: fixed;
		left: 0;
		z-index: 2;
		background-color: #ffffff;
		height: 100upx;
		width: 100%;
		.tabs {
			width: 100%;

			.item {
				position: relative;
				left: 0;
				top: 0;
				z-index: 2;

				.name {
					position: relative;
					left: 0;
					top: 0;
					z-index: 2;
					font-size: 34upx;
				}

				.active {
					font-size: 46upx !important;

				}

				.bottom-line {
					position: absolute;
					left: 0;
					bottom: 10upx;
					z-index: 1;
					width: 100%;
					height: 20upx;
					border-radius: 10upx;
					background-color: yellow;
				}
			}
		}

		.active {
			font-weight: bold;
			color: black;
			border: none;
		}
	}

	.swiper-box {
		width: 100%;
		height: calc(100% - 320upx) !important;
		position: relative;
		top: 60upx;
	}

	

	.list-box {
		background-color: white;
		padding-left: 20upx;
		margin-top: 20upx;

		.list-cell {
			background-color: #FFFFFF;
			border-bottom: 2upx solid #F5F5F5;
		}
	}
</style>
