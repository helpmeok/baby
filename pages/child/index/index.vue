<template>
	<view>
		<baby-info-add :show="isShowBabyInfoAdd" :showLoginPop="isShowLoginPop" v-on:hideBabyInfoAdd="hideBabyInfoAdd"
		 v-on:showLoginPop="showLoginPop" v-on:hideLoginPop="hideLoginPop"></baby-info-add>
		<my-baby-list :show="isShowBabyList" v-on:hideMyBabyList="hideMyBabyList" v-on:getBabyInfo="getBabyInfo" :type="'child'"></my-baby-list>
		<view class="" v-if="!isShowBabyInfoAdd">
			<view class="header-custom flex-r-between" :style="[{height:CustomBar + 'px','padding-top':StatusBar+'px'}]">
				<view class="baby-2 sigle-line-text" v-if="babyData.babyInfo.type==2">
					<view class="baby-2-name">
						<view class="text-b mgr-10">
							{{babyData.babyInfo.babyNick}}
						</view>
						<image src="/static/yuer_list_ic_boy@3x.png" mode="widthFix" class="sex-icon" v-if="babyData.babyInfo.babySex==1"></image>
						<image src="/static/yuer_list_ic_girl@3x.png" mode="widthFix" class="sex-icon" v-if="babyData.babyInfo.babySex==2"></image>
					</view>
					<text class="blod mgl-10 months">
						({{babyData.babyInfo.months}})
					</text>
				</view>
				<view class="baby-1 sigle-line-text" v-if="babyData.babyInfo.type==1">
					<text class="text-b">
						怀孕中
					</text>
					<text class="blod">
						({{babyData.babyInfo.months}})
					</text>
				</view>
				<view class="" v-if="babyData.babyInfo.type==0">
					<text class="text-b">
						备孕中
					</text>
				</view>
				<view class="switch-btn white flex-c-center" @click="showBabyList">
					切换
				</view>
			</view>
			<!-- <mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll"> -->
				<view class="main pd-box">
					<baby-reference-icons :type="babyData.babyInfo.type"></baby-reference-icons>
					<swiper class="sense-swiper-box">
						<swiper-item v-for="(el ,index) in babyData.commonSenseList" :key="index">
							<view class="swiper-item pd-box" @click="goGuideDetail(el)">
								<view class="flex-r-between">
									<view class="flex">
										<image src="/static/yuer_card_ic_arrow-2@3x.png" mode="widthFix" class="arrow-icon "></image>
										<view class="title blod baby-black mgl-20">
											{{el.title}}
										</view>
									</view>
									<view class="gray">
										{{index+1}} / {{babyData.commonSenseList.length}}
									</view>
								</view>
								<view class="gray sigle-line-text-2">
									{{el.description}}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="guide-list pd-box">
					<view class="item" v-for="(el,i) in babyData.guideList" :key="i" @click="goGuideDetail(el)">
						<view class="title baby-black blod">
							{{el.title}}
						</view>
						<view class="flex pd-box">
							<image :src="item" mode="widthFix" v-for="(item,index) in el.imageArr" :key="index" class="image"></image>
						</view>
					</view>
					<view class="cut-off-line"></view>
				</view>
				<view class="famous-content pd-box">
					<view class="flex-r-between" @click="goFamousRelevance">
						<text class="baby-gray" v-if="babyData.babyInfo.type==0">备孕大V相关内容</text>
						<text class="baby-gray" v-if="babyData.babyInfo.type==1">孕早期大V相关内容</text>
						<text class="baby-gray" v-if="babyData.babyInfo.type==2">本月龄大V相关内容</text>
						<image src="/static/task_list_ic_arrow@3x.png" mode="widthFix" class="icon-arrow"></image>
					</view>
				</view>
				<view class="cut-off"></view>
				<view class="question-list">
					<view class="flex-r-between ">
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==0">备孕常见问题</text>
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==1">孕早期常见问题</text>
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==2">本月龄常见育儿问题</text>
						<text class="baby-gray" @click="goMoreQuestion">更多</text>
					</view>
					<view class="list">
						<view class="item flex-r-between" v-for="(el,i) in babyData.commonQuestionList" :key="i" @click="goHelpDetail(el)">
							<text class="baby-font-size  name">{{el.questionName}}</text>
							<image src="/static/task_list_ic_arrow@3x.png" mode="widthFix" class="icon-arrow"></image>
						</view>
					</view>
				</view>
				<view class="cut-off"></view>
				<view class="files-list">
					<view class="flex-r-between">
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==0">备孕适用文库</text>
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==1">孕早期适用文库</text>
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==2">本月龄适用育儿文库</text>
						<text class="baby-gray" @click="goMoreFile">更多</text>
					</view>
					<view class="list">
						<view class="item flex-r-between" v-for="(el,i) in babyData.fileList" :key="i" @click="goFileDetail(el)">
							<text class="baby-font-size  name">{{el.fileName}}</text>
							<view class="btn white flex-r-center">
								打开
							</view>
						</view>
					</view>
				</view>
				<view class="cut-off"></view>
				<view class="task-list">
					<view class="">
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==0">备孕每日任务</text>
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==1">孕早期每日任务</text>
						<text class="baby-black blod title" v-if="babyData.babyInfo.type==2">本月龄每日任务</text>
					</view>
					<view class="list">
						<view class="list-item bg-white flex-r-between" style="padding-right: 0;" v-for="(el,i) in babyData.taskList"
						 :key="i" @click="goTaskDetail(el,i)">
							<image src="/static/task/dailytasks_card_ic_integral2@3x.png" mode="widthFix" class="icon"></image>
							<view class="item-c">
								<view class="task-name align-left">
									{{el.taskName}}
								</view>
								<view class="point">
									任务积分<text class="small mgl-10">x</text>{{el.taskPoint}}
								</view>
							</view>
							<view class="item-r flex-r-between" v-if="!el.completeStatus">
								<text class="task-color">去完成</text>
								<image src="/static/task_list_ic_arrow@3x.png" class="iconarrow-right" mode="widthFix"></image>
							</view>
							<view class="item-r flex-r-between" v-if="el.completeStatus">
								<view class="">
								</view>
								<text class="gray">已完成</text>
							</view>
						</view>
					</view>
				</view>
			<!-- </mix-pulldown-refresh> -->
		</view>
	</view>
