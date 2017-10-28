<template>
    <div id="app">
        <my-header :room="room"></my-header>
        <my-video :order=order :model=model :room=room :hlsDownstream=hlsDownstream :vod=vod :pptImg=pptImg :vodliving=vodliving></my-video>
        <div class="gray"></div>
        <my-nav :status=status :kefu=kefu :active=active></my-nav>
        <section>
<!--
            <living v-show="active==0" :historyArr="historyArr" :morehis=morehis></living>
            <chat v-show="active==1" :chatArr=chatArr :moreText=moreText></chat>
            <intro v-show="active==2" :room=room></intro>
-->
			<swiper :options="swiperOption" ref="mySwiperA">
			  <swiper-slide><living :historyArr="historyArr" :morehis=morehis></living></swiper-slide>
			  <swiper-slide><chat :chatArr=chatArr :moreText=moreText></chat></swiper-slide>
			  <swiper-slide><intro :room=room :contact=contact :contactShow=contactShow></intro></swiper-slide>
			</swiper>
        </section>  
        <my-footer v-show="active==1" :loginType=loginType :defVal=defVal></my-footer>
        <login :nologin=nologin></login> 
        <!-- 加载动画效果 -->
        <load v-show="model==10" :error="error"></load>
        <!--黑名单弹窗-->
        <black :black="isblack" :reason="reason"></black>
    </div>
</template>

<script>
import myHeader from './components/header'
import myVideo from './components/video'
import myNav from './components/nav'
import living from './components/living'
import chat from './components/chat'
import myFooter from './components/footer'
import load from './components/load'
import login from './components/login'
import intro from './components/intro'
import black from './components/black.vue'

