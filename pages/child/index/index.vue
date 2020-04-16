<template>
	<view>
		<baby-info-add :show="isShowBabyInfoAdd" :isShowLoginPop="isShowLoginPop" v-on:hideBabyInfoAdd="hideBabyInfoAdd"
		 v-on:showLoginPop="showLoginPop" v-on:hideLoginPop="hideLoginPop"></baby-info-add>
		<my-baby-list :show="isShowBabyList" v-on:hideMyBabyList="hideMyBabyList" v-on:getBabyInfo="getBabyInfo" :type="'child'"></my-baby-list>
		<view class="header-custom flex-r-between" :style="[{height:CustomBar + 'px','padding-top':StatusBar+'px'}]">
			<view class="flex">
				<view class="">
					<view class="text-b">

					</view>

				</view>
				<view class="">
					()
				</view>
			</view>
			<view class="">
				<view class="text-b">
					备孕中
				</view>
			</view>
			<view class="flex">
				<view class="text-b">
					怀孕中
				</view>
				<view class="">
					()
				</view>
			</view>
			<view class="switch-btn white flex-c-center" @click="showBabyList">
				切换
			</view>
		</view>
	</view>
</template>
<script>
	import babyInfoAdd from '@/components/babyInfo-add.vue'
	import myBabyList from '@/components/my-baby-list.vue'
	import myMixin from '@/common/mixins.js'
	export default {
		data() {
			return {
				isShowBabyInfoAdd: false,
				isShowBabyList: false,
				isShowLoginPop: false,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				WindowHeight: this.windowHeight,
				babyData: {}
			};
		},
		mixins: [myMixin.publicApi],
		components: {
			babyInfoAdd,
			myBabyList
		},
		onLoad() {
		},
		onShow() {
			if (uni.getStorageSync('access_token')) { //登录过就隐藏登录弹窗
				this.isShowLoginPop = false;
				this.beforeInit()
			} else {
				this.isShowBabyInfoAdd = true;
				this.isShowLoginPop = true;
			}
		},
		methods: {
			beforeInit() {
				this.isShowBabyInfoAdd = this.getBabyInfoData().length ? false : true;
				if (this.getBabyInfoData().length) {
					this.getBabyInfo()
				}
			},
			getBabyInfo() {
				uni.showLoading({
					title: "加载中"
				})
				this.getBabyIdAndType();
				this.api.child.get_info_by_baby({
					id: this.babyInfoId,
					type: this.babyInfoType
				}, res => {
					console.log(res)
					this.babyData = res.data;
					uni.hideLoading();
				})
			},

			chooseBaby(data) {
				this.api.child.choose_baby({
					id: userInfo.babyInfoId,
					type: userInfo.babyInfoType
				}, res => {
					console.log(res)
				})
			},
			hideBabyInfoAdd() {
				this.isShowBabyInfoAdd = false
			},
			showLoginPop() {
				this.isShowLoginPop = true;
			}
		}

	}
</script>
<style lang="scss">
	.header-custom {
		padding: 40upx 240upx 0 30upx;

		.switch-btn {
			font-size: 26upx;
			width: 90upx;
			height: 50upx;
			background-color: #FC4041;
			border-radius: 25upx;
		}

		.text-b {
			color: #090909;
			font-weight: bold;
			font-size: 42upx;
		}
	}
</style>
