<template>
    <div class="intro">
        <div class="dl">
            <div class="dt">
                主&#x3000;&#x3000;题：
            </div>
            <div class="dd" v-html="room.name"></div>
        </div>
        <div class="dl">
            <div class="dt">
                举办公司：
            </div>
            <div class="dd" v-html=room.company></div>
        </div>
        <div class="dl">
            <div class="dt">
                举办时间：
            </div>
            <div class="dd">
                {{room.start}}至 {{room.end}}
            </div>
        </div>
        <div class="dl">
            <div class="dt">
                直播内容：
            </div>
            <div class="dd" v-html=room.detail>
            </div>
        </div>
		<div class="contant_content" v-if="contactShow==0">
			<div v-show="contact.name" class="dl">
				<div class="dt">联 系 人：</div>
				<div class="dd">{{contact.name}}</div>
			</div>
			<div v-show="contact.mobilePhone" class="dl">
				<div class="dt">手机号码：</div>
				<div class="dd">{{contact.mobilePhone}}</div>
			</div>
			<div v-show="contact.telephone" class="dl">
				<div class="dt">电话号码：</div>
				<div class="dd">{{contact.telephone}}</div>
			</div>
			<div v-show="contact.department" class="dl">
				<div class="dt">部&#x3000;&#x3000;门：</div>
				<div class="dd">{{contact.department}}</div>
			</div>
			<div v-show="contact.job" class="dl">
				<div class="dt">职&#x3000;&#x3000;位：</div>
				<div class="dd">{{contact.job}}</div>
			</div>
			<div v-show="contact.address" class="dl">
				<div class="dt">地&#x3000;&#x3000;址：</div>
				<div class="dd">{{contact.address}}</div>
			</div>
			<div v-show="contact.fax" class="dl">
				<div class="dt">传&#x3000;&#x3000;真：</div>
				<div class="dd">{{contact.fax}}</div>
			</div>
		</div>
    </div>
</template>

<script>
import {dataTime,getString} from '../js/common'
    export default {
        props:{
            room:{
                type:Object,
                default:''
            },
			contact:{
				type:Object
			},
			contactShow:{
				type:Number
			}
        }
    }
</script>

<style>
    .intro{    padding: .3rem;
    height: 100%;
    overflow-y: auto;
    position: relative;font-size: .32rem;}
    .intro .dl{position: relative;padding-left: 1.65rem;margin-bottom: .12rem;}
    .intro .dt{position: absolute;left: 0;top: 0;width: 1.8rem;}
</style>