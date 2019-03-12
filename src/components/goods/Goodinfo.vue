<template>
  <div class="app-goodsinfo">
    <!--轮播图-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
              <!--调用子组件-->
          <swiper-box :list="list"></swiper-box>
        </div>
      </div>
    </div>  
    <!-- 商品信息 -->
    <div class="mui-card">
      <div class="mui-card-header">
        <img src="info.img_url" alt="">
        {{info.bname}}
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            销售价:{{info.price}}
          </p>
              购买数量:
        <div class="mui-numbox">
          <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodsSub">-</button>
          <input class="mui-input-numbox" type="number" value="1" v-model="val"/>
          <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
        </div>
      </div>
    </div>
    <div class="mui-card-footer">
              <mt-button type="danger" size="small" @click="addcart">加入购物车</mt-button>
    </div>
  </div>
    <!--商品参数-->
  </div>  
</template>
<script> 
  import {Toast} from "mint-ui";
  //1:引入子组件
  import swipe from "../sub/swiperBox.vue";
  //2:引入mui 组件js文件
  //import mui from "../../lib/mui/js/mui.js";
  export default {
    components:{
      "swiper-box":swipe
    },
    created() {
      //console.log("list组件参数:"+this.id);
      this.getImageList();//轮播图
      this.getGoodsInfo();//商品信息
    },
    data(){
      return  { 
        id:this.$route.query.id,
        list:[],
        val:1,
        info:{}
      }
    },
    methods:{
      getGoodsInfo(){
        //1:获取参数 id
        //var bid = this.bid;
        //2:发送ajax请求获取商品信息
        var url = "http://127.0.0.1:3000/findBook";
        url +="?bid="+this.id;
        this.axios.get(url).then(result=>{
            this.info = result.data.data[0];
            console.log(this.info)
        });
      },
      addCart(){
        console.log(123);
        //1:获取参数 uid=1 pid count price
        var uid = 1;//当前登录用户
        var bid = this.bid;//商品编号
        var count = this.val;//商品数量
        var price =  99;
        //2:发送ajax请求将数据发送服务器
        var url = "http://127.0.0.1:3000";
        url += "/addCart";
        this.axios.get(url,{
          params:{
            uid:uid,
            bid:bid,
            count:count,
            price:price
          }
        }).then(result=>{
            if(result.data.code > 0){
              Toast(result.data.msg);
            }else{
              Toast(result.data.msg);
            }
        });
      },
      goodsSub(){
        if(this.val > 1){
           this.val--;
        }
      },
      goodAdd(){
        if(this.val <= 998){
            this.val++;
        }
      },
      getImageList(){
         var url = "http://127.0.0.1:3000/";
         url +="imageList";
         this.axios.get(url).then(result=>{
           this.list = result.data;
         });
         //console.log(this.list);?????
       },
       addcart(){
         //console.log(123);
         //为按钮添加点击事件
         //获取两个参数 pid price uid=1
         var bid=this.id;
         var price=this.info.price;
         var uid=1;
         //console.log(pid+price+uid);
         //发送Ajax请求
         var url="http://127.0.0.1:3000/addcart?bid="+bid+"&price="+price+"&uid="+uid;
         this.axios.get(url).then(result=>{
           //将商品添加至购物车
           //显示提示框
           if(result.data.code==1){
             Toast("添加成功");
           }else{
             Toast("添加失败,请登陆");
           }
         })
         
       }
    }
  }  
</script>
<style>
</style>