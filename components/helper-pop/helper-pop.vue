<template>
	<view class="mask" v-show="isHelpShow" @click="hide">
		<view class="bg-white content-box" @click.stop="" :style="{'bottom':publishBottom+'px'}">
			<view class="pd-box flex-r-between">
				<view class="blod font-b">
					您可能碰到如下问题：
				</view>
				<view class="flex transform pd-lr" @click="exchange">
					<text>换一组</text>
					<view class="iconfont iconchaxun-zhongzhi mgl-10 blod" :class="{'rotate':isLoading}"></view>
				</view>
			</view>
			<scroll-view scroll-y style="height: 500upx;">
				<view class="flex pd-box">
					<view class="list-item pd-lr mgr-20 flex-r-center" v-for="(el,i) in list" :key="i" @click="goList(el.questionId,el.questionName)">
						{{el.questionName}}
					</view>
				</view>
			</scroll-view>
			<view class="line"></view>
			<view class="search-box flex-r-between pd-box">
				<input type="text" class="input" placeholder="您还需要了解点什么？" placeholder-class="gray" v-model="searchText" @blur="publishBlur"
				 @focus="publishFocus" :adjust-position="false" />
				<view class="btn bg-default-color white flex-r-center" @click="search()">查找</view>
			</view>
		</view>
	</view>
</template>

<script>
	let total = 10
	export default {
		data() {
			return {
				list: [],
				offset: 0,
				isLoading: false,
				searchText: "",
				publishBottom: 0
			}
		},
		props: {
			isHelpShow: {
				type: Boolean,
				default: false
			}
		},
		watch:{
			isHelpShow(val){
				if (val) {
					this.init();
				}
			}
		},
		created() {
			
		},
		methods: {
			hide() {
				this.$emit('helpHide')
			},
			init() {
				this.api.helper.get_query_list({
					type: 1,
					ctime: parseInt(Date.now()),
					offset: this.offset,
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
				this.offset + total
				this.isLoading = true
				this.init()
			},
			goList(id, name) {
				uni.navigateTo({
					url: "/pages/helper/list/list?id=" + id 
				})
			},
			search() {
				uni.navigateTo({
					url: "/pages/helper/search/search?text=" + this.searchText
				})
			},
			publishFocus(e) {
				console.log(e)
				this.publishBottom = e.detail.height;
				console.log(this.publishBottom)
			},
			publishBlur() {
				this.publishBottom = 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-box {
		position: fixed;
		left: 0;
		bottom: 0;
		border-radius: 20upx 20upx 0 0;
		width: 100%;

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

		.search-box {
			width: 100%;
			box-sizing: border-box;
			// padding-bottom: env(safe-area-inset-bottom);
			// padding-bottom: constant(safe-area-inset-bottom);
			
			.input {
				background-color: #E8E8E8;
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
	}
</style>
