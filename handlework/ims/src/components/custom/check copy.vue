<!--关联客户-->
<template>
    <!-- <el-form-item :label="leftText"> -->
        <div class="customer-add-user font14-nobold-6">
            <div>
                <!-- <p class="title">关联客户</p> -->
                <el-popover placement="top" :width="width" trigger="click" v-model="visible" @hide="isHide">
                    <h2 class="font18-bold-3">{{boxTitle}}</h2>
                    <el-input  placeholder="搜索客户" v-model="filterText" @change="searchInput" style="margin:10px 0;">
                    </el-input>
                    <div class="customer-container xyk-scroll">
                        <div>
                            <el-checkbox-group v-model="appUser" @change="checkboxTap">
                                <el-checkbox  class="flex-items-center" v-for="(item,index) in searchRes" :key="index" :label="item">
                                    <div class="flex-items-center" style="width:100%;padding-top:0;">
                                        <p>{{item.name }}</p>
                                    </div>
                                </el-checkbox>
                            </el-checkbox-group>
                            <div v-if="searchRes.length== 0" style="padding-bottom:10px;">暂无搜索客户</div>
                        </div>
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
                    </div>
                    <div class="yes-no">
                        <el-link :underline="false" type="primary" @click="Determine" >确定</el-link>
                        <el-link :underline="false" @click="visible = false, appUser = [] , typeName = ''" style="margin-left:10px;">取消</el-link >
                    </div>
                    <el-button slot="reference" style="border:0;width:100%;text-align:left; padding:10px 0;" >
                        <el-link :underline="false" type="primary" v-if="appUser.length == 0">{{linkTitle}}</el-link>
                        
                        <div class="customer_user-color" v-else>
                            <div v-for="(item,index) in appUser" :key="index" class="my-approval between ">
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
            data: [],
            active:null,//分类切换
            appUser:[],//选中的人
            isType:'',//分类名
            typeName:'',//分类客户名
            searchRes:[],//搜索的人员
            arrayId:[],//选中人的id
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
            token:this.$token
        }).then(res=>{
            console.log(res)
            this.data = res
        })
    },
     watch: {
      newAppUser(newValue,oldValue) {
        // this.$refs.tree.filter(val);
        console.log(newValue)
        console.log(oldValue)
        if(newValue != oldValue){
            this.appUser = newValue
        }
      }
    },
    methods:{
        //多选
        checkboxTap(val){
            console.log('变化')
            console.log(this.appUser)
            console.log(val)
            var newId = []
            for(var i of val){
                if(i.id){
                    console.log(i.id)
                    newId.push(i.id)
                }
            }
            console.log(newId)
            this.arrayId = newId
        },
        deleteNew(val){
            console.log(val)
            this.appUser = this.appUser.splice(val,1)
            this.$emit('isDelete')
        },
        // 搜索
        searchInput(val){
            console.log(val)
            
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
            // var data = Object.assign(this.isType, this.appUser)
            this.$emit('customer',JSON.stringify(this.isType))
            this.$emit('iskehuId',JSON.stringify(this.arrayId))
            console.log(this.isType)
        },
        
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },


        activeTap(index,item){
            // console.log(index)
            // console.log(item)
            if(this.active != index){//确定
                this.active = index
                this.typeName = item.name
            }else{
                this.active = null
            }
        },
        childTap(index,item){
            console.log(index)
            console.log(item)
            var array = [];
            array.push(item.id)
            console.log(array)
            this.isType = array
            console.log(this.isType)
        },
        isHide(){
            console.log(JSON.stringify(this.isType))
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