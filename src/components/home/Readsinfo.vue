<template>
	<div class="app-newsinfo">
		<div class="mui-card">
			<div class="mui-card-header mui-card-media" :style="'height:40vw;background-image:url('+info.img_url+')'"></div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<!--<p>{{info.ctime|dataFilter}}发布</p>-->
					<p>{{info.bname}}</p>
					<p style="color: #333;">
						《{{info.bname}} 》 阅读{{info.count}}次
					</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<a class="mui-card-link">Like</a>
				<a class="mui-card-link">Read more</a>
			</div>
		</div>
		<!--评论-->
		<comment-box></comment-box>
	</div>
</template>
<script>
//1.引入
import comment from "../sub/comment.vue";

export default {
	data(){
		return {
			info:{}
			}
	},
	created(){
		this.$route.query.bid;
		this.findinfo();
	},
	methods: {
		findinfo(){
			var bid=this.$route.query.bid;
			//console.log(nid);
			var url="http://127.0.0.1:3000/findReadsinfo?bid="+bid;
			this.axios.get(url).then(result=>{
				console.log(result.data.data[0]);
				this.info=result.data.data[0];
			})
		},

	},
	
	//2.注册
	components:{
		"comment-box":comment
	}
}
</script>
<style>
	
</style>