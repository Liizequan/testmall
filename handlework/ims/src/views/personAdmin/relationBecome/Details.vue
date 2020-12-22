<template>
  <div class="become-detailt">
    <div class="topBtns">
      <div class="left between">
        <span class="font18-bold-3">转正申请</span>
        <p>
          <el-link disabled style="color:#fff;">{{td.status}}</el-link>
        </p>
      </div>
      <div class="right">
        <el-button type="primary" class="check" @click="openDia" v-if="checkpower">审核</el-button>
        <el-button @click="deleteDel(id)">删除</el-button>
        <el-button @click="back()">返回</el-button>
      </div>
    </div>
    <div class="line_title font14-bold-3">基础信息</div>
    <div class="table">
      <ul>
        <li class="basics-info">
          <span class="font14-isbold-3">申请人:</span>
          <p class="font14-nobold-9">{{td.name}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">工号:</span>
          <p class="font14-nobold-9">{{td.job_number}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">职位:</span>
          <p class="font14-nobold-9">{{td.position_id}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">部门:</span>
          <p class="font14-nobold-9">{{td.structure_id}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">职级:</span>
          <p class="font14-nobold-9">{{td.rank}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">入职时间:</span>
          <p class="font14-nobold-9">{{td.entry_time}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">试用期:</span>
          <p class="font14-nobold-9">{{td.probation}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">转正时间:</span>
          <p class="font14-nobold-9">{{td.correction_time}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">对本岗位的理解:</span>
          <p class="font14-nobold-9">{{td.understand}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">试用期对工作的总结:</span>
          <p class="font14-nobold-9">{{td.summary}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">对公司的意见和建议:</span>
          <p class="font14-nobold-9">{{td.suggestions}}</p>
        </li>
      </ul>
    </div>
    <div class="line_title font14-bold-3">审批信息</div>
    <div class="btm_btns">
      <ul>
        <li class="basics-info">
          <span class="font14-isbold-3">审批人 :</span>
          <p class="font14-nobold-9">{{approval || '未有审批人'}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">审核意见 :</span>
          <p class="font14-nobold-9">{{opinion || '未审批意见'}}</p>
        </li>
      </ul>
      <!-- <el-button type="primary" @click="goAdd">编辑</el-button> -->
    </div>
    <to-examine :checkDia="checkDia" :applicationId="parseInt(id)" :baseUrl="baseUrl" @close='isClose'></to-examine>
  </div>
</template>
<script>
import ToExamine from "../../../components/ToExamine.vue";
  export default {
    components:{
      ToExamine
    },
    data() {
      return {
        basics: [
          { name: '申请人', text: 'learn' },
          { name: '工号', text: 'learn' },
          { name: '职位', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit sequi illum delectus deserunt consequatur itaque quia est! Tempore illum, veniam quam, quas aperiam, voluptatibus ea quasi error quae quaerat exercitationem.' },
          { name: '部门', text: 'learn' },
          { name: '职级', text: 'learn' },
          { name: '入职时间', text: 'learn' },
          { name: '试用期', text: 'learn' },
          { name: '转正时间', text: 'learn' },
          { name: '对本岗位的理解', text: 'learn' },
          { name: '试用期对工作的总结', text: 'learn' },
          { name: '对公司的意见和建议', text: 'learn' },
        ],
        checkRadio: "1",
        checkDia: false,
        id: this.$route.query.id,//当前id
        td:{},
        // 转正审核
        baseUrl:'application/do',
        approval:'',
        opinion:'',
      };
    },
    methods: {
      openDia() {
        this.checkDia = true;
      },
      isClose(data){
        this.checkDia = false
      },
      deleteDel(val){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //application/cancel
          this.$http.post('application/del',{
            // token:this.$token,
            id:val
          }).then(res=>{
            this.$message({
              type: 'success',
              message: res.msg
            });
            this.back()
          })
        })
      },
      // 前往编辑
      goAdd(){
        this.$router.push({path:'/relation/becomeadd',query:{id:this.$route.query.id}})
      }
    },
    created() {
      this.checkpower = this.$http.allow('转正/离职审批')
      this.id = this.$route.query.id
      this.$http.get('application/look', { token: localStorage.getItem('token'), id: this.id }).then(res => {
        console.log(res)
        this.approval = res.approval
        this.opinion = res.log.opinion
        this.td = res
      })
    }
  };
</script>
<style lang="less" scoped>
  .become-detailt {
    .topBtns {
      .left p {
        padding: 5px 10px;
        background-color: #E6A23C;
        color: #fff;
        border-radius: 5px;
        margin-left: 20px;
      }
    }

    .line_title {
      text-align: left;
    }

    .basics-info {
      display: flex;
      padding: 20px 0;

      span {
        display: inline-block;
        width: 140px;
        text-align: right;
      }

      p {
        flex: 1;
        text-align: left;
        padding-left: 20px;
        text-align: justify;
      }
    }

    .btm_btns p {
      color: #409EFF;
      font-weight: 500;
      font-size: 18px;
    }
  }
</style>