</template>
<script>
	import babyInfoAdd from '@/components/babyInfo-add.vue'
	import myBabyList from '@/components/my-baby-list.vue'
	import myMixin from '@/common/mixins.js'
	import babyReferenceIcons from "@/components/baby-reference-icons.vue"
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh'; //下拉刷新组件
	export default {
		data() {
			return {
				enableScroll: true,
				isShowBabyInfoAdd: false,
				isShowBabyList: false,
				isShowLoginPop: false,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				StatusBar: this.StatusBar,
				ScreenHeight: this.screenHeight,
				WindowHeight: this.windowHeight,
				babyData: {
					babyInfo: {
						type: -1,
						babyNick: "",
						babySex: ""
					},
					guideList: [],
					commonSenseList: [],
					commonQuestionList: [],
					fileList: [],
					taskList: []
				}
			};
		},
		mixins: [myMixin.publicApi],
		components: {
			babyInfoAdd,
			myBabyList,
			babyReferenceIcons,
			mixPulldownRefresh
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: "了解更多育儿专业知识",
				path: '/pages/child/index/index',
				imageUrl: '/static/logo.png'
			};
		},
		onLoad(options) {
			uni.$on('changeBabyType', this.changeBabyType)
			uni.$on('loginSucceed', this.loginSucceed)
			if (uni.getStorageSync('access_token')) {
				this.loginSucceed();
			} else {
				this.isShowBabyInfoAdd = true;
				this.isShowLoginPop = true;
			}
			if (options.guideId) {
				uni.navigateTo({
					url: '/pages/child/guide-detail/guide-detail?id=' + options.guideId
				});
			}
		},
		onShow() {

		},
		methods: {
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			},
			onPulldownReresh() {
				this.getBabyInfo('pull-down');
			},
			loginSucceed() {
				this.isShowLoginPop = false;
				this.changeBabyType()
			},
			changeBabyType() {
				if (this.hasBabyInfoData()) {
					this.isShowBabyInfoAdd = false;
					this.getBabyInfo()
				} else {
					this.isShowBabyInfoAdd = true;
				}
			},
			getBabyInfo(type) {
				uni.showLoading({
					title: "加载中"
				})
				this.getBabyIdAndType();
				this.api.child.get_info_by_baby({
					id: this.babyInfoId,
					type: this.babyInfoType
				}, res => {
					res.data.guideList = res.data.guideList.map((el, i) => {
						el.imageArr = el.urls.split(',')
						el.imageArr = el.imageArr.slice(0, 4)
						return el
					})
					this.babyData = res.data;
					console.log(this.babyData)
					uni.hideLoading();
					if (type == 'pull-down') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					}
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
			},
			goFileDetail(el) {
				this.openFile(el.fileUrl) //混入函数
			},
			goHelpDetail(el) {
				uni.navigateTo({
					url: '/pages/helper/list/list?id=' + el.questionId
				})
			},
			goTaskDetail(el) {
				uni.navigateTo({
					url: '/pages/task/detail/detail?id=' + el.taskId + '&taskNo=' + el.taskNo
				})
			},
			goMoreFile() {
				uni.navigateTo({
					url: '/pages/child/more-file/more-file'
				})
			},
			goMoreQuestion() {
				uni.navigateTo({
					url: '/pages/child/more-question/more-question'
				})
			},
			goFamousRelevance() {
				uni.navigateTo({
					url: '/pages/child/celebrity-relevance/celebrity-relevance'
				})
			},
			goGuideDetail(el){
				uni.navigateTo({
					url: '/pages/child/guide-detail/guide-detail?id='+el.id
				})
			}

		}

	}
