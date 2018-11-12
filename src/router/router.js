import Main from '@/views/main/main.vue';
import secondaryView from '@/components/secondary-view.vue';

/**
 * meta属性:
 * 
 * @param {Boolean : false} hideMenu 设置不在左侧菜单显示的路由
 * @param {Array} access 设置路由权限[1,2,3...] 或 ['admin','user'...]
 * @param {Boolean : false} showAlways 设置路由永远显示为二级菜单
 * @param {Boolean : false} hideBreadcrumb 设置不显示在面包屑导航中
 * @param {String : '定向到xxx路由的name'} highlightName 点击该路由后在菜单中高亮重定向
 * 
 */

export default [
	{
	    path: '/login',
	    name: 'login',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/login_register/login.vue')
	},
	{
	    path: '/register',
	    name: 'register',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/login_register/register.vue')
	},
	{
		path: '/',
		name: '_home',
	    redirect: '/home',
	    meta: {
	    	hideMenu: true,
	    },
	    component: Main,
	    children: [
		    {
		    	path: 'home',
		    	name: 'home',
	            meta: {
	            	title: '首页',
	            	hideMenu: true,
	            	icon: 'ios-paper',
			    },
	            component: () => import('@/views/home.vue')
		    }
		]
	},
	{
		path: '/accountInfo',
		name: 'accountInfo',
		meta: {
			hideBreadcrumb: true
		},
	    component: Main,
		children: [
			{
				path: 'person',
				name: 'person',
				meta: {
					title: '账户资料',
					icon: 'md-alarm',
				},
				component: () => import('@/views/accountInfo/person.vue')
			}
		]
	},
	{
		path: '/company',
		name: 'company',
		meta: {
			hideBreadcrumb: true
		},
	    component: Main,
		children: [
			{
				path: 'companyList',
				name: 'companyList',
				meta: {
					title: '公司列表',
					icon: 'md-alarm',
				},
				component: () => import('@/views/company/companyList.vue')
			}
		]
	},
	{
	    path: '/401',
	    name: 'error-401',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/errorPages/error-401.vue')
	},
	{
	    path: '/403',
	    name: 'error-403',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/errorPages/error-403.vue')
	},
	{
	    path: '*',
	    name: 'error-404',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/errorPages/error-404.vue')
	}
]