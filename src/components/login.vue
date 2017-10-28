<template>
   <div v-show="nologin">
		<!-- 未登录弹窗提示 -->
		<div class="login_content" @click="hide"></div>
		<div class="notice_content">
			<span class="notice_close" @click="hide"></span>
			<img src="../assets/notice.png" alt="">
			<h4>提示</h4>
			<p>您还没有登录，无法进行操作</p>
			<div>
				<a v-bind:href="loginurl" class="login_btn">登 录</a>
				<a v-bind:href="resurl" class="resgiter_btn">注 册</a>
			</div>
		</div>
    </div>
</template>

<script>

export default {
    data (){
        return {
            logindia:false,              //用户是否登录
            loginurl:'http://m.ieduchina.com/navigation.html?do=login&callback='+location.href,
            resurl:'http://m.ieduchina.com/register.html?callback='+location.href
        }
    },
    props:{
        loginType:{
            type:Number
        },
		nologin:{
			type:Boolean
		}
    },
    methods:{
		hide:function(){
			this.$parent.nologin = false
		}
    }
}
</script>
<style scoped>
.login_content{position: fixed;width: 100%;height: 100%;left: 0;top: 0;z-index: 9999;background:rgba(0,0,0,.3);}
.notice_content{position: absolute;width: 6rem;bottom: .4rem;left: .6rem;height: 4rem;background: #fff;z-index: 9999;text-align: center;padding-top: .34rem;}
.notice_content p{color: #333;font-size: .3rem;margin-top: .3rem;margin-bottom: .3rem;}
.notice_content h4{color: #27aec2;font-size: .3rem;margin-top: .24rem;}
.notice_content img{width: 1.12rem;}
.notice_content a{display: inline-block;*display: inline;zoom: 1;width: 1.5rem;height: .5rem;line-height: .5rem;background: #27aec2;color: #ffffff;border-radius: .06rem;}
.notice_close{position: absolute;display:block;width: .24rem;height: .24rem;background: url(../assets/close.png);right: .1rem;top: .1rem;background-size: 100% 100%;}
</style>
