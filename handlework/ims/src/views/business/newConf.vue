<template>
  <div class="newConf contain">
    <div class="topTitle">
      <h4>新建到账确认</h4>
      <span class="bitianstyle"><span>*</span>为必填项</span>
    </div>
    <el-form :model="form" label-width="140px" class="form">
      <div>
        <el-form-item label="客户名称:" class="half efi redStar">
          <!-- <el-popover placement="bottom-start" trigger="click" v-model="popoVisi">
            <div>
              <h3>客户名称</h3>
              <el-input placeholder="搜索成员" v-model="searchVal" @change="searchCus"></el-input>
              <el-menu>
                <el-radio-group v-model="theRadio" @change="radioChan">
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
                  <el-submenu v-for="(item,index) in customs" :key="index" :index="index+''">
                    <template slot="title">
                      <div>
                        {{item.name}}
                      </div>
                    </template>
                    <el-menu-item>
                      <el-radio v-for="it in item.customer" :key="it.id" :label="it.id">{{it.name}}</el-radio>
                    </el-menu-item>
                  </el-submenu>
                </el-radio-group>
              </el-menu>
              <div class="popoBtns">
                <span class="popoCon" @click="confirm">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请填客户名称" v-model="form.cusName"></el-input>
            </div>
          </el-popover> -->
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
              <el-input placeholder="客户名称" v-model="form.cusName"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <!-- <div>
        <el-form-item label="电话:" class="half efi redStar" prop="phone">
          <el-input placeholder="请填电话" v-model="form.phone" :maxlength="11"></el-input>
        </el-form-item>
      </div> -->
      <div>
        <el-form-item label="项目负责人:" class="half efi redStar">
          <el-input placeholder="请填项目负责人" v-model="form.phone" :maxlength="4"></el-input>
        </el-form-item>
      </div>
      <!-- <div>
        <el-form-item label="合同编号:" class="half efi redStar" prop="num">
          <el-input placeholder="请填合同编号" v-model="form.num" :maxlength="15"></el-input>
        </el-form-item>
      </div> -->
      <div>
        <el-form-item label="关联合同:" class="half efi">
          <el-select v-model="form.contract" class="el_date">
            <el-option v-for="(item,index) in contacts" :key="index" :label="item.order_no" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="关联订单:" class="half efi redStar">
          <el-select v-model="form.order" class="el_date">
            <el-option v-for="(item,index) in orders" :key="index" :label="item.order_no" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="lineCon">
        <el-form-item label="订单/合同总金额:" class="half efi redStar">
          <el-input placeholder="金额最长8位数" v-model="form.cash" :maxlength="8"></el-input>
        </el-form-item><span class="remark">单位：元</span>
      </div>
      <!-- <div>
        <el-form-item label="打款时间:" class="half efi">
          <el-date-picker placeholder="请填打款时间" v-model="form.time" class="el_date"></el-date-picker>
        </el-form-item>
      </div> -->
      <div>
        <el-form-item label="回款金额:" class="half efi redStar">
          <el-input placeholder="请填回款金额" v-model="form.time" class="el_date" :maxlength="8"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="未回款金额:" class="half efi redStar">
          <el-input placeholder="请填未回款金额" v-model="form.num" class="el_date" :maxlength="8"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="业务名称:" class="half efi redStar">
          <el-input placeholder="请填业务名称（15字之内）" v-model="form.busiName" maxlength="15"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="业务类型:" class="half efi redStar">
          <el-select placeholder="请选择" v-model="form.type" class="el_date">
            <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="审核人:" class="half efi redStar">
          <!-- <el-select placeholder="请选择" v-model="form.check" class="el_date">
            <el-option v-for="(item,index) in checker" :key="index" :label="item.name" :value="item.user_id">
            </el-option>
          </el-select> -->
          <el-popover placement="bottom-start" trigger="click" v-model="chargePopo">
            <div>
              <h3>审核人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-collapse>
                <el-radio-group v-model="thecharRadio" style="height:300px; overflow:auto" class="xyk-scroll">
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
                <span class="popoCon" @click="charConfirm">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择审核人" v-model="form.check">
                <i class="el-icon-user" slot="suffix"></i>
              </el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="到账状态:" class="half efi redStar">
          <el-radio :label="10" v-model="form.status">部分回款</el-radio>
          <el-radio :label="20" v-model="form.status">全额回款</el-radio>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="回款方式:" class="half efi redStar">
          <el-radio :label="10" v-model="form.method">现金</el-radio>
          <el-radio :label="20" v-model="form.method">转账</el-radio>
          <el-radio :label="30" v-model="form.method">其他</el-radio>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="备注:" class="half efi">
          <el-input type="textarea" :rows="8" v-model="form.other" maxlength="255" placeholder='请填备注（255字之内）'></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="save">提交</el-button>
      <el-button type="primary" @click="tempSave">暂存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        chargePopo:false,
        excuters:'',
        memberKey:'',
        thecharRadio:'',
        id: '',
        who: '',
        checker: '',
        types: '',
        orders: '',
        contacts: '',
        customs: '',
        searchVal: '',
        searchRes: '',
        popoVisi: false,
        theRadio: '',
        form: {
          method:10,
          check: '',
          cusName: "",
          phone: "",
          num: "",
          contract: "",
          order: "",
          cash: "",
          time: "",
          busiName: "",
          type: "",
          status:10,
          other: ""
        },
        memberRes:[]
      };
    },
    methods: {
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
      charConfirm() {
        this.form.check = this.getMember(this.thecharRadio)
        this.chargePopo = false
      },
      confirm() {
        this.popoVisi = false
        this.form.cusName = this.getIdMen(this.theRadio)
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
      closePopo() {
        this.popoVisi = false
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
      radioChan() { },
      getCustoms() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.customs = res
          if (res) {
            this.getContacts()
          }
        })
      },
      getContacts() {
        this.$http.get('contract/index', { token: localStorage.getItem('token') }).then(res => {
          this.contacts = res
          if (res) {
            this.getOrders()
          }
        })
      },
      getOrders() {
        this.$http.get('order/index', { token: localStorage.getItem('token') }).then(res => {
          this.orders = res.data
          if (res) {
            this.getTypes()
          }
        })
      },
      getTypes() {
        this.$http.get('/Workorder/type', { token: localStorage.getItem('token') }).then(res => {
          this.types = res
          if (res) {
            this.getChecker()
          }
        })
      },
      tempSave(){
        let reqBody = {
            token: localStorage.getItem('token'),
            customer: this.theRadio,
            charge: this.form.phone,//项目负责人
            no_amount: this.form.num,//未回款
            contract: this.form.contract,
            order: this.form.order,
            total: this.form.cash,
            amount: this.form.time,//回款金额
            business: this.form.busiName,
            type: this.form.type,
            amount_type: this.form.method,//回款方式
            remark: this.form.other,
            approval: this.thecharRadio,
            status:this.form.status,//到账状态
            order_no:'',
            is_storage:1
          }
          this.$http.post('bill/add', reqBody).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$router.back()
              }
            }
          })
      },
      save() {
        let f = this.form
        if (!this.theRadio) {
          this.$message('请选择客户名称')
        } else if (!f.phone) {
          this.$message('请填写项目负责人')
        } 
        // else if(!this.$re.isPhone(f.phone)){
        //   this.$message('电话必须是11位数字')
        // }
        else if(!this.$re.tfCc(f.phone)){
          this.$message('项目负责人需为2到4位中文')
        }
        // else if (!f.num) {
        //   this.$message('请填写合同编号')
        // }
        // else if(!this.$re.isContract){
        //   this.$message('合同编号为15位')
        // }
        // else if(!this.form.contract){
        //   this.$message('请关联合同')
        // }
         else if (!f.order) {
          this.$message('请填写关联订单')
        } else if (!f.cash) {
          this.$message('请填写订单/合同总金额')
        }else if(!this.$re.onlyNum(f.cash)){
          this.$message('合同总金额只能为数字')
        }else if(!this.form.busiName){
          this.$message('请填写业务名称')
        }else if(!this.form.type){
          this.$message('请选择业务类型')
        }else if(!this.form.check){
          this.$message('请选择审核人')
        } else {
          let api
          let reqBody = {
            token: localStorage.getItem('token'),
            customer: this.theRadio,
            charge: this.form.phone,//项目负责人
            no_amount: this.form.num,//未回款
            contract: this.form.contract,
            order: this.form.order,
            total: this.form.cash,
            amount: this.form.time,//回款金额
            business: this.form.busiName,
            type: this.form.type,
            amount_type: this.form.method,//回款方式
            remark: this.form.other,
            approval: this.thecharRadio,
            status:this.form.status,//到账状态
            order_no:'',
            is_storage:0
          }
          if (this.who == 'edit') {
            api = 'bill/edit'
            reqBody.id = this.id
          } else {
            api = 'bill/add'
          }
          this.$http.post(api, reqBody).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$router.back()
                this.$bus.$emit('confList')
              }
            }
          })
        }
      },
      getChecker() {
        this.$http.get('user/index', {
          token: localStorage.getItem("token")
        }).then(res => {
          for (let i in res) {
            this.checker = [...this.checker, ...res[i].user]
          }
          if (this.who == 'edit') {
            this.editInit()
          }else{
            this.getTempSave()
          }
        })
      },
      editInit() {
        this.$http.get('bill/getdata', {id: this.id}).then(res => {
          this.theRadio = res.customer
          this.form.cusName = this.getIdMen(res.customer)
          this.form.phone = res.phone
          this.form.num = res.order_no
          this.form.contract = res.contract
          this.form.order = res.order
          this.form.cash = res.total
          this.form.time = res.time
          this.form.busiName = res.business
          this.form.type = res.type
          this.thecharRadio = res.approval
          this.form.check = this.getMember(this.thecharRadio)
          this.form.status = res.status
          this.form.other = res.remark
        })
      },
      getTempSave(){
        this.$http.get('bill/check').then(res=>{
          this.theRadio = res.customer
          this.form.cusName = this.getIdMen(res.customer)
          this.form.phone = res.phone
          this.form.num = res.order_no
          this.form.contract = res.contract
          this.form.order = res.order
          this.form.cash = res.total
          this.form.time = res.time
          this.form.busiName = res.business
          this.form.type = res.type
          this.thecharRadio = res.approval
          this.form.check = this.getMember(this.thecharRadio)
          this.form.status = res.status
          this.form.other = res.remark
        })
      },
      getMember(id) {
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (this.excuters[i].user[j].user_id == id) {
              return this.excuters[i].user[j].name
            }
          }
        }
      },
    },
    created() {
      this.id = this.$route.query.id
      this.who = this.$route.query.who
      this.getCustoms()
      this.getMen()
    }
  };
</script>
<style lang="less" scoped>
  .newConf {
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
</style>
<style>
  .efi .el-form-item__content::after {
    margin-bottom: 10px;
  }
</style>