let publicApi = {
	data() {
		return {

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
	}
}
export default {
	publicApi
};
