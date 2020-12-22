<template>
  <div class="outsideDetl">
    <!-- <div class="title_btns">
      <h4>出差审批</h4>
      <el-button>未通过</el-button>
      <el-button type="primary" @click="check">审核</el-button>
    </div> -->

    <div class="between title_btns">
      <div class="between flex-items-center">
        <h4>出差审批</h4>
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
      <el-form-item label="出差事由:">
        <!-- <el-input v-model="thing"></el-input> -->
        {{ checkCenter.reason }}
      </el-form-item>
      <el-form-item label="预算（元）:">
        <!-- <el-input v-model="budget"></el-input> -->
        {{ checkCenter.budget }}
      </el-form-item>
      <el-form-item label="出发地:">
        <!-- <el-input v-model="from"></el-input> -->
        {{ checkCenter.from }}
      </el-form-item>
      <el-form-item label="目的地:">
        <!-- <el-input v-model="to"></el-input> -->
        {{ checkCenter.to }}
      </el-form-item>
      <el-form-item label="开始时间:">
        <!-- <el-date-picker v-model="start_time" class="el_date"></el-date-picker> -->
        {{ checkCenter.begin_time }}
      </el-form-item>
      <el-form-item label="结束时间:">
        <!-- <el-date-picker v-model="end_time" class="el_date"></el-date-picker> -->
        {{ checkCenter.end_time }}
      </el-form-item>
      <el-form-item label="交通工具:">
        <!-- <el-input v-model="trans"></el-input> -->
        {{ checkCenter.vehicle }}
      </el-form-item>
      <el-form-item label="住宿（天）:">
        <!-- <el-input v-model="accom"></el-input> -->
        {{ checkCenter.day }}
      </el-form-item>
      <el-form-item label="备注:">
        <!-- <el-input type="textarea" :rows="8" v-model="other"></el-input> -->
        {{ checkCenter.remarks }}
      </el-form-item>
      <el-form-item label="申请时间:">
        <!-- <el-date-picker v-model="req_time" class="el_date"></el-date-picker> -->
        {{ checkCenter.create_time }}
      </el-form-item>
      
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
    <div class="btm_btns"> <el-button type="primary" @click="checkDia = true" v-if="checkCenter.status == 0">审核</el-button>
      <!-- &&icancheck -->
      <el-button type="primary" :disabled="checkCenter.status != 0" @click="goEdit" v-if="myself" >编辑</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
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
      thing: "",
      budget: "",
      from: "",
      to: "",
      start_time: "",
      end_time: "",
      trans: "",
      days: "",
      other: "",
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
    goEdit(){
      this.$router.push({path:'/checkCenter/newOutside',query:{id:this.$route.query.id}})
    },
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
.outsideDetl {
  text-align: left;
}
h4 {
  margin-right: 10px;
}
</style>
