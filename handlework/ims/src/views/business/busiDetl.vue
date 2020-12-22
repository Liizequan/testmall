<template>
  <div class="busiDetl contain">
    <div class="topBtns">
      <div>
        <span>项目名称</span>
        <span>2352463465</span>
      </div>
      <div class="right">
        <el-button type="primary" class="check" @click="openDia">审核</el-button>
        <el-button-group>
          <el-button icon="el-icon-arrow-left" @click="change('cut')"></el-button>
          <el-button icon="el-icon-arrow-right" @click="change('add')"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="line_title">基础信息</div>
    <div class="table">
      <el-row>
        <el-col :span="4">项目名称</el-col>
        <el-col :span="8">{{ detl.title}}</el-col>
        <el-col :span="4">项目类型</el-col>
        <el-col :span="8">{{ detl.type}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">客户名称</el-col>
        <el-col :span="8">{{ detl.customer }}</el-col>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">{{ detl.phone }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">合同总金额</el-col>
        <el-col :span="8">{{ detl.total }}</el-col>
        <el-col :span="4">预计开始时间</el-col>
        <el-col :span="8">{{detl.begin_time}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">项目地址</el-col>
        <el-col :span="8">{{detl.address}}</el-col>
        <el-col :span="4">项目负责人</el-col>
        <el-col :span="8">{{detl.charge}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">申请人</el-col>
        <el-col :span="8">{{detl.applicant}}</el-col>
        <el-col :span="4">部门</el-col>
        <el-col :span="8">{{detl.structure}}</el-col>
      </el-row>
    </div>
    <div class="line_title">相关附件:</div>
    <div>
      <div v-for="(item,index) in detl.file" :key="index"><i class='el-icon-folder'>{{item.name}}</i>
        <el-link :underline='false' type='primary'>下载</el-link>
      </div>
    </div>
    <!-- <div class="styleNotice">
      支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB
    </div> -->
    <!-- <div class="attach">
      附件
    </div> -->
    <div class="line_title">备注:</div>
    <el-input type="textarea" class="textarea" :rows="10" v-model="detl.remark"></el-input>
    <div class="btm_btns">
      <el-button type="primary" @click="forContract">转成合同</el-button>
      <el-button type="primary" @click="toEdit">编辑</el-button>
      <el-button @click="back">返回</el-button>
    </div>
    <el-dialog :visible.sync="checkDia" title="审核">
      <el-form label-width="120px">
        <el-form-item label="审核结果:">
          <el-select class="el_date" v-model="passSel">
            <el-option :value="10" label="同意"></el-option>
            <el-option :value="20" label="不同意"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="下一审批人:">
          <el-radio v-model="checkRadio" label="1">
            <el-input></el-input>
          </el-radio>
          <el-radio v-model="checkRadio" label="2">结束审核</el-radio>
        </el-form-item> -->
        <el-form-item label="意见:">
          <el-input type="textarea" v-model="opinion"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="checkDia=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        passSel: 10,
        opinion: '',
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
        proTypes: '',
        departs: '',
        customer: [],
        excuters: ''
      };
    },
    methods: {
      forContract() {
        this.$router.push({ path: '/contract/newContract', query: { who: 'forContract', id: this.id } })
      },
      confirm() {
        this.$http.post('project/do', {
          project_id: this.id,
          result: this.passSel,
          opinion: this.opinion
        }).then(res => {
          this.checkDia = false
          this.$message(res.msg)
        })
      },
      change(who) {
        if (who == 'add') {
          this.id++
        } else {
          this.id--
        }
        this.$http.get('project/look', { id: this.id }).then(res => {
          if (res.code == 1) {
            this.detl = res.msg
          } else {
            this.$message(res.msg)
          }
        })
      },
      toEdit() {
        this.$router.push({ path: '/makeReq/newBusi', query: { id: this.id, who: 'edit' } })
      },
      openDia() {
        this.checkDia = true;
      },
      getDetl() {
        return this.$http.get('project/getdata', { token: localStorage.getItem('token'), id: this.id })
      },
      async getMen() {//公司人员
        await this.getDetl()
        return this.$http.get('user/index', { token: localStorage.getItem('token') })
      },
      async getIdMan(id) {
        let result = await this.getMen()
        for (let i in result) {
          result[i].group = []
        }
        this.excuters = result
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (this.excuters[i].user[j].user_id == this.detl.applicant) {
              this.detl.applicant = this.excuters[i].user[j].name
            }
            if (this.excuters[i].user[j].user_id == this.detl.charge) {
              this.detl.charge = this.excuters[i].user[j].name
            }
          }
        }
      },
      async getCustomer() {//客户
        this.detl = await this.getDetl();
        return this.$http.get('marketing/group', {})
      },
      async getIdCus(id) {
        let result = await this.getCustomer()
        for (let i in result) {
          this.customer = [...this.customer, ...result[i].customer]
        }
        for (let i in this.customer) {
          if (this.customer[i].id == this.detl.customer) {
            this.detl.customer = this.customer[i].name
            break
          }
        }
      },
      async getDepart() {//部门
        await this.getDetl()
        return this.$http.get('index/structure')
      },
      async getIdDep() {
        let result = await this.getDepart()
        this.departs = await this.getDepart()
        for (let i in this.departs) {
          if (this.departs[i].id == this.detl.structure) {
            this.detl.structure = this.departs[i].label
          }
        }
      },
      async getProType() {//订单类型
        await this.getDetl()
        return this.$http.get('/Workorder/type', { token: localStorage.getItem('token') })
      },
      async getIdProType() {
        this.proTypes = await this.getProType()
        for (let i in this.proTypes) {
          if (this.proTypes[i].id == this.detl.type) {
            this.detl.type = this.proTypes[i].label
          }
        }
      }
    },
    created() {
      // this.getMen()
      // this.getDepart()
      // this.getCustomer()
      // this.getProType()
      this.id = this.$route.query.id
      // this.getDetl()
      this.getIdCus()
      this.getIdMan()
      this.getIdDep()
      this.getIdProType()
    }
  };
</script>
<style lang="less" scoped>
  .busiDetl {
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