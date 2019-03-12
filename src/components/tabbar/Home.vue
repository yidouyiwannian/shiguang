<template>
  <div class="app-home">
   <!--顶部导航条  去公共组件了-->
   
   <!--轮播图-->
   <mt-swipe>
     <mt-swipe-item v-for="item in list" :key="item.id">
	 		<img :src="item.img_url" />
     </mt-swipe-item>
   </mt-swipe>
   <!--九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<router-link to="/Read">
							<img src="../../img/menu1.png" alt="">
							<div class="mui-media-body">在线阅读</div>
						</router-link></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<router-link to="/GoodList">
							<img src="../../img/menu2.png" alt="">
							<div class="mui-media-body">排行榜</div>
						</router-link></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/ShopCart">
							<img src="../../img/menu3.png" alt="">
							<div class="mui-media-body">购物车</div>
						</router-link></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="GoodList">
				    <img src="../../img/menu4.png" alt="">
					<div class="mui-media-body">书城</div></router-link></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <img src="../../img/menu5.png" alt="">
				    <div class="mui-media-body">搜索</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <img src="../../img/menu6.png" alt="">
				    <div class="mui-media-body">更多</div></a></li>
			    <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
				    <div class="mui-media-body">Email</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-chatbubble"></span>
				    <div class="mui-media-body">Chat</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-location"></span>
				    <div class="mui-media-body">location</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-search"></span>
				    <div class="mui-media-body">Search</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-phone"></span>
				    <div class="mui-media-body">Phone</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-gear"></span>
				    <div class="mui-media-body">Setting</div></a></li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-info"></span>
				    <div class="mui-media-body">about</div></a></li>
			   <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
				    <span class="mui-icon mui-icon-more"></span>
				    <div class="mui-media-body">more</div></a></li>-->
			</ul>    
   <!--tabbar 去公共组件了 -->
		
  </div>
</template>
<script>
  export default {
     data(){
       return {
	 		list:[]
       }
     },
	 methods: {
		 handleImage(){
			 //1.发送ajax请求给服务器
			 var url="http://127.0.0.1:3000/imageList"
			 this.axios.get(url).then(result=>{
				 //2.接收服务器返回的数据
			 	 //3.将结果保存在list
				 //console.log(result);
				 this.list=result.data;
			 })
			 
		 }
	 },
	 created() {
		 this.handleImage();
	 },
  }
</script>
<style>
 /*轮播图*/
 .app-home .mint-swipe{
   height:200px;
 }
 .app-home .mint-swipe img{
   width:100%;
 }
 /*九宫格 */
 .app-home .mui-grid-9 img{
	width:60px;
	height:60px;
 }
 .mui-table-view .mui-grid-view .mui-grid-9{
	 background:#fff;
 }
</style>