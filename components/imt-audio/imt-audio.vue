<template>
	<view class="imt-audio">
		<view class="audio-wrapper " :style="[{'width':screenWidth+'px'}]">
			<!-- <view class="iconfont default-color  audio-control-switch" :class="{'iconbofang':paused,'iconzanting':!paused}" @click="operation"></view> -->
			<image src="/static/home_list_ic_play_nor@3x.png" mode="widthFix" class="icon-operation" v-if="paused" @click="operation"></image>
			<image src="/static/home_list_ic_pause_nor@3x.png" mode="widthFix" class="icon-operation" v-if="!paused" @click="operation"></image>
			<view class="audio-number gray">{{currentTime}}</view>
			<slider class="audio-slider" :activeColor="color" block-size="16" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
			 @change="change"></slider>
			<view class="audio-number gray">{{durationTime}}</view>
		</view>

		<!-- <view class="audio-control-wrapper" :style="{color:color}">
			<view class="audio-control audio-control-prev" v-if="control" :style="{borderColor:color}" @click="prev">&#xe601;</view>
			<view class="audio-control audio-control-switch" :class="{audioLoading:loading}" :style="{borderColor:color}" @click="operation">{{loading?'&#xe600;':(paused?'&#xe865;':'&#xe612;')}}</view>
			<view class="audio-control audio-control-next" v-if="control" :style="{borderColor:color}" @click="next">&#xe601;</view>
		</view> -->
	</view>
</template>

<script>
	const backgroundAudioManager = uni.getBackgroundAudioManager()
	export default {
		data() {
			return {
				currentTime: '', //当前播放时间
				durationTime: '', //总时长
				current: '', //slider当前进度
				paused: true, //是否处于暂停状态
				seek: false, //是否处于拖动状态
				screenWidth: this.screenWidth - 60
			}
		},
		props: {
			src:  {
				type: String,
				default: ""
			}, 
			title: {
				type: String,
				default: "宝宝贝"
			}, //标题
			singer: {
				type: String,
				default: "宝宝贝"
			}, //作者名称
			autoplay: Boolean, //是否自动播放
			duration: Number, //总时长（单位：s）
			control: {
				type: Boolean,
				default: true
			}, //是否需要上一曲/下一曲按钮
			isPlay: {
				type: Boolean,
				default: true
			},
			isPause: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: '#169af3'
			} //主色调
		},
		methods: {
			//返回prev事件
			prev() {
				this.$emit('prev')
			},
			//返回next事件
			next() {
				this.$emit('next')
			},
			//格式化时长
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			//播放/暂停操作
			operation() {
				if (!this.isPlay) {
					return;
				}
				console.log(backgroundAudioManager.paused)
				if (backgroundAudioManager.paused) {
					backgroundAudioManager.play()
				} else {
					backgroundAudioManager.pause()
				}
			},
			//完成拖动事件
			change(e) {
				if (!this.isPlay) {
					return;
				}
				backgroundAudioManager.seek(e.detail.value)
			}
		},
		created() {
			if (!this.src) {
				return;
			}
			this.durationTime = this.format(this.duration)
			backgroundAudioManager.title = this.title;
			backgroundAudioManager.singer = this.singer;
			backgroundAudioManager.coverImgUrl = 'https://boblbee.superpapa.com.cn/boblbee/detail/images/logo.png';
			backgroundAudioManager.src = this.src;
			//音频进度更新事件
			backgroundAudioManager.onTimeUpdate(() => {
					this.current = backgroundAudioManager.currentTime
			})
			//音频播放事件
			backgroundAudioManager.onPlay(() => {
				this.paused = false
			})
			//音频暂停事件
			backgroundAudioManager.onPause(() => {
				this.paused = true
			})
			//音频结束事件
			backgroundAudioManager.onEnded(() => {
				backgroundAudioManager.seek(0)
				backgroundAudioManager.title = this.title;
				backgroundAudioManager.singer = this.singer;
				backgroundAudioManager.coverImgUrl = 'https://boblbee.superpapa.com.cn/boblbee/static/App Store-1024.png';
				backgroundAudioManager.src = this.src;
				this.paused = true
				this.current = 0
				this.seek = false
			})
		},
		watch: {
			//监听音频地址更改
			src(e) {
				if (!e) {
					return;
				}
				backgroundAudioManager.src = e;
				this.current = 0
				backgroundAudioManager.play()
			},
			//监听总时长改变
			duration(e) {
				this.durationTime = this.format(e)
			},
			//监听当前进度改变
			current(e) {
				this.currentTime = this.format(e)
			},
			isPause(val) {
				if (val) {
					backgroundAudioManager.pause()
				} else {
					backgroundAudioManager.play()
				}
			}
		},
		destoyed() {
			backgroundAudioManager.pause()
		}
	}
</script>

<style>
	/* @font-face {
		font-family: 'icon';
		src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot');
		src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff') format('woff'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.svg#iconfont') format('svg');
	} */

	.imt-audio {
		padding: 0upx 30upx;
		background: #F8F8F8;
		border-radius: 100upx;
	}

	.icon-operation {
		width: 80upx !important;
		height: 80upx !important;
		margin-right: 20upx;
	}

	.audio-wrapper {
		display: flex;
		align-items: center;
		padding: 20upx 0;
	}

	.audio-number {}

	.audio-slider {
		flex: 1;
		margin: 0 30upx;
	}

	.audio-control-wrapper {
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "icon" !important;
	}

	.audio-control {
		font-size: 32upx;
		line-height: 1;
		border: 4upx solid;
		border-radius: 50%;
		padding: 16upx;
	}

	.audio-control-next {
		transform: rotate(180deg);
	}

	.audio-control-switch {
		font-size: 80upx;
		margin-right: 20upx;
	}

	.audioLoading {
		animation: loading 2s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes loading {
		to {
			transform: rotate(360deg);
		}
	}
</style>
