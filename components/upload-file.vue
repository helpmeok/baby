<template>
	<view class="cu-modal flex-r-center" :class="{'show':isShowUpFile}">
		<view class="cu-content bg-white">
			<view class="file">
				<view class="img-box flex-r-center">
					<image src="/static/home/home_file_pic_pdf@3x.png" mode="widthFix" class="icon1"></image>
				</view>
				<view class="desc pd-box">
					<image src="/static/home/home_file_pic_triangle@3x.png" mode="widthFix" class="icon2"></image>
					<view class="baby-black align-left blod sigle-line-text-2">
						{{fileData.name}}
					</view>
				</view>
			</view>
			<view class="font-b blod baby-black align-left">文件名</view>
			<view class="file-name-box border-bottom" style="padding: 10upx 0;">
				<input type="text" v-model="fileName" maxlength="20" adjust-position="false" placeholder="默认文件名为文档名字，用户可修改"
				 placeholder-class="gray" />
			</view>
			<view class="flex-r-between tag-age-box border-bottom">
				<view class="font-b blod baby-black">
					适用年龄
				</view>
				<picker @change="bindPickerChange" :value="index" :range="tagList" range-key="tagPoolName">
					<view class="flex">
						<view class="gray mgr-20">
							{{tagPoolName}}
						</view>
						<image src="/static/task_list_ic_arrow@3x.png" mode="widthFix" class="icon"></image>
					</view>
				</picker>
			</view>
			<view class="gray text-sm" style="margin: 20upx 0;">
				上传文件不得侵犯第三方产权，或来源于公开渠道
			</view>
			<view class="flex-r-between btn-box">
				<view class="btn-off btn flex-r-center baby-font-size" @click="hide">
					取消
				</view>
				<view class="btn-on btn flex-r-center baby-font-size" @click="confirm">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "upload-file",
		props: {
			isShowUpFile: {
				type: [Boolean, String],
				default: false
			},
			fileData:{
				type:Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				fileName: "",
				tagPoolName: "请选择",
				tagPoolId: "",
				tagList: [],
				index: 0,
			};
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				this.api.home.file.get_tag_list(null,res=>{
					console.log(res)
					this.tagList=res.data
				})
			},
			hide() {
				uni.showModal({
					title: '提示',
					content: '确定取消上传文件？',
					success: (res) => {
						if (res.confirm) {
							this.$emit('hideuploadFileProp')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.tagPoolName=this.tagList[this.index].tagPoolName;
				this.tagPoolId=this.tagList[this.index].tagPoolId;
			},
			confirm(){
				if (this.tagPoolId) {
					uni.showLoading({
						title: "上传中",
						mask:true
					})
					this.api.home.qa.get_qiuniu_info(null, async res => {
						let fileUrl = await this.api.qiniu.upload(this.fileData.path,res.data.uploadToken,res.data.serverUrl)
						let fileName = this.fileName?this.fileName:this.fileData.name
						this.api.home.file.upload({
							fileName: fileName,
							fileUrl: fileUrl,
							tagPoolId: this.tagPoolId
						}, res => {
							console.log(res)
							this.$emit('hideuploadFileProp');
							this.fileName="";
							this.tagPoolId="";
							this.index=0;
							this.tagPoolName="请选择";
							uni.showToast({
								'title': res.message
							})
						},err=>{
							uni.showToast({
								'title':"上传失败",
								'icon':"none"
							})
						})
					});
				}else{
					uni.showToast({
						title:"请选择适用月龄",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.cu-content {
		width: 80%;
		border-radius: 20upx;
		padding: 40upx 30upx;
		display: flex;
		flex-direction: column;

		.file {
			box-sizing: border-box;
			background-color: #f5f5f5;
			width: 100%;
			margin: 20upx 0;
			height: 140upx;
			display: flex;
			flex-direction: row;
			padding: 0;

			.img-box {
				width: 140upx;
				height: 140upx;
				background: linear-gradient(-30deg, rgba(255, 74, 69, 1) 0%, rgba(255, 111, 74, 1) 100%);

				.icon1 {
					width: 80upx;
					height: 80upx;
				}
			}

			.desc {
				box-sizing: border-box;
				position: relative;
				left: 0;
				top: 0;
				width: calc(100% - 140upx);
				height: 140upx;
				display: flex;
				align-items: center;
				color: #404040;

				.icon2 {
					position: absolute;
					right: 0;
					top: 0;
					width: 30upx;
				}
			}
		}

		.file-name-box {
			width: 100%;
			text-align: left;
			margin-top: 10upx;
		}

		.tag-age-box {
			padding: 20upx 0;

			.icon {
				width: 20upx;
			}
		}

		.btn-box {
			.btn {
				width: 48%;
				height: 80upx;
				border: 2upx solid #FC4041;
				border-radius: 40upx;
			}

			.btn-off {
				color: #FC4041;
			}

			.btn-on {
				color: #FFFFFF;
				background-color: #FC4041;
			}
		}
	}
</style>
