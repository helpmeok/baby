<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isEdit='isEdit' :showCancel="true" v-on:edit="edit">
			<block slot="backText"></block>
			<block slot="content">我关注的话题</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="您还没有关注话题~"></empty>
		<view class="">
			<view class="list-box pd-box">
				<view class="list-item" v-for="(item, index) in list" :key="index">
					<view class="item flex-r-center" :class="{'active':item.active}" @click="goDetail(item,index)">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<view class="flex-r-center default-color fixed-bottom" @click="removeList" v-if="!isEdit">
			<image src="/static/com_tab_ic_delete_nor@3x.png" mode="widthFix" class="icon"></image>
			<view class="baby-font-size">删除</view>
			<view class="baby-font-size" v-if="ids.length>0">（{{ids.length}}）</view>
		</view>
		<view class="flex-r-center white bg-default-color fixed-bottom" @click="addList" v-if="isEdit">
			<text class="baby-font-size">添加话题</text>
		</view>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	let offset = 0;
	export default {

		data() {
			return {
				loadingType: 0,
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				isEdit: true,
				ids: []
			};
		},
		onLoad() {},
		onShow() {
			uni.showLoading({
				title: "加载中"
			})
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		watch: {
			isEdit(newValue, oldValue) {
				if (newValue) {
					this.list.forEach((item) => {
						item.active = false
					})
					this.ids = [];
				}
			}
		},
		methods: {
			init(type) {
				this.api.center.classify.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					this.list = res.data
					this.list.forEach((item) => {
						item.active = false
					})
					// if (res.data.length) {
					// 	this.list = this.list.concat(res.data)
					// 	this.list.forEach((item) => {
					// 		item.active = false
					// 	})
					// 	this.loadingType = 0
					// } else {
					// 	this.loadingType = 2
					// }
					if (type == 'remove') {
						this.isEdit = true;
						uni.showToast({
							title: "取消关注成功"
						});
					}
					uni.hideLoading();
				})
			},
			loadMore() {
				if (this.loadingType != 0) {
					return
				}
				this.loadingType = 1
				offset += total
				this.init()
			},
			goDetail(el, index) {
				if (this.isEdit) {
					uni.navigateTo({
						url: "/pages/classify/detail/detail?id=" + el.tagId
					})
				} else {
					this.list[index].active = !this.list[index].active;
					this.$forceUpdate();
					if (this.list[index].active) {
						this.ids.push(this.list[index].tagId)
					} else {
						this.ids.splice(this.ids.indexOf(this.list[index].tagId), 1)
					}
					console.log(this.ids)
				}

			},
			edit() {
				this.isEdit = !this.isEdit
				if (this.isEdit) {
					this.list.forEach((item) => {
						item.active = false
					})
				}
			},
			removeList() {
				if (this.ids.length == this.list.length) {
					uni.showToast({
						title: "请至少保留一个话题关注",
						icon:"none"
					})
				} else {
					if (this.ids.length) {
						uni.showModal({
							title: '提示',
							content: '确定取消关注所有话题？',
							success: (res) => {
								if (res.confirm) {
									this.api.center.classify.delete_attention({
										"tagId[]": this.ids
									}, res => {
										uni.showLoading({
											title: "取消关注中"
										})
										offset = 0;
										this.list = [];
										this.init('remove')
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			},
			addList() {
				uni.navigateTo({
					url: "/pages/center/classify/add-list/add-list"
				})
			}
		},
		// onReachBottom() {
		// 	this.loadMore()
		// }
	}
</script>

<style lang="scss">
	.list-box {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		.list-item {
			width: 33.3333%;
			display: flex;
			justify-content: center;
			margin-bottom: 20upx;
			height: 84upx;

			.item {
				width: 210upx;
				height: 80upx;
				border-radius: 42upx;
				border: 2upx solid #f1f1f1;
				text-align: center;
				line-height: 80upx;
			}

			.item.active {
				background-color: $uni-color-default !important;
				color: white;
				border: 2upx solid $uni-color-default;
			}
		}

		.list-item:nth-of-type(3n) {
			justify-content: flex-end;
		}

		.list-item:nth-of-type(3n-2) {
			justify-content: flex-start;
		}

	}

	.fixed-bottom {
		border-top: 2upx solid #f5f5f5;
		background-color: white;
		height: 120upx;
		padding: 20upx 0;
		box-sizing: border-box;
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
		padding: 20upx 50upx;

		.icon {
			width: 60upx;
		}
	}
</style>
