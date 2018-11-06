<style scoped lang="less">
	.avatar-img{
		width: 100px;
		height: 100px;
		flex-shrink: 0;
		cursor: pointer;
		background: url(../../../public/img/tx.jpg) center / cover no-repeat;
		border: 1px solid #ccc;
		border-radius: 100%;
	}
	
	.data-img{
		flex-shrink: 0;
		width: 150px;
		min-height: 80px;
		border: 1px solid #ccc;
		border-radius: 6px;
		overflow: hidden;
	}
	.my-form .ivu-form-item{
		margin-bottom: 0px;
	}
</style>

<template>
	
	<div>
		
		<Card style="margin-bottom: 16px;">
		
			<h1 slot="title">账户资料</h1>
			
			<!--<a slot="extra" @click="modifyAccount" v-if="!accountEdit">
				<Icon type="md-create" />
				<span>编辑</span>
			</a>-->
			
			<Row style="flex-wrap: nowrap;" type="flex" >
				
				<Col class="avatar-img"></Col>
				
				<Col style="width: 100%;margin-left: 16px;">
					
					<Form :label-width="80" :class="!accountEdit ? 'my-form' : ''">
				        <FormItem label="用户名">
				        	<span v-if="!accountEdit">{{myInfoData.name}}</span>
				        	<Input v-if="accountEdit" style="max-width: 260px;"></Input>
				        </FormItem>
				        <FormItem label="密码">
				        	<span v-if="!accountEdit">******</span>
				        	<Input v-if="accountEdit" style="max-width: 260px;"></Input>
				        </FormItem>
				        <FormItem label="手机号">
				        	<span v-if="!accountEdit">{{myInfoData.mobile}}</span>
				        	<Input v-if="accountEdit" style="max-width: 260px;"></Input>
				        </FormItem>
				        <!--<FormItem label="邮箱">
				        	<span v-if="!accountEdit">21321312@qq.com</span>
				        	<Input v-if="accountEdit" style="max-width: 260px;"></Input>
				        </FormItem>-->
				    </Form>
					
				</Col>
				
			</Row>
			
			<div style="text-align: center;">
				<Button type="primary" v-if="accountEdit" @click="accountEdit = false">保存</Button>&nbsp;
				<Button v-if="accountEdit" @click="accountEdit = false">取消</Button>
			</div>
			
		</Card>
		
		<Card style="margin-bottom: 16px;">
			
			<h1 slot="title">身份资料</h1>
			
			<a slot="extra" @click="modifyBtn" v-show="!modifyData">
				<Icon type="md-create" />
				<span>修改</span>
			</a>
			
			<Form :class="!modifyData ? 'my-form' : ''" ref="formInstance" :model="formInstance" :rules="ruleInline" :label-width="80">
				
				<Row :gutter="10">
					
					<Col v-for="item in formData" :key="item.value" :xs="24" :sm="!modifyData ? 12 : 24" :md="!modifyData ? 8 : 12" :lg="!modifyData ? 6 : 12">
						
						<FormItem v-show="modifyData" :prop="item.value" :label="item.label">
							<div v-if="modifyData">
								<Input v-if="item.type == 'text'" v-model="formInstance[item.value]" :placeholder="'输入'+item.label"></Input>
								<RadioGroup v-if="item.type == 'radio'" v-model="formInstance[item.value]">
							        <template v-for="selItem in item.select">
							        	<Radio :label="selItem.value">{{selItem.label}}</Radio>
							        </template>
							    </RadioGroup>
							    <cascader-area v-if="item.type == 'area'" v-model="formInstance[item.value]"></cascader-area>
							    <DatePicker v-if="item.type == 'date'" :value="formInstance[item.value] ? new Date(parseInt(formInstance[item.value])*1000) : formInstance[item.value] " type="date" :placeholder="'输入'+item.label" @on-change="dateSelect" placeholder="选择日期" style="width: 100%;"></DatePicker>
							    <Select v-if="item.type == 'select'" v-model="formInstance[item.value]" :placeholder="'输入'+item.label" style="width:100%">
							        <Option v-for="selItem in item.select" :value="selItem.value" :key="selItem.value">{{ selItem.label }}</Option>
							    </Select>
							</div>
				        </FormItem>
				        
						<FormItem :label="item.label+' :'" v-show="identityInfoData && !modifyData">
							<div v-if="identityInfoData && !modifyData" :style="{color: identityInfoData && identityInfoData[item.value] ? '' : '#c5c8ce'}">
								<p v-if="item.value === 'brithday'">
									{{getLocalTime(identityInfoData[item.value])}}
								</p>
								<div v-else-if="item.select">
									<p v-for="seleItem in item.select" v-if="seleItem.value === identityInfoData[item.value]">
										{{seleItem.label}}
									</p>
								</div>
								<p v-else>
									{{identityInfoData[item.value]}}
								</p>
							</div>
				        </FormItem>
				        
				        
					</Col>
					
		        </Row>
				
			</Form>
			
			<div v-if="modifyData" style="text-align: center;margin-top: 16px;">
				<Button v-if="modifyData" type="primary" @click="submitIDInfo('formInstance')">提交</Button>&nbsp;
				<Button v-if="identityInfoData && modifyData" @click="cancelIDInfo('formInstance')">取消</Button>
			</div>
			
		</Card>
		
		<Card style="margin-bottom: 16px;">
			
			<h1 slot="title">附加资料</h1>
			
			<a slot="extra">
				<Icon type="md-create" />
				<span>编辑</span>
			</a>
			
			<Card :bordered="false" dis-hover style="margin-bottom: 16px;">
				
				<h2 slot="title">兴趣爱好</h2>
				
				
				<Form>
			        <FormItem>
			        	<Input type="textarea"></Input>
			        </FormItem>
			    </Form>
				
			</Card>
			
			<Card :bordered="false" dis-hover style="margin-bottom: 16px;">
				
				<h2 slot="title">个人特长</h2>
				
				<Form>
			        <FormItem>
			        	<Input type="textarea"></Input>
			        </FormItem>
			    </Form>
				
			</Card>
			
			<Card :bordered="false" dis-hover style="margin-bottom: 16px;">
				
				<h2 slot="title">饮食习惯</h2>
				
				<CheckboxGroup>
			        <Checkbox label="东北菜"></Checkbox>
			        <Checkbox label="湖北菜"></Checkbox>
			        <Checkbox label="广东菜"></Checkbox>
			        <Checkbox label="口味偏辣"></Checkbox>
			    </CheckboxGroup>
						
			</Card>
			
			<Card :bordered="false" dis-hover style="margin-bottom: 16px;">
				
				<h2 slot="title">家庭情况</h2>
				
				<CheckboxGroup>
			        <Checkbox label="父亲"></Checkbox>
			        <Checkbox label="母亲"></Checkbox>
			        <Checkbox label="妻子"></Checkbox>
			        <Checkbox label="女儿"></Checkbox>
			    </CheckboxGroup>
						
			</Card>
			
			<Card :bordered="false" dis-hover style="margin-bottom: 16px;">
				
				<h2 slot="title">工作经历</h2>
				
				<Form :label-width="40">
			        <FormItem label="时间">
			        	<DatePicker type="daterange" placeholder="Select date" style="width: 200px"></DatePicker>
			        </FormItem>
			        <FormItem label="单位">
			        	<Input></Input>
			        </FormItem>
			        <FormItem label="职务">
			        	<Input></Input>
			        </FormItem>
			        <FormItem label="状况">
			        	<RadioGroup>
					        <Radio label="已离职"></Radio>
					        <Radio label="在岗"></Radio>
					    </RadioGroup>
			        </FormItem>
			    </Form>
				
			</Card>
			
			<Card :bordered="false" dis-hover style="margin-bottom: 16px;">
				
				<h2 slot="title">教育经历</h2>
				
				<Form :label-width="40">
			        <FormItem label="时间">
			        	<DatePicker type="daterange" placeholder="Select date" style="width: 200px"></DatePicker>
			        </FormItem>
			        <FormItem label="学校">
			        	<Input></Input>
			        </FormItem>
			    </Form>
						
			</Card>
			
		</Card>
		
	</div>
	
