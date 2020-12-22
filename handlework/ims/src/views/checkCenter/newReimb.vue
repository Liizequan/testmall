<template>
  <div class="newReimb ">
    <h4 class="font18-bold-3">新建差旅报销审批</h4>
    <div class="line_title font14-bold-3">基础信息</div>
    <el-form label-width="120px">
      <el-form-item label="申请人:">
        <el-input class="formInp" v-model="req_man" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门:" style="width:732px;">
        <!-- <el-input class="formInp" v-model="depart"></el-input> -->
        <Department @customer="getCustomerData" />
      </el-form-item>
      <el-form-item label="报销事由:" class="redStar">
        <el-input type="textarea" class="formInp" v-model="thing" maxlength="255" placeholder='请填写报销事由'></el-input>
      </el-form-item>
      <el-form-item label="费用承担主体:" class="redStar">
        <el-input class="formInp" v-model="who" maxlength="30" placeholder='请填写承担主体'></el-input>
      </el-form-item>
      <el-form-item label="报销方式:" class="redStar">
        <el-input class="formInp" v-model="method" maxlength="20" placeholder='请填写报销方式'></el-input>
      </el-form-item>

      <!-- <el-form-item label="总金额:">
        <el-input class="formInp" v-model="total" disabled></el-input>
      </el-form-item> -->
      <!-- <el-form-item>
        <i class="el-icon-link">关联客户</i>
      </el-form-item>
      <el-form-item style="width:60%;">
        <i class="el-icon-link leftIcon"></i>
        <el-link class="category">客户分类</el-link><span>-</span>
        <el-link>客户名称</el-link><i class="el-icon-link rightIcon"></i>
      </el-form-item> -->
      <el-form-item label="关联客户:" class="redStar">
        <Customer :customId="customId" :linkTitle="linkTitle" @customerId="getAdmin"  class="formInp"/>
      </el-form-item>
      <el-form-item label="详细信息:" class="redStar">
        <div class="tableCon">
          <div class="table">
            <el-row>
              <el-col :span="4" maxlength="255">出发地</el-col>
              <el-col :span="8">
                <el-input v-model="from" class="bn" placeholder='请填写出发地'/>
              </el-col>
              <el-col :span="4" maxlength="255">目的地</el-col>
              <el-col :span="8">
                <el-input v-model="to" class="bn" placeholder='请填写目的地'/>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">出发时间</el-col>
              <el-col :span="8" class="iconP">
                <el-date-picker type="datetime" class="bn" style="width:100%;" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="start_time" placeholder='请选择'></el-date-picker>
              </el-col>
              <el-col :span="4">到达时间</el-col>
              <el-col :span="8" class="iconP">
                <el-date-picker type="datetime" class="bn" style="width:100%;" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="arri_time" placeholder='请选择'></el-date-picker>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">交通费</el-col>
              <el-col :span="8">
                <el-input v-model.number="trans_cash" class="bn" maxlength="8" placeholder='请填写交通费'/>
              </el-col>
              <el-col :span="4">住宿费用</el-col>
              <el-col :span="8">
                <el-input v-model.number="accom_cash" class="bn" maxlength="8" placeholder='请填写住宿费用'/>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">餐饮费</el-col>
              <el-col :span="8">
                <el-input v-model.number="eat_cash" class="bn" maxlength="8" placeholder='请填写餐饮费'/>
              </el-col>
              <el-col :span="4">其他费用</el-col>
              <el-col :span="8">
                <el-input v-model.number="other_cash" class="bn" maxlength="8" placeholder='请填写其他费用'/>
              </el-col>
            </el-row>
          </div>
          <div>合计：{{ total }}（元）</div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="addBtns between">
          <div style="width:60%;">
            <div class="textarea font14-nobold-9">
              <el-button type="text" class="upBtn"><i class="el-icon-plus"></i>上传附件
                <input type="file" ref="file" id="file" @change="upChan" name="file" />
              </el-button>
              <!-- 支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB -->
            </div>
            <div style="margin-top:10px;color:#343434;">
              <!-- <p class="font14-isbold-3"></p> -->
              <div v-for="(item,index) in files" :key="index" class="fileItems">
                <i class='el-icon-folder' >{{item.name}}</i><span @click="delFileItem(index)">删除<i class='el-icon-delete'></i></span>
                <!-- <el-link :href="$baseURL+'/'+item.path" type="primary" :underline="false">下载</el-link> -->
              </div>
            </div>
          </div>
          <!-- <el-button type="text" style="height:38px;"><i class="el-icon-plus">添加事项</i></el-button> -->
        </div>
      </el-form-item>
      <!-- <el-form-item label="审批人:">
        <el-input class="formInp" v-model="check_man"></el-input>
      </el-form-item> -->
      <el-form-item label="审批人:" class="redStar">
        <div class="formInp">
          <!-- <Approval @approData="getApproData" /> -->
          <Approval :approvalId="approvalId" @approData="getApproData" :width='parseInt(250)' :placement='placement' />
          </div>
      </el-form-item>
      <el-form-item label="抄送:" class="">
        <div class="formInp">
          <!-- <Approval @approData="getApproData" /> -->
          <Approval :approvalId="approvalId" @approData="getApproDatacao" :width='parseInt(250)' :placement='placement' />
          </div>
      </el-form-item>


    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="Approval">提交</el-button>
      <el-button type="primary" @click="tempSave">暂存</el-button> 
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
  import Customer from "@/components/custom/radio.vue"
  import Department from "@/components/table/Departmentnoall.vue";
  import Approval from "@/components/staff/radio.vue";
  export default {
    components: {
      Department,
      Customer,
      Approval
    },
    data() {
      return {
        linkTitle:'添加',
        req_man: "",
        depart: "",
        thing: "",
        who: "",
        method: "",
        cash: "",
        check_man: "",
        from: "",
        to: "",
        start_time: "",
        arri_time: "",
        trans_cash: "",
        accom_cash: "",
        eat_cash: "",
        other_cash: "",
        total: 0,
        approval: '',//审批人
        approvalcao: '',//抄送
        approvalId: null,//审批人
        customer: '',//关联客户
        customId:null,//关联客户id
        educas: [],
        // value: '',
        files: [],
        file_ids: [],
        ids_str: '',
        placement: 'top',//弹框显示的位置
      };
    },
    methods: {
      // 部门
      getCustomerData(val) {
        console.log(val)
        this.depart = val//    // 部门

      },
      getAdmin(val) {
        console.log('你好')
        console.log(val)
        this.customer = val
      },
      delFileItem(index){
        this.files.splice(index,1)
        this.file_ids.splice(index,1)
      },
      // 上传
      upChan() {
        this.$http.upload(this.$refs.file.files[0]).then(res => {
          if (res.data.code == 1) {
            this.$message('上传成功')
            this.files.push({ name: this.$refs.file.files[0].name, msg: res.data.msg ,path:res.data.msg.path})
            this.file_ids.push(res.data.msg.id)
            // for (let i in this.file_ids) {
            //   if (i == this.file_ids.length - 1) {
            //     this.ids_str += this.file_ids[i]
            //   } else {
            //     this.ids_str += this.file_ids[i] + ','
            //   }
            // }
          }
        })
      },
      tempSave(){
        this.$http.post('approval/add', {
            token: localStorage.getItem('token'),
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
            reason: this.thing,
            matter: this.who,
            budget: this.method,
            from: this.from,
            to: this.to,
            begin_time: this.start_time,
            end_time: this.arri_time,
            // customer (关联客户), 
            vehicle: this.trans_cash,
            remarks: this.accom_cash,
            restaurant: this.eat_cash,
            other: this.other_cash,
            total: this.total,
            // file: this.ids_str,
            file:this.file_ids.join(','),
            customer: this.customer,
            approval: this.approval?this.approval:'',
            copy: this.approvalcao?this.approvalcao:'',
            type: 7,
            is_storage:1
          }).then(res => {
            this.$message(res.msg)
          })
      },
      Approval() {
        // ,  structure （部门id）, 
        // reason （报销事由）, 
        // matter (费用承担主体)，
        // budget （报销方式），
        // from （出发地），
        // to (目的地)，
        // begin_time (出发时间)，
        // end_time （到达时间）, 
        // customer (关联客户), 
        // vehicle （交通费用）, 
        // remarks （住宿费用）, 
        // restaurant （餐饮费用）, 
        // other （其他费用）, 
        // total （总金额）, 
        // approval （审批人）, 
        // type （7借支审批）
        if (!this.thing) {
          this.$message('请填写报销事由')
        } else if (!this.who) {
          this.$message('请填写费用承担主体')
        } else if (!this.$re.onlyCc(this.who)) {
          this.$message('费用承担主体必须是中文')
        } else if (!this.method) {
          this.$message('请填写报销方式')
        } else if (!this.$re.onlyCc(this.method)) {
          this.$message('报销方式必须是中文')
        } else if (!this.customer) {
          this.$message('请关联客户')
        } else if (!this.from) {
          this.$message('请填写出发地')
        } else if (!this.to) {
          this.$message('请填写目的地')
        } else if (!this.start_time) {
          this.$message('请选择出发时间')
        } else if (!this.arri_time) {
          this.$message('请选择到达时间')
        } else if (!this.trans_cash) {
          this.$message('请填写交通费用')
        } else if(!this.$re.onlyNum(this.trans_cash)){
          this.$message('交通费用只能是数字')
        }else if (!this.accom_cash) {
          this.$message('请填写住宿费用')
        } else if(!this.$re.onlyNum(this.accom_cash)){
          this.$message('住宿费用只能是数字')
        }else if (!this.eat_cash) {
          this.$message('请填写餐饮费')
        }else if(!this.$re.onlyNum(this.eat_cash)){
          this.$message('餐饮费只能是数字')
        }
        // else if (!this.other_cash) {
        //   this.$message('')
        // } 
        // else if (!this.total) {
        //   this.$message('')
        // } 
        // else if (!this.ids_str) {
        //   this.$message('')
        // }
        else if (!this.approval) {
          this.$message('请选择审批人')
        }
        // else if (!this.approvalcao) {
        //   this.$message('请选择抄送')
        // } 
        else {
          this.$http.post('approval/add', {
            token: localStorage.getItem('token'),
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
            reason: this.thing,
            matter: this.who,
            budget: this.method,
            from: this.from,
            to: this.to,
            begin_time: this.start_time,
            end_time: this.arri_time,
            // customer (关联客户), 
            vehicle: this.trans_cash,
            remarks: this.accom_cash,
            restaurant: this.eat_cash,
            other: this.other_cash,
            total: this.total,
            // file: this.ids_str,
            file:this.file_ids.join(','),
            customer: this.customer,
            approval: this.approval,
            copy: this.approvalcao,
            type: 7,
          is_storage:0
          }).then(res => {
            if (res.code == 1) {
              this.back()
              this.$message({
                message: res.msg,
                type: 'success'
              });
            } else {
              this.$message({
                message: '提交失败，请检查数据是否有误',
                type: 'warning'
              });
            }
          }).catch(res => {
            this.$message.error('请求失败');
          })
        }
      },
      detailData(id){
        this.applicationId = parseInt(id)
        this.$http.get('approval/look',{
          // token:this.$token,
          id:id
        }).then(res=>{
          this.thing = res.reason
          this.who = res.matter
          this.method = res.budget
          this.from = res.from
          this.to = res.to
          this.start_time = res.begin_time
          this.arri_time = res.end_time
          this.trans_cash =res.vehicle
          this.accom_cash = res.remarks
          this.eat_cash = res.restaurant
          this.other_cash = res.other
          this.total = res.total
          this.customer = res.customer
          this.customId = parseInt(res.customer[0].id)
          this.approval = res.approval
          this.approvalId = parseInt(res.approval)
          var files = res.file
          var array = []
          this.files = files
          for(var i of files){
            array.push(i.id)
          }
          this.file_ids = array

        })
      },
      // 获取审批人数据
      getApproData(val) {
        this.approval = val.user_id
      },
      getApproDatacao(val) {
        this.approvalcao = val.user_id
      }
    },
    created() {
      if(this.$route.query.id){
        this.detailData(this.$route.query.id)
      }
      this.req_man = JSON.parse(localStorage.getItem('login_status')).info.name
      this.$http.get('approval/check',{type:7}).then(res=>{
        if(res.code == 1){
          res = res.msg
          this.thing = res.reason
          this.who = res.matter
          this.method = res.budget
          this.from = res.from
          this.to = res.to
          this.start_time = res.begin_time
          this.arri_time = res.end_time
          this.trans_cash =res.vehicle
          this.accom_cash = res.remarks
          this.eat_cash = res.restaurant
          this.other_cash = res.other
          this.total = res.total
          this.customer = res.customer
          this.customId = parseInt(res.customer[0].id)
          this.approval = res.approval
          this.approvalId = parseInt(res.approval)
          var files = res.file
          var array = []
          this.files = files
          for(var i of files){
            array.push(i.id)
          }
          this.file_ids = array
        }
      })
    },
    watch: {
      'trans_cash': function (newVal) {
        console.log(newVal)
        console.log(this.accom_cash)
        if (typeof (this.trans_cash) != 'number') {
          return this.total = '交通费用为数字'
          console.log('数字')
        }
        this.total = newVal + this.accom_cash + this.eat_cash + this.other_cash
      },
      'accom_cash': function (newVal) {
        console.log(newVal)
        if (typeof (this.accom_cash) != 'number') {
          return this.total = '住宿费用为数字'
          console.log('数字')
        }
        this.total = newVal + this.trans_cash + this.eat_cash + this.other_cash
      },
      'eat_cash': function (newVal) {
        console.log(newVal)
        if (typeof (this.eat_cash) != 'number') {
          return this.total = '餐饮费为数字'
          console.log('数字')
        }
        this.total = newVal + this.trans_cash + this.accom_cash + this.other_cash
      },
      'other_cash': function (newVal) {
        console.log(newVal)
        if (typeof (this.other_cash) != 'number') {
          return this.total = '其他费用为数字'
          console.log('数字')
        }
        this.total = newVal + this.trans_cash + this.accom_cash + this.eat_cash
      }
    }
  };
</script>
<style lang="less" scoped>
  .newReimb {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
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

  .el-row {
    border-right: 1px solid #ccc;
  }

  .tableCon {
    border: 1px solid #ccc;
    padding: 20px;
  }

  .table {
    text-align: center;
    margin: 20px 0;
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

  .addBtns {
    margin: 20px 0;
    font-size: 14px;
    color: #409EFF;
  }

  .formInp {
    width: 60%;
  }

  .date_icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .iconP {
    position: relative;
  }

  .textarea {
    position: relative;
  }
  .fileItems{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#409EFF;
  }
</style>
<style>
  .bn .el-input__inner {
    border: none !important;
    height: 38px;
    line-height: 38px;
  }
</style>