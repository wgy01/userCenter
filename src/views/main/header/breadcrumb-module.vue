<style scoped lang="less">
	.menu-collapsed-icon {
		margin: 0 20px;
		cursor: pointer;
		flex-shrink: 0;
	}
	.rotate-icon {
		transform: rotate(-90deg);
	}
	.tx{
		background: url(../../../../public/img/tx.jpg) center / cover no-repeat;
	}
</style>

<template>

	<div style="height: 53px;display: flex;align-items: center;overflow: hidden;">
			
		<Icon @click.native="collapsedSider" :class="{'rotate-icon': isCollapsed}" class="menu-collapsed-icon" type="md-menu" size="28"></Icon>
		
		<div style="white-space:nowrap;overflow: hidden;margin-right: 16px;">
	
			<Breadcrumb>
				<template v-for="item in breadCrumbList">
			        <BreadcrumbItem :replace="true" :to="item.to ? '/' : ''">
			        	<Icon :type="item.icon || item.meta.icon"></Icon>
			        	<span>{{item.meta.title}}</span>
			        </BreadcrumbItem>
		        </template>
		    </Breadcrumb>
	
		</div>
		
		<div style="margin: 0 46px 0 auto;flex-shrink: 0;">
			<Dropdown :transfer="true" trigger="click" @on-click="dropdownClick" placement="bottom-end">
		        <a style="display: inline-block;">
	           		<!--<Avatar class="tx" />-->
	           		<Icon type="ios-keypad" size="24" color="#5C6B77" />
	           		<Icon size="20" type="md-arrow-dropdown" />
		        </a>
		        <DropdownMenu slot="list">
		            <DropdownItem name="logout">退出登录</DropdownItem>
		        </DropdownMenu>
		    </Dropdown>
        </div>
		
	</div>

</template>

<script>
export default {
	name: 'breadcrumbModule',
	components: { //组件模板
		
	},
	props: {
		
		breadCrumbList: {
			type: Array,
			default: () => []
		},
		
		isCollapsed:{
		 	type: Boolean,
		},
		
	},
	data() { //数据
		return {
			
		}
	},
	methods: { //方法
		
		collapsedSider() {
			this.$emit('clickIcon');
		},
		
		dropdownClick(name){
			
			if(name === 'logout'){//退出登录
				$ax.getAjaxData('Center/logout', {}, res => {
					if(res.code == 0){
						sessionStorage.removeItem('userLogin');
						sessionStorage.removeItem('userName');
						this.$router.push({
							name: 'login'
						});
						this.$Message.success('退出成功');
					}
				});
			}
			
		},
		
	},
	computed: { //计算属性
		
	},
	watch: { //监测数据变化
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
	},
	mounted() { //模板被渲染完毕之后执行
		
	},

}
</script>