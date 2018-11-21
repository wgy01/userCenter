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
	.work{
		display: flex;
		align-items: center;
		padding: 6px 0;
		.work-piece{
			margin-right: 20px;
		}
	}
</style>

<template>
	
	<div>
		
		<!----------------------------------------账户信息--------------------------------------------->
		
		<Card :shadow="true" style="margin-bottom: 16px;">
		
			<h1 slot="title">账户信息</h1>
			
			<!--<a slot="extra" @click="modifyAccount" v-if="!accountEdit">
				<Icon type="md-create" />
				<span>修改</span>
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
		
		<!----------------------------------------身份资料--------------------------------------------->
		
		<Card :shadow="true" style="margin-bottom: 16px;">
			
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
							    <DatePicker v-if="item.type == 'date'" :value="formInstance[item.value] ? new Date(parseInt(formInstance[item.value])*1000) : formInstance[item.value]" type="date" :placeholder="'输入'+item.label" @on-change="dateSelect" placeholder="选择日期" style="width: 100%;"></DatePicker>
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
		
		<!----------------------------------------附加资料--------------------------------------------->
		
		<Card :shadow="true" style="margin-bottom: 16px;">
			
			<h1 slot="title">附加资料</h1>
			
			<a slot="extra">
				<Icon type="md-create" />
				<span>修改</span>
			</a>
			
			<Form>
				
				<Divider orientation="left">兴趣爱好</Divider>
				
		        <FormItem>
		        	<Input type="textarea"></Input>
		        </FormItem>
				
				<Divider orientation="left">个人特长</Divider>
				
		        <FormItem>
		        	<Input type="textarea"></Input>
		        </FormItem>
				
				<Divider orientation="left">饮食习惯</Divider>
				
				<FormItem>
					<CheckboxGroup>
				        <Checkbox label="东北菜"></Checkbox>
				        <Checkbox label="湖北菜"></Checkbox>
				        <Checkbox label="广东菜"></Checkbox>
				        <Checkbox label="口味偏辣"></Checkbox>
				    </CheckboxGroup>
			    </FormItem>
				
				<Divider orientation="left">家庭情况</Divider>
				
				<FormItem>
					<CheckboxGroup>
				        <Checkbox label="父亲"></Checkbox>
				        <Checkbox label="母亲"></Checkbox>
				        <Checkbox label="妻子"></Checkbox>
				        <Checkbox label="女儿"></Checkbox>
				    </CheckboxGroup>
			    </FormItem>
				
				<Divider orientation="left">工作经历</Divider>
				
				<xw-table
				:headerShow="false"
				:footerShow="false"
				:tableColumns="tableColumnsWork"
				:tableData="workExperienceData">
				</xw-table>
				
				<!--<Row v-for="item in workExperienceData" style="padding: 6px;">
					<Col span="8">
						<label>时间：</label>
						<Tag>{{item.begin_time}} — {{item.end_time}}</Tag>
					</Col>
					<Col span="4">
						<label>单位：</label>
						<Tag>{{item.company}}</Tag>
					</Col>
					<Col span="4">
						<label>职务：</label>
						<Tag>{{item.duty}}</Tag>
					</Col>
					<Col span="4">
						<label>状况：</label>
						<Tag>{{item.statue}}</Tag>
					</Col>
				</Row>-->
				
				<div style="text-align: center;margin-top: 16px;">
					<Button @click="modalShow = true;showType = 1">添加工作经历</Button>
				</div>
				
				<Divider orientation="left">教育经历</Divider>
				
				<xw-table
				:headerShow="false"
				:footerShow="false"
				:tableColumns="tableColumnsEducation"
				:tableData="educationData">
				</xw-table>
				
				<!--<div class="work" v-for="item in educationData">
					<div class="work-piece">
						<label>时间：</label>
						<Tag>{{item.begin_time}} — {{item.end_time}}</Tag>
					</div>
					<div class="work-piece">
						<label>学校：</label>
						<Tag>{{item.school}}</Tag>
					</div>
				</div>-->
				
				<div style="text-align: center;margin-top: 16px;">
					<Button @click="modalShow = true;showType = 2">添加教育经历</Button>
				</div>
				
			</Form>
			
			<Modal v-model="modalShow" @on-visible-change="modelChange" width="400">
				
		        <p slot="header">{{modalTitle}}</p>
		        
		        <Form ref="formExperience" :model="formExperienceData" :rules="ruleExperienceData" :label-width="50">
			        <FormItem label="时间" prop="time">
			        	<DatePicker :value="datePickerValue" @on-change="datePickerChange" @on-clear="datePickerClear" type="daterange" placeholder="选择时间" style="width: 100%"></DatePicker>
			        </FormItem>
		        	<div v-if="showType == 1">
				        <FormItem label="单位" prop="company">
				        	<Input v-model="formExperienceData.company" placeholder="输入单位名称"></Input>
				        </FormItem>
				        <FormItem label="职务" prop="duty">
				        	<Input v-model="formExperienceData.duty" placeholder="输入职务名称"></Input>
				        </FormItem>
				        <FormItem label="状况" prop="status">
				        	<RadioGroup v-model="formExperienceData.status">
						        <Radio label="1">已离职</Radio>
						        <Radio label="2">在岗</Radio>
						    </RadioGroup>
				        </FormItem>
		        	</div>
			        <div v-if="showType == 2">
				        <FormItem label="学校" prop="school">
				        	<Input v-model="formExperienceData.school" placeholder="输入学校名称"></Input>
				        </FormItem>
			        </div>
			    </Form>
			    
		        <div slot="footer">
		            <Button type="primary" @click="addBtn('formExperience')">添加</Button>
		            <Button @click="modalShow = false">取消</Button>
		        </div>
		    </Modal>
		    
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
        	
        	workExperienceData: [],//工作经历数据
        	
			educationData: [],//教育经历数据
        	
        	formExperienceData: {
        		time: [],//时间
        		company: '',//单位
        		duty: '',//职务
        		status: '',//状态
        		school: '',//学校名称
        	},
        	
        	ruleExperienceData: {
        		time: [
        			{ type: 'array', required: true, message: '请选择时间', trigger: 'change' }
        		],
        		company: [
        			{ required: true, message: '请输入单位名称', trigger: 'blur' }
        		],
        		duty: [
        			{ required: true, message: '请输入职务名称', trigger: 'blur' }
        		],
        		status: [
        			{ required: true, message: '请选择状态', trigger: 'change' }
        		],
        		school: [
        			{ required: true, message: '请输入学校名称', trigger: 'blur' }
        		],
        	},
        	
        	showType: 0,//经历表单显示类型
        	
        	modalShow: false,//经历表单对话框
        	
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
        	
        	tableColumnsWork: [
        		{
                    title: '开始时间',
                    key: 'begin_time'
                },
        		{
                    title: '结束时间',
                    key: 'end_time'
                },
        		{
                    title: '单位',
                    key: 'company'
                },
        		{
                    title: '职务',
                    key: 'duty'
                },
        		{
                    title: '状态',
                    render: (h, params) => {
                    	let statueName = () => {
                    		let text = '- -';
                    		if(params.row.statue == 1){
                    			text = '已离职';
                    		}else if(params.row.statue == 2){
                    			text = '在岗';
                    		}
                    		return text
                    	}
                    	return h('div', statueName())
                    }
                },
        	],
        	
        	tableColumnsEducation: [
        		{
                    title: '开始时间',
                    key: 'begin_time'
                },
        		{
                    title: '结束时间',
                    key: 'end_time'
                },
        		{
                    title: '学校',
                    key: 'school'
                },
        	],
        	
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
    	
    	modelChange(tf){//对话框变化时触发
    		this.$refs['formExperience'].resetFields();
    	},
    	
    	workExperienceAjax(token_key, token){//工作经历提交数据
    		$ax.getAjaxData('Center/workAdd', {
    			begin_time: this.formExperienceData.time[0],
    			end_time: this.formExperienceData.time[1],
    			company: this.formExperienceData.company,
    			duty: this.formExperienceData.duty,
    			status: this.formExperienceData.status,
    			token_key: token_key,
    			token: token,
    		}, res => {
    			if(res.code == 0){
    				this.$refs['formExperience'].resetFields();
    				this.modalShow = false;
    				this.$Message.success('工作经历添加成功');
    			}
    		});
    	},
    	
    	educationExperienceAjax(token_key, token){//教育经历提交数据
    		$ax.getAjaxData('Center/educationAdd', {
    			begin_time: this.formExperienceData.time[0],
    			end_time: this.formExperienceData.time[1],
    			school: this.formExperienceData.school,
    			token_key: token_key,
    			token: token,
    		}, res => {
    			if(res.code == 0){
    				this.$refs['formExperience'].resetFields();
    				this.modalShow = false;
    				this.$Message.success('教育经历添加成功');
    			}
    		});
    	},
    	
    	addBtn(name){//添加工作经历和教育经历
    		this.$refs[name].validate((valid) => {
    			if(valid){
    				
    				$ax.getAjaxData('Helper/createFormToken', {}, res => {
    					if(res.code == 0){
    						if(this.showType == 1){
		    					this.workExperienceAjax(res.data.token_key, res.data.token);
		    				}else if(this.showType == 2){
		    					this.educationExperienceAjax(res.data.token_key, res.data.token);
		    				}
    					}
    				});
    				
    			}
    		});
    	},
    	
    	datePickerChange(val){//工作经历和教育经历时间改变时
    		if(val[0] != '' && val[0] != ''){
    			let a = (new Date(val[0]).getTime()/1000).toString();
    			let b = (new Date(val[1]).getTime()/1000).toString();
    			this.formExperienceData.time = [a, b];
    		}else{
    			this.formExperienceData.time = [];
    		}
    	},
    	
    	datePickerClear(){//工作经历和教育经历时间清空时
    		this.formExperienceData.time = [];
    	},
    	
    	getLocalTime(nS){//时间戳转字符到日期
			return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/[上午|下午]([\d\:]*)/g, "");
		},
		
    },
    computed: {//计算属性
    	
        modalTitle(){
        	let txt = '';
			if(this.showType == 1){
				txt = '添加工作经历';
			}else if(this.showType == 2){
				txt = '添加教育经历';
			}
			return txt;
		},
		
		datePickerValue(){
			let arr = [];
			if(this.formExperienceData.time.length > 0){
				let a = new Date(parseInt(this.formExperienceData.time[0])*1000);
				let b = new Date(parseInt(this.formExperienceData.time[1])*1000);
				arr[0] = a;
				arr[1] = b;
			}
			return arr;
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
				
				let getMyInfo = await $ax.getAsyncAjaxData('Center/myInfo', {});//获取个人信息
				
				let getIdentityInfo = await $ax.getAsyncAjaxData('Center/personInfoAjax', {});//获取身份信息
				
				let getWorkExperience = await $ax.getAsyncAjaxData('Center/workList', {});//获取工作经历
				
				let getEducation = await $ax.getAsyncAjaxData('Center/educationList', {});//获取教育经历
				
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
					if(getWorkExperience.code == 0){
						vm.workExperienceData = getWorkExperience.data;
					}
					if(getEducation.code == 0){
						vm.educationData = getEducation.data;
					}
				});
				
			} catch(err) {
				console.log(err);
			}
			
			next();
			
		})();
		
	},
	
}
</script>