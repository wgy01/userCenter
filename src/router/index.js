import Vue from 'vue'
import Router from 'vue-router'
import routers from './router.js'; //调用路由表
import { pathImperfect, canTurnTo } from '@/toolBox'; //调用工具

Vue.use(Router)

export const router = new Router({
	routes: routers
});

router.beforeEach((to, from, next) => {//路由跳转前
	
	router.app.$Loading.start();//加载进度条
	
	//检测用户登录
	if(!sessionStorage.userLogin && to.name !== 'login' && to.name !== 'register'){//用户未登录
		
		next({
			name: 'login'
		});
		
		router.app.$Loading.finish();//加载进度条
		
	}else if(sessionStorage.userLogin){//用户已登录
		
		if(to.name === 'login'){
			next({
				name: 'home'
			});
		}else{
			//权限
			if(canTurnTo(routers, window.USE_RACCESS, to.name)){
		
				if(pathImperfect(routers, to.name)){
					next({
						replace: true,
						name: 'error-401'
					});
				}else{
					next()
				}
		
			}else{
		
				next({
					replace: true,
					name: 'error-403'
				});
		
			}
		}
		
	}else{
		next();
	}
	
});

router.afterEach((to, from) => {//会在任意路由跳转后执行
	router.app.$Loading.finish();//加载进度条
});