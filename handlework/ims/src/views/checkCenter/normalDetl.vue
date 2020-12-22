<template>
  <div class="normalDetl ">
    <div class="top title_btns">
      <div class="between flex-items-center">
        <h4>普通审批</h4>
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

    <div class="line_title  font14-bold-3">基础信息</div>
    <el-form label-width="120px" class="form_width">
      <el-form-item label="申请人:">
        <!-- <el-input v-model="req_man"></el-input> -->
        {{checkCenter.user_id}}
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-input v-model="depart"></el-input> -->
        {{checkCenter.structure}}
      </el-form-item>
      <el-form-item label="申请事由:">
        <!-- <el-input v-model="thing"></el-input> -->
        {{checkCenter.reason}}
      </el-form-item>
      <el-form-item label="申请时间:">
        <!-- <el-input v-model="req_time"></el-input> -->
        {{checkCenter.create_time}}
      </el-form-item>
      <div v-if="checkCenter.approval_log">
        <div class="line_title  font14-bold-3">审核信息 </div>
        <el-form-item label="审批人:">
          {{checkCenter.approval_log.user_id}}
        </el-form-item>
        <el-form-item label="审批意见:">
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

import CheckCenter from '@/components/CheckCenternowill.vue'
import checkCenterVue from './checkCenter.vue';
export default {
  components:{
    CheckCenter
  },
  data() {
    return {myself:false,
      req_man: "",
      depart: "",
      thing: "",
      req_time: "",
      check_man: "",
      opinion: "",

      // 审批
      checkCenter:{

      },
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
    close(){
      this.detailData()
      this.checkDia = false
    },
    goEdit(){
      this.$router.push({path:'/checkCenter/newNormal',query:{id:this.$route.query.id}})
    }
  },
  created() {
    this.icancheck = this.$http.allow('审批操作')
    this.detailData()
  }
};
</script>
<style lang="less" scoped>
.normalDetl {
  text-align: left;
  box-sizing: border-box;
  margin: 0 auto;
}

.top {
  justify-content: space-between;
}
</style>
