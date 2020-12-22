<template>
  <div class="newSheet contain">
    <div class="topTitle">
      <h4>{{who=='edit'?'编辑':'新建'}}工单</h4>
    </div>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px">
      <div>
        <el-form-item label="项目名称:" class="itemWidth">
          <el-input placeholder="请填项目名称" v-model="name"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="工单类型:" class="itemWidth">
          <el-select placeholder="请选择" class="select" v-model="type">
            <el-option v-for="(item,index) in typesArr" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="工作内容:" class="itemWidth">
          <el-input type="textarea" :rows="8" v-model="content"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <!-- <el-popover placement="bottom-start" width="300" trigger="click" v-model="popoVisi">
            <div>
              <h3>关联客户</h3>
              <el-input placeholder="搜索成员"></el-input>
              <el-menu>
                <el-submenu v-for="(item,index) in customs" :key="index" :index="index+''">
                  <template slot="title">
                    <div>
                      {{item.name}}
                    </div>
                  </template>
                  <el-menu-item>
                    <el-checkbox-group v-model="item.group">
                      <el-checkbox v-for="it in item.customer" :key="it.id" :label="it.name"></el-checkbox>
                    </el-checkbox-group>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
              <div class="popoBtns">
                <span class="popoCon" @click="confirm">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference" style="width:100px;">
              <i class="el-icon-link"></i>
              <el-link>关联客户</el-link>
            </div>
          </el-popover> -->
          <!-- <popo :customs="customs" @confirm="confirm">
            <i class="el-icon-link"></i>
            <el-link>关联客户</el-link>
          </popo> -->
          <el-popover placement="bottom-start" trigger="click" v-model="popoVisi" @hide="confirm">
            <div>
              <h3>关联客户</h3>
              <el-input placeholder="搜索成员" v-model="searchVal" @change="searchCus"></el-input>
              <el-menu>
                <el-radio-group v-model="theRadio" @input="radioChan" class="xyk-scroll" style="height:300px; overflow:auto">
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
                  <!-- <el-submenu v-for="(item,index) in customs" :key="index" :index="index+''" style="height:40px;">
                    <template slot="title">
                      <div>
                        {{item.name}}
                      </div>
                    </template>
                    <div>
                      <ul class="" >
                        <li v-for="it in item.customer" :key="it.id" >
                          <el-radio :label="it.id">{{it.name}}</el-radio>
                        </li>
                      </ul>
                    </div>
                  </el-submenu> -->
                  <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in customs" :key="index" >
                      <template slot="title">
                        {{item.name}}
                      </template>
                      <div>
                        <ul class="" >
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
                <el-link :underline='false'><span class="popoCon" @click="confirm">确定</span></el-link>
                <el-link :underline='false'><span @click="closePopo">取消</span></el-link>
              </div>
            </div>
            <div slot="reference" style="width:100px;">
              <i class="el-icon-link"></i>
              <el-link :underline="false">关联客户</el-link>
            </div>
          </el-popover>
          
        </el-form-item>
      </div>
      <!-- <div v-if="who=='edit'">
        <el-form-item class="itemWidth" v-for="(item,index) in selected" :key="index">
          <i class="el-icon-link leftIcon"></i>
          <span class="category">{{item.group}}</span><span>-</span>
          <span>{{item.name}}</span><i class="el-icon-delete rightIcon" @click="delSel(index)"></i>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item class="itemWidth" v-for="(item,index) in selected" :key="index">
          <i class="el-icon-link leftIcon"></i>
          <span class="category">{{item.name}}</span><span>-</span>
          <span>{{item.value}}</span><i class="el-icon-delete rightIcon" @click="delSel(index)"></i>
        </el-form-item>
      </div> -->
      <div>
        <el-form-item class="itemWidth" v-for="(item,index) in selected" :key="index">
          <i class="el-icon-link leftIcon"></i>
          <span class="category">{{item.group}}</span><span>-</span>
          <span>{{item.name}}</span><i class="el-icon-delete rightIcon" @click="delSel(index)"></i>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="执行人:" class="itemWidth">
          <el-popover placement="bottom-start" trigger="click" v-model="excuPopo" @hide="excuConf">
            <div>
              <h3>执行人</h3>
              <el-input placeholder="搜索成员"></el-input>
              <!-- <el-checkbox-group v-model="excuSel">
                <el-checkbox v-for="(item,index) in excuters" :key="index" :label="item.user_id">
                  <div>
                    <img :src="item.head" class="popoImg">
                    <span>{{item.name}}</span>
                  </div>
                </el-checkbox>
              </el-checkbox-group> -->
              <!-- <el-menu>
                <el-submenu v-for="(item,index) in excuters" :key="index" :index="index+''">
                  <template slot="title">
                    <div>
                      {{item.label}}
                    </div>
                  </template>
                  <el-menu-item>

                    <el-checkbox-group v-model="item.group">
                      <el-checkbox v-for="it in item.user" :key="it.user_id" :label="it.user_id">
                        {{it.name}}
                      </el-checkbox>
                    </el-checkbox-group>

                  </el-menu-item>
                </el-submenu>
              </el-menu> -->
              <el-collapse accordion style="height:350px;border-bottom:0;overflow:auto;" class="xyk-scroll">
                <el-collapse-item v-for="(item,index) in excuters" :key="index" >
                  <template slot="title">
                    {{item.label}}
                  </template>
                  <div>
                    <el-checkbox-group v-model="excuSelIdArr" style="flex-direction: column;">
                      <el-checkbox v-for="it in item.user" :key="it.user_id" :label="it.user_id" style="display:block">
                          {{it.name}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-collapse-item>
              </el-collapse>

              <div class="popoBtns">
                <el-link :underline="false"><span class="popoCon" @click="excuConf">确定</span></el-link>
                <el-link :underline="false"><span @click="closePopo">取消</span></el-link>
              </div>
            </div>
            <div slot="reference" style="width:100px;" class="Excu">
              <el-input placeholder="请填执行人" v-model="excuter"></el-input>
            </div>

          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="执行部门:" class="itemWidth">
          <el-popover placement="bottom-start" trigger="click" v-model="departPopo" @hide="departConf">
            <h3>执行部门</h3>
            <el-checkbox-group v-model="departIdsArr" class="checkGroup xyk-scroll" style="height:250px;overflow:auto;">
              <el-checkbox v-for="item in departs" :key="item.id" :label="item.id" v-if="item.id" style="padding:4px 0;">{{item.label}}
              </el-checkbox>
            </el-checkbox-group>
            <div class="popoBtns">
              <span class="popoCon" @click="departConf">确定</span>
              <span @click="closePopo">取消</span>
            </div>
            <!-- <el-checkbox-group v-model="depart" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group> -->
            <div slot="reference" class="Excu">
              <el-input placeholder="请填执行部门" v-model="departSelNameStr"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="优先级:" class="itemWidth">
          <el-button round plain class="danger" :class="prioIndex==0?'prioBg':''" @click="selePrio(0)">紧急</el-button>
          <el-button round plain class="danger" :class="prioIndex==1?'prioBg':''" @click="selePrio(1)">正常</el-button>
          <el-button round plain class="danger" :class="prioIndex==2?'prioBg':''" @click="selePrio(2)">缓慢</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="开始时间:" class="itemWidth">
          <el-date-picker v-model="start_time" class="el_date"></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="预计结束时间:" class="itemWidth">
          <el-date-picker v-model="expect_time" class="el_date"></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="实际结束时间:" class="itemWidth">
          <el-date-picker v-model="real_time" class="el_date"></el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="任务状态:" class="itemWidth">
          <el-select placeholder="请选择" class="select" v-model="status">
            <el-option v-for="(item,index) in statuses" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="负责人:" class="itemWidth">
          <el-popover placement="bottom-start" trigger="click" v-model="chargePopo">
            <div>
              <h3>负责人</h3>
              <el-input placeholder="搜索成员"></el-input>
              <el-menu>
                <el-submenu v-for="(item,index) in excuters" :key="index" :index="index+''">
                  <template slot="title">
                    <div>
                      {{item.label}}
                    </div>
                  </template>
                  <el-menu-item>
                    <el-checkbox-group v-model="item.group">
                      <el-checkbox v-for="it in item.user" :key="it.user_id" :label="it.user_id">{{it.name}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
              <div class="popoBtns">
                <span class="popoCon" @click="chargeConf">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference" style="width:100px;" class="Excu">
              <el-input placeholder="请填负责人" v-model="response"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="派单人:" class="itemWidth">
          <el-popover placement="bottom-start" trigger="click" v-model="dispaPopo">
            <div>
              <h3>派单人</h3>
              <el-input placeholder="搜索成员" v-model="searchVal" @change="searchCus"></el-input>
              <el-menu>
                <el-radio-group v-model="theDispRadio">
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
                <span class="popoCon" @click="dispConfirm">确定</span>
                <span @click="closePopo">取消</span>
              </div>
            </div>
            <div slot="reference">
              <el-input placeholder="请填派单人" v-model="distru"></el-input>
            </div>
          </el-popover>
        </el-form-item>
      </div>
      <div>
        <el-form-item class="itemWidth">
          <i class="el-icon-plus" style="color:#44bcf0;">上传附件</i><span style="color:#ccc;">（只能上传一份,格式为rar/zip/doc/docx/pdf）</span>
          <input type="file" name="file" @change="fileSel" ref="file" id="file">
        </el-form-item>
      </div>
      <div>
        <el-form-item class="itemWidth">
          <i class='el-icon-folder' v-if="who=='edit'">{{editFile?editFile.name:''}}</i>
          <i class='el-icon-folder' v-else v-for="(item,index) in files" :key="index">{{item.name}}</i>
        </el-form-item>
      </div>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import popo from '@/components/popo.vue'
  export default {
    data() {
      return {
        editFile: '',
        theDispRadio: '',
        dispaPopo: false,
        chargePopo: false,
        departSelNameStr: '',
        departIdsArr: [],
        departPopo: false,
        excuters: [],
        excuPopo: false,
        searchVal: '',
        searchRes: [],
        theRadio: '',
        popoVisi: false,
        structureId: '',
        customs: [],
        selected: [],
        tempSel: [],
        prioIndex: null,
        name: "",
        type: "",
        content: "",
        excuter: "",
        depart: [],
        start_time: "",
        expect_time: "",
        real_time: "",
        status: "",
        response: "",
        distru: "",
        files: [],
        fileIds: [],
        typesArr: '',
        statuses: '',
        typesArr: '',
        excuSelIdArr: [],//被选中的执行人id的数组
        excuSelNames: '',//被选中的执行人名字
        departs: '',
        chargeSelIdArr: '',
        departSelLen: [],
        tempDepSelLen: [],
        editId: '',
        who: ''
      };
    },
    methods: {
      dispConfirm() {
        this.dispaPopo = false
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            if (this.excuters[i].user[j].user_id == this.theDispRadio) {
              this.distru = this.excuters[i].user[j].name
            }
          }
        }
        this.clearSelExcu()
      },
      departConf() {
        this.departPopo = false
        this.departSelNameStr = ''
        for (let i in this.departs) {
          for (let j in this.departIdsArr) {
            if (this.departs[i].id == this.departIdsArr[j]) {
              this.departSelNameStr += this.departs[i].label + ' '
            }
          }
        }
      },
      excuConf() {
        this.excuSelIdArr = []
        this.excuter = ''
        for (let i in this.excuters) {
          this.excuSelIdArr = [...this.excuSelIdArr, ...this.excuters[i].group]
        }
        this.getExcuSelNameStr()
        this.clearSelExcu()
        this.excuPopo = false
      },
      getExcuSelNameStr() {
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            for (let m in this.excuSelIdArr) {
              if (this.excuters[i].user[j].user_id == this.excuSelIdArr[m]) {
                this.excuter = this.excuter + this.excuters[i].user[j].name + ' '
              }
            }
          }
        }
      },
      chargeConf() {
        this.chargeSelIdArr = []
        this.response = ''
        for (let i in this.excuters) {
          this.chargeSelIdArr = [...this.chargeSelIdArr, ...this.excuters[i].group]
        }
        this.getChargeSelNameStr()
        this.clearSelExcu()
        this.chargePopo = false
      },
      getChargeSelNameStr() {
        for (let i in this.excuters) {
          for (let j in this.excuters[i].user) {
            for (let m in this.chargeSelIdArr) {
              if (this.excuters[i].user[j].user_id == this.chargeSelIdArr[m]) {
                this.response = this.response + this.excuters[i].user[j].name + ' '
              }
            }
          }
        }
      },
      getTypes() {
        this.$http.get('/Workorder/type', { token: localStorage.getItem('token') }).then(res => {
          this.typesArr = res
        })
      },
      radioChan() {
        console.log(this.customs)
        for (let i in this.customs) {
          for (let j in this.customs[i].customer) {
            if (this.customs[i].customer[j].id == this.theRadio) {
              console.log(this.customs[i].name, this.customs[i].customer[j].name)
              this.tempSel = []
              this.tempSel.push({ group: this.customs[i].name, name: this.customs[i].customer[j].name })
              this.structureId = this.customs[i].id
            }
          }
        }
      },
      closePopo() {
        this.departPopo = false
        this.chargePopo = false
        this.dispaPopo = false
        this.popoVisi = false
      },
      fileSel(e) {
        // if (!this.files.length) {
          this.$http.upload(this.$refs.file.files[0]).then(res => {
            if (res.data.code == 0) {
              this.$message(res.data.msg)
            } else if (res.data.code == 1) {
              this.fileIds=[]
              this.files=[]
              this.fileIds.push(res.data.msg.id)
              this.files.push({ name: this.$refs.file.files[0].name, msg: res.msg })
              this.$message('上传成功')
            }
          }).catch(err => {

          })
        // } else {
        //   this.$message('只能上传一份附件')
        // }

        // let form = new FormData();
        // form.append("file", this.$refs.file.files[0]);
        // let config = {
        //   //添加请求头
        //   headers: { "Content-Type": "multipart/form-data" }
        // }
        // axios.post('http://192.168.0.3/index/upload', form, config).then(
        //   (res) => {
        //     this.$message('上传成功')
        //     this.files.push({ name: this.$refs.file.files[0].name, msg: res.msg })
        //   })
        //   .catch((err) => {
        //   });
      },
      delSel(index) {
        this.selected.splice(index, 1)
      },
      confirm() {
        this.selected = this.tempSel
        this.popoVisi = false
        // let ids = []
        // for (let i in this.customs) {
        //   for (let j in this.customs[i].group) {
        // this.selected.push({ name: this.customs[i].name, value: this.customs[i].group[j] })
        //     ids.push(this.customs[i].group[j])
        //   }
        // }
        // console.log(ids[0], this.customs)
      },
      selePrio(index) {
        this.prioIndex = index
      },
      //TODO
      save() {
        if (!this.name) {
          this.$message('请填写项目名称')
          return
        } else if (!this.type) {
          this.$message('请选择工单类型')
          return
        } else if (!this.content) {
          this.$message('请填写工作内容')
          return
        } else if (!this.theRadio) {
          this.$message('请选择关联客户')
          return
        } else if (!this.excuSelIdArr.length) {
          this.$message('请选择执行人')
          return
        } else if (!this.departIdsArr.length) {
          this.$message('请选择执行部门')
          return
        } else if (!this.prioIndex) {
          if (this.prioIndex !== 0) {
            this.$message('请选择优先级')
            return
          }
        }
        if (!this.start_time) {
          this.$message('请选择开始时间')
          return
        } else if (!this.expect_time) {
          this.$message('请选择预计结束时间')
          return
        }else if(this.start_time>this.expect_time){
          this.$message('预计结束时间不能大于开始时间')
          return
        } else if (!this.real_time) {
          this.$message('请选择实际结束时间')
          return
        } else if (this.start_time>this.real_time) {
          this.$message('实际结束时间不能大于开始时间')
          return
        } else if (this.who != 'edit') {
          if (!this.status) {
            this.$message('请选择任务状态')
            return
          }
        }
        if (!this.response) {
          this.$message('请选择负责人')
          return
        } else if (!this.distru) {
          this.$message('请选择派单人')
          return
        }
        if (this.who != 'edit') {
          if (!this.files.length) {
            this.$message('请上传附件')
            return
          }
        }
        console.log(this.status, 'sssssssssssss')
        let api
        let reqBody = {
          token: localStorage.getItem('token'),
          title: this.name,
          type: this.type,
          content: this.content,
          customer: this.theRadio,
          priority: this.prioIndex == 0 ? 10 : (this.prioIndex == 1 ? 20 : 30),
          structure: this.$http.getIdsStr(this.departIdsArr),
          executor: this.$http.getIdsStr(this.excuSelIdArr),
          begin_time: this.start_time,
          end_time: this.expect_time,
          finish_time: this.real_time,
          charge: this.$http.getIdsStr(this.chargeSelIdArr),
          dispatch: this.theDispRadio,
          file: this.who == 'edit' ? this.editFile.id : this.$http.getIdsStr(this.fileIds),
          // status:this.status
        }
        if (this.who == 'edit') {
          api = 'workorder/edit'
          reqBody.id = this.editId
          reqBody.status = this.getStatusIndex()
          console.log(reqBody)
        } else {
          api = 'workorder/add'
          reqBody.status = this.status
        }
        this.$http.post(api, reqBody).then(res => {
          if (res) {
            this.$message(res.msg)
            if (res.code == 1) {
              this.$router.back()
              this.$bus.$emit('listInit')
            }
          }
        })
      },
      getStatusIndex() {
        for (let i in this.statuses) {
          if (this.statuses[i].label == this.status) {
            return this.statuses[i].id
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
      getStatuses() {
        this.$http.get('/workorder/status', {
          token: localStorage.getItem('token')
        }).then(res => {
          this.statuses = res
        })
      },
      searchCus() {
        console.log(this.searchVal)
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
          if (this.who == 'edit') {
            this.editInit()
          }
          // if (res) {
          //   for (let i in res) {
          //     this.excuters = [...this.excuters, ...res[i].user]
          //   }
          // }
        })
      },
      getDepart() {
        this.$http.get('index/structure').then(res => {
          this.departs = res
          this.getMen()
        })
      },
      clearSelExcu() {
        for (let i in this.excuters) {
          this.excuters[i].group = []
        }
      },
      editInit() {
        this.$http.get('workorder/look', { token: localStorage.getItem('token'), id: this.editId }).then(res => {
          res = res.msg
          this.type = res.type
          this.name = res.title
          this.content = res.content
          var customer = [];
          if(res.customer instanceof Object){
            console.log('我是对象')
            customer.push(res.customer)
          }
          if(res.customer instanceof Array){
            console.log('我是数组')
            customer = res.customer
          }
          this.selected = customer
          this.excuSelIdArr = res.executor.split(',')
          this.getExcuSelNameStr()
          this.departIdsArr = res.structure.split(',')
          this.departConf()
          this.prioIndex = res.priority == 10 ? 0 : (res.priority == 20 ? 1 : 2)
          this.start_time = res.begin_time.split(' ')[0]
          this.expect_time = res.end_time.split(' ')[0]
          this.real_time = res.finish_time.split(' ')[0]
          this.status = res.status
          this.chargeSelIdArr = res.charge.split(',')
          this.getChargeSelNameStr()
          this.theDispRadio = res.dispatch
          this.dispConfirm()
          this.editFile = res.file
          this.theRadio = res.customer[0].user_id
          console.log(this.theRadio,'rrrrrrrrrrrr')
        })
      }
    },
    created() {
      if (this.$route.query.who == 'edit') {//从详情页跳过来编辑
        this.who = 'edit'
        this.editId = this.$route.query.id

      }
      this.getDepart()
      this.index = this.$route.query
      this.getCustoms()
      this.getStatuses()
      this.getTypes()

    },
    components: {
      popo
    }
  };
</script>
<style lang="less" scoped>
  .newSheet {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .itemWidth {
    width: 60%;
  }

  .select {
    width: 100%;
  }

  .category {
    margin-left: 15px;
  }

  .rightIcon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .leftIcon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  /* .danger {
    border-color: red;
    color: red;
  }

  .normal {
    border-color: #16d585;
    color: #16d585;
  }

  .slow {
    border-color: #44bcf0;
    color: #44bcf0;
  } */
  .danger {
    border-color: #343434 !important;
    color: #343434;
  }

  h3 {
    margin-bottom: 10px;
  }

  .popoBtns {
    text-align: right;
    padding-top:10px;
  }

  .popoCon {
    color: #44bcf0;
    margin-right: 6px;
  }

  .el-menu {
    border-right: none;
  }

  .prioBg {
    background: #000 !important;
    color: #fff !important;
  }

  .el-radio-group {
    width: 100%;
  }

  .Excu {
    width: 100% !important;
  }

  .popoImg {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid #DCDFE6;
  }

  .el-checkbox {
    display: block;
  }

  .el-checkbox-group {
    display: flex;
  }

  .checkGroup {
    display: flex;
    flex-direction: column;
  }
</style>