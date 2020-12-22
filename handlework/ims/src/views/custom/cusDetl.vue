<template>
  <div class="cusDetl ">
    <div class="between">
      <div>
        <h4 class="font18-bold-3">{{cusData.name}}</h4>
      </div>
      <div class="right">
        <!-- <el-button type="primary" class="check">审核</el-button> -->
        <el-button-group>
          <el-button icon="el-icon-arrow-left"></el-button>
          <el-button icon="el-icon-arrow-right"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="attach font14-nobold-7">
      <span>客户归属：{{cusData.user_id}}</span><span>首要联系人：{{cusData.contacts}}</span><span>最后更新时间：{{cusData.update_time}}</span>   
    </div>
    <div class="line_title font14-bold-3">基础信息</div>
    <div class="table cusDetlEdit font14-nobold-3 huitable">
      <el-row>
        <el-col :span="4">客户名称</el-col>
        <el-col :span="8">{{cusData.name}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.name" :value="cusData.name"/> -->
          <!-- <div style="background:#fff;">{{cusData.name}}</div> -->
        </el-col>
        <el-col :span="4">所属行业</el-col>
        <el-col :span="8">{{cusData.industry}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.industry" :value="cusData.industry"/> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">归属人员</el-col>
        <el-col :span="8">{{cusData.already}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.already" :value="cusData.already "/>    -->
        </el-col>
        <el-col :span="4">所属地区</el-col>
        <el-col :span="8">{{cusData.region}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.region" :value="cusData.region"/>  -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">企业组织代码</el-col>
        <el-col :span="8">{{cusData.code}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.code" :value="cusData.code"/>    -->
        </el-col>
        <el-col :span="4">详细地址</el-col>
        <el-col :span="8">{{cusData.address}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.address" :value="cusData.address"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">法定代表人身份证</el-col>
        <el-col :span="8">{{cusData.code2}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.code2" :value="cusData.code2"/>    -->
        </el-col>
        <el-col :span="4">官方网站</el-col>
        <el-col :span="8">{{cusData.website}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.website" :value="cusData.website"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">客户类型</el-col>
        <el-col :span="8">{{cusData.type}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.type" :value="cusData.type"/>    -->
        </el-col>
        <el-col :span="4">--</el-col>
        <el-col :span="8">
          <!-- <el-input type="text" :disabled="isEdit"/>    -->
        </el-col>
      </el-row>
    </div>

    <div class="line_title font14-bold-3">首要联系人</div>
    <div class="table cusDetlEdit font14-nobold-3 huitable">
      <el-row>
        <el-col :span="4">联系人</el-col>
        <el-col :span="8">{{cusData.contacts}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.contacts" :value="cusData.contacts"/>    -->
        </el-col>
        <el-col :span="4">生日</el-col>
        <el-col :span="8">{{cusData.birthday}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.birthday" :value="cusData.birthday"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">性别</el-col>
        <el-col :span="8">{{cusData.gender}}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.gender" :value="cusData.gender"/>    -->
        </el-col>
        <el-col :span="4">更新时间</el-col>
        <el-col :span="8">
          {{ cusData.update_time }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.update_time" :value="cusData.update_time"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">
          {{ cusData.phone }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.phone" :value="cusData.phone"/>    -->
        </el-col>
        <el-col :span="4">固定电话</el-col>
        <el-col :span="8">
          {{ cusData.tel }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.tel" :value="cusData.tel"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">微信/QQ</el-col>
        <el-col :span="8">
          {{ cusData.wechat }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.wechat" :value="cusData.wechat"/>    -->
        </el-col>
        <el-col :span="4">传真号码</el-col>
        <el-col :span="8">
          {{ cusData.fax }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.fax" :value="cusData.fax"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">电子邮箱</el-col>
        <el-col :span="8">
          {{ cusData.email }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.email" :value="cusData.email"/>    -->
        </el-col>
        <el-col :span="4">联系地址</el-col>
        <el-col :span="8">
          {{ cusData.address }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.address" :value="cusData.address"/>    -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">创建时间</el-col>
        <el-col :span="8">
          {{ cusData.create_time }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.create_time" :value="cusData.create_time"/>    -->
        </el-col>
        <el-col :span="4">--</el-col>
        <el-col :span="8">
          <!-- <el-input type="text" :disabled="isEdit"/>    -->
        </el-col>
      </el-row>
    </div>
    
    <div class="line_title  font14-bold-3">附加信息</div>
    <div class="table cusDetlEdit font14-nobold-3 huitable">
      <el-row>
        <el-col :span="4">潜在要求</el-col>
        <el-col :span="8">  
          {{ cusData.demand }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.demand" :value="cusData.demand"/> -->
        </el-col>
        <el-col :span="4">客户状态</el-col>
        <el-col :span="8">  
          {{ cusData.status }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.status" :value="cusData.status"/>   -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">客户来源</el-col>
        <el-col :span="8">  
          {{ cusData.source }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.source" :value="cusData.source"/>   -->
        </el-col>
        <el-col :span="4">客户备注</el-col>
        <el-col :span="8">  
          {{ cusData.remark }}
          <!-- <el-input type="text" :disabled="isEdit" v-model="cusData.remark" :value="cusData.remark"/>  -->
        </el-col>
      </el-row>
    </div>


    <div class="line_title font14-bold-3">业务信息</div>
    <div class="table font14-nobold-3" v-if="list&&list.length>0">
      <el-row id="topline">
        <el-col :span="2"></el-col>
        <el-col :span="4">合同编号</el-col>
        <el-col :span="4">合同名称</el-col>
        <el-col :span="4">合同金额（￥）</el-col>
        <el-col :span="5">签约负责人</el-col>
        <el-col :span="5">时间</el-col>
      </el-row>
      <el-row v-for="(item, index) in list" :key="index" id="contentline">
        <el-col :span="2">{{ index + 1 }}</el-col>
        <el-col :span="4">{{ item.num }}</el-col>
        <el-col :span="4">{{ item.name }}</el-col>
        <el-col :span="4">{{ item.cash }}</el-col>
        <el-col :span="5">{{ item.response }}</el-col>
        <el-col :span="5">{{ item.date }}</el-col>
      </el-row>
    </div>
    <div class="btm_btns">
      <el-button type="primary" @click="editData">编辑</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cusData: {},
      // cusName: "客户名称",
      // line: "34534",
      // interMan: "山东福利",
      // cusNum: "客户编号",
      // code: "个个人问过",
      // area: "是非得失",
      // detlAddr: "的时间浪费",
      // idCard: "里的谁发的",
      // website: "鲁大师",
      // type: "2019-23-23",
      // member: "3254",
      // contact: "2019-23-23",
      // birthday: "2019-23-23",
      // sex: "塑料袋",
      // position: "水电费",
      // phone: "鲁大师",
      // fixPhone: "了圣诞节",
      // wechat: "废物235345",
      // faxNum: "纷纷为",
      // email: "各位哥",
      // address: "方违反委托通过",
      // create_time: "绯闻绯闻绯闻 ",
      // update_time: "绯闻绯闻",
      // need: "风微风",
      // status: "为而分为",
      // resource: "为而分为",
      // other: "为而分为",
      list: [],
      isEdit:true,//是否编辑 true 禁止编辑  false 开启编辑
    };
  },
  methods: {
    // 编辑
    editData(){
      this.$router.push({path:"/customMana/newCustom", query:{
        id:this.$route.query.id
      }});
    },
    // marketing/look
    getCusDetlData(id){
      this.$http.get('marketing/look',{
        // token:this.$token,
        id:id
      }).then(res=>{
        // console.log(res)
        this.cusData = res
        this.$nextTick(()=>{
          let obj = JSON.parse(localStorage.getItem('industry'))
          console.log(obj)
          for(let i in obj){
            if(obj[i].id==res.industry){
              this.cusData.industry = obj[i].name
            }
          }
          let obj1 = JSON.parse(localStorage.getItem('guishurenyuan'))
          console.log(obj1)
          for(let i in obj1){
            if(obj1[i].user_id==res.user_id){
              this.cusData.user_id = obj1[i].name
            }
          }
        })
      })
    }
  },
  created() {
    // console.log(this.$route.query.id)
    this.getCusDetlData(this.$route.query.id)
  }
};
</script>
<style lang="less" scoped>
.cusDetl {
  text-align: left;
  box-sizing: border-box;
  padding-top: 0;
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
.huitable.table .el-row div:nth-of-type(1){
  background:#E4E7ED;
}
.huitable.table .el-row div:nth-of-type(3){
  background:#E4E7ED;
}
.huitable.table .el-row div:nth-of-type(2){
  background:#fff;
}
.huitable.table .el-row div:nth-of-type(4){
  background:#fff;
}
/deep/.el-input.is-disabled .el-input__inner {
    background-color: #fff !important;
    border-color: none !important;
    color: #000 !important;
    border:none;
    border-radius: 0;
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

.attach {
  color: #ccc;
  font-size: 14px;
  span{
    margin-right:30px;
  }
}

.btm_btns{
  margin-top:30px;
}
</style>
