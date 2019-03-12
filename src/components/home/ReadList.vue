<template>
	<div class="app-newslist">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.bid">
				<router-link :to="'/Readinfo?bid='+item.bid">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.bname}}
						<p class='mui-ellipsis'>
							<!--<span>{{item.ctime|datetimeFilter}}</span>-->
							<span>阅读{{item.count}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
		<mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>
<script>
export default {
	data(){
       return {
	 		list:[],
			pno:1,//当前页码
			pageSize:7//页大小			
       }
     },
	 methods: {
		 getMore(){
			 //1.加载下一页数据，修改当前页码+1
			 this.pno++;
			 //2.发送请求get
			 var url="http://127.0.0.1:3000"
			 url+="/Readlist?pno="+this.pno
			 url+="&pageSize="+this.pageSize;
			 this.axios.get(url).then(result=>{
			 	//拼接
				 var rows=this.list.concat(result.data.data);
				 //3.保存数据到list
			 	this.list=rows;
			 })
		 },
		 getlist(){
			 //1.发送ajax请求给服务器
			 var url="http://127.0.0.1:3000/Readlist"
			 this.axios.get(url).then(result=>{
				 //console.log(result);
				 this.list=result.data.data;
			 })
			 
		 },
		 
	 },
	 created() {
		 //console.log(this.$route.query.bid);
		 this.getlist();
	 },
}

</script>
<style>
	.app-newslist li .mui-ellipsis{
		display:flex;
		font-size:12px;
		color:#226aff;
		justify-content:space-between;
	}
	.mt-button{
		background:#71E5D1;
	}
</style>