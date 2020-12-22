<template>
    <div>
        <!-- <el-button>审批</el-button> -->
        <!-- 弹框 -->
        <el-dialog :visible.sync="checkDia" title="审核" width='600px' @close='closeDialog'>
            <el-form label-width="100px">
                <el-form-item label="审核结果:">
                <!-- <el-select class="el_date">
                    <el-option value="one" label="同意"></el-option>
                    <el-option value="two" label="不同意"></el-option>
                </el-select> -->
                    <el-select class="el_data" v-model="agree" placeholder="请选择" style="width:100%">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="审批:" style="text-align: left;">
                    <el-radio v-model="checkRadio" label="2">结束审核</el-radio>
                </el-form-item> -->
                <el-form-item label="意见:">
                <el-input type="textarea" v-model="textarea" placeholder="请你填写审批理由（非必填）"></el-input>
                </el-form-item>
            </el-form>
            <div class="tac">
                <el-button type="primary" @click="define">确定</el-button>
                <el-button @click="checkDia=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props:{
            checkDia:{
                type:Boolean,
            },
            baseUrl:{
                type:String,
            },
            applicationId:{
                type:Number,
            }
        },
        data() {
            return {
                options: [{
                    value: '-1',
                    label: '不通过'
                    }, {
                    value: '0',
                    label: '待审批'
                },{
                    value: '1',
                    label: '通过'
                }],
                value:'',//审批人
                agree:'',
                checkRadio: "1",
                textarea:'',
                allUser:[],
            }
        },
        created() {
            this.$http.get('user/index',{
                token:localStorage.getItem("token")
            }).then(res=>{
                // console.log(res)
                var allUser = [];
                for(var i of res){
                    // console.log(i.user)
                    for(var j of i.user){
                        allUser.push(j)
                        // console.log(allUser)
                        this.allUser = allUser
                    }
                }
            })
        },
        methods: {
            closeDialog(){
                this.$emit('close')
            },
            define(){
                // console.log('关闭')
                var finish = 20
                if(this.checkRadio == 2){
                    finish = 10
                }
                // console.log(this.agree)
                // console.log(this.checkRadio)
                // console.log(this.value)
                // console.log(this.textarea)
                this.$http.post(this.baseUrl,{
                    token:localStorage.getItem("token"),
                    status:this.agree,//通过
                    approval_id:this.applicationId,
                    content:this.textarea,//意见
                }).then(res=>{
                    this.$message(res.msg)
                    this.$emit('close')  
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    
  /deep/.el-dialog{
    width:560px;
  }
</style>