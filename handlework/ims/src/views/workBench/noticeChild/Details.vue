<template>
  <div class="contain">
    <div class="">
      <div class="notice-detail">
        <!-- <h3>我是公告详情</h3> -->
        <div class="top">
          <!-- <div class="btn"><el-button type="primary"  @click="openDia">审核</el-button></div> -->
          <div class="title">
            <div>
              <h3>{{details.title}}</h3>
            </div>
            <p class="font14-nobold-9">
              <span >{{details.create_time}}</span>
              <!-- <span v-for="(item,index) in details.type " :key="index">{{item}}</span> -->
              <!-- <span>{{details.status}}</span> -->
              <span v-if="details.structure.length==pubochangdu">全公司</span>
              <span v-for="(item,index) in details.structure" :key="index" v-if="item&&details.structure.length!=pubochangdu">{{item}}</span>
            </p>
          </div>
        </div>
        <div class="centent">
          {{details.content}}
        </div>
      </div>
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
                <el-input type="textarea" v-model="textarea" placeholder="请你填写审批理由（非必填）"></el-input>
            </el-form-item>
        </el-form>
        <div class="tac">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button>取消</el-button>
        </div>
    </el-dialog> -->
    <!-- <check-centere/> -->

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
      pubochangdu:0,
      details:{},//数据
      checkRadio: "1",
      textarea:'',//意见
      checkDia: false,//操作
      id: this.$route.query.id,//当前id
      baseUrl:'application/do',//公告栏审核id
    }
  },
  created() {
    this.pubochangdu = JSON.parse(localStorage.getItem('structure')).length
    //传递的参数 console.log(this.$route.params.detail_Id)
    this.$http.get('index/noctice',{
      token:localStorage.getItem('token'),
      id:this.$route.params.detail_Id,
    }).then(res=>{
      this.details = res.msg
    })
  },
  methods: {
    // 弹框
    openDia() {
      this.checkDia = true;
    },
    confirm(){
      
    },
    isClose(data){
      this.checkDia = false
    }
  },
};
</script>
<style lang="less" scoped>
  .notice-detail{
    .top{
      border-bottom: 1px solid #ddd;
      .btn{
        text-align: right;
      }
      .title p{
        padding:10px;
        span:first-child{
          margin-right: 20px;
        }
        span+span{
          margin:5px;
        }
      }
    }
    .centent{
      padding:20px;
    }
  }
  /deep/.el-dialog{
    width:560px;
  }
</style>
