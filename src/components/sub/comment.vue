<template>
	<div class="app-comment">
		<div class="mui-card">
			<div class="mui-card-header">页眉</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					欢迎吐槽
					<textarea placeholder="最多吐槽120个字" v-model="msg"></textarea>
					<mt-button type="primary" size="large" @click="addcomment">发表评论</mt-button>
				</div>
			</div>
			<div class="mui-card-footer">
				<div class="cmt-list">
					<div class="cmt-item" v-for="(item,i) in list" :key="item.id">
						<div>第{{i+1}}楼  发表时间{{item.ctime|dataFilter}}</div>
						<div>{{item.content}}</div>
					</div>
				</div>
			</div>
		    <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
		</div>
	</div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
	data(){
		return {
			list:[],
			pno:0,
        	pageSize:5,
			msg:""//双向绑定的评论内容
		}
	},
	methods:{
		//添加评论
		addcomment(){
			//获取评论表里的内容，并且判断
			var m=this.msg;
			var size=m.trim().length;//去除字符串前后的空字符的函数
			if(size==0){
				//添加提示框
				Toast("评论内容不能为空");
				return;
			}
			var bid=this.$route.query.bid;
			//console.log(nid);
			//1.创建参数对象，postDate
			var popstData=this.qs.stringify({//js对象转换成字符串
				bid:bid,
				content:this.msg
			})
			//2.发送post
			var url="http://127.0.0.1:3000/addcomment"
			this.axios.post(url,popstData).then(result=>{
				//console.log(result.data);
				//3.接收返回的数据
				Toast("评论成功");
				this.msg="";
				//2.2页码先清空
				this.pno=0;
				//2.3清空原理的数组
				this.list=[];
				//3.立即查看新的评论结果
				this.getMore();
			})
		},
		//评论的分页显示
		getMore(){
			this.pno++;
			var url="http://127.0.0.1:3000/find?bid="+this.$route.query.bid+"&pno="+this.pno+"&pageSize="+this.pageSize;
			this.axios.get(url).then(result=>{
				console.log(result);
				var rows=this.list.concat(result.data.data);
				this.list=rows;
			})
		}
	},
	created(){
		this.getMore();
		//this.addcomment();
	}
}
</script>
<style>
	
</style>