<!--审批人-->
<template>
    <el-form-item label="审批人 :">
        <div class="add-user font14-nobold-6">
            <div style="border:1px solid #D7DAE2" class="br4">
                <el-popover :placement="placement" :width="width" trigger="click" @hide="isHide" v-model="visible">
                    <div>
                        <el-input placeholder="请输入内容"></el-input>
                        <!-- <ul class="xyk-scroll" style="height:350px;overflow: overlay;">
                            <li v-for="(item, index) in allUser" :key="index"  class="flex-items-center"> -->
                                <!-- <el-checkbox style="display: flex;align-items: center;width:100%;" :label="item.id" v-model="appUser">
                                    <div class="flex-items-center" style="width:100%;">
                                        <img src="@/assets/logo.png" alt=""
                                            style="width:36px;height:36px;margin-right:10px;border-radius:50%;border:1px solid #DCDFE6"/>
                                        <p>{{ item.name }}</p>
                                    </div>
                                </el-checkbox> -->
                                <div  style="height:350px;overflow: overlay;" class="xyk-scroll">
                                    <div v-for="(items,index) in allUser" :key="index">
                                        <el-checkbox-group v-model="appUser" :max="max">
                                            <el-checkbox  class="flex-items-center" v-for="(item,index) in items.user" :key="index" :label="item">
                                                <div class="flex-items-center" style="width:100%;padding-top:0;">
                                                    <img :src="item.head" alt=""/>
                                                    <p>{{items.label}}--{{item.name }}</p>
                                                </div>
                                            </el-checkbox>
                                            <!-- <el-checkbox label="全部" name="type"></el-checkbox>
                                            <el-checkbox label="行政部" name="type"></el-checkbox>
                                            <el-checkbox label="业务部" name="type"></el-checkbox>
                                            <el-checkbox label="财务部" name="type"></el-checkbox> -->
                                        </el-checkbox-group>
                                    </div>
                                </div>
                            <!-- </li>
                        </ul> -->
                        <div class="yes-no">
                            <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                            <el-link :underline="false" @click="visible = false, appUser = []" style="margin-left:10px;">取消</el-link >
                        </div>
                    </div>
                    <el-button slot="reference" style="border:0;" >
                        <el-link :underline="false" style="">
                            <span v-if="appUser.length==0"><i class="el-icon-plus"></i>添加审批人</span>
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
            // placement:'right',//出现位置
            // width:250,//label宽度
        }
    },
    props:{
        width:{
            type:Number,
        },
        placement:{//出现位置
            type:String
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
        Determine(){
            var _this = this;
            this.visible=false
            this.$emit('approData',JSON.parse(JSON.stringify(_this.appUser)))
        },
        isHide(){
            this.$emit('approData',JSON.parse(JSON.stringify(this.appUser)))
        }
    },
    watch: {
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