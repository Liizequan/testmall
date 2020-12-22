<template>
    <div class="becom-add">
        <div class="top">
            <div class="between">
                <h2 class="font18-bold-3">绩效考核 
                    <el-link style="background:#67C23A;display:inline-block;padding:4px 10px;color:#fff;border-radius:4px;" disabled>
                        <!-- <span >{{activateData.status}}</span> -->
                        <span v-if="!score">进行中</span>
                        <span v-else>已结束</span>
                    </el-link>
                </h2>
                <div v-if="score"><span>绩效完成度：</span> <strong>{{score.perce}}%</strong></div>
            </div>
            <p class="font14-bold-3">基础信息</p>
        </div>
        
        <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
            <el-form-item label="绩效考核名称 :">
               <div class="text-left"> {{activateData.name}}</div>
            </el-form-item>
            <el-form-item label="考核开始时间 :">
               <div class="text-left"> {{activateData.begin_time}}</div>
            </el-form-item>
            <el-form-item label="考核结束时间 :">
               <div class="text-left"> {{activateData.create_time}}</div>
            </el-form-item>
            <el-form-item label="考核周期 :">
               <div class="text-left"> {{activateData.cycle}}</div>
            </el-form-item>
            <el-form-item label="考核对象 :">
               <div class="text-left"> {{myname}}</div>
            </el-form-item>
            <el-form-item label="部门 :">
               <div class="text-left"> {{activateData.structure}}</div>
            </el-form-item>
            <el-form-item label="考核指标明细 :">
                <el-table stripe
                :header-cell-style="$store.state.headStyle"
                    :data="activateData.item"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="label" label="指标类型" width="180">
                        <template slot-scope="scope">
                            <!-- {{}} -->
                            <input type="text" :value="scope.row.desc" disabled="true" style="background-color: transparent;border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                        <!-- <input type="text" disabled="true" style="background-color: transparent;border:3px solid transparent;width:100%;text-align: center;"> -->
                    </el-table-column>
                    <el-table-column prop="desc" label="指标描述" width="180">
                        <template slot-scope="scope">
                            <input type="text" :value="scope.row.desc" disabled="true" style="background-color: transparent;border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="weight" label="权重（%）">
                        <template slot-scope="scope">
                            <input type="text" :value="scope.row.weight" disabled="true" style="background-color: transparent;border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="cycles" label="考核周期">
                        <template slot-scope="scope">
                            <input type="text" :value="scope.row.cycles" disabled="true" style="background-color: transparent;border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="score" label="考核分值（满分100分）">
                        <template slot-scope="scope">
                            <input type="text" :value="scope.row.score" disabled="true" style="background-color: transparent;border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="审批人 :">
                <div class="add-user font14-nobold-6">
                    {{activateData.approval}}
                </div>
            </el-form-item>
            <el-form-item label="评价 :" v-if="score">
                <div class="add-user font14-nobold-6">
                    {{score.content}}
                </div>
            </el-form-item>
            <el-form-item label="创建时间 :">
                <div class="add-user font14-nobold-6">
                    {{activateData.log.create_time}}
                </div>
            </el-form-item>
            <el-form-item label="发起人 :">
                <div class="add-user font14-nobold-6">
                    {{activateData.originator}}
                </div>
            </el-form-item>
            <div>
                <el-button type="primary" style="width:120px;"  @click="dialogFormVisible = true" :disabled="score?true:false">评分归档</el-button>
                <!-- <el-button type="primary" style="width:120px;"  @click="dialogFormVisible = true" v-else>再次发起</el-button>  v-if="conduct"-->
                <el-button @click="back()" style="width:120px;">返回</el-button>
            </div>
        </el-form>
        
        <!-- 弹框 -->
        <el-dialog title="考核结果" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="绩效完成度 :" label-width="90px">
                    <el-input v-model="form.ratio" autocomplete="off" maxlength='3'></el-input>
                </el-form-item>
                <el-form-item label="评价 :" label-width="90px">
                    <el-input type="textarea" v-model="form.content" autocomplete="off" maxlength='120'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="agree">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            // 审批状态
            conduct:false,//true表示进行中，false表示已结束
            myname:'',
            labelPosition: 'right',
            dialogTableVisible: false,
            dialogFormVisible: false,
            score:false,
            form: {
                ratio:'',//比率
                content:'',//评价
            },
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            value: '',
            value1:'',
            textarea:'',
            allUser:[
                {name:'kings'}
            ],
            visible:false,//审批人
            options: [{
                value: '选项1',
                label: '周期'
                }, {
                value: '选项2',
                label: '月度'
                },
            ],
            tableData: [],

            activateData:{
                log:{
                    create_time:''
                }
            },//考核详情
            loading:true,
        }
    },
    methods: {
        agree(){
            if(!this.form.ratio){
                return this.$message('完成进度为1~3位数字')
            }else if(!this.form.content){
                return this.$message('评分不能为空')
            }
            this.$http.post('examine/score',{
                // token:this.$token,
                examine_id:this.$route.params.detail_Id,
                perce:this.form.ratio,
                content:this.form.content
            }).then(res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.dialogFormVisible = false
                    this.getData()
                }
            })
        },
        getData(){
            this.$http.get('examine/look',{
                id:this.$route.params.detail_Id
            }).then(res=>{
                console.log(res)
                this.loading = false
                this.activateData = res[0]
                this.score = res[0].score[0]
                if(res[0].status == '待审核'){
                    this.conduct = true
                }else{
                    this.conduct = false
                }
            })
        }
    },
    created() {
        var login_status = localStorage.getItem("login_status")
        this.myname = JSON.parse(login_status).info.name
        this.getData()
    },
}
</script>
<style lang="less" scoped>
    .top{
        text-align: left;
        p{
            margin:30px 0 20px;
            padding: 0 10px; 
            border-left:2px solid #409EFF;
        }
        strong{
            font-size: 44px;
            font-weight: bold;
            color:#409EFF;
        }
    }
    .add-user{
        text-align: left;
    }
    .xyk-scroll li{
        padding-top:10px;
    }
    .yes-no {
        text-align: right;
        a {
            display: inline-block;
            padding: 10px 0px 0 10px;
        }
    }
    // 添加说明
    .add-explain{
        text-align: left;
        margin:20px 0 20px;
        display: flex;
        align-items: center;
        i{
            display: inline-block;
            padding-right:4px;
        }
    }
    .text-left{
        text-align: left;
    }
</style>