</template>

<script>

export default {
	name: 'person',
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
        	
        	accountEdit: false,
        	
        	modifyData: false,
        	
        	myInfoData: {},//我的信息
        	
        	identityInfoData: [],//身份信息
        	
        	formData: [
        		{
        			label: '真实姓名',
        			value: 'truest_name',
        			type: 'text'
        		},
        		{
        			label: '性别',
        			value: 'sex',
        			select: [
        				{
        					label: '男',
        					value: '1'
        				},
        				{
        					label: '女',
        					value: '2'
        				}
        			],
        			type: 'radio'
        		},
        		{
        			label: '出生年月',
        			value: 'brithday',
        			type: 'date'
        		},
        		{
        			label: '证件类型',
        			value: 'card_type',
        			select: [
        				{
        					label: '身份证',
        					value: '1'
        				},
        				{
        					label: '居住证',
        					value: '2'
        				},
        				{
        					label: '单身证',
        					value: '3'
        				},
        			],
        			type: 'select'
        		},
        		{
        			label: '证件号码',
        			value: 'card_num',
        			type: 'text'
        		},
        		{
        			label: '国籍',
        			value: 'nation',
        			select: [
        				{
        					label: '中国',
        					value: '80'
        				},
        				{
        					label: '美国',
        					value: '81'
        				},
        				{
        					label: '英国',
        					value: '82'
        				},
        			],
        			type: 'select'
        		},
        		{
        			label: '民族',
        			value: 'mz',
        			select: [
        				{
        					label: '汉族',
        					value: '1'
        				},
        				{
        					label: '壮族',
        					value: '2'
        				},
        				{
        					label: '苗族',
        					value: '3'
        				},
        			],
        			type: 'select'
        		},
        		{
        			label: '籍贯',
        			value: 'hometown',
        			type: 'text'
        		},
        		{
        			label: '工作电话',
        			value: 'work_phone',
        			type: 'text'
        		},
        		{
        			label: '手机号码',
        			value: 'touch_phone',
        			type: 'text'
        		},
        		{
        			label: '微信账号',
        			value: 'wechat',
        			type: 'text'
        		},
        		{
        			label: 'QQ账号',
        			value: 'qq',
        			type: 'text'
        		},
        		{
        			label: '现在住址',
        			value: 'address',
        			type: 'text'
        		},
        		{
        			label: '学历',
        			value: 'education',
        			select: [
        				{
        					label: '本科',
        					value: '1'
        				},
        				{
        					label: '专科',
        					value: '2'
        				},
        				{
        					label: '研究生',
        					value: '3'
        				},
        			],
        			type: 'select'
        		},
        		{
        			label: '政治面貌',
        			value: 'politics',
        			select: [
        				{
        					label: '群众',
        					value: '1'
        				},
        				{
        					label: '团员',
        					value: '2'
        				},
        				{
        					label: '党员',
        					value: '3'
        				},
        			],
        			type: 'select'
        		},
        		{
        			label: '婚姻状况',
        			value: 'marriage',
        			select: [
        				{
        					label: '已婚',
        					value: '1'
        				},
        				{
        					label: '未婚',
        					value: '2'
        				}
        			],
        			type: 'radio'
        		},
        		{
        			label: '身高(cm)',
        			value: 'height',
        			type: 'text'
        		},
        		{
        			label: '体重(kg)',
        			value: 'weigh',
        			type: 'text'
        		},
        	],
        	
        	formInstance: {
        		truest_name: '',//真实姓名
        		sex: '',//性别
        		brithday: '',//生日
        		card_type: '',//证件类型
        		card_num: '',//证件号
        		nation: '',//国籍
        		mz: '',//民族
        		hometown: '',//籍贯
        		work_phone: '',//工作电话
        		touch_phone: '',//联系电话
        		wechat: '',//微信
        		qq: '',//QQ
        		address: '',//现在住址
        		education: '',//教育学历
        		politics: '',//政治面貌
        		marriage: '',//婚姻
        		height: '',//身高
        		weigh: '',//体重
        	},
        	
        	ruleInline: {
        		truest_name: [
        			{ required: true, message: '请输入真实姓名', trigger: 'blur' }
        		],
        		sex: [
        			{ required: true, message: '请选择性别', trigger: 'change' }
        		],
        		brithday: [
        			{ required: true, message: '请选择出生年与', trigger: 'change' }
        		],
        		card_type: [
        			{ required: true, message: '请选择证件类型', trigger: 'change' }
        		],
        		card_num: [
        			{ required: true, message: '请输入证件号', trigger: 'blur' }
        		],
        		nation: [
        			{ required: true, message: '请选择国籍', trigger: 'change' }
        		],
        		mz: [
        			{ required: true, message: '请选择民族', trigger: 'change' }
        		],
        		hometown: [
        			{ required: true, message: '请输入籍贯', trigger: 'blur' }
        		],
        		work_phone: [
        			{ required: true, message: '请输入工作电话', trigger: 'blur' }
        		],
        		touch_phone: [
        			{ required: true, message: '请输入联系电话', trigger: 'blur' }
        		],
        		wechat: [
        			{ required: true, message: '请输入微信', trigger: 'blur' }
        		],
        		qq: [
        			{ required: true, message: '请输入QQ', trigger: 'blur' }
        		],
        		address: [
        			{ required: true, message: '请输入现在住址', trigger: 'blur' }
        		],
        		education: [
        			{ required: true, message: '请选择学历', trigger: 'change' }
        		],
        		politics: [
        			{ required: true, message: '请选择政治面貌', trigger: 'change' }
        		],
        		marriage: [
        			{ required: true, message: '请选择婚姻', trigger: 'change' }
        		],
        		height: [
        			{ required: true, message: '请输入身高', trigger: 'blur' }
        		],
        		weigh: [
        			{ required: true, message: '请输入体重', trigger: 'blur' }
        		],
        	},
        	
        }
    },
    methods: {//方法
    	
    	modifyAccount(){//修改账户信息
    		this.accountEdit = true;
    	},
    	
    	setSubmitAjax(){//设置身份资料提交数据
    		$ax.getAjaxData('Helper/createFormToken', {}, res1 => {
    			if(res1.code == 0){
    				$ax.getAjaxData('Center/addPersonInfoAjax', Object.assign({}, this.formInstance, {
    					head_img: '头像.jpg',
		        		card_img: '证件.jpg',
		        		my_img: '照片.jpg',
    					token_key: res1.data.token_key,
    					token: res1.data.token
    				}), res2 => {
                		if(res2.code == 0){
                			this.getIDInfo();
                			this.modifyData = false;
                			this.$Message.success('添加成功');
                		}
                	});
    			}
    		});
    	},
    	
    	modifyIdinfo(){//修改身份资料
    		$ax.getAjaxData('Helper/createFormToken', {}, res1 => {
    			if(res1.code == 0){
    				$ax.getAjaxData('Center/editPersonInfo', Object.assign({}, this.formInstance, {
    					token_key: res1.data.token_key,
    					token: res1.data.token
    				}), res2 => {
                		if(res2.code == 0){
                			this.getIDInfo();
                			this.modifyData = false;
                			this.$Message.success('修改成功');
                		}
                	});
    			}
    		});
    	},
    	
    	getIDInfo(){//获取身份信息
    		$ax.getAjaxData('Center/personInfoAjax', {}, res => {
    			if(res.code == 0){
    				this.identityInfoData = res.data;
    				for(let item in this.formInstance){
						for(let item2 in this.identityInfoData){
							if(item === item2){
								this.formInstance[item] = this.identityInfoData[item2];
							}
						}
					}
    			}
    		});
    	},
    	
    	submitIDInfo(name){//提交身份资料
            this.$refs[name].validate((valid) => {
                if (valid) {
                	if(!this.identityInfoData){
                		this.setSubmitAjax();
                	}else{
                		this.modifyIdinfo();
                	}
                }
            });
    	},
    	
    	modifyBtn(){//修改按钮
    		this.getIDInfo();
    		this.modifyData = true;
    	},
    	
    	cancelIDInfo(name){//取消修改
    		this.$refs[name].resetFields();
    		this.modifyData = false;
    	},
    	
    	dateSelect(date){//格式化日期
    		if(date){
    			this.formInstance.brithday = (new Date(date).getTime()/1000).toString();
    		}else{
    			this.formInstance.brithday = '';
    		}
    	},
    	
    	getLocalTime(nS){//时间戳转字符到日期
			return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/[上午|下午]([\d\:]*)/g, "");
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
				
				let getMyInfo = await $ax.getAsyncAjaxData('Center/myInfo', {});//获取个人信息
				
				let getIdentityInfo = await $ax.getAsyncAjaxData('Center/personInfoAjax', {});//获取身份信息
				
				next(vm => {
					if(getMyInfo.code == 0){
						vm.myInfoData = getMyInfo.data;
					}
					if(getIdentityInfo.code == 0){
						if(typeof(getIdentityInfo.data) == 'object' && Object.prototype.toString.call(getIdentityInfo.data).toLowerCase() == "[object object]" && !getIdentityInfo.data.length){
							vm.identityInfoData = getIdentityInfo.data;
							for(let item in vm.formInstance){
								for(let item2 in vm.identityInfoData){
									if(item === item2){
										vm.formInstance[item] = vm.identityInfoData[item2];
									}
								}
							}
						}else{
							vm.identityInfoData = null;
							vm.modifyData = true;
						}
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