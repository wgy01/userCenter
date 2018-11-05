<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="cardTitle">
				<h1>公司列表</h1>
				<Button type="primary" size="small" style="margin-left: 10px;" @click="addShow = true">创建公司</Button>
			</div>
			
			<xw-table :tableColumns="tableColumns" :tableData="tableData"></xw-table>
			
		</Card>
		
		<Modal v-model="addShow" width="700">
			
	        <p slot="header">创建公司</p>
	        
	        <Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="70">
				
				<Row :gutter="16">
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						
						<FormItem label="公司名称" prop="name">
							<Input v-model="formData.name"></Input>
				        </FormItem>
				        
				        <FormItem label="公司行业" prop="industry">
				        	<Cascader :data="industryData" v-model="formData.industry"></Cascader>
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
			
	        <div slot="footer">
	            <Button @click="addShow = false">取消</Button>
	            <Button type="primary" @click="addCompany('formInstance')">确定创建</Button>
	        </div>
	        
	    </Modal>
		
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
        	
        	addShow: false,
        	
        	formData: {
        		name: '',//公司名称
        		industry: [],//公司行业
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
                    { type: 'array', required: true, message: '请选择公司行业', trigger: 'change' }
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
        	
        	industryData: [
        		{
        			value: 'A',
                    label: '行业1',
                    children: [
                    	{
                    		value: '1',
                    		label: '行业1-1',
                    	}
                    ]
        		}
        	],
        	
        	tableColumns: [
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: '名称',
                    key: 'name'
                },
            ],
            
            tableData: [],
            
        }
    },
    methods: {//方法
    	
    	setSubmitAjax(){//设置提交数据
    		$ax.getAjaxData('Helper/createFormToken', {}, res1 => {//获取表单toKen
    			if(res1.code == 0){
    				$ax.getAjaxData('Center/addCompanyInfo', {
    					name: this.formData.name,//公司名称
    					hx1: this.formData.industry[0],//行业代码
    					hx2: this.formData.industry[1],//行业代码
    					nation: this.formData.nation,//国家
    					provice: this.formData.address[0] || '666',//省份
    					city: this.formData.address[1] || '666',//城市
    					county: this.formData.address[2] || '666',//地区
    					town: '666',//街道
    					website: this.formData.website,//企业官网
    					business: this.formData.business,//主营业务
    					yy_img: 'img.jpg',//营业执照照片
    					token_key: res1.data.token_key,
    					token: res1.data.token,
    				}, res2 => {
    					if(res2.code == 0){
    						this.formData = {
				        		name: '',//公司名称
				        		industry: [],//公司行业
				        		nation: '86',//国家
				        		address: [],//公司地址
				        		website: '',//企业官网
				        		business: '',//主营业务
				        	};
				        	console.log(this.formData);
				        	this.getCompanyList();
    						this.addShow = false;
    						this.$Message.success('创建成功');
    					}
    				});
    			}
    		});
    	},
    	
    	getCompanyList(){//获取公司列表
    		$ax.getAjaxData('Center/companyInfoAjax', {}, res => {
    			if(res.code == 0){
    				this.tableData = res.data;
    			}
    		});
    	},
    	
    	addCompany(name){//创建公司
    		this.$refs[name].validate((valid) => {
                if(valid){
                	this.setSubmitAjax();
                }
            });
    	},
    	
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
				
				let companyData = await $ax.getAsyncAjaxData('Center/companyInfoAjax', {});//获取公司列表
				
				next(vm => {
					if(companyData.code == 0){
						vm.tableData = companyData.data
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