<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isEdit='isEdit' :showCancel="true" v-on:edit="edit">
			<block slot="backText"></block>
			<block slot="content">话题关注</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="您还没有关注话题~"></empty>
		<view class="">
			<view class="list-box pd-box">
				<view class="list-item" v-for="(item, index1) in list" :key="index1">
					<view class="item flex-r-center" :class="{'active':sub.active}" @click="goDetail(sub.categoryId,index1,index2)">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<view class="flex-r-center default-color fixed-bottom" @click="removeList" v-if="!isEdit">
			<view class="">删除</view>
			<view class="" v-if="ids.length>0">（{{ids.length}}）</view>
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
		onLoad() {
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		watch: {
			isEdit(newValue, oldValue) {
				if (newValue) {
					this.list.forEach((item) => {
						item.category_list.forEach((el) => {
							el.active = false
						})
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
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						this.list.forEach((item) => {
							item.category_list.forEach((el) => {
								el.active = false
							})
						})
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
					if (type == 'remove') {
						uni.hideLoading();
						this.isEdit = true;
						uni.showToast({
							title: "取消关注成功"
						});
					}
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
			goDetail(id, index1, index2) {
				if (this.isEdit) {
					uni.navigateTo({
						url: "/pages/classify/detail/detail?id=" + id
					})
				} else {

				}

			},
			edit() {
				this.isEdit = !this.isEdit
				if (this.isEdit) {
					this.list.forEach((item) => {
						item.category_list.forEach((el) => {
							el.active = false
						})
					})
				}
			},
			removeList() {
				if (this.ids.length) {
					uni.showModal({
						title: '提示',
						content: '确定取消关注所有主题？',
						success: (res) => {
							if (res.confirm) {
								let categorys = this.ids.join(',')
								console.log(this.ids)
								this.api.center.classify.delete_attention({
									"category[]": this.ids
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
		onReachBottom() {
			this.loadMore()
		}
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
			height:84upx;
			.item {
				width: 210upx;
				height: 80upx;
				border-radius: 42upx;
				border: 2upx solid #f1f1f1;
				text-align: center;
				line-height: 80upx;
			}

			.active {
				background-color: $uni-color-default;
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
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
