<template>
	<div class="app-goodlist">
		<div class="goods-item" v-for="item in list" :key="item.bid">
			<img :src='item.img_url' alt="" @click="jumpInfo" :data-lid="item.bid"/>
			<h3>{{item.bname}}</h3>
			<div class="info">
				<span class="now">《{{item.bname}}》</span>
			</div>
			<div class="sell">
				<span>{{item.title}}</span>
			</div>
		</div>
		<mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>
<script>
export default {
	data(){
		return {
			list:[],
			pno:1,
			pageSize:4
		} 
	},
	methods:{
		jumpInfo(e){
			var bid=e.target.dataset.bid;
			this.$router.push("/Goodinfo?bid="+bid);
		},
		getMore(){
			this.pno++;
			var url="http://127.0.0.1:3000/books?pno="+this.pno+"&pageSize="+this.pageSize;
			this.axios.get(url).then(result=>{
				//console.log(result.data);
				var rows=this.list.concat(result.data.data);
			 	this.list=rows;
		    })
	    }
	},
	created(){
		this.getMore();
	}
}
</script>
<style>
	.app-goodlist{
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
	}
	.app-goodlist .goods-item{
		width:49%;
		border:1px solid #ccc;
		box-shadow:0 0 8px #ccc;
		margin:4px 0;
		padding:2px;
		display:flex;
		flex-direction:column;
		min-height:230px;
		justify-content:space-between;
	}
	.app-goodlist .goods-item img{
		width:100%;
	}
	.app-goodlist .goods-item h4{
		font-size:18px;
	}
	.app-goodlist .goods-item .now{
		color:red;
		font-size:16px;
		font-weight:bold;
	}
</style>