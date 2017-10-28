<template>
    <div v-show="nologin" class="login_content">
    	<div class="login_wrapper" v-html="loginData"></div>
    </div>
</template>

<script>

export default {
    data (){
        return {
            loginurl:'http://m.ieduchina.com/navigation.html?do=login&callback='+location.href,
            resurl:'http://m.ieduchina.com/register.html?do=login&callback='+location.href
        }
    },
    props:{
		nologin:{
			type:Boolean
		},
		loginData:{
			type:String
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
	.login_content{position:absolute;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.3);z-index: 99999999;}
	.login_wrapper{position: absolute;bottom: 0;left: 0;width: 100%;z-index: 9999;}
/*
.login_content .company-login, .user-login{ position: absolute; left: 0; bottom: 0; width: 100%; }
.login_content .login-form{ overflow: hidden;padding: 0 .2rem; margin: 0 auto 0; }
.login_content .login-input{ position: relative; z-index: 2;padding-top: .3rem;}
.login_content .login-input input{ position: relative; z-index: 2;width: 100%;;padding: 10px 15px; border: 1px solid #bdbdbd; outline: none; background: transparent; }
.login_content .login-placeholder{ position: absolute; z-index: -1; left: 0; top: 0; padding: 0 0 0 16px; line-height: 40px; font-size: 14px; color: #999; }
.login_content .login-error{ line-height: 24px; font-size: 12px; color: #ff0000; }
.login_content .login-radio{ margin: 10px 0 0; font-size: 14px; color: #747474; }
.login_content .login-radio input{ margin: 0 5px 0 10px; vertical-align: middle; }
.login_content .login-submit{ width: 100%; height: 40px; margin: 15px 0; font: normal 16px/40px Microsoft Yahei; color: #fff; border: 0; background: #27aec2; outline: none; cursor: pointer; transition: opacity .2s; }
.login_content .login-submit:hover{ opacity: .8; }
.login_content .login-fd, .login-forget:link, .login-forget:visited{ color: #666;margin-top: .2rem;}
.login_content .login-reg:link, .login-reg:visited{ color: #60b8ee; }
.login_content .login-reg:hover{ color: #60b8ee; text-decoration: underline; }
.login_content .popup{ position: absolute; z-index: 99999999; padding: 6px; font-size: 14px; border-radius: 2px; background: rgba(0,0,0,0.3);left: 0;bottom: 0;height: 100%;background: rgba(0,0,0,.3);width: 100%;}
.login_content .popup .hd{ height: 44px; background: #27aec2; }
.login_content .popup .bd{ background: #fff; }
.login_content .popup-title{ font: normal 18px/44px "Microsoft Yahei"; color: #fff; text-align: center; }
.login_content .popup-close{ position: absolute; right: .1rem; top: 0; z-index: 9;color: #fff;font-size: 24px;}
.login_content .shade{ position: fixed; left: 0; top: 0; z-index: 9998; width: 100%; height: 100%; background: rgba(0,0,0,0.3);}
*/
</style>
