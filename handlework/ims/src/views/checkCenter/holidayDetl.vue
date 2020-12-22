<template>
  <div class="holidayDetl ">
    <!-- <div class="topBtns">
      <div>
        <h4>请假审批</h4>
        <el-button>未审核</el-button>
      </div>
      <el-button type="primary" @click="check">审核</el-button>
    </div> -->

    <div class="between title_btns">
      <div class="between flex-items-center">
        <h4>请假审批</h4>
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



    <el-form label-width="120px">
      <div class="line_title  font14-bold-3">基础信息</div>
      <el-form-item label="申请人:">{{ checkCenter.user_id }}</el-form-item>
      <el-form-item label="部门:">{{ checkCenter.structure }}</el-form-item>
      <el-form-item label="请假事项:">{{ checkCenter.matter }}</el-form-item>
      <el-form-item label="请假事由:">{{ checkCenter.reason }}</el-form-item>
      <el-form-item label="开始时间:">{{ checkCenter.begin_time }}</el-form-item>
      <el-form-item label="结束时间:">{{ checkCenter.end_time }}</el-form-item>
      <el-form-item label="请假天数:">{{ checkCenter.day }}</el-form-item>
      <el-form-item label="申请时间:">{{ checkCenter.create_time }}</el-form-item>
      <div v-if="checkCenter.approval_log">
        <div class="line_title  font14-bold-3">审批信息</div>
        <el-form-item label="审批人:">{{ checkCenter.approval_log.user_id }}</el-form-item>
        <el-form-item label="审批意见:">{{checkCenter.approval_log.content}} </el-form-item>
      </div>
    </el-form>
    <div class="btm_btns"><el-button type="primary" @click="checkDia = true" v-if="checkCenter.status == 0">审核</el-button>
      <!-- &&icancheck -->
      <el-button type="primary" :disabled="checkCenter.status != 0" @click="goEdit"  v-if="myself">编辑</el-button>
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
      checkRadio: "1",
      checkDia: false,
      req_man: "",
      depart: "",
      thing: "",
      reason: "",
      start_time: "",
      end_time: "",
      days: "",
      req_time: "",
      check_man: "",


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
      this.$router.push({path:'/checkCenter/newHoliday',query:{id:this.$route.query.id}})
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
.holidayDetl {
  text-align: left;
}

h4 {
  margin-right: 10px;
  display: inline;
}

/deep/.el-dialog{
    width:560px;
  }
</style>
