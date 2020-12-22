<template>
  <div class="report-add">
    <div class="top">
      <h3>{{who?'编辑工作汇报':'新建工作汇报'}}</h3>
      <p>基础信息</p>
    </div>

    <div class="tabbar">
      类型
      <div class="tabbar-text">
        <div v-for="(item, index) in tabbar" :key="index">
          <el-button @click="tabbarTap(index)" :type="tabbarIndex === index ? primarys : ''">{{ item }}</el-button>
        </div>
      </div>
    </div>
    <ul class="tabbar-container">
      <li>
        <div class="textarea">
          <span class="font14-nobold-6">标题：</span>
          <el-input type="text" placeholder="请填标题（30字内）" v-model="title" maxlength="30"></el-input>
        </div>
      </li>
      <li v-if="tabbarIndex == 0">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="textarea">
            <span class="font14-nobold-6">今日总结：</span>
            <el-input type="textarea" placeholder="请填今日总结（255字内）" v-model="form.name" maxlength="255"></el-input>
          </div>
          <div class="textarea">
            <span class="font14-nobold-6">明日计划：</span>
            <el-input type="textarea" placeholder="请填明日计划（255字内）" v-model="form.desc" maxlength="255"></el-input>
          </div>
        </el-form>
      </li>
      <li v-if="tabbarIndex == 1">
        <div class="textarea">
          <span class="font14-nobold-6">本周工作成效：</span>
          <el-input type="textarea"  placeholder="请填本周工作成效（255字内）" v-model="form1.name" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">本周小结：</span>
          <el-input type="textarea" placeholder="请填本周小结（255字内）" v-model="form1.desc" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">下周计划内容：</span>
          <el-input type="textarea" placeholder="请填下周计划内容（255字内）" v-model="form1.text" maxlength="255"></el-input>
        </div>
      </li>
      <li v-if="tabbarIndex == 2">
        <div class="textarea">
          <span class="font14-nobold-6">本月目标：</span>
          <el-input type="textarea" placeholder="请填本月目标（255字内）" v-model="form2.target" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">本月完成情况：</span>
          <el-input type="textarea" placeholder="请填本月完成情况（255字内）" v-model="form2.progress" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">本月达成率：</span>
          <!-- <el-input type="textarea" v-model="form2.rate"></el-input> -->
          <el-select v-model="form2.rate" style="width:100%;">
            <el-option v-for="(item,index) in percent" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">未达成目标原因：</span>
          <el-input type="textarea" placeholder="请填未达成目标原因（255字内）" v-model="form2.reason" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">改变现状的对策：</span>
          <el-input type="textarea" placeholder="请填改变现状的对策（255字内）" v-model="form2.policy" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">意见以及建议：</span>
          <el-input type="textarea" placeholder="请填意见以及建议（255字内）" v-model="form2.proposal" maxlength="255"></el-input>
        </div>
      </li>
      <li v-if="tabbarIndex == 3">
        <div class="textarea">
          <span class="font14-nobold-6">工作概述：</span>
          <el-input type="textarea" placeholder="请填工作概述（255字内）" v-model="form3.target" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">工作回顾：</span>
          <el-input type="textarea" placeholder="请填工作回顾（255字内）"  v-model="form3.progress" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">工作完成情况：</span>
          <el-input type="textarea" placeholder="请填工作完成情况（255字内）"  v-model="form3.rate" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">成果展示：</span>
          <el-input type="textarea" placeholder="请填成果展示（255字内）"  v-model="form3.reason" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">工作中存在不足之处：</span>
          <el-input type="textarea" placeholder="请填工作中存在不足之处（255字内）" v-model="form3.policy" maxlength="255"></el-input>
        </div>
        <div class="textarea">
          <span class="font14-nobold-6">明年目标计划：</span>
          <el-input type="textarea"  placeholder="请填明年目标计划（255字内）" v-model="form3.proposal" maxlength="255"></el-input>
        </div>
      </li>
    </ul>
    <div class="tabbar-btn">
      <span class="font14-nobold-6">发给上级：</span>
      <el-form style="padding:10px 0 20px;">
        <Customer :addText="addText" :isUser="isUser" @approData="getApproData"/>
      </el-form>
      
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
    <!-- <div class="tabbar-btn">
      <div class="add-user font14-nobold-6">
        <span>发给谁</span>
        <div style="border:1px solid #D7DAE2" class="br4">
          <el-popover placement="right" width="250" trigger="click" v-model="visible">
            <div>
              <el-input v-model="searchUser" placeholder="请输入内容"></el-input>
              <ul class="xyk-scroll" style="height:350px;overflow: overlay;">
                <el-checkbox-group v-model="checkboxes">
                  <li v-for="(item, index) in allUser" :key="index" class="flex-items-center">
                    <el-checkbox style="display: flex;align-items: center;width:100%;" :label="item.user_id">
                      <div class="flex-items-center" style="width:100%;">
                        <img :src="item.head" alt=""
                          style="width:36px;height:36px;margin-right:10px;border-radius:50%;border:1px solid #DCDFE6" />
                        <p>{{ item.name }}</p>
                      </div>
                    </el-checkbox>
                  </li>
                </el-checkbox-group>
              </ul>
              <div class="yes-no">
                <el-link :underline="false" type="primary" @click="confirm">确定</el-link>
                <el-link :underline="false" @click="visible = false">取消</el-link>
              </div>
            </div>
            <div slot="reference" style="margin:0;display:inline;">
              <el-button style="border:0;">
                <el-link><i class="el-icon-plus"></i>添加</el-link>
              </el-button>
              <span v-for="(item,index) in boxes" :key="index">{{item}} </span>
            </div>

          </el-popover>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import Customer from "@/components/staff/check.vue"
  export default {
    components:{
      Customer
    },
    data() {
      return {
        percent: [{ label: '20%', value: 1 }, { label: '40%', value: 2 }, { label: '60%', value: 3 }, { label: '80%', value: 4 }, { label: '100%', value: 5 }],
        tabbar: ["日报", "周报", "月报", "年度"],
        tabbarIndex: '',
        primarys: "primary",
        title:'',
        addText:'添加',
        // 编辑的用户
        isUser:[],
        // 日报
        form: {
          name: "",
          desc: ""
        },
        // 周报
        form1: {
          name: "",
          desc: "",
          text: ""
        },
        // 月报
        form2: {
          target: "",
          progress: "",
          rate: "",
          reason: "",
          policy: "",
          proposal: ""
        },
        // 年度
        form3: {
          target: "",
          progress: "",
          rate: "",
          reason: "",
          policy: "",
          proposal: ""
        },
        // 搜索成员
        searchUser: "",
        allUser: [],
        visible: false,
        checkboxes: [],//已经选中的ids数组
        boxes: [],//已经选中的names数组
        id: '',
        who: '',
        idsStr: ''//已经选中的ids字符串，格式为1,2,3
      };
    },
    methods: {
      // 统一
      getApproData(val){
        console.log(val)
        this.idsStr = val
        console.log(this.idsStr)
      },
      getNamesArr() {
        this.boxes = []
        for (let i in this.allUser) {
          for (let j in this.checkboxes) {
            if (this.allUser[i].user_id == this.checkboxes[j]) {
              this.boxes.push(this.allUser[i].name)
            }
          }
        }
      },
      confirm() {
        this.visible = false
        this.getNamesArr()
        // this.boxes = this.checkboxes
      },
      getMan() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          this.allUser = []
          for (let i in res) {
            this.allUser = [...this.allUser, ...res[i].user]
          }
        })
      },
      // 导航切换
      tabbarTap(index) {
        // console.log("导航");
        // console.log(index);
        this.tabbarIndex = index;
      },
      // getIdsStr() {
      //   this.idsStr = ''
      //   for (let i in this.checkboxes) {
      //     if (i == this.checkboxes.length - 1) {
      //       this.idsStr += this.checkboxes[i]
      //     } else {
      //       this.idsStr += this.checkboxes[i] + ','
      //     }
      //   }
      // },
      onSubmit() {
        let api,approval
        if (this.who) {
          api = 'report/doedit'
        } else {
          api = 'report/add'
        }
        if(this.idsStr.length > 1){
          return this.$message('上级只能选择一人，请重新选择')
        }
        if(this.idsStr.length != 0){
          approval = this.idsStr.join(',')
        }
        // this.getIdsStr()
        if(!this.title){
          this.$message('请填写标题')
          return
        }
        if (this.tabbarIndex == 0) {
          if (!this.form.name) {
            this.$message('请填写今日总结')
            return
          } else if (!this.form.desc) {
            this.$message('请填写明日计划')
            return
          } else if (this.idsStr.length == 0) {
            this.$message('请选择接收人')
            return
          }
          this.$http.post(api, { 
            token: localStorage.getItem('token'), 
            title: this.title,
            text1: this.form.name, 
            text2: this.form.desc, 
            approval:approval, 
            type: 1, 
            id: this.id 
          }).then(res => {
            if (res.code == 1) {
              this.$router.back()
              this.$bus.$emit('reportInit')
            }
            if (res) {
              this.$message(res.msg)
            }
          })
        } else if (this.tabbarIndex == 1) {
          if (!this.form1.name) {
            this.$message('请填写本周工作成效')
            return
          } else if (!this.form1.desc) {
            this.$message('请填写本周小结')
            return
          } else if (!this.form1.text) {
            this.$message('请填写计划内容')
            return
          } else if (this.idsStr.length == 0) {
            this.$message('请选择接收人')
            return
          }

          this.$http.post(api, { 
            token: localStorage.getItem('token'), 
            title:this.title,
            text1: this.form1.name, 
            text2: this.form1.desc, 
            text3: this.form1.text, 
            approval: approval, 
            type: 2, 
            id: this.id 
          }).then(res => {
            if (res.code == 1) {
              this.$router.back()
              this.$bus.$emit('reportInit')
            }
            if (res) {
              this.$message(res.msg)
            }
          })
        } else if (this.tabbarIndex == 2) {
          // for(let i in this.form2){
          //   if(!this.form2[i]){
          //     this.$message('请填写'+i)
          //     return
          //   }
          // }
          if (!this.form2.target) {
            this.$message('请填写本月目标')
            return
          } else if (!this.form2.progress) {
            this.$message('请填写本月完成情况')
            return
          } else if (!this.form2.rate) {
            this.$message('请填写本月达成率')
            return
          }
          // else if (!this.form2.reason) {
          //   this.$message('未达成目标原因')
          //   return
          // } else if (!this.form2.policy) {
          //   this.$message('本周小结')
          //   return
          // } else if (!this.form2.proposal) {
          //   this.$message('本周小结')
          //   return
          // }
          else if (this.idsStr.length == 0) {
            this.$message('请选择接收人')
            return
          }
          this.$http.post(api, {
            token: localStorage.getItem('token'),
            title: this.title,
            text1: this.form2.target,
            text2: this.form2.progress,
            text3: this.form2.rate,
            text4: this.form2.reason,
            text5: this.form2.policy,
            text6: this.form2.proposal,
            approval: approval,
            type: 3, id: this.id
          }).then(res => {
            if (res.code == 1) {
              this.$router.back()
              this.$bus.$emit('reportInit')
            }
            if (res) {
              this.$message(res.msg)
            }
          })
        } else {
          if (!this.form3.target) {
            this.$message('请填写工作概述')
            return
          } else if (!this.form3.progress) {
            this.$message('请填写工作回顾')
            return
          } else if (!this.form3.rate) {
            this.$message('请填写工作完成情况')
            return
          } else if (!this.form3.reason) {
            this.$message('请填写成果展示')
            return
          }
          //  else if (!this.form3.policy) {
          //   this.$message('本周小结')
          //   return
          // } 
          else if (!this.form3.proposal) {
            this.$message('明年目标计划')
            return
          } else if (this.idsStr.length == 0) {
            this.$message('请选择接收人')
            return
          }
          this.$http.post(api, {
            token: localStorage.getItem('token'),
            title:this.title,
            text1: this.form3.target,
            text2: this.form3.progress,
            text3: this.form3.rate,
            text4: this.form3.reason,
            text5: this.form3.policy,
            text6: this.form3.proposal,
            approval: approval,
            type: 4, id: this.id
          }).then(res => {
            if (res.code == 1) {
              this.$router.back()
              this.$bus.$emit('reportInit')
            }
            if (res) {
              this.$message(res.msg)
            }
          })
        }
      },




      handleCheckedCitiesChange() {
        // console.log("选择用户");
      },
      editInit() {
        this.$http.get('report/edit', { id: this.id }).then(res => {
          // console.log(res, 'rrrrrrrr')
          // this.checkboxes = res.approval
          this.title = res.title
          this.isUser = res.approval
          this.checkboxes = []
          for (let i in res.approval) {
            this.checkboxes.push(res.approval[i].user_id)
          } 
          this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
            this.allUser = []
            for (let i in res) {
              this.allUser = [...this.allUser, ...res[i].user]
            }
            this.getNamesArr()
          })
        

          if (this.who == 1) {//日
            this.tabbarIndex = 0
            this.form.name = res.text1
            this.form.desc = res.text2
          } else if (this.who == 3) {//月
            this.tabbarIndex = 2
            this.form2.target = res.text1
            this.form2.progress = res.text2
            this.form2.rate = res.text3
            this.form2.reason = res.text4
            this.form2.policy = res.text5
            this.form2.proposal = res.text6
          } else if (this.who == 2) {//周
            this.tabbarIndex = 1
            this.form1.name = res.text1
            this.form1.desc = res.text2
            this.form1.text = res.text3
          } else if (this.who == 4) {//年
            this.tabbarIndex = 3
            this.form3.target = res.text1
            this.form3.progress = res.text2
            this.form3.rate = res.text3
            this.form3.reason = res.text4
            this.form3.policy = res.text5
            this.form3.proposal = res.text6
          }
        })
      }
    },
    created() {
      this.getMan()
      if (this.$route.query.who) {
        this.who = this.$route.query.who
        this.id = this.$route.query.id
        this.editInit()
      } else {
        this.tabbarIndex = 0
      }
    }
  };
</script>
<style lang="less" scoped>
  .report-add {
    text-align: left;
  }

  .top {
    p {
      margin: 20px 0;
      padding-left: 10px;
      border-left: 2px solid #409eff;
    }
  }

  .tabbar {
    .tabbar-text {
      display: flex;

      div {
        margin: 10px 20px 0px 0;
      }
    }
  }

  .tabbar-container {
    width: 600px;

    .textarea {
      margin-top: 30px;
      span {
        display: inline-block;
        padding-bottom: 10px;
      }
    }
  }

  .tabbar-btn {
    padding-top: 30px;
    width: 600px;

    .add-user {
      div {
        /* padding:10px; */
        margin: 10px 0 40px;

        a {
          color: #409eff;
        }
      }
    }

    .el-checkbox {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }

  .yes-no {
    text-align: right;

    a {
      display: inline-block;
      padding: 10px 0px 0 10px;
    }
  }

  li.flex-items-center {
    padding-top: 10px;

    img {
      display: block;
    }
  }
</style>