import {socket} from './js/socket'
import send from './js/send'
import {dataTime,getString,lookStr,aiTe,biaoQing,kefu} from './js/common'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'app',
    components: {
        myHeader,
        myVideo,
        myNav,
        living,
        chat,
        myFooter,
        load,
		login,
        intro,
		swiper,
		swiperSlide,
		black
    },
    data (){
        return {
			swiperOption: {
				notNextTick: true,

				autoHeight: true,
				pagination : '.swiper-pagination',
				paginationClickable :true,

				debugger: true
			},
			//tab切换
            active:0,
            //直播回顾内容
            historyArr:new Array(),
            //房间状态
            model:10,
			//0:视频直播
			//1:直播未开始，进行直播预告
			//2:图文直播
			//3:直播切换
			//4:直播结束
			//5:ppt直播
			//6:查看回顾
			//7直播即将开始，请耐心等待
			//8直播已结束，感谢收看。敬请期待直播回顾
			//10:loading
            //错误信息
            error:'',
            //聊天内容
            chatArr:new Array(),
            //聊天记录状态
            moreText:'加载更多',
            //历史图文列表状态
            morehis:'加载更多',
			//房间信息
			room:{},
			//展台客服列表
			kefu:new Array(),
			//status房间状态
			status:0,
			//直播流
			hlsDownstream:'',
			//录播视频
			vod:'',
			//录播视频列表
			vodArr:new Array(),
			//用户是否登录
			loginType:userLogin.loginType,
			//登录弹窗
			nologin:false,
            //@功能
            defVal:'',
            //房间用户信息
            user:{},
			//用户是否预订
			order:false,
			//拉黑原因
			reason:'',
			//黑名单
			isblack:false,                      
			//ppt直播显示图片
            pptImg:'',
			//联系方式
			contact:{},
			//是否显示联系方式
			contactShow:0,
			//登录
			loginData:'',
			vodliving:''
        }
    },
    mounted:function(){
        var $this = this
		let vodNum = 0
		let page,prefix,pages
		
		this.swiper.onTransitionStart = function(){
			$this.active = $this.swiper.activeIndex
		}
		
		//录播循环
		window.myFunction = function() {
            vodNum++
            if(vodNum == $this.vodArr.length){
                vodNum = 0
                //$this.model = 4
            }
            $this.vod = $this.vodArr[vodNum].bPlayUrl
        }
		
        //连接socket
        let link = function(){
            if(window.WebSocket){
                window.io = socket()

                io.onopen = function(){
                    $this.error = '连接成功'
                    send()
                }

                io.onerror = function(e){
                    $this.error = '连接失败，正在重连...'
                    link()
                    return
                }

                io.onmessage = function(d){						
                    let str = d.data;
                    let num = str.slice(1,5);
                    let data = str.substr(5);
                    data = eval('(' + data + ')')
                    console.log(num)
                    console.log(data)

                    switch(num){
                        case '0100':
                            if(data.status != 200){
                                $this.error = data.message
                                //return
                            }
							
							if(userLogin.loginType == 1)
								$this.order = data.body.user.registered
                            $this.user = data.body.user
							if($this.user.name == ""){
								$this.user.name = $this.user.account.slice(0,4)+"***"
							}
                        break
                        //获取图文列表
                        case '0340':
                            if(data.body.length < 10)
                                $this.morehis = '没有更多了'
                            else
                                $this.morehis = '加载更多'
								
							
                            $this.historyArr = $this.historyArr.concat(data.body)
							
							for(let i = 0;i < $this.historyArr.length;i++){
								 $this.historyArr[i].updateDate = dataTime($this.historyArr[i].updateDate,1)
							}
                        break
						
						//获取房间基本信息
						case '0300':
							$this.room = data.body
                            $this.room.start = dataTime(data.body.startTime)
                            $this.room.end = dataTime(data.body.endTime)
							let status = data.body.status
							
							$this.contactShow = data.body.contactShow
							
							if(!data.body.reviewUrl)
								$this.room.reviewUrl = 'http://m.live.smartlifein.com/static/web/wap/live/assets/default_preview.png'						
							$this.status = status
							if($this.model == 10){
								if(status == 0){	//待举办
									var now = new Date()
									var start = new Date(data.body.startTime)
									var tol = (start - now)/1000
									if(tol > 0)
										$this.model = 1
									else
										$this.model = 7
								}else if(status == 2){	//进行中
									$this.model = 7 
								}else if(status == 4){ //结束
									//获取视频信息
									let videourl = getString('0331')
									io.send(videourl)
								}
							};
							
							var config = {
								url:location.href,
								title:$this.room.name,
								desc:$this.room.detail,
								img:$this.room.coverUrl,
								img_title:$this.room.name,
								from:'智慧生活网直播'
							};
						break
						
                        //发布/修改图文通知
                        case '1341':
                            let ishas = 0
                            let picId = data.body.id

                            for(let i = 0;i < $this.historyArr.length;i++){
                                if($this.historyArr[i].id == picId){
                                    ishas = 1
                                    $this.historyArr.splice(i,1,data.body)
                                }
                            }               
							let imgHis =data.body
							imgHis.updateDate = dataTime(data.body.updateDate,1) 
                            //如果不是修改
                            if(ishas != 1)
                                $this.historyArr.unshift(imgHis)
								
                            break
                        //直播
                        case '1800':
							let type = data.body.type
							if(type == 'ppt_live'){//ppt直播
                                //ppt直播
                                let pptId = data.body.pptId
                                page = data.body.page
								$this.hlsDownstream = data.body.hlsDownstream
                                let url = getString('0321',{"id":pptId})
                                io.send(url)
								$this.model = 5
							}else{
								$this.model = 0
								$this.hlsDownstream = data.body.hlsDownstream
							}
                        break
						//关闭直播
						case '1801':
							$this.model = 7
						break
                        //vod 直播开始通知
                        case '1820':
							$this.model = 9
							$this.vodliving = data.body.vodName
                            break
                        //vod 直播结束通知
                        case '1821':
							$this.model = 7
                            break						
                        //历史聊天记录
                        case '0201':
                            if(data.body.length < 20){
                                $this.moreText = '没有更多了'
                            }else
                                $this.moreText = '加载更多'
							var arr = data.body
							var kefuList = $this.kefu
							let arrReturn = kefu(arr,kefuList,$this.user.name)
                            $this.chatArr = $this.chatArr.concat(arrReturn)
                        break
                        //用户群聊通知
                        case '1200':
                            let arrVal = data.body
							
                            //表情过滤
                            arrVal.content = biaoQing(arrVal.content)
                            
                            //@功能
                            arrVal.content = aiTe(arrVal.content,$this.user.name)
                            
							if(arrVal.author.name == ""){
								arrVal.author.name = arrVal.author.account.slice(0,4)+'***'
							}
							
                            //时间戳
							arrVal.chatTime = dataTime(arrVal.chatTime,1)
							arrVal.type = 1
                            for(let m = 0;m < $this.kefu.length;m++){				
                                if(arrVal.author.userId == $this.kefu[m].userId){
									if(arrVal.author.userType == 3){//主播
										arrVal.type = 3
									}else if(arrVal.author.userType == 4){//客服
										arrVal.type = 4
									}
                                }
                            }
                            $this.chatArr.unshift(arrVal)
                            break
						//获取展台客服列表
						case '0301':
							$this.kefu = data.body
							break
						//房间状态改变通知
						case '1300':
                            //结束房间直播
                            if(data.body.status == 4){
                                $this.model = 4
                                //获取视频信息
                                let videourl = getString('0331')
                                webSocket.send(videourl)
                            }
							break
						//获取录播视频
						case '0331':
							if(data.body.length > 0){
								$this.vod = data.body[0].bPlayUrl
								$this.vodArr = data.body
								$this.model = 4
							}else{
								$this.model = 8
							}
							break
						//预订
						case '0105':
							$this.order = true
							break
						case '0200':
							$this.defVal = ""
							let arrVal1 = data.body
							
                            //表情过滤
                            arrVal1.content = biaoQing(arrVal1.content)
                            
                            //@功能
                            arrVal1.content = aiTe(arrVal1.content,$this.user.name)
                            
							if(arrVal1.author.name == ""){
								arrVal1.author.name = arrVal1.author.account.slice(0,4)+'***'
							}
							
                            //时间戳
							arrVal1.chatTime = dataTime(arrVal1.chatTime,1)
							arrVal1.type = 1
                            for(let m = 0;m < $this.kefu.length;m++){				
                                if(arrVal1.author.userId == $this.kefu[m].userId){
									if(arrVal1.author.userType == 3){//主播
										arrVal1.type = 3
									}else if(arrVal1.author.userType == 4){//客服
										arrVal1.type = 4
									}
                                }
                            }
                            $this.chatArr.unshift(arrVal1)
							break
							
						//用户被拉黑
                        case '1110':
                                console.log('您已被拉黑')
                                $this.isblack = true
                                $this.reason = data.body.reason
                            break
						//获取联系方式
						case '0304':
							$this.contact = data.body
							break
						//获取ppt详情
						case '0321':
							prefix = data.body.prefix
							pages = data.body.pages
							
							$this.pptImg = prefix + pages[page - 1].url
							break
						//ppt翻页
						case '1810':
							page = data.body.page
							$this.pptImg = prefix + pages[page - 1].url
							break
                    }
                }
            }
        }

        link()
    },
    methods:{
        navChange:function(index){
            this.active = index
        }
    },
	computed:{
		swiper() {
			return this.$refs.mySwiperA.swiper
		}
	},
	watch:{
		'active':function(newVal,oldVal){
			this.swiper.slideTo(newVal)
		}
	}
}
</script>

<style>
@charset "UTF-8";
html{height: 100%;}
body{font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;font-size: .28rem;margin: 0 auto;max-width: 720px;position: relative;height: 100%;overflow: hidden;}
img{border: none;vertical-align: middle;}
li{list-style: none}
a{text-decoration: none;}
html,div,p,h2,h3,h4,h5,h6,img,ul,li{margin: 0;padding:0;}
* {
    tap-highlight-color: rgba(255,255,255,0);
 
    -ms-tap-highlight-color: rgba(255,255,255,0);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;

  -webkit-appearance: none;
  -webkit-text-size-adjust: none;
  -webkit-touch-callout:none; 
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: 0;
}
.fl{float: left;}
.fr{float: right;}
.clear{clear:both;line-height:0;}
.clearfix:after {visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }
div.gray{background: #dadbdf;height: .15rem;position: absolute;left: 0;width: 100%;top: 4.98rem;z-index: 5;}
section{position: absolute;left: 0;top: 0;width: 100%;padding-top: 6rem;height: 100%;overflow: hidden;}
.loadMore{font-size: .3rem;text-align: center;color: #27aec2;}
span.blue{color: #27aec2;}
	#share_pop{position: absolute;height: 100%;width: 100%;left: 0;top: 0;background: rgba(0,0,0,.2);z-index: 888;display: none;}
	.swiper-slide,.swiper-container,.swiper-wrapper{height: 100% !important;}
</style>
