<template>
  <div class="contract contain">
    <div v-if="this.$route.path == '/contractincheck'">
      <!-- <div class="topBtns">
        <div class="leftBtns">
          <el-button type="primary" @click="createNew"><i class="el-icon-plus"></i> 新建合同</el-button>
          <el-button :type="all==0?'primary':''" @click="getAll">全部合同</el-button>
          <el-button :type="all==1?'primary':''" @click="getMy">我的合同</el-button>
            <el-button :type="all==2?'primary':''" @click="myCheck">我审批的</el-button>
        </div>
        <div class="rightBtns">
          <el-link :underline='false'><i class="el-icon-delete" @click="delAll">批量刪除</i></el-link>
        </div>
      </div> -->
      <el-table :data="tempData" @selection-change="selChan" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="合同编号" prop="order_no"></el-table-column>
        <el-table-column label="客户名称" prop="customer"></el-table-column>
        <el-table-column label="合同类型" prop="type" :filters="conTypes" :filter-method="typeChan"></el-table-column>
        <el-table-column label="合同状态" prop="status" :filters="conStatus" :filter-method="statusChan"></el-table-column>
        <el-table-column label="签单日期" sortable prop="sign_time"></el-table-column>
        <el-table-column label="合同金额" prop="total"></el-table-column>
        <el-table-column label="支付状态" prop="pay"></el-table-column>
        <el-table-column label="审批状态" prop="approval_status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="toDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i> </el-link>
            <el-link type="primary" @click="del(scope.row.id)" style="margin-left:10px;">删除<i
                class='el-icon-delete'></i></el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="tableData.length" class="busiPage"
        @current-change="pageChan">
      </el-pagination>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        all: 0,
        tableData: [],
        tempData: [],
        selected: '',
        conStatus: [],
        conTypes: []
      };
    },
    methods: {
      myCheck(){
        this.all = 2
        this.$http.get('contract/myapproval').then(res=>{
          this.tempData = res
        })
      },
      getConStatus() {
        this.$http.get('contract/statuslist').then(res => {
          for (let i in res) {
            this.conStatus.push({ text: res[i].label, value: res[i].label })
          }
        })
      },
      getConType() {
        this.$http.get('workorder/type').then(res => {
          for (let i in res) {
            this.conTypes.push({ text: res[i].label, value: res[i].label })
          }
        })
      },
      statusChan(value, row) {
        return value == row.statusChan
      },
      typeChan(value, row) {
        return value == row.type
      },
      selChan(e) {
        this.selected = e
      },
      delAll() {
        if(!this.selected.length){
          this.$message('请选择删除项')
          return
        }
        this.$http.conf().then(() => {
          this.$http.post('contract/delall', {
            id: this.$http.getIdsStrByObjArr(this.selected)
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getList()
            }
          })
        })
      },
      del(id) {
        this.$http.conf().then(() => {
          this.$http.post('contract/del', { token: localStorage.getItem('token'), id: id }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                if (this.all) {
                  this.getList()
                } else {
                  this.getMyCon()
                }
              }
            }
          })
        })
      },
      pageChan(page) {
        // this.tempData = this.$http.getCur(page, this.tableData)
        if (this.all) {
          this.getList(page)
        } else {
          this.getMyCon(page)
        }
      },
      getAll() {
        this.all = 0
        this.getList()
      },
      getMy() {
        this.all = 1
        this.getMyCon()
      },
      createNew() {
        this.$router.push("/contract/newContract");
      },
      toDetail(id) {
        this.$router.push({ path: "/contract/contractDetl", query: { id: id } });
      },
      getMyCon(page) {
        this.$http.get('contract/my', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          // this.tableData = res
          // this.tempData = res.slice(0, 10)
          this.tempData = res
        })
      },
      getList(page) {
        this.$http.get('contract/myapproval', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          // this.tableData = res
          // this.tempData = res.slice(0, 10)
          this.tempData = res
        })
      }
    },
    watch: {
      $route(){
      this.getList()
      this.getConType()
      this.getConStatus()}
    },
    created() {
      this.getList()
      this.getConType()
      this.getConStatus()
      this.$bus.$on('newConBack', () => {
        if (this.all) {
          this.getAll()
        } else {
          this.getMy()
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  .contract {
    position: relative;
  }
</style>