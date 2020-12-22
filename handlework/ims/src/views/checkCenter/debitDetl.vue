<template>
  <div class="debitDetl">
    <!-- <div class="title_btns">
      <h4>借支审批</h4>
      <el-button>未通过</el-button>
      <el-button type="primary">审核</el-button>
    </div> -->

    <div class="between title_btns">
      <div class="between flex-items-center">
        <h4>借支审批</h4>
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
      <div class="line_title">基础信息</div>
      <el-form-item label="申请人:">
         {{ checkCenter.user_id }}
      </el-form-item>
      <el-form-item label="部门:">
        {{ checkCenter.structure }}
      </el-form-item>
      <el-form-item label="借支事由:">
        {{ checkCenter.reason }}
      </el-form-item>
      <el-form-item label="借支金额:">
        {{ checkCenter.budget }}
      </el-form-item>
      <el-form-item label="打款时间:">
        {{ checkCenter.begin_time }}
      </el-form-item>
      <el-form-item label="还款时间:">
        {{ checkCenter.end_time }}
      </el-form-item>
      <el-form-item label="收款人:">
        {{ checkCenter.customer }}
      </el-form-item>
      <el-form-item label="开户行:">
        {{ checkCenter.vehicle }}
      </el-form-item>
      <el-form-item label="银行账号:">
        {{ checkCenter.remarks}}
      </el-form-item>
      <el-form-item label="申请时间:">
        {{ checkCenter.create_time }}
      </el-form-item>
      <div class="line_title">相关附件</div>
      <div v-for="(item,index) in checkCenter.file" :key="index">
        <i class='el-icon-folder'></i>{{item.name}}({{item.size}})<el-link type="primary" :href="$baseURL+'/'+item.path" :underline="false">下载</el-link>
      </div>
      <!-- <div class="line_title">审批信息</div>
      <el-form-item label="审批人:">{{ check_man }}</el-form-item>
      <el-form-item label="审批意见:">{{ opinion }}</el-form-item> -->

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
      <el-button type="primary" :disabled="checkCenter.status != 0" @click="goEdit" v-if="myself">编辑</el-button>
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
      req_time: "",
      check_man: "",
      opinion: "",
      checkCenter:{},
      // 审批弹框
      checkDia:false,
      baseUrl:'approval/do',
      applicationId:0,
      files:[],
      myself:false
    };
  },
  methods: {
    
    goEdit(){
      this.$router.push({path:'/checkCenter/newDebit',query:{id:this.$route.query.id}})
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
.debitDetl {
  text-align: left;
}
h4 {
  margin-right: 10px;
}
.btm_btns{
  padding-top:20px;
}
</style>
