<template>

	<Card style="width:320px;height:316px;position: absolute;margin:auto;top:0;bottom:0;right:200px;">
		
		<h1 slot="title">
			<Icon type="log-in"></Icon>
			登陆
		</h1>
		
		<div>
			
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
				
		        <FormItem prop="user">
		            <Input type="text" v-model="formInline.user" placeholder="用户名/手机号">
		            	<Icon custom="iconfont icon-xingmingyonghumingnicheng" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        
		        <FormItem prop="password">
		            <Input type="password" v-model="formInline.password" placeholder="密码">
		            	<Icon custom="iconfont icon-mima" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        
		        <FormItem prop="code">
		        	<Row :gutter="6">
		        		
				        <Col span="14">
				            <Input @on-focus="graphCodeFocus" type="text" v-model="formInline.code" placeholder="图形验证码">
				            	<Icon custom="iconfont icon-yanzhengma" slot="prepend"></Icon>
				            </Input>
				        </Col>
				        
				        <Col span="10" v-if="graphCodeShow">
				        	<Tooltip class="graph-box" content="点击重新获取" placement="top">
						        <div @click="changeCode" class="code">
						        	<span style="visibility: hidden;">验证码</span>
						        </div>
						    </Tooltip>
				        </Col>
				        
				    </Row>
		        </FormItem>
		        
		    </Form>
		    
	        <div style="text-align: center;">
	            <Button long type="primary" @click="login('formInline')">登陆</Button>
	        </div>
	        
	        <Row style="margin-top:16px;">
		        		
		        <Col span="17" style="text-align: left;">
		        	<a href="javascript:void(0)" @click="skipRegister">没有账号立即注册</a>
		        </Col>
		        
		        <Col span="7" style="text-align: right;">
		        	<a>忘记密码?</a>
		        </Col>
		        
		    </Row>
	        
		</div>
		
	</Card>
		
</template>

<script>

export default {
	name: 'login',
	components:{//模板
	},
	props:{
		
	},
    data () {//数据
        return {
        	
        	graphCodeShow: true,
        	
        	formInline: {
                user: 'weik',
                password: 'a123456',
                code: '',
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { type: 'string', min: 6, message: '密码最小为6位数', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入图形验证码', trigger: 'change' },
                ],
            },
            
        }
    },
    methods: {//方法
    	
    	login(name) {//登陆
    		
            this.$refs[name].validate((valid) => {
            	
                if (valid) {
                	
                	$ax.getAjaxData('Login/loginAjax', {
    					name: this.formInline.user,
    					password: this.formInline.password,
    					captcha: this.formInline.code,
					},(response) => {
						if(response.code == 0){
							sessionStorage.userLogin = 1;
							this.$router.replace({
								name: 'person'
							});
							this.$Message.success('登陆成功');
						}
					})
                	
                }
                
            })
            
        },
    	
    	graphCodeFocus(){//图形验证码获取焦点时
    		this.graphCodeShow = true;
    	},
    	
    	changeCode(ev){//改变图形验证码
    		let el = ev.toElement;
    		el.style.backgroundImage = "url(http://192.168.2.224/ucenter/public/Login/captcha?"+Math.random()+")"
    	},
    	
    	skipRegister(){//去注册
    		this.$parent.showType = 'register';
    	},
    	
    },
    computed:{//计算属性
        
    },
    created(){//实例被创建完毕之后执行
    	
	},
    mounted(){//模板被渲染完毕之后执行
    	
	},
    watch:{//监测数据变化
		
	},
	
}
</script>

<style scoped lang="less">
	
	.graph-box{
		width: 100%;
		.code{
			text-align: center;
			background:url(http://192.168.2.224/ucenter/public/Login/captcha) center / cover no-repeat;
			cursor: pointer;
		}
	}
	
</style>

<style lang="less">
	.graph-box .ivu-tooltip-rel{
		width: 100%;
	}
</style>