<template>
	
	<div v-if="!isLogin" style="background:#ccc;height:100%;position: relative;">
		
		<login v-if="showType === 'login'"></login>
		
		<register v-if="showType === 'register'"></register>
		
	</div>
	
</template>

<script>

import login from './login.vue'
import register from './register.vue'

export default {
	name: 'loginRegister',
	components:{//组件模板
		login,
		register
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
	},
    data () {//数据
        return {
        	
        	showType: 'login',
        	
        	isLogin: sessionStorage.userLogin,
        	
        }
    },
    methods: {//方法
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			try {
				
				let getMyInfo = await $ax.getAsyncAjaxData('Center/myInfo', {});
				
				next(vm => {
					if(getMyInfo.code == 0){//已登录
						sessionStorage.userLogin = 1;
						vm.$router.replace({
							name: 'person'
						});
					}
				});
				
			} catch(err) {
				console.log(err);
				next();
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>