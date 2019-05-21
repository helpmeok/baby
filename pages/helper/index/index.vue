<template>
	<view>
		<view class="header flex-r-center ">
			<image src="../../../static/assistant_list_ic_headportrait@3x.png" mode="widthFix" class="help-icon"></image>
			<view class="content mgl-30 pd-box bg-white">
				主人您好！我是宝宝贝智能小助手，下面的问题我都会想办法帮您解决哦。
			</view>
		</view>
		<view class="pd-box flex-r-between">
			<view class="blod font-b">
				大家都在问
			</view>
			<view class="flex transform pd-lr" @click="exchange">
				<text>换一组</text>
				<view class="iconfont iconchaxun-zhongzhi mgl-10 blod" :class="{'rotate':isLoading}"></view>
			</view>
		</view>
		<view class="flex pd-box">
			<view class="list-item pd-lr mgr-20 flex-r-center" v-for="(el,i) in list" :key="i" @click="goList(el.searchKeywordId)">
				{{el.title}}
			</view>
		</view>
	</view>
</template>

<script>
	let offset = 0
	let total = 10
	export default {
		data() {
			return {
				list: [],
				isLoading: false
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.api.helper.get_query_list({
					type: 1,
					ctime: parseInt(Date.now()),
					offset,
					total
				}, res => {
					console.log(res)
					if (res.data.length > 0) {
						this.list = res.data
					}
					setTimeout(()=>{
						this.isLoading = false
					},500)
				})
			},
			exchange() {
				offset = offset + total
				this.isLoading = true
				this.init()
			},
			goList(id){
				uni.navigateTo({
					url:"../list/list?id="+id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fdfdfd;
	}

	.header {
		padding: 50upx 20upx;
		border-bottom: 2upx solid #f1f1f1;

		.help-icon {
			width: 80upx;
		}

		.content {
			width: 80%;
			box-shadow: 5px 5px 5px #f1f1f1;
			box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
			border-radius: 10upx;
			box-sizing: border-box;
		}
	}

	.transform {
		border: 2upx solid #FFB62B;
		height: 50upx;
		border-radius: 25upx;
		color: #FFB62B;
	}

	.list-item {
		border: 2upx solid #f1f1f1;
		height: 80upx;
		border-radius: 40upx;
		margin-bottom: 30upx;
	}
</style>
