<template>
	<view><web-view :src="pdfUrl"></web-view></view>
</template>

<script>
let type = '';
export default {
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: this.title,
			path: '/pages/home/index/index?fileUrl=' + this.fileUrl + '&title=' + this.title,
			imageUrl: '/static/share_logo@3x.png'
		};
	},
	data() {
		return {
			pdfUrl: '',
			title: '',
			fileUrl: ''
		};
	},
	onLoad(options) {
		this.pdfUrl = 'https://boblbee.superpapa.com.cn/boblbee/pdf/web/viewer.html?file=' + options.fileUrl;
		this.title = options.title;
		this.fileUrl = options.fileUrl;
		uni.setNavigationBarTitle({
			title: options.title
		});
	},
	methods: {}
};
</script>

<style></style>
