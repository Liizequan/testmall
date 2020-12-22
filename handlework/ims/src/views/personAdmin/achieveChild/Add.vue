<template>
    <div class="becom-add">
        <div class="top">
            <h2 class="font18-bold-3">新建绩效考核</h2>
            <p class="font14-bold-3">基础信息</p>
        </div>
        
        <el-form :label-position="labelPosition"  ref="form" label-width="120px" :model="formLabelAlign">
            <el-form-item label="绩效考核名称 :" class="redStar">
                <el-input v-model="formLabelAlign.name" placeholder="请填绩效考核名称（15字以内）" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="考核开始时间 :" class="redStar">
                <el-date-picker
                    v-model="formLabelAlign.beginTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%;"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="考核结束时间 :" class="redStar">
                <el-date-picker
                    v-model="formLabelAlign.endTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%;"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="考核周期 :" class="redStar">
                <el-select v-model="formLabelAlign.cycle" placeholder="请选择" style="width:100%">
                    <el-option
                    v-for="item in cycles"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考核对象 :" class="redStar">
                <el-input v-model="formLabelAlign.isobject" disabled></el-input>
                <!-- <el-select v-model="formLabelAlign.isobject" placeholder="请选择" style="width:100%">
                    <el-option v-for="(item,index) in isobjects" :key="index" :label="item.label || item.name" :value="item.user_id">
                        <p>{{item.name || item.label}} </p>
                    </el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="部门 :" class="redStar">
                <!-- <el-input v-model="formLabelAlign.type"></el-input> -->
                <Department @customer="getDepartData"/>
            </el-form-item>
            <el-form-item label="考核指标明细 :" class="redStar">
                <el-table stripe
                :header-cell-style="$store.state.headStyle"
                    :data="tableData"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="date" label="指标类型" width="180">
                        <!-- <input type="text" value="index" v-model="input.input1" style="border:3px solid transparent;width:100%;text-align: center;"> -->
                        <template slot-scope="scope">
                            <input type="text" v-model="scope.row.label" style="border:3px solid transparent;width:100%;text-align: center;"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标描述" width="180">
                        <template slot-scope="scope">
                            <input type="text" v-model="scope.row.desc" style="border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="权重（%）">
                        <template slot-scope="scope">
                            <input type="text" v-model="scope.row.weight" style="border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="考核周期">
                        <template slot-scope="scope">
                            <input type="text" v-model="scope.row.cycles" style="border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="考核分值（满分100分）">
                        <template slot-scope="scope">
                            <input type="text" v-model="scope.row.score" style="border:3px solid transparent;width:100%;text-align: center;">
                        </template>
                    </el-table-column>
                </el-table>

                <div class="add-explain font14-nobold-9">
                    <el-link :underline="false" type="info" @click="addTable"><i class="el-icon-plus"></i> 新增明细</el-link>
                    <el-link :underline='false' type='info'  class='ml20' @click="subTable" v-if="tableData.length>1"><i class="el-icon-minus"></i> 减少明细</el-link>
                </div>
            </el-form-item>
            <!-- <el-form-item label="审批人 :">
                <div class="add-user font14-nobold-6">
                    <div style="border:1px solid #D7DAE2">
                    <el-popover placement="top" width="250" trigger="click" v-model="visible">
                        <div>
                        <el-input placeholder="请输入内容"></el-input>
                        <ul class="xyk-scroll" style="height:350px;overflow: overlay;">
                            <li
                            v-for="(item, index) in allUser"
                            :key="index"
                            class="flex-items-center"
                            >
                            <el-checkbox
                                style="display: flex;align-items: center;width:100%;"
                            >
                                <div class="flex-items-center" style="width:100%;">
                                <img
                                    src="../../../assets/logo.png"
                                    alt=""
                                    style="width:36px;height:36px;margin-right:10px;border-radius:50%;border:1px solid #DCDFE6"
                                />
                                <p>{{ item.name }}</p>
                                </div>
                            </el-checkbox>
                            </li>
                        </ul>
                        <div class="yes-no">
                            <el-link
                            :underline="false"
                            type="primary"
                            @click="visible = false"
                            >确定</el-link
                            >
                            <el-link :underline="false" @click="visible = false"
                            >取消</el-link
                            >
                        </div>
                        </div>
                        <el-button slot="reference" style="border:0;"
                        ><el-link><i class="el-icon-plus"></i>添加审批人</el-link></el-button
                        >
                    </el-popover>
                    </div>
                </div>
            </el-form-item> -->
            <Approval :leftText="leftText" @approData="getApproData" class="redStar"/>
            <div style="padding-top:20px;">
                <el-button type="primary" style="width:120px;" @click="onSubmit">提交审批</el-button>
                <el-button @click="back()" style="width:120px;">返回</el-button>
            </div>
        </el-form>



    </div>
