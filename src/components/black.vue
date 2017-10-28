<template>
    <!-- 黑名单 -->
    <div v-if="black">
		<div class="black_content"></div>
		<div class="black_main">
			<span class="notice_close" @click="goBack"></span>
			<h2>提示</h2>
			<p>你已被加入黑名单，理由是：{{reason}}</p>
			<span class="black_ok"  @click="goBack">确定</span>
		</div>
    </div>
</template>

<script>
export default {
    props:{
        black:{
            type:Boolean
        },
        reason:{
            type:String
        }
    },
    methods:{
        goBack:function(){
            location.href = 'http://m.live.smartlifein.com'
        }
    }
}
</script>
<style>
.black_content{
    position: absolute;
    width: 100%;
    height: 100%;z-index: 9999;background: rgba(0,0,0,0.3);
    top: 0;
    left: 0;}
    .black_main{
        position: absolute;
        width: 100%;  background: #ffffff;z-index: 10000;
        bottom: 0; text-align: center;padding-bottom: .5rem;}
.black_main h2{font-size: .36rem;
    line-height: .8rem;font-weight: normal;border-bottom: 1px solid #dadada}
    .black_main p{margin: .5rem 0}
    .black_ok{
        display: block;
        width: 1.2rem;
        height: .72rem;background: #27aec2;color: #fff;margin: 0 auto;line-height: .72rem;font-size: .32rem}
</style>
