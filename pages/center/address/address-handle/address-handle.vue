<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isDelete="true" v-on:deleteHandle="deleteHandle" v-if="model.addrId">
			<block slot="backText"></block>
			<block slot="content">{{ cuText }}</block>
		</cu-custom>
		<cu-custom bgColor="bg-gradual-red" :isBack="true" v-else>
			<block slot="backText"></block>
			<block slot="content">{{ cuText }}</block>
		</cu-custom>
		<form @submit="formSubmit">
			<mpvue-city-picker
				:themeColor="themeColor"
				ref="mpvueCityPicker"
				:pickerValueDefault="cityPickerValueDefault"
				@onCancel="onCancel"
				@onConfirm="onConfirm"
				:addressList="addressList"
			></mpvue-city-picker>
			<view class="bg-white list-box">
				<view class="list-cell flex-r-between pd-box">
					<view class="list-cell-left ">收货人</view>
					<view class="list-cell-right">
						<input type="text" class="align-right" v-model="model.name" name="name" placeholder-class="gray" placeholder="请填写姓名" />
					</view>
				</view>
				<view class="list-cell flex-r-between pd-box">
					<view class="list-cell-left ">联系电话</view>
					<view class="list-cell-right">
						<input type="number" class="align-right" v-model="model.phone" name="phone" placeholder-class="gray" placeholder="请填写电话" />
					</view>
				</view>
				<view class="list-cell flex-r-between pd-box">
					<view class="list-cell-left ">所在地区</view>
					<view class="list-cell-right" @click="showMulLinkageThreePicker">
						{{ address }}
						<input type="text" name="province" v-model="model.province" v-show="false" />
					</view>
				</view>
				<view class="list-cell pd-box">
					<view class="list-cell-left ">详细地址</view>
					<view class="list-cell-right" style="margin-top: 20upx;">
						<view class="uni-textarea"><textarea placeholder="请输入街道门牌号" placeholder-class="gray" v-model="model.address" name="address" /></view>
					</view>
				</view>
			</view>
			<view class="flex-r-between bg-white pd-box">
				<text class="blod">设置为默认地址</text>
				<switch :checked="model.isDefault == 1" class="red" @change="switchChange" />
			</view>
			<view class="fixed-bottom fixed-bottom-height flex-r-center bg-default-color">
				<button class="btn-submit flex-r-center bg-default-color white" plain="none" formType="submit" type="primary" hover-class="none">{{confrimText}}</button>
			</view>
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
				addrId: '',
				name: '',
				phone: '',
				province: '',
				city: '',
				district: '',
				address: null,
				isDefault: 0,
				zip: 0
			},
			cuText: '',
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			address: '请选择省市区',
			addressList: [],
			confrimText:""
		};
	},
	onLoad(options) {
		console.log(options.id)
		if (options.id) {
			this.confrimText="保存"
			this.model.addrId = options.id;
			this.cuText = '编辑地址';
			this.api.center.address.get_list(null, res => {
				console.log(res);
				this.model = res.data.find(el => {
					return el.addrId == options.id;
				});
				this.address=this.model.provinceName+'-'+this.model.cityName+'-'+this.model.districtName
			});
		} else {
			this.cuText = '创建地址';
			this.confrimText="创建"
		}
	},
	methods: {
		init() {
			// 获取到后台的省市区数据
			// this.api.center.address.get_region(null, res => {
			// 	console.log(res.data)
			// 	let arr1=[],cityData=[],area=[]
			// 	arr1 = res.data.map((el) => {
			// 		return {
			// 			"label": el.name,
			// 			"value": el.id
			// 		}
			// 	})
			// 	// console.log(JSON.stringify(arr1))
			// 	cityData = res.data.map((el) => {
			// 		return el.city.map((item) => {
			// 			return {
			// 				"label": item.name,
			// 				"value": item.id
			// 			}
			// 		})
			// 	})
			// 	area=res.data.map((el) => {
			// 		return el.city.map((item) => {
			// 			return item.district.map((sub)=>{
			// 				return {
			// 					"label": sub.name,
			// 					"value": sub.id
			// 				}
			// 			})
			// 		})
			// 	})
			// 	// console.log(JSON.stringify(area))
			// })
		},
		sexChange(e) {
			this.model.sex = e.detail.value;
		},
		switchChange(e) {
			if (e.detail.value) {
				this.model.isDefault = 1;
			} else {
				this.model.isDefault = 0;
			}
		},
		// 三级联动选择
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onConfirm(e) {
			console.log(e);
			this.address = e.label;
			this.model.province = e.province;
			this.model.city = e.city;
			this.model.district = e.district;
		},
		onCancel() {},
		deleteHandle() {
			uni.showModal({
				title: '是否确认删除',
				content: '删除后数据将不再保存',
				success: res => {
					if (res.confirm) {
						this.api.center.address.deleted(
							{
								addrId: this.model.addrId
							},
							res => {
								uni.showToast({
									title: '删除成功',
									success: () => {
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											});
										}, 1000);
									}
								});
							}
						);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		async formSubmit(e) {
			var rule = [
				{
					name: 'name',
					checkType: 'string',
					checkRule: '1,10',
					errorMsg: '姓名在1到10字符'
				},
				{
					name: 'phone',
					checkType: 'phoneno',
					checkRule: '',
					errorMsg: '请输入正确的手机号码'
				},
				{
					name: 'address',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '请输入详细地址'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				if (this.model.province) {
					console.log(this.model);
					if (this.model.addrId) {
						//编辑地址
						this.api.center.address.update(this.model, res => {
							console.log(res);
							uni.showToast({
								title: '修改成功',
								success: () => {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										});
									}, 1000);
								}
							});
						});
					} else {
						//添加地址
						this.api.center.address.add(this.model, res => {
							console.log(res);
							uni.showToast({
								title: '添加成功',
								success: () => {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										});
									}, 1000);
								}
							});
						});
					}
				} else {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					});
				}
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

<style lang="scss">
.container {
	background-color: #f8f8f8;
	height: 100%;
}
.list-box {
	background-color: white;
	padding-left: 30upx;
	margin: 30upx 0;

	.list-cell {
		background-color: #ffffff;
		border-bottom: 2upx solid #f5f5f5;
	}
}
// 	.list-box {
// 		margin: 30upx 0;
// 		padding-left: 30upx;
// 	}
//
// 	.list-cell {
// 		display: flex;
// 		flex-direction: row;
// 		background-color: #ffffff;
// 		position: relative;
// 		padding: 20upx 0;
// 		border-bottom: 2upx solid #cccccc;
//
// 		.list-cell-left {
// 			display: flex;
// 			width: 200upx !important;
// 			align-items: center;
// 			font-weight: bold;
// 		}
//
// 		.list-cell-right {
// 			display: flex;
// 			flex-direction: row;
// 			align-items: center;
// 			width: calc(100% - 200upx);
// 		}
// 	}

/* .list-cell:after {
		position: absolute;
		left: 30upx;
		bottom: -2upx;
		right: 30upx;
		content: "";
		border-bottom: 2upx solid #CCCCCC;
	} */

.btn-submit {
	width: 100%;
	height: 100%;
	border: 0 !important;
	padding: 0;
	margin: 0;
	color: white !important;
}
</style>
