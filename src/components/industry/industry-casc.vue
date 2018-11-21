<template>
	
	<div>
		
		<Cascader v-model="cascaderValue" @on-change="setvalue" filterable placeholder="选择行业" :data="industryData" style="width: 100%;"></Cascader>
		
	</div>
	
</template>

<script>

export default {
	name: 'industryCasc',
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
		value: {
			type: Array,
			default: () => []
		}
	},
    data () {//数据
        return {
        	
        	cascaderValue: [],
        	
        	industryData: [],
        	
        }
    },
    methods: {//方法
    	
    	getIndustryData(){//获取行业数据
    		$ax.getAjaxData('cdn/hangye.js', {}, res => {
	    		let newArr = [];
	    		if(res){
		    		res.forEach(item => {
		    			let newChildren = [];
						item.children.forEach(item => {
							newChildren.push({
								label: item.name,
		    					value: item.code,
							})
						})
						newArr.push({
		    				label: item.name,
		        			value: item.code,
		        			children: newChildren
		    			});
		    		});
	    		}
	    		this.industryData = newArr;
		    	this.$emit('on-change', this.cascaderValue, this.selectedData(this.value, this.industryData));
	    	}, {baseURL: 'http://192.168.2.200:802/'});
    	},
    	
    	setvalue(value, selectedData){//数据改变时
    		
    		this.$emit('input', value);
    		
    		this.$emit('on-change', value, selectedData);
    		
    	},
    	
    	selectedData(checkedArr, industryData){//全部获得name/code
    		
    		let res = [];
    		
    		if(checkedArr && checkedArr.length > 0){
    			
    			industryData.forEach(item => {
    				if(item.value == checkedArr[0]){
    					res.push({
    						name: item.label,
    						code: item.value,
    					});
    					item.children.forEach(item2 => {
    						if(item2.value == checkedArr[1]){
	    						res.push({
		    						name: item2.label,
		    						code: item2.value,
		    					});
    						}
    					});
    				}
    			});
    			
    		}
    		
    		return res
    		
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
    	value(newVal){
        	this.cascaderValue = newVal;
        	this.$emit('input', newVal);
        },
        
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	this.getIndustryData();
    	
    	this.cascaderValue = this.value;
    	
		this.$emit('input', this.value);
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
}
</script>

<style scoped lang="less">

</style>