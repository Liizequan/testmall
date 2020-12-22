<template>
    <div class="becom-add">
        <div class="top">
            <h2 class="font18-bold-3">转正申请</h2>
            <p class="font14-bold-3">基础信息</p>
        </div>

        <div class="form">
            <el-form :label-position="labelPosition" label-width="170px" :model="formLabelAlign">
                <el-form-item label="申请人 :" class="redStar">
                    <el-input disabled v-model="formLabelAlign.name" maxlength="4" placeholder="请填申请人（2~4位中文）"></el-input>
                </el-form-item>
                <el-form-item label="工号 :" class="redStar">
                    <el-input disabled v-model="formLabelAlign.region"  maxlength="8" placeholder="请填工号"></el-input>
                </el-form-item>
                <el-form-item label="职位 :" class="redStar">
                    <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
                    <Position :departmentId='position' @customer="getPositionData" />
                </el-form-item>
                <el-form-item label="部门 :" class="redStar">
                    <Department :departmentId='department' @customer='getDepartData' />
                </el-form-item>
                <el-form-item label="职级 :" class="redStar">
                    <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
                    <Rank :departmentId='rank' @customer='getRankData' />
                </el-form-item>
                <el-form-item label="入职时间 :" class="redStar">
                    <el-date-picker v-model="formLabelAlign.entryTime" type="date" placeholder="选择日期"
                        style="width:100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="试用期 :" class="redStar">
                    <el-date-picker v-model="formLabelAlign.probation" type="daterange" start-placeholder="开始日期"
                        end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" style="width:100%;"
                        format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="转正时间 :" class="redStar">
                    <el-date-picker v-model="formLabelAlign.correctionTime" type="date" placeholder="选择日期"
                        style="width:100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="对本岗位的理解 :">
                    <el-input type="textarea" :rows="2" placeholder="请填对本岗位的理解（255字之内）" v-model="textarea">
                    </el-input>
                </el-form-item>
                <el-form-item label="试用期内对工作的总结 :">
                    <el-input type="textarea" :rows="2" placeholder="请填试用期内对工作的总结（255字之内）" v-model="summary">
                    </el-input>
                </el-form-item>
                <el-form-item label="对公司的意见和建议 :">
                    <el-input type="textarea" :rows="2" placeholder="请填对公司的意见和建议（255字之内）" v-model="suggestions">
                    </el-input>
                </el-form-item>
                <Approval :leftText="leftText" :approvalId = 'approvalId'  @approData="getApprovalData"  class="redStar"/>
            </el-form>
        </div>
        <div>
            <el-button type="primary" @click="submit">
                <span v-if="!this.$route.query.id">提交</span>
                <span v-else>完成修改</span>
            </el-button>
            <el-button @click="saveData" type="primary" v-if="!addsave">暂存</el-button>
            <!-- <el-button @click="nosaveData" v-else>取消</el-button> -->
            <el-button @click="back()">返回</el-button>
        </div>


    </div>
