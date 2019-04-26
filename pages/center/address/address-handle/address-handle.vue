<template>
	<view>
		<form @submit="formSubmit">
			<view class="list-cell">
				<view class="list-cell-left ">收货人</view>
				<view class="list-cell-right"><input type="text" v-model="model.consignee" name="consignee" placeholder-class="gray" placeholder="请填写姓名" /></view>
			</view>
			<view class="list-cell">
				<view class="list-cell-left ">联系电话</view>
				<view class="list-cell-right"><input type="number" v-model="model.mobile" name="mobile" placeholder-class="gray" placeholder="请填写电话" /></view>
			</view>
			<view class="list-cell">
				<view class="list-cell-left ">所在地区</view>
				<view class="list-cell-right" @click="showMulLinkageThreePicker">
					{{ address }}
					<input type="text" name="province" v-model="model.province" v-show="false" />
				</view>
			</view>
			<view class="list-cell">
				<view class="list-cell-left ">详细地址</view>
				<view class="list-cell-right"><input type="text" v-model="model.address" name="address" placeholder-class="gray" placeholder="请输入街道门牌号" /></view>
			</view>
			<view class="fixed-bottom flex-r-center"><button class="btn-submit white blod" formType="submit" type="primary">保存</button></view>
			<switch :checked="model.is_default == 1" @change="switchChange" color="#FC4041" style="margin: 20upx;" />
			<text class="blod">设置为默认地址</text>
			<mpvue-city-picker
				:themeColor="themeColor"
				ref="mpvueCityPicker"
				:pickerValueDefault="cityPickerValueDefault"
				@onCancel="onCancel"
				@onConfirm="onConfirm"
			></mpvue-city-picker>
		</form>
	</view>
</template>

<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
import graceChecker from '@/common/plugs/graceChecker.js';
export default {
	components: {
		mpvueCityPicker
	},
	data() {
		return {
			model: {
				id: 0,
				consignee: '',
				mobile: '',
				province: '',
				city: '',
				area: '',
				address: '',
				is_default: 0,
				sort: 0,
				sex: 1
			},
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			address: '请选择省市区',
			edit: false,
			id: ''
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			uni.setNavigationBarTitle({
				title: '编辑地址'
			});
			this.api.center.address.info(
				{
					id: options.id
				},
				res => {
					console.log(res);
					this.model = res.data;
					this.address = res.data.province + '-' + res.data.city + '-' + res.data.area;
				},
				err => {}
			);
			this.edit = true;
		} else {
			uni.setNavigationBarTitle({
				title: '创建地址'
			});
		}
	},
	methods: {
		sexChange(e) {
			this.model.sex = e.detail.value;
		},
		switchChange(e) {
			if (e.detail.value) {
				this.model.is_default = 1;
			} else {
				this.model.is_default = 0;
			}
		},
		// 三级联动选择
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onConfirm(e) {
			console.log(e);
			this.address = e.label;
			this.model.province = e.label.split('-')[0];
			this.model.city = e.label.split('-')[1];
			this.model.area = e.label.split('-')[2];
			console.log(this.model);
		},
		async formSubmit(e) {
			var rule = [
				{
					name: 'consignee',
					checkType: 'string',
					checkRule: '1,10',
					errorMsg: '称呼应为1-10个字符'
				},
				{
					name: 'sex',
					checkType: 'in',
					checkRule: '1,2',
					errorMsg: '请选择性别'
				},
				{
					name: 'mobile',
					checkType: 'phoneno',
					checkRule: '',
					errorMsg: '请输入正确的手机号码'
				},
				{
					name: 'province',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '请选择地址'
				},
				{
					name: 'address',
					checkType: 'string',
					checkRule: '1,20',
					errorMsg: '详细地址应为1-20个字符'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			console.log(this.model);
			if (checkRes) {
				if (this.edit) {
					this.model.id = this.id;
				}
				this.api.center.address.handle(
					this.model,
					res => {
						console.log(res);
						uni.showToast({
							title: res.message,
							icon: 'success',
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1000);
							}
						});
					},
					err => {}
				);
			} else {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style>
.list-cell {
	width: 94%;
	margin-left: 3%;
	display: flex;
	flex-direction: row;
	background-color: #ffffff;
	position: relative;
	padding: 20upx 0;
	border-bottom: 2upx solid #cccccc;
}

/* .list-cell:after {
		position: absolute;
		left: 30upx;
		bottom: -2upx;
		right: 30upx;
		content: "";
		border-bottom: 2upx solid #CCCCCC;
	} */

.list-cell-left {
	display: flex;
	width: 200upx !important;
	align-items: center;
	font-weight: bold;
}

.list-cell-right {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: calc(100% - 200upx);
}

.btn-submit {
	width: 100%;
	height: 100%;
	background-color: #fc4041 !important;
	padding: 20upx 0;
}
</style>
