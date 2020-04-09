<template>
	<view>
		<baby-info-add :show="isShowBabyInfoAdd" :isShowLogin="isShowLogin" v-on:hideBabyInfoAdd="hideBabyInfoAdd" v-on:showLogin="showLogin" v-on:hideLogin="hideLogin"></baby-info-add>
	</view>
</template>
<script>
	import babyInfoAdd from '@/components/babyInfo-add.vue'
	export default {
		data() {
			return {
				isShowBabyInfoAdd: true,
				isShowLogin:false
			};
		},
		components: {
			babyInfoAdd
		},
		onLoad() {
			
		},
		onShow(){
			if(uni.getStorageSync('access_token')){//登录过就隐藏登录弹窗
				this.isShowLogin=false;
			}	
		},
		methods:{
			hideBabyInfoAdd(){
				this.isShowBabyInfoAdd=false
			},
			showLogin(){
				this.isShowLogin=true;
			},
			hideLogin(){
				this.isShowLogin=false;
			}
		}
		
	}
</script>
<style lang="scss">

</style>
