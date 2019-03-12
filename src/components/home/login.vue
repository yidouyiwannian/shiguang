<template>
	<div class="app-login">
		<h3>登录界面</h3>
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<form>
							用户名：<input type="text" name="uname" v-model="uname">
							密码：<input type="password" name="upwd" v-model="upwd">
							<input type="button" value="登录" @click="butLogin">
						</form>
					</div>
				</div>
			</div>
		
	</div>
</template>
<script>
//单独引入Toast
import {Toast} from "mint-ui";
export default {
	data(){
		return {
			uname:"",
			upwd:""
		}
	},
	methods:{
		butLogin(){
			//1.获取用户输入的用户名和密码
			var u=this.uname;
			var p=this.upwd;
			//console.log(u+"-"+p);
			//2.验证码不能为空
			var reg=/^[a-z0-9]{3,12}$/i;
			if(!reg.test(u)){
				Toast("用户名格式不正确");
				return;
			}
			//3.发送ajax请求
			var url="http://127.0.0.1:3000/Login?uname="+u+"&upwd="+p;
			this.axios.get(url).then(result=>{
				//console.log(result.data.code);
				var i=result.data.code;
				if(i==-1){
					//4，失败显示提示框
					Toast("用户名或密码有误");
				}else if(i==1){
					//5. 成功 跳转home
					Toast("登录成功");
					this.$router.push("/Home");
				}
			})
			
		}
	}
}
</script>
<style>
	
</style>