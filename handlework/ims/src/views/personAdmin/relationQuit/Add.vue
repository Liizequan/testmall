<template>
    <div class="becom-add">
        <div class="top">
            <h2 class="font18-bold-3">离职申请</h2>
            <p class="font14-bold-3">基础信息</p>
        </div>

        <el-form :label-position="labelPosition" label-width="170px" :model="formLabelAlign">
            <el-form-item label="申请人 :" class="redStar">
                <el-input disabled v-model="formLabelAlign.name" maxlength="4" placeholder="请填申请人（2~4位中文）"></el-input>
            </el-form-item>
            <el-form-item label="工号 :">
                <el-input disabled v-model="formLabelAlign.region" maxlength="10" placeholder="请填工号"></el-input>
            </el-form-item>
            <el-form-item label="职位 :" class="redStar">
                <!-- <el-input v-model="formLabelAlign.position"></el-input> -->
                <!-- <Position @customer="getPositionData" /> -->
                <Position :departmentId='position' @customer="getPositionData" />
            </el-form-item>
            <el-form-item label="部门 :" class="redStar">
                <!-- <el-input v-model="formLabelAlign.structure"></el-input> -->
                <!-- <Department @customer='getDepartData' /> -->
                <Department :departmentId='department' @customer='getDepartData' />
            </el-form-item>
            <el-form-item label="职级 :" class="redStar">
                <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
                <!-- <Rank @customer='getRankData' /> -->
                <Rank :departmentId='rank' @customer='getRankData' />
            </el-form-item>
            <el-form-item label="入职时间 :" class="redStar">
                <el-date-picker v-model="formLabelAlign.entryTime" type="date" placeholder="选择日期" style="width:100%;"
                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最后工作日 :" class="redStar">
                <el-date-picker v-model="formLabelAlign.correctionTime" type="date" placeholder="选择日期"
                    style="width:100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="离职原因 :" class="redStar">
                <el-select v-model="formLabelAlign.understand" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in options" :key="item.reason" :label="item.reason" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>



            <el-form-item label="工作交接单 :">
                <el-input type="textarea" :rows="2" placeholder="请填工作交接单（255字内）" v-model="summary">
                </el-input>
            </el-form-item>
            <el-form-item label="备注 :">
                <el-input type="textarea" :rows="2" placeholder="请填备注（255字内）" v-model="other">
                </el-input>
            </el-form-item>
            <Approval :leftText="leftText" @approData="getApprovalData"  class="redStar"/>
            <div>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="saveData" type="primary">暂存</el-button>
                <el-button @click="back()">返回</el-button>
            </div>
        </el-form>



    </div>
</template>
<script>

    import Department from "../../../components/Department.vue";
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
                labelPosition: 'right',
                position:null,
                department:null,
                rank:null,
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    structureId: '',
                    rankId: '',
                    positionId: '',
                    entryTime: '',
                    correctionTime: '',
                    understand: '',//离职原因
                },
                leftText:'审批人:',
                approvalId: '',//审批人
                value: '',
                value1: '',
                textarea: '',
                allUser: [
                    { name: 'kings' }
                ],
                visible: false,//审批人
                searchUser: '',
                options: [],//离职列表数据
                other: '',
                summary: ''
            }
        },
        methods: {
            
            // 暂存
            saveData(){
                var data = {
                    // token: localStorage.getItem('token'),
                    // name: this.formLabelAlign.name,//申请人
                    // job_number: this.formLabelAlign.region,//工号
                    // position_id: this.formLabelAlign.positionId,//（职位id）
                    // structure_id: this.formLabelAlign.structureId,//（部门id）
                    // rank: this.formLabelAlign.rankId,//职级
                    // entry_time: this.formLabelAlign.entryTime,//入职时间（入职时间）
                    // probation: this.formLabelAlign.probation.toString(),//(试用期时间)
                    // correction_time: this.formLabelAlign.correctionTime,//（转正时间）
                    // understand: this.textarea,//（岗位理解）
                    // summary: this.summary,//（试用期总结）
                    // suggestions: this.suggestions,//（意见建议）
                    // approval: this.approvalId,//（审批人ID）
                    // is_storage:1,
                    // type: 10,
                    // id:'',
                    token: localStorage.getItem('token'),
                    name: this.formLabelAlign.name,
                    job_number: this.formLabelAlign.region,
                    position_id: this.formLabelAlign.positionId,
                    structure_id: this.formLabelAlign.structureId,
                    rank: this.formLabelAlign.rankId,
                    entry_time: this.formLabelAlign.entryTime,//入职时间
                    probation: '',//试用期时间
                    correction_time: this.formLabelAlign.correctionTime,//离职时间
                    reason:this.formLabelAlign.understand,
                    // understand: this.formLabelAlign.understand,
                    summary: this.summary,
                    suggestions: this.other,
                    approval: this.approvalId,
                    is_storage:1,
                    id:'',
                    type: 20
                }
                this.$http.post('application/add', data).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.back()
                    }
                })

            },
            submit() {
                let f = this.formLabelAlign
                if (!f.name) {
                    this.$message('请填写申请人')
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
                } else if (!f.correctionTime) {
                    this.$message('请填写最后工作日')
                } else if (!f.understand) {
                    this.$message('请填写离职原因')
                } 
                // else if (!this.summary) {
                //     this.$message('请填写工作交接单')
                // } else if (!this.other) {
                //     this.$message('请填写备注')
                // } 
                else if (!this.approvalId) {
                    this.$message('请填写审批人')
                } else {
                    this.$http.post('application/add', {
                        token: localStorage.getItem('token'),
                        name: this.formLabelAlign.name,
                        job_number: this.formLabelAlign.region,
                        position_id: this.formLabelAlign.positionId,
                        structure_id: this.formLabelAlign.structureId,
                        rank: this.formLabelAlign.rankId,
                        entry_time: this.formLabelAlign.entryTime,//入职时间
                        probation: '',//试用期时间
                        correction_time: this.formLabelAlign.correctionTime,//离职时间
                        reason:this.formLabelAlign.understand,
                        // understand: this.formLabelAlign.understand,
                        summary: this.summary,
                        suggestions: this.other,
                        approval: this.approvalId,
                        is_storage:0,
                        type: 20
                    }).then(res => {
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
            },
        },
        created() {
            let log_info = JSON.parse(localStorage.getItem('login_status'))
            this.formLabelAlign.name = log_info.info.name
            this.formLabelAlign.region =log_info.info.job_number
            console.log(this.formLabelAlign.name,'tttttttt')
            this.$http.get('application/reason').then(res => {
                console.log(res)
                this.options = res
            })
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
                this.other = res.suggestions
                this.formLabelAlign.understand = res.reason 
                this.formLabelAlign.entryTime = res.entry_time//入职时间（入职时间）
                this.formLabelAlign.probation = res.probation.split(","),//(试用期时间)
                this.formLabelAlign.correctionTime = res.correction_time//（转正时间）
                this.textarea = res.understand//（岗位理解）
                this.summary = res.summary//（试用期总结）
                this.suggestions = res.suggestions//（意见建议）
                this.approvalId = res.approval//（审批人ID）
            })
            if (this.$route.query.id) {
                this.edit = true;
                this.$http.get('application/look', { token: localStorage.getItem('token'), id: this.$route.query.id }).then(res => {
                    console.log(res)
                    console.log('加载四')
                    this.formLabelAlign.name = res.name//申请人
                    this.formLabelAlign.region = res.job_number//工号
                    this.formLabelAlign.positionId = res.position_id//（职位id）
                    this.position = res.position_id
                    // this.formLabelAlign.structureId = res.structure_id//（部门id）
                    // this.department = res.structure_id
                    this.formLabelAlign.structureId = res.structure_id//（部门id）
                    this.department = res.structure_id
                    this.formLabelAlign.rankId = res.rank//职级
                    this.rank = res.rank;
                    this.formLabelAlign.entryTime = res.entry_time//入职时间（入职时间）
                    this.formLabelAlign.probation = res.probation.split(","),//(试用期时间)
                    this.formLabelAlign.correctionTime = res.correction_time//（转正时间）
                    this.formLabelAlign.reason = res.understand
                    // this.textarea = res.understand//（岗位理解）
                    this.other = res.suggestions
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