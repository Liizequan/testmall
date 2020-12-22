<template>
  <div class="newOrder ">
    <div class="topBtns">
      <h4>{{who=='edit'?'编辑':'新增'}}订单</h4>
      <span class="bitianstyle"><span>*</span>为必填项</span>
    </div>
    <el-form :model="form" label-width="120px" class="form" :hide-required-asterisk="false">
      <el-form-item label="订单标题:" prop="title" class="newOefi redStar">
        <el-input v-model="form.title" placeholder="请填订单标题（15字之内）" maxlength="15"></el-input>
      </el-form-item>
      <div>
        <el-form-item label="客户名称:" class="half newOefi redStar" prop="cusName">
          <!-- <el-select placeholder="请选择" class="select" v-model="form.cusName">
            <el-option v-for="(item,index) in customer" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select> -->
          <el-popover placement="bottom-start" trigger="click" v-model="popoVisi" @hide="confirm">
            <div>
              <h3>关联客户</h3>
              <el-input placeholder="搜索成员" v-model="searchVal" @change="searchCus"></el-input>
              <el-menu>
                <el-radio-group v-model="theRadio" @input="radioChan" class="xyk-scroll"
                  style="height:300px; overflow:auto">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">
                        <div>
                          搜索结果
                        </div>
                      </template>
                      <div>
                        <ul style="display: flex;flex-direction:column;">
                          <li style="height:30px;line-height: 30px;" v-for="item in searchRes" :key="item.id">
                            <el-radio :label="item.id">{{item.name}}</el-radio>
                          </li>
                        </ul>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item v-for="(item,index) in customs" :key="index">
                      <template slot="title">
                        {{item.name}}
                      </template>
                      <div>
                        <ul class="">
                          <li v-for="it in item.customer" :key="it.id" style="height:30px;line-height: 30px;">
                            <el-radio :label="it.id">{{it.name}}</el-radio>
                          </li>
                        </ul>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-radio-group>
              </el-menu>
              <div class="popoBtns">
                <el-link :underline="false" @click="confirm"><span class="popoCon">确定</span></el-link>
                <el-link :underline="false" @click="closePopo"><span>取消</span></el-link>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择客户名称" v-model="form.cusName"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="对接人:" class="half newOefi redStar" prop="interMan">
          <el-input placeholder="请填对接人（2~4位中文）" v-model="form.interMan" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="电话:" class="half newOefi redStar" prop="phone">
          <el-input placeholder="请填电话" v-model="form.phone" maxlength="11"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="项目类型:" class="half newOefi redStar" prop="proType">
          <el-select placeholder="请选择" class="select" v-model="form.proType">
            <el-option v-for="(item,index) in orderTypes" :key="index" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单/合同编号:" class="half newOefi redStar" prop="num">
          <el-input placeholder="请填订单/合同编号（16位英文数字）" v-model="form.num" maxlength="16"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="客户签约人:" class="half newOefi redStar" prop="he">
          <el-input placeholder="请填客户签约人（2~4位中文）" v-model="form.he" maxlength="4"></el-input>
          <!-- <el-popover placement="bottom-start" trigger="click" v-model="hePopo">
            <div>
              <h3>客户签约人</h3>
              <el-input placeholder="搜索成员"></el-input>
              <el-menu>
                <el-radio-group v-model="form.he">
                  <el-submenu v-if="searchRes.length" index="999">
                    <template slot="title">
                      <div>
                        搜索结果
                      </div>
                    </template>
                    <el-menu-item>
                      <el-radio v-for="item in searchRes" :key="item.id" :label="item.id">{{item.name}}</el-radio>
                    </el-menu-item>

                  </el-submenu>
                  <el-submenu v-for="(item,index) in excuters" :key="index" :index="index+''">
                    <template slot="title">
                      <div>
                        {{item.label}}
                      </div>
                    </template>
                    <el-menu-item>
                      <el-radio v-for="it in item.user" :key="it.user_id" :label="it.user_id">{{it.name}}</el-radio>
                    </el-menu-item>
                  </el-submenu>
                </el-radio-group>
              </el-menu>
              <div class="popoBtns">
                <span class="popoCon" @click="charConf('he')">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请输入客户签约人" v-model="he"></el-input>
            </div>
          </el-popover> -->
        </el-form-item>
      </div>
      <div>
        <el-form-item label="我方签约人:" class="half newOefi redStar" prop="me">
          <!-- <el-input placeholder="请填我方签约人" v-model="form.me"></el-input> -->
          <el-popover placement="bottom-start" trigger="click" v-model="mePopo">
            <div>
              <h3>我方签约人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-radio-group v-model="form.me" style="height: 300px;overflow-y:auto;" class="xyk-scroll">
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      <div>
                        搜索结果
                      </div>
                    </template>
                    <div>
                      <ul style="display: flex;flex-direction: column;">
                        <li style="height:30px;" v-for="item in memberRes" :key="item.user_id">
                          <el-radio :label="item.user_id">{{item.name}}
                          </el-radio>
                        </li>
                      </ul>
                    </div>
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
                </el-collapse>
              </el-radio-group>
              <div class="popoBtns">
                <span class="popoCon" @click="charConf('me')">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择" v-model="me"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="签单日期:" class="half newOefi redStar" prop="date">
          <el-date-picker v-model="form.date" class="el_date" placeholder='请选择'></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开始时间:" class="half newOefi">
          <el-date-picker v-model="form.start_time" class="el_date" placeholder='请选择'></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="到期时间:" class="half newOefi">
          <el-date-picker v-model="form.deadline" class="el_date" placeholder='请选择'></el-date-picker>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="合同总金额:" class="half newOefi redStar" prop="total">
          <el-input placeholder="请填合同总金额" v-model="form.total" maxlength="8"></el-input>
        </el-form-item><span class="attach">单位：元</span>
      </div>
      <div>
        <el-form-item label="货币类型:" class="half newOefi">
          <div class="between flex-items-center">
            <el-radio v-model="form.cashType" label="1">RMB</el-radio>
            <el-radio class="flex1 flex-items-center" v-model="form.cashType" label="2">
              <el-input placeholder="其他" v-model="form.otherCash" @input="moneyinputing"></el-input>
            </el-radio>
          </div>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="支付方式:" class="half newOefi redStar" prop="method">
          <div style="text-align:left">
            <el-radio label="xj" v-model="form.method">现金</el-radio>
            <el-radio label="zz" v-model="form.method">转账</el-radio>
            <el-radio label="qt" v-model="form.method">其他</el-radio>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单状态:" class="half newOefi redStar" prop="status">
          <el-select placeholder="请选择" class="select" v-model="form.status">
            <el-option v-for="(item,index) in orderStatus" :key="index" :value="item.id" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="相关附件:" class="half newOefi">
          <el-input v-model="form.attach" disabled placeholder='相关附件'></el-input>
        </el-form-item>
        <div class="half">
          <el-button type="primary" style="position: relative;margin-left:10px;"><i class="el-icon-upload"></i>
            上传附件<input style="position:absolute;" type="file" name="file" id="file" @change="fileChan" ref="file" />
          </el-button>
          <span class="attach font14-nobold-9">支持格式：.rar .zip
            .doc .docx .pdf ，单个文件不能超过10MB</span>
        </div>
      </div>
      <div>
        <el-form-item label="关联事项:" class="half newOefi">
          <el-input placeholder="请填关联事项" v-model="form.link" maxlength="255">
            <i class="el-icon-link" slot="suffix"></i>
          </el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单负责人:" class="half newOefi redStar" prop="response">
          <el-popover placement="bottom-start" trigger="click" v-model="charPopo">
            <div>
              <h3>负责人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-collapse style="height: 300px;overflow-y: auto;" class="xyk-scroll">
                <el-radio-group v-model="form.response">
                  <el-collapse-item v-if="memberRes.length">
                    <template slot="title">
                      <div>
                        搜索结果
                      </div>
                    </template>
                    <ul style="display: flex;flex-direction: column;">
                      <li style="height:30px;" v-for="item in memberRes" :key="item.user_id">
                        <el-radio :label="item.user_id">{{item.name}}
                        </el-radio>
                      </li>
                    </ul>
                  </el-collapse-item>
                  <el-collapse-item v-for="(item,index) in excuters" :key="index" :index="index+''">
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
                <span class="popoCon" @click="charConf('char')">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择" v-model="response"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单执行人:" class="half newOefi redStar">
          <menRadio :excuters="excuters" @theRes="chanExcu">
            <template slot="title">
              <h3>执行人</h3>
            </template>
            <template slot="main">
              <el-input v-model="radioRes.name" placeholder='请选择'></el-input>
            </template>
          </menRadio>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="审批人:" class="half newOefi redStar">
          <!-- menRadio内容start1(共6) -->
          <menRadio :excuters="excuters" @theRes="execuRes">
            <template slot="title">
              <h3>审批人</h3>
            </template>
            <template slot="main">
              <el-input v-model="execuResVal.name" placeholder='请选择'></el-input>
            </template>
          </menRadio>
          <!-- menRadio内容end -->
        </el-form-item>
      </div>
      <div>
        <el-form-item label="备注:" class="half newOefi">
          <el-input type="textarea" v-model="form.other" maxlength="255" placeholder='请填备注（255字之内）'></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
  //menRadio内容start2
  import menRadio from '@/components/menRadiocopy.vue'
  //menRadio内容end
  export default {
    data() {
      return {
        popoVisi: false,
        theRadio: '',
        radioChan: '',
        customs: '',
        searchVal: '',
        memberKey: '',
        who: '',
        id: '',
        //menRadio内容start3
        excuters: '',
        execuResVal: '',
        //menRadio内容end
        he: '',
        me: '',
        hePopo: false,
        mePopo: false,
        searchRes: [],
        charPopo: false,
        response: '',
        form: {
          otherCash: '',
          title: "",
          cusName: "",
          interMan: "",
          proType: "",
          phone: "",
          num: "",
          he: "",
          me: "",
          date: "",
          start_time: "",
          deadline: "",
          total: "",
          cashType: '1',
          method: "xj",
          status: "",
          attach: "",
          attachId: '',
          link: "",
          response: "",
          other: ""
        },
        rules: {
          // title: [{ required: true, message: "请填订单标题" }],
          // cusName: [{ required: true, message: "请选择客户名称" }],
          // interMan: [{ required: true, message: "请填对接人" }],
          // proType: [{ required: true, message: "请选择项目类型" }],
          // he: [{ required: true, message: "请填客户签约人" }],
          // me: [{ required: true, message: "请填我方签约人" }],
          // date: [{ required: true, message: "请选择签约日期" }],
          // total: [{ required: true, message: "请填合同总金额" }],
          // method: [{ required: true, message: "请选择支付方式" }],
          // phone: [{ required: true, message: "请填电话" }],
          // response: [{ required: true, message: "请填订单负责人" }],
          // num: [{ required: true, message: "请填订单/合同编号" }],
          // status: [{ required: true, message: "请选择订单状态" }]
          // title: [{ required: true, message: " " }],
          // cusName: [{ required: true, message: " " }],
          // interMan: [{ required: true, message: " " }],
          // proType: [{ required: true, message: " " }],
          // he: [{ required: true, message: " " }],
          // me: [{ required: true, message: " " }],
          // date: [{ required: true, message: " " }],
          // total: [{ required: true, message: " " }],
          // method: [{ required: true, message: " " }],
          // phone: [{ required: true, message: " " }],
          // response: [{ required: true, message: " " }],
          // num: [{ required: true, message: " " }],
          // status: [{ required: true, message: " " }]
        },
        customer: [],
        orderTypes: '',
        orderStatus: '',
        memberRes: [],
        radioRes: ''
      };
    },
    //menRadio内容start4
    components: { menRadio },
    //menRadio内容end
    methods: {
      moneyinputing(){
        this.form.cashType = '2'
      },
      chanExcu(res) {
        this.radioRes = res
      },
      //menRadio内容start5
      execuRes(res) {
        this.execuResVal = res
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.excuters = res
          if (res) {
            if (this.$route.query.who == 'edit') {
              this.who = 'edit'
              this.editInit()
            }
          }
        })
      },
      //menRadio内容end
      getCustoms() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.customs = res
        })
      },
      getIdMen(id) {
        for (let i in this.customs) {
          for (let j in this.customs[i].customer) {
            if (this.customs[i].customer[j].id == id) {
              return this.customs[i].customer[j].name
            }
          }
        }
      },
      confirm() {
        this.popoVisi = false
        this.form.cusName = this.getIdMen(this.theRadio)
        // this.form.cusName = this.theRadio
      },
      searchCus() {
        if (this.searchVal) {
          this.$http.get('/marketing/serach', { keyword: this.searchVal }).then(res => {
            this.searchRes = res
          })
        } else {
          this.searchRes = []
        }
      },
      searchMenber() {
        this.$http.get('user/search', { token: localStorage.getItem('token'), name: this.memberKey }).then(res => {
          this.memberRes = res
        })
      },
      charConf(who) {
        this.charPopo = false
        this.mePopo = false
        this.hePopo = false
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (who == 'char') {
              if (this.excuters[i].user[j].user_id == this.form.response) {
                this.response = this.excuters[i].user[j].name
              }
            } else if (who == 'me') {
              if (this.excuters[i].user[j].user_id == this.form.me) {
                this.me = this.excuters[i].user[j].name
              }
            } else if (who == 'he') {
              if (this.excuters[i].user[j].user_id == this.form.he) {
                this.he = this.excuters[i].user[j].name
              }
            }

          }
        }
      },
      closePopo() {
        this.mePopo = false
        this.hePopo = false
        this.charPopo = false
      },

      fileChan() {
        this.$http.upload(this.$refs.file.files[0]).then(res => {
          if (res.data.code == 0) {
            this.$message(res.data.msg)
          } else if (res.data.code == 1) {
            this.$message('上传成功')
            this.form.attachId = res.data.msg.id
            this.form.attach = this.$refs.file.files[0].name
          }
        }).catch(err => {

        })
      },
      save() {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!this.form.title) {
          this.$message('请填写订单标题')
          return
        } else if (!this.theRadio) {
          this.$message('请选择客户名称')
          return
        } else if (!this.form.interMan) {
          this.$message('请填写对接人')
          return
        } else if (!this.$re.tfCc(this.form.interMan)) {
          this.$message('对接人由2到4位中文组成')
          return
        } else if (!this.form.phone || !myreg.test(this.form.phone)) {
          this.$message('请填有效手机号码')
          return
        } else if (!this.form.proType) {
          this.$message('请选择项目类型')
          return
        } else if (!this.form.num) {
          this.$message('请填写合同编号')
          return
        } else if (!this.$re.isContract(this.form.num)) {
          this.$message('合同编号有误')
          return
        } else if (!this.form.he) {
          this.$message('请填写客户签约人')
          return
        } else if (!this.$re.tfCc(this.form.he)) {
          this.$message('客户签约人由2到4位中文组成')
          return
        } else if (!this.form.me) {
          this.$message('请选择我方签约人')
          return
        } else if (!this.form.date) {
          this.$message('请签单日期')
          return
        } else if (!this.form.total) {
          this.$message('请合同总金额')
          return
        } else if (!this.$re.onlyNum(this.form.total)) {
          this.$message('合同总金额必须为数字')
          return
        } else if (!this.form.method) {
          this.$message('请支付方式')
          return
        } else if (!this.form.status) {
          this.$message('请选择订单状态')
          return
        } else if (!this.form.response) {
          this.$message('请选择订单负责人')
          return
        } else if (!this.radioRes) {
          this.$message('请选择订单执行人')
          return
        } else if (!this.execuResVal) {
          this.$message('请选择审批人')
          return
        }
        let api
        let reqBody = {
          approval: this.execuResVal.id,
          title: this.form.title,
          customer: this.theRadio,
          docking: this.form.interMan,
          phone: this.form.phone,
          type: this.form.proType,
          order_no: this.form.num,
          customer_signer: this.form.he,
          our_signer: this.form.me,
          sign_time: this.form.date,
          begin_time: this.form.start_time,
          end_time: this.form.deadline,
          total: this.form.total,
          currency: this.form.cashType == 1 ? 'RMB' : this.form.otherCash,
          payment: this.form.method,
          status: this.form.status,
          file: this.form.attachId,
          matter: this.form.link,
          charge: this.form.response,
          remark: this.form.other,
          executor: this.radioRes.id
        }
        if (this.who == 'edit') {
          api = 'order/edit'
          reqBody.id = this.id
        } else {
          api = 'order/add'
        }
        this.$http.post(api, reqBody).then(res => {
          if (res) {
            this.$message(res.msg)
            if (res.code == 1) {
              this.$router.back()
              this.$bus.$emit('newBack')
            }
          }
        })
      },
      getCustomer() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            this.customer = [...this.customer, ...res[i].customer]
          }
          if (res) {
            this.getOrderType()
          }
        })
      },
      getOrderType() {
        this.$http.get('/Workorder/type', { token: localStorage.getItem('token') }).then(res => {
          this.orderTypes = res
          if (res) {
            this.getOrderStatus()
          }
        })
      },
      getOrderStatus() {
        this.$http.get('workorder/status', { token: localStorage.getItem('token') }).then(res => {
          this.orderStatus = res
          if (res) {

            //menRadio内容start6
            this.getMen()
            //menRadio内容end
          }
        })
      },
      getIdMan(id) {
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (this.excuters[i].user[j].user_id == id) {
              return this.excuters[i].user[j].name
            }
          }
        }
      },
      editInit() {
        this.$http.get('order/getdata', { token: localStorage.getItem('token'), id: this.id }).then(res => {
          if (res.currency == 'RMB') {
            this.form.cashType = '1'
          } else {
            this.form.otherCash = res.currency
            this.form.cashType = '2'
          }
          this.theRadio = res.customer
          this.form.title = res.title
          this.form.cusName = res.customer_signer
          this.theRadio = res.customer
          this.form.interMan = res.docking
          this.form.proType = res.type
          this.form.phone = res.phone
          this.form.num = res.order_no
          this.form.he = res.customer_signer
          this.he = this.getIdMan(Number(res.customer_signer))
          this.form.me = Number(res.our_signer)
          this.me = this.getIdMan(Number(res.our_signer))
          this.form.date = res.sign_time
          this.form.start_time = res.begin_time
          this.form.deadline = res.end_time
          this.form.total = res.total
          this.form.method = res.payment
          this.form.status = res.status
          this.form.attach = res.file[0].name
          this.form.attachId = res.file[0].id
          this.form.link = res.matter
          this.form.response = res.charge
          this.response = res.charge_name
          //执行人
          this.radioRes.id  = res.executor
          this.radioRes.name =res.executor_name
          //审批人
          this.execuResVal.id = res.approval
          this.execuResVal.name = res.approval_name
          // this.response = this.getIdMan(res.charge)
          this.form.other = res.remark
        })
      }
    },
    created() {
      this.getCustomer()
      this.id = this.$route.query.id
      this.getCustoms()

    }
  };
</script>
<style lang="less" scoped>
  .newOrder {
    box-sizing: border-box;
    margin: 0 auto;
  }

  .form {
    // width: 90%;
  }

  .select {
    width: 100%;
  }

  .half {
    width: 50%;
  }

  .lineCon {
    display: flex;
  }

  .attach {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: #ccc;
  }

  .popoBtns {
    text-align: right;
  }

  .popoCon {
    color: #44bcf0;
    margin-right: 6px;
  }

  .el-menu {
    border-right: none;
  }

  .Excu {
    width: 100% !important;
  }

  .el-radio-group {
    width: 100%;
  }
</style>
<style>
  .newOefi .el-form-item__content::after {
    margin-bottom: 10px !important;
  }

  .el-popover.el-popper {
    width: 228px;
  }
</style>