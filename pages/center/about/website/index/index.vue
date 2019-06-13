<template>
	<view>
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	let type=""
	export default {
		data() {
			return {
				webUrl:""
			}
		},
		onLoad(options) {
			this.api.center.about.get_website({
				type:options.type
			},res=>{
				console.log(res)
				this.webUrl=res.data
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
