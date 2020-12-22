<template>
  <div class="newNormal ">
    <h4>新建普通审批</h4>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px">
      <el-form-item label="申请人:">
        <el-input v-model="req_man" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-input v-model="depart"></el-input> -->
        <!-- <el-select v-model="department" placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in departments" :key="index" :label="item.name" :value="item.id">
            {{item.name}}
          </el-option>
        </el-select> -->
        <Department @customer="getCustomerData"/>
        <!-- <el-input type="text" v-model="structure" disabled></el-input> -->
      </el-form-item>
      <el-form-item label="申请事由:" class="redStar">
        <el-input type="textarea" v-model="reason" maxlength="255" placeholder='请填写申请事由'></el-input>
      </el-form-item>
      <!-- <el-form-item label="审批人:">
        <el-link :underline="false" style="border:1px solid #DCDFE6; display:block; border-radius:4px;padding-left:10px;" type="primary">
          <i class="el-icon-plus"></i> 审批人
        </el-link>
      </el-form-item> -->
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
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import Department from "@/components/table/Departmentnoall.vue";
  import Approval from "@/components/staff/radio.vue";
  export default {
    components: {
      Department,
      Approval
    },
    data() {
      return {
        structure:'',
        req_man: "",//申请人
        // departments: [],//所有部门
        department: '',//部门
        placement: 'right',//弹框显示的位置
        reason: "",//申请事由
        approval: '',//审批人
        approvalcao: '',//抄送人
        approvalId: null,//审批人
      };
    },
    methods: {
      //部门
      getCustomerData(val) {
        console.log(val)
        this.department = val//
      },
      approvalFunc() {
        console.log('关闭')
      },
      getApproData(data) {
        this.approval = data
      },
      getApproDatacao(data) {
        this.approvalcao = data
      },
      detailData(id){
        this.applicationId = parseInt(id)
        this.$http.get('approval/look',{
          // token:this.$token,
          id:id
        }).then(res=>{
          console.log(res)
          this.reason = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
        })
      },
      tempSave(){
        this.$http.post('approval/add', {
          structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
          reason: this.reason,
          approval: this.approval.user_id || this.approval,
          copy: this.approvalcao.user_id || this.approvalcao,
          type: 1,
          is_storage:1
        }).then(res => {
          this.$message(res.msg)
        })
      },
      Approval() {
        // if (!this.department) {
        //   this.$message('请填写部门')
        // } else 
        if (!this.reason) {
          return this.$message('请填写事由')
        }
        if (!this.approval) {
          return  this.$message('请选择审批人')
        }
        // if (!this.approvalcao) {
        //   return  this.$message('请选择抄送')
        // }
        var approval = this.approval;
        var approvalcao = this.approvalcao;
        var url = '',
        data = {
          // token: this.$token,
          structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
          reason: this.reason,
          approval: approval.user_id || approval,
          copy: approvalcao.user_id || approvalcao,
          type: 1,
          is_storage:0
        };
        if(this.$route.query.id){
          url = 'approval/edit'
          data = Object.assign({id:this.$route.query.id},data)
        }else{
          url = 'approval/add'
        }
        this.$http.post(url, data).then(res => {
          console.log(res)
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
    created() {
      if(this.$route.query.id){
        this.detailData(this.$route.query.id)
      }
      // 部门
      this.req_man = JSON.parse(localStorage.getItem('login_status')).info.name
      var _this = this;
      this.$http.get('index/structure').then(res => {
        _this.departments = res
      })
      this.$http.get('approval/check',{type:1}).then(res=>{
        if(res.code == 1){
          this.reason = res.msg.reason
          this.approvalId = res.msg.approval
          this.approval = res.msg.approval
        }
      })
    },
  };
</script>
<style lang="less" scoped>
  .newNormal {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  form {
    width: 60%;
  }
</style>