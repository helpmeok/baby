<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{ id ? '我来回答' : '发布新问题' }}</block>
		</cu-custom>
		<view class="question-box" v-if="id">
			<view class="question">
				<image src="/static/assistant_list_ic_question@2x.png" mode="widthFix" class="question-icon mgr-20"></image>
				<view class="font-b blod text">{{ info.title }}</view>
			</view>
			<view class="flex-r-between">
				<view class="gray">{{ info.answerNum }}个回答</view>
				<view class="flex"></view>
			</view>
		</view>
		<textarea class="textarea" :placeholder="id ? '分享你的真实观点和经验' : '请输入问题'" maxlength="1000" v-model="content" />
		<view class="line"></view>
		<view class="pd-box">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title blod ">添加图片</view>
					<view class="uni-uploader-info">{{ imageList.length }}/6</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file">
								<image src="/static/com_list_ic_close_nor@3x.png" @click="removeImg(index)" mode="widthFix" class="icon-shanchu"></image>
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage"></view></view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed-bottom bg-default-color font-b white fixed-bottom-height flex-c-center" @click="confrim">发布</view>
		<bind-mobile v-on:hideBindMobile="hideBindMobile" :isShow="showBindMobile"></bind-mobile>
	</view>
</template>

<script>
import bindMobile from '@/components/bind-mobile/bind-mobile.vue';
export default {
	components: {
		bindMobile
	},
	data() {
		return {
			id: '',
			content: '',
			imageList: [],
			hasMobile: false,
			showBindMobile: false,
			info: {
				title: '',
				answerNum: 0
			},
			uploadToken: '',
			serverUrl: '',
			urls:[]
		};
	},
	onLoad(options) {
		this.id = options.id ? options.id : '';
		if (this.id) {
			this.info = JSON.parse(uni.getStorageSync('questionInfo'));
		}
		this.api.center.user.get_detail(null, res => {
			console.log(res);
			this.hasMobile = res.data.phone ? true : false;
		});
	},
	methods: {
		async chooseImage() {
			if (this.imageList.length >= 6) {
				uni.showToast({
					title: '最多上传6张图片',
					icon: 'none'
				});
				return;
			}
			uni.chooseImage({
				sizeType: ['compressed'],
				count: 6,
				success: res => {
					console.log(res);
					this.imageList = this.imageList.concat(res.tempFilePaths);
				}
			});
		},
		previewImage(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		removeImg(i) {
			this.imageList.splice(i, 1);
			console.log(this.imageList);
		},
		hideBindMobile(bind) {
			this.showBindMobile = false;
			this.hasMobile = bind ? true : false;
		},
		postAsk() {
			this.api.home.qa.question.add(
				{
					title: this.content,
					'url[]': this.imageList
				},
				res => {
					console.log(res);
					uni.showToast({
						title: '发布问题成功',
						success: () => {
							uni.setStorageSync('refreshPage', true);
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1000);
						}
					});
				}
			);
		},
		postAnswer() {
			this.api.home.qa.answer.add(
				{
					questionId: this.id,
					content: this.content,
					'url[]': this.imageList
				},
				res => {
					console.log(res);
					uni.showToast({
						title: '回答问题成功',
						success: () => {
							uni.setStorageSync('refreshPage', true);
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1000);
						}
					});
				}
			);
		},
		confrim() {
			if (this.hasMobile) {
				if (this.content) {
					uni.showLoading({
						title: '发布中'
					});
					if (this.id) {
						//回答
						if (this.imageList.length) {
							this.api.home.qa.get_qiuniu_info(null, async res => {
								console.log(res);
								this.uploadToken = res.data.uploadToken;
								this.serverUrl = res.data.serverUrl;
								this.urls = [];
								for (let i in this.imageList) {
									let url = await this.uploadFile(this.imageList[i]);
									this.urls.push(url);
								}
								console.log(this.urls)
								this.postAnswer();
							});
						} else {
							this.postAnswer();
						}
					} else {
						//提问
						if (this.imageList.length) {
							this.api.home.qa.get_qiuniu_info(null, async res => {
								console.log(res);
								this.uploadToken = res.data.uploadToken;
								this.serverUrl = res.data.serverUrl;
								this.urls = [];
								for (let i in this.imageList) {
									let url = await this.uploadFile(this.imageList[i]);
									this.urls.push(url);
								}
								console.log(this.urls)
								this.postAsk();
							});
						} else {
							this.postAsk();
						}
					}
				} else {
					uni.showToast({
						title: '请输入问题',
						icon: 'none'
					});
				}
			} else {
				this.showBindMobile = true;
			}
		},
		uploadFile(file) {
			return new Promise((onok, onno) => {
				let formData = {
					token: this.uploadToken,
					key: file.substr(file.lastIndexOf('/') + 1),
					file: file
				};
				console.log(formData);
				uni.uploadFile({
					url: 'http://upload.qiniu.com',
					filePath: file,
					name: 'file',
					formData: formData,
					success: uploadFileRes => {
						let _url = this.serverUrl + '/' + JSON.parse(uploadFileRes.data).key;
						onok(_url);
					},
					fail: err => {
						onno(err);
					}
				});
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	width: 100%;
	padding-bottom: 120upx;
	.textarea {
		width: calc(100% - 60upx);
		height: 200upx;
		margin: 30upx;
	}
	.line {
		width: calc(100% - 60upx);
		margin-left: 30upx;
		height: 2upx;
		background-color: #eeeeee;
		margin-bottom: 30upx;
	}
	.uni-uploader__file {
		position: relative;
		left: 0;
		top: 0;
		.icon-shanchu {
			width: 40upx;
			position: absolute;
			right: 0;
			z-index: 2;
			top: 0;
		}
	}
	.question-box {
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20upx;
		padding: 40upx 30upx;
		box-shadow: 0px 10upx 60upx 0px rgba(0, 0, 0, 0.04);
		width: calc(100% - 60upx);
		margin-left: 30upx;
		margin-bottom: 40upx;
		margin-top: 30upx;

		.question {
			margin-bottom: 20upx;
			width: 100%;
			.question-icon {
				width: 40upx !important;
				position: relative;
				top: 15upx;
				left: 0;
				float: left;
			}
		}

		.answer-icon {
			width: 40upx;
		}
	}
}
</style>
