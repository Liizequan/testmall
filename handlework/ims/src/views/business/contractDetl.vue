<template>
  <div class="contractDetl contain">
    <div class="topBtns">
      <div>
        <span>客户名称</span>
        <span>2352463465</span>
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
    <div class="table">
      <el-row>
        <el-col :span="4">客户名称</el-col>
        <el-col :span="8">{{ detl.customer }}</el-col>
        <el-col :span="4">合同编号</el-col>
        <el-col :span="8">{{ detl.order_no }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">对接人</el-col>
        <el-col :span="8">{{ detl.docking }}</el-col>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">{{detl.phone}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">项目类型</el-col>
        <el-col :span="8">{{ detl.type }}</el-col>
        <el-col :span="4">订单状态</el-col>
        <el-col :span="8">{{  detl.status}}</el-col>
      </el-row>
    </div>

    <div class="line_title">合同信息</div>
    <div class="table">
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
        <el-col :span="8">{{ detl.currency }}</el-col>
        <el-col :span="4">支付方式</el-col>
        <el-col :span="8">{{ detl.payment=='xj'?'现金':(detl.payment=='zz'?'转账':'其他') }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">合同总金额含税</el-col>
        <el-col :span="8">{{ detl.is_tax==10?'是':'否' }}</el-col>
        <el-col :span="4">审批人</el-col>
        <el-col :span="8">{{detl.approval}}</el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="4">订单状态</el-col>
        <el-col :span="8">{{ detl.status }}</el-col>
        <el-col :span="4">关联订单</el-col>
        <el-col :span="8">{{ detl.order.titles}}</el-col>
      </el-row> -->
    </div>
    <div class="line_title">相关附件</div>
    <div><div v-for="(item,index) in detl.file" :key="index"> <i
          class='el-icon-folder'>{{item.name}}</i>
        <el-link @click="download(item.path)">下载</el-link>
        </div> </div>
    <!-- <div class="styleNotice">
      支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB
    </div> -->
    <!-- <div class="attach">
      附件
    </div> -->
    <div style="margin-bottom:10px;">备注:</div>
    <el-input type="textarea" class="textarea" :rows="10" v-model="detl.remark"></el-input>
    <div class="btm_btns">
      <el-button type="primary" @click="toEdit">编辑</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
    <el-dialog :visible.sync="checkDia" title="审核">
      <el-form label-width="120px">
        <el-form-item label="审核结果:">
          <el-select class="el_date" v-model="check.res">
            <el-option :value="10" label="同意"></el-option>
            <el-option :value="20" label="不同意"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="下一审批人:">
          <div style="display: flex;align-items: center;">
            <el-radio v-model="check.over" :label="0" style="display: flex;align-items: center;">
              <el-popover placement="bottom-start" trigger="click" v-model="passPopo">
                <div>
                  <h3>审批人</h3>
                  <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
                  <el-collapse style="height: 300px;overflow-y:auto;" class="xyk-scroll">
                    <el-radio-group v-model="checkmanRadio">
                      <el-collapse-item>
                        <template slot="title">
                          <div>
                            搜索结果
                          </div>
                        </template>
                        <ul style="display: flex;flex-direction: column;">
                          <li style="height:30px;" v-for="item in memberRes" :key="item.user_id">
                            <el-radio :label="item.user_id">{{item.name}}</el-radio>
                          </li>
                        </ul>
                      </el-collapse-item>
                      <el-collapse-item v-for="(item,index) in excuters" :key="index">
                        <template slot="title">
                          <div>
                            {{item.label}}
                          </div>
                        </template>
                        <ul style="display: flex;flex-direction: column;">
                          <li style="height:30px;" v-for="it in item.user" :key="it.user_id">
                            <el-radio :label="it.user_id">{{it.name}}</el-radio>
                          </li>
                        </ul>
                      </el-collapse-item>
                    </el-radio-group>
                  </el-collapse>
                  <div class="popoBtns">
                    <span class="popoCon" @click="charConf()">确定</span>
                    <span @click="passPopo = false">取消</span>
                  </div>
                </div>
                <div slot="reference">
                  <el-input placeholder="审批人" v-model="checkman"></el-input>
                </div>
              </el-popover>
            </el-radio>
            <el-radio v-model="check.over" :label="1">结束审核</el-radio>
          </div>
        </el-form-item> -->
        <el-form-item label="意见:">
          <el-input type="textarea" v-model="check.opinion" maxlength="255"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="checkDia= false">取消</el-button @click="checkDia= false">
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkman: '',
        checkmanRadio: '',
        memberKey: '',
        passPopo: false,
        check: {
          res: 10,
          next: '',
          over: 1,
          opinion: ''
        },
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
        detl: '',
        memberRes: ''
      };
    },
    methods: {
      download(path){
        this.$http.downloadFile(path)
      },
      confirm() {
        this.$http.post('contract/do', {
          contract_id: this.id,
          result: this.check.res,
          opinion: this.check.opinion
        }).then(res => {
          this.checkDia = false
          this.$message(res.msg)
        })
      },
      charConf(who) {
        this.passPopo = false
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (this.excuters[i].user[j].user_id == this.checkmanRadio) {
              this.checkman = this.excuters[i].user[j].name
            }
          }
        }
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.excuters = res
        })
      },
      searchMenber() {
        this.$http.get('user/search', { token: localStorage.getItem('token'), name: this.memberKey }).then(res => {
          this.memberRes = res
        })
      },
      toEdit() {
        this.$router.push({ path: '/contract/newContract', query: { id: this.id, who: 'edit' } })
      },
      getDetl(id) {
        this.$http.get('contract/look', { token: localStorage.getItem('token'), id: id }).then(res => {
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
        })
      },
      openDia() {
        this.checkDia = true;
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getDetl(this.id)
      this.getMen()
    }
  };
</script>
<style lang="less" scoped>
  .contractDetl {
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

  .popoBtns {
    text-align: right;
  }

  .el-radio-group {
    width: 100%;
  }

  .popoCon {
    color: #44bcf0;
    margin-right: 6px;
  }
  /deep/.el-dialog{
    width:560px;
  }
</style>