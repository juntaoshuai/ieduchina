<template>
<div class="content">
	<ul>
		<li v-for="i in chatArr">
			<div class="clearfix">
				<img v-if="i.type==1" class="fl" src="../assets/gz.png">
				<img v-if="i.type==3" class="fl" src="../assets/zb.png">
				<img v-if="i.type==4" class="fl" src="../assets/kf.png">
				<div class="fl">
					<span v-if="i.type==1">{{i.author.name}}</span>
					<span v-if="i.type==3">主播 {{i.author.name}}</span>
					<span v-if="i.type==4">客服 {{i.author.name}}</span>
					<p>{{i.chatTime}}</p>
				</div>
				<span class="fr" @click="replay(i.author.name)">回复</span>
			</div>

			<article v-html=i.content></article>
		</li>
	</ul>
	<div v-show="chatArr.length >= 20" class="loadMore" @click="more"><span>{{moreText}}</span></div>
</div>
</template>

<script>
const addnum = 20
import {getString} from '../js/common'
export default {
	data (){
		return {
			num:addnum
		}
	},
	props:{
		chatArr:{
			type:Array
		},
		moreText:{
			type:String
		}
	},
	methods:{
		more:function(){
			if(this.moreText == '没有更多了'){
				return
			}

			this.$parent.moreText = '加载中...'
            let url = getString('0201',{"start":this.num,"size":addnum})
            this.num += addnum
            io.send(url)
		},
        replay:function(val){
			if(userLogin.loginType == 1){
            	this.$parent.$parent.$parent.defVal = val
			}else{
				this.$parent.$parent.$parent.nologin = true
			}
        }
	}
}
</script>

<style scoped="">
.content{padding: 0 .3rem 1.4rem .3rem;height: 100%;overflow-y: auto;position: relative;}
.content img.fl{width: .8rem;height: .8rem;}
div.fl{margin-left: .12rem;padding-top: .1rem;}
li{padding: .16rem 0;border-bottom: 1px solid #b5b5b5;}
div.fl span{color: #666666;font-size: .24rem;}
div.fl p{color: #999999;font-size: .2rem;margin-top: .04rem;}
span.fr{margin-top: .24rem;font-size: .24rem;color: #27aec2;}
article{line-height: .36rem;color: #000000;font-size: .24rem;margin-top: .04rem;word-break: break-all;}
.loadMore{margin-top: .2rem;}
.replay{border-top: 1px dashed #dcdcdc;padding-top: .12rem;margin-top: .12rem}
</style>
