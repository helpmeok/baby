<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加话题</block>
		</cu-custom>
		<view class="content bg-white" @click.stop :style="{height:contentHeight+'px'}">
			<empty v-if="list.length==0" msg="没有任何数据耶~"></empty>
			<scroll-view scroll-y class="scroll-view pd-box">
				<view class="add-list" style="padding-top: 40upx;">
					<view class="add-list-item" v-for="(el,i) in list" :key="i">
						<view class="item flex-r-center" @click="choose(el,i)" :class="{active:el.active}">
							<image class="mgr-10 add-icon" src="/static/home_more_ic_add@3x.png" mode="widthFix" v-if="!el.active"></image>
							<text>{{el.name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="bottom-btn-box fixed-bottom-height white flex-r-center" @click="add">
				<view class="baby-font-size">确认添加</view>
				<view class="baby-font-size" v-if="chooseList.length>0">（{{chooseList.length}}）</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			contentHeight() {
				return this.screenHeight - this.CustomBar
			}
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				list: [],
				chooseList: [],
				addListLength: 0
			};
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				uni.showLoading({
					title: "加载中"
				})
				this.api.center.classify.get_add_list(null, res => {
					console.log(res)
					this.list = res.data
					this.list.map((el) => {
						el.active = false;
						return el
					})
					uni.hideLoading()
				})
			},
			choose(el, i) {
				this.list[i].active = !this.list[i].active
				console.log(this.list[i].active)
				if (this.list[i].active) {
					this.chooseList.push(this.list[i].tagId)
				} else {
					this.chooseList.splice(this.chooseList.indexOf(this.list[i].tagId), 1)
				}
				console.log(this.chooseList)
				this.$forceUpdate()
			},
			add() {
				uni.showLoading({
					title:"加载中"
				})
				this.api.home.save_tag({
					"tagId[]":this.chooseList
				},res=>{
					console.log(res)
					uni.showToast({
						title:"添加成功"
					})
					uni.navigateBack({
						delta:1
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: relative;
		left: 0;
		bottom: 0;
		border-radius: 30upx 30upx 0 0;
		width: 100%;

		.scroll-view {
			height: calc(100% - 100upx);
		}

		.add-list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;

			.add-list-item {
				width: 33.3333%;
				height: 64upx;
				display: flex;
				justify-content: center;
				margin-bottom: 20upx;

				.item {
					border: 2upx solid #E8E8E8;
					border-radius: 35upx;
					width: 210upx;
					text-align: center;
					line-height: 64upx;
					height: 100%;
					margin-bottom: 20upx;
					color: #404040;
					position: relative;
					left: 0;
					top: 0;

					.add-icon {
						width: 20upx;
						height: 20upx;
					}
				}

				.item.active {
					background-color: #FC4041;
					color: #FFFFFF;
					border-color: #FC4041;
				}
			}

			.add-list-item:nth-of-type(3n) {
				justify-content: flex-end;
			}

			.add-list-item:nth-of-type(3n-2) {
				justify-content: flex-start;
			}

		}

		.bottom-btn-box {
			padding: 20upx 30upx;
			background-color: #FC4041;
			width: 100%;
			font-size: 30upx;

		}
	}
</style>
