<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" :isEdit='isEdit' :showCancel="true" v-on:edit="edit">
			<block slot="backText"></block>
			<block slot="content">主题关注</block>
		</cu-custom>
		<empty v-if="list.length==0" msg="您还没有关注主题~"></empty>
		<view class="">
			<view class="list-item" v-for="(item, index1) in list" :key="index1">
				<view class="pd-box">
					<view class="blod font-b">
						{{item.name}}
					</view>
					<view class="flex">
						<view class="sub-class mgr-20 flex-r-center" :class="{'active':sub.active}" @click="goDetail(sub.categoryId,index1,index2)"
						 v-for="(sub,index2) in item.category_list" :key="index2">
							{{sub.categoryName}}
						</view>
					</view>
				</view>
				<view class="cut-off"></view>
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
					this.ids=[];
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
						this.isEdit=true;
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

					let id = this.list[index1].category_list[index2].categoryId;
					console.log(id)
					this.list[index1].category_list[index2].active = !this.list[index1].category_list[index2].active;
					if (this.list[index1].category_list[index2].active) {
						if (this.ids.indexOf(id) < 0) {
							this.ids.push(id)
						}
					} else {
						this.ids.splice(this.ids.indexOf(id), 1)
					}
					console.log(this.ids)
					this.$forceUpdate(); //视图强制刷新
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
									this.list=[];
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
	.list-item {
		.sub-class {
			width: auto;
			height: 60upx;
			padding: 10upx 30upx;
			border-radius: 40upx;
			border: 2upx solid #f1f1f1;
			margin-top: 20upx;

		}

		.active {
			background-color: $uni-color-default;
			color: white;
			border: 2upx solid $uni-color-default;
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