</template>
<script>
    import Department from "../../../components/table/Department.vue";
    import Rank from "../../../components/table/Rank.vue";
    import Approval from "../../../components/staff/radio.vue";
    import Position from "../../../components/table/Position.vue";
    export default {
        components: {
            Department,
            Approval,
            Rank,
            Position
        },
        data() {
            return {
                edit: false,
                suggestions: '',
                summary: '',
                addsave:false,
                labelPosition: 'right',
                leftText:'审批人:',

                position: null,
                department: null,
                rank: null,

                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    structureId: '',
                    rankId: '',
                    positionId: '',
                    entryTime: '',
                    probation: '',
                    correctionTime: '',
                },
                textarea: '',
                approvalId: null,
                allUser: [
                    { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }, { name: 'kings' }
                ],
                visible: false,//审批人
            }
        },
        methods: {
            // 暂存
            saveData(){
                var data = {
                    token: localStorage.getItem('token'),
                    name: this.formLabelAlign.name,//申请人
                    job_number: this.formLabelAlign.region,//工号
                    position_id: this.formLabelAlign.positionId,//（职位id）
                    structure_id: this.formLabelAlign.structureId,//（部门id）
                    rank: this.formLabelAlign.rankId,//职级
                    entry_time: this.formLabelAlign.entryTime,//入职时间（入职时间）
                    probation: this.formLabelAlign.probation.toString(),//(试用期时间)
                    correction_time: this.formLabelAlign.correctionTime,//（转正时间）
                    understand: this.textarea,//（岗位理解）
                    summary: this.summary,//（试用期总结）
                    suggestions: this.suggestions,//（意见建议）
                    approval: this.approvalId,//（审批人ID）
                    is_storage:1,
                    type: 10,
                    id:'',
                }
                this.$http.post('application/add', data).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.back()
                    }
                })

            },
            // 不暂存清除数据
            nosaveData(){
                localStorage.setItem("add_relation", '');
                this.back();
                this.$message('取消成功')
            },
            // 转正申请
            submit() {
                // console.log(this.formLabelAlign.name)//申请人
                // console.log(this.formLabelAlign.region)//工号
                // console.log(this.formLabelAlign.type)//职位id
                // console.log(this.formLabelAlign.structureId)//部门id
                // console.log(this.formLabelAlign.positionId)
                // console.log(this.formLabelAlign.structureId)
                // console.log(this.formLabelAlign.rankId)
                // console.log(this.formLabelAlign.name)
                // console.log(this.formLabelAlign.name)
                // console.log(this.formLabelAlign.name)
                // console.log(this.formLabelAlign.name)
                let f = this.formLabelAlign
                // console.log(this.$route.query.id)
                // console.log(!this.approvalId)
                if (!f.name || !this.$re.tfCc(f.name)) {
                    this.$message('请填2~4位中文名')
                } else if (!f.region) {
                    this.$message('请填写工号')
                } else if (!f.positionId) {
                    this.$message('请填写职位')
                } else if (!f.structureId) {
                    this.$message('请填写部门')
                } else if (!f.rankId) {
                    this.$message('请填写职级')
                } else if (!f.entryTime) {
                    this.$message('请填写入职时间')
                } else if (!f.probation) {
                    this.$message('请填写试用期')
                } else if (!f.correctionTime) {
                    this.$message('请填写转正时间')
                }
                //  else if (!this.textarea) {
                //     this.$message('请填写对本岗位的理解')
                // } else if (!this.summary) {
                //     this.$message('请填写试用期对工作的总结')
                // }else if (!this.suggestions) {
                //     this.$message('请填写试用期对工作的总结')
                // } 
                // else if (!this.approvalId) {
                //     this.$message('请填写审批人')
                // } 
                else {
                    var url = '', newData = {};
                    var data = {
                        token: localStorage.getItem('token'),
                        name: this.formLabelAlign.name,//申请人
                        job_number: this.formLabelAlign.region,//工号
                        position_id: this.formLabelAlign.positionId,//（职位id）
                        structure_id: this.formLabelAlign.structureId,//（部门id）
                        rank: this.formLabelAlign.rankId,//职级
                        entry_time: this.formLabelAlign.entryTime,//入职时间（入职时间）
                        probation: this.formLabelAlign.probation.toString(),//(试用期时间)
                        correction_time: this.formLabelAlign.correctionTime,//（转正时间）
                        understand: this.textarea,//（岗位理解）
                        summary: this.summary,//（试用期总结）
                        suggestions: this.suggestions,//（意见建议）
                        approval: this.approvalId,//（审批人ID）
                        is_storage:0,
                        type: 10,
                    }
                    if (this.$route.query.id) {//编辑\
                        url = 'application/edit'
                        newData = Object.assign({ id: this.$route.query.id }, data)
                    } else {//转正
                        url = 'application/add'
                        newData = data
                    }
                    this.$http.post(url, newData).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.back()
                        }
                    })
                }
            },
            // 获取部门数据
            getDepartData(data) {
                console.log(data)
                this.formLabelAlign.structureId = data
            },
            // 获取职级
            getRankData(data) {
                console.log(data)
                this.formLabelAlign.rankId = data
            },
            // 获取职位
            getPositionData(data) {
                console.log(data)
                this.formLabelAlign.positionId = data
            },
            // 获取审批人
            getApprovalData(data) {
                console.log(data)
                this.approvalId = data.user_id
                // this.approvalId = data[0].user_id
            },
        },
        created() {
            let log_info = JSON.parse(localStorage.getItem('login_status'))
            this.formLabelAlign.name = log_info.info.name
            this.formLabelAlign.region =log_info.info.job_number
            this.$http.get('application/check',{
                token:localStorage.getItem('token')
            }).then(res=>{
                console.log(res)
                var res = res.msg
                this.formLabelAlign.name = res.name//申请人
                this.formLabelAlign.region = res.job_number//工号
                this.formLabelAlign.positionId = res.position_id//（职位id）
                this.position = res.position_id.toString()
                this.formLabelAlign.structureId = res.structureId//（部门id）
                this.department = res.structure_id.toString()
                this.formLabelAlign.rankId = res.rank//职级
                this.rank = res.rank;
                this.formLabelAlign.entryTime = res.entry_time//入职时间（入职时间）
                this.formLabelAlign.probation = res.probation.split(","),//(试用期时间)
                this.formLabelAlign.correctionTime = res.correction_time//（转正时间）
                this.textarea = res.understand//（岗位理解）
                this.summary = res.summary//（试用期总结）
                this.suggestions = res.suggestions//（意见建议）
                this.approvalId = res.approval//（审批人ID）
            })
            console.log(this.$route.query.id)
            if (this.$route.query.id) {
                this.edit = true;
                this.$http.get('application/look', { token: localStorage.getItem('token'), id: this.$route.query.id }).then(res => {
                    console.log(res)
                    console.log('加载四')
                    this.formLabelAlign.name = res.name//申请人
                    this.formLabelAlign.region = res.job_number//工号
                    this.formLabelAlign.positionId = res.position_id//（职位id）
                    this.position = res.position_id
                    this.formLabelAlign.structureId = res.structure_id//（部门id）
                    this.department = res.structure_id
                    this.formLabelAlign.rankId = res.rank//职级
                    this.rank = res.rank;
                    this.formLabelAlign.entryTime = res.entry_time//入职时间（入职时间）
                    this.formLabelAlign.probation = res.probation.split(","),//(试用期时间)
                    this.formLabelAlign.correctionTime = res.correction_time//（转正时间）
                    this.textarea = res.understand//（岗位理解）
                    this.summary = res.summary//（试用期总结）
                    this.suggestions = res.suggestions//（意见建议）
                    this.approvalId = res.approval//（审批人ID）
                })
                return
            }

        },
    }
</script>
<style lang="less" scoped>
    .becom-add .form {
        width: 800px;
        padding-bottom: 20px;
    }

    .top {
        text-align: left;

        p {
            margin: 30px 0 20px;
            padding: 0 10px;
            border-left: 2px solid #409EFF;
        }
    }

    .add-user {
        text-align: left;
    }

    .xyk-scroll li {
        padding-top: 10px;
    }

    .yes-no {
        text-align: right;

        a {
            display: inline-block;
            padding: 10px 0px 0 10px;
        }
    }
</style>