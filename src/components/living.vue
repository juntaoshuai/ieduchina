<template>
<div class="living">
	<ul>
		<li v-for="i in historyArr">
			<h3>
				<span class="fl"></span>
				{{i.updateDate}}
			</h3>
			<article v-html="i.content"></article>
		</li>
	</ul>
	<div class="loadMore" @click="load"><span>{{morehis}}</span></div>
</div>
</template>

<script>
const addnum = 10
import {getString,dataTime} from '../js/common'
export default {
	data (){
		return {
			num:addnum
		}
	},
	props:{
		historyArr:{
			type:Array,
		},
		morehis:{
			type:String
		}
	},
	watch:{
//		'historyArr':function(newVal,oldVal){
//			for(let i = 0;i < newVal.length; i++){
//				this.historyArr[i].updateDate = dataTime(this.historyArr[i].updateDate)
//			}
//		}
	},
	methods:{
		load:function(){
			if(this.morehis == '没有更多了')
				return
			this.$parent.morehis = '加载中...'

            let url = getString('0340',{"start":this.num,"size":addnum})
            this.num += addnum
            io.send(url)
		}
	},
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.living{padding: .3rem;overflow-y:auto;height: 100%;word-break: break-all}
.living span.fl{display: block;width: .24rem;height: .24rem;background:#fff url(../assets/time.png);background-size: 100% 100%;margin-left: -.34rem;margin-top: 0;position: relative;z-index: 555;}
.living h3{color: #27aec2;font-size: .24rem;font-weight: normal;}
.living article{line-height: .45rem;color: #000;margin-top: .12rem;}
.living li{padding-left: .2rem;padding-bottom: .3rem;border-left: 1px solid #27aec2;}
.living img{max-width: 100%;display: block;margin: .08rem 0;}
</style>
