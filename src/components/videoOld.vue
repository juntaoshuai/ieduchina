<template>
<div class="video" id="video">
	<!--0:视频直播，1:预告，2：图文，4：结束，5：ppt直播，6：查看回顾，7：即将开始，10：加载-->
	<!--直播-->
    <video v-bind:src="hlsDownstream" controls autoplay v-if="model==0"></video>
    
	<!--预告-->
	<div class="m-yugao bgimg" v-if="model==1">
<!--		<img src="../assets/notice.jpg" width="100%" height="100%" alt="">-->
		<div class="m-time">
			倒计时：
			<span>{{h}}</span>天
			<span>{{m}}</span>时
			<span>{{s}}</span>分
		</div>
		<span class="yd" @click="book" v-if="!order">预 订</span>
		<span class="yd gray" v-else>已预订</span>
	</div>
	
	<!--ppt直播-->
	<div class="ppt_content" v-if="model==5">
<!--		<video v-bind:src="hlsDownstream" v-bind:poster="pptImg" controls autoplay></video>-->
		<img v-bind:src="pptImg" alt="" width="100%" height="100%">
		<p>如果您听不到直播声音，建议用电脑观看PPT直播</p>
	</div>
	
	<!--即将开始-->
	<div class="m-prepare bgimg" v-if="model==7">
<!--		<img v-bind:src="room.coverUrl" height="100%" alt="">-->
		<p>直播即将开始，请耐心等待！</p>
	</div>

	<!--直播结束-->
	<div class="end bgimg" v-if="model==4">
		<video controls v-bind:src="vod" v-bind:poster="room.coverUrl"></video>
	</div>
	
	<div class="m-prepare bgimg"  v-if="model==8">
<!--		<img v-bind:src="room.coverUrl" height="100%" alt="">-->
		<p>直播已结束，感谢收看。敬请期待直播回顾。</p>
	</div>
	
	<!--查看回顾-->
	<video src="" v-if="model==6"></video>
</div>
</template>

<script>
import {dataTime,getString} from '../js/common'
export default {
	data () {
		return {
			h:0,
			m:0,
			s:0
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
					$this.h = day
					$this.m = hour
					$this.s = minute
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video{height: 4.2rem;overflow: hidden;position: absolute;width: 100%;left: 0;top: .78rem;z-index: 5;}
video{width: 100%;height: 100%;background: #000;}
	
.m-yugao{height: 100%;position: relative;background-color: #eaeaea;font-weight: bold;}
.m-time{position: absolute;height: .76rem;line-height: .76rem;background: rgba(0,0,0,.5);bottom: 0;left: 0;width: 100%;color: #fff;text-align: center;font-size: .32rem;z-index: 888;}
	.m-time span{font-size: .6rem;vertical-align: top;margin: 0 .16rem;color: #fff;letter-spacing: .04rem;}
	.m-prepare{position: relative;background: #333;height: 100%;line-height: 4.05rem;}
	.m-prepare p,.ppt_content p{position:absolute;top: 50%;left: 50%;width: 6.4rem;margin-left: -3.2rem;text-align: center;height: .6rem;color: #fff;line-height: .6rem;font-size: .32rem;z-index: 5;margin-top: -.3rem;}
	.end{height: 100%;background: #333;position: relative}
	.end span{display: block;position: absolute;top: 0;height: .6rem;background: rgba(39,174,194,0.8);width: 100%;text-align: center;z-index: 8;}
	span.yd{display: block;position: absolute;display: block;width: 1.6rem;height: .6rem;line-height: .6rem;background: #27aec2;color: #fff;left: 50%;bottom: 1rem;font-size: .32rem;margin-left: -.8rem;text-align: center;border-radius: .04rem;z-index: 888}
	span.gray{background: rgba(0,0,0,0.5)}
	.ppt_content{position: relative;height: 100%;background: #000;}
	.m-prepare img,.m-yugao img{position: absolute;height: 100%;left: 0;top: 0;margin-left: -50%;z-index: 2}
	.ppt_content p{width: 100%;margin-left: -50%;top: .2rem;margin-top: 0;}
	
	.bgimg{background: url(../assets/notice.jpg);background-size: 100% 100%;}
</style>
