<template>
	<view>
		<cu-custom bgColor="bg-gradual-red">
			<block slot="content">助手</block>
		</cu-custom>
		<view class="header flex-r-center ">
			<image src="../../../static/assistant_list_ic_headportrait@3x.png" mode="widthFix" class="help-icon"></image>
			<view class="content mgl-30 pd-box bg-white">
				主人您好！我是宝宝贝智能小助手，下面的问题我都会想办法帮您解决哦。
			</view>
		</view>
		<view class="pd-box flex-r-between">
			<view class="blod font-b">
				热门百科推荐：
			</view>
			<view class="flex-r-between transform " @click="exchange">
				<text>换一组</text>
				<view class="iconfont iconchaxun-zhongzhi blod" :class="{'rotate':isLoading}"></view>
			</view>
		</view>
		<view class="flex pd-box">
			<view class="list-item pd-lr mgr-20 flex-r-center" v-for="(el,i) in list" :key="i" @click="goList(el.questionId,el.questionName)">
				{{el.questionName}}
			</view>
		</view>
		<view class="" style="height: 150upx;">
			
		</view>
		<view class="search-box flex-r-between pd-box">
			<input type="text" class="input" placeholder="您还需要了解点什么？" placeholder-class="gray" v-model="searchText" />
			<view class="btn bg-default-color white flex-r-center" @click="search()">查找</view>
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
				isLoading: false,
				searchText: ""
			};
		},
		onLoad() {
			this.init()
		},
		onUnload() {
			offset = 0;
		},
		onShow() {
			this.searchText=""
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
					setTimeout(() => {
						this.isLoading = false
					}, 500)
				})
			},
			exchange() {
				offset = offset + total
				this.isLoading = true
				this.init()
			},
			goList(id, name) {
				uni.navigateTo({
					url: "../list/list?id=" + id
				})
			},
			search() {
				uni.navigateTo({
					url: "/pages/helper/search/search?text=" + this.searchText
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
		width: 180upx;
		height: 60upx;
		border-radius: 30upx;
		color: #FFB62B;
		font-size: 26upx;
		padding: 0 20upx;
		.iconchaxun-zhongzhi{
			font-size: 28upx;
		}
	}

	.list-item {
		border: 2upx solid #f1f1f1;
		height: 80upx;
		border-radius: 40upx;
		margin-bottom: 30upx;
	}

	.search-box {
		height: 150upx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		background-color: white;
		.input {
			background-color: #F5F5F5;
			margin: 0 30upx;
			width: 70%;
			height: 60upx;
			border-radius: 30upx;
			padding-left: 40upx;
		}

		.btn {
			padding: 0 30upx;
			border-radius: 30upx;
			height: 60upx;
		}

		.btn-n {
			background-color: #E8E8E8 !important;
		}
	}
</style>
