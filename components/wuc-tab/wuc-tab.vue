<template>
	<scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
		<view v-if="!textFlex">
			<view class="wuc-tab-item" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList"
			 :key="index" :id="index" @tap="tabSelect(index,$event)">
				<text :class="item.icon"></text>
				<text>{{item.name}}</text>
			</view>
		</view>

		<view class="flex text-center" v-if="textFlex">
			<view class="wuc-tab-item flex-sub" :class="index === tabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList"
			 :key="index" :id="index" @tap="tabSelect(index,$event)">
				<text :class="item.icon"></text>
				<text>{{item.name}}</text>
			</view>
		</view>
	</scroll-view>
</template>
<script>
	export default {
		name: 'wuc-tab',
		data() {
			return {};
		},
		props: {
			tabList: {
				type: Array,
				default () {
					return [];
				}
			},
			tabCur: {
				type: Number,
				default () {
					return 0;
				}
			},
			tabClass: {
				type: String,
				default () {
					return '';
				}
			},
			tabStyle: {
				type: String,
				default () {
					return '';
				}
			},
			textFlex: {
				type: Boolean,
				default () {
					return false;
				}
			},
			selectClass: {
				type: String,
				default () {
					return 'text-blue';
				}
			}
		},
		methods: {
			tabSelect(index, e) {
				if (this.currentTab === index) return false;
				this.$emit('update:tabCur', index);
				this.$emit('change', index);
			}
		},
		computed: {
			scrollLeft() {
				return (this.tabCur - 1) * 60;
			}
		}
	};
</script>
<style lang="scss" scoped>
	view,
	scroll-view,
	swiper {
		box-sizing: border-box;
		height: 100upx !important;
	}

	.wuc-tab {

		white-space: nowrap;
		border-bottom: 2upx solid #f5f5f5;
	}

	.wuc-tab-item {
		height: 90upx;
		display: inline-block;
		line-height: 90upx;
		margin: 0 10upx;
		padding: 0 20upx;
		position: relative;
		z-index: 999;
	}

	.wuc-tab-item.cur {
		border-bottom: 2upx solid;
	}

	.wuc-tab.fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1024;
		box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
	}

	.flex {
		display: flex;
	}

	.text-center {
		text-align: center;
	}

	.flex-sub {
		flex: 1;
	}

	.text-blue {
		color: $uni-color-default;
		font-size: 36upx;
		font-weight: bold;
	}

	.text-white {
		color: #ffffff;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.bg-blue {
		background-color: #0081ff;
	}

	.text-orange {
		color: #f37b1d
	}

	.text-xl {
		font-size: 36upx;
	}
</style>
