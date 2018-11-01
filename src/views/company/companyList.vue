<template>
	
	<div>
		
		<Card>
			
			<h1 slot="title">新建公司</h1>
			
			<Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="70">
				
				<Row :gutter="16">
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="公司名称" prop="name">
							<Input></Input>
				        </FormItem>
				        <FormItem label="公司行业" prop="industry">
							<Select v-model="formData.industry" style="width:100%">
						        <Option value="1">行业1</Option>
						        <Option value="2">行业2</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="国家" prop="nation">
							<Select v-model="formData.nation" style="width:100%">
						        <Option value="86">中国</Option>
						        <Option value="87">美国</Option>
						    </Select>
				        </FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="公司地址" prop="address">
							<cascader-area v-model="formData.address"></cascader-area>
				        </FormItem>
						<FormItem label="企业官网" prop="website">
							<Input v-model="formData.website"></Input>
				        </FormItem>
				        <FormItem label="主营业务" prop="business">
							<Input v-model="formData.business"></Input>
				        </FormItem>
					</Col>
					
				</Row>
				
			</Form>
			
		</Card>
		
		<Card style="margin-top: 16px;">
			
			<div slot="title" class="cardTitle">
				<h1>公司列表</h1>
				<Button type="primary" size="small" style="margin-left: 10px;">创建公司</Button>
			</div>
			
			<Table stripe :columns="columns1" :data="data1"></Table>
			
		</Card>
		
	</div>
	
</template>

<script>

export default {
	name: 'companyList',
	components:{//组件模板
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
        	
        	formData: {
        		name: '',//公司名称
        		industry: '',//公司行业
        		nation: '86',//国家
        		address: [],//公司地址
        		website: '',//企业官网
        		business: '',//主营业务
        	},
        	
        	ruleData: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                industry: [
                    { required: true, message: '请选择公司行业', trigger: 'change' }
                ],
                nation: [
                    { required: true, message: '选择国家', trigger: 'blur' }
                ],
                address: [
                    { type: 'array', required: true, message: '请选择公司地址', trigger: 'change' }
                ],
                website: [
                    { required: true, message: '请输入企业官网', trigger: 'blur' }
                ],
                business: [
                    { required: true, message: '请填写主营业务', trigger: 'blur' }
                ],
           },
        	
        	columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
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
			
			//async、await错误处理
			try {
				
				/*
				 * 
				 * ------串行执行---------
				 * console.log(await getAjaxData());
				 * ...
				 * 
				 * ---------并行：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。（执行效率高、快）----------
				 * let abc = getAjaxData();//先执行promise函数
				 * ...
				 * console.log(await abc);
				 * ...
				*/
				next(vm => {
					
				});
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>