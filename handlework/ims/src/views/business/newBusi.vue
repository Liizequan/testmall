<template>
  <div class="newBusi contain">
    <div class="topTitle">
      <h4>{{who=='edit'?'编辑':'新建'}}立项</h4>
      <span class="bitianstyle"><span>*</span>为必填项</span>
    </div>
    <el-form :model="form" label-width="120px" class="form" :hide-required-asterisk="false" :rules="rules">
      <div>
        <el-form-item label="立项名称:" class="half efi" prop="proName">
          <el-input placeholder="请填立项名称（15字之内）" v-model="form.proName" maxlength="15"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="项目概述:" prop="desc" class="half efi">
          <el-input maxlength="255" placeholder="请填项目概述（255字之内）" type="textarea" :rows="8" v-model="form.desc"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="客户名称:" prop="cusName" class="half efi">
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
      <div>
        <el-form-item label="电话:" prop="phone" class="half efi">
          <el-input placeholder="请填电话" v-model="form.phone" :maxlength="11"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="项目类型:" prop="type" class="half efi">
          <el-select placeholder="请选择" class="select" v-model="form.type">
            <el-option v-for="(item,index) in orderTypes" :key="index" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="预计开始时间:" class="half efi">
          <!-- <el-input placeholder="请选择预计开始时间" v-model="form.start_time">
            <i class="el-icon-date" slot="suffix"></i>
          </el-input> -->
          <el-date-picker v-model="form.start_time" class="el_date" placeholder='请选择'></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="项目地址:" class="half efi">
          <el-input placeholder="请填项目地址" v-model="form.address" maxlength="255"></el-input>
        </el-form-item>
      </div>
      <div class="lineCon">
        <el-form-item label="合同总金额:" prop="total" class="half efi">
          <el-input placeholder="金额最长8位数" v-model="form.total" maxlength="8"></el-input>
        </el-form-item><span class="remark">单位：元</span class="remark">
      </div>
      <div>
        <el-form-item label="申请人:" prop="requirer" class="half efi">
          <el-popover placement="bottom-start" trigger="click" v-model="appPopo">
            <div>
              <h3>申请人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-collapse>
                <el-radio-group v-model="theappRadio" style="height:300px; overflow:auto" class="xyk-scroll">
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
                <span class="popoCon" @click="appConfirm">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择申请人" v-model="form.requirer"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="审批人:" prop="requirer" class="half efi">
          <el-popover placement="bottom-start" trigger="click" v-model="checkPopo">
            <div>
              <h3>审批人</h3>
              <el-input placeholder="搜索成员" v-model="memberKey" @change="searchMenber"></el-input>
              <el-collapse>
                <el-radio-group v-model="checkRadio" style="height:300px; overflow:auto" class="xyk-scroll">
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
                <span class="popoCon" @click="checkConfirm">确定</span>
                <span @click="checkPopo=false">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请选择审批人" v-model="form.checkman"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <!-- <el-form-item label="申请人部门:" class="half efi"> -->
          <!-- <el-popover placement="bottom-start" trigger="click" v-model="departPopo">
            <h3>部门</h3>
            <el-radio-group v-model="departId" class="checkGroup">
              <el-radio v-for="item in departs" :key="item.id" :label="item.id" v-if="item.id">{{item.label}}
              </el-radio>
            </el-radio-group>
            <div class="popoBtns">
              <span class="popoCon" @click="departConf">确定</span>
              <span @click="closePopo">取消</span>
            </div>
            <div slot="reference" class="Excu">
              <el-input placeholder="请选择部门" v-model="form.depart"></el-input>
            </div>
          </el-popover> -->
        <!-- </el-form-item> -->
      </div>
      <div>
        <el-form-item label="项目负责人:" class="half efi redStar">
          <el-popover placement="bottom-start" trigger="click" v-model="chargePopo">
            <div>
              <h3>负责人</h3>
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
              <el-input placeholder="请填项目负责人" v-model="form.response">
                <i class="el-icon-user" slot="suffix"></i>
              </el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="相关附件:">
          <el-button style="position:relative;">
            <div style="position:relative;">
              <i class="el-icon-upload">
              </i> 上传附件<input type="file" name="file" id="file" ref="file" @change="fileChan" />
            </div>
          </el-button><span class="remark">支持格式：.rar .zip .doc .docx .pdf
            ，单个文件不能超过10MB</span>
          <div>
            <div v-for="(item,index) in filesNameArr" :key="index"
              style="width:366px;display: flex;justify-content:space-between;align-items:center;padding-top:0;color:#409EFF;">
              <i class='el-icon-folder'>{{item+' '}}</i>
              <div @click="deleteFile(index)">删除<i class='el-icon-delete'></i></div>
            </div>
          </div>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="备注:" class="half efi">
          <el-input type="textarea" :rows="8" v-model="form.other" maxlength="255" placeholder='请填备注（255字之内）'></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="btm_btns">
      <!-- <el-button type="primary">提交审批</el-button> -->
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkRadio: '',
        checkPopo: false,
        memberRes: [],
        memberKey: '',
        departs: '',
        departId: '',
        departPopo: false,
        chargePopo: false,
        thecharRadio: '',
        theappRadio: '',
        appPopo: false,
        dispaPopo: false,
        searchRes: '',
        theRadio: '',
        searchVal: '',
        popoVisi: false,
        filesIdArr: [],
        filesNameArr: [],
        form: {
          checkman: '',
          proName: "",
          desc: "",
          cusName: "",
          phone: "",
          type: "",
          start_time: "",
          address: "",
          total: "",
          requirer: "",
          depart: "",
          response: "",
          other: ""
        },
        rules: {
          // proName: [{ required: true, message: "请填立项名称", trigger: "blur" }],
          // desc: [{ required: true, message: "请填项目描述" }],
          // cusName: [{ required: true, message: "请填客户名称" }],
          // phone: [{ required: true, message: "请填电话" }],
          // type: [{ required: true, message: "请填项目类型" }],
          // total: [{ required: true, message: "请填合同总金额" }],
          // requirer: [{ required: true, message: "请填申请人" }]
          proName: [{ required: true, message: " " }],
          desc: [{ required: true, message: " " }],
          cusName: [{ required: true, message: " " }],
          phone: [{ required: true, message: " " }],
          type: [{ required: true, message: " " }],
          total: [{ required: true, message: " " }],
          requirer: [{ required: true, message: " " }]
        },
        customer: [],
        excuters: [],
        customs: '',
        orderTypes: '',
        id: '',
        who: ''
      };
    },
    methods: {
      deleteFile(index){
        this.filesIdArr.splice(index,1)
        this.filesNameArr.splice(index,1)
      },
      searchMenber() {
        this.$http.get('user/search', { token: localStorage.getItem('token'), name: this.memberKey }).then(res => {
          this.memberRes = res
        })
      },
      save() {
        let f = this.form
        if (!f.proName) {
          this.$message('请填写立项名称')
        } else if (!f.desc) {
          this.$message('请填写项目概述')
        } else if (!this.theRadio) {
          this.$message('请选择客户名称')
        } else if (!f.phone) {
          this.$message('请填写电话')
        } else if (!this.$re.isPhone(f.phone)) {
          this.$message('电话为11位数字')
        } else if (!f.type) {
          this.$message('请填写项目类型')
        } else if (!f.total) {
          this.$message('请填写合同总金额')
        } else if (!this.$re.onlyNum(f.total)) {
          this.$message('合同总金额只能为数字')
        } else if (!this.theappRadio) {
          this.$message('请选择申请人')
        } else if (!this.checkRadio) {
          this.$message('请选择审批人')
        } else if(!this.thecharRadio){
          this.$message('请选择项目负责人')
        }else {
          let api
          let reqBody = {
            token: localStorage.getItem('token'),
            title: this.form.proName,
            desc: this.form.desc,
            customer: this.theRadio,
            phone: this.form.phone,
            type: this.form.type,
            begin_time: this.form.start_time,
            address: this.form.address,
            total: this.form.total,
            applicant: this.theappRadio,
            approval: this.checkRadio,
            structure: this.departId,
            charge: this.thecharRadio,
            file: this.$http.getIdsStr(this.filesIdArr),
            remark: this.form.other
          }
          if (this.who == 'edit') {
            api = 'project/edit'
            reqBody.id = this.id
          } else {
            api = 'project/add'
          }
          this.$http.post(api, reqBody).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$router.back()
                this.$bus.$emit('getList')
              }
            }
          })
        }
      },
      departConf() {
        this.departPopo = false
        for (let i in this.departs) {
          if (this.departs[i].id == this.departId) {
            this.form.depart = this.departs[i].label
          }
        }
      },
      charConfirm() {
        this.form.response = this.getMember(this.thecharRadio)
        this.chargePopo = false
      },
      appConfirm() {
        this.form.requirer = this.getMember(this.theappRadio)
        this.appPopo = false
      },
      checkConfirm() {
        this.form.checkman = this.getMember(this.checkRadio)
        this.checkPopo = false
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
      getOrderType() {
        this.$http.get('/Workorder/type', { token: localStorage.getItem('token') }).then(res => {
          this.orderTypes = res
          if (res) {
            this.getDepart()
          }
        })
      },
      getCustoms() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.customs = res
          if (res) {
            this.getOrderType()
          }
        })
      },
      radioChan() { },
      searchCus() {
        if (this.searchVal) {
          this.$http.get('/marketing/serach', { keyword: this.searchVal }).then(res => {
            this.searchRes = res
          })
        } else {
          this.searchRes = []
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
      getCustomer() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            this.customer = [...this.customer, ...res[i].customer]
          }
          if (res) {
            this.getMen()
            this.getCustoms()
          }
        })
      },
      fileChan() {
        this.$http.upload(this.$refs.file.files[0]).then(res => {
          if (res.data.code == 1) {
            this.$message('上传成功')
            this.filesIdArr.push(res.data.msg.id)
            this.filesNameArr.push(this.$refs.file.files[0].name)
          } else {
            this.$message('上传失败')
          }
        })
      },
      confirm() {
        this.popoVisi = false
        this.form.cusName = this.getIdMen(this.theRadio)
        // for(let i in this.customs){
        //   for(let j in this.customs[i].customer){
        //     if(this.customs[i].customer[j].id == this.theRadio){
        //       this.form.cusName = this.customs[i].customer[j].name
        //       break
        //     }
        //   }
        // }
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
        this.appPopo = false
        this.departPopo = false
        this.chargePopo = false
      },
      getDepart() {
        this.$http.get('index/structure').then(res => {
          this.departs = res
          if (this.who == 'edit') {
            this.editInit()
          }
        })
      },
      editInit() {
        this.$http.get('project/getdata', { token: localStorage.getItem('token'), id: this.id }).then(res => {
          this.form.proName = res.title
          this.form.desc = res.desc
          this.theRadio = res.customer
          this.form.cusName = this.getIdMen(res.customer)
          this.form.phone = res.phone
          this.form.type = res.type
          this.form.start_time = res.begin_time
          this.form.address = res.address
          this.form.total = res.total
          this.theappRadio = res.applicant
          this.form.requirer = this.getMember(res.applicant)
          this.departId = res.structure
          this.checkRadio = res.approval
          this.form.checkman = this.getMember(this.checkRadio)
          for (let i in this.departs) {
            if (this.departs[i].id == res.structure) {
              this.form.depart = this.departs[i].label
            }
          }
          this.thecharRadio = res.charge
          this.form.response = this.getMember(res.charge)
          this.form.other = res.remark
          for (let i in res.file) {
            this.filesNameArr.push(res.file[i].name)
            this.filesIdArr.push(res.id)
          }
        })
      }
    },
    created() {
      this.id = this.$route.query.id
      this.who = this.$route.query.who
      this.getCustomer()
    }
  };
</script>
<style lang="less" scoped>
  .newBusi {
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

  .remark {
    font-size: 14px;
    color: #ccc;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
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

  .el-popover__reference {
    width: 100% !important;
  }

  .checkGroup label {
    display: block;
    height: 20px;
  }
</style>
<style>
  .efi .el-form-item__content::after {
    margin-bottom: 14px !important;
  }
</style>