<template>
	<view>
		<view class="flex-r-between search-box">
			<view class="flex-r-between search">
				<view class="flex">
					<view class="iconfont iconsousuo" style="margin-right: 20upx;"></view>
					<input type="text" v-model="value" placeholder="孩子发烧了怎么办？" @confirm="search" />
				</view>
				<view class="iconfont iconshanchu gray" style="margin-left: 30upx;" @click="value = ''" v-show="show"></view>
			</view>
		</view>
		<view class="content">
			<view class="font-b blod">历史搜索</view>
			<view class="flex">
				<view class="item small gray" v-for="(item,index) in list" :key="index">
					{{item}}
				</view>
			</view>
				<view class="font-b blod">孕妈咪都关注</view>
				<view class="flex">
					<view class="item small gray" v-for="(item,index) in list" :key="index">
						{{item}}
					</view>
				</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			show: false,
			list:["胎教书记","怀孕的准备","孕检需要准备什么","备孕方法",]
		};
	},
	onLoad() {},
	watch: {
		value(val) {
			this.show = val ? true : false;
		}
	},
	methods: {
		search() {
			console.log(this.value);
		}
	}
};
</script>

<style lang="less">
.search-box {
	padding: 20upx 30upx;
	border-bottom: 2upx solid #f1f1f1;
	.search {
		background-color: #f5f5f5;
		padding: 5upx 20upx;
		width: 80%;
		border-radius: 10upx;
	}
}
.content{
	padding: 30upx;
	.item{
		border: 2upx solid #f1f1f1;
		height: 60upx;
		padding: 0upx 20upx;
		border-radius: 30upx;
		line-height: 60upx;
		margin-right: 30upx;
		margin-top: 20upx;
	}
}
</style>
