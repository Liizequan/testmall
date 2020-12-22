<template>
  <div class="orderDetl ">
    <div class="topBtns">
      <div class="font16-bold-3">
        <span>客户名称</span>
        <span>{{detl.phone}}</span>
        <p>{{detl.title}}</p>
      </div>
      <div class="right">
        <el-button type="primary" class="check" @click="openDia">审核</el-button>
        <el-button-group>
          <el-button icon="el-icon-arrow-left" @click="getDetl(--id)"></el-button>
          <el-button icon="el-icon-arrow-right" @click="getDetl(++id)"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="line_title">基础信息</div>
    <div class="table font14-nobold-3">
      <el-row>
        <el-col :span="4">客户名称</el-col>
        <el-col :span="8">{{ detl.customer }}</el-col>
        <el-col :span="4">订单编号</el-col>
        <el-col :span="8">{{ detl.order_no }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">对接人</el-col>
        <el-col :span="8">{{ detl.docking }}</el-col>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">{{ detl.phone }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">项目类型</el-col>
        <el-col :span="8">{{ detl.type }}</el-col>
        <el-col :span="4">订单负责人</el-col>
        <el-col :span="8">{{ detl.charge }}</el-col>
      </el-row>
    </div>

    <div class="line_title">合同信息</div>
    <div class="table font14-nobold-3">
      <el-row>
        <el-col :span="4">对方签约人</el-col>
        <el-col :span="8">{{ detl.customer_signer }}</el-col>
        <el-col :span="4">我方签约人</el-col>
        <el-col :span="8">{{ detl.our_signer }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">签约日期</el-col>
        <el-col :span="8">{{ detl.sign_time }}</el-col>
        <el-col :span="4">合同总金额（￥）</el-col>
        <el-col :span="8">{{ detl.total }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">开始时间</el-col>
        <el-col :span="8">{{ detl.begin_time }}</el-col>
        <el-col :span="4">到期时间</el-col>
        <el-col :span="8">{{ detl.end_time }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">货币类型</el-col>
        <el-col :span="8">{{ detl.currency || '其他' }}</el-col>
        <el-col :span="4">支付方式</el-col>
        <el-col :span="8">{{ detl.payment }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">订单状态</el-col>
        <el-col :span="8">{{ detl.status }}</el-col>
        <el-col :span="4">关联事项</el-col>
        <el-col :span="8">{{ detl.matter }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">执行人</el-col>
        <!-- <el-col :span="8">{{ $http.getManById(men,detl.executor) }}</el-col> -->
        <el-col :span="8">{{detl.executor}}</el-col>
        <el-col :span="4">审批人</el-col>
        <el-col :span="8">{{detl.approval}}</el-col>
      </el-row>
    </div>
    <div class="line_title">相关附件</div>
    <div class="styleNotice">
      <!-- 支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB -->
    </div>
    <!-- <div class=""> -->
    <!-- <span class="font14-bold-3">附件:</span> -->
    <!-- <ul class=""> -->
    <!-- <li v-for="(item,index) in file" :key="index">
          <img :src="url + '/' + item.path" alt="">
          {{item.name}}
          {{item.size}}
        </li> -->
    <div v-for="(item,index) in isfile" :key="index">
      <i class='el-icon-folder'></i>
      <!-- <img :src="url + '/' + item.path" alt=""> -->
      {{item.name}}
      {{item.size}}
      <el-link type="primary" :underline="false" @click='download(item.path)'>
        下载
      </el-link>
    </div>
    <!-- </ul> -->
    <!-- </div> -->
    <div>
      <div class="line_title">备注</div>
      <div class="remarks">
        {{detl.remark}}
      </div>
    </div>
    <!-- <el-input
      type="textarea"
      class="textarea"
      :rows="10"
      v-model="detl.remark"
    ></el-input> -->

    <div class="btm_btns">
      <el-button type="primary" @click="toEdit">编辑</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
    <el-dialog :visible.sync="checkDia" title="审核">
      <el-form label-width="120px">
        <el-form-item label="审核结果:">
          <el-select class="el_date" v-model="checkRes">
            <el-option value="-1" label="不通过"></el-option>
            <el-option value="0" label="待审批"></el-option>
            <el-option value="1" label="通过"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="下一审批人:">
          <el-radio v-model="checkRadio" label="1">
            <el-input></el-input>
          </el-radio>
          <el-radio v-model="checkRadio" label="2">结束审核</el-radio>
        </el-form-item> -->
        <el-form-item label="意见:">
          <el-input type="textarea" v-model="checkCommand"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="toCheck">确定</el-button>
        <el-button @click="checkDia = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "orderDetl",
    data() {
      return {
        checkCommand: '',
        checkRes: '',
        checkRadio: "1",
        checkDia: false,
        cusName: "是的发送到",
        num: "34534",
        interMan: "山东福利",
        phone: "3453453",
        proType: "是非得失",
        response: "的时间浪费",
        he: "里的谁发的",
        me: "鲁大师",
        date: "2019-23-23",
        total: "3254",
        start_time: "2019-23-23",
        deadline: "2019-23-23",
        cashType: "塑料袋",
        method: "水电费",
        status: "鲁大师",
        other: "了圣诞节",
        areaText: "",
        id: '',
        detl: {},
        isfile: [
          { path: '', name: '未传相关附件', size: '' },
        ],
        url: this.$baseURL,
        men: ''
      };
    },
    methods: {
      toCheck() {
        this.$http.post('order/doapproval', { id: this.id, approval_status: this.checkRes, approval_remark: this.checkCommand }).then(res => {
          this.$message(res.msg)
          this.checkDia = false
        })
      },
      download(path) {
        this.$http.downloadFile(path)
      },
      toEdit() {
        this.$router.push({ path: '/allOrder/newOrder', query: { id: this.id, who: 'edit' } })
      },
      openDia() {
        this.checkDia = true;
      },
      getDetl(id) {
        this.$http.get('order/look', { id: id }).then(res => {
          if (res.code == 1) {
            this.detl = res.msg
            this.$nextTick(() => {
              let men
              this.$http.get('user/index').then(res => {
                men = res
                if (res) {
                  this.detl.approval = this.$http.getManById(men, this.detl.approval).user_name
                }
              })
            })
          } else {
            this.$message(res.msg)
          }
          // if(!res.file){
          this.isfile = res.msg.file
          // }
        })
      },

    },
    watch: {
    },
    created() {
      this.id = this.$route.query.id
      this.getDetl(this.id)
    }
  };
</script>
<style lang="less" scoped>
  .orderDetl {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;

    .topBtns span {
      display: inline-block;
      padding-right: 10px;
      padding-bottom: 10px;
    }

    .attach {
      padding: 10px 0;
    }

    .remarks {
      border: 1px solid #CCCCCC;
      width: calc(50% - 20px);
      height: 100px;
      padding: 10px;
      margin: 20px 0 30px;
    }
  }

  .styleNotice {
    color: #ddd;
  }

  .el-row {
    border-right: 1px solid #ccc;
  }

  .table {
    text-align: center;
  }

  .table .el-row:nth-last-of-type(1) {
    border-bottom: 1px solid #ccc;
  }

  .el-col {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
  }

  .el-row .el-col:nth-of-type(2),
  .el-row .el-col:nth-of-type(4) {
    background: #fff;
  }

  .textarea {
    width: 50%;
  }

  .check {
    margin-right: 20px;
  }

  .btm_btns {
    margin-top: 10px;
  }

  /deep/.el-dialog {
    width: 560px;
  }

  .table .el-row div:nth-of-type(1) {
    background: #E4E7ED;
  }

  .table .el-row div:nth-of-type(3) {
    background: #E4E7ED;
  }
</style>