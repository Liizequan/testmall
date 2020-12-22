<template>
  <div class="become-detailt">
    <div class="topBtns">
      <div class="left between">
        <span class="font18-bold-3">离职申请</span>
        <p>
          <el-link disabled style="color:#fff;">{{td.status}}</el-link>
        </p>
      </div>
      <div class="right">
        <el-button type="primary" class="check" @click="openDia">审核</el-button>
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
          <span class="font14-isbold-3">入职时间:</span>
          <p class="font14-nobold-9">{{td.entry_time}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">最后工作日:</span>
          <p class="font14-nobold-9">{{td.correction_time}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">离职原因:</span>
          <p class="font14-nobold-9">{{td.understand}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">工作交接单:</span>
          <p class="font14-nobold-9">{{td.summary}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">备注:</span>
          <p class="font14-nobold-9">{{td.suggestions}}</p>
        </li>
      </ul>
    </div>


    <div class="line_title font14-bold-3">审批信息</div>
    <div class="btm_btns">
      <ul>
        <li class="basics-info">
          <span class="font14-isbold-3">审批人 :</span>
          <p class="font14-nobold-9">{{td.approval || '未有审批人'}}</p>
        </li>
        <li class="basics-info">
          <span class="font14-isbold-3">审批意见 :</span>
          <p class="font14-nobold-9">{{opinion || '未审批意见'}}</p>
        </li>
      </ul>
      <el-button type="primary" @click="goAdd">编辑</el-button>
      <el-button @click="back()">返回</el-button>
      <el-button @click="deleteDel(id)">放弃离职</el-button>
    </div>
    <!-- <el-dialog :visible.sync="checkDia" title="审核" width='600px'>
      <el-form label-width="100px">
        <el-form-item label="审核结果:">
          <el-select class="el_date">
            <el-option value="one" label="同意"></el-option>
            <el-option value="two" label="不同意"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一审批人:" style="text-align: left;">
          <el-radio v-model="checkRadio" label="1">
            <el-input></el-input>
          </el-radio>
          <el-radio v-model="checkRadio" label="2">结束审核</el-radio>
        </el-form-item>
        <el-form-item label="意见:">
          <el-input type="textarea" placeholder="请你填写审批理由（非必填）"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog> -->
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
          { name: '职位', text: 'learn' },
          { name: '部门', text: 'learn' },
          { name: '职级', text: 'learn' },
          { name: '入职时间', text: 'learn' },
          { name: '最后工作日', text: 'learn' },
          { name: '离职原因', text: 'learn' },
          { name: '工作交接单', text: 'learn' },
          { name: '备注', text: 'learn' },
        ],
        checkRadio: "1",
        checkDia: false,
        id: this.$route.query.id,//当前id
        td: '',
        yijian:'',//审批意见
        approval:'',//审批人
        baseUrl:'application/do',//离职审核，等待确定
        opinion:'',//审批意见
      };
    },
    methods: {
      isClose(data){
        this.checkDia = false
      },
      openDia() {
        this.checkDia = true;
      },
      deleteDel(val){
        console.log(val)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/application/cancel',{
            // token:this.$token,
            id:val
          }).then(res=>{
            console.log(res)
            this.$message({
              type: 'success',
              message: res.msg
            });
            this.back()
          })
        }).catch(() => {
             
        });
      },
      // 前往编辑
      goAdd(){
        this.$router.push({path:'/relation/quitadd',query:{id:this.$route.query.id}})
      }
    },
    created() {
      this.id = this.$route.query.id
      this.$http.get('application/look', { token: localStorage.getItem('token'), id: this.id }).then(res => {
        console.log(JSON.parse(JSON.stringify(res)))
        this.approval  = res.approval
        this.opinion = res.log.opinion
        this.td = res
      })
    },
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
  /deep/.el-dialog{
    width:560px;
  }
</style>