<template>
  <div class="arriDetl contain">
    <div class="topBtns">
      <div class="tableTitleStyle">
        <span>客户名称+业务名称</span>
        <span>2352463465</span>
      </div>
      <div class="right">
        <el-button type="primary" class="check" @click="openDia">审核</el-button>
        <el-button-group>
          <el-button icon="el-icon-arrow-left" @click="preNext(--id)"></el-button>
          <el-button icon="el-icon-arrow-right" @click="preNext(++id)"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="line_title">基础信息</div>

    <div class="table tableStyle">
      <el-row>
        <el-col :span="4">客户名称</el-col>
        <el-col :span="8">{{ detl.customer }}</el-col>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">{{ detl.phone }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">业务名称</el-col>
        <el-col :span="8">{{ detl.business }}</el-col>
        <el-col :span="4">业务类型</el-col>
        <el-col :span="8">{{ detl.type }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">合同编号</el-col>
        <el-col :span="8">{{ detl.order_no }}</el-col>
        <el-col :span="4">关联合同</el-col>
        <el-col :span="8">{{ detl.contract}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">总金额</el-col>
        <el-col :span="8">{{ detl.total }}</el-col>
        <el-col :span="4">关联订单</el-col>
        <el-col :span="8">{{ detl.order_no }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">打款时间</el-col>
        <el-col :span="8">{{ detl.time }}</el-col>
        <el-col :span="4">到账状态</el-col>
        <el-col :span="8">{{ detl.status==1?'现金':(detl.status==2?'转账':'其他') }}</el-col>
      </el-row>
    </div>
    <div class="line_title">创建信息</div>
    <div class="table tableStyle">
      <el-row>
        <el-col :span="4">创建人</el-col>
        <el-col :span="8">{{detl.user}}</el-col>
        <el-col :span="4">创建时间</el-col>
        <el-col :span="8">{{ detl.create_time }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">审核人</el-col>
        <el-col :span="8">{{detl.approval}}</el-col>
        <el-col :span="4">审核时间</el-col>
        <el-col :span="8">{{detl.approval_time}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">备注</el-col>
        <el-col :span="8">{{ detl.remark }}</el-col>
        <el-col :span="4">最后更新时间</el-col>
        <el-col :span="8">{{ detl.update_time }}</el-col>
      </el-row>
    </div>
    <div class="btm_btns">
      <el-button type="primary" @click="toEdit">编辑</el-button>
      <el-button @click="back">返回</el-button>
    </div>
    <el-dialog :visible.sync="checkDia" title="审核">
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
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
        id: '',
        detl: '',
        proTypes:''
      };
    },
    methods: {
      toEdit() {
        this.$router.push({ path: '/arriConf/newConf', query: { id: this.id, who: 'edit' } })
      },
      openDia() {
        // this.checkDia = true;
        this.$confirm('通过审核确认到账吗？', '审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res => {
          if (res == 'confirm') {
            this.$http.post('bill/approval', {
              token: localStorage.getItem('token'),
              id: this.id,
              // approval:this.detl.approval
            }).then(res => {
              if (res) {
                this.$message(res.msg)
                if (res.code == 1) {
                  this.$router.back()
                  this.$bus.$emit('confList')
                }
              }
            })
          }
        })
      },
      preNext(id){
        this.$http.get('bill/look', { token: localStorage.getItem('token'), id: id })
        .then(res => {
          if (res.code == 0) {
            this.$message(res.msg)
          } else {
            this.detl = res.msg
          }
        })
      },
      getDetl(id) {
        return this.$http.get('bill/look', { token: localStorage.getItem('token'), id: id })
      },
      async getCustomer() {//客户
        let result = await this.getDetl(this.id);
        this.detl = result.msg
        return this.$http.get('marketing/group', {})
      },
      async getIdCus(id) {
        let result = await this.getCustomer()
        for (let i in result) {
          for (let j in result[i].customer) {
            if (result[i].customer[j].id == this.detl.customer) {
              this.detl.customer = result[i].customer[j].name
              break
            }
          }
        }
      },
      async getProType() {//订单类型
        await this.getDetl(this.id)
        return this.$http.get('/Workorder/type', { token: localStorage.getItem('token') })
      },
      async getIdProType() {
        this.proTypes = await this.getProType()
        for (let i in this.proTypes) {
          if (this.proTypes[i].id == this.detl.type) {
            this.detl.type = this.proTypes[i].label
          }
        }
      },
      async getIdCon(){
        await this.getDetl(this.id)
        let result = await this.$http.get('contract/index')
        for(let i in result){
          if(result[i].id==this.detl.contract){
            this.detl.contract = result[i].customer
          }
        }
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getIdCus()
      this.getIdProType()
      this.getIdCon()
    }
  };
</script>
<style lang="less" scoped>
  .arriDetl {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
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
  
  /deep/.el-dialog{
    width:560px;
  }
  .table .el-row div:nth-of-type(1){
    background:#E4E7ED;
  }
  .table .el-row div:nth-of-type(3){
    background:#E4E7ED;
  }
</style>