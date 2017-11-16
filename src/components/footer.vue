<template>
	<footer>
		<span class="fl" @click=show></span>
		<input v-model="val" placeholder="说点什么。。。" type="" name="">
		<span class="fr" @click="send">发送</span>

		<div class="look_pop" v-show="isshow" @click=hide></div>

		<div class="look" v-show="isshow">
			<ul class="clearfix">
				<li v-for="(item, index) in arr" @click="sendlook(index)">
					<img v-bind:src="'http://live.ofweek.com/static/web/wap/live/assets/'+item+'.gif'" alt="">
				</li>
			</ul>
		</div>

		<!-- <div class="no_login" @click='loginShow' v-show="loginType==2"></div> -->
	</footer>
</template>

<script>
import {getString,lookStr} from '../js/common.js'
export default {
	data (){
		return {
			val:'',
			arr:lookStr,
			isshow:false
		}
	},
	props:{
		loginType:{
			type:Number
		},
        defVal:{
            type:String
        }
	},
	methods:{
		send:function(){
            if(this.loginType == 2){
                showLogin()
                $("video").hide();
                $("video")[0].pause();
                return;
            }
            
			var result = this.val.replace(/(^\s+)|(\s+$)/g,"");
			if(result == ''){
				alert('聊天内容不能为空！')
				return
			}

            let url = getString('0200',{val:result})
            io.send(url)
            this.val = ''
		},
		hide:function(){
			this.isshow = false
		},
		show:function(){
			this.isshow = true
		},
		sendlook:function(index){
			console.log(index)
			this.val += index
			this.isshow = false
		},
		loginShow:function(){
			this.$parent.nologin = true
		}
	},
    updated:function(){
		
    },
    watch:{
        defVal: function (newVal, oldVal) {
			if(newVal != "")
            	this.val += '@' + newVal
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{height: 1.18rem;position: absolute;bottom: 0;width: 100%;background: #f9f6f6;padding: .18rem .3rem;z-index: 8;}
.fl{width: .51rem;height: .5rem;background: url(../assets/look.png);background-size: 100% 100%;margin-top: .17rem;}
input{background: #ffffff;height: .8rem;border: 1px solid #e0e0e0;padding: 0 .1rem;color: #999;font-size: .3rem;margin-left: .17rem;border-radius: .04rem;width: 4.4rem;}
span.fr{display: block;width: 1.28rem;height: .8rem;line-height: .8rem;color: #fff;font-size: .3rem;background: #60b8ee;border-radius: .04rem;text-align: center;}
	.look{z-index: 889;position: absolute;bottom: 1.18rem;left: 0;width: 100%;background: #fff;box-shadow: 5px 5px 5px #eaeaea}
	.look ul li{float: left;height: .8rem;width: .8rem;line-height: .8rem;text-align: center}
	.look_pop{position: fixed;width: 100%;height: 100%;z-index: 888;top: 0;left: 0;}
	
	.no_login{position: absolute;z-index: 8;left: 0;top: 0;width: 100%;height: 100%;}
</style>
