<template>
  <div class="newDebit ">
    <h4>新建借支审批</h4>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px" class="form_width">
      <el-form-item label="申请人:">
        <el-input v-model="req_man" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-input v-model="depart"></el-input> -->
        <Department @customer="getCustomerData" />
      </el-form-item>
      <el-form-item label="借支事由:" class="redStar">
        <el-input type="textarea" :rows="10" v-model="reason" placeholder='请填写借支事由'></el-input>
      </el-form-item>
      <el-form-item label="借支金额:" class="redStar">
        <el-input v-model="cash" placeholder='请填写借支金额'></el-input>
      </el-form-item>
      <el-form-item label="打款时间:" class="redStar">
        <!-- <el-input v-model="get_time"></el-input> -->
        <el-date-picker type="datetime" v-model="get_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="el_date" placeholder='请选择'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="还款时间:" class="redStar">
        <!-- <el-input v-model="repay_time"></el-input> -->
        <el-date-picker type="datetime" v-model="repay_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="el_date" placeholder='请选择'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收款人:" class="redStar">
        <el-input v-model="get_man" maxlength="4" placeholder='请填写收款人'></el-input>
      </el-form-item>
      <el-form-item label="开户行:" class="redStar">
        <el-input v-model="bank" placeholder='请填写开户行'></el-input>
      </el-form-item>
      <el-form-item label="银行账号:" class="redStar">
        <el-input v-model="bank_num" maxlength="20" placeholder='请填写银行账号'></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <i class="el-icon-plus">上传附件</i> -->
        <div class="textarea font14-nobold-9">
          <el-button style="margin-right:20px;border:0;position:relative" class="upBtn"><i class="el-icon-plus"></i>上传附件<input
              type="file" ref="file" id="file" @change="upChan" name="file"></el-button>
          <!-- 支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB -->
        </div>
        <div class="eclosure">
          <!-- <p class="font14-isbold-3"></p> -->
          <div class="between" v-for="(item,index) in files" :key="index">
            <i class='el-icon-folder'>{{item.name}}</i>
            <el-link :underline="false" @click="deleteFile(index)" type="primary">删除 <i class="el-icon-delete"></i></el-link>
          </div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="审批人:">
        <el-input v-model="check_man"></el-input>
      </el-form-item> -->
      <!-- <Approval @approData="getApproData" :width='parseInt(250)' :placement='placement' /> -->
      <el-form-item label="审批人:" class="redStar">
        <Approval :approvalId="approvalId" @approData="getApproData" :width='parseInt(250)' :placement='placement' />
      </el-form-item>
      <el-form-item label="抄送:" class="">
        <Approval :approvalId="approvalId" @approData="getApproDatacao" :width='parseInt(250)' :placement='placement' />
      </el-form-item>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="Approval">提交</el-button>
      <el-button type="primary" @click="tempSave">暂存</el-button> 
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>

  import Department from "@/components/table/Departmentnoall.vue";
  import Approval from "@/components/staff/radio.vue";
  export default {
    components: {
      Department,
      Approval,
    },
    data() {
      return {
        req_man: "",
        depart: "",
        reason: "",
        cash: "",
        get_time: "",
        repay_time: "",
        get_man: "",
        bank: "",
        bank_num: "",
        check_man: "",//审批人
        placement: 'top',//弹框显示的位置
        approvalId: null,//审批人
        approval:'',
        approvalcao:'',

        educas: [],
        value: '',
        files: [],
        file_ids: [],
        ids_str: '',
        posis: []
      };
    },
    methods: {
      // 获取部门
      getCustomerData(val) {
        // console.log(val)
        this.depart = val
      },
      // 获取审批人
      getApproData(data) {
        this.approval = data
      },
      getApproDatacao(data) {
        this.approvalcao = data
      },
      upChan() {
        this.$http.upload(this.$refs.file.files[0]).then(res => {
          if (res.data.code == 1) {
            this.$message('上传成功')
            // this.files.push({ name: this.$refs.file.files[0].name, msg: res.data.msg })
            // this.file_ids.push(res.data.msg.id)
            // console.log(res.data.msg.id, 'iiiiiiiiiiiii')
            // for (let i in this.file_ids) {
            //   if (i == this.file_ids.length - 1) {
            //     this.ids_str += this.file_ids[i]
            //   } else {
            //     this.ids_str += this.file_ids[i] + ','
            //   }
            // }
            // console.log(this.files)
            // console.log(this.file_ids)
            // console.log(res)
            // console.log(res.data.msg)
            var files = {name:this.$refs.file.files[0].name,msg:res.data.msg}
            this.file_ids.push(res.data.msg.id)
            this.files.push(files)
            // console.log(this.files)
            // console.log(this.file_ids)
          }
        })
      },

      // 删除附件
      deleteFile(val){
        this.files.splice(val,1)
        this.file_ids.splice(val,1)
      },
      tempSave(){
        this.$http.post('approval/add', {
            token: localStorage.getItem('token'),
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
            reason: this.reason,
            budget: this.cash,
            begin_time: this.get_time,
            end_time: this.repay_time,
            customer: this.get_man,
            vehicle: this.bank,
            remarks: this.bank_num,
            approval: this.approval.user_id ? this.approval.user_id : this.approval,
            cope: this.approvalcao.user_id ? this.approvalcao.user_id : this.approvalcao,
            file: this.file_ids.join(','),
            type: 6,
            is_storage:1
          }).then(res => {
            this.$message(res.msg)
          })
      },
      // ,  vehicle （开户行）， remarks （银行账号），day(天数),  approval （审批人）,  type （6借支审批）
      Approval() {
        // console.log(this.file_ids)
        // console.log(this.approval)
        if (!this.reason) {
          this.$message('请填写借支事由')
        } else if (!this.cash) {
          this.$message('请填写金额')
        } else if(!this.$re.onlyNum(this.cash)){
          this.$message('金额只能是数字')
        }else if (!this.get_time) {
          this.$message('请选择打款时间')
        } else if (!this.repay_time) {
          this.$message('请选择还款时间')
        } else if (!this.get_man) {
          this.$message('请填写收款人')
        } else if(!this.$re.onlyCc(this.get_man)){
          this.$message('收款人只能是中文')
        }else if (!this.bank) {
          this.$message('请填写开户行')
        }  else if(!this.$re.onlyCc(this.bank)){
          this.$message('开户行只能是中文')
        }else if (!this.bank_num) {
          this.$message('请填写银行账号')
        }else if(!this.$re.onlyNum(this.bank_num)){
          this.$message('银行账号只能有数字')
        } else if (!this.approval) {
          this.$message('请选择审批人')
        } 
        // else if (!this.approvalcao) {
        //   this.$message('请选择抄送')
        // } 
        else {

          var url  = '',data = {
            token: localStorage.getItem('token'),
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
            reason: this.reason,
            budget: this.cash,
            begin_time: this.get_time,
            end_time: this.repay_time,
            customer: this.get_man,
            vehicle: this.bank,
            remarks: this.bank_num,
            approval: this.approval.user_id ? this.approval.user_id : this.approval,
            copy: this.approvalcao.user_id ? this.approvalcao.user_id : this.approvalcao,
            file: this.file_ids.join(','),
            type: 6,
            is_storage:0
          }
          
          if(this.$route.query.id){
            url = 'approval/edit'
            data = Object.assign({id:this.$route.query.id},data)
          }else{
            url = 'approval/add'
          }

          this.$http.post(url, data).then(res => {
            // console.log(res)
            if (res.code == 1) {
              this.back()
              this.$message({
                message: res.msg,
                type: 'success'
              });
            } else {
              this.$message({
                message: '提交失败，请检查数据是否有误',
                type: 'warning'
              });
            }
          }).catch(res => {
            this.$message.error('请求失败');
          })
        }
      },
      

      // 编辑需要的数据
      detailData(id){
        this.applicationId = parseInt(id)
        this.$http.get('approval/look',{
          // token:this.$token,
          id:id
        }).then(res=>{
          this.reason = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
          this.get_time = res.begin_time
          this.repay_time = res.end_time
          this.trans = res.vehicle
          this.other = res.remarks
          this.cash = res.budget
          this.bank = res.vehicle
          this.bank_num = res.remarks
          this.get_man = res.customer
          this.newAppUser = res.customer
          this.files = res.file
          // this.file_ids
          var files = res.file
          var array = []
          for(var i of files){
            array.push(i.id)
          }
          // console.log(array )
          this.file_ids = array

          // console.log(res.customer)
          // var customer = res.customer
          // var array = [];
          // for(var i of customer){
          //   array.push(i.id)
          // }
          // this.customer = array//审批人id

        })
      },
    },
    created() {
      if(this.$route.query.id){
        this.detailData(this.$route.query.id)
      }
      this.req_man = JSON.parse(localStorage.getItem('login_status')).info.name
      this.$http.get('approval/check',{type:6}).then(res=>{
        if(res.code == 1){
          res = res.msg
          this.reason = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
          this.get_time = res.begin_time
          this.repay_time = res.end_time
          this.trans = res.vehicle
          this.other = res.remarks
          this.cash = res.budget
          this.bank = res.vehicle
          this.bank_num = res.remarks
          this.get_man = res.customer
          this.newAppUser = res.customer
          this.files = res.file
          var files = res.file
          var array = []
          for(var i of files){
            array.push(i.id)
          }
          this.file_ids = array
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  .newDebit {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .category {
    margin-left: 15px;
  }

  .rightIcon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .leftIcon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .el-row {
    border-right: 1px solid #ccc;
  }

  .tableCon {
    border: 1px solid #ccc;
    padding: 20px;
  }

  .table {
    text-align: center;
  }

  .table .el-row:nth-last-of-type(1) {
    border-bottom: 1px solid #ccc;
  }

  .el-col {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
  }

  .el-row .el-col:nth-of-type(2),
  .el-row .el-col:nth-of-type(4) {
    background: #fff;
  }

  .eclosure div{
    height: 34px;
    line-height: 34px;
  }
  .between{
    display: flex;
    align-items: center;
    color:#409EFF;
  }
</style>