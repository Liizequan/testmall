<template>
    <div>
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
                <el-form-item label="下一审批人:" style="text-align: left;">
                    <el-radio v-model="checkRadio" label="1">
                        <!-- <el-select class="el_data" v-model="value" placeholder="请选择">
                                <el-option v-for="items in allUser" :key="items"
                                :label="items.name" :value="items.user_id">
                                </el-option>
                        </el-select> -->
                        <el-select class="el_data" v-model="value" placeholder="请选择" style="width:100%">
                            <el-option
                            v-for="item in allUser"
                            :key="item.value"
                            :label="item.name"
                            :value="item.user_id"
                            :disabled="agree == 10" 
                            >
                            </el-option>
                        </el-select>
                    </el-radio>
                    <el-radio v-model="checkRadio" label="2">结束审核</el-radio>
                </el-form-item>
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
                    value: '10',
                    label: '同意'
                    }, {
                    value: '20',
                    label: '不同意'
                }],
                value:'',//审批人
                agree:null,
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
                this.$emit('close',false)
            },
            define(){
                if(!this.agree){
                    return this.$message('请选择审核结果')
                }else if(this.agree == '10'){
                    this.value = null
                }
                // if(!this.)
                this.$emit('close',false)   
                var finish = 10
                if(this.checkRadio == 2){
                    finish = 20
                }
                // console.log(this.agree)
                // console.log(this.checkRadio)
                // console.log(this.value)
                // console.log(this.textarea)
                this.$http.post(this.baseUrl,{
                    token:localStorage.getItem("token"),
                    result:this.agree,//同意
                    application_id:this.applicationId,//当前审批id
                    finish:finish,//20结束 10未结束
                    approval:this.value,//下一审批人
                    opinion:this.textarea,//意见
                }).then(res=>{
                    // console.log(res)
                    this.$message(res.msg)
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