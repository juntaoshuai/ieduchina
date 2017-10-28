<template>
<header>
	<div v-html=room.name></div>
	<a href="http://m.live.ieduchina.com/"></a>
	<!--<span id="shareBtn"></span>-->
</header>
</template>

<script>
export default {
	props:{
		room:{
			type:Object
		}
	},
	mounted:function(){
//		appShare({
//			ele: '#shareBtn'
//		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{width: 100%;background: #27aec2;height:.78rem;line-height: .78rem;text-align: center;font-size: .38rem;color: #ffffff;position: absolute;top: 0;left: 0;width: 100%;z-index: 5;}
header a{width: .26rem;height: .49rem;position: absolute;display: block;background: url(../assets/back.png);background-size: 100% 100%;left: .3rem;top: .13rem;}
	header div{overflow: hidden; text-overflow:ellipsis;white-space:nowrap;width: 6rem;margin: 0 auto;}
	header span{display: block;position: absolute;width:.46rem;height: .42rem;background: url(../assets/share@1x.png);background-size: 100% 100%;right: .2rem;top: .2rem;}
</style>
