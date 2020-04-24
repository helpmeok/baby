<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">
				<view class="" @click="toggleShowTypeList">
					<text>{{typeList[typeIndex].abilityType}}</text>
					<image src="/static/question_card_ic_fold@3x.png" mode="widthFix" v-if="isShowTypeList" class="icon-fold"></image>
					<image src="/static/question_card_ic_unfold@3x.png" mode="widthFix" v-else class="icon-fold"></image>
				</view>
			</block>
		</cu-custom>
		<view class="fixed-top" :style="{'top':CustomBar+'px'}">
			<detail-tabs :tabIndex="tabIndex" :tabList="tabList" :showTypeList="false" v-on:changeTabIndex="changeTabIndex"></detail-tabs>
		</view>
		<swiper class="swiper-box" :current="tabIndex" @change="changeSwiper" :style="{ height: swiperHeight + 'px'}">
			<swiper-item v-for="(el, i) in tabs" :key="i">
				<scroll-view @scrolltolower="loadMore(i)" class="scroll-view" :enable-back-to-top="true" :style="{ height: swiperHeight + 'px' }">
					<empty v-if="tabs[i].data.length == 0" msg="暂无资讯~"></empty>
					<article-item :list="tabs[i].data" v-on:videoHandle="videoHandle" :showOperate="false" v-on:showOperate="showOperate"
					 id="articleItem"></article-item>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="el.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="uni-mask" v-show="isShowTypeList" @click="hideTypeListMask" :style="{'top':CustomBar+'px'}">
			<view class="uni-popup pd-box" @click.stop>
				<view class="item border-bottom pd-box flex-r-center baby-font-size" :class="{'baby-red':el.active}" v-for="(el,i) in typeList"
				 :key="i" @click="changeAbilityType(el,i)">
					{{el.abilityType}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import detailTabs from '@/components/detail-tabs.vue';
	let videoPlay;
	let ctime = parseInt(Date.now());
	const total = 10;
	import myMixin from '@/common/mixins.js'
	export default {
		components: {
			detailTabs
		},
		mixins: [myMixin.publicApi],
		data() {
			return {
				isShowTypeList: false,
				tabIndex: 0,
				tabList: [{
					name: '全部',
					showType: ""
				}, {
					name: '音频',
					showType: 4
				}, {
					name: '视频',
					showType: 5
				}],
				tabs: [{
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						data: [],
						offset: 0,
						loadingType: 0
					},
					{
						data: [],
						offset: 0,
						loadingType: 0
					}
				],
				typeIndex: 0,
				typeList: [{
					abilityType: "全部内容"
				}],
				loadingText: {
					contentdown: '',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				title: "",
				CustomBar: this.CustomBar
			};
		},
		async onLoad() {
			this.getBabyIdAndType();
			await this.init();
			this.getArticleInit();
		},
		computed: {
			swiperHeight() {
				return this.screenHeight - this.CustomBar - uni.upx2px(100)
			}
		},

		methods: {
			init() {
				return new Promise((onok, onno) => {

					this.api.child.get_group_ability_list({
						groupId: this.babyInfoGroupId
					}, res => {
						console.log(res)
						this.typeList = this.typeList.concat(res.data).map((el, i) => {
							if (i == 0) {
								el.active = true
							} else {
								el.active = false
							}
							return el
						})
						onok()
					}, err => {
						onno(err)
					})
				});
			},
			getArticleInit() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.api.child.get_article_list_by_groupAbility({
						abilityType: this.typeList[this.typeIndex].abilityType,
						groupId: this.babyInfoGroupId,
						offset: this.tabs[this.tabIndex].offset,
						showType: this.tabList[this.tabIndex].showType,
						total
					},
					res => {
						console.log(res);
						uni.hideLoading();
						this.tabs[this.tabIndex].data = res.data;
					}
				);
			},
			toggleShowTypeList() {
				this.isShowTypeList = !this.isShowTypeList;
			},
			hideTypeListMask() {
				this.isShowTypeList = false
			},
			changeTabIndex(index) {
				this.tabIndex = index
				if (videoPlay) {
					videoPlay.pause()
				}
			},
			changeSwiper(e) {
				if (videoPlay) {
					videoPlay.pause()
				}
				this.tabIndex = e.target.current;
				this.changeTab(e.target.current);
			},
			changeTypeListIndex(index) {
				if (videoPlay) {
					videoPlay.pause()
				}
				if (this.typeList[index].active) {
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.typeList.forEach((el) => {
					el.active = false
				})
				console.log(index)
				this.typeList[index].active = true
				this.tabs[this.tabIndex].data = [];
				this.typeIndex = index;
				this.tabs[this.tabIndex].offset = 0;
				this.getArticleInit();
			},
			getMoreArticle() {
				let currentTabIndex = this.tabIndex;
				this.tabs[currentTabIndex].offset += total;
				this.api.child.get_article_list_by_groupAbility({
						abilityType: this.typeList[this.typeIndex].abilityType,
						groupId: this.babyInfoGroupId,
						offset: this.tabs[this.tabIndex].offset,
						showType: this.tabList[this.tabIndex].showType,
						total
					},
					res => {
						console.log(res);
						if (res.data.length) {
							this.tabs[currentTabIndex].data = this.tabs[currentTabIndex].data.concat(res.data);
							this.tabs[currentTabIndex].loadingType = 0;
						} else {
							this.tabs[currentTabIndex].loadingType = 2;
						}
					},
					err => {
						this.tabs[currentTabIndex].offset -= total;
						this.tabs[currentTabIndex].loadingType = 0;
					}
				);
			},
			async changeTab(index) {
				if (!this.tabs[this.tabIndex].data.length) {
					this.getArticleInit()
				}
			},
			loadMore() {
				if (!this.tabs[this.tabIndex].data.length) {
					return;
				}
				if (this.tabs[this.tabIndex].loadingType !== 0) {
					return;
				} else {
					this.tabs[this.tabIndex].loadingType = 1;
					this.getMoreArticle();
				}
			},
			showOperate(e) {},
			hideArticleOperate() {
				this.showArticleOperate = false;
			},
			removeItem(i) {
				this.recommendList.splice(i, 1);
			},
			changeAbilityType(item, i) {
				this.typeList.forEach((el) => {
					el.active = false
				})
				this.typeList[i].active = true
				this.typeIndex=i;
				this.isShowTypeList=false;
				this.tabs[this.tabIndex].offset = 0;
				this.getArticleInit();
			}
		}
	}
</script>

<style lang="scss">
	.icon-fold {
		width: 20upx !important;
		margin-left: 10upx;
	}

	.uni-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
		.uni-popup {
			width: 100%;
			position: absolute;
			background-color: #ffffff;
			left: 0;
			.item:nth-last-child(1){
				border: none;
			}
		}
	}


	

	.swiper-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
