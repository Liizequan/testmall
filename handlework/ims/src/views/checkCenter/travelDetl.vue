<template>
  <div class="travelDetl ">
    <!-- <div class="title_btns">
      <h4>外勤审批</h4>
      <el-button>未通过</el-button>
      <el-button type="primary">审核</el-button>
    </div> -->

    <div class="between title_btns">
      <div class="between flex-items-center">
        <h4>外勤审批</h4>
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
      <el-form-item label="外勤事由:">
        <!-- <el-input v-model="thing"></el-input> -->
         {{ checkCenter.reason }}
      </el-form-item>
      <el-form-item label="开始时间:">
        <!-- <el-input v-model="start_time"></el-input> -->
         {{ checkCenter.begin_time }}
      </el-form-item>
      <el-form-item label="结束时间:">
        <!-- <el-input v-model="end_time"></el-input> -->
         {{ checkCenter.end_time }}
      </el-form-item>
      <el-form-item label="总天数:">
        <!-- <el-input v-model="days"></el-input> -->
         {{ checkCenter.day }}
      </el-form-item>
      <el-form-item label="申请时间:">
        <!-- <el-input v-model="req_time"></el-input> -->
         {{ checkCenter.create_time }}
      </el-form-item>
      <div class="related">
        <h4 class="line_title font14-bold-3">关联客户</h4>
        <div style="">
          <div class="between" v-for="(item,index) in checkCenter.customer" :key="index">
            <el-link :underline="false" class="category">{{item.group }} <span>-</span> {{ item.name }}</el-link>
            <el-link :underline="false"></el-link>
            <i class="el-icon-link"></i>
          </div>
        </div>
      </div>
      <!-- <el-form-item>
        <i class="el-icon-link leftIcon"></i>
        <el-link class="category">客户分类</el-link><span>-</span>
        <el-link>客户名称</el-link><i class="el-icon-link rightIcon"></i>
      </el-form-item> -->

      <!-- <div class="line_title">审批信息</div>
      <el-form-item label="审批人:">
        <el-input v-model="check_man"></el-input>
      </el-form-item>
      <el-form-item label="审批意见:">
        <el-input v-model="opinion"></el-input>
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
    <div class="btm_btns"><el-button type="primary" @click="checkDia = true" v-if="checkCenter.status == 0">审核</el-button>
      <!-- &&icancheck -->
      <el-button type="primary" :disabled="checkCenter.status != 0" @click="goEdit"  v-if="myself">编辑</el-button>
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
      this.$router.push({path:'/checkCenter/newTravel',query:{id:this.$route.query.id}})
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
.travelDetl {
  text-align: left;
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

.related{
    margin:10px 0 40px;
}

.category {
  margin-left: 10px;
}
</style>
