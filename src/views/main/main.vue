<style scoped lang="less">
	.layout {
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
		height: 100vh;
	}
	
	.layout-header-bar {
		padding: 0 !important;
		height: auto !important;
		line-height: initial !important;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}
	
	.content-box{
		width: 100%;
		height: 100%;
		padding: 30px 16px 300px;
		overflow: auto;
		position: absolute;
		top: 0;
		left: 0;
	}
	.tx-box{
		background: #000C17;
		padding: 16px 0;
		text-align: center;
		border-bottom: 1px solid #808695;
		.img-public(){
			margin: auto;
			background: url(../../../public/img/tx.jpg) center / cover no-repeat;
			border-radius: 100%;
		}
		.img-large{
			.img-public();
			width: 80px;
			height: 80px;
			line-height: 80px;
		}
		.img-small{
			.img-public();
			width: 50px;
			height: 50px;
			line-height: 50px;
		}
		.txt{
			text-align: center;
			color: #fff;
			margin-top: 14px;
			font-size: 18px;
		}
	}
</style>

<template>

	<div class="layout">

		<Layout>
			
			<!--左侧菜单-->
			<Sider ref="siderInstance" hide-trigger collapsible :collapsed-width="64" v-model="isCollapsed" style="height: 100vh;">
				<div class="tx-box">
					<Avatar :class="isCollapsed ? 'img-small' : 'img-large'" />
					<p v-show="!isCollapsed" class="txt">{{userName}}</p>
				</div>
				<menu-sider ref='sideMenu' :menuList="menuList" :isCollapsed="isCollapsed"></menu-sider>
			</Sider>
			
			<!--右侧-->
			<Layout style="overflow: hidden;">
				
				<!--头部-->
				<Header class="layout-header-bar">
					<div style="height: 100%;">
						<!--面包屑导航-->
						<breadcrumb-module :breadCrumbList="breadCrumbList" :isCollapsed="isCollapsed" @clickIcon="collapsedSider"></breadcrumb-module>
						<!--tag标签导航-->
						<tag-module :tagList="tagNavList"></tag-module>
					</div>
				</Header>
				
				<!--内容-->
				<Content style="position: relative;">
					<div class="content-box">
						<router-view/>
					</div>
				</Content>
				
			</Layout>
			
		</Layout>

	</div>

</template>

<script>
	
import menuSider from './menu/menu-sider.vue'

import breadcrumbModule from './header/breadcrumb-module.vue';

import tagModule from './header/tag-module.vue';

import { getNewTagList } from '@/toolBox';

import { mapMutations } from 'vuex';

export default {
	name: 'Main',
	components: { //组件模板
		menuSider,
		breadcrumbModule,
		tagModule,
	},
	props: { //组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
	},
	data() { //数据
		return {
			
			userName: sessionStorage.userName || '未登录',
			
			isCollapsed: false,
			
		}
	},
	methods: { //方法
		
		...mapMutations([
			'setBreadCrumb',
	      	'setTagNavList',
	      	'addTag',
		]),
		
		collapsedSider() {//展开或收起左侧菜单
			this.$refs.siderInstance.toggleCollapse();
		},
		
	},
	computed: { //计算属性
		
		menuList(){//菜单列表
			return this.$store.getters.menuList;
		},
		
		breadCrumbList(){//面包屑列表
	    	return this.$store.state.app.breadCrumbList;
	    },
	    
		tagNavList(){//tag列表
	    	return this.$store.state.app.tagNavList;
	    },
		
	},
	watch: { //监测数据变化
		
		'$route'(newRoute){
			
			this.setBreadCrumb(newRoute.matched);
			
        	this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
			
		},
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
		/**
	     * @description 初始化设置面包屑导航和标签导航
	     */
	    this.setTagNavList();
	    
	    this.addTag({route: this.$store.state.app.homeRoute});
	    
	    this.setBreadCrumb(this.$route.matched);
		
	},
	mounted() { //模板被渲染完毕之后执行
		
	},

}
</script>