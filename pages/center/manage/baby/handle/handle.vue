<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{cuText}}</block>
		</cu-custom>
		<view class="bg-white list-box">
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝昵称
				</view>
				<view class="list-cell-right">
					<input type="text" class="align-right" placeholder="请输入昵称" v-model="from.name" />
				</view>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝性别
				</view>
				<view class="list-cell-right ">
					<picker @change="sexChange" v-model="from.sexText" range-key="name" :range="sex">
						<view class="">{{from.sexText}}</view>
					</picker>
				</view>
			</view>
			<view class="list-cell flex-r-between pd-box">
				<view class="list-cell-left blod">
					宝宝生日
				</view>
				<view class="list-cell-right ">
					<picker mode="date" :value="from.birthday"  :end="endDate" @change="birthdayChange">
						<view class="">{{from.birthday}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="fixed-bottom fixed-bottom-height bg-default-color white font-b flex-r-center">
			{{confirmText}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cuText: "",
				confirmText: "",
				from: {
					name: "",
					sex: "",
					sexText:"请选择性别",
					birthday: "请选择日期",
					state: 1
				},
				sex: [{
					name: "男",
					id: 1
				}, {
					name: "女",
					id: 2
				}]
			}
		},
		onLoad(options) {
			this.cuText = options.type == 0 ? "新的宝宝" : "修改资料"
			this.confirmText = options.type == 0 ? "确认添加" : "确认修改"
		},
		computed: {
			endDate() {
				return this.getDate();
			}
		},
		methods: {
			sexChange(e) {
				this.from.sex = this.sex[e.target.value].id
				this.from.sexText = this.sex[e.target.value].name
			},
			birthdayChange(e) {
				this.from.birthday=e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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
