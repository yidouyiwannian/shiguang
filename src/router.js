import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/tabbar/Home.vue"
import Read from "./components/home/ReadList.vue"
import GoodList from "./components/goods/GoodList.vue"
import Goodinfo from "./components/goods/Goodinfo.vue"
import Readinfo from "./components/home/Readsinfo.vue"
import Login from "./components/home/login.vue"
import ShopCart from "./components/home/ShopCart.vue"
import Logout from "./components/home/logout.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',redirect:'/Home'},
    {path:'/Home',component:Home},
    {path:'/Read',component:Read},
    {path:'/GoodList',component:GoodList},
    {path:'/Goodinfo',component:Goodinfo},
    {path:'/Readinfo',component:Readinfo},
    {path:'/Login',component:Login},
    {path:'/ShopCart',component:ShopCart},
    {path:'/Logout',component:Logout}
  ]
})