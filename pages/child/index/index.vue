<template>
	<view>
		<baby-info-add :show="isShowBabyInfoAdd" :isShowLogin="isShowLogin" v-on:hideBabyInfoAdd="hideBabyInfoAdd"
		 v-on:showLogin="showLogin" v-on:hideLogin="hideLogin"></baby-info-add>
		<my-baby-list :show="isShowBabyList" v-on:hideMyBabyList="hideMyBabyList" :type="'child'"></my-baby-list>
		<view class="header-custom flex-r-between" :style="[{height:CustomBar + 'px','padding-top':StatusBar+'px'}]">
			<view class="flex">
				备孕中
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
				isShowLogin: false,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				WindowHeight: this.windowHeight,
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
				this.isShowLogin = false;
				this.beforeInit()
			} else {
				this.isShowBabyInfoAdd = true;
				this.isShowLogin = true;
			}
		},
		methods: {
			beforeInit() {
				let myBabyList = JSON.parse(uni.getStorageSync('myBabyList'));
				console.log(myBabyList);
				this.isShowBabyInfoAdd = myBabyList.length ? false : true;
				if (myBabyList.length) {
					this.init()
				}
			},
			init() {
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))

				this.api.child.get_info_by_baby({
					id: userInfo.babyInfoId,
					type: userInfo.babyInfoType
				}, res => {
					console.log(res)
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
			showLogin() {
				this.isShowLogin = true;
			},
			hideLogin() {
				this.isShowLogin = false;
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
	}
</style>
