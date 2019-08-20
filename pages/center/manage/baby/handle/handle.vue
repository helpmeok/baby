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
					<input type="text" class="align-right" placeholder="请输入昵称" v-model="from.name" maxlength="10" />
				</view>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝性别
				</view>
				<radio-group class="list-cell-right flex-r-between" style="width: auto;" @change="sexChange">
					<label class="radio  flex-r-center">
						<radio value="1" name="sex" class="red" :checked="from.sex==1" style="transform:scale(0.9);" />
						<text class="mgl-10">小王子</text>
					</label>
					<label class="radio flex-r-center" style="padding-right: 0;">
						<radio value="2" name="sex" class="red" :checked="from.sex==2" style="transform:scale(0.9);" />
						<text class="mgl-10">小公主</text>
					</label>
					<!-- <picker @change="sexChange" v-model="from.sexText" range-key="name" :range="sex">
						<view class="">{{from.sexText}}</view>
					</picker> -->
				</radio-group>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝生日
				</view>
				<view class="list-cell-right ">
					<picker mode="date" :value="from.birthdayText" :end="endDate" @change="birthdayChange">
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
					name: "",
					sex: "",
					birthday: "",
					birthdayText: "请选择日期",
					state: 1
				},
				sex: [{
					name: "男",
					id: 1
				}, {
					name: "女",
					id: 2
				}],
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
				this.api.center.manage.baby.get_list({
					state: 1
				}, res => {
					console.log(res)
					this.from = res.data.find((el) => {
						return el.babyInfoId == id
					})
					console.log(this.from)
					this.from.birthdayText = this.from.birthday;
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
				this.from.sex = e.target.value
			},
			birthdayChange(e) {
				this.from.birthday = e.target.value
				this.from.birthdayText = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
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
				if (!this.from.name) {
					uni.showToast({
						title: "请输入宝宝昵称",
						icon: "none"
					})
					return
				}
				if (!this.from.sex) {
					uni.showToast({
						title: "请选择宝宝性别",
						icon: "none"
					})
					return
				}
				if (!this.from.birthday) {
					uni.showToast({
						title: "请输入宝宝生日",
						icon: "none"
					})
					return
				}
				if (this.isEdit) {
					this.from.babyInfoId = id;
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
								mask: true,
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
