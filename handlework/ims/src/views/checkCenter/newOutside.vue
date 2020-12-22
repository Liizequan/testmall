<template>
  <div class="newOutside">
    <h4>新建出差审批</h4>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px" class="form_width">
      <el-form-item label="申请人:">
        <el-input v-model="req_man" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <Department @customer="" />
      </el-form-item>
      <el-form-item label="出差事由:" class="redStar">
        <el-input type="textarea" v-model="thing" :rows="8" maxlength="255" placeholder='请填写出差事由'></el-input>
      </el-form-item>
      <el-form-item label="预算（元）:" class="redStar">
        <el-input v-model="budget" maxlength="8" placeholder='请填写预算'></el-input>
      </el-form-item>
      <el-form-item label="出发地:" class="redStar">
        <el-input v-model="from" maxlength="255" placeholder='请填写出发地'></el-input>
      </el-form-item>
      <el-form-item label="目的地:" maxlength="255" class="redStar">
        <el-input v-model="to" placeholder='请填写目的地'></el-input>
      </el-form-item>
      <el-form-item label="出发时间:" class="redStar">
        <el-date-picker type="datetime" v-model="start_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="el_date" placeholder='请填写出发时间'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="返回时间:" class="redStar">
        <el-date-picker type="datetime" v-model="back_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="el_date" placeholder='请填写返回时间'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="交通工具:" class="redStar">
        <el-input v-model="trans" maxlength="10" placeholder='请填写交通工具'></el-input>
      </el-form-item>
      <el-form-item label="住宿（天）:">
        <el-input v-model="days" placeholder='请填写住宿'></el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="other" :rows="8" maxlength="255" placeholder='请填写备注'></el-input>
      </el-form-item>
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
      Approval,
      Department
    },
    data() {
      return {
        req_man: "",
        thing: "",
        budget: "",
        from: "",
        to: "",
        start_time: "",
        back_time: "",
        trans: "",
        days: "",
        other: "",
        approval: "",//审批人
        approvalcao: "",//抄送
        placement: 'top',//弹框显示的位置
        approvalId: null,//审批人
      };
    },
    methods: {
      // 审批人t
      getApproData(data) {
        this.approval = data
      },
      getApproDatacao(data) {
        this.approvalcao = data
      },
      tempSave(){
        this.$http.post('approval/add',{
            token: localStorage.getItem('token'),
            reason: this.thing,
            budget: this.budget,
            from: this.from,
            to: this.to,
            begin_time: this.start_time,
            end_time: this.back_time,
            vehicle: this.trans,
            day: this.days,
            remarks: this.other,
            approval: this.approval.user_id?this.approval.user_id:'',
            cope: this.approvalcao.user_id?this.approvalcao.user_id:'',
            type: 5,
            is_storage:1
          }).then(res => {
            this.$message(res.msg)
          })
      },
      Approval() {
        if (!this.thing) {
          this.$message('请填写出差事由')
        } else if (!this.budget) {
          this.$message('请填写预算')
        } else if(!this.$re.onlyNum(this.budget)){
          this.$message('预算只能为数字')
        }else if (!this.from) {
          this.$message('请填写出发地')
        } else if (!this.to) {
          this.$message('请填写目的地')
        } else if (!this.start_time) {
          this.$message('请选择出发时间')
        } else if (!this.back_time) {
          this.$message('请选择返回时间')
        } else if (!this.trans) {
          this.$message('请填写交通工具')
        } 
        // else if (!this.days) {
        //   this.$message('请填写住宿天数')
        // }
        // else if(!this.$re.onlyNum(this.days)){
        //   this.$message('住宿天数只能为数字')
        // } 
        else if (!this.approval) {
          this.$message('请选择审批人')
        } else {
          
          var url = '',data =  {
            token: localStorage.getItem('token'),
            reason: this.thing,
            budget: this.budget,
            from: this.from,
            to: this.to,
            begin_time: this.start_time,
            end_time: this.back_time,
            vehicle: this.trans,
            day: this.days,
            remarks: this.other,
            approval: this.approval.user_id?this.approval.user_id:'',
            copy: this.approvalcao.user_id?this.approvalcao.user_id:'',
            type: 5,
          is_storage:0
          };
          if(this.$route.query.id){
            url = 'approval/edit'
            data = Object.assign({id:this.$route.query.id},data)
          }else{
            url = 'approval/add'
          }
          
          this.$http.post(url,data).then(res => {
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
      detailData(id){
        this.applicationId = parseInt(id)
        this.$http.get('approval/look',{
          // token:this.$token,
          id:id
        }).then(res=>{
          this.thing = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
          this.start_time = res.begin_time
          this.back_time = res.end_time
          this.from = res.from
          this.to = res.to
          this.days = res.day
          this.trans = res.vehicle
          this.other = res.remarks
          this.budget = res.budget
          this.newAppUser = res.customer
          console.log(res.customer)
          var customer = res.customer
          var array = [];
          for(var i of customer){
            array.push(i.id)
          }
          this.customer = array//审批人id

        })
      },
    },
    created() {
      if(this.$route.query.id){
        this.detailData(this.$route.query.id)
      }
      this.req_man = JSON.parse(localStorage.getItem('login_status')).info.name
      this.$http.get('approval/check',{type:5}).then(res=>{
        if(res.code == 1){
          res = res.msg
          this.thing = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
          this.start_time = res.begin_time
          this.back_time = res.end_time
          this.from = res.from
          this.to = res.to
          this.days = res.day
          this.trans = res.vehicle
          this.other = res.remarks
          this.budget = res.budget
          this.newAppUser = res.customer
          console.log(res.customer)
          var customer = res.customer
          var array = [];
          for(var i of customer){
            array.push(i.id)
          }
          this.customer = array
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  .newOutside {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }
</style>