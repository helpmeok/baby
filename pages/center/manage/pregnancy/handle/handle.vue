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
					<picker mode="date" :value="from.birthdayText" :start="startDate" :end="endDate" @change="birthdayChange">
						<view class="">{{from.birthdayText}}</view>
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
	export default {
		data() {
			return {
				cuText: "",
				confirmText: "",
				from: {
					birthday: "",
					birthdayText: "请选择日期",
					state: 0
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
				disable: false
			}
		},
		onLoad(options) {
			this.cuText = !options.id ? "新的孕期" : "修改孕期"
			this.confirmText = !options.id ? "确认添加" : "确认修改"
			this.isEdit = !options.id ? false : true
			id = options.id ? options.id : ""
			if (id) {
				this.api.center.manage.baby.get_list({
					state: 0
				}, res => {
					console.log(res)
					this.from = res.data.find((el) => {
						return el.babyInfoId == id
					})
					console.log(this.from)
					if (this.from.birthday) {
						this.birthday = true;
						this.from.birthdayText = this.from.birthday;
					} else {
						this.from.birthdayText = "请选择日期";
					}
				})
			}
		},
		computed: {
			endDate() {
				return this.getDate(1);
			},
			startDate() {
				return this.getDate(0);
			}
		},
		methods: {
			pregnancyChange(e) {
				console.log(e.target.value)
				if (e.target.value == 1) {
					this.birthday = false

				} else {
					this.birthday = true
				}
			},
			birthdayChange(e) {
				this.from.birthday = e.target.value
				this.from.birthdayText = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear() + type;
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			deleteHandle() {
				console.log('1111')
				uni.showModal({
					title: '是否确认删除',
					content: '删除后数据将不再保存',
					success: (res) => {
						if (res.confirm) {
							this.api.center.manage.baby.delete({
								babyInfoId: id
							}, res => {
								uni.showToast({
									title: "删除成功",
									success: () => {
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 1000)
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
				if (this.birthday) {
					if (!this.from.birthday) {
						uni.showToast({
							title: "请输入宝宝生日",
							icon: "none"
						})
						return
					}
				} else {
					this.from.birthday = "";
					this.from.birthdayText = "请选择日期";
				}
				if (this.isEdit) {
					this.from.babyInfoId = id;
					console.log(this.from)
					this.api.center.manage.baby.update(this.from, res => {
						console.log(res)
						uni.showToast({
							title: "修改成功",
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
					})
				} else {
					if (!this.disable) { //防止点击多下
						this.disable = true;
						this.api.center.manage.baby.add(this.from, res => {
							console.log(res)
							uni.showToast({
								title: "添加成功",
								success: () => {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}
							})
						})
					}
				}
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