</script>
<style lang="scss">
	.header-custom {
		padding: 40upx 240upx 0 30upx;
		background-color: #FFFFFF;
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

		.baby-2 {
			display: flex;
			align-items: flex-end;

			&-name {
				display: flex;
				align-items: flex-start;

				.sex-icon {
					width: 30upx;
				}
			}

			.months {
				font-size: 28upx;
			}
		}

		.baby-1 {}
	}



	.main {

		.sense-swiper-box {
			box-shadow: 0px 8upx 30upx 0px rgba(0, 0, 0, 0.35);
			width: 100%;
			height: 190upx;
			border-radius: 15upx;

			.swiper-item {
				.arrow-icon {
					width: 10upx;
				}

				.title {
					font-size: 32upx;
				}

				.gray {
					font-size: 26upx;
					color: #A3A3A3;
				}

				.sigle-line-text-2 {
					line-height: 30upx;
					margin-top: 20upx;
				}
			}
		}
	}

	.icon-arrow {
		width: 15upx;
	}

	.guide-list {
		.item {
			.title {
				font-size: 32upx;
			}

			.image {
				width: 125upx;
				height: 125upx;
				border-radius: 10upx;
				margin-right: 30upx;
			}
		}

		.cut-off-line {
			width: 100%;
			height: 2upx;
			background-color: #EEEEEE;
		}
	}

	.question-list,
	.files-list,
	.task-list {
		padding: 30upx;

		.title {
			font-size: 34upx;
		}

		.list {
			margin-top: 20upx;

			.item {
				letter-spacing: 2upx;
				margin-top: 10upx;

				.name {
					width: 90%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: left;
				}

				.btn {
					width: 80upx;
					height: 42upx;
					background-color: #FC4041;
					border-radius: 21upx;
					font-size: 24upx;
				}
			}

			.list-item {
				margin-top: 30upx;

				.icon {
					width: 70upx;
				}

				.item-c {
					width: 55%;

					.task-name {
						font-size: 30upx;
						color: #090909;
						font-weight: 500;
					}

					.point {
						color: #FF893D;
						font-size: 24upx;
					}
				}

				.item-r {
					width: 20%;

					.iconarrow-right {
						width: 15upx;
					}
				}
			}
		}
	}
</style>
