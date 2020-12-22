<template>
  <div class="overtimeDetl">
    <!-- <div class="title_btns">
      <h4>加班审批</h4>
      <el-button>未通过</el-button>
      <el-button type="primary" @click="check">审核</el-button>
    </div> -->
    <div class="between title_btns">
      <div class="between flex-items-center">
        <h4>加班审批</h4>
        <p class="font14-isbold-3">
          <el-link :underline="false" v-if="checkCenter.status == -1" type="danger">不通过</el-link>
          <el-link :underline="false" v-if="checkCenter.status == 0" type="warning">待审批</el-link>
          <el-link :underline="false" v-if="checkCenter.status == 1" type="primary">通过</el-link>
        </p>
      </div>
      <!-- <div v-if="checkCenter.status == 0&&icancheck">
        <el-button type="primary" @click="checkDia = true" v-if="checkCenter.status == 0&&icancheck">审核</el-button>
      </div> -->
    </div>

    <!-- 审批弹框 -->
    <check-center @close="close" :checkDia='checkDia' :baseUrl="baseUrl" :applicationId="applicationId"/>



    <el-form label-width="120px" class="form_width">
      <div class="line_title font14-bold-3">基础信息</div>
      <el-form-item label="申请人:">
        <!-- <el-input v-model="req_man"></el-input> -->
        {{ checkCenter.user_id }}
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-input v-model="depart"></el-input> -->
        {{ checkCenter.structure }}
      </el-form-item>
      <el-form-item label="加班原由:">
        <!-- <el-input v-model="thing" type="textarea"></el-input> -->
        {{ checkCenter.reason }}
      </el-form-item>
      <el-form-item label="开始时间:">
        <!-- <el-date-picker v-model="begin_time" class="el_date"></el-date-picker> -->
        {{ checkCenter.begin_time }}
      </el-form-item>
      <el-form-item label="结束时间:">
        <!-- <el-date-picker v-model="end_time" class="el_date"></el-date-picker> -->
        {{ checkCenter.end_time }}
      </el-form-item>
      <el-form-item label="加班天数:">
        <!-- <el-input v-model="days"></el-input> -->
        {{ checkCenter.day }}
      </el-form-item>
      <el-form-item label="申请时间:">
        <!-- <el-date-picker v-model="req_time" class="el_date"></el-date-picker> -->
        {{ checkCenter.create_time }}
      </el-form-item>

      <!-- 审批信息 -->
      <div v-if="checkCenter.approval_log">
        <div class="line_title  font14-bold-3">审批信息</div>
        <el-form-item label="审批人:">
          <!-- <el-input v-model="check_man"></el-input> -->
          {{checkCenter.approval_log.user_id}}
        </el-form-item>
        <el-form-item label="审批意见:">
          <!-- <el-input v-model="opinion" type="textarea"></el-input> -->
          {{checkCenter.approval_log.content}}
        </el-form-item>
      </div>
    </el-form>
    <div class="btm_btns"><el-button type="primary" @click="checkDia = true" v-if="checkCenter.status == 0">审核</el-button>
      <!-- &&icancheck -->
      <el-button type="primary" :disabled="checkCenter.status != 0" @click="goEdit" v-if="myself" >编辑</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
    <!-- <el-dialog :visible.sync="checkDia" title="审核">
      <el-form label-width="120px">
        <el-form-item label="审核结果:">
          <el-select class="el_date">
            <el-option value="one" label="one"></el-option>
            <el-option value="two" label="two"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一审批人:">
          <el-radio v-model="checkRadio" label="1">
            <el-input></el-input>
          </el-radio>
          <el-radio v-model="checkRadio" label="2">结束审核</el-radio>
        </el-form-item>
        <el-form-item label="意见:">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import CheckCenter from '@/components/CheckCenter.vue'
export default {
  components:{
    CheckCenter
  },
  data() {
    return {myself:false,
      checkDia: false,
      req_man: "",
      depart: "",
      thing: "",
      start_time: "",
      end_time: "",
      days: "",
      req_time: "",
      check_man: "",
      opinion: "",


      checkCenter:{},
      // 审批弹框
      checkDia:false,
      baseUrl:'approval/do',
      applicationId:0,
    };
  },
  methods: {
    detailData(){
      var id = this.$route.query.id;
      this.applicationId = parseInt(id)
      this.$http.get('approval/look',{
        // token:this.$token,
        id:id
      }).then(res=>{
        this.checkCenter = res;
        this.$nextTick(()=>{
          this.myself = this.checkCenter.user_id==JSON.parse(localStorage.getItem('login_status')).info.name?true:false
        })
      })
    },
    
    goEdit(){
      this.$router.push({path:'/checkCenter/newOvertime',query:{id:this.$route.query.id}})
    },
    close(){
      this.detailData()
      this.checkDia = false
    },
  },
  created() {
    this.icancheck = this.$http.allow('审批操作')
    this.detailData()
  }
};
</script>
<style lang="less" scoped>
.overtimeDetl {
  text-align: left;
}

h4 {
  margin-right: 10px;
}
  /deep/.el-dialog{
    width:560px;
  }
</style>
