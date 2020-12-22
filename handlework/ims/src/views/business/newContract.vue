<template>
  <div class="newContract contain">
    <div class="topTitle">
      <h4>新增合同</h4>
      <span class="bitianstyle"><span>*</span>为必填项</span>
    </div>
    <el-form :model="form" :rules="rules" label-width="120px" class="form" :hide-required-asterisk="false">
      <div>
        <el-form-item label="客户名称:" class="half efi" prop="cusName">
          <!-- <el-select placeholder="请选择" class="select" v-model="form.cusName">
            <el-option v-for="(item,index) in customer" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select> -->
          <el-popover placement="bottom-start" trigger="click" v-model="popoVisi" @hide="confirm">
            <div>
              <h3>关联客户</h3>
              <el-input placeholder="搜索成员" v-model="searchVal" @change="searchCus"></el-input>
              <el-menu>
                <el-radio-group v-model="theRadio" class="xyk-scroll" style="height:300px; overflow:auto">
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
              <el-input placeholder="请选择客户名称" v-model="form.cusName" maxlength="4"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="对接人:" class="half efi" prop="interMan">
          <el-input placeholder="请填对接人（2~4位中文）" v-model="form.interMan" maxlength="4"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="电话:" class="half efi" prop="phone">
          <el-input placeholder="请填电话" v-model="form.phone" maxlength="11"></el-input>
        </el-form-item>
      </div>
      <div style="display: flex;">
        <el-form-item label="合同类型:" class="half efi" prop="contrType">
          <el-select placeholder="请选择" class="select" v-model="form.contrType">
            <el-option v-for="(item,index) in conTypes" :key="index" :value="item.id" :label="item.label">
            </el-option>
          </el-select>
          <!-- <el-option v-for="(item,index) in conTypes" :key="index" :value="item.value" :label="item.label"></el-option> -->
        </el-form-item>
        <!-- <el-input placeholder="其他类型" style="width:200px;margin-left:10px;" v-if="form.contrType==conTypes.length"
          v-model="otherType"></el-input> -->
      </div>
      <div>
        <el-form-item label="订单/合同编号:" class="half efi" prop="num">
          <el-input placeholder="请填订单/合同编号" v-model="form.num" maxlength="16"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="客户签约人:" class="half efi" prop="he">
          <el-input placeholder="请填写客户签约人（2~4位中文）" v-model="form.he" maxlength="4"></el-input>
          <!-- <el-popover placement="bottom-start" trigger="click" v-model="cusPopo">
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
                <span class="popoCon" @click="charConf('custom')">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="客户签约人" v-model="he"></el-input>
            </div>
          </el-popover> -->
        </el-form-item>
      </div>
      <div>
        <el-form-item label="我方签约人:" class="half efi" prop="me">
          <el-popover placement="bottom-start" trigger="click" v-model="charPopo">
            <div>
              <h3>我方签约人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-collapse style="height: 300px;overflow-y:auto;" class="xyk-scroll">
                <el-radio-group v-model="form.me">
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
                <span class="popoCon" @click="charConf('charge')">确定</span>
                <span @click="charPopo = false">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择我方签约人" v-model="me"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="审批人:" class="half efi" prop="me">
          <el-popover placement="bottom-start" trigger="click" v-model="checkPopo">
            <div>
              <h3>审批人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-collapse style="height: 300px;overflow-y:auto;" class="xyk-scroll">
                <el-radio-group v-model="form.check">
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
                <span class="popoCon" @click="charConf('check')">确定</span>
                <span @click="checkPopo = false">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择审批人" v-model="checkman"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="签约日期:" class="half efi" prop="date">
          <el-date-picker v-model="form.date" class="el_date" placeholder='请选择签约日期'></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开始时间:" class="half efi">
          <el-date-picker v-model="form.start_time" class="el_date" placeholder='请选择开始时间'></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="到期时间:" class="half efi">
          <el-date-picker v-model="form.deadline" class="el_date" placeholder='请选择到期时间'></el-date-picker>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="合同总金额:" class="half efi" prop="total">
          <el-input placeholder="请填合同总金额" v-model="form.total" maxlength="8"></el-input>
          <el-radio v-model="hasTax" :label="10">含税</el-radio>
          <el-radio v-model="hasTax" :label="20">不含税</el-radio>
        </el-form-item><span class="attach">单位：元</span class="attach">
      </div>
      <div>
        <el-form-item label="货币类型:" class="half efi">
          <!-- <el-select placeholder="请选择" class="select" v-model="form.cashType">
            <el-option value="one" label="one"></el-option>
            <el-option value="two" label="two"></el-option>
          </el-select> -->
          <el-radio v-model="form.cashType" label="1">RMB</el-radio>
          <el-radio v-model="form.cashType" label="2">
            <el-input placeholder="其他" v-model="form.otherCash"></el-input>
          </el-radio>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="支付方式:" class="half efi" prop="method">
          <el-radio label="xj" v-model="form.method">现金</el-radio>
          <el-radio label="zz" v-model="form.method">转账</el-radio>
          <el-radio label="qt" v-model="form.method">其他</el-radio>
        </el-form-item>
      </div>
      <div>
        <el-form-item label='支付状态:'>
          <el-radio v-model="form.pay" :label="1">已支付</el-radio>
          <el-radio v-model="form.pay" :label="0">未支付</el-radio>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="合同状态:" class="half efi" prop="status">
          <el-select placeholder="请选择" class="select" v-model="form.status">
            <el-option :value="item.id" :label="item.label" v-for="(item,index) in conStatus" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="相关附件:" class="efi">
          <el-button>
            <div style="position:relative;">
              <i class="el-icon-upload">
              </i> 上传附件<input type="file" name="file" id="file" ref="file"
                @change="fileChan"/> 
            </div>
            </el-button>
              <span class="attach">支持格式：.rar .zip .doc .docx .pdf
            ，单个文件不能超过10MB</span>
          <div>
            <div v-for="(item,index) in form.attachNameArr" :key="index" style="width:366px;display: flex;justify-content:space-between;align-items:center;padding-top:0;color:#409EFF;"><i class='el-icon-folder'>{{item+' '}}</i>
              <div @click="deleteFile(index)">删除<i class='el-icon-delete'></i></div @click="deleteFile(index)"></div>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="关联订单:" class="half efi">
          <!-- <el-input placeholder="请填关联订单" v-model="form.order">
            <i class="el-icon-link" slot="suffix"></i>
          </el-input> -->
          <el-select v-model="orderId" class="orderSel">
            <el-option v-for="(item,index) in selOrder" :key="index" :label="item.order_no" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="备注:" class="half efi">
          <el-input type="textarea" v-model="form.other" maxlength="255" placeholder='请填写备注（255字之内）'></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button>重置</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hasTax:10,
        detl: '',
        checkman: '',
        checkPopo: false,
        theRadio: '',
        customs: '',
        searchVal: '',
        popoVisi: false,
        memberKey: '',
        orderId: '',
        orders: [],
        me: '',
        he: '',
        charPopo: false,
        cusPopo: false,
        searchRes: [],
        otherType: '',
        customer: [],
        excuters: [],
        conTypes: [],
        form: {
          pay: 0,
          cusName: "",
          interMan: "",
          phone: "",
          contrType: "",
          num: "",
          he: "",
          me: "",
          date: "",
          start_time: "",
          deadline: "",
          total: "",
          cashType: "1",
          otherCash: '',
          method: "xj",
          status: "",
          attach: "",
          order: "",
          other: "",
          attachIdArr: [],
          attachNameArr: [],
          check: ''
        },
        rules: {
          // cusName: [{ required: true, message: "请选择客户名称" }],
          // interMan: [{ required: true, message: "请填对接人" }],
          // phone: [{ required: true, message: "请填电话" }],
          // contrType: [{ required: true, message: "请选择合同类型" }],
          // he: [{ required: true, message: "请填客户签约人" }],
          // me: [{ required: true, message: "请填我方签约人" }],
          // date: [{ required: true, message: "请选择签约日期" }],
          // total: [{ required: true, message: "请填合同总金额" }],
          // method: [{ required: true, message: "请选择支付方式" }],
          // num: [{ required: true, message: "请填写合同编号" }],
          // status: [{ required: true, message: "请选择合同状态" }]
          cusName: [{ required: true, message: " " }],
          interMan: [{ required: true, message: " " }],
          phone: [{ required: true, message: " " }],
          contrType: [{ required: true, message: " " }],
          he: [{ required: true, message: " " }],
          me: [{ required: true, message: " " }],
          date: [{ required: true, message: " " }],
          total: [{ required: true, message: " " }],
          method: [{ required: true, message: " " }],
          num: [{ required: true, message: " " }],
          status: [{ required: true, message: " " }]
        },
        id: '',
        who: '',
        memberRes: "",
        conStatus: [],
        selOrder: ''
      };
    },
    methods: {
      deleteFile(index){
        this.form.attachIdArr.splice(index,1)
        this.form.attachNameArr.splice(index,1)
      },
      getSelOrder() {
        this.$http.get('order/relation').then(res => {
          this.selOrder = res
        })
      },
      getConStatus() {
        this.$http.get('contract/statuslist').then(res => {
          this.conStatus = res
        })
      },
      getConType() {
        this.$http.get('workorder/type').then(res => {
          this.conTypes = res
        })
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
      getIdMen(id) {
        for (let i in this.customs) {
          for (let j in this.customs[i].customer) {
            if (this.customs[i].customer[j].id == id) {
              return this.customs[i].customer[j].name
            }
          }
        }
      },
      getCustoms() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.customs = res
        })
      },
      confirm() {
        this.popoVisi = false
        this.form.cusName = this.getIdMen(this.theRadio)
      },
      searchMenber() {
        this.$http.get('user/search', { token: localStorage.getItem('token'), name: this.memberKey }).then(res => {
          this.memberRes = res
        })
      },
      save() {
        let f = this.form
        if (!f.cusName) {
          this.$message('请选择客户名称')
        } else if (!f.interMan) {
          this.$message('请填写对接人')
        } else if (!this.$re.tfCc(f.interMan)) {
          this.$message('对接人由2到4位中文组成')
        } else if (!f.phone) {
          this.$message('请填写电话')
        } else if (!this.$re.isPhone(f.phone)) {
          this.$message('电话必须为11位数字')
        } else if (!f.contrType) {
          this.$message('请选择合同类型')
        } else if (!this.$re.isContract(this.form.num)) {
          this.$message('合同编号为16位')
        } else if (!f.he) {
          this.$message('请填写客户签约人')
        } else if (!this.$re.tfCc(f.he)) {
          this.$message('客户签约人由2到4位中文组成')
        } else if (!f.me) {
          this.$message('请选择我方签约人')
        } else if (!this.checkman) {
          this.$message('请选择审批人')
        } else if (!f.date) {
          this.$message('请填写签约日期')
        } else if (!f.total) {
          this.$message('请填写合同总金额')
        } else if (!this.$re.onlyNum(f.total)) {
          this.$message('合同总金额必须为数字')
        } else if (!f.method) {
          this.$message('请选择支付方式')
        } else if (!this.form.status) {
          this.$message('请选择合同状态')
        } else {
          let api
          let reqBody = {
            token: localStorage.getItem('token'),
            customer: this.theRadio,
            docking: this.form.interMan,
            phone: this.form.phone,
            type: this.form.contrType,
            order_no: this.form.num,
            customer_signer: this.form.he,
            our_signer: this.form.me,
            approval: this.form.check,
            sign_time: this.form.date,
            begin_time: this.form.start_time,
            end_time: this.form.deadline,
            total: this.form.total,
            currency: this.form.cashType == 1 ? 'RMB' : this.form.otherCash,
            payment: this.form.method,
            file: this.$http.getIdsStr(this.form.attachIdArr),
            status: this.form.status,
            order: this.orderId,
            remark: this.form.other,
            pay: this.form.pay,
            is_tax:this.hasTax
          }
          if (this.who == 'edit') {
            api = 'contract/edit'
            reqBody.id = this.id
          } else {
            api = 'contract/add'
          }
          this.$http.post(api, reqBody).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$router.back()
                this.$bus.$emit('newConBack')
              }
            }
          })

        }
      },
      getOrders() {
        this.$http.get('order/index', { token: localStorage.getItem('token') }).then(res => {
          this.orders = res.data
          if (this.who == 'edit') {
            this.editInit()
          }
        })
      },
      fileChan() {
        this.$http.upload(this.$refs.file.files[0]).then(res => {
          if (res.data.code == 0) {
            this.$message(res.data.msg)
          } else if (res.data.code == 1) {
            this.$message('上传成功')
            this.form.attachIdArr.push(res.data.msg.id)
            this.form.attachNameArr.push(this.$refs.file.files[0].name)
          }
        }).catch(err => {

        })
      },
      charConf(who) {
        this.charPopo = false
        this.cusPopo = false
        this.checkPopo = false
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (who == 'custom') {
              if (this.excuters[i].user[j].user_id == this.form.he) {
                this.he = this.excuters[i].user[j].name
              }
            } else if (who == 'charge') {
              if (this.excuters[i].user[j].user_id == this.form.me) {
                this.me = this.excuters[i].user[j].name
              }
            } else if (who == 'check') {
              if (this.excuters[i].user[j].user_id == this.form.check) {
                this.checkman = this.excuters[i].user[j].name
              }
            }

          }
        }
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          if (res) {
            this.getOrders()
          }
          for (let i in res) {
            res[i].group = []
          }
          this.excuters = res
        })
      },
      closePopo() { },
      getCustomer() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            this.customer = [...this.customer, ...res[i].customer]
          }
          if (res) {
            this.getMen()
          }
        })
      },
      editInit() {
        this.$http.get('contract/getdata', { token: localStorage.getItem('token'), id: this.id }).then(res => {
          this.form.pay = res.pay
          this.theRadio = res.customer
          this.form.cusName = this.getIdMen(this.theRadio)
          this.form.interMan = res.docking
          this.form.phone = res.phone
          this.form.contrType = res.type
          this.form.num = res.order_no
          this.form.he = res.customer_signer
          this.form.me = res.our_signer
          this.form.date = res.sign_time
          this.form.start_time = res.begin_time
          this.form.deadline = res.end_time
          this.form.total = res.total
          this.form.check = res.approval
          this.checkman = this.getIdMan(this.form.check)
          this.form.cashType = res.currency == 'RMB' ? '1' : '2'
          this.hasTax = res.is_tax
          if (res.currency != 'RMB') {
            this.form.otherCash = res.currency
          }
          this.form.method = res.payment
          this.form.status = res.status
          this.orderId = res.order
          this.form.other = res.remark
          this.form.attachIdArr = []
          this.form.attachNameArr = []
          for (let i in res.file) {
            this.form.attachIdArr.push(res.file[i].id)
            this.form.attachNameArr.push(res.file[i].name)
          }
          this.he = this.getIdMan(Number(res.customer_signer))
          this.me = this.getIdMan(Number(res.our_signer))
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
      getDetl() {
        return this.$http.get('project/getdata', { token: localStorage.getItem('token'), id: this.id })
      },
      async getMember() {//公司人员
        await this.getDetl()
        return this.$http.get('user/index', { token: localStorage.getItem('token') })
      },
      async getIdMamber() {
        let result = await this.getMember()
        for (let i in result) {
          result[i].group = []
        }
        this.excuters = result
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (this.excuters[i].user[j].user_id == this.detl.applicant) {
            }
            if (this.excuters[i].user[j].user_id == this.detl.charge) {
            }
            if (this.excuters[i].user[j].user_id == this.detl.approval) {
              this.form.check = this.detl.approval
              this.checkman = this.excuters[i].user[j].name
            }
          }
        }
      },
      async getCustomers() {//客户
        this.detl = await this.getDetl();
        return this.$http.get('marketing/group', {})
      },
      async getIdCus() {
        let result = await this.getCustomers()
        for (let i in result) {
          this.customer = [...this.customer, ...result[i].customer]
        }
        for (let i in this.customer) {
          if (this.customer[i].id == this.detl.customer) {
            this.theRadio = this.detl.customer
            this.form.cusName = this.customer[i].name
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
          }
        }
      },
      async getProType() {//订单类型
        await this.getDetl()
        this.form.phone = this.detl.phone
        this.form.other = this.detl.remark
        return this.$http.get('/Workorder/type', { token: localStorage.getItem('token') })
      },
      async getIdProType() {
        this.proTypes = await this.getProType()
        for (let i in this.proTypes) {
          if (this.proTypes[i].id == this.detl.type) {
          }
        }
      },
      newInit() {
        this.getIdCus()
        this.getIdMamber()
        this.getIdDep()
        this.getIdProType()
      }
    },
    created() {
      this.id = this.$route.query.id
      this.who = this.$route.query.who
      this.getCustomer()
      this.getCustoms()
      this.getConType()
      this.getConStatus()
      this.getSelOrder()
      if (this.who == 'forContract') {
        this.newInit()
      }
    }
  };
</script>
<style lang="less" scoped>
  .newContract {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .form {
    width: 90%;
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
    font-size: 15px;
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

  .el-radio-group {
    width: 100%;
  }

  .orderSel {
    width: 100%;
  }
</style>
<style>
  .efi .el-form-item__content::after {
    margin-bottom: 14px !important;
  }
</style>