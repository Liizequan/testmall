<template>
  <div class="newTravel ">
    <h4>新建外勤审批</h4>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px" class="form_width">
      <el-form-item label="申请人:">
        <el-input v-model="req_man" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-select v-model="department" placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in departments" :key="index" :label="item.label || item.name" :value="item.id">
            <span>{{item.name || item.label}} </span>
          </el-option>
        </el-select> -->
        <Department @customer="getDepartmentData" />
      </el-form-item>
      <el-form-item label="外勤事由:" class="redStar">
        <el-input type="textarea" v-model="thing" :rows="8" maxlength="255" placeholder='请填写外勤事由'></el-input>
      </el-form-item>
      <!-- <el-form-item label="开始时间:" class="redStar">
        <el-date-picker type="datetime" v-model="start_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="el_date" placeholder='请填写开始时间'>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:" class="redStar">
        <el-date-picker type="datetime" v-model="end_time" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="el_date" placeholder='请填写结束时间'>
        </el-date-picker>
      </el-form-item> -->
      <!-- 时间修改start -->
      <el-form-item label="开始时间:" class="redStar">
        <el-date-picker style="width:50%;display:inline-block;" type="date" v-model="start_time" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" placeholder='请填写开始时间'>
        </el-date-picker>
        <div style="box-sizing:border-box;padding-left:10px;width:50%;display:inline-block;">
          <el-radio v-model="startradio" :label="1">一天</el-radio>
          <el-radio v-model="startradio" :label="2">半天</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="结束时间:" class="redStar">
        <el-date-picker type="date" v-model="end_time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          style="width:50%;display:inline-block;" placeholder='请填写结束时间'>
        </el-date-picker>
        <div v-if="days!=1" style="box-sizing:border-box;padding-left:10px;width:50%;display:inline-block;">
          <el-radio v-model="endradio" :label="1">一天</el-radio>
          <el-radio v-model="endradio" :label="2">半天</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="加班天数:">
        <el-input v-model="realdays" disabled placeholder='加班天数'></el-input>
      </el-form-item>
      <!-- 时间修改end-->
      <el-form-item label="总天数:">
        <el-input v-model="days" disabled placeholder='总天数'></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <i class="el-icon-link">关联客户</i>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-link leftIcon"></i>
        <el-link class="category">客户分类</el-link><span>-</span>
        <el-link>客户名称</el-link><i class="el-icon-link rightIcon"></i>
      </el-form-item> -->
      
      <el-form-item label="关联客户:" class="redStar">
        <Customer :newAppUser="newAppUser" :linkTitle="linkTitle" @iskehuId="getCustomerData" />
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
      <el-button type="primary" @click="Approval" >提交</el-button>
      <el-button type="primary" @click="tempSave" >暂存</el-button> 
      <el-button  @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import Department from "@/components/table/Departmentnoall.vue";
  import Approval from "@/components/staff/radio.vue";
  import Customer from "@/components/custom/check.vue";
  export default {
    components: {
      Department,
      Approval,
      Customer
    },
    data() {
      return {
        // 时间修改start
        realdays: 0,
        startradio: 1,
        endradio: 1,
        // 时间修改end
        req_man: "",
        // depart: "",
        thing: "",
        start_time: "",
        end_time: "",
        days: "",
        // 关联客户
        linkTitle:'添加',
        approval: "",//审批人
        approvalcao: "",//抄送
        approvalId: null,//审批人
        departments: [],//所有部门
        department: '',//部门
        customer: '',//绑定客户
        placement: 'top',//弹框显示的位置
        newAppUser:[],//客户组，编辑需要
      };
    },
    watch:{
      // 时间修改start
      startradio() {
        if (this.days == 1) {
          if (this.startradio == 1) {
            this.realdays = 1
          } else {
            this.realdays = 0.5
          }
        } else {
          let kaishi
          let jieshu
          if (this.startradio == 1) {
            kaishi = 1
          } else {
            kaishi = 0.5
          }
          if (this.endradio == 1) {
            jieshu = 1
          } else {
            jieshu = 0.5
          }
          this.realdays = this.days - 2 + kaishi + jieshu
        }
      },
      endradio() {
        let kaishi
        let jieshu
        if (this.startradio == 1) {
          kaishi = 1
        } else {
          kaishi = 0.5
        }
        if (this.endradio == 1) {
          jieshu = 1
        } else {
          jieshu = 0.5
        }
        this.realdays = this.days - 2 + kaishi + jieshu
      },
      days() {
        if (this.days == 1) {
          if (this.startradio == 1) {
            this.realdays = 1
          } else {
            this.realdays = 0.5
          }
        } else {
          let kaishi
          let jieshu
          if (this.startradio == 1) {
            kaishi = 1
          } else {
            kaishi = 0.5
          }
          if (this.endradio == 1) {
            jieshu = 1
          } else {
            jieshu = 0.5
          }
          this.realdays = this.days - 2 + kaishi + jieshu
        }
      },
      start_time() {
        if (this.end_time) {
          this.days = this.$http.getDays(this.start_time, this.end_time)
          if (this.days < 1 || this.end_time < this.start_time) {
            this.$message('时间有误')
          }
        }
      },
      end_time() {
        if (this.start_time || this.end_time < this.start_time) {
          this.days = this.$http.getDays(this.start_time, this.end_time)
          if (this.days < 1) {
            this.$message('时间有误')
          }
        }
      }
      // 时间修改end
      // start_time(){
      //   if(this.end_time){
      //     this.days =  this.$http.getDays(this.start_time,this.end_time,true)
      //     if(this.days<1||this.end_time<this.start_time){
      //       this.$message('时间有误')
      //     }
      //   }
      // },
      // end_time(){
      //   if(this.start_time||this.end_time<this.start_time){
      //     this.days =  this.$http.getDays(this.start_time,this.end_time,true)
      //     if(this.days<1){
      //       this.$message('时间有误')
      //     }
      //   }
      // }
    },
    methods: {
      // 获取部门
      getDepartmentData(val) {
        console.log(val)
        this.department = val
      },
      // 绑定客户
      getCustomerData(data) {
        console.log(JSON.parse(data))
        this.customer = JSON.parse(data)
      },
      // 审批人
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
            begin_time: this.start_time,
            end_time: this.end_time,
            day: this.days,
            approval: this.approval.user_id?this.approval.user_id:'',//审批人
            copy: this.approvalcao.user_id?this.approvalcao.user_id:'',
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,//技术部门
            customer: this.customer?this.customer.join(','):'',//客户id
            type: 4,
            is_storage:1
          }).then(res => {
            this.$message(res.msg)
          })
      },
      // 提交审批
      Approval() {
        // token, name, reason（原因），begin_time(开始时间)，end_time（结束时间）,day(天数), approval（审批人）, type（4请假审批）
        console.log(this.approval)
        if (!this.thing) {
          this.$message('请填写外勤事由')
        } else if (!this.start_time) {
          this.$message('请选择开始时间')
        } else if (!this.end_time) {
          this.$message('请选择结束时间')
        } else if (this.days<1) {
          this.$message('时间有误')
        }  else if (this.customer.length == 0) {
          this.$message('请关联客户')
        }
        else if (!this.approval) {
          this.$message('请选择审批人')
        }
        // else if (!this.approvalcao) {
        //   this.$message('请选择抄送')
        // }
        else {
          var url = '',data ={
            token: localStorage.getItem('token'),
            reason: this.thing,
            begin_time: this.start_time,
            end_time: this.end_time,
            day: this.days,
            approval: this.approval.user_id?this.approval.user_id:'',//审批人
            copy: this.approvalcao.user_id?this.approvalcao.user_id:'',
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,//技术部门
            customer: this.customer.join(','),//客户id
            type: 4,
          is_storage:0
          };
          if(this.$route.query.id){
            url = 'approval/edit'
            data = Object.assign({id:this.$route.query.id},data)
          }else{
            url = 'approval/add'
          }

          
          this.$http.post(url,data).then(res => {
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
          this.end_time = res.end_time
          this.days = res.day
          this.newAppUser = res.customer
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
      // 部门
      // var _this = this;
      // this.$http.get('index/structure').then(res=>{
      //   console.log(JSON.parse(JSON.stringify(res)))
      //   _this.departments = res
      // })
      this.$http.get('approval/check',{type:4}).then(res=>{
        if(res.code == 1){
          res = res.msg
          this.thing = res.reason
          this.approvalId = res.approval
          this.approval = res.approval;
          this.start_time = res.begin_time
          this.end_time = res.end_time
          this.days = res.day
          this.newAppUser = res.customer
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
  .newTravel {
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
</style>