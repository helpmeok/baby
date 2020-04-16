let publicApi = {
	data() {
		return {
			isShowLoginPop: false,
			myBabyInfoListData: [],
			babyInfoId: "",
			babyInfoType: ""
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
						let myBabyList = res.data.baby.concat(res.data.pregnant);
						myBabyList.map((el,i)=>{
							if (el.isPregnant === undefined) {
								el.type = 2
							}
							if (el.isPregnant) {
								el.type = 1
							}
							if (el.isPregnant === false) {
								el.type = 0
							}
							return el;
						})
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
		getBabyIdAndType() {
			if (!!uni.getStorageSync('userInfo')) {
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				this.babyInfoId = userInfo.babyInfoId;
				this.babyInfoType = userInfo.babyInfoType;
			}
		}
	}
}
export default {
	publicApi
};
