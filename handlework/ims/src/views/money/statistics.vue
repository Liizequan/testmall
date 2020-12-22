<template>
  <div class="statistics contain">
    <div class="topBtns">
      <div class="leftBtns">
        <el-button type="primary" @click="createNew" v-if="newmoresheet">
          <i class="el-icon-plus">新建提成单</i>
        </el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==0?'is-el-blue':''" @click="tabChan(0)">全部</el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==1?'is-el-blue':''" @click="tabChan(1)">已确认</el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==2?'is-el-blue':''" @click="tabChan(2)">未确认</el-button>
        <el-button class="btn font16-bold-3" :class="tabIndex==3?'is-el-blue':''" @click="tabChan(3)">我的提成</el-button>
      </div>
      <div class="right">
        搜索：
        <el-input suffix-icon="el-icon-search" placeholder="员工姓名" class="search" v-model="searchVal" maxlength="4">
        </el-input>
        <!-- @input="inputSearch" -->
        日期：
        <el-date-picker v-model="dateVal" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          <!-- :picker-options="pickerOptions" -->
        </el-date-picker>
        <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="selects">
      <div style="text-align:right;display: block;width:100%;">
        <el-link :underline="false"><i class="el-icon-download ml" @click="output">导出</i></el-link>
        <el-link :underline='false' class="ml20" @click="delAll"><i class='el-icon-delete'></i>批量删除</el-link>
      </div>
    </div>
    <el-table :data="tableData" @selection-change="selChan" stripe :header-cell-style="$store.state.headStyle">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="业务类型" prop="type"></el-table-column>
      <el-table-column label="业务名称" prop="name"></el-table-column>
      <el-table-column label="部门" prop="structure"></el-table-column>
      <el-table-column label="销售额" prop="sales"></el-table-column>
      <el-table-column label="本月提成" prop="month"></el-table-column>
      <el-table-column label="实发提成" prop="real"></el-table-column>
      <el-table-column label="客户名称" prop="customer"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-link :underline='false' type='primary' @click="seeDetl(scope.row.id)">详情<i
                class='el-icon-arrow-right'></i> </el-link>
            <el-link :underline='false' type='primary' class='ml20' @click="delAll(scope.row.id)">删除<i
                class='el-icon-delete'></i> </el-link>
          </div>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background layout="prev, pager, next" :total="res?res.total:0" class="busiPage"
      @current-change="pageChan" :page="1">
    </el-pagination>


    <!-- 新建工资单弹框 -->
    <el-dialog title="业务提成" :visible.sync="dialogShow" width="60%">
      <el-form label-width="100px">
        <el-form-item label="日期" class="redStar">
          <el-date-picker v-model="memberData.date" class="el_date" placeholder='请选择'></el-date-picker>
        </el-form-item>
        <el-form-item label="业务类型" class="redStar">
          <el-select placeholder="请选择" v-model="memberData.type" class="el_date">
            <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称" class="redStar">
          <el-input v-model="memberData.name" maxlength="15" placeholder='请填写业务名称'></el-input>
        </el-form-item>
        <el-form-item label="业务人员" class="redStar">
          <menRadio :excuters="men" @theRes="chanExcu">
            <template slot="title">
              <h3>业务人员</h3>
            </template>
            <template slot="main">
              <el-input v-model="radioRes.name" placeholder='请选择'></el-input>
            </template>
          </menRadio>
        </el-form-item>
        <el-form-item label="部门" class="redStar">
          <!-- <el-select v-model="memberData.depart" class="el_date">
            <el-option v-for="(item,index) in departs" :key="index" :value="item.id" :label="item.label" v-if="index">
              {{item.label}}</el-option>
          </el-select> -->
          <el-input v-model="radioRes.depart" disabled placeholder='部门'></el-input>
        </el-form-item>
        <el-form-item label="销售额" class="redStar">
          <el-input v-model="memberData.sales" maxlength="8" placeholder='请填写销售额'></el-input>
        </el-form-item>
        <el-form-item label="业务提成" class="redStar">
          <el-input v-model="memberData.busiMore" maxlength="8" placeholder='请填写业务提成'></el-input>
        </el-form-item>
        <el-form-item label="中后台提成" class="redStar">
          <el-input v-model="memberData.codeMore" maxlength="8" placeholder='请填写中后台提成'></el-input>
        </el-form-item>
        <el-form-item label="应收提成" class="redStar">
          <el-input v-model="memberData.shouldMore" maxlength="8" placeholder='请填写应收提成'></el-input>
        </el-form-item>
        <el-form-item label="预留部分" class="redStar">
          <el-input v-model="memberData.remain" maxlength="8" placeholder='请填写预留部分'></el-input>
        </el-form-item>
        <el-form-item label="本月提成" class="redStar">
          <el-input v-model="memberData.monthMore" maxlength="8" placeholder='请填写本月提成'></el-input>
        </el-form-item>
        <el-form-item label="扣税费(%)" class="redStar">
          <el-input v-model="memberData.cut" maxlength="8" placeholder='请填写扣税费'></el-input>
        </el-form-item>
        <el-form-item label="实发提成" class="redStar">
          <el-input v-model="memberData.realMore" maxlength="8" placeholder='请填写实发提成'></el-input>
        </el-form-item>
        <el-form-item label="客户名称" class="redStar">
          <cusRadio :customs="customs" @setRes="getRes">
            <template>
              <div slot="title">
                <h3>客户名称</h3>
              </div>
            </template>
            <template>
              <div slot="main">
                <el-input class="el_date" v-model="cusRadio.name" placeholder='请选择'></el-input>
              </div>
            </template>
          </cusRadio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onSubmit" type="primary">确定</el-button>
        <el-button @click="dialogShow = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提成单详情" :visible.sync="detlDia">
      <el-form label-width="140px" style="text-align:left;">
        <el-form-item label='日期:'>{{detl.date}}</el-form-item>
        <el-form-item label='业务类型:'>{{detl.type}}</el-form-item>
        <el-form-item label='业务名称:'>{{detl.name}}</el-form-item>
        <el-form-item label='业务人员:'>{{detl.user_id}}</el-form-item>
        <el-form-item label='部门:'>{{detl.structure}}</el-form-item>
        <el-form-item label='销售额:'>{{detl.sales}}</el-form-item>
        <el-form-item label='业务提成(+):'>{{detl.achievement}}</el-form-item>
        <el-form-item label='中后台提成(+):'>{{detl.stage}}</el-form-item>
        <el-form-item label='应收提成(+):'>{{detl.receivable}}</el-form-item>
        <el-form-item label='预留部分(-):'>{{detl.reserve}}</el-form-item>
        <el-form-item label='本月提成(+):'>{{detl.month}}</el-form-item>
        <el-form-item label='扣税费(-):'>{{detl.tax}}</el-form-item>
        <el-form-item label='实发提成:'>{{detl.real}}</el-form-item>
        <el-form-item label='客户名称:'>{{detl.customer}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="detl.status!='待确认'">已确认</el-button>
        <el-button @click="finish" type="primary" v-else>确定</el-button>
        <el-button @click="detlDia = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import menRadio from '@/components/menRadiocopy.vue'
  import cusRadio from '@/components/cusRadio.vue'
  export default {
    data() {
      return {
        user_id:"",
        customs: '',
        departs: '',
        types: '',
        bySearch: false,
        detlDia: false,
        pickerOptions: this.limitDateStart(),//日期筛选
        tabIndex: 0,
        dialogShow: false,
        searchVal: "",
        dateVal: "",
        selectVal: "",
        tableData: [],//页面数据
        memberData: {
          date: '',
          type: '',
          name: '',
          man: '',
          depart: '',
          sales: '',
          busiMore: '',
          codeMore: '',
          shouldMore: '',
          remain: '',
          monthMore: '',
          cut: '',
          realMore: '',
          cusName: ''
        },
        isobjects: '员工',
        res: '',
        detl: '',
        hasCondition: false,
        selected: '',
        men: '',
        radioRes: '',
        cusRadio: ''
      };
    },
    components: { menRadio, cusRadio },
    methods: {
      finish() {
        this.$confirm('信息是否正确？', '提示', {
          ConfirmButtonText: '确定',
          CancelButtonText: '取消'
        }).then(() => {
          this.$http.post('royalty/comfirm', {
            id: this.detl.id
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.detlDia = false
            }
          })
        })
      },
      seeDetl(id) {
        this.detlDia = true
        this.$http.get('royalty/look', { id: id }).then(res => {
          this.detl = res.msg
        })
      },
      getRes(res) {
        console.log(res)
        this.cusRadio = res
      },
      getCustoms() {
        this.$http.get('marketing/group', {}).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.customs = res
        })
      },
      getDeparts() {
        this.$http.get('index/structure').then(res => {
          this.departs = res
        })
      },
      chanExcu(res) {
        console.log(res)
        this.radioRes = res
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.men = res
        })
      },
      getTypes() {
        this.$http.get('/Workorder/type', { token: localStorage.getItem('token') }).then(res => {
          this.types = res
        })
      },
      statusChan(value, row) {
        return value == row.status
      },
      search(page) {
        if (!this.dateVal) {
          this.$message('请选择时间')
          return
        }
        this.bySearch = true
        this.$http.get('royalty/searchall', {
          begin_time: this.dateVal[0] || '',
          end_time: this.dateVal[1] || '',
          name: this.searchVal,
          type: this.tabIndex + 1,
          page: this.$http.testNum(page) ? page : 1
        }).then(res => {
          this.tableData = res.data.data
          this.res = res.data
        })
      },
      selChan(e) {
        this.selected = e
      },
      delAll(id) {
        let reqBody = {}
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
          this.$http.post('royalty/delall', reqBody).then(res => {
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
          this.detl = res.data
          this.detlDia = true
        })
      },
      getList(page) {
        // wages/mall
        var url = '';
        if (this.tabIndex == 0) {
          url = 'royalty/all'
        } else if (this.tabIndex == 1) {
          url = 'royalty/mconfirm'
        } else if (this.tabIndex == 2) {
          url = 'royalty/unconfirmed'
        } else {
          url = "royalty/index"
        }
        this.$http.get(url, { token: localStorage.getItem("token"), page: page || 1 }).then(res => {
          this.tableData = res.msg.data
          this.res = res.msg
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
        var myreg = /^[0-9]*$/;
        if (!this.memberData.date) {
          this.$message('请选择日期')
        } else if (!this.memberData.type) {
          this.$message('请选择业务类型')
        } else if (!this.memberData.name) {
          this.$message('请填写业务名称')
        } else if (!this.radioRes) {
          this.$message('请选择业务人员')
        }
        // else if (!this.memberData.depart) {
        //   this.$message('请选择部门')
        // } 
        else if (!this.memberData.sales || !myreg.test(this.memberData.sales)) {
          this.$message('销售额应为数值')
        } else if (!this.memberData.busiMore || !myreg.test(this.memberData.busiMore)) {
          console.log(this.memberData.busiMore)
          this.$message('业务提成应为数值')
        } else if (!this.memberData.codeMore || !myreg.test(this.memberData.codeMore)) {
          this.$message('中后台提成应为数值')
        } else if (!this.memberData.shouldMore || !myreg.test(this.memberData.shouldMore)) {
          this.$message('应收提成应为数值')
        } else if (!this.memberData.remain || !myreg.test(this.memberData.remain)) {
          this.$message('预留部分应为数值')
        } else if (!this.memberData.monthMore || !myreg.test(this.memberData.monthMore)) {
          this.$message('月提成应为数值')
        } else if (!this.memberData.cut || !myreg.test(this.memberData.cut)) {
          this.$message('扣税费应为数值')
        }
        // else if(/^\d{1,2}(\.\d{1,2})?$/){

        // }
        else if (!this.memberData.realMore || !myreg.test(this.memberData.realMore)) {
          this.$message('实发提成应为数值')
        } else if (!this.cusRadio) {
          this.$message('请选择客户名称')
        } else {
          let type
          for (let i in this.types) {
            if (this.types[i].id == this.memberData.type) {
              type = this.types[i].label
            }
          }
          this.$http.post('royalty/add', {
            date: this.memberData.date,
            type: type,
            name: this.memberData.name,
            user_id: this.radioRes.id,
            structure: this.radioRes.departId,
            sales: this.memberData.sales,
            achievement: this.memberData.busiMore,
            stage: this.memberData.codeMore,
            receivable: this.memberData.shouldMore,
            reserve: this.memberData.remain,
            month: this.memberData.monthMore,
            tax: this.memberData.cut,
            real: this.memberData.realMore,
            customer: this.cusRadio.id
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
        this.$http.downloadFile('royalty/out')
      },
      getMenber() {
        this.$http.get('user/userlist', { token: localStorage.getItem("token") }).then(res => {
          this.isobjects = res.data
        })
      }
      // 
    },
    watch: {
      $route() {
        this.getList()
        this.getMenber()
        this.getTypes()
        this.getMen()
        this.getDeparts()
        this.getCustoms()
      }
    },
    created() {
      this.newmoresheet = this.$http.allow('添加业务提成')
      this.user_id = JSON.parse(localStorage.getItem('login_status')).info.user_id
      this.getList()
      this.getMenber()
      this.getTypes()
      this.getMen()
      this.getDeparts()
      this.getCustoms()
    }
  };
</script>
<style lang="less" scoped>
  .statistics {
    box-sizing: border-box;
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

  .el-table__row>td:nth-of-type(1)>div:nth-of-type(1) {
    height: 40px !important;
  }

  .search.el-input--suffix {
    width: 120px;
  }

  .el-date-editor.el-range-editor {
    width: 250px;
  }
</style>