let publicApi = {
	data() {
		return {
			isShowLoginPop: false,
			myBabyInfoListData: [],
			babyInfoId: "",
			babyInfoType: "",
			babyInfoGroupId: "",
			babySex: ""
		}
	},
	onLoad() {},
	methods: {
		getElSize(id) {
			//得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery()
					.select('#' + id)
					.fields({
							size: true,
							scrollOffset: true,
							rect: true
						},
						data => {
							res(data);
						}
					)
					.exec();
			});
		},
		openFile(fileUrl) {
			const downloadTask = uni.downloadFile({
				url: fileUrl,
				success: (res) => {
					let filePath = res.tempFilePath;
					uni.openDocument({
						filePath: filePath,
						success: (res) => {
							console.log(res)
							uni.hideLoading();
						},
						fail: (err) => {
							console.log(err)
						}
					});
				},
				fail: (err) => {
					console.log(err)
					uni.showToast({
						title: "文件加载失败",
						icon: "none"
					})
				}
			});
			downloadTask.onProgressUpdate((res) => {
				uni.showLoading({
					title: '加载中' + res.progress.toString() + '%',
					mask: true
				})
			});
		},
		hideMyBabyList() {
			this.isShowBabyList = false
		},
		showBabyList() {
			this.isShowBabyList = true;
		},
		hideLoginPop() {
			this.isShowLoginPop = false;
		},
		saveBabyInfoData() {
			return new Promise((onok, onno) => {
				this.api.center.user.get_detail(null, res => {
					uni.setStorageSync('userInfo', JSON.stringify(res.data))
					this.api.child.get_list(null, res => {
						let myBabyList = res.data;
						uni.setStorageSync('myBabyList', JSON.stringify(myBabyList));
						onok()
					}, err => {
						onno()
					})
				}, err => {
					onno()
				});
			});
		},
		getBabyInfoData() {
			if (!!uni.getStorageSync('myBabyList')) {
				this.myBabyInfoListData = JSON.parse(uni.getStorageSync('myBabyList'));
			}
			return this.myBabyInfoListData;
		},
		getCurrentBabyInfo() {
			if (!!uni.getStorageSync('userInfo')) {
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				if (!!userInfo.babyInfo) {
					this.babyInfoId = userInfo.babyInfo.id;
					this.babyInfoType = userInfo.babyInfo.type;
					this.babyInfoGroupId = userInfo.babyInfo.groupId;
					this.babySex = userInfo.babyInfo.babySex;
				}
			}
		},
		hasBabyInfoData() {
			return JSON.parse(uni.getStorageSync('myBabyList')).length ? true : false
		}
	}
}
export default {
	publicApi
};
