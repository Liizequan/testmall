<template>
  <div class="newCustom">
    <div class="topBtns">
      <h4>新建客户</h4>
      <div class="bitianstyle"><span>*</span>为必填项</div>
    </div>
    <el-row>
      <el-col :span="12" style="margin-right:30px; border-right:1px solid #909399">
        <div class="line_title">基础信息</div>
        <el-form label-width="140px" :model="form">
          <el-form-item label="客户名称:" class="redStar">
            <el-input v-model="form.cusName" maxlength="255" placeholder="请填客户名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="客户编号:" prop="cusNum">
            <el-input v-model="form.cusNum"></el-input>
          </el-form-item> -->
          <el-form-item label="企业组织代码:" class="">
            <el-input v-model="form.code" maxlength="18" placeholder="18位数字、大写字母(例:91440101MA5CQFW11W)"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人身份证:">
            <el-input v-model="form.idCard" maxlength="18" placeholder="请填法定代表人身份证"></el-input>
          </el-form-item>
          <el-form-item label="所属行业:" prop="line" class="redStar">
            <el-select class="el_date" v-model="form.line">
              <!-- <el-option value="1">1</el-option>
              <el-option value="2">2</el-option> -->
              <el-option v-for="(item,index) in industry " :key="index" :label="item.name" :value="item.id">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型:" prop="type" class="redStar">
            <el-select class="el_date" v-model="form.type">
              <!-- <el-option value="1">1</el-option>
              <el-option value="2">2</el-option> -->
              <el-option v-for="(item,index) in customerType " :key="index" :label="item.name" :value="item.id">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属地区:" prop="area" class="redStar">
            <!-- <el-select class="el_date" v-model="form.area">
              <el-option value="1">1</el-option>
              <el-option value="2">2</el-option>
            </el-select> -->
            <!-- <el-cascader :options="options" v-model="form.area" style="width:100%" :props="{ expandTrigger: 'hover' }"
    @change="handleChange">
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader> -->
            <el-cascader v-model="form.area" :options="options" style="width:100%"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址:">
            <el-input v-model="form.detlAddr" placeholder="请填详细地址"></el-input>
          </el-form-item>
          <el-form-item label="官方网站:">
            <el-input v-model="form.website" placeholder="请填官方网站"></el-input>
          </el-form-item>
          <el-form-item label="归属人员:" class="redStar">
            <!-- <el-select class="el_date" v-model="form.member">
              <el-option v-for="(item,index) in addressMen " :key="index" :label="item.name" :value="item.user_id">
                {{item.name}}
              </el-option>
            </el-select> -->
            <el-input :value="countMan" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="客户分类:">
              <el-select class="el_date" v-model="form.member">
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
              </el-select>
            </el-form-item> -->
          <div class="line_title line_titles">附加信息</div>
          <el-form-item label="潜在需求:" prop="need" class="redStar">
            <el-select class="el_date" v-model="form.need">
              <!-- <el-option value="1">1</el-option>
              <el-option value="2">2</el-option> -->
              <el-option v-for="(item,index) in potentialDemand " :key="index" :label="item.name" :value="item.id">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户来源:" prop="resource" class="redStar">
            <el-select class="el_date" v-model="form.resource">
              <el-option v-for="item in customerSource " :key="item" :label="item" :value="item">
                {{item}}
              </el-option>
            </el-select>
            <!-- <el-input v-model="form.resource"></el-input> -->
          </el-form-item>
          <el-form-item label="客户状态:" prop="status" class="redStar">
            <el-select class="el_date" v-model="form.status">
              <!-- <el-option value="1">1</el-option>
              <el-option value="2">2</el-option> -->
              <el-option v-for="(item,index) in customerStatus " :key="index" :label="item.name" :value="item.id">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户分组:" prop="group" class="redStar">
            <el-select class="el_date" v-model="form.group">
              <!-- <el-option value="1">1</el-option>
              <el-option value="2">2</el-option> -->
              <el-option v-for="(item,index) in customerClass " :key="index" :label="item.name" :value="item.id">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户备注:">
            <el-input type="textarea" placeholder="请填客户备注（255字之内）" v-model="form.other"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11">
        <div class="line_title">首要联系人</div>
        <el-form label-width="140px" :model="form">
          <el-form-item label="联系人:" prop="contact" class="redStar">
            <el-input v-model="form.contact" maxlength="4" placeholder="请填首要联系人（2~4位中文）"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio label="0" v-model="form.sex">未知</el-radio>
            <el-radio label="1" v-model="form.sex">先生</el-radio>
            <el-radio label="2" v-model="form.sex">女士</el-radio>
          </el-form-item>
          <el-form-item label="联系电话:" prop="phone" class="redStar">
            <el-input v-model="form.phone" placeholder="请填联系电话（11位数字）" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="微信/QQ:">
            <el-input v-model="form.wechat" placeholder="请填微信/QQ" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="生日:">
            <!-- <el-input v-model="form.birthday"></el-input> -->
            <el-date-picker v-model="form.birthday" type="date" placeholder="选择生日日期" style="width:100%;"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="电子邮箱:">
            <el-input v-model="form.email" placeholder="请填QQ/谷歌等有效邮箱"></el-input>
          </el-form-item>
          <el-form-item label="固定电话:">
            <el-input v-model="form.fixPhone" placeholder="请填固定电话" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="传真号码:">
            <el-input v-model="form.faxNum" placeholder="请填传真号码" maxlength="11"></el-input>
          </el-form-item>
          <!-- <el-form-item label="职务:">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="联系地址:">
            <el-input v-model="form.address"></el-input>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    <div class="footBtns">
      <el-button type="primary" @click="save">{{isEdit?'编辑':'创建'}}客户</el-button>
      <el-button @click="resetForm(form)">重置</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        countMan:'',
        form: {
          cusName: "",
          cusNum: "",
          code: "",
          idCard: "",
          line: "",
          // cusType: "",
          area: "",
          detlAddr: "",
          website: "",
          member: "",
          need: "",
          resource: "",
          status: "",
          other: "",
          contact: "",
          sex: '0',
          group: "",
          phone: "",
          wechat: "",
          birthday: "",
          email: "",
          fixPhone: "",
          faxNum: "",
          type: "",
          // position: "",
          address: ""
        },
        industry: [],//行业
        customerType: [],//客户类型
        options: [],//所属地址
        addressMen: [],//归属人员
        customerClass: [],//客户分类
        potentialDemand: [],//潜在需求
        customerSource: [
          '独立开发',
          '共享',
          '分配'
        ],//客户来源
        customerStatus: [
          { id: 1, name: "重要" },
          { id: 2, name: "普通" },
          { id: 3, name: "潜在" },
          { id: 4, name: "失败" },
        ],//客户状态


        isEdit: false,//是否为编辑 false不是编辑 true是编辑
      };
    },
    methods: {
      //保存
      save() {
        // this.$http.post('marketing/addcustomer',{
        //   token:localStorage.getItem('token'), name:this.cusName,
        //   email:this.email,
        //   phone:this.phone,
        //   company（公司），group（分组），desc
        // })
        //       token, user_id, type(10个人，20企业
        // ), name, code, industry,group, address,website,contacts, gender(0未知,1男.2女), phone, wechat, birthday, email, tel, fax, demand,source, remark

        var form = this.form
        var url = '';
        if (!form.cusName) {
          this.$message('请填客户名称')
        } 
        // else if (!this.$re.entprisCode(form.code)) {
        //   this.$message('企业组织机构代码,允许格式：91440101MA5CQFW11W')
        // } 
        // else if (!this.$re.idCode(form.idCard)) {
        //   this.$message('请输入有效的身份证')
        // } 
        else if (!form.line) {
          this.$message('请选择所属行业')
        } else if (!form.type) {
          this.$message('请选择客户类型')
        } else if (!form.area) {
          this.$message('请选择所在地区')
        } else if (!form.member) {
          this.$message('请选择归属人员')
        } else if (!form.need) {
          this.$message('请选择潜在需求')
        } else if (!form.resource) {
          this.$message('请填客户来源')
        } else if (!form.status) {
          this.$message('请选择客户状态')
        }
        else if (!form.group) {
          this.$message('请选择客户分组')
        }
        else if (!form.contact || !this.$re.tfCc(form.contact)) {
          this.$message('联系人为2~4位中文')
        } else if (!form.phone || !this.$re.isPhone(form.phone)){
          this.$message('请填联系电话')
        } else {
          var data = {
            // token: this.$token,
            user_id: form.member ? form.member : 0,//归属人员 1
            type: form.type,//类型 10 个人 20 企业  
            name: form.cusName,//客户名称
            code: form.code,//企业组织代码
            code2: form.idCard,//身份证
            industry: form.line,//行业
            group: form.group,//分组、客户类型
            region: form.area.join('-'),//地区
            address: form.detlAddr,//详细地址
            website: form.website,//网站
            contacts: form.contact,//联系人
            gender: form.sex,//性别
            phone: form.phone,//联系电话
            wechat: form.wechat,//微信
            birthday: form.birthday,//生日
            email: form.email,//邮箱
            tel: form.fixPhone,//固定电话
            fax: form.faxNum,//传真号码
            demand: form.need,//潜在需求
            source: form.resource,//客户来源
            remark: form.other,//客户备注
            status: form.status,//归属类型
          }
          if (!this.isEdit) {//true 添加
            url = 'marketing/add'
          } else {
            url = 'marketing/edit'
            data = Object.assign({ id: this.$route.query.id }, data)
          }
          this.$http.post(url, data).then(res => {
            if (res.code == 1) {
              this.$message(res.msg);
              this.$bus.$emit('addSuccess')
              let timer = setTimeout(() => {
                this.back()
                clearTimeout(timer)
              }, 500);
            } else {
              this.$message.error('添加失败');
            }
          })
        }
      },
      // 重置
      resetForm(formName) {
        this.form = {}
      },
      // 获取数据
      getCustomData() {
        // 行业数据
        this.$http.get('Marketing/industry').then(res => {
          this.industry = res
        })
        // 客户类型
        this.$http.get('Marketing/type').then(res => {
          this.customerType = res
        })
        // 客户需求
        this.$http.get('Marketing/demand').then(res => {
          this.potentialDemand = res
        })
        // 客户分组
        this.$http.get('marketing/grouplist').then(res => {
          this.customerClass = res
        })
        // 归属人员
        this.$http.get('user/index', {
          token: localStorage.getItem("token")
        }).then(res => {
          var addressMen = [];
          for (var i of res) {
            var user = i.user
            for (var j = 0; j < user.length; j++) {
              if (user[j]) {
                addressMen.push(user[j])
              }
            }
          }
          this.addressMen = addressMen
        })
        // 归属地区
        this.$http.get('Marketing/region').then(res => {
          for (var i in res) {
            res[i].value = res[i].label
            var newI = res[i].children
            for (var j in newI) {
              newI[j].value = newI[j].label
              var newJ = newI[j].children
              for (var z in newJ) {
                newJ[z].value = newJ[z].label
              }
            }
          }
          this.options = res
        })
      },
      getLook(id){
        this.$http.get('marketing/look', {
        // token: this.$token,
        id: id
      }).then(res => {
        var industry = JSON.parse(JSON.stringify(this.industry)),// 行业
          customerType = JSON.parse(JSON.stringify(this.customerType)),// 客户类型
          potentialDemand = JSON.parse(JSON.stringify(this.potentialDemand)),// 客户需求
          customerClass = JSON.parse(JSON.stringify(this.customerClass)),//客户分组
          addressMen = JSON.parse(JSON.stringify(this.addressMen)),// 归属人员
          customerStatus = JSON.parse(JSON.stringify(this.customerStatus));//客户状态
          // ------暂时无用代码start------
        // for (var i of industry) {
        //   if (i.name == res.industry) {
        //     this.form.line = i.id
        //   }
        // }
        // for (var i of addressMen) {
        //   if (i.name == res.user) {
        //     this.form.member = i.user_id
        //   }
        // }
        // this.new_user_id = res.user_id
        // ------暂时无用代码end------
        this.form.line = res.industry
        for (var i of customerType) {
          if (i.name == res.type) {
            this.form.type = i.id
          }
        }
        for (var i of potentialDemand) {
          if (i.name == res.demand) {
            this.form.need = i.id
          }
        }
        
        this.form.member = res.user_id
        for (var i of customerStatus) {
          if (i.name == res.status) {
            this.form.status = i.id
          }
        }

        this.form.cusName = res.name
        this.form.code = res.code2
        this.form.idCard = res.code2
        this.form.area = res.region.split('-')
        this.form.detlAddr = res.address
        this.form.website = res.website
        this.form.resource = res.source
        this.form.other = res.remark
        this.form.contact = res.contacts
        this.form.sex = res.gender == '未知' ? '0' : res.gender == '男' ? '1' : '2'
        this.form.group = res.group
        this.form.phone = res.phone
        this.form.wechat = res.wechat
        this.form.birthday = res.birthday
        this.form.email = res.email
        this.form.fixPhone = res.tel
        this.form.faxNum = res.fax
      })
      }
    },
    created() {
      this.countMan = JSON.parse(localStorage.getItem('login_status')).info.name
      this.$nextTick(()=>{
        this.form.member = JSON.parse(localStorage.getItem('login_status')).info.user_id
      })
      this.getCustomData()
      // 编辑信息
      var id = this.$route.query.id;
      if (id) {
        this.isEdit = true
        this.getLook(id)
      }
    }
  };
</script>
<style lang="less" scoped>
  form {
    padding-right: 50px;
  }

  .footBtns {
    padding-top: 30px;
    text-align: center;
  }

  .line_title {
    margin: 10px 0 30px;
  }

  .line_titles {
    margin-top: 30px;
  }
</style>