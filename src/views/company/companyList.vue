<template>
	
	<div>
		
		<Card :shadow="true">
			
			<h1 slot="title">公司列表</h1>
			
			<xw-table
			:modalTitle="tabModalTitle"
			@on-btn-click="tabBtnClick"
			:modalWidth="modalWidth"
			:tableColumns="tableColumns"
			:tableData="tableData">
				<div slot="header">
					<Button type="primary" @click="createCompany">创建公司</Button>
				</div>
				<div slot="modalContent">
					<Form v-if="showType === 'details'" class="my-form" :label-width="100">
						<Row>
							<Col v-for="item in companyField" :key="item.value" span="12">
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
										<p v-else-if="item.value === 'party_time'">
											{{getLocalTime(companyInfo[item.value])}}
										</p>
										<p v-else-if="item.value === 'zcmoney'">
											{{Number(companyInfo[item.value])/100}}
										</p>
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
		
		<Modal v-model="addShow" width="80%">
	        <p slot="header">{{modalTitle}}</p>
	        <Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="100">
				<Row :gutter="16">
					
					<Col :xs="24" :sm="24" :md="12" :lg="8">
						<FormItem label="公司名称" prop="name">
							<Input v-model="formData.name"></Input>
				        </FormItem>
				        <FormItem label="公司行业" prop="industry">
				        	<industry-casc v-model="formData.industry" style="width: 100%;"></industry-casc>
				        </FormItem>
				        <FormItem label="信用代码" prop="xydm">
							<Input v-model="formData.xydm"></Input>
				        </FormItem>
				        <FormItem label="注册类型" prop="zclx">
							<Select v-model="formData.zclx" style="width:100%">
						        <Option value="1">类型1</Option>
						        <Option value="2">类型2</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="注册资金(元)" prop="zcmoney">
							<InputNumber v-model="formData.zcmoney" :max="100000000" :min="0" style="width:100%"></InputNumber>
				        </FormItem>
				        <FormItem label="经营范围" prop="jyfw">
							<Input v-model="formData.jyfw"></Input>
				        </FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="8">
						<FormItem label="从业人数" prop="cynum">
							<InputNumber v-model="formData.cynum" :max="100000000" :min="1" style="width:100%"></InputNumber>
				        </FormItem>
						<FormItem label="电话" prop="telphone">
							<Input v-model="formData.telphone"></Input>
				        </FormItem>
						<FormItem label="传真" prop="fax">
							<Input v-model="formData.fax"></Input>
				        </FormItem>
						<FormItem label="是否有党部" prop="party">
							<RadioGroup v-model="formData.party">
						        <Radio label="1">是</Radio>
						        <Radio label="0">否</Radio>
						    </RadioGroup>
				        </FormItem>
				        <FormItem label="党部成立时间" prop="party_time">
				        	<DatePicker :value="formData.party_time ? new Date(parseInt(formData.party_time)*1000) : formData.party_time" type="date" placeholder="选择时间" @on-change="partyTimeChange" style="width: 100%"></DatePicker>
				        </FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="8">
						<FormItem label="党部成员人数" prop="party_num">
							<InputNumber v-model="formData.party_num" :max="100000000" :min="1" style="width:100%"></InputNumber>
				        </FormItem>
						<FormItem label="国家" prop="nation">
							<Select v-model="formData.nation" style="width:100%">
						        <Option value="86">中国</Option>
						        <Option value="87">美国</Option>
						    </Select>
				        </FormItem>
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
        	
        	modalWidth: '700',
        	
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
				zcmoney: null,//注册资金
				cynum: null,//从业人数
				telphone: '',//电话
				fax: '',//传真
				party: '1',//是否有党部
				party_time: '',//党部成立时间
				party_num: null,//党部成员人数
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
                    { required: true, message: '选择国家', trigger: 'change' }
                ],
                address: [
                    { type: 'array', required: true, message: '请选择公司地址', trigger: 'change' }
                ],
                website: [
                    { required: true, message: '请填写企业官网', trigger: 'blur' }
                ],
                business: [
                    { required: true, message: '请填写主营业务', trigger: 'blur' }
                ],
                xydm: [
                    { required: true, message: '请输入信用代码', trigger: 'blur' }
                ],
                zclx: [
                    { required: true, message: '请选择注册类型', trigger: 'change' }
                ],
                zcmoney: [
                    { type: 'number', required: true, message: '请输入注册资金', trigger: 'blur' }
                ],
                cynum: [
                    { type: 'number', required: true, message: '请输入从业人数', trigger: 'blur' }
                ],
                telphone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                fax: [
                    { required: true, message: '请输入传真', trigger: 'blur' }
                ],
                party: [
                    { required: true, message: '请选择是否有党部', trigger: 'change' }
                ],
                party_time: [
                    { required: true, message: '请选择党部成立时间', trigger: 'change' }
                ],
                party_num: [
                    { type: 'number', required: true, message: '请输入党部成员人数', trigger: 'blur' }
                ],
                jyfw: [
                    { required: true, message: '请填经营范围', trigger: 'blur' }
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
        			label: '信用代码',
        			value: 'xydm'
        		},
        		{
        			label: '注册类型',
        			value: 'zclx',
        			select: [
        				{
        					label: '类型1',
        					value: '1'
        				},
        				{
        					label: '类型2',
        					value: '2'
        				},
        			]
        		},
        		{
        			label: '注册资金',
        			value: 'zcmoney'
        		},
        		{
        			label: '从业人数',
        			value: 'cynum'
        		},
        		{
        			label: '电话',
        			value: 'telphone'
        		},
        		{
        			label: '传真',
        			value: 'fax'
        		},
        		{
        			label: '是否有党部',
        			value: 'party',
        			select: [
        				{
        					label: '是',
        					value: '1'
        				},
        				{
        					label: '否',
        					value: '0'
        				},
        			]
        		},
        		{
        			label: '党部成立时间',
        			value: 'party_time'
        		},
        		{
        			label: '党部成员人数',
        			value: 'party_num'
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
        			label: '经营范围',
        			value: 'jyfw'
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
    	
    	partyTimeChange(dateStr){
    		if(dateStr){
    			this.formData.party_time = (new Date(dateStr).getTime()/1000).toString();
    		}else{
    			this.formData.party_time = '';
    		}
    	},
    	
    	industryChange(value, selectedData){
    		this.industryTextArr = selectedData;
    	},
    	
    	areaLoadChange(value, selectedData){
      		this.areaTextArr = selectedData;
    	},
    	
    	createCompany(){//创建公司按钮
			this.$refs['formInstance'].resetFields();
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
    			this.$refs['formInstance'].resetFields();
    			this.formData = {
	        		name: val.params.row.name,//公司名称
	        		industry: [val.params.row.hx1, val.params.row.hx2],//公司行业
	        		nation: val.params.row.nation,//国家
	        		address: [val.params.row.provice, val.params.row.city, val.params.row.county],//公司地址
	        		website: val.params.row.website,//企业官网
	        		business: val.params.row.business,//主营业务
	        		xydm: val.params.row.xydm,//信用代码
					zclx: val.params.row.zclx,//注册类型
					zcmoney: (Number(val.params.row.zcmoney)/100),//注册资金
					cynum: Number(val.params.row.cynum),//从业人数
					telphone: val.params.row.telphone,//电话
					fax: val.params.row.fax,//传真
					party: val.params.row.party,//是否有党部
					party_time: val.params.row.party_time,//党部成立时间
					party_num: Number(val.params.row.party_num),//党部成员人数
					jyfw: val.params.row.jyfw,//经营范围
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
    					xydm: this.formData.xydm,//信用代码
    					zclx: this.formData.zclx,//注册类型
    					zcmoney: this.formData.zcmoney*100,//注册资金
    					cynum: this.formData.cynum,//从业人数
    					telphone: this.formData.telphone,//电话
    					fax: this.formData.fax,//传真
    					party: this.formData.party,//是否有党部
    					party_time: this.formData.party_time,//党部成立时间
    					party_num: this.formData.party_num,//党部成员人数
    					jyfw: this.formData.jyfw,//经营范围
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
    	
    	getLocalTime(nS){//时间戳转字符到日期
			return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/[上午|下午]([\d\:]*)/g, "");
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