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
					<empty v-if="tabs[i].data.length == 0 && isLoad" url="/static/com_ic_nobaby@2x.png" msg="添加宝宝信息后,获得更适合您的内容哦~"></empty>
					<view class="list-item" v-for="(item, index1) in tabs[i].data" :key="index1">
						<view class="pd-box">
							<view class="blod font-b">
								{{item.name}}
							</view>
							<view class="flex">
								<view class="sub-class mgr-20 flex-r-center" @click="goDetail(sub.categoryId)" v-for="(sub,index2) in item.category_list"
								 :key="index2">
									{{sub.categoryName}}
								</view>
							</view>
						</view>
						<view class="cut-off"></view>
					</view>
					<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</swiper-item>
		</swiper>
		<view class="fixed-bottom bg-default-color white font-b flex-r-center">
			新建宝宝
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						name: "宝宝管理",
						active: true,
						data: []
					},
					{
						name: "孕期管理",
						active: false,
						data: []
					},
				],
				isLoad: false,
				tabIndex: 0,
				CustomBar: this.CustomBar,
			}
		},
		onLoad() {
			this.init()
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
				this.api.center.manage.baby.get_list(null, res => {
					console.log(res)
					this.isLoad = true
					uni.hideLoading()
				})
			},
			async changeTab(index) {
				this.tabs.forEach(item => {
					item.active = false;
				});
				this.tabIndex = index;
				this.tabs[index].active = true;
				this.init()
			},
			changeSwiper(e) {
				this.changeTab(e.target.current);
			},
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
	}

	.tab-bar {
		// border-bottom: 2upx solid #f1f1f1;
		padding-left: 30upx;
		position: fixed;
		left: 0;
		z-index: 2;
		background-color: #ffffff;
		height: 100upx;

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
		top: 100upx;
	}

	.fixed-bottom {
		height: 120upx;
	}
</style>
