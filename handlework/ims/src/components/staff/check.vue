<!--审批人-->
<template>
    <el-form-item :label="leftText">
        <div class="add-user font14-nobold-6">
            <div style="border:1px solid #D7DAE2" class="br4">
                <el-popover :placement="placement" :width="width" trigger="click" @hide="isHide" v-model="visible">
                    <div>
                        <h3 class="font16-bold-6">审批人</h3>
                        <el-input placeholder="请输入内容" v-model="filterText" @change="searchUser"></el-input>

                        

                        <el-collapse v-model="activeName" accordion class="xyk-scroll" style="height: 350px;overflow: overlay;width: 230px;padding-right: 10px;">
                            <el-collapse-item title="搜索结果" name="activeNames">
                                <!-- <div v-for="(items,index) in searchRes" style="padding:0 10px;"
                                    class="lately-lists" :key="index" @click="contacts(items)">
                                    <el-link :underline="false" class="font14-nobold-6" href="javascript:;">{{items.name}}</el-link>
                                </div> -->
                                <el-checkbox-group v-model="appUser">
                                    <el-checkbox  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <img :src="item.head" alt=""/>
                                            <p>{{item.name}}</p>
                                        </div>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-collapse-item>
                            <el-collapse-item :title="items.label" :name="index" v-for="(items,index) in allUser" :key="index">
                                <el-checkbox-group v-model="appUser">
                                    <el-checkbox  class="flex-items-center" v-for="(item,index) in items.user" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <img :src="item.head" alt=""/>
                                            <p>{{item.name}}</p>
                                        </div>
                                    </el-checkbox>
                                </el-checkbox-group>
                                
                            </el-collapse-item>
                        </el-collapse>
                        
                        <!-- <div class="customer-container xyk-scroll">
                            <ul>
                                <li v-for="(item,index) in data" :key="index" @click="activeTap(index,item)">
                                    <div class="between">
                                        <el-link :underline='false' :type='active == index ? "primary" : ""'>{{item.name}}</el-link>
                                        <span>({{item.customer.length}})</span>
                                    </div>
                                    <el-collapse-transition>
                                        <ul style="padding-left:10px;line-height: 10px;" v-show="active == index">
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
                        </div> -->


                        <div class="yes-no">
                            <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                            <el-link :underline="false" @click="visible = false, appUser = []" style="margin-left:10px;">取消</el-link >
                        </div>
                    </div>
                    <el-button slot="reference" style="border:0;" >
                        <el-link :underline="false" type="primary">
                            <span v-if="appUser.length==0"><i class="el-icon-plus"></i>{{addText}}</span>
                            <span v-else v-for="(item,index) in appUser" :key="index" class="my-approval">{{item.name}}</span>
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
            appUser:[],//选中的人
            visible:false,//审批人
            max:1,
            activeName:[],
            searchRes:[],//搜索人员
            // placement:'right',//出现位置
            // width:250,//label宽度
            filterText:'',
        }
    },
    props:{
        width:{
            type:Number,
        },
        placement:{//出现位置
            type:String
        },
        leftText:{
            type:String
        },
        addText:{//添加审批人
            type:String
        },
        isUser:{
            type:Array
        }
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
        getId(){
            var appUser = this.appUser
            var arrId = [];
            for(var i of appUser){
                arrId.push(i.user_id)
                this.$emit('approData',arrId)
            }
        },
        Determine(){
            // console.log(this.activeName)
            this.visible=false
            // this.$emit('approData',JSON.parse(JSON.stringify(_this.appUser)))
            // console.log(this.appUser)
            this.getId()
        },
        isHide(){
            // console.log(this.activeName)
            // this.$emit('approData',JSON.parse(JSON.stringify(this.appUser)))
            this.getId()
        }
    },
    watch: {
        isUser(newValue,oldValue){
            this.appUser = newValue
            this.getId()
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
    }
    // 我的审批人
    .my-approval{
        display: inline-block;
        padding: 0 5px;
        color: #409EFF;
    }
</style>