<!--关联客户-->
<template>
    <!-- <el-form-item :label="leftText"> -->
        <div class="customer-add-user font14-nobold-6">
            <div>
                <!-- <p class="title">关联客户</p> -->
                <el-popover placement="top" :width="width" trigger="click" v-model="visible" @hide="isHide">
                    <h3 class="font18-bold-3">{{boxTitle}}</h3>
                    <el-input  placeholder="搜索客户" v-model="filterText" @change="searchInput" style="margin:10px 0;">
                    </el-input>
                    <div class="customer-container xyk-scroll">
                        <!-- <div>
                            <el-checkbox-group v-model="arrayId" @change="checkboxTap">
                                <el-checkbox  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                    <div class="flex-items-center" style="width:100%;padding-top:0;">
                                        <p>{{item.name }}</p>
                                    </div>
                                </el-checkbox>
                            </el-checkbox-group>
                            <div v-if="searchRes.length== 0" style="padding-bottom:10px;">暂无搜索客户</div>
                        </div> -->
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="搜索结果" :name="activeNames">
                                <el-checkbox-group v-model="appUser" @change="childTap">
                                    <el-checkbox  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                        <div class="flex-items-center" style="width:100%;padding-top:0;">
                                            <p>{{item.name }}</p>
                                        </div>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse v-model="activeName">
                            <el-collapse-item v-for="(item,index) in data" :key="index" :name="item.id">
                                <template slot="title">
                                    <div>
                                        {{item.name}}
                                    </div>
                                </template>
                                <el-checkbox-group v-model="arrayId" @change="checkboxTap">
                                    <el-checkbox v-for="items in item.customer" :key="items.id" :label="items.id" style="display:block">{{items.name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <div class="yes-no">
                        <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                        <el-link :underline="false" @click="visible = false, newappUser = [] , typeName = ''" style="margin-left:10px;">取消</el-link >
                    </div>
                    <el-button slot="reference" style="border:0;width:100%;text-align:left; padding:10px 0;" >
                        <el-link :underline="false" type="primary" v-if="newappUser.length == 0 || !newappUser[0].id">{{linkTitle}}</el-link>
                        
                        <div class="customer_user-color" v-else>
                            <div v-for="(item,index) in newappUser" :key="index" class="my-approval between ">
                                <span>{{item.name}}</span><i class="el-icon-link"></i>
                                <!-- <el-link type="primary" :underline="false" @click="deleteNew(index)"><i class="el-icon-delete"></i></el-link> -->
                            </div>
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
            data: [],//所有客户
            active:null,//分类切换
            appUser:[117],//选中的人
            isType:'',//分类名
            typeName:'',//分类客户名
            searchRes:[],//搜索的人员
            arrayId:[],//选中人的id
            allKehu:[],//所有 客户
            newappUser:[],

            // 手风琴
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
        leftText:{//左边名称
            type:String
        },
        newAppUser:{
            type:Array
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
    },
     watch: {
      newAppUser(newValue,oldValue) {
        if(newValue != oldValue){
            this.appUser = newValue//临时
            this.newappUser = newValue//页面
            var array=[]
            for(let i of newValue){
                array.push(i.id)
            }
            if(array){
                this.arrayId = array
            }
        }
      },
      linkTitle(newValue,oldValue){
      }
    },
    methods:{
        //多选
        checkboxTap(val){
            var allKehu  = this.allKehu
            var array = [];
            for(var i of allKehu){
                for(var j of val){
                    if(j == i.id){
                        array.push(i)
                    }
                }
            }
            this.appUser = array
        },
        deleteNew(val){
            this.$emit('isDelete')
        },
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
            this.newappUser = this.appUser
            // var _this = this;
            this.visible=false
            for(var i in this.arrayId){
                if(!this.arrayId[i]){
                    this.arrayId.splice(i,1)
                }
            }
            // var data = Object.assign(this.isType, this.appUser)
            this.$emit('customer',JSON.stringify(this.isType))
            this.$emit('iskehuId',JSON.stringify(this.arrayId))
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
            for(var i in this.arrayId){
                if(!this.arrayId[i]){
                    this.arrayId.splice(i,1)
                }
            }
            this.$emit('customer',JSON.stringify(this.appUser))
            this.$emit('iskehuId',JSON.stringify(this.arrayId))
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
        // display: inline-block;
        padding: 5px;
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
        display: flex;
        flex-direction: column;
    }
</style>