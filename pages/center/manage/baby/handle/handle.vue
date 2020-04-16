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
					宝宝昵称
				</view>
				<view class="list-cell-right">
					<input type="text" name="babyNick" class="align-right" placeholder="请输入" v-model="from.babyNick" maxlength="10" />
				</view>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝性别
				</view>
				<radio-group class="list-cell-right flex-r-between" style="width: auto;" @change="sexChange">
					<label class="radio  flex-r-center">
						<radio value="1" name="babySex" class="red" :checked="from.babySex==1" style="transform:scale(0.9);" />
						<text class="mgl-10">小王子</text>
					</label>
					<label class="radio flex-r-center" style="padding-right: 0;">
						<radio value="2" name="babySex" class="red" :checked="from.babySex==2" style="transform:scale(0.9);" />
						<text class="mgl-10">小公主</text>
					</label>
				</radio-group>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝出生年月
				</view>
				<view class="list-cell-right ">
					<picker mode="date" name="babyBirthday" :end="endDate" @change="babyBirthdayChange">
						<view class="">{{fromText.babyBirthdayText}}</view>
					</picker>
				</view>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					早产时间（如有）
				</view>
				<view class="list-cell-right ">
					<picker :range="babyPrematureArr" name="babyPremature" @change="babyPrematureChange">
						<view class="">{{fromText.babyPrematureText}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="fixed-bottom fixed-bottom-height bg-default-color white font-b flex-r-center" @click="confrim">
			{{confirmText}}
		</view>
	</view>
</template>

<script>
	let id;
	var graceChecker = require("../../../../../common/plugs/graceChecker.js");
	import babyData from '@/common/util/baby-data.js'
	import {
		transformDateTo
	} from '@/common/util/date.js';
	import myMixin from '@/common/mixins.js'
	export default {
		mixins: [myMixin.publicApi],
		data() {
			return {
				cuText: "",
				confirmText: "",
				from: {
					babyNick: "",
					babySex: 1,
					babyBirthday: "",
					type: 2,
					babyPremature: "",
					id: ""
				},
				babyPrematureArr: babyData.babyPrematureArr,
				fromText: {
					babyBirthdayText: "请选择",
					babyPrematureText: "请选择"
				},
				isEdit: false,
				disable: false
			}
		},
		onLoad(options) {
			this.cuText = !options.id ? "新的宝宝" : "修改资料"
			this.confirmText = !options.id ? "确认添加" : "确认修改"
			this.isEdit = !options.id ? false : true
			id = options.id ? options.id : ""
			if (id) {
				this.api.center.manage.baby.get_list_baby(null, res => {
					this.from = res.data.find((el) => {
						return el.id == id
					})
					console.log(this.from)
					this.fromText.babyBirthdayText = transformDateTo(this.from.babyBirthday);
					this.fromText.babyPrematureText = this.from.babyPremature ? this.from.babyPremature + '周' : '无';
				})
			}
		},
		computed: {
			endDate() {
				return this.getDate();
			}
		},
		methods: {
			sexChange(e) {
				this.from.babySex = e.target.value
			},
			babyBirthdayChange(e) {
				this.from.babyBirthday = (new Date(e.detail.value)).getTime();
				this.fromText.babyBirthdayText = e.target.value
			},
			babyPrematureChange(e) {
				console.log(e.target.value)
				this.from.babyPremature = parseInt(e.target.value) ? parseInt(e.target.value) : "";
				this.fromText.babyPrematureText = parseInt(e.target.value) ? e.target.value + '周' : "无";
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
								type: 2
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
				var rule = [{
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
				var checkRes = graceChecker.check(this.from, rule);
				console.log(this.from)
				if (checkRes) {
					if (!this.disable) { //防止点击多下
						this.disable = true;
						this.from.type = 2;
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
