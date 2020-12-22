<!--关联客户-->
<template>
    <!-- <el-form-item label=""> -->
        <div class="customer-add-user font14-nobold-6">
            <div>
                <!-- <p class="title">关联客户</p> -->
                <el-popover placement="top" :width="width" trigger="click" v-model="visible" @hide="isHide">
                    <!-- <h3 class="font18-bold-3">{{boxTitle}}</h3> -->
                    <el-input  placeholder="搜索客户" v-model="filterText" style="margin:10px 0;" @change="searchInput">
                    </el-input>
                    <!-- <div class="customer-container xyk-scroll">
                        <el-radio-group v-model="appUser" @change="checkboxTap" v-if="searchRes.length!=0">
                            <el-radio  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                <div class="flex-items-center" style="width:100%;padding-top:0;">
                                    <p>{{item.name }}</p>
                                </div>
                            </el-radio>
                        </el-radio-group>
                        <div v-else>暂无对应客户</div>
                        <ul>
                            <li v-for="(item,index) in data" :key="index" @click="activeTap(index,item)">
                                <div class="between">
                                    <el-link :underline='false' :type='active == index ? "primary" : ""'>{{item.name}}</el-link>
                                    <span>({{item.customer.length}})</span>
                                </div>
                                <el-collapse-transition>
                                    <ul style="padding-left:10px;line-height: 10px;" v-show="active == index">
                                        <el-radio-group v-model="appUser">
                                            <li v-for="(items,index) in item.customer" :key="index" class="customer-user flex-items-center" @click="childTap(index,item)">
                                                <el-radio :label="items" style="padding:4px 0;">{{items.name}}</el-radio>
                                            </li>
                                        </el-radio-group>
                                        <li v-if="item.customer.length==0">暂无对应客户</li>
                                    </ul>
                                </el-collapse-transition>
                            </li>
                        </ul>
                    </div> -->
                    <div class="customer-container xyk-scroll">
                        <!-- <div>
                            <el-radio-group v-model="appUser" @change="childTap">
                                <el-radio  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                    <div class="flex-items-center" style="width:100%;padding-top:0;">
                                        <p>{{item.name }}</p>
                                    </div>
                                </el-radio>
                            </el-radio-group>
                            <div v-if="searchRes.length== 0" style="padding-bottom:10px;">暂无搜索客户</div>
                        </div> -->
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="搜索结果" style="padding-bottom:0;">
                                <el-radio-group v-model="appUser" @change="childTap">
                                    <el-radio  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <p>{{item.name }}</p>
                                        </div>
                                    </el-radio>
                            </el-radio-group>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item v-for="(item,index) in data" :key="index" :title="item.name" :name="item.id">
                                <el-radio-group v-model="appUser" @change="childTap">
                                    <el-radio v-for="items in item.customer" :key="items.id" :label="items.id" style="display:block;line-height:30px;height:30px;">{{items.name}}</el-radio>
                                </el-radio-group>
                            </el-collapse-item>
                        </el-collapse>
                    </div>


                    <div class="yes-no">
                        <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                        <el-link :underline="false" @click="visible = false, newappUser = [] , typeName = ''" style="margin-left:10px;">取消</el-link >
                    </div>
                    <el-button slot="reference" style="border:0;width:100%;text-align:left; padding:10px 0;" >
                        <el-link :underline="false" type="primary" v-if='!newappUser.name'>{{linkTitle}}</el-link>
                        
                        <div class="between customer_user-color" v-else>
                            <!-- <span v-for="(item,index) in appUser" :key="index" class="my-approval">{{item.name}}</span> -->
                            <p><span>{{typeName}}</span><span >-{{newappUser.name}}</span></p>
                            <p><i class="el-icon-link"></i></p>
                        </div>
                    </el-button >
                </el-popover>
            </div>
        </div>
    <!-- </el-form-item> -->
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
            appUser:'',//选中的人
            newappUser:{},
            // isType:'',//分类名
            kehuId:'',//客户id
            typeName:'',//分类客户名
            searchRes:[],
            allKehu:[],
            
            activeName: '1'
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
        },
        customId:{//关联客户id
            type:Number
        }
    },
    created() {
        
        this.$http.get('marketing/group',{
            token:localStorage.getItem('token')
        }).then(res=>{
            this.data = res
            var allKehu = [];
            for(var i of res){
                
                for(var j of i.customer){
                    allKehu.push(j)
                }
            }
            this.allKehu = allKehu
        })

        
        this.$http.get('marketing/group',{
            token:localStorage.getItem('token')
        }).then(res=>{
            
            var newArray = []
            for(var i of res){
                for(var j of i.customer){
                    newArray.push(j)
                    if(j.id == this.customId){
                        
                        this.newappUser  = j
                        
                        this.typeName = i.name
                    }
                }
            }
            
            if(newArray.indexOf(this.customId) == '-1'){
                
            }else{
                
            }
        })

    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        customId(newValue,oldValue){
            
            this.appUser = newValue
            this.$http.get('marketing/group',{
                token:localStorage.getItem('token')
            }).then(res=>{
                
                for(var i of res){
                    for(var j of i.customer){
                        if(j.id == newValue){
                            
                            this.newappUser  = j
                            
                            this.typeName = i.name
                        }
                    }
                }
            })
        }
    },
    methods:{
        
        // 搜索
        searchInput(val){
            
            
            if (val) {
            this.$http.get('/marketing/serach', { keyword: val }).then(res => {
                this.searchRes = res
            })
            } else {
                this.searchRes = []
            }
        },
        Determine(){
            // var _this = this;
            this.visible=false
            for(var i of this.data){
                for(var j of i.customer){
                    if(j.id == this.kehuId){
                        this.newappUser = j
                        this.typeName = i.name
                    }
                }
            }
            // var data = Object.assign(this.isType, this.appUser)
            this.$emit('customer',JSON.stringify(this.appUser))
            this.$emit('customerId',this.newappUser.id)
            
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
            

            this.isType = item
            this.kehuId = index
            
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