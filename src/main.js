import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入vuex
import Vuex from 'vuex';
//注册vuex组件
Vue.use(Vuex)
//创建store
var store=new Vuex.Store({
  //保存全局的属性
  state:{
    cartCount:sessionStorage.getItem("cartCount")||0//共享数据：购物车中商品的数量
  },
  //修改这个属性
  mutations:{
    increment(state){
      state.cartCount++;//购物车中的数量加一
    },
    //显示购物车列表时
    updateCount(state,count){
      state.cartCount=count;
      sessionStorage.setItem("cartCount",count)
    },
  },
  getters:{
    optCartCount:function(state){
      return state.cartCount;
    }
  }//
})
// 69 line将store对象添加vue示例成为一个属性



//1:引入mint-ui 样式文件
import'mint-ui/lib/style.css'
Vue.config.productionTip = false
//2:引入 mui库样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//3:引入mint-ui 组件 Header
import {Header,Swipe,SwipeItem,Button} from "mint-ui"
//4:注册Header组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
//5：引入axios
import axios from "axios"
//6.配置跨域访问保存session
axios.defaults.withCredentials=true;
//7.将axios库配置到vue实例对象中
Vue.prototype.axios=axios;
//7.1加载第三方模块qs
import qs from "qs";
//7.2配置qs
Vue.prototype.qs=qs;

//8.创建  新闻列表  日期过滤器
Vue.filter("datetimeFilter",function(val){
  //8.1创建日期对象
  var date=new Date(val);
  //8.2获取 年 月 日 时  分 秒
  var y=date.getFullYear();  
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  //8.3返回字符串---形式的日期
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

//9.创建新闻详情页的日期过滤器
Vue.filter("dataFilter",function(val){
  var date=new Date(val);
  var y=date.getFullYear();  
  var m=date.getMonth()+1;
  var d=date.getDate();
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d}`;
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
