<template>
<div class="video" id="video" v-bind:style="{backgroundImage:'url('+room.reviewUrl+')'}">
	<!--0:视频直播，1:预告，2：图文，4：结束，5：ppt直播，6：查看回顾，7：即将开始，10：加载-->
	<!--直播-->
	<div class="play-view" v-if="model == 0 || model == 4 || model == 9" v-show="!isPlaying" v-on:click="clickPlay()" v-bind:style="{backgroundImage:'url('+room.reviewUrl+')'}">
			<img class="play-icon" src="../assets/play.png">
	</div>
	
    <video v-bind:src="hlsDownstream" v-bind:poster="room.reviewUrl" v-show="isPlaying" v-on:playing="playing" controls autoplay v-if="model==0"></video>
    
	<!--预告-->
	<div class="m-yugao" v-if="model==1">
		<!--<img src="../assets/notice.jpg" width="100%" height="100%" alt="">-->
		<div class="m-time">
			<div>开播倒计时：</div>
			<span>{{d}}</span>天
			<span>{{h}}</span>时
			<span>{{m}}</span>分
			<span>{{s}}</span>秒
		</div>
		<span class="yd" @click="book" v-if="!order">预 订</span>
		<span class="yd gray" v-else>已预订</span>
	</div>
	
	<!--ppt直播-->
	<div class="ppt_content" v-if="model==5">
		<!--<video v-bind:src="hlsDownstream" v-bind:poster="pptImg" controls autoplay></video>-->
		<img v-bind:src="pptImg" alt="" width="100%" height="100%">
		<!-- <p>如果您听不到直播声音，建议用电脑观看PPT直播</p> -->
		
		<audio v-if="hlsVoiceDownstream" id="voice" v-bind:src="hlsVoiceDownstream" controls autoplay></audio>

		<audio v-else id="media_audio" v-bind:src="hlsDownstream" controls autoplay></audio>

	</div>
	
	<!--即将开始-->
	<div class="m-prepare" v-if="model==7">
		<!--<img v-bind:src="room.coverUrl" height="100%" alt="">-->
		<p>直播即将开始，请耐心等待！</p>
	</div>

	<!--查看回顾-->
	<div class="end" v-if="model==4">
		<video controls v-bind:src="vod" v-bind:poster="room.reviewUrl" v-show="isPlaying" v-on:playing="playing" onended="myFunction()"></video>
	</div>
	
    <!-- 视频点播 -->
    <div class="vodlook" v-if="model==9">
        <video v-bind:src="vodliving" v-bind:poster="room.reviewUrl" v-show="isPlaying" v-on:playing="playing" controls></video>
    </div>
	
	<!--直播结束-->
	<div class="m-prepare"  v-if="model==8">
		<!--<img v-bind:src="room.coverUrl" height="100%" alt="">-->
		<p>直播已结束，感谢收看。敬请期待直播回顾。</p>
	</div>
	

</div>
</template>

<script>
import {dataTime,getString} from '../js/common'
export default {
	data () {
		return {
			h:0,
			m:0,
			s:0,
			isPlaying: false
		}
	},
	props:{
		model:{
			type:Number
		},
		room:{
			type:Object
		},
		hlsDownstream:{
			type:String
		},
		vod:{
			type:String
		},
		order:{
			type:Boolean
		},
		pptImg:{
			type:String
		},
		vodliving:{
			type:String
		},
		hlsVoiceDownstream: {
			type: String
		}
	},
	mounted:function(){
		
	},
	watch:{
		room:function(oldVal,newVal){
			var $this = this
			
			if(this.room.status == 0 && this.model == 1){	//房间状态为待举办
				var startDate = new Date(this.room.startTime)
				var timeOver = setInterval(function(){
					var now = new Date()
					var tol = (startDate - now)/1000;
					tol = parseInt(tol);
					if(tol <= 0){
						$this.$parent.model = 7
						clearInterval(timeOver)
						return
					}
					var day=Math.floor(tol/(60*60*24)); 
					var hour=Math.floor((tol-day*24*60*60)/3600); 
					var minute=Math.floor((tol-day*24*60*60-hour*3600)/60);
					var second=Math.floor(tol-day*24*60*60-hour*3600-minute*60); 
					$this.d = day > 10 ? day : '0' + day
					$this.h = hour > 10 ? hour : '0' + hour
					$this.m = minute > 10 ? minute : '0' + minute
					$this.s = second > 10 ? second : '0' + second
					
					if(minute < 1){
						$this.$parent.model = 7
						clearInterval(timeOver)
						return
					}
				},1000)
			}
		}
	},
	methods:{
		book: function() {
            if(userLogin.loginType == 2){
                this.$parent.nologin = true
                return
            }
            let url = getString('0105')
            io.send(url)
		},
		clickPlay: function() {
			document.querySelectorAll('#video video')[0].play()
		},
		playing: function() {
			this.isPlaying = true
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#media_audio,#voice{position: absolute;bottom: 0;left: 0;width: 100%;background: rgba(0,0,0,.3);z-index: 5;}	
.video{height: 4.2rem;overflow: hidden;position: absolute;width: 100%;left: 0;top: .78rem;z-index: 5;background-size: 100% 100%;}
video{width: 100%;height: 100%;background: #000;}
.vodlook{height: 100%;}	

.m-yugao{height: 100%;position: relative;font-weight: bold;}
.m-time{position: absolute;height: .76rem;line-height: .76rem;top: .8rem;left: 0;width: 100%;color: #fff;text-align: center;font-size: .32rem;z-index: 888;margin-top: -.38rem;}
	.m-time span{font-size: .6rem;vertical-align: top;margin: 0 .16rem;color: #fff;letter-spacing: .04rem;}
	.m-prepare{position: relative;height: 100%;line-height: 4.05rem;}
	.m-prepare p,.ppt_content p{position:absolute;top: 50%;left: 50%;width: 6.4rem;margin-left: -3.2rem;text-align: center;height: .6rem;color: #fff;line-height: .6rem;font-size: .32rem;z-index: 5;margin-top: -.3rem;}
	.end{height: 100%;position: relative}
	.end span{display: block;position: absolute;top: 0;height: .6rem;background: rgba(39,174,194,0.8);width: 100%;text-align: center;z-index: 8;}
	span.yd{display: block;position: absolute;display: block;width: 1.6rem;height: .6rem;line-height: .6rem;background: #60b8ee;color: #fff;left: 50%;bottom: 1rem;font-size: .32rem;margin-left: -.8rem;text-align: center;border-radius: .04rem;z-index: 888}
	span.gray{background: rgba(0,0,0,0.5)}
	.ppt_content{position: relative;height: 100%;}
	.m-prepare img,.m-yugao img{position: absolute;height: 100%;left: 0;top: 0;margin-left: -50%;z-index: 2}
	.ppt_content p{width: 100%;margin-left: -50%;top: .2rem;margin-top: 0;}
	
	.play-view{ position: relative; width: 100%; height: 100%; }
	.play-icon{ position: absolute; left: 50%; top: 50%; width: 50px; height: 50px; margin: -25px 0 0 -25px;}

</style>