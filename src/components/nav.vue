<template>
<nav>
	<span v-bind:class="[active == 0 ? 'active' : '']" @click="change(0)">
		<span v-if="status==0">直播预告</span>
		<span v-if="status==2">正在直播</span>
		<span v-if="status==4">直播结束</span>
	</span>
	<em>|</em>
	<span v-bind:class="[active == 1 ? 'active' : '']" @click="change(1)">聊天室</span>
	<em>|</em>
	<span v-bind:class="[active == 2 ? 'active' : '']" @click="change(2)">直播简介</span>
	<div class='fr' @click="show"></div>

	<div class="list" v-show="isKF">
		<ul>
			<li v-for="i in kefu" @click="replay(i.name)">{{i.name}}</li>
		</ul>
	</div>
</nav>
</template>

<script>
export default {
	data (){
		return {
			isKF:false
		}
	},
	props:{
		status:{
			type:Number
		},
		kefu:{
			type:Array
		},
		active:{
			type:Number
		}
	},
	methods:{
		show:function(){
            this.isKF = !(this.isKF)
		},
		change:function(index){
			this.$parent.navChange(index)
		},
        replay:function(val){
			if(userLogin.loginType == 1){
				this.$parent.defVal = val
				this.$parent.active = 1
				this.isKF = false
			}else{
				this.$parent.nologin = true
			}
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav{border-bottom: 1px solid #cccccc;height: .86rem;line-height: .86rem;padding: 0 .3rem;font-size: .32rem;color: #666;position: absolute;width: 100%;top: 5.13rem;left: 0;z-index: 5;}
nav em{margin:0 .2rem;font-style: normal;color: #aaaaaa;}
div.fr{width: .78rem;height: .69rem;background: url(../assets/kefu.png);background-size: 100% 100%;margin-top: .08rem;}
nav span.active{color: #27aec2;border-bottom: 2px solid #27aec2;padding: .2rem 0}
.list{position: absolute;z-index: 5;right: 0;top: .86rem;background: rgba(39,174,194,0.8);color: #fff;font-size: .34rem;padding-right: .2rem;}
.list ul li{line-height: .66rem;padding-left: .65rem;background: url(../assets/icon.png) no-repeat .2rem center;background-size: .35rem .35rem;}
</style>