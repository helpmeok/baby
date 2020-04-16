<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isDelete="true" v-on:deleteHandle="deleteHandle" v-if="isEdit">
			<block slot="backText"></block>
			<block slot="content">{{cuText}}</block>
		</cu-custom>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" v-else>
			<block slot="backText"></block>
			<block slot="content">{{cuText}}</block>
		</cu-custom>
		<view class="bg-white list-box">
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					怀孕状态
				</view>
				<radio-group class="list-cell-right flex-r-center" style="width: auto;" @change="pregnancyChange">
					<label class="radio mgr-30 flex-r-center">
						<radio value="1" name="sex" class="red" :checked="!birthday" style="transform:scale(0.9);" />
						<text class="mgl-10">备孕中</text>
					</label>
					<label class="radio flex-r-center">
						<radio value="2" name="sex" class="red" :checked="birthday" style="transform:scale(0.9);" />
						<text class="mgl-10">已怀孕</text>
					</label>
					<!-- <picker @change="sexChange" v-model="from.sexText" range-key="name" :range="sex">
						<view class="">{{from.sexText}}</view>
					</picker> -->
				</radio-group>
			</view>
			<view class="list-cell flex-r-between pd-box" v-if="birthday">
				<view class="list-cell-left blod">
					预产期
				</view>
				<view class="list-cell-right ">
					<picker mode="date" name="birthExpected" :start="startDate"  @change="birthExpectedChange">
						<view class="">{{from1Desc.birthExpectedDesc}}</view>
					</picker>
				</view>
			</view>
			<view class="" v-else>
				<view class="list-cell flex-r-between pd-box">
					<view class="list-cell-left blod">
						末次月经开始时间
					</view>
					<view class="list-cell-right ">
						<picker mode="date" name="lastMensesDate" :end="startDate" @change="lastMensesDateChange">
							<view class="">{{from0Desc.lastMensesDateDesc}}</view>
						</picker>
					</view>
				</view>
				<view class="list-cell flex-r-between pd-box">
					<view class="list-cell-left blod">
						月经持续天数
					</view>
					<view class="list-cell-right ">
						<picker :range="mensesDaysArr" value="3" name="mensesDays"  @change="mensesDaysChange">
							<view class="">{{from0Desc.mensesDaysDesc}}</view>
						</picker>
					</view>
				</view>
				<view class="list-cell flex-r-between pd-box">
					<view class="list-cell-left blod">
						月经周期
					</view>
					<view class="list-cell-right ">
						<picker :range="mensesCycleArr" value="10" name="mensesCycle"  @change="mensesCycleChange">
							<view class="">{{from0Desc.mensesCycleDesc}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="gray small pd-box mgl-20">
			完善信息将有助于我们提供更加精准的备孕信息
		</view>
		<view class="fixed-bottom fixed-bottom-height bg-default-color white font-b flex-r-center" @click="confrim">
			{{confirmText}}
		</view>
	</view>
</template>

<script>
	let id;
	var graceChecker = require("@/common/plugs/graceChecker.js");
	import {
		transformDateTo
	} from '@/common/util/date.js';
	import babyData from '@/common/util/baby-data.js'
	import myMixin from '@/common/mixins.js'
	export default {
		mixins: [myMixin.publicApi],
		data() {
			return {
				cuText: "",
				confirmText: "",
				from: {

				},
				from1: {
					birthExpected: "",
					type: 1
				},
				from1Desc: {
					birthExpectedDesc: "请选择"
				},
				from0: {
					lastMensesDate: "",
					mensesCycle: "",
					mensesDays: "",
					type: 0
				},
				from0Desc: {
					lastMensesDateDesc: "请选择",
					mensesCycleDesc: "请选择",
					mensesDaysDesc: "请选择",
				},
				sex: [{
					name: "男",
					id: 1
				}, {
					name: "女",
					id: 2
				}],
				isEdit: false,
				birthday: false,
				disable: false,
				mensesDaysArr: babyData.mensesDaysArr,
				mensesCycleArr: babyData.mensesCycleArr,
			}
		},
		onLoad(options) {
			this.cuText = !options.id ? "新的孕期" : "修改孕期"
			this.confirmText = !options.id ? "确认添加" : "确认修改"
			this.isEdit = !options.id ? false : true
			id = options.id ? options.id : ""
			if (id) {
				this.api.center.manage.baby.get_list_pregnant(null, res => {
					console.log(res)
					this.from = res.data.find((el) => {
						return el.id == id
					})
					if (this.from.isPregnant) {
						this.birthday = true;
						this.from1Desc.birthExpectedDesc = transformDateTo(this.from.birthExpected);
						this.from1.birthExpected = this.from.birthExpected;
					} else {
						this.birthday = false;
						this.from0.lastMensesDate = this.from.lastMensesDate;
						this.from0.mensesCycle = this.from.mensesCycle;
						this.from0.mensesDays = this.from.mensesDays;
						this.from0Desc.lastMensesDateDesc = transformDateTo(this.from.lastMensesDate);
						this.from0Desc.mensesDaysDesc = this.from.mensesDays + '天';
						this.from0Desc.mensesCycleDesc = this.from.mensesCycle + '周';
					}
				})
			}
		},
		computed: {
			startDate() {
				return this.getDate();
			}
		},
		methods: {
			pregnancyChange(e) {
				if (e.target.value == 1) {
					this.birthday = false
				} else {
					this.birthday = true
				}
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
			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			deleteHandle() {
				uni.showModal({
					title: '是否确认删除',
					content: '删除后数据将不再保存',
					success: (res) => {
						if (res.confirm) {
							this.api.center.manage.baby.delete({
								id: id,
								type: 0
							}, res => {
								uni.showToast({
									title: "删除成功",
									success: () => {
										this.handleSucceed()
									}
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');

						}
					}
				});
			},
			confrim() {
				var rule1 = [{
					name: "birthExpected",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请选择预产期"
				}];
				var rule0 = [{
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
				if (!this.birthday) {
					var checkRes = graceChecker.check(this.from0, rule0);
					this.from = this.from0
				} else {
					var checkRes = graceChecker.check(this.from1, rule1);
					this.from = this.from1
				}
				console.log(this.from)
				if (checkRes) {
					if (!this.disable) { //防止点击多下
						this.disable = true;
						this.from.id = this.isEdit ? id : "";
						this.api.center.manage.baby.handle(this.from, res => {
							console.log(res)
							uni.showToast({
								title: this.isEdit ? "修改成功" : "添加成功",
								success: () => {
									this.handleSucceed()
								}
							})
						}, err => {
							this.disable = false;
						})
					}
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}

			},
			async handleSucceed() {
				await this.saveBabyInfoData();
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.list-box {
		background-color: white;
		padding-left: 20upx;
		margin-top: 20upx;

		.list-cell {
			background-color: #FFFFFF;
			border-bottom: 2upx solid #F5F5F5;
		}
	}
</style>
