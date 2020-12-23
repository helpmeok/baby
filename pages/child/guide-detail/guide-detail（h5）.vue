<template>
	<view >
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	let id = ""
	export default {
		data() {
			return {
				webUrl:""
			}
		},
		onLoad(options) {
			id = options.id
			this.api.child.get_guide_detail_byId({
				id
			}, res => {
				console.log(res)
				this.webUrl=res.data.h5_url+'&request_type=h5&apiType='+this.api.apiType
				console.log(this.webUrl)
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
