<template>
  <div class="arriConf contain">
    <div v-if="this.$route.path == '/inArriConf'">
      <div class="topBtns mb10">
        <div class="leftBtns">
          <!-- <el-button type="primary" @click="createNew"><i class="el-icon-plus"></i> 新建到账确认</el-button> -->
          <!-- <el-button :type="all==0?'primary':''" @click="getAll">全部到账确认</el-button>
          <el-button :type="all==1?'primary':''" @click="getMy">我的到账确认</el-button>
          <el-button :type="all==2?'primary':''" @click="myCheck">我审批的</el-button> -->
        </div>
        <div class="rightBtns">
          <el-link :underline='false'><i class="el-icon-delete" @click="delAll">批量刪除</i></el-link>
          <!-- <i class="el-icon-upload2 ml">导入</i> -->
          <!-- <i class="el-icon-download ml">导出</i> -->
        </div>
      </div>
      <el-table :data="tableData" @selection-change="selChan" stripe :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="客户名称" prop="customer"></el-table-column>
        <el-table-column label="订单/合同编号" prop="order_no"></el-table-column>
        <el-table-column label="订单/合同金额" prop="total"></el-table-column>
        <!-- <el-table-column label="打款时间" sortable prop="time"></el-table-column> -->
        <el-table-column label="已回款(￥)" prop="amount"></el-table-column>
        <el-table-column label="未回款(￥)" prop="no_amount"></el-table-column>
        <el-table-column label="业务名称" prop="business"></el-table-column>
        <el-table-column label="业务类型" prop="type"></el-table-column>
        <el-table-column label="审核状态" prop="is_status" width="90"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="dpf">
              <el-link type="primary" @click="toDetail(scope.row.id)" :underline="false">详情<i class='el-icon-arrow-right'></i></el-link>
              <el-link type="primary" @click="del(scope.row.id)" class="delBtn delRed" :underline="false">删除<i class='el-icon-delete'></i>
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="res.total" class="busiPage"
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
        res: ''
      };
    },
    methods: {
      myCheck() {
        this.all = 2
        this.$http.get('bill/myapproval').then(res => {
          this.tableData = res.data
          this.res = res
        })
      },
      delAll() {
        if (!this.selected.length) {
          this.$message('请选择删除项')
          return
        }
        this.$http.conf().then(() => {
          this.$http.post('bill/delall', {
            id: this.$http.getIdsStrByObjArr(this.selected)
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getList()
            }
          })
        })
      },
      selChan(e) {
        this.selected = e
      },
      del(id) {
        this.$http.conf().then(() => {
          this.$http.post('bill/del', { token: localStorage.getItem('token'), id: id }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                if (this.all) {
                  this.getList()
                } else {
                  this.getMyList()
                }
              }
            }
          })
        })

      },
      getAll() {
        this.all = 0
        this.getList()
      },
      getMy() {
        this.all = 1
        this.getMyList()
      },
      pageChan(page) {
        // this.tempData = this.$http.getCur(page, this.tableData)
        if (this.all) {
          this.getList(page)
        } else {
          this.getMyList(page)
        }
      },
      getList(page) {
        this.$http.get('bill/index', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.tableData = res.data
          this.res = res
          // this.tempData = res.slice(0, 10)
        })
      },
      getMyList(page) {
        this.$http.get('bill/my', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.tableData = res.data
          this.res = res
          // this.tempData = res.slice(0, 10)
        })
      },
      createNew() {
        this.$router.push("/arriConf/newConf");
      },
      toDetail(id) {
        this.$router.push({ path: "/arriConf/arriDetl", query: { id: id } });
      }
    },
    watch: {
      $route(){
      this.myCheck()}
    },
    created() {
      // this.getList()
      this.myCheck()
      this.$bus.$off()
      this.$bus.$on('confList', () => {
        if (this.all) {
          this.getList()
        } else {
          this.getMyList()
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  .arriConf {
    position: relative;
  }
</style>