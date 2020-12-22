<template>
  <div class="store contain">
    <div v-if="this.$route.path == '/store'">
      <div class="topBtns">
        <div v-if="addGoods">
          <!-- <el-button type="primary" @click="openIn">
            入库
          </el-button>
          <el-button @click="openOut">出库</el-button> -->
          <el-button type="primary" @click="openIn">添加物品</el-button>
        </div>
        <div>
          搜索：<el-input suffix-icon="el-icon-search" class="search" v-model="searchVal" placeholder="物品名称"></el-input>
          日期筛选：<el-date-picker type="daterange" range-separator="至" v-model="dateVal" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
          <!-- <el-select class="search" v-model="selectVal">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="入库" value="入库"></el-option>
            <el-option label="出库" value="出库"></el-option>
          </el-select> -->
          <el-button type="primary" style="margin:0 10px;" @click="search">搜索</el-button>
          <el-button type="primary" @click="getList" style="margin-right:10px;margin-left:0;">全部</el-button>
          <i class="el-icon-upload2" style="position:relative;" v-if="inputgoods">导入<input type="file" @change="fileSel" id="file"></i>
          <i class="el-icon-download ml" @click="output" v-if="outputgoods">导出</i>
        </div>
      </div>
      <div style="text-align:right;margin-bottom:10px;" v-if="deleteAll">
        <el-link :underline='false' @click="delAll"><i class='el-icon-delete'>批量删除</i></el-link>
      </div>
      <el-table :data="tableData" @selection-change="selChan" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="物品" prop="name"></el-table-column>
        <el-table-column label="编码" prop="no"></el-table-column>
        <el-table-column label="数量" prop="num"></el-table-column>
        <el-table-column label="单位" prop="unit"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="toDetail(scope.row.id)">详情 <i class='el-icon-arrow-right'></i> </el-link>
            <el-link :underline='false' type='primary' class='ml20' @click="delAll(scope.row.id)">删除<i
                class='el-icon-delete'></i></el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev,pager,next" background :total="res.total" @current-change="pageChan" class="page">
      </el-pagination>
    </div>
    <router-view></router-view>
    <el-dialog :visible.sync="inDia" title="入库">
      <el-form label-width="120px">
        <el-form-item label="编码:" class="redStar">
          <el-input maxlength="20" v-model="inForm.code" placeholder="相同物品编码需相同，系统以编码来区分归类物品"></el-input>
        </el-form-item>
        <el-form-item label="物品名称:" class="redStar">
          <el-input maxlength="15" v-model="inForm.name" placeholder='请输入物品名称'></el-input>
        </el-form-item>
        <el-form-item label="型号:" class="">
          <el-input maxlength="20" v-model="inForm.model" placeholder='请输入物品型号'></el-input>
        </el-form-item>
        <el-form-item label="数量:" class="redStar">
          <el-input v-model="inForm.num" maxlength="10" placeholder='请输入数量'></el-input>
        </el-form-item>
        <el-form-item label="单位:" class="redStar">
          <el-input v-model="inForm.unit" maxlength="1" placeholder='请输入单位'></el-input>
        </el-form-item>
        <el-form-item label="单价:" class="">
          <el-input v-model="inForm.price" maxlength="10" placeholder='请输入单价'></el-input>
        </el-form-item>
        <!-- <el-form-item label="总价:">
          <el-input v-model="inForm.total"></el-input>
        </el-form-item> -->
        <el-form-item label="入库时间:" class="redStar">
          <el-date-picker suffix-icon="el-icon-date" class="el_date" v-model="inForm.time" placeholder='请选择'></el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" class="">
          <el-input type="textarea" v-model="inForm.other" maxlength="255" placeholder='请填写备注'></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="inConf">确定</el-button>
        <el-button @click="inDia = false">取消</el-button>
      </div class="tac">
    </el-dialog>
    <el-dialog :visible.sync="outDia" title="出库">
      <el-form label-width="120px">
        <el-form-item label="物品名称:">黑色签字笔</el-form-item>
        <el-form-item label="编码:">B001</el-form-item>
        <el-form-item label="型号:">
          <el-select class="el_date" v-model="outForm.model">
            <el-option label="one" value="one"></el-option>
            <el-option label="two" value="two"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存:">120支</el-form-item>
        <el-form-item label="数量:">
          <el-input v-model="outForm.num"></el-input>
        </el-form-item>
        <el-form-item label="单位:">支</el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="outForm.other"></el-input>
        </el-form-item>
        <el-form-item label="审批人:">
          <el-input v-model="outForm.checker"></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="outConf">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        res: '',
        page: 1,
        inDia: false,
        outDia: false,
        tableData: [],
        searchVal: "",
        dateVal: "",
        selectVal: "",
        inForm: {
          code: '',
          name: '',
          model: '',
          num: '',
          unit: '',
          price: '',
          total: '',
          time: '',
          other: ''
        },
        outForm: {
          model: '',
          num: '',
          other: '',
          checker: ''
        },
        selected: ''
      };
    },
    methods: {
      selChan(e) {
        this.selected = e
      },
      delAll(id) {
        
          let reqBody = {}
          if (this.$http.testNum(id)) {
            reqBody.id = id
          } else {//批量
            if (!this.selected.length) {
              this.$message('请选择客户')
              return
            }
            reqBody.id = this.$http.getIdsStrByObjArr(this.selected)
          }
        this.$http.conf().then(res => {
          this.$http.post('warehouse/delall', reqBody).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getList()
            }
          })
        })
      },
      fileSel(e) {
        let file = e.target.files[0]
        let arr = file.name.split('.')
        let ext = arr[arr.length - 1]
        console.log(typeof file)

        if (ext == 'xlsx') {
          // this.$http.post('warehouse/import', {
          //   token: localStorage.getItem('token'),
          //   file: file
          // }).then(res => {

          // })
          this.$http.uploadFile(file, '/warehouse/import').then(res => {
            this.$message(res.data.msg)
            if (res.data.code == 1) {
              this.getList()
            }
          })
        }
      },
      output() {
        // const a = document.createElement('a')
        // document.body.appendChild(a);
        // a.setAttribute('download', '')
        // a.setAttribute('href', this.$baseURL + '/warehouse/export')
        // a.setAttribute('id', 'downloadBtn')
        // document.body.removeChild(document.getElementById('downloadBtn'))
        // a.click();
        this.$http.downloadFile('/warehouse/export')
        // axios({
        //   method: 'get',
        //   url: this.$baseURL + '/warehouse/export',
        //   responseType: 'blob'
        // }).then(res => {
        //   console.log(res)
        //   var blob = res.data
        //   var reader = new FileReader();
        //   reader.readAsDataURL(blob)
        //   reader.onload = function (e) {
        //     const a = document.createElement('a')
        //     a.download = '仓库.xlsx'
        //     a.href = e.target.result
        //     a.click()
        //   }


        // axios({
        //   method: 'get',
        //   url: this.$baseURL + '/warehouse/export',
        //   responseType: 'blob'
        // }).then(res => {
        //   const content = res.data
        //   const blob = new Blob([content])
        //   const fileName = '下载的文件.xlsx'
        //   if ('download' in document.createElement('a')) {
        //     const elink = document.createElement('a')
        //     elink.download = fileName
        //     elink.style.display = 'none'
        //     elink.href = URL.createObjectURL(blob)
        //     document.body.appendChild(elink)
        //     elink.click()
        //     URL.revokeObjectURL(elink.href)
        //     document.body.removeChild(elink)
        //   } else {
        //     navigator.msSaveBlob(blob, fileName)
        //   }
        // })
      },
      search() {
        if (!this.searchVal) {
          this.$message('请输入关键字')
          return
        } else if (!this.dateVal) {
          this.$message('请选择时间')
          return
        }
        this.$http.get('warehouse/search', {
          keyword: this.searchVal,
          begin_time: this.dateVal[0],
          end_time: this.dateVal[1]
        }).then(res => {
          this.res = res.msg
          this.tableData = res.msg.data
        })
      },
      outConf() {
        // this.$http.post('')
      },
      inConf() {
        if (!this.inForm.code) {
          this.$message('请填写编码')
          return
        }else if(this.$re.hasCc(this.inForm.code)){
          this.$message('编码不能有中文')
          return
        }
        if (!this.inForm.name) {
          this.$message('请填写物品名称')
          return
        }
        // else if(!this.$re.onlyCcEn(this.inForm.name)){
        //   this.$message('物品名称只能有中英文')
        //   return
        // }
        // if (!this.inForm.model) {
        //   this.$message('请填写型号')
        //   return
        // }
        // else if(!this.$re.onlyne(this.inForm.model)){
        //   this.$message('型号只能有英文和数字')
        //   return
        // }
        if (!this.inForm.num) {
          this.$message('请填写数量')
          return
        }
        else if(!this.$re.onlyNum(this.inForm.num)){
          this.$message('数量有误')
          return
        }
        if (!this.inForm.unit) {
          this.$message('请填写单位')
          return
        }else if(!this.$re.onlyCc(this.inForm.unit)){
          this.$message('单位只能有中文')
          return
        }
        // if (!this.inForm.price) {
        //   this.$message('请填写单价')
        //   return
        // }
        // else if(!this.$re.mtf(this.inForm.price)){
        //   this.$message('单价有误')
        //   return
        // }
        if (!this.inForm.time) {
          this.$message('请填写入库时间')
          return
        }
        // if (!this.inForm.other) {
        //   this.$message('请填写备注')
        //   return
        // }
        this.$http.post('warehouse/put', {
          token: localStorage.getItem('token'),
          no: this.inForm.code,
          name: this.inForm.name,
          num: this.inForm.num,
          unit: this.inForm.unit,
          model: this.inForm.model,
          price: this.inForm.price,
          create_time: this.inForm.time,
          remark: this.inForm.other
        }).then(res => {
          if (res.code == 1) {
            this.inDia = false
            this.getList()
          }
          this.$message(res.msg)
        })
      },
      toDetail(id) {
        console.log(id)
        this.$router.push({ path: "/store/goodDetl", query: { id: id } });
      },
      openIn() {
        this.inDia = true;
      },
      openOut() {
        this.outDia = true;
      },
      getList(page) {
        this.$http.get('warehouse/index', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.res = res
          this.tableData = res.data
        })
      },
      pageChan(page) {
        this.getList(page)
      }
    },
    watch:{
      $route(){
        this.getList()
      }
    },
    created() {
      this.addGoods = this.$http.allow('添加物品')
      this.deleteAll = this.$http.allow('批量删除物品')
      this.outputgoods = this.$http.allow('物品导出')
      this.inputgoods = this.$http.allow('物品导入')
      this.getList()
    }
  };
</script>
<style lang="less" scoped>
  .store {
    text-align: left;
  }

  .search {
    width: 150px;
    margin: 0 10px;
  }

  .record {
    margin-left: 10px;
  }

  .page {
    text-align: center;
    margin-top: 10px;
  }

  #file {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
  }

  .tac {
    text-align: right !important;
  }
  
</style>