<template>
  <div class="reimbDetl">
    <!-- <div class="title_btns">
      <h4>差旅报销审批</h4>
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

    <el-form label-width="120px">
      <div class="line_title">基础信息</div>
      <el-form-item label="申请人:">
        <!-- <el-input v-model="req_man" class="formInp"></el-input> -->
         {{ checkCenter.user_id }}
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-input v-model="depart" class="formInp"></el-input> -->
        {{ checkCenter.structure }}
      </el-form-item>
      <el-form-item label="报销事由:">
        <!-- <el-input v-model="thing" class="formInp"></el-input> -->
        {{ checkCenter.reason }}
      </el-form-item>
      <el-form-item label="费用承担主体:">
        <!-- <el-input v-model="who" class="formInp"></el-input> -->
        {{ checkCenter.matter }}
      </el-form-item>
      <el-form-item label="报销方式:">
        <!-- <el-input v-model="method" class="formInp"></el-input> -->
        {{ checkCenter.budget }}
      </el-form-item>
      <el-form-item label="申请时间:">
        <!-- <el-input v-model="req_time" class="formInp"></el-input> -->
        {{ checkCenter.create_time }}
      </el-form-item>
      <div class="line_title">报销信息</div>
      <div class="table">
        <el-row class="font14-bold-3">
          <el-col>行程</el-col>
          <el-col>出发地</el-col>
          <el-col>目的地</el-col>
          <el-col>出发时间</el-col>
          <el-col>到达时间</el-col>
          <el-col>交通费用</el-col>
          <el-col>住宿费用</el-col>
          <el-col>餐饮费</el-col>
          <el-col>其他费用</el-col>
          <el-col>合计</el-col>
        </el-row>
        <el-row class="font14-nobold-3">
          <el-col> {{ checkCenter.create_time }}</el-col>
          <el-col> {{ checkCenter.from }}</el-col>
          <el-col> {{ checkCenter.to }}</el-col>
          <el-col> {{ checkCenter.begin_time }}</el-col>
          <el-col> {{ checkCenter.end_time }}</el-col>
          <el-col> {{ checkCenter.vehicle }}</el-col>
          <el-col> {{ checkCenter.remarks }}</el-col>
          <el-col> {{ checkCenter.restaurant }}</el-col>
          <el-col> {{ checkCenter.other }}</el-col>
          <el-col> {{ checkCenter.total }}</el-col>
        </el-row>
      </div>
      <!-- <div class="line_title">相关附件</div>
      <el-link type="primary">附件名称</el-link> -->
      
      <div class="line_title">相关附件</div>
      <!-- <div><el-link type="primary">{{checkCenter.file.name}}</el-link><span> ( {{checkCenter.file.size}} ) </span></div> -->
      <div v-for="(item,index) in checkCenter.file" :key="index">
        <i class='el-icon-folder'></i>{{item.name}}({{item.size}})<el-link type="primary" :href="$baseURL+'/'+item.path">下载</el-link>
      </div>

      <!-- <div class="line_title">关联客户</div>
      <el-form-item class="formInp">
        <i class="el-icon-link leftIcon"></i>
        <el-link class="category">客户分类</el-link><span>-</span>
        <el-link>客户名称</el-link><i class="el-icon-link rightIcon"></i>
      </el-form-item> -->

      
      <div class="related">
        <div class="line_title">关联客户</div>
        <div class="between flex-items-center">
          <div class="between">
            <i class="el-icon-link"></i>
            <el-link :underline="false" class="category">{{ checkCenter.customer[0].group }}</el-link><span>-</span>
            <el-link :underline="false">{{ checkCenter.customer[0].name }}</el-link>
          </div>
          <i class="el-icon-link"></i>
        </div>
      </div>

      <!-- <div class="line_title">审批信息</div>
      <el-form-item label="审批人:">
        <el-input v-model="check_man" class="formInp"></el-input>
      </el-form-item>
      <el-form-item label="审批意见:">
        <el-input v-model="opinion" class="formInp"></el-input>
      </el-form-item> -->

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
    <div class="btm_btns">
      <el-button type="primary" @click="checkDia = true" v-if="checkCenter.status == 0">审核</el-button>
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
      checkDia: false,
      req_man: "",
      depart: "",
      thing: "",
      who: "",
      method: "",
      req_time: "",
      check_man: "",
      opinion: "",
      checkCenter:{},
      // 审批弹框
      checkDia:false,
      baseUrl:'approval/do',
      applicationId:0,
      myself:false,
    };
  },
  methods: {
    // 前往编辑
    goEdit(){
      this.$router.push({path:'/checkCenter/newReimb',query:{id:this.$route.query.id}})
    },
    detailData(){
      var id = this.$route.query.id;
      this.applicationId = parseInt(id)
      this.$http.get('approval/look',{
        // token:this.$token,
        id:id
      }).then(res=>{
        console.log(res)
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
.reimbDetl {
  text-align: left;
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

.table {
  border: 1px solid #ccc;
  text-align: center;
}

.el-row {
  display: flex;
  line-height: 40px;

  .el-col {
    flex: 1;
    border-right: 1px solid #ccc;
  }

  .el-col:nth-last-of-type(1) {
    border: none;
  }
}

.el-row:nth-of-type(1) {
  border-bottom: 1px solid #ccc;
}
.formInp {
  width: 60%;
}
.btm_btns{
  margin-top:20px;
}
</style>
