<template>
	
	<div style="background:#ccc;height:100%;position: relative;">
	
		<Card v-if="isLogin" style="width:320px;height:316px;position: absolute;margin:auto;top:0;bottom:0;right:200px;">
			
			<h1 slot="title">
				<Icon type="log-in"></Icon>
				登陆
			</h1>
			
			<div>
				
				<Form ref="formInline" :model="formInline" :rules="ruleInline">
					
			        <FormItem prop="user">
			            <Input type="text" v-model="formInline.user" placeholder="用户名/手机号">
			            	<Icon type="md-person" slot="prepend" size="18" />
			            </Input>
			        </FormItem>
			        
			        <FormItem prop="password">
			            <Input type="password" v-model="formInline.password" placeholder="密码">
			            	<Icon type="md-lock" slot="prepend" size="18" />
			            </Input>
			        </FormItem>
			        
			        <FormItem prop="code">
			        	<Row :gutter="6">
			        		
					        <Col span="14">
					            <Input type="text" v-model="formInline.code" placeholder="不区分大小写">
					            	<Icon type="md-key" slot="prepend" size="18" />
					            </Input>
					        </Col>
					        
					        <Col span="10">
					        	<Tooltip class="graph-box" content="看不清点击重新获取" placement="top">
							        <div ref="codeInstance" @click="changeCode" class="code">
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
		
	</div>
		
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
        	
        	isLogin: true,
        	
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
							sessionStorage.userName = this.formInline.user;
							sessionStorage.userLogin = 1;
							this.$router.replace({
								name: 'person'
							});
							this.$Message.success('登陆成功');
						}else if(response.code == 2){
							this.$refs.codeInstance.style.backgroundImage = "url(http://192.168.2.224/ucenter/public/Login/captcha?"+Math.random()+")";
						}
					})
                	
                }
                
            })
            
        },
    	
    	changeCode(ev){//改变图形验证码
    		let el = ev.toElement;
    		el.style.backgroundImage = "url(http://192.168.2.224/ucenter/public/Login/captcha?"+Math.random()+")";
    	},
    	
    	skipRegister(){//去注册
    		this.$router.push({
    			name: 'register'
    		});
    	},
    	
    },
    computed:{//计算属性
        
    },
    created(){//实例被创建完毕之后执行
    	
	},
    mounted(){//模板被渲染完毕之后执行
      	this.$refs.codeInstance.style.backgroundImage = "url(http://192.168.2.224/ucenter/public/Login/captcha)";
	},
    watch:{//监测数据变化
		
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			try {
				
				let getMyInfo = await $ax.getAsyncAjaxData('Center/myInfo', {});
				
				next(vm => {
					if(getMyInfo.code == 0){//已登录
						vm.isLogin = false;
						sessionStorage.userLogin = 1;
						sessionStorage.userName = getMyInfo.data.name;
						vm.$router.replace({
							name: 'person'
						});
					}else{//未登录
						vm.isLogin = true;
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