<template>
	<!-- #ifdef H5	 -->	
	<view 
		class="mix-refresh-content"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100% - ' + pageTop + 'px)',
				maxHeight: 'calc(100% - ' + pageTop + 'px)'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->
	<!-- #ifndef H5	 -->	
	<view 
		class="mix-refresh-content"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100vh - ' + pageTop + 'px)',
				maxHeight: 'calc(100vh - ' + pageTop + 'px)'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->
	
		<!-- 下拉刷新 -->
		<view class="mix-loading-wrapper flex-r-center">
			<!-- :class="{active: refreshing, ready: refreshReady}" -->
			<image 
				class="mix-loading-icon" 
				
				src="/static/com_refresh2@3x.gif">
			</image>
			<!-- <view class="mgl-20 gray">{{statusText}}</view> -->
		</view>
		
		<slot></slot>
		
	</view>
</template>

<script>
	let startY, moveY;
	export default {
		
		props: {
			top: {
				//距离顶部距离，单位upx
				type: Number,
				default: 0
			},
			statusText:{
				type: String,
				default: '刷新中'
			},
		},
		data() {
			return {
				pageDeviation: 0, //下偏移量
				pageTransition: 0, //回弹过渡时间
				refreshReady: false, //进入刷新准备状态
				refreshing: false, // 进入刷新状态
			};
		},
		computed: {
			pageTop(){
					return uni.upx2px(this.top);
			}
		},
		methods: {
			pageTouchstart(e){
				this.pageTransition = 0;
				startY = e.touches[0].pageY;
			},
			pageTouchmove(e){
				moveY = (e.touches[0].pageY - startY) * 0.4;
				if(moveY >= 0){
					this.pageDeviation = moveY;
					
					this.$emit('setEnableScroll', false);
				}
				if(moveY >= 50 && this.refreshReady === false){
					this.refreshReady = true;
				}else if(moveY < 50 && this.refreshReady === true){
					this.refreshReady = false;
				}
			},
			pageTouchend(){
			
				this.pageTransition = 0.3;
				
				if(moveY >= 50){
					this.startPulldownRefresh();
				}else{
					this.pageDeviation = 0;
				}
				
				if(this.refreshReady === true){
					this.refreshReady = false;
				}
				
				startY = moveY = 0;
			},
			//开启下拉刷新
			startPulldownRefresh(){
				this.refreshing = true;
				this.pageDeviation = uni.upx2px(90);
				this.$emit('refresh');
			},
			//结束下拉刷新
			endPulldownRefresh(){
				this.refreshing = false;
				this.pageDeviation = uni.upx2px(0);
				this.$emit('setEnableScroll', true);
			},
		}
	}
</script>

<style>
	.mix-refresh-content{
		display: flex;
		flex-direction: column;
		position: relative;
	}
	/* 下拉刷新部分 */
	.mix-loading-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		transform: translateY(-100%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	
	.mix-loading-icon{
		width: 70upx;
		height: 70upx;
		transition: .3s;
	}
	.mix-loading-icon.ready{
		transform: scaleX(1.3);
	}
	.mix-loading-icon.active{
		animation: loading .5s ease-in infinite both alternate;
		border: none !important;
	}
	
	@keyframes loading {
		0% {
			transform: translateY(-5upx) scaleX(1);
		}
		100% {
			transform: translateY(4upx)  scaleX(1.3);
		}
	}
	
</style>
