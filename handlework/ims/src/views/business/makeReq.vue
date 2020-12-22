<template>
  <div class="makeReq contain">
    <div v-if="this.$route.path == '/makeReq'">
      <div class="topBtns">
        <div class="leftBtns">
          <el-button type="primary" @click="createNew"><i class="el-icon-plus"></i> 新建立项</el-button>
          <el-button :type="all==0?'primary':''" @click="selAll">全部立项申请</el-button>
          <el-button :type="all==1?'primary':''" @click="selMy">我的立项申请</el-button>
          <el-button :type="all==2?'primary':''" @click="myCheck">我审批的</el-button>
        </div>
        <div class="rightBtns" v-if="all==1">
          <el-link :underline='false'><i class="el-icon-delete" @click="delAll">批量删除</i></el-link>
          <!-- <i class="el-icon-upload2 ml">导入</i> -->
          <!-- <i class="el-icon-download ml">导出</i> -->
        </div>
      </div>
      <el-table :data="tableData" @selection-change="selChan" stripe :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="项目名称" prop="title"></el-table-column>
        <el-table-column label="项目概述" prop="desc"></el-table-column>
        <el-table-column label="客户名称" prop="customer.name"></el-table-column>
        <el-table-column label="项目负责人" prop="charge"></el-table-column>
        <el-table-column label="立项时间" sortable prop="begin_time"></el-table-column>
        <el-table-column label="合同金额（￥）" prop="total"></el-table-column>
        <el-table-column label="申请人" prop="applicant"></el-table-column>
        <el-table-column label="项目类型" prop="type"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <div class="dpf">
              <el-link type="primary" @click="toDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i> </el-link>
              <el-link v-if="all==1" type="primary" @click="del(scope.row.id)" class="ml20">删除<i class='el-icon-delete'></i></el-link>
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
        res: '',
        selected: ''
      };
    },
    methods: {
      myCheck() {
        this.all = 2
        this.$http.get('project/myapproval').then(res => {
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
          this.$http.post('project/delall', {
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
      pageChan(page) {
        // this.tempData = this.$http.getCur(page,this.tableData)
        if (this.all) {
          this.getList(page)
        } else {
          this.getMyList(page)
        }
      },
      selAll() {
        this.all = 0
        this.getList()
      },
      selMy() {
        this.all = 1
        this.getMyList()
      },
      createNew() {
        this.$router.push("/makeReq/newBusi");
      },
      toDetail(id) {
        this.$router.push({ path: "/makeReq/busiDetl", query: { id: id } });
      },
      getList(page) {
        this.$http.get('project/index', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.tableData = res.data
          this.res = res
          // this.tempData = res.slice(0, 10)
        })
      },
      getMyList(page) {
        this.$http.get('project/my', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.tableData = res.data
          this.res = res
          // this.tempData = res.slice(0,10)
        })
      },
      del(id) {
        this.$http.conf().then(() => {
          this.$http.post('project/del', {
            token: localStorage.getItem('token'),
            id: id
          }).then(res => {
            this.$message(res.msg)
            if (this.all==0) {
              this.getList()
            } else if (this.all==1){
              this.getMyList()
            }else if (this.all==2){
              this.myCheck()
            }
          })
        })
      }
    },
    watch: {
      $route(){
        this.all = 0
        this.getList()
      }
    },
    created() {
      this.all = 0
      this.getList()
      this.$bus.$off()
      this.$bus.$on('getList', () => {
        this.getList()
      })
    }
  };
</script>
<style lang="less" scoped>
  .makeReq {
    position: relative;
  }
  /deep/.el-link--primary>.el-link--inner{
    display: flex;
    align-items: center;
    width: 50px;
  }
  .is-underline.el-link--primary{
    height: 24px;
  }
</style>