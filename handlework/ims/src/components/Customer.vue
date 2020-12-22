<!--关联客户-->
<template>
    <el-form-item label="">
        <div class="customer-add-user font14-nobold-6">
            <div>
                <!-- <p class="title">关联客户</p> -->
                <el-popover placement="top" :width="width" trigger="click" v-model="visible" @hide="isHide">
                    <h2 class="font18-bold-3">{{boxTitle}}</h2>
                    <el-input  placeholder="搜索客户" v-model="filterText" style="margin:10px 0;">
                    </el-input>
                    <div class="customer-container xyk-scroll">
                        <!-- <el-tree
                            :data="data"
                            :props="defaultProps"
                            show-checkbox
                            @check-change="handleNodeClick">
                        </el-tree> -->
                        <ul>
                            <li v-for="(item,index) in data" :key="index" @click="activeTap(index,item)">
                                <div class="between">
                                    <el-link :underline='false' :type='active == index ? "primary" : ""'>{{item.name}}</el-link>
                                    <span>({{item.customer.length}})</span>
                                </div>
                                <el-collapse-transition>
                                    <ul style="padding-left:10px;line-height: 10px;" v-show="active == index">
                                        <!-- <el-radio-group v-model="appUser">
                                            <li v-for="(items,index) in item.customer" :key="index" class="customer-user flex-items-center" @click="childTap(index,item)">
                                                <el-radio :label="items" style="padding:4px 0;">{{items.name}}</el-radio>
                                            </li>
                                        </el-radio-group> -->

                                        <el-checkbox-group v-model="appUser" @change="checkboxTap">
                                            <li v-for="(items,index) in item.customer" :key="index" class="customer-user flex-items-center" @click="childTap(index,item)">
                                                <el-checkbox :label="items" style="padding:4px 0;">{{items.name}}</el-checkbox>
                                            </li>
                                        </el-checkbox-group>

                                        <li v-if="item.customer.length==0">暂无对应客户</li>
                                    </ul>
                                </el-collapse-transition>
                            </li>
                        </ul>
                    </div>
                    <div class="yes-no">
                        <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                        <el-link :underline="false" @click="visible = false, appUser = [] , typeName = ''" style="margin-left:10px;">取消</el-link >
                    </div>
                    <el-button slot="reference" style="border:0;width:100%;text-align:left; padding:10px 0;" >
                        <el-link :underline="false" type="primary"><i class="el-icon-link"></i>{{linkTitle}}</el-link>
                    </el-button >
                </el-popover>
                <div class="between customer_user-color" v-if='appUser.name'>
                    <!-- <span v-for="(item,index) in appUser" :key="index" class="my-approval">{{item.name}}</span> -->
                    <p><span>{{typeName}}</span><span >-{{appUser.name}}</span></p>
                    <p><i class="el-icon-link"></i></p>
                </div>
            </div>
        </div>
    </el-form-item>
</template>
<script>
export default {
    data () {
        return {
            //将msg传递给父组件
            msg: "我是子组件的msg",
            visible:false,//审批人
            // placement:'right',//出现位置
            // width:250,//label宽度

            filterText: '',
            data: [],
            active:null,//分类切换
            appUser:[],//选中的人
            isType:'',//分类名
            typeName:'',//分类客户名
        }
    },
    props:{
        width:{
            type:Number,
        },
        linkTitle:{//关联客户
            type:String
        },
        boxTitle:{//请选择关联客户
            type:String
        }
    },
    created() {
        this.$http.get('marketing/group',{
            // token:this.$token
        }).then(res=>{
            this.data = res
        })
    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods:{
        //多选
        checkboxTap(){
        },
        Determine(){
            // var _this = this;
            this.visible=false
            // var data = Object.assign(this.isType, this.appUser)
            this.$emit('customer',JSON.stringify(this.isType))
        },
        
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },


        activeTap(index,item){
            if(this.active != index){//确定
                this.active = index
                this.typeName = item.name
            }else{
                this.active = null
            }
        },
        childTap(index,item){
            var array = [];
            array.push(item.id)
            this.isType = array
        },
        isHide(){
            this.$emit('customer',JSON.stringify(this.appUser))
        }
    }
}
</script>
<style lang="less" scoped>
    .component-add-user{
        text-align: left;
        p.title{
            height: 34px;
            line-height: 34px;
        }
    }
    .flex-items-center{
        padding-top:10px;
        img{
            width:36px;
            height:36px;
            margin-right:10px;
            border-radius:50%;
            border:1px solid #DCDFE6;
        }
    }
    .yes-no{
        text-align: right;
        padding-top:10px;
    }
    // 我的审批人
    .my-approval{
        display: inline-block;
        padding: 0 5px;
        color: #409EFF;
    }
    .customer-container{
        height:250px;
        overflow: overlay;
        li{
            width:100%;
            padding:4px 0;
            span{
                margin-left:10px;
                display: block;
            }
        }
    }
    .customer_user-color{
        color: #409EFF;
    }
</style>