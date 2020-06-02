<template>
	<view class="container" v-show="show">
		<login-pop :show="showLoginPop" v-on:hideLoginPop="hideLoginPop"></login-pop>
		<image src="https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_pic_bg@3x.png" mode="widthFix" class="header-img"></image>
		<view class="pd-box">
			<view class="main" @click="checkLogin">
				<view class="align-center baby-black main-title blod pd-box">
					完善宝宝信息获取更精准的内容
				</view>
				<view class="icon-box flex-r-around">
					<view class="flex-c-center" v-for="(el,i) in tabs" :key="i" @click="tabHandle(i)">
						<image :src="el.selSrc" mode="widthFix" class="icon" v-show="el.active"></image>
						<image :src="el.preSrc" mode="widthFix" class="icon" v-show="!el.active"></image>
						<view class="icon-title" :class="{'sel-col blod':el.active}">
							{{el.title}}
						</view>
					</view>
				</view>
				<view class="pd-box list0" v-show="tabIndex==0">
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							末次月经开始时间
						</view>
						<view class="list-cell-right">
							<picker mode="date" :end="today" name="lastMensesDate" @change="lastMensesDateChange">
								<view class="flex-r-center">
									<view class="gray">
										{{from0Desc.lastMensesDateDesc}}
									</view>
									<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							月经持续天数
						</view>
						<view class="list-cell-right ">
							<picker :range="mensesDaysArr" name="mensesDays" value="3" @change="mensesDaysChange">
								<view class="flex-r-center">
									<view class="gray">
										{{from0Desc.mensesDaysDesc}}
									</view>
									<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							月经周期
						</view>
						<view class="list-cell-right ">
							<picker :range="mensesCycleArr" value="10" name="mensesCycle" @change="mensesCycleChange">
								<view class="flex-r-center">
									<view class="gray">
										{{from0Desc.mensesCycleDesc}}
									</view>
									<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
								</view>
							</picker>
						</view>
					</view>
					<view @click="from0Submit" class="flex-r-center sub-btn baby-font-size">
						提交信息
					</view>
				</view>
				<view class="pd-box list1" v-show="tabIndex==1">
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							预产期
						</view>
						<view class="list-cell-right ">
							<picker mode="date" :start="today" name="birthExpected" @change="birthExpectedChange">
								<view class="flex-r-center">
									<view class="gray">
										{{from1Desc.birthExpectedDesc}}
									</view>
									<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
								</view>
							</picker>
						</view>
					</view>
					<view @click="from1Submit" class="flex-r-center sub-btn baby-font-size" style="margin-top: 120upx;">
						提交信息
					</view>
				</view>
				<view class="pd-box list2" v-show="tabIndex==2">
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							宝宝昵称
						</view>
						<view class="list-cell-right ">
							<input type="text" name="babyNick" maxlength="10" placeholder-class="gray" style="text-align: right;padding-right: 30upx;"
							 v-model="from2.babyNick" placeholder="请输入" />
						</view>
					</view>
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							宝宝性别
						</view>
						<radio-group class="list-cell-right flex-r-between" style="width: auto;" @change="babySexChange">
							<label class="radio  flex-r-center">
								<radio value="1" name="babySex" class="red" :checked="from2.babySex==1" style="transform:scale(0.7);" />
								<text class="mgl-10">小王子</text>
							</label>
							<label class="radio flex-r-center" style="padding-right: 0;">
								<radio value="2" name="babySex" class="red" :checked="from2.babySex==2" style="transform:scale(0.7);" />
								<text class="mgl-10">小公主</text>
							</label>
							<!-- <picker @change="sexChange" v-model="from.sexText" range-key="name" :range="sex">
								<view class="">{{from.sexText}}</view>
							</picker> -->
						</radio-group>
					</view>
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							宝宝出生年月
						</view>
						<view class="list-cell-right ">
							<picker mode="date" :end="today" @change="babyBirthdayChange">
								<view class="flex-r-center">
									<view class="gray">
										{{from2Desc.babyBirthdayDesc}}
									</view>
									<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
								</view>
							</picker>
						</view>
					</view>
					<view class="list-cell flex-r-between">
						<view class="list-cell-left blod">
							早产时间 (如有)
						</view>
						<view class="list-cell-right ">
							<picker :range="babyPrematureArr" name="babyPremature" @change="babyPrematureChange">
								<view class="flex-r-center">
									<view class="gray">
										{{from2Desc.babyPrematureDesc}}
									</view>
									<image src="/static/com_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
								</view>
							</picker>
						</view>
					</view>
					<view @click="from2Submit" class="flex-r-center sub-btn baby-font-size">
						提交信息
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let graceChecker = require("@/common/plugs/graceChecker.js");
	let date = new Date();
	date.setTime(date.getTime());
	date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	import babyData from '@/common/util/baby-data.js'
	import loginPop from '@/components/login-pop.vue'
	import myMixin from '@/common/mixins.js'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			showLoginPop: {
				type: Boolean,
				default: false
			}
		},
		components: {
			loginPop
		},
		mixins: [myMixin.publicApi],
		name: 'baby-info-add',
		data() {
			return {
				tabIndex: 0,
				tabs: [{
						active: true,
						preSrc: 'https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_ic_ready_nor@3x.png',
						selSrc: 'https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_ic_ready_sel@3x.png',
						title: "备孕中"
					},
					{
						active: false,
						preSrc: 'https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_ic_already_nor_pre@3x.png',
						selSrc: 'https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_ic_already_sel@3x.png',
						title: "怀孕中"
					},
					{
						active: false,
						preSrc: 'https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_ic_birth_nor@3x.png',
						selSrc: 'https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_top_ic_birth_sel@3x.png',
						title: "已出生"
					}
				],
				isLogin: false,
				today: date,
				mensesDaysArr: babyData.mensesDaysArr,
				mensesCycleArr: babyData.mensesCycleArr,
				babyPrematureArr: babyData.babyPrematureArr,
				from0: {
					lastMensesDate: "",
					mensesDays: "",
					mensesCycle: "",
					type: 0
				},
				from0Desc: {
					lastMensesDateDesc: "请选择",
					mensesDaysDesc: "请选择",
					mensesCycleDesc: "请选择",
				},
				from1: {
					birthExpected: "",
					type: 1
				},
				from1Desc: {
					birthExpectedDesc: "请选择",
				},
				from2: {
					babyNick: "",
					babySex: 1,
					babyBirthday: "",
					babyPremature: "",
					type: 2
				},
				from2Desc: {
					babyNickDesc: "请选择",
					babyBirthdayDesc: "请选择",
					babyPrematureDesc: "请选择",
				},
				disable: false,
			};
		},
		onLoad() {

		},
		methods: {
			tabHandle(index) {
				this.tabs.forEach((el, i) => {
					el.active = false
				})
				this.tabs[index].active = true;
				this.tabIndex = index;
			},
			checkLogin() {
				this.isLogin = uni.getStorageSync('access_token') ? true : false
				if (!this.isLogin) {
					this.$emit('showLoginPop');
				}
			},
			hideLoginPop() {
				this.$emit('hideLoginPop');
			},
			lastMensesDateChange(e) {
				this.from0.lastMensesDate = (new Date(e.detail.value)).getTime();
				this.from0Desc.lastMensesDateDesc = e.detail.value;
			},
			mensesDaysChange(e) {
				this.from0.mensesDays = this.mensesDaysArr[e.detail.value].replace('天', '');
				this.from0Desc.mensesDaysDesc = this.mensesDaysArr[e.detail.value];
			},
			mensesCycleChange(e) {
				this.from0.mensesCycle = this.mensesCycleArr[e.detail.value].replace('周', '');
				this.from0Desc.mensesCycleDesc = this.mensesCycleArr[e.detail.value];
			},
			birthExpectedChange(e) {
				this.from1.birthExpected = (new Date(e.detail.value)).getTime();
				this.from1Desc.birthExpectedDesc = e.detail.value;
			},
			babySexChange(e) {
				this.from2.babySex = e.target.value
			},
			babyBirthdayChange(e) {
				this.from2.babyBirthday = (new Date(e.detail.value)).getTime();
				this.from2Desc.babyBirthdayDesc = e.target.value
			},
			babyPrematureChange(e) {
				this.from2.babyPremature = parseInt(e.target.value) ? parseInt(e.target.value) : "";
				this.from2Desc.babyPrematureDesc = parseInt(e.target.value) ? e.target.value + '周' : "无";
			},
			from0Submit() {
				let rule0 = [{
						name: "lastMensesDate",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择末次月经开始时间"
					},
					{
						name: "mensesDays",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择月经持续天数"
					},
					{
						name: "mensesCycle",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择月经周期"
					}
				];
				let checkRes = graceChecker.check(this.from0, rule0);
				if (checkRes) {
					this.babyInfoAdd(this.from0)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			from1Submit() {
				let rule1 = [{
					name: "birthExpected",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请选择预产期"
				}];
				let checkRes = graceChecker.check(this.from1, rule1);
				if (checkRes) {
					this.babyInfoAdd(this.from1)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			from2Submit() {
				let rule2 = [{
						name: "babyNick",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "请输入1到10个字符昵称"
					},
					{
						name: "babyBirthday",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择宝宝出生年月"
					}
				];
				let checkRes = graceChecker.check(this.from2, rule2);
				if (checkRes) {
					this.babyInfoAdd(this.from2)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			babyInfoAdd(data) {
				console.log(data)
				if (!this.disable) { //防止点击多下
					this.disable = true;
					this.api.center.manage.baby.handle(data, res => {
						console.log(res)
						uni.showToast({
							title: "提交成功",
							success: async () => {
								await this.saveBabyInfoData();
								uni.$emit('changeBabyType');
								this.$emit('hideBabyInfoAdd');
							}
						})
					}, err => {
						this.disable = false;
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;



		.header-img {
			width: 100% !important;
		}

		.main {
			width: 100%;
			position: relative;
			top: -160upx;
			left: 0;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 90upx 0px rgba(0, 0, 0, 0.3);
			border-radius: 20upx;
			padding: 20upx 0;

			.main-title {
				font-size: 32upx;
			}

			.icon-box {
				margin-top: 20upx;

				.icon {
					width: 100upx;
				}

				.icon-title {
					font-size: 26upx;
					color: #555555;
					margin-top: 10upx;
				}

				.sel-col {
					color: #FC4041;
				}
			}

			.list-cell {
				border-bottom: 2upx solid #F5F5F5;
				padding: 30upx 0;
				font-size: 32upx;

				.icon {
					width: 50upx;
				}
			}

			.sub-btn {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: white;
				background-color: #FC4041;
				margin-top: 40upx;
			}
		}

	}
</style>
