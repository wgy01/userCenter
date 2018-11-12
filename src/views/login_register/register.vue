<template>
	
	<div style="background:#ccc;height:100%;position: relative;">
	
		<Card style="width:380px;height:430px;position: absolute;margin:auto;top:0;bottom:0;right:200px;">
		
			<h1 slot="title">
				<Icon type="person-add"></Icon>
				注册
			</h1>
			
			<div>
				
				<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="85">
					
			        <FormItem label="用户名" prop="userName">
			            <Input type="text" v-model="formInline.userName" placeholder="输入用户名"></Input>
			        </FormItem>
			        
			        <FormItem label="密码" prop="password">
			            <Input type="password" v-model="formInline.password" placeholder="输入密码"></Input>
			        </FormItem>
			        
			        <FormItem label="确认密码" prop="passwdCheck">
			            <Input type="password" v-model="formInline.passwdCheck" placeholder="输入确认密码"></Input>
			        </FormItem>
			        
			        <FormItem label="手机号码" prop="mobileNum">
					    <Input type="text" v-model="formInline.mobileNum" placeholder="输入手机号码"></Input>
			        </FormItem>
			        
			        <!--<FormItem label="邮箱" prop="email">
			            <Input type="text" v-model="formInline.email" placeholder="输入邮箱"></Input>
			        </FormItem>-->
			        
			        <FormItem label="短信验证码" prop="code">
			        	
			        	<Row type="flex">
			        		
					        <Col span="11">
					            <Input type="text" v-model="formInline.code" placeholder="输入短信验证码"></Input>
					        </Col>
					        
					        <Col span="13" style="padding-left: 6px;">
		            			<Button :disabled="sendSuccess" long type="success" @click="getCode">
		            				{{sendSuccess ? S+'s'+' 后重新发送' : '发送短信验证码'}}
		            			</Button>
					        </Col>
					        
					    </Row>
					    
			        </FormItem>
			        
			    </Form>
			    
			    <div style="text-align: center;">
		            <Button long type="primary" @click="register('formInline')">立即注册</Button>
		        </div>
		        
		        <div style="margin-top: 16px;text-align: center;">
		        	<a href="javascript:void(0)" @click="skipLogin">已有账户立即登录</a>
		        </div>
				
			</div>
		
		</Card>
	
	</div>
			
</template>

<script>
export default {
	name: 'register',
	components:{//模板
		
	},
	props:{
		
	},
    data () {//数据
    	
    	const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formInline.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formInline.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请确认密码'));
            } else if (value !== this.formInline.password) {
                callback(new Error('密码不一致!'));
            } else {
                callback();
            }
        };
    	
        return {
        	
        	formInline: {
                userName: '',//用户名
                password: '',//密码
                passwdCheck: '',//确认密码
//              email: '',//邮箱
                mobileNum: '',//手机号
                code: '',//短信验证码
            },
            ruleInline: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { required: true, validator: validatePassCheck, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                mobileNum: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                code: [
                    { required: true, required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
        	
        	sendSuccess: false,//发送成功
        	
        	S: 60,//时间
        	
        }
    },
    methods: {//方法
    	
    	register(name) {
    		
            this.$refs[name].validate((valid) => {
            	
                if (valid) {
                	
                    $ax.getAjaxData('Login/regeditAjax', {
    					name: this.formInline.userName,
    					password: this.formInline.password,
    					mobile: this.formInline.mobileNum,
    					smscode: this.formInline.code,
//  					email: this.formInline.email,
					},(response) => {
						if(response.code == 0){
							this.$parent.showType = 'login';
							this.$Message.success('注册成功');
						}
					});
                    
                }
                
            })
            
        },
    	getCode(){//获取短信验证码
    		$ax.getAjaxData('Login/sendsmsAjax', {
    			mobile: this.formInline.mobileNum,
			}, res => {
				if(res.code == 0){
					
					this.sendSuccess = true;
					
					console.log(response.debug.smscode);
					
					this.$Message.success('发送成功');
					
					let t = setInterval(() => {
						
						--this.S;
						
						if(this.S <= 0){
							clearInterval(t);
							this.S = 60;
							this.sendSuccess = false;
						}
						
					},1000);
					
				}
			});
    	},
    	
    	skipLogin(){//去登录
    		this.$router.push({
    			name: 'login'
    		});
    	},
    	
    },
    computed:{//计算属性
        	
    },
    created(){//实例被创建完毕之后执行
    	
	},
    mounted(){//模板被渲染完毕之后执行
    	
	},
    watch:{//监测数据变化
		
	}
}
</script>

<style scoped lang="less">
</style>