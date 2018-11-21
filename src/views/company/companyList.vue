<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="cardTitle">
				<h1>公司列表</h1>
				<Button type="primary" size="small" style="margin-left: 10px;" @click="createCompany">创建公司</Button>
			</div>
			
			<xw-table
			:modalTitle="tabModalTitle"
			@on-btn-click="tabBtnClick"
			:tableColumns="tableColumns"
			:tableData="tableData">
				<div slot="modalContent">
					{{companyInfo}}
					<Form v-if="showType === 'details'" class="my-form" :label-width="80">
						<Row>
							<Col v-for="item in companyField" :key="item.value" :xs="24" :sm="12" :md="8" :lg="6">
								<FormItem :label="item.label+'：'">
										<div v-if="item.select">
											<p v-if="item.value === 'industry'">
												<industry-casc :value="[ companyInfo[item.select[0]], companyInfo[item.select[1]] ]" @on-change="industryChange" style="width: 100%;display: none;"></industry-casc>
												<span v-for="(itemIndustry, index) in industryTextArr">
							    					{{itemIndustry.name}}
							    					{{index == (industryTextArr.length-1) ? '' : ' / '}}
							    				</span>
											</p>
											<p v-else-if="item.value === 'address'">
												<cascader-area :value="[ companyInfo[item.select[0]], companyInfo[item.select[1]], companyInfo[item.select[2]] ]" @on-load-change="areaLoadChange" style="display: none;"></cascader-area>
												<span v-for="(itemArea, index) in areaTextArr">
							    					{{itemArea.name}}
							    					{{index == (areaTextArr.length-1) ? '' : ' / '}}
							    				</span>
											</p>
											<p v-for="seleItem in item.select" v-if="seleItem.value == companyInfo[item.value]">
												{{seleItem.label}}
											</p>
										</div>
										<p v-else>
											{{companyInfo[item.value]}}
										</p>
						        </FormItem>
					        </Col>
						</Row>
					</Form>
				</div>
			</xw-table>
			
		</Card>
		
		<Modal v-model="addShow" width="700">
	        <p slot="header">{{modalTitle}}</p>
	        <Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="70">
				<Row :gutter="16">
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="公司名称" prop="name">
							<Input v-model="formData.name"></Input>
				        </FormItem>
				        <FormItem label="公司行业" prop="industry">
				        	<industry-casc v-model="formData.industry" style="width: 100%;"></industry-casc>
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
	        <div slot="footer" style="text-align: center;">
	        	<Button type="primary" @click="addCompany('formInstance')">{{btnTitle}}</Button>
	            <Button @click="addShow = false">取消</Button>
	        </div>
	    </Modal>
		
	</div>
	
</template>

<script>
import industryCasc from '@/components/industry/industry-casc.vue';//行业级联
export default {
	name: 'companyList',
	components:{//组件模板
		industryCasc,
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
        	
        	industryTextArr: [],
        	
        	areaTextArr: [],
        	
        	tabModalTitle: '',
        	
        	showType: 'add',
        	
        	companyInfo: {},//公司信息
        	
        	formData: {
        		name: '',//公司名称
        		industry: [],//公司行业
        		nation: '',//国家
        		address: [],//公司地址
        		website: '',//企业官网
        		business: '',//主营业务
        		
        		xydm: '',//信用代码
				zclx: '',//注册类型
				zcmoney: '',//注册资金
				cynum: '',//从业人数
				telphone: '',//电话
				fax: '',//传真
				party: '',//是否有党部
				party_time: '',//党部成立时间
				party_num: '',//党部成员人数
				jyfw: '',//经营范围
        		
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
        	
        	companyField: [
        		{
        			label: '公司名称',
        			value: 'name'
        		},
        		{
        			label: '公司行业',
        			value: 'industry',
        			select: ['hx1', 'hx2']
        		},
        		{
        			label: '国家',
        			value: 'nation',
        			select: [
        				{
        					label: '中国',
        					value: '86'
        				},
        				{
        					label: '美国',
        					value: '87'
        				},
        				{
        					label: '英国',
        					value: '88'
        				},
        			]
        		},
        		{
        			label: '公司地址',
        			value: 'address',
        			select: ['provice', 'city', 'county']
        		},
        		{
        			label: '企业官网',
        			value: 'website'
        		},
        		{
        			label: '主营业务',
        			value: 'business'
        		},
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
                {
    				align: 'center',
    				width: 130,
    				title: '操作',
    				handle: [
    					{
    						name: '详情',
    						key: 'details',
    						modalShow: true,
    					},
    					{
    						name: '编辑',
    						key: 'edit',
    					},
    				],
    			}
            ],
            
            tableData: [],
            
        }
    },
    methods: {//方法
    	
    	industryChange(value, selectedData){
    		this.industryTextArr = selectedData;
    	},
    	
    	areaLoadChange(value, selectedData){
      		this.areaTextArr = selectedData;
    	},
    	
    	createCompany(){//创建公司按钮
    		this.formData = {
        		name: '',//公司名称
        		industry: [],//公司行业
        		nation: '',//国家
        		address: [],//公司地址
        		website: '',//企业官网
        		business: '',//主营业务
        	};
    		this.showType = 'add';
    		this.addShow = true;
    	},
    	
    	tabBtnClick(val){//表格按钮点击事件
    		this.tabModalTitle = val.params.row.name +'（'+ val.name +'）';
    		if(val.key === 'details'){//详情
    			this.industryTextArr = [];
        	
        		this.areaTextArr = [];
    			this.companyInfo = val.params.row;
    			this.showType = val.key;
    		}else if(val.key === 'edit'){//编辑
    			console.log(val.params.row);
    			this.formData = {
	        		name: val.params.row.name,//公司名称
	        		industry: [val.params.row.hx1, val.params.row.hx2],//公司行业
	        		nation: val.params.row.nation,//国家
	        		address: [val.params.row.provice, val.params.row.city, val.params.row.county],//公司地址
	        		website: val.params.row.website,//企业官网
	        		business: val.params.row.business,//主营业务
	        	};
	        	this.showType = val.key;
	        	this.addShow = true;
    		}
    	},
    	
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
    					
    					xydm: 'abcd',//信用代码
    					zclx: '0',//注册类型
    					zcmoney: '1000',//注册资金
    					cynum: 200,//从业人数
    					telphone: '13800138000',//电话
    					fax: 'wewqeqwewqeqwe',//传真
    					party: '0',//是否有党部
    					party_time: '156465156',//党部成立时间
    					party_num: '2000',//党部成员人数
    					jyfw: 'ddddddddd',//经营范围
    					
    					token_key: res1.data.token_key,
    					token: res1.data.token,
    				}, res2 => {
    					if(res2.code == 0){
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
        
		modalTitle(){
        	let text = '创建公司';
        	if(this.showType === 'add'){
        		text = '创建公司';
        	}else if(this.showType === 'edit'){
        		text = '编辑公司';
        	}
        	return text;
        },
        
        btnTitle(){
        	let text = '确定创建';
        	if(this.showType === 'add'){
        		text = '确定创建';
        	}else if(this.showType === 'edit'){
        		text = '保存编辑';
        	}
        	return text;
        },
        
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
	.my-form .ivu-form-item{
		margin-bottom: 0px !important;
	}
</style>