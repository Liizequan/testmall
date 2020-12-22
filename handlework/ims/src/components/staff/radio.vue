<!--审批人-->
<template>
    <el-form-item :label="leftText">
        <div class="add-user font14-nobold-6">
            <div style="border:1px solid #D7DAE2" class="br4">
                <el-popover :placement="placement" :width="width" trigger="click" @hide="isHide" v-model="visible">
                    <div>
                        <!-- <h3 class="font16-bold-6" style="padding-bottom:10px">审批人</h3> -->
                        <el-input placeholder="请输入内容" v-model="searchtext" @change="searchUser"></el-input>

                        <!-- <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item title="搜索人员" name="activeNames">
                                <el-radio-group v-model="appUser">
                                    <el-radio  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <img :src="item.head" alt=""/>
                                            <p>{{item.name }}</p>
                                        </div>
                                    </el-radio>
                                </el-radio-group>
                            </el-collapse-item>
                        </el-collapse> -->

                        <el-collapse v-model="activeName" accordion class="xyk-scroll" style="height: 350px;overflow: overlay;width: 230px;padding-right: 10px;">
                            <el-collapse-item title="搜索结果" name="activeNames">
                                <el-radio-group v-model="appUser">
                                    <el-radio  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <img :src="item.head" alt=""/>
                                            <p>{{item.name }}</p>
                                        </div>
                                    </el-radio>
                                </el-radio-group>
                            </el-collapse-item>
                            <el-collapse-item :title="items.label" :name="index" v-for="(items,index) in allUser" :key="index">

                                <el-radio-group v-model="appUser">
                                    <el-radio  class="flex-items-center" v-for="(item,index) in items.user" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <img :src="item.head" alt=""/>
                                            <p>{{item.name }}</p>
                                        </div>
                                    </el-radio>
                                </el-radio-group>
                                
                            </el-collapse-item>
                        </el-collapse>


                        <div class="yes-no">
                            <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                            <el-link :underline="false" @click="visible = false" style="margin-left:10px;">取消</el-link >
                        </div>
                    </div>
                    <el-button slot="reference" style="border:0;" >
                        <el-link :underline="false" style="">
                            <i class="el-icon-plus"></i>
                            <!-- <span v-if="!isAppUser.name"><i class="el-icon-plus"></i>添加审批人</span>
                            <span v-else class="my-approval">{{isAppUser.name}}</span> -->
                            <span class="my-approval">{{isAppUser.name}}</span>
                        </el-link>
                    </el-button >
                </el-popover>
                
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
            allUser:[],//所有人
            appUser:'',//选中的人
            isAppUser:'',
            visible:false,//审批人
            activeName: '0',
            searchtext:'',
            searchRes:[],
        }
    },
    props:{
        width:{
            type:Number,
        },
        placement:{
            type:String
        },
        leftText:{
            type:String
        },
        // appUser:{
            
        // },
        approvalId:{
            type:Number
        },
        
    },
    created() {
        this.$http.get('user/index',{
            token:localStorage.getItem("token")
        }).then(res=>{
            this.allUser = res
        })
    },
    computed: {
        
    },
    methods:{
        
        // 搜索人员
        // user/search
        searchUser(val){
            if (val) {
            this.$http.get('/user/search', { name: val, 
                // token:this.$token 
            }).then(res => {
                this.searchRes = res
            })
            } else {
                this.searchRes = []
            }
        },
        Determine(){
            this.visible=false
            this.isAppUser = this.appUser
            this.$emit('approData',JSON.parse(JSON.stringify(this.isAppUser)))

        },  
        isHide(){

        }
    },
    watch: {
        appUser(newValue,oldValue){
            if(newValue != oldValue){
                this.$http.get('user/index',{
                    token:localStorage.getItem("token")
                }).then(res=>{
                    for(var i of res){
                        for(var j of i.user){
                            if(j.name == newValue){
                                this.isAppUser = j
                                this.$emit('approData',JSON.parse(JSON.stringify(this.isAppUser)))
                            }
                        }
                    }
                })
            }
        },
        approvalId(newValue,oldValue){
            this.$http.get('user/index',{
                token:localStorage.getItem("token")
            }).then(res=>{
                for(var i of res){
                    for(var j of i.user){
                        if(newValue == j.user_id){
                            this.isAppUser = j
                            this.appUser = j
                        }
                    }
                }
                
            })
        }
    },
}
</script>
<style lang="less" scoped>
    .add-user{
        text-align: left;
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
</style>