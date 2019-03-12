<template>
	<div class="app-cart">
		<div class="mui-card">
				<div class="mui-card-header">
					<h3>购物车</h3>
					<h4>
						<!--allcb的状态-->
						<input type="checkbox" @click="selectAll" :checked="allcb">全选
					</h4>
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="item.id">
								<a href="javascript:;">
									<img class="mui-media-object mui-pull-left" src="">
									<div class="mui-media-body">
										<p class='mui-ellipsis'>
											<!--购物车商品项 start-->
											<input type="checkbox" :checked="item.cb" @click="modifyitem" :data-index="i">
											{{item.lname}}
											{{item.price}}
											<button @click="delItem" :data-id="item.id" :data-idx="i">删除</button>
										</p>
									</div>
								</a>
							</li>
						</ul>	
					</div>
				</div>
				<div class="mui-card-footer">
					<button @click="removeItem">删除选中的所有</button>
					小计：$3
				</div>
			</div>
	</div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
	data(){
		return {
			list:[],  //保存购物车列表
			//cb:false  //临时解决方法,所有商品的选择状态
			cb:false,
			allcb:false,//保存全选复选框的状态
		}
	},
	methods: {
		delItem(e){
			//1.获取当前购物车id
			//dataset数据库存储的
			var id=e.target.dataset.id;
			var idx=e.target.dataset.idx;
			//console.log(idx);
			//2.发送ajax请求
			var url="http://127.0.0.1:3000/delCartItem?id="+id;
			this.axios.get(url).then(result=>{
				//3.获取返回结果是否删除成功
				if(result.data.code==1){
					Toast("删除成功");
					//4.删除list对应的购物车商品对象
					this.list.splice(idx,1);
				}
			})
			
		},
		loadMore(){
			//1.url
			var url="http://127.0.0.1:3000/cartlist?uid=1";
			//2.发送Ajax
			//配合第一种临时方法
			/*this.axios.get(url).then(result=>{
				//console.log(result.data);
				this.list=result.data.data;
				//完成操作 为列表中的每个对象添加属性cb
				//cb表示复选框状态 true 当前商品选中
				//cb表示复选框状态false 选中清除
				for(var item of this.list){
					item.cb=false;
				}
				console.log(this.list);
			})*/
			//正常方案
			this.axios.get(url).then(result=>{
				//判断是否登录
				if(result.data.code==-1){
					Toast("请登陆");
					return;
				}else{
					//1.接收服务器程序返回的数据
					var rows=result.data.data;
					//修改全局购物车数量
					this.$store.commit("updateCount",rows.length);
					//2.为每一个商品添加商品对象添加属性cb选中状态
					for(var item of rows){
						item.cb=false;
					}
					//3.将最终数组赋值 list列表
					this.list=rows;
				}
			})
		},
		selectAll(e){
			//1.获取当前复选框的状态
			var cb=e.target.checked;
			//this.cb=cb;
			this.allcb=cb;//
			//暂时除了问题
			for(var item of this.list){
				item.cb=cb;
			}
			//2.如果状态为true
			//3.将所有cb的变成true
			//4.否则，将所有cb的变成false
		},
		modifyitem(e){
			//修改
			//获取当前元素的下标
			var idx=e.target.dataset.index;
			//console.log(idx);
			//将下标对象数组中元素cb修改当前复选状态
			var checked=e.target.checked;
			//将数组中对应的cb状态修改
			this.list[idx].cb=checked;

			//统计购物车中商品选中的数量==list.length
			var count = 0;
			for(var item of this.list){
				if(item.cb){
					count++;
				}
			}
			if(count==this.list.length){
			this.allcb = true;
			}else{
			this.allcb = false;
			}
      },
		removeItem(){
			//console.log(this.list);
			var html="";
			//遍历数组中的元素
			for(var item of this.list){
				//判断cb是否为true
				if(item.cb){
					//保存id,拼字符串
					html+=item.id+",";
				}
			}
				//截取字符串
				html=html.substring(0,html.length-1);
				//console.log(html);
				//发送ajax请求 删除多个商品
				var url="http://127.0.0.1:3000/removeMItem?ids="+html;
				this.axios.get(url).then(result=>{
					if(result.data.code==1){
						Toast("删除成功");
						this.loadMore();
					}
				})
			
		}
	},
	created() {
		this.loadMore();
	},
}
</script>
<style>
	
</style>