<template>
	<view>
		<view class="list-item" v-for="(item, index1) in newList" :key="index1" @click="goDetail(item,index1)">
			<view class="iconfont gray iconcuowutishilimiandecha" v-if="removeType" @click.stop="removeArticle(item,index1)">

			</view>
			<view class="pd-box">
				<view class="flex-r-between" v-if="item.showType!=6">
					<!-- <view class="flex" v-if="item.showType==6">
						<image :src="item.answerQuestion.userAvatar" mode="widthFix" class="portrait" lazy-load="true"></image>
						<view class="">
							<text class="blod article-font">{{ item.answerQuestion.userName }}</text>
							<view class="small gray">{{item.answerQuestion.oauthIntro}}</view>
						</view>
					</view> -->
					<view class="flex">
						<image :src="item.userAvatar" mode="aspectFill" class="portrait" lazy-load="true" @click.stop="goCelebrity(item,index1)"></image>
						<view class="">
							<text class="blod article-font baby-black">{{ item.userName }}</text>
							<view class="small gray">{{item.oauthIntro}}</view>
						</view>
					</view>
					<view class="flex">
						<view class="tag" v-for="(el,i) in item.tagList" :key="i" @click.stop="geTagDetail(el.tagId)">
							{{el.name}}
						</view>
					</view>
					<!-- <view class="tag white small" v-if="item.categoryName" @click.stop="goCategory(item.categoryId)">{{ item.categoryName }}</view> -->
				</view>
				<view class="content showType0" v-if="item.showType == 0">
					<view class="desc article-font">{{ item.title }}</view>
				</view>
				<view class="flex-r-between content showType1" v-if="item.showType == 1">
					<view class="desc article-font mb-20" style="width: 72%;">{{ item.title }}</view>
					<image :src="item.attachment[0].thumbnail" mode="aspectFill" lazy-load="true" class="image"></image>
				</view>
				<view class="content showType2" v-if="item.showType == 2">
					<view class="desc article-font mb-20">{{ item.title }}</view>
					<image :src="item.attachment[0].thumbnail" mode="aspectFill" lazy-load="true" class="image"></image>
				</view>
				<view class=" content showType3" v-if="item.showType == 3">
					<view class="desc article-font mb-20">{{ item.title }}</view>
					<view class="flex-r-between">
						<image :src="el.thumbnail" class="image" mode="aspectFill" lazy-load="true" v-for="(el,i) in item.attachment"
						 :key="i"></image>
					</view>
				</view>
				<view class=" content showType4" v-if="item.showType == 4">
					<view class="desc article-font mb-20">{{ item.title }}</view>
					<view class="">
						<imt-audio color="#FC4041" :isPlay="false" src="" :duration="item.attachment[0].duration"></imt-audio>
					</view>
				</view>
				<view class=" content showType5" v-if="item.showType == 5">
					<view class="desc article-font mb-20">{{ item.title }}</view>
					<view class="img-box flex-r-center">
						<image :src="item.attachment[0].thumbnail" mode="aspectFill" lazy-load="true" class="image"></image>
						<image src="/static/details_list_ic_play_nor@3x.png" mode="widthFix" class="play-icon"></image>
					</view>
				</view>
				<view class=" content showType6" v-if="item.showType == 6">
					<view class="desc">
						<view class="flex-r-between">
							<image src="/static/home_list_pic_question@3x.png" class="pic-icon" mode="widthFix"></image>
							<view class="gray">
								{{item.answerNum}}人回答
							</view>
						</view>
						<view class="item-box">
							<image src="/static/home_list_ic_question@3x.png" class="icon" mode="widthFix"></image>
							<view class="text blod sigle-line-text-2 baby-black">
								{{item.title}}
							</view>
						</view>
						<view class="item-box">
							<image src="/static/home_list_ic_answer@3x.png" class="icon" mode="widthFix"></image>
							<view class="gray text sigle-line-text-2" v-if="item.answerReplyList.length>0">
								{{item.answerReplyList[0].userName}}：{{item.answerReplyList[0].content}}
							</view>
							<view class="gray text sigle-line-text-2" v-else>
								暂无回答，期待您的回答
							</view>
						</view>
					</view>
				</view>
				<view class="flex-r-between">
					<view class="flex" v-if="item.showType==6">
						<view class="list-item-icon flex">
							<!-- <text class="iconfont iconliulan gray"></text> -->
							<image src="../static/home/com_list_ic_look@2x.png" mode="widthFix" class="icon"></image>
							<text class="small gray">{{ item.clickNum | articleDataNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<!-- <text class="iconfont iconzhuanfa gray"></text> -->
							<image src="../static/home/com_list_ic_forward@2x.png" mode="widthFix" class="icon"></image>
							<text class="small gray">{{ item.forwardNum | articleDataNum}}</text>
						</view>
					</view>
					<view class="flex" v-if="item.showType!=6">
						<view class="list-item-icon flex">
							<!-- <text class="iconfont iconliulan gray"></text> -->
							<image src="../static/home/com_list_ic_look@2x.png" mode="widthFix" class="icon"></image>
							<text class="small gray">{{ item.clickNum | articleDataNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<!-- <text class="iconfont iconiconfontzhizuobiaozhun44 gray"></text> -->
							<image src="../static/home/com_list_ic_praise@2x.png" mode="widthFix" class="icon"></image>
							<text class="small gray">{{ item.praiseNum | articleDataNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<!-- <text class="iconfont iconpinglun gray"></text> -->
							<image src="../static/home/com_list_ic_introduction@2x.png" mode="widthFix" class="icon"></image>
							<text class="small gray">{{ item.commentNum | articleDataNum}}</text>
						</view>
						<view class="list-item-icon flex">
							<!-- <text class="iconfont iconzhuanfa gray"></text> -->
							<image src="../static/home/com_list_ic_forward@2x.png" mode="widthFix" class="icon"></image>
							<text class="small gray">{{ item.forwardNum | articleDataNum}}</text>
						</view>
					</view>
					<image v-if="showOperate&&item.showType!=6" src="../../../static/com_list_ic_more_nor@2x.png" mode="widthFix"
					 class="icon-more-nor" @click.stop="showMoreMask($event, item.articleId, item.userId, index1)"></image>
				</view>
			</view>
			<view class="cut-off"></view>
		</view>
		<!-- <article-operate :show="showArticleOperate" :top="articleOffsetTop" :id="articleId" v-on:hideArticleOperate="hideArticleOperate"></article-operate> -->
	</view>
</template>

<script>
	import imtAudio from '@/components/imt-audio/imt-audio.vue';
	export default {
		components: {
			imtAudio
		},
		name: 'article-item',
		props: {
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			showOperate: {
				type: Boolean,
				default: true
			},
			removeType: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				showArticleOperate: false,
				articleId: '',
				articleOffsetTop: 0,
				newList: []
			};
		},
		methods: {
			showMoreMask(e, articleId, userId, articleIndex) {
				this.$emit('showOperate', e, articleId, userId, articleIndex);
			},
			hideArticleOperate() {
				this.showArticleOperate = false;
			},
			goDetail(el, index) {
				if (el.showType == 6) {
					uni.setStorageSync('questionIndex', index)
					uni.navigateTo({
						url: '/pages/home/question/detail/detail?id=' + el.articleId
					})
				} else {
					uni.setStorageSync('articleIndex', index)
					uni.navigateTo({
						url: '/pages/home/article/detail/detail?id=' + el.articleId
					});
				}

			},
			goCategory(id) {
				uni.navigateTo({
					url: "/pages/classify/detail/detail?id=" + id
				})
			},
			goCelebrity(el, index) {
				if (el.showType == 6) {
					uni.setStorageSync('questionIndex', index)
					uni.navigateTo({
						url: '/pages/home/question/detail/detail?id=' + el.articleId
					})
				} else {
					uni.navigateTo({
						url: '/pages/home/celebrity/detail/detail?id=' + el.userId
					});
				}

			},
			geTagDetail(id) {
				uni.navigateTo({
					url: "/pages/classify/detail/detail?id=" + id
				})
			},
			removeArticle(el, index) {
				console.log(el)
				let articleId = [el.articleId]
				console.log(articleId)
				let item = el.showType + '_' + el.articleId
				if (this.removeType == "record") {
					this.api.center.record.remove_article_list({
						"articleId[]": [item]
					}, res => {
						console.log(res)
						this.$emit('removeArticle', index)
					})
				}
				if (this.removeType == "collect") {
					this.api.center.collect.remove_article_list({
						"articleId[]": articleId
					}, res => {
						console.log(res)
						this.$emit('removeArticle', index)
					})
				}
				if (this.removeType == "shield") {
					this.api.center.shield.remove_article_list({
						"articleId[]": articleId
					}, res => {
						console.log(res)
						this.$emit('removeArticle', index)
					})
				}
			}
		},
		watch: {
			list(val) {
				this.newList = val.map((el) => {
					if (el.showType == 3) {
						el.attachment.push("")
						el.attachment = el.attachment.slice(0, 3)
					}
					return el;
				})
			}
		},

	};
</script>

<style lang="scss" scoped>
	.list-item {
		position: relative;

		.iconcuowutishilimiandecha {
			position: absolute;
			right: 10upx;
			top: 0;
		}

		.content {
			padding: 20upx 0;
		}

		.portrait {
			width: 80upx !important;
			height: 80upx !important;
			border-radius: 50%;
			margin-right: 30upx;
		}

		&-icon {
			margin-right: 20upx;

			.icon {
				width: 40upx;
				height: 40upx;
				margin-right: 5upx;
			}

			.iconfont {
				margin-right: 10upx;
			}
		}

		.tag {
			// background-repeat: no-repeat;
			// background-size: 100% 100%;
			// background-image: url('~@/static/com_list_pic@2x.png');
			// padding: 5upx 20upx;
			font-size: 22upx;
			border: 2upx solid #E8E8E8;
			border-radius: 20upx;
			padding: 0 10upx;
			margin-right: 10upx;
			color: #404040;
		}

		.icon-more-nor {
			width: 60upx;
		}

		.content.showType0 {
			padding: 20upx 30upx;
			box-sizing: border-box;
			background-color: #f5f5f5;
			width: 100%;
			margin: 20upx 0;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}
		}

		.content.showType1 {
			padding: 20upx 30upx;
			box-sizing: border-box;
			background-color: #f5f5f5;
			width: 100%;
			margin: 20upx 0;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}

			.image {
				width: 148upx !important;
				height: 148upx !important;
			}
		}

		.content.showType2 {
			background-color: #ffffff;
			width: 100%;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}

			.image {
				width: 100% !important;
			}
		}

		.content.showType3 {
			box-sizing: border-box;
			background-color: #ffffff;
			width: 100%;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}

			.image {
				width: 32.5% !important;
				height: 200upx !important;
			}
		}

		.content.showType4 {
			box-sizing: border-box;
			background-color: #ffffff;
			width: 100%;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}
		}

		.content.showType5 {
			box-sizing: border-box;
			background-color: #ffffff;
			width: 100%;

			.desc {
				overflow: hidden;
				display: -webkit-box !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
			}

			.img-box {
				width: 100%;
				position: relative;
				height: 500upx !important;

				.image {
					width: 100%;
					height: 500upx !important;
					position: absolute;
					left: 0;
					top: 0;
				}

				.play-icon {
					width: 140upx;
					height: 140upx;
				}
			}
		}

		.content.showType6 {
			padding: 20upx 30upx;
			box-sizing: border-box;
			background-color: #f5f5f5;
			width: 100%;
			margin: 20upx 0;

			.desc {
				overflow: visible !important;

				.pic-icon {
					width: 90upx;
					position: relative;
					left: -40upx;
					z-index: 888;
				}

				.item-box {
					display: flex;
					flex-direction: row;
					margin-top: 20upx;

					.icon {
						width: 50upx !important;
						margin-right: 20upx
					}

					.text {
						width: calc(100% - 70upx);
					}
				}
			}

		}
	}
</style>
