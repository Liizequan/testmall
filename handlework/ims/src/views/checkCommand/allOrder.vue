<template>
  <div class="allOrder contain">
    <div v-if="this.$route.path == '/inAllOrder'">
      <div class="topBtns mb10">
        <div class="leftBtns">
          <!-- <el-button type="primary" @click="createNew"><i class="el-icon-plus"></i> 新增订单</el-button> -->
          <!-- <el-button :type="all?'primary':''" @click="getAll">全部订单</el-button> -->
          <!-- <el-button :type="!all?'primary':''" @click="getMy">我的订单</el-button> -->
        </div>
        <!-- <div class="rightBtns">
          <i class="el-icon-delete">刪除</i>
          <i class="el-icon-upload2 ml">导入</i>
          <i class="el-icon-download ml">导出</i>
        </div> -->
        <!-- <div class="rightBtns between font14-nobold-9">
          <el-link :underline="false"><span><i class="el-icon-upload2"></i>导入</span></el-link>
          <el-link :underline="false"><span><i class="el-icon-download"></i>导出</span></el-link>
          <el-link :underline="false" @click="delMem"><span><i class="el-icon-delete"></i>批量删除</span>
          </el-link>
        </div> -->
      </div>
      <el-table :data="tempData" @selection-change="tableChan" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="订单编号" prop="order_no"></el-table-column>
        <el-table-column label="客户名称" prop="customer"></el-table-column>
        <el-table-column label="项目类型" prop="type" :filters="proType" :filter-method="typeChan"></el-table-column>
        <el-table-column label="订单状态" prop="status" :filters="orderStatus" :filter-method="statusChan">
        </el-table-column>
        <el-table-column label="签单日期" prop="sign_time" sortable></el-table-column>
        <el-table-column label="合同金额（￥）" prop="total"></el-table-column>
        <!-- <el-table-column label="审核状态" prop="status"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="toDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i></el-link>
            <el-link type="primary" @click="del(scope.row.id)" style="margin-left:10px;" class="delRed"><i
                class='el-icon-delete'>删除</i></el-link>
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
        all: true,
        tableData: [],
        tempData: [],
        res: '',
        selected: '',
        proType: [],
        orderStatus: []
      };
    },
    methods: {
      statusChan(value, row) {
        return value==row.status
      },
      typeChan(value, row) {
        return row.type === value;
      },
      getOrderStatus() {
        this.$http.get('workorder/status').then(res => {
          for (let i in res) {
            this.orderStatus.push({ text: res[i].label, value: res[i].label })
          }
        })
      },
      getProType() {
        this.$http.get('Workorder/type').then(res => {
          for (let i in res) {
            this.proType.push({ text: res[i].label, value: res[i].label })
          }
        })
      },
      getAll(page) {
        this.getList(page)
        this.all = true
      },
      getMy(page) {
        this.getMyOrder(page)
        this.all = false
      },
      pageChan(page) {
        // this.tempData = this.$http.getCur(page,this.tableData)
        if (this.all) {
          this.getAll(page)
        } else {
          this.getMy(page)
        }
      },
      createNew() {
        this.$router.push("/allOrder/newOrder");
      },
      toDetail(id) {
        this.$router.push({ path: "/allOrder/orderDetl", query: { id: id } });
      },
      tableChan(e) {
        this.selected = e
        console.log(e)
      },
      del(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('order/del', { token: localStorage.getItem('token'), id: id }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                if (this.all) {
                  this.getList()
                } else {
                  this.getMyOrder()
                }
              }
            }
          })
        })
      },
      // 多删
      delMem() {
        this.$http.conf().then(() => {
          this.$http.post('order/delall', {
            id: this.$http.getIdsStrByObjArr(this.selected)
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getList()
            }
          })
        })
      },
      // 全部
      getList(page) {
        this.$http.get('order/index', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          // this.tableData = res
          // this.tempData = res.slice(0,10)
          this.res = res
          this.tempData = res.data
        })
      },
      // 我的
      getMyOrder(page) {
        this.$http.get('order/my', { token: localStorage.getItem('token'), page: page||1 }).then(res => {
          // this.tableData = res
          // this.tempData = res.slice(0,10)
          this.res = res
          this.tempData = res.data
        })
      }
    },
    watch: {
      $route(){
      this.getList()
      this.getProType()
      this.getOrderStatus()}
    },
    created() {
      this.getList()
      this.getProType()
      this.getOrderStatus()
      this.$bus.$on('newBack', () => {
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
  .allOrder {
    position: relative;

    .rightBtns {
      span {
        display: inline-block;
        padding: 5px;
      }
    }
  }
</style>