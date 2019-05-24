<template>
	<view>
		<empty v-if="list.length==0" msg="您还没有关注主题~"></empty>
		<view class="">
			<view class="list-item" v-for="(item, index1) in list" :key="index1">
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
			<view class="uni-tab-bar-loading" v-if="list.length>0">
				<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
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
			};
		},
		onLoad() {
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		methods: {
			init() {
				this.api.center.classify.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res)
					if (res.data.length) {
						this.list = this.list.concat(res.data)
						this.loadingType = 0
					} else {
						this.loadingType = 2
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
			goDetail(id) {
				uni.navigateTo({
					url: "/pages/classify/detail/detail?id=" + id
				})
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
	}
	
</style>
