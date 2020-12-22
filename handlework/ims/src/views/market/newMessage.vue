<template>
  <div class="newMessage contain">
    <div style="margin-bottom:10px;">
      <el-button type="primary" @click="selContact">选择联系人</el-button>
      <el-button type="primary" @click="selTemp">选择短信模板</el-button type="primary">
    </div>
    <el-row>
      <el-col :span="8">
        <h4>接受号码</h4>
        <!-- <div>手动输入接收人号码</div>
        <el-input placeholder="请输入接收短信的号码" v-model="phone"></el-input>
        <div class="rowBtns">
          <el-button type="primary">添加</el-button>
          <el-button>重新输入</el-button>
        </div>
        <div class="colBtns">
          <el-button type="primary">添加客户联系人</el-button>
          <el-button type="primary">添加团队成员</el-button>
          <el-button type="primary">根据业务添加</el-button>
        </div> -->
        <el-input type="textarea" :rows="26" v-model="phones" disabled> </el-input>
        <!-- <div>
          当前添加号码数量：64
        </div>
        <div>最多可以添加数量：200个号码</div> -->
      </el-col>
      <el-col :span="15" :offset="1">
        <h4>群发短信的内容</h4>
        <!-- <div>
          剩余可用短信数量：1000
        </div> -->
        <el-input type="textarea" :rows="10" v-model="content" disabled></el-input>
        <div>
          <!-- <el-link type="primary">从短信模板中选择短信</el-link>
          <span>短信内容不能多于65个字，当前已输入40个字</span> -->
        </div>
        <div class="saveBtns">
          <el-button type="primary" @click="create">
            保存提交
          </el-button>
          <el-button @click="topCancel">取消</el-button>
        </div>
        <div>使用说明：</div>
        <div>
          1、发送时将自动在短信前添加公司名称签名，请勿手动添加。
          2、请不要在短信内容中填写特殊字符，包括换行符。
          3、短信内容不能多于65个字（其中空格、数字、字母、汉字均为一个字）
          4、同一手机号间隔发送时间不得少于20秒
          5、编写短信时请仔细阅读下面的内容说明，请严格按照系统设定标准格式发送短信
          6、最好不要在晚22:00至早7:00时段发送短信， 以免引起客户反感
        </div>
        <div>内容说明：</div>
        <div>
          1、不得发送包含以下内容：非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、淫秽
          的信息；教唆他人构成犯罪行为的信息、
          危害国家安全的信息；及任何不符合国家法律、国际惯例、地方法律规定的信息。
          2、不能违反运营商规定，不得发送竞争对手产品的广告，不能按手机号段形式进行广告业务的宣传等，不能发送与本行业无关和移动运营商限制和禁止发送的短信内容，
          特别是广告类信息，群发短信等，对违反此声明产生的一切后果由发送者及其单位承担
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="contactDia" title="选择联系人">
      <el-table :data="customData" @selection-change="change" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="客户名称" prop="name"></el-table-column>
        <el-table-column label="客户电话" prop="phone"></el-table-column>
      </el-table>
      <div style="margin-top:10px;text-align:right;">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="contactDia = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="tempDia" title="选择短信内容">
      <el-radio-group v-model="tempContent">
        <el-radio v-for="(item,index) in messages" :key="index" :label="item.id">{{item.name+'-->'+item.content}}
        </el-radio>
      </el-radio-group>
      <div style="margin-top:10px;text-align:right;">
        <el-button type="primary" @click="tempConf">确认</el-button>
        <el-button @click="tempDia = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tempDia: false,
        tempContent: '',
        contactDia: false,
        customData: [],
        phone: "",
        phones: "",
        content: "",
        men: '',
        messages: '',
        who: '',
        id: ''
      };
    },
    methods: {

      topCancel() {
        this.$router.back()
      },
      tempConf() {
        for (let i in this.messages) {
          if (this.messages[i].id == this.tempContent) {
            this.content = this.messages[i].name + '——' + this.messages[i].content
            break
          }
        }
        this.tempDia = false
      },
      selTemp() {
        this.tempDia = true
      },
      getContent() {
        this.$http.get('message/indextemplate', { token: localStorage.getItem('token') }).then(res => {
          this.messages = res
        })
      },
      selContact() {
        this.contactDia = true
      },
      confirm() {
        this.phones = this.men
        this.contactDia = false
      },
      create() {
        if(!this.phones){
          this.$message('请选择收信人')
          return
        }else if(!this.content){
          this.$message('请输入短信内容')
          return
        }
        let api
        let reqBody = { token: localStorage.getItem('token'), contact: this.phones, template_id: this.tempContent }
        if (this.who == 'edit') {
          api = 'message/edit'
          reqBody.id= this.id
        } else {
          api = 'message/addsms'
        }
        this.$http.post(api,reqBody ).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$router.back()
                this.$bus.$emit('getMessageList')
              }
            }
          })
      },
      change(e) {
        this.getPhones(e)
      },
      getPhones(arr) {
        this.men = ''
        for (let i in arr) {
          if (i == arr.length - 1) {
            this.men += arr[i].phone
          } else {
            this.men += arr[i].phone + ','
          }
        }
      },
      getCustom() {
        this.$http.get('marketing/group', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            this.customData = [...this.customData, ...res[i].customer]
          }
        })
      },
      editInit() {
        this.$http.get('message/look', { token: localStorage.getItem('token'), id: this.id }).then(res => {
          console.log(res)
          this.phones = res.contact
          this.content = res.content
        })
      }
    },
    created() {
      this.getCustom()
      this.getContent()
      console.log(this.$route.query)
      if (this.$route.query.who == 'edit') {
        this.who = 'edit'
        this.id = this.$route.query.id
        this.editInit()
      }
    }
  };
</script>
<style lang="less" scoped>
  .newMessage {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .rowBtns {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;

    button {
      width: 45%;
    }
  }

  .colBtns button {
    width: 100%;
    margin: 6px 0;
  }

  .saveBtns {
    margin: 10px 0;
  }

  h4 {
    margin-bottom: 10px;
  }
</style>