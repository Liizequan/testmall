<template>
  <div class="members">
    <div class="topBtns">
      <div class="leftBtns">
        <el-button type="primary" @click="createNew">
          <i class="el-icon-plus">新建工资单</i>
        </el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==0?'is-el-blue':''" @click="tabChan(0)">全部</el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==1?'is-el-blue':''" @click="tabChan(1)">已确认</el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==2?'is-el-blue':''" @click="tabChan(2)">未确认</el-button>
      </div>
      <div class="right">
        搜索：
        <el-input suffix-icon="el-icon-search" placeholder="员工姓名" class="search" v-model="searchVal"></el-input>
        <!-- @input="inputSearch" -->
        日期：
        <el-date-picker v-model="dateVal" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          <!-- :picker-options="pickerOptions" -->
        </el-date-picker>
        <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
        <!-- 日期:
        <el-input
          suffix-icon="el-icon-date"
          class="search"
          v-model="dateVal"
        ></el-input> -->
      </div>
    </div>
    <div class="selects">
      <!-- <div>
        月份：<el-select v-model="selectVal">
          <el-option labe="one" value="one"></el-option>
          <el-option labe="two" value="two"></el-option>
        </el-select>
      </div> -->
      <!-- <p class="flex-items-center between"> -->
      <!-- 月份：
          <el-date-picker v-model="dateVal"  format="yyyy-MM" value-format="yyyy-MM"  type="month" placeholder="选择月">
        </el-date-picker> -->
      <!-- 日期：
        <el-date-picker v-model="dateVal" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker> -->
      <!-- </p> -->
      <div style="text-align:right;display: block;width:100%;">
        <!-- <el-link :underline="false"><i class="el-icon-upload2" style="position:relative;">导入<input type="file" @change="fileSel" id="file" ref="file"></i></el-link> -->
        <el-link :underline="false"><i class="el-icon-download ml" @click="output">导出</i></el-link>
        <el-link :underline='false' class="ml20" @click="delAll"><i class='el-icon-delete'></i>批量删除</el-link>
      </div>
    </div>
    <el-table :data="tableData" @selection-change="selChan" stripe
    :header-cell-style="$store.state.headStyle">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="薪资月份" prop="create_time"></el-table-column>
      <el-table-column label="基本工资" prop="base"></el-table-column>
      <el-table-column label="其他应发" prop="other"></el-table-column>
      <el-table-column label="应扣款项" prop="deduction"></el-table-column>
      <el-table-column label="实发工资" prop="wages"></el-table-column>
      <el-table-column label="确认状态" prop="status" :filters="[
          { text: '已确认', value: '已确认' },
          { text: '待确认', value: '待确认' }
        ]"
        :filter-method="statusChan"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="toDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i></el-link>
          <el-link v-if="deleteWagesheet" :underline='false' type='primary' class='ml20' @click="delAll(scope.row.id)">删除<i
              class='el-icon-delete'></i> </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="res?res.data.total:0" class="busiPage"
      @current-change="pageChan">
    </el-pagination>


    <!-- 新建工资单弹框 -->
    <el-dialog title="工资单" :visible.sync="dialogShow" width="60%">
      <el-form label-width="100px">
        <!-- <div>员工 -- 工资单 :</div> -->
        <el-form-item label="姓名" class="redStar">
          <!-- <el-input v-model="memberData.name"></el-input> -->
          <el-select v-model="memberData.name" placeholder="请选择" style="width:100%">
            <el-option v-for="(item,index) in isobjects" :key="index" :label="item.name" :value="item.user_id">
              <p>{{item.name}} </p>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位工资" class="redStar">
          <el-input maxlength="8" v-model="memberData.positionWage" placeholder='请填写岗位工资' @input="memberData.positionWage = $http.forNum(memberData.positionWage)"></el-input>
        </el-form-item>
        <el-form-item label="基本工资" class="redStar">
          <el-input maxlength="8" v-model="memberData.base" placeholder='请填写基本工资' @input="memberData.base = $http.forNum(memberData.base)"></el-input>
        </el-form-item>
        <el-form-item label="绩效工资" class="redStar">
          <el-input maxlength="8" v-model="memberData.merits" placeholder='请填写绩效工资' @input="memberData.positmeritsionWage = $http.forNum(memberData.merits)"></el-input>
        </el-form-item>
        <el-form-item label="津贴" class="redStar">
          <el-input maxlength="8" v-model="memberData.allowance" placeholder='请填写津贴' @input="memberData.allowance = $http.forNum(memberData.allowance)"></el-input>
        </el-form-item>
        <el-form-item label="奖金" class="redStar">
          <el-input maxlength="8" v-model="memberData.bonus" placeholder='请填写奖金' @input="memberData.bonus = $http.forNum(memberData.bonus)"></el-input>
        </el-form-item>
        <el-form-item label="出勤天数" class="redStar">
          <el-input maxlength="8" v-model="memberData.day" placeholder='请填写出勤天数' @input="memberData.day = $http.forNum(memberData.day)"></el-input>
        </el-form-item>
        <el-form-item label="其他应发" class="redStar">
          <el-input maxlength="8" v-model="memberData.other" placeholder='请填写其他应发' @input="memberData.other = $http.forNum(memberData.other)"></el-input>
        </el-form-item>
        <el-form-item label="所得税" class="redStar">
          <el-input maxlength="8" v-model="memberData.tax" placeholder='请填写所得税' @input="memberData.tax = $http.forNum(memberData.tax)"></el-input>
        </el-form-item>
        <el-form-item label="社保" class="redStar">
          <el-input maxlength="8" v-model="memberData.security" placeholder='请填写社保' @input="memberData.security = $http.forNum(memberData.security)"></el-input>
        </el-form-item>
        <el-form-item label="公积金" class="redStar">
          <el-input maxlength="8" v-model="memberData.provident" placeholder='请填写社保' @input="memberData.security = $http.forNum(memberData.security)"></el-input>
        </el-form-item>
        <el-form-item label="罚款"" class="redStar">
          <el-input maxlength="8" v-model="memberData.fine" placeholder='请填写社保' @input="memberData.security = $http.forNum(memberData.security)"></el-input>
        </el-form-item>
        <el-form-item label="其他扣款" class="redStar">
          <el-input maxlength="8" v-model="memberData.deduction" placeholder='请填写其他扣款' @input="memberData.deduction = $http.forNum(memberData.deduction)"></el-input>
        </el-form-item>
        <el-form-item label="本月实发" class="redStar">
          <el-input v-model="memberData.wages" placeholder='本月实发' disabled></el-input>
        </el-form-item>
      </el-form>
          <!-- <el-table :data="memberData" border style="width: 100%">
            <el-table-column prop="date" label="姓名">
              <template slot-scope="scope">
                <el-select v-model="scope.row.name" placeholder="请选择" style="width:100%">
                  <el-option v-for="(item,index) in isobjects" :key="index" :label="item.name" :value="item.user_id">
                    <p>{{item.name}} </p>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="基本工资">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.base">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="绩效工资">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.merits">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="津贴">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.allowance">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="奖金">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.bonus">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="出勤天数">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.day">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="其他应发">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.other">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="所得税">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.tax">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="社保">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.security">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="其他扣款">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.deduction">
              </template>
            </el-table-column>
            <el-table-column prop="address" label="本月实发">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.wages">
              </template>
            </el-table-column>
          </el-table> -->

          <!-- <div class="add-explain font14-nobold-9">
              <el-link :underline="false" type="info" @click="addTable"><i class="el-icon-plus font16-bold-9"></i> 新增人员</el-link>
          </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button @click="onSubmit" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="工资单详情" :visible.sync="detlDia">
      <el-form label-width="100px">
        <el-form-item label='姓名:'>{{detl.name}}</el-form-item>
        <el-form-item label='基本工资(+):'>{{detl.base}}</el-form-item>
        <el-form-item label='绩效工资(+):'>{{detl.merits}}</el-form-item>
        <el-form-item label='津贴(+):'>{{detl.allowance}}</el-form-item>
        <el-form-item label='奖金(+):'>{{detl.bonus}}</el-form-item>
        <el-form-item label='出勤天数:'>{{detl.day}}</el-form-item>
        <el-form-item label='其他应发(+):'>{{detl.other}}</el-form-item>
        <el-form-item label='所得税(-):'>{{detl.tax}}</el-form-item>
        <el-form-item label='社保(-):'>{{detl.security}}</el-form-item>
        <el-form-item label='公积金(-):'>{{detl.common}}</el-form-item>
        <el-form-item label='罚款(-):'>{{detl.fine}}</el-form-item>
        <el-form-item label='其他扣款(-):'>{{detl.deduction}}</el-form-item>
        <el-form-item label='本月实发:'>{{detl.wages}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bySearch: false,
        detlDia: false,
        pickerOptions: this.limitDateStart(),//日期筛选
        tabIndex: 0,
        dialogShow: false,
        searchVal: "",
        dateVal: "",
        selectVal: "",
        tableData: [],//页面数据
        // memberData: [{}],
        memberData:{
          name:'',
          base:'',
          merits:'',
          allowance: '',
          bonus: '',
          day:'',
          other: '',
          tax:'',
          security:'',
          deduction:'',
          wages:'',
          positionWage:'',//职位工资
          provident:'',//公积金
          fine:''//罚款
        },
        isobjects: '员工',
        res: '',
        detl: '',
        hasCondition: false,
        selected: ''
      };
    },
    watch:{
      'memberData':function(){
        // 岗位+基本+绩效+津贴+资金+其他应发-所得税-社保-其他扣款-公积金
        let m = this.memberData
        this.memberData.wages = 
        Number(m.positionWage)//岗位
        +Number(m.base)//基本
        +Number(m.merits)//绩效
        +Number(m.allowance)//津贴
        +Number(m.bonus)//资金
        +Number(m.other)//其他应发
        -Number(m.tax)//所得税
        -Number(m.security)//社保
        -Number(m.provident)//公积金
        -Number(m.fine)//罚款
        -Number(m.deduction)//其他扣款
      },
      memberData:{
        handler(){
          let m = this.memberData
          this.memberData.wages = 
          Number(m.positionWage)//岗位
          +Number(m.base)//基本
          +Number(m.merits)//绩效
          +Number(m.allowance)//津贴
          +Number(m.bonus)//资金
          +Number(m.other)//其他应发
          -Number(m.tax)//所得税
          -Number(m.security)//社保
          -Number(m.provident)//公积金
          -Number(m.fine)//罚款
          -Number(m.deduction)//其他扣款
        },
        deep:true
      }
    },
    methods: {
      statusChan(value,row){
        return value==row.status
      },
      search(page) {
        if (!this.dateVal) {
          this.$message('请选择时间')
          return
        }
        this.bySearch = true
        this.$http.get('wages/searchall', {
          token: localStorage.getItem('token'),
          begin_time: this.dateVal[0] || '',
          end_time: this.dateVal[1] || '',
          name: this.searchVal,
          type: this.tabIndex + 1,
          page: this.$http.testNum(page) ? page : 1
        }).then(res => {
          this.tableData = res.data.data
          this.res = res
        })
      },
      selChan(e) {
        this.selected = e
      },
      delAll(id) {

        let reqBody = {
          token: localStorage.getItem('token')
        }
        if (this.$http.testNum(id)) {
          reqBody.id = id
        } else {
          if (!this.selected.length) {
            this.$message('请选择工资单')
            return
          }
          reqBody.id = this.$http.getIdsStrByObjArr(this.selected)
        }
        this.$http.conf().then(() => {
          this.$http.post('wages/delall', reqBody).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getList()
            }
          })
        })
      },
      inputSearch() {
        this.hasCondition = true
        this.$http.get('wages/searchname', {
          name: this.searchVal,
          type: this.tabIndex + 1,
          token: localStorage.getItem('token'),
          page: 1
        }).then(res => {
          this.tableData = res.data.data
          this.res = res
        })
      },
      pageChan(page) {
        if (!this.bySearch) {
          this.getList(page)
        } else {
          this.$http.get('wages/searchname', {
            name: this.searchVal,
            type: this.tabIndex + 1,
            token: localStorage.getItem('token'),
            page: page
          }).then(res => {
            this.tableData = res.data.data
            this.res = res
          })
        }
      },
      // 日期筛选器
      limitDateStart() {
        var _this = this;
        return {
          onPick(time) {
            var minDate = '', maxDate = '';
            if (time.minDate) {
              minDate = time.minDate.getFullYear() + '-' + (time.minDate.getMonth() + 1) + '-' + time.minDate.getDate()
            }
            if (time.maxDate) {
              maxDate = time.maxDate.getFullYear() + '-' + (time.maxDate.getMonth() + 1) + '-' + time.maxDate.getDate()
            }
            if (time.maxDate && time.maxDate) {
              this.$http.get('wages/search', {
                // token: this.$token,
                begin_time: minDate,
                end_time: maxDate
              }).then(res => {
                _this.tableData = res.data
                _this.res = res
                _this.tabIndex = null
              })
            }
          }
        }
      },
      tabChan(index) {
        this.tabIndex = index
        this.hasCondition = false
        this.bySearch = false
        this.getList()
      },
      createNew() {
        this.dialogShow = true;
      },
      toDetail(id) {
        this.$http.get('wages/look', {
          token: localStorage.getItem('token'),
          id: id
        }).then(res => {
          // this.$message(res.msg)
          // if(res.code == 1){
          // }
          
          this.detl = res.data
          this.detlDia = true
        })
      },
      getList(page) {
        // wages/mall
        var url = '';
        if (this.tabIndex == 0) {
          url = 'wages/mall'
        } else if (this.tabIndex == 1) {
          url = 'wages/mconfirm'
        } else {
          url = 'wages/unconfirmed'
        }
        this.$http.get(url, { token: localStorage.getItem("token"), page: page || 1 }).then(res => {
          this.tableData = res.data.data
          this.res = res
        })
      },
      // 新增
      addTable() {
        var table = JSON.parse(JSON.stringify(this.memberData));
        var newTable = [];
        for (let i of table) {
          newTable.push(i)
          if (newTable.length == table.length) {
            newTable.push({})
          }
        }
        this.memberData = newTable
      },


      // 确认新增工资单
      onSubmit() {
        var myreg = /^[0-9]{1,}(\.[0-9]{1,2})?$/;
        if (!this.memberData.name) {
          this.$message('请选择姓名')
        }else if (!this.memberData.positionWage) {
          this.$message('请填写岗位工资')
        } else if (!myreg.test(this.memberData.positionWage)) {
          this.$message('基本工资应为整数或最多两位小数')
        }else if (!this.memberData.base) {
          this.$message('请填写基本工资')
        } else if (!myreg.test(this.memberData.base)) {
          this.$message('基本工资应为整数或最多两位小数')
        }else if (!this.memberData.merits) {
          this.$message('请填写绩效工资')
        } else if (!myreg.test(this.memberData.merits)) {
          this.$message('绩效工资应为整数或最多两位小数')
        }else if (!this.memberData.allowance) {
          this.$message('请填写津贴')
        } else if (!myreg.test(this.memberData.allowance)) {
          this.$message('津贴应为整数或最多两位小数')
        }else if (!this.memberData.bonus) {
          this.$message('请填写奖金')
        } else if (!myreg.test(this.memberData.bonus)) {
          this.$message('奖金应为整数或最多两位小数')
        }else if (!this.memberData.day) {
          this.$message('请填写出勤天数')
        } else if (!myreg.test(this.memberData.day)) {
          this.$message('出勤天数应为整数或最多两位小数')
        }else if (!this.memberData.other) {
          this.$message('请填写其他应发')
        } else if (!myreg.test(this.memberData.other)) {
          this.$message('其他应发应为整数或最多两位小数')
        }else if (!this.memberData.tax) {
          this.$message('请填写所得税')
        } else if (!myreg.test(this.memberData.tax)) {
          this.$message('所得税应为整数或最多两位小数')
        }else if (!this.memberData.security) {
          this.$message('请填写社保')
        } else if (!myreg.test(this.memberData.security)) {
          this.$message('社保应为整数或最多两位小数')
        }else if (!this.memberData.provident) {
          this.$message('请填写公积金')
        } else if (!myreg.test(this.memberData.provident)) {
          this.$message('公积金应为整数或最多两位小数')
        }else if (!this.memberData.fine) {
          this.$message('请填写罚款')
        } else if (!myreg.test(this.memberData.fine)) {
          this.$message('罚款应为整数或最多两位小数')
        }else if (!this.memberData.deduction) {
          this.$message('请填写其他扣款')
        } else if (!myreg.test(this.memberData.deduction)) {
          this.$message('其他扣款应为整数或最多两位小数')
        }
        //else if (!this.memberData.wages) {
        //   this.$message('请填写本月实发')
        // } 
        // else if (!myreg.test(this.memberData.wages)) {
        //   this.$message('本月实发应为整数或最多两位小数')
        // }
        else{
          this.$http.post('wages/add', {
          // token: this.$token,
          user_id: this.memberData.name,
          base: this.memberData.base,
          merits: this.memberData.merits,
          allowance: this.memberData.allowance,
          bonus: this.memberData.bonus,
          day: this.memberData.day,
          other: this.memberData.other,
          tax: this.memberData.tax,
          security: this.memberData.security,
          deduction: this.memberData.deduction,
          wages: this.memberData.wages,
          postwage:this.memberData.positionWage,
          common:this.memberData.provident,
          fine:this.memberData.fine
        }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.getList()
            this.dialogShow = false
          }
        })
        }
        
      },
      // 导入
      fileSel() {
        let file = this.$refs.file.files[0]
        let arr = file.name.split('.')
        let ext = arr[arr.length - 1]
        if (ext == 'xlsx') {
          // localStorage.setItem('idForWage',this.list[0].user_id)
          this.$http.uploadFile(file, '/wages/index').then(res => {
            this.$message(res.data.msg)
            if (res.data.code == 1) {
            }
          })
        }
      },
      // 导出
      output() {
        this.$http.downloadFile('wages/out')
      },
      getMenber() {
        this.$http.get('user/userlist', { token: localStorage.getItem("token") }).then(res => {
          this.isobjects = res.data
        })
      }
      // 
    },
    created() {
      this.deleteWagesheet = this.$http.allow('财务删除工资单')
      this.getList()
      this.getMenber()
    }
  };
</script>
<style lang="less" scoped>
  .members {
    box-sizing: border-box;
    padding: 0;
  }

  .btn {
    border: none;
    background: none !important;
  }

  .btn:hover {
    background: none !important;
  }

  .dialog {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    div {
      width: 24%;
      height: 50px;
    }
  }

  input {
    border: 3px solid transparent;
    width: 100%;
    text-align: center;
  }

  .search {
    width: 200px;
  }

  .selects {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-date-editor.el-input__inner {
    width: 280px;
  }
  .el-table__row>td:nth-of-type(1)>div:nth-of-type(1){
    height: 40px !important;
  }
</style>