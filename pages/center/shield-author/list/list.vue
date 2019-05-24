<template>
	<view>
		<empty v-if="list.length==0" msg="您还没有屏蔽的作者~"></empty>
		<view class="container">
			<view class="list-item flex-r-between" v-for="(item,index) in list" :key="index">
				<view class="flex">
					<image :src="item.avatar" mode="widthFix" style="width: 100upx;height: 100upx;border-radius: 50%;margin-right: 20upx;"></image>
					<view class="">
						<view class="font-b">{{item.name}}</view>
						<view class="gray ">
							<text style="margin-right: 20upx;">{{item.originalNum}}篇原创</text>
							<text>{{item.fansNum}}粉丝</text>
						</view>
					</view>
				</view>
				<uni-tag text="取消屏蔽" type="error" :circle="true" @click="cancel(item.userId,index)"></uni-tag>
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
				this.api.center.shield.get_list({
					ctime,
					offset,
					total
				}, res => {
					console.log(res.data)
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
			cancel(id,index){
				this.api.home.article.toggle_shield({
					vid:id,
					action:0
				},res=>{
					this.list.splice(index,1)
					uni.showToast({
						title:"操作成功"
					})
				})
			}
		},
		onReachBottom() {
			this.loadMore()
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
