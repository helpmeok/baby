<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的问答</block>
		</cu-custom>
		<view class="header pd-box">
			<view class="qa-bg white">
				<view class="font-b blod">回答获60人点赞</view>
				<view class="">
					本月共20人点赞
				</view>
				<image src="/static/qa_card_pic_praise@3x.png" mode="widthFix" class="icon"></image>
			</view>
		</view>
		<view class="tab-bar flex-r-between" :style="[{top:CustomBar + 'px'}]">
			<view class="tabs flex">
				<view class="gray item" style="margin-right: 60upx;" v-for="(item, index) in tabs" :key="index" :class="{ active: item.active }"
				 @click="changeTab(index)">
					<view :class="{'bottom-line':item.active}"></view>
					<view class="name" :class="{ active: item.active }">{{ item.name }}</view>
				</view>
			</view>
			<view class="gray">
				共3个{{tabIndex==0?"提问":"回答"}}
			</view>
		</view>
		<navigator url="/pages/home/question/commit/commit" hover-class="none">
			<image src="/static/qa_bottom_ic_quiz@3x.png" mode="widthFix" class="float-ask"></image>
		</navigator>
		<swiper :style="[{'height':scrollHeight+'px'}]" :current="tabIndex"
		 :duration="300" @change="changeSwiper">
			<swiper-item v-for="(el, i) in tabs" :key="i">
				<scroll-view @scrolltolower="loadMore(i)" scroll-y :style="[{'height':scrollHeight+'px'}]" :enable-back-to-top="el.active">
					<empty v-if="tabs[i].data.length == 0 && isLoad" :msg="tabIndex==0?'您还没有提问~':'您还没有回答~'"></empty>
					<view class="q-list" v-show="i==0">
						<view class="list-item" @click="goQuestion(sub.id)" v-for="(sub,index) in tabs[i].data" :key="index">
							<view class="item">
								<image src="/static/assistant_list_ic_question@3x.png" mode="widthFix" class="icon mgr-20"></image>
								<view class="font-b blod text">
									{{sub.title}}
								</view>
							</view>
							<view class="flex-r-between">
								<view class="gray">
									{{sub.answerCnt}}个回答
								</view>
							</view>
						</view>
					</view>
					<view class="a-list" v-show="i==1">
						<view class="list-item" v-for="(sub,index) in tabs[i].data" :key="index">
							<view class="item">
								<image src="/static/assistant_list_ic_answer@3x.png" mode="widthFix" class="icon mgr-20"></image>
								<view class="font-b blod text">
									{{sub.questionTitle}}
								</view>
							</view>
							<view class="gray sigle-line-text-2" style="margin-bottom: 20upx;">
								{{sub.content}}
							</view>
							<view class="flex-r-between">
								<view class="gray">
									{{sub.supportCnt}}个赞
								</view>
							</view>
						</view>
					</view>
					<view class="uni-tab-bar-loading" v-if="tabs[i].data.length >0">
						<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var ctime = parseInt(Date.now());
	const total = 10;
	export default {
		data() {
			return {
				tabs: [{
						name: "我的提问",
						active: true,
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						name: "我的回答",
						active: false,
						data: [],
						offset: 0,
						loadingType: 0
					},
				],
				loadingText: {
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: ""
				},
				isLoad: false,
				tabIndex: 0,
				CustomBar: this.CustomBar,
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:"加载中"
			})
			this.init()
		},
		computed:{
			scrollHeight(){
				return this.screenHeight-this.CustomBar-uni.upx2px(300)
			}
		},
		methods: {
			goQuestion(id){
				uni.navigateTo({
					url:'/pages/home/question/detail/detail?id='+id
				})
			},
			init(){
				if (!this.tabs[this.tabIndex].data.length) {
					this.isLoad = false
					uni.showLoading({
						title: '加载中'
					});
					console.log('加载中')
				}
				if (this.tabIndex == 0) {
					this.api.center.qa.question.get_list({
						ctime,
						offset: this.tabs[this.tabIndex].offset,
						total
					}, res => {
						console.log(res)
						if (res.data.length) {
							this.tabs[this.tabIndex].data = this.tabs[this.tabIndex].data.concat(res.data);
							this.tabs[this.tabIndex].loadingType = 0;
						} else {
							this.tabs[this.tabIndex].loadingType = 2;
						}
						this.isLoad = true;
						uni.hideLoading()
					})
				} else {
					this.api.center.qa.answer.get_list({
						ctime,
						offset: this.tabs[this.tabIndex].offset,
						total
					}, res => {
						console.log(res)
						if (res.data.length) {
							this.tabs[this.tabIndex].data = this.tabs[this.tabIndex].data.concat(res.data);
							this.tabs[this.tabIndex].loadingType = 0;
						} else {
							this.tabs[this.tabIndex].loadingType = 2;
						}
						this.isLoad = true;
						uni.hideLoading()
					})
				}
			},
			async changeTab(index) {
				this.tabs.forEach(item => {
					item.active = false;
				});
				this.tabIndex = index;
				this.tabs[index].active = true;
				if (!this.tabs[this.tabIndex].data.length) {
					this.init()
				} 
			},
			changeSwiper(e) {
				this.changeTab(e.target.current);
			},
			loadMore(i) {
				if (!this.tabs[this.tabIndex].data.length) {
					return;
				}
				if (this.tabs[i].loadingType !== 0) {
					return;
				}
				this.tabs[i].loadingType = 1;
				this.tabs[this.tabIndex].offset += total;
				this.init();
			},
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		
		.float-ask{
			position: fixed;
			right: 20upx;
			bottom: 20upx;
			width: 150upx;
			z-index: 999;
		}
		.header {
			box-sizing: border-box;
			width: 100%;
			.qa-bg {
				width: 100%;
				height: 180upx;
				padding: 30upx;
				background: linear-gradient(-50deg, rgba(255, 192, 1, 1), rgba(255, 174, 0, 1));
				box-shadow: 0px 8upx 50upx 0px rgba(255, 176, 0, 0.3);
				border-radius: 10px;
				position: relative;

				.icon {
					position: absolute;
					right: 0;
					top: 0;
					width: 180upx;
				}
			}
		}

		.tab-bar {
			// border-bottom: 2upx solid #f1f1f1;
			padding:0 30upx;
			height: 100upx;
			width: 100%;
			.tabs {

				.item {
					position: relative;
					left: 0;
					top: 0;
					z-index: 2;

					.name {
						position: relative;
						left: 0;
						top: 0;
						z-index: 2;
						font-size: 34upx;
					}

					.active {
						font-size: 46upx !important;

					}

					.bottom-line {
						position: absolute;
						left: 0;
						bottom: 10upx;
						z-index: 1;
						width: 100%;
						height: 20upx;
						border-radius: 10upx;
						background-color: yellow;
					}
				}
			}

			.active {
				font-weight: bold;
				color: black;
				border: none;
			}
		}
		.q-list,.a-list{
			padding-left: 30upx;
				box-sizing: border-box;
			.list-item{
				border-bottom: 2upx solid #f5f5f5;
				padding: 20upx 20upx 20upx 0;
				position: relative;
				.item {
					margin-bottom: 20upx;
					width: 100%;
					.icon {
						width: 40upx !important;
						position: relative;
						top: 15upx;
						left: 0;
						float: left;
					}
				}
			}
		}
		
	}
</style>
