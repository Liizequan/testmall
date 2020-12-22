<template>
  <div class="sheetDetl contain">
    <div class="topTitle">
      <h4>项目名称</h4>
      <div class="topBtns">
        <el-button type="primary" @click="check" class="change">审核</el-button>
        <!-- <el-button type="danger" @click="toOther">转给他人</el-button> -->
        <menRadio :excuters="men" @theRes="chanExcu">
          <template slot="title">
            <h3>执行人</h3>
          </template>
          <template slot="main">
            <el-button type="primary" class="change">更换执行人</el-button>
          </template>
        </menRadio>
        <menRadio :excuters="men" @theRes="chanRespon">
          <template slot="title">
            <h3>负责人</h3>
          </template>
          <template slot="main">
            <!-- @click="toOther" -->
            <el-button type="primary" class="change">更换负责人</el-button>
          </template>
        </menRadio>
        <!-- <el-button type="primary" @click="closeOrder" class="change">关闭</el-button> -->
        <el-button type="primary" @click="closeOrder" class="change">关闭</el-button>
      </div>
    </div>
    <div style="color:#ccc;font-size: 14px;">
      <span style="margin-right:30px;">{{createMan?createMan.position:''}}创建于：{{createMan?createMan.create_time:''}}
      </span>
      <span v-if="updateMan">{{updateMan.user_id}}最后更新时间：{{updateMan.create_time}}</span>
    </div>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px" class="form_width">
      <el-form-item label="执行人:">{{excuter}}
        <!-- <el-input v-model="excuter"></el-input> -->
      </el-form-item>
      <el-form-item label="执行部门:">{{depart}}
        <!-- <el-input v-model="depart"></el-input> -->
      </el-form-item>
      <el-form-item label="优先级:">
        <!-- <el-button round class="priority">正常</el-button> -->
        <el-button round plain class="danger" v-if="priority==10">紧急</el-button>
        <el-button round plain class="normal" v-if="priority==20">正常</el-button>
        <el-button round plain class="slow" v-if="priority==30">缓慢</el-button>
      </el-form-item>
      <el-form-item label="工作内容:">{{content}}
        <!-- <el-input v-model="content"></el-input> -->
      </el-form-item>
      <el-form-item label="任务状态:">
        <span :class="status=='未开始'?'one':(status=='设计中'||status=='待确定'?'two':(status=='程序中'||status=='验收中'?'three':(status=='已完成'?'four':'five')))">{{status}}</span>
        <!-- <el-select placeholder="请选择" class="select el_date" value="status">
          <el-option labe="one" value="one"></el-option>
          <el-option labe="two" value="two"></el-option>
        </el-select> -->
        <!-- <el-input :value="status"></el-input> -->
      </el-form-item>
      <el-form-item label="开始时间:">{{start_time}}
        <!-- <el-date-picker v-model="start_time" class="el_date"></el-date-picker> -->
      </el-form-item>
      <el-form-item label="预计结束时间:">{{expect_time}}
        <!-- <el-date-picker v-model="expect_time" class="el_date"></el-date-picker> -->
      </el-form-item>
      <el-form-item label="实际结束时间:">{{real_time}}
        <!-- <el-date-picker v-model="real_time" class="el_date"></el-date-picker> -->
      </el-form-item>
      <el-form-item label="负责人:">{{response}}
        <!-- <el-input v-model="response"></el-input> -->
      </el-form-item>
      <el-form-item label="派单人:">{{distru}}
        <!-- <el-input v-model="distru"></el-input> -->
      </el-form-item>
      <div class="line_title">附加信息</div>
      <el-form-item label="关联客户:"><span v-for="(item,index) in customArr" :key="index" v-if="item.group">{{item.group + '-' + item.name
        }}</span>
      </el-form-item>
      <!-- <div>
        <i class="el-icon-link leftIcon"></i>
        <el-link class="category">客户分类</el-link><span>-</span>
        <el-link>客户名称</el-link><i class="el-icon-link rightIcon"></i>
      </div> -->
      <el-form-item label="附件:">
        <el-link v-if="file">{{file.name}}<span>（{{file.size}}）</span></el-link>
        <a v-if="file" :href="$baseURL+'/'+file.path" download>下载</a v-if="file">
      </el-form-item>
      <div class="line_title" v-if="tempTimes.length">操作记录</div>
      <el-timeline>
        <el-timeline-item v-for="(item,index) in tempTimes" :timestamp="item.create_time">{{item.user_id}}
          更改工单状态为：{{item.status}}</el-timeline-item>
      </el-timeline>
      <el-link type="primary" v-if="timelines.length>3 && moreShow" @click="showMore">查看更多>></el-link>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="toEdit">编辑</el-button>
      <el-button @click="getout">导出</el-button>
    </div>
    <el-dialog :visible.sync="checkDia" title="审核">
      <el-form label-width="120px">
        <el-form-item label="审核结果:">
          <el-select class="el_date" v-model="checkSel">
            <el-option :value="1" label="同意"></el-option>
            <el-option :value="2" label="不通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一审批人:">
          <el-radio v-model="checkRadio" :label="1" id="radioLabel">
            <menRadio :excuters="men" @theRes="getRadio">
              <template slot="title">
                <h3>审批人</h3>
              </template>
              <template slot="main">
                <el-input v-model="theRadio.name"></el-input>
              </template>
            </menRadio>
          </el-radio>
          <el-radio v-model="checkRadio" :label="2">结束审核</el-radio>
        </el-form-item>
        <el-form-item label="意见:">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="checking">确定</el-button>
        <el-button @click="checkDia=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import menRadio from '@/components/menRadiocopy.vue'
  export default {
    data() {
      return {
        iamthereceiver: false,
        checkSel: 1,
        moreShow: true,
        checkRadio: 1,
        checkDia: false,
        name: "",
        type: "",
        content: "",
        excuter: "",
        depart: "",
        start_time: "",
        expect_time: "",
        real_time: "",
        status: "",
        response: "",
        distru: "",
        id: '',
        priority: '',
        customArr: [],
        file: '',
        timelines: '',
        tempTimes: '',
        createMan: {
          position: '',
          create_time: ''
        },
        updateMan: '',
        structure: '',
        //公司员工radio start
        men: '',
        theRadio: ''
        //公司员工radio end
      };
    },
    components: { menRadio },
    methods: {
      getout() {
        this.$http.downloadFile('/workorder/export', this.id)
      },
      chanRespon(radio) {//更换负责人
        this.$http.post('workorder/charge', { id: this.id, charge: radio.id }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.getDetail(this.id)
          }
        })
      },
      chanExcu(radio) {//更换执行人
        this.$http.post('workorder/executor', {
          id: this.id,
          executor: radio.id
        }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.getDetail(this.id)
          }
        })
      },
      closeOrder() {
        this.$router.back()
        // this.$http.post('workorder/close',{token:localStorage.getItem('token'),id:this.id}).then(res=>{
        //   this.$message(res.msg)
        //   if(res.code ==1){
        //     this.$router.back()
        //   }
        // })
      },
      toOther() {
        this.$http.post('workorder/repeat', {
          id: this.id,
          user_id: '',
          token: localStorage.getItem('token')
        }).then(res => {

        })
      },
      //公司员工method start
      getRadio(res) {
        this.theRadio = res
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.men = res
          this.getDetail(this.id)
        })
      },
      //公司员工method end
      checking() {
        this.checkDia = false
        this.$http.post('')
      },
      getDepart() {
        this.$http.get('index/structure').then(res => {
          this.structure = res
          this.getMen()
        })
      },
      toEdit() {
        this.$router.push({ path: '/newSheet', query: { id: this.id, who: 'edit', iamthereceiver: this.iamthereceiver } })
      },
      showMore() {
        this.tempTimes = this.timelines
        this.moreShow = false
      },
      check() {
        // this.checkDia = true;
        this.$confirm('是否通过审核', '审核', {
          confirmButtonText: '通过',
          cancelButtonText: '取消'
        }).then(r => {
          if (r == 'confirm') {
            this.$http.post('workorder/examine', {
              token: localStorage.getItem('token'),
              id: this.id
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$router.back()
              }
            })
          }
        })
      },
      getDepartStr(idStr) {
        let str = ''
        if (/,/.test(idStr)) {
          let arr = idStr.split(',')
          for (let i in this.structure) {
            // for (let j in this.structure[i].user) {
            for (let j in arr) {
              if (this.structure[i].id == arr[j]) {
                str = str + this.structure[i].label + ' '
              }
            }
          }
          // }
        } else {
          for (let i in this.structure) {
            if (this.structure[i].id == idStr) {
              return this.structure[i].label
            }
          }
        }
        return str
      },
      getNameStr(idStr) {
        let str = ''
        if (/,/.test(idStr)) {
          let arr = idStr.split(',')
          for (let i in this.men) {
            for (let j in this.men[i].user) {
              for (let m in arr) {
                if (this.men[i].user[j].user_id == arr[m]) {
                  str = str + this.men[i].user[j].name + ' '
                }
              }
            }
          }
        } else {
          for (let i in this.men) {
            for (let j in this.men[i].user) {
              if (this.men[i].user[j].user_id == idStr) {
                str = str + this.men[i].user[j].name + ' '
                break
              }
            }
          }
        }
        return str
      },
      getDetail(id) {
        //TODO
        this.$http.get('workorder/look', { token: localStorage.getItem('token'), id: id }).then(res => {
          this.name = res.msg.title
          this.type = res.msg.type
          this.content = res.msg.content
          this.excuter = this.getNameStr(res.msg.executor)
          this.depart = this.getDepartStr(res.msg.structure)
          this.start_time = res.msg.begin_time
          this.expect_time = res.msg.end_time
          this.real_time = res.msg.finish_time
          this.status = res.msg.status
          this.response = this.getNameStr(res.msg.charge)
          this.distru = this.getNameStr(res.msg.dispatch)
          this.priority = res.msg.priority
          var customer = [];
          if (res.msg.customer instanceof Object) {
            console.log('我是对象')
            customer.push(res.msg.customer)
          }
          if (res.msg.customer instanceof Array) {
            console.log('我是数组')
            customer = res.msg.customer
          }
          this.customArr = customer
          this.file = res.msg.file,
            this.timelines = res.msg.log
          this.tempTimes = res.msg.log.slice(0, 3)
          this.updateMan = res.msg.log[0]
          this.createMan.position = res.msg.user_id
          this.createMan.create_time = res.msg.create_time
        })
      }
    },
    created() {
      this.id = this.$route.query.id
      this.iamthereceiver = this.$route.query.iamthereceiver
      console.log(this.iamthereceiver, 'iiiiiiiiiiiiiii')
      this.getDepart()
      // this.getMen()
      // this.getDetail(this.id)
    }
  };
</script>
<style lang="less" scoped>
  .sheetDetl {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .topTitle {
    display: flex;
    justify-content: space-between;
  }

  .priority {
    color: #16d585;
    border-color: #16d585;
  }

  .danger {
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
  }

  .el-radio__input .is-checked {
    display: flex;
    align-items: center;
  }

  /deep/.el-form-item__content {
    display: flex;
    align-items: center;
  }

  #radioLabel {
    display: flex;
    align-items: center;
  }

  .change {
    margin-left: 10px;
  }

  /deep/.el-dialog {
    width: 560px;
  }

  .topBtns {
    margin-bottom: 0;
  }

  .one {
    background: #e5e5e5;
    padding: 0 14px;
    border-radius: 3px;
    color:#fff;
  }
  .two {
    background: #47a6ff;
    padding: 0 14px;
    border-radius: 3px;
    color:#fff;
  }
  .three {
    background: #7d44ff;
    padding: 0 14px;
    border-radius: 3px;
    color:#fff;
  }
  .four {
    background: #07c160;
    padding: 0 14px;
    border-radius: 3px;
    color:#fff;
  }
  .five {
    background: #ff2323;
    padding: 0 14px;
    border-radius: 3px;
    color:#fff;
  }
</style>