</template>     
<script>
import Department from "@/components/Department.vue";
import Approval from "@/components/staff/radio.vue";
export default {
    components: {
        Department,
        Approval,
    },
    data() {
        return {
            labelPosition: 'right',
            leftText:'审批人:',
            formLabelAlign: {
                name: '',//考核名称
                beginTime:'',//开始时间
                endTime:'',//结束时间
                cycle:'',//周期
                isobject: '',//对象
                department:'',// 部门
                approvalId:'',//审批人
            },
            isobjects: [],//所有对象
            tableData: [{}],//考核指标明细
            cycles: [{
                value: '10',
                label: '周期'
                }, {
                value: '20',
                label: '月度'
                },
            ],//周期
            // value: '',
            // value1:'',
            textarea:'',
            allUser:[
                {name:'kings'}
            ],
            visible:false,//审批人
        }
    },
    methods: {
        addTable(){
            console.log('增加')
            // console.log(JSON.parse(JSON.stringify(this.tableData).push({name:'kings'})))
            // this.tableData = this.tableData.push({})
            var table = JSON.parse(JSON.stringify(this.tableData));
            console.log(table)
            var newTable = [];
            for(let i of table){
                newTable.push(i)
                if(newTable.length == table.length){
                    newTable.push({})
                }
            }
            // console.log(newTable)
            this.tableData = newTable
        },
        subTable(){
            this.tableData.splice(this.tableData.length-1,1)
        },
        // 审批
        onSubmit(){
            // console.log(this.formLabelAlign.department)
            // console.log(JSON.stringify(this.formLabelAlign))
            console.log(JSON.stringify(this.tableData))//考核指标
            console.log(this.formLabelAlign.approvalId)
            // console.log(Object.assign({},this.tableData))
            // var newObject = {}
            // for(var i of this.tableData){
            //     console.log(i)
            //     obj[i] = arr[i];
            // }
            // for(var i = 0; i < this.tableData.length; i++){
            //     newObject[i] = this.tableData[i];
            // }
            // console.log(newObject)

            // var newObject = {}
            // var label = [], cycles = [], desc = [], score = [], weight = [];
            // for(let i=0; i<this.tableData.length; i++){
            //     if(this.tableData[i].label){
            //         label.push(this.tableData[i].label)
            //     }else{
            //         label.push('')
            //     }
            //     if(this.tableData[i].cycles){
            //         cycles.push(this.tableData[i].cycles)
            //     }else{
            //         cycles.push('')
            //     }
            //     if(this.tableData[i].desc){
            //         desc.push(this.tableData[i].desc)
            //     }else{
            //         desc.push('')
            //     }
            //     if(this.tableData[i].score){
            //         score.push(this.tableData[i].score)
            //     }else{
            //         score.push('')
            //     }
            //     if(this.tableData[i].weight){
            //         weight.push(this.tableData[i].weight)
            //     }else{
            //         weight.push('')
            //     }

            // }
            // console.log(label)
            console.log(this.tableData)

            if(!this.formLabelAlign.name || !this.$re.onlyCcEn(this.formLabelAlign.name)){
                return this.$message('请输入您的绩效考核名称')
            }
            if(!this.formLabelAlign.beginTime){
                return this.$message('考核开始时间不能为空')
            }
            if(!this.formLabelAlign.endTime){
                return this.$message('考核结束时间不能为空')
            }
            if(!this.formLabelAlign.cycle){
                return this.$message('考核周期不能为空')
            }
            if(!this.formLabelAlign.isobject){
                return this.$message('考核对象不能为空')
            }
            // if(!this.formLabelAlign.department){
            //     return this.$message('部门不能为空')
            // }
            if(typeof(this.formLabelAlign.department) != 'number'){
                return this.$message('部门不能为空')
            }
            for(var i of this.tableData){
                var num = parseInt(i.weight) + 1;
                var num1 = parseInt(i.score) + 1;
                if(!i.label){
                    return this.$message('考核指标明细 -> 指标类型不能为空')
                }
                if(!i.desc){
                    return this.$message('考核指标明细 -> 指标描述不能为空')
                }
                if(!num){
                    return this.$message('考核指标明细 -> 权重必须为数字')
                }
                if(i.weight > 100){
                    return this.$message('考核指标明细 -> 权重不能大于100')
                }
                if(!i.cycles){
                    return this.$message('考核指标明细 -> 考核周期不能为空')
                }
                if(!num1){
                    return this.$message('考核指标明细 -> 考核分值必须为数字')
                }
                if(i.score > 100){
                    return this.$message('考核指标明细 -> 考核分值不能大于100')
                }
            }
            if(!this.formLabelAlign.approvalId){
                return this.$message('请选择审批人')
            }
            
            // console.log(this.formLabelAlign.isobject,'duidudidudiduidduididuiduiduidudid')
            // return
            
            this.$http.post('examine/add',{
                // token:this.$token,
                'info[name]':this.formLabelAlign.name,
                'info[begin_time]':this.formLabelAlign.beginTime,
                'info[end_time]':this.formLabelAlign.endTime,
                'info[cycle]':this.formLabelAlign.cycle,
                // 'info[user_id]':this.formLabelAlign.isobject,//考核对象
                'info[user_id]':JSON.parse(localStorage.getItem('login_status')).info.user_id,
                'info[structure]':this.formLabelAlign.department,
                'info[approval]':this.formLabelAlign.approvalId,
                'item':JSON.stringify(this.tableData),
                // 'item[label]':label,
                // 'item[cycles]':cycles,
                // 'itme[desc]':desc,
                // 'item[score]':score,
                // 'iteml[weight]':weight
            }).then(res=>{
                console.log(res)
                if(res.code===1){
                    this.$message({
                        message: '恭喜你,添加成功',
                        type: 'success',
                    });
                    this.back()
                }
            })
            /**/
        },
        go(scope,row){
            console.log(scope)
            console.log(row)
        },
        // 获取部门数据
        getDepartData(data){
            console.log(data)
            this.formLabelAlign.department = data
        },
        // 获取审批人数据
        getApproData(data){
            console.log(data)
            // console.log(data[0].user_id)
            this.formLabelAlign.approvalId = data.user_id
        }
    },
    created() {
        this.formLabelAlign.isobject=JSON.parse(localStorage.getItem('login_status')).info.name
        // user/userlist
        // 获取考核对象
        this.$http.get('user/userlist',{
            token:localStorage.getItem("token")
        }).then(res=>{
            var res = res.data
            console.log(res)
            this.isobjects = res
        })
        
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
    /deep/.el-table__body,
  /deep/.el-table__header {
    width: 100% !important;
  }
</style>