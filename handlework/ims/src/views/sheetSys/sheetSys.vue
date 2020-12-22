<template>
  <div class="sheetSys contain">
    <div v-if="this.$route.path == '/sheetSys'">
      <div class="topBtns">
        <!-- <el-button type="primary" @click="newSheet"><i class="el-icon-plus">新建工作单</i></el-button> -->
        <div>
          搜索：<el-input placeholder="搜索项目名称" class="search" v-model="searchVal" @change="search"></el-input>
          <el-button type="primary" style="margin-left:10px;" @click="getList">全部</el-button>
        </div>
      </div>
      <div class="tar">
        <el-link :underline='false' @click="delAll"><i class='el-icon-delete'>批量删除</i></el-link>
      </div>
      <el-table :data="tempData" @selection-change="selChan" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="项目名称" prop="title"></el-table-column>
        <el-table-column label="优先级" prop="priority"></el-table-column>
        <el-table-column label="执行部门" prop="structure"></el-table-column>
        <el-table-column label="执行人" prop="executor"></el-table-column>
        <el-table-column label="任务状态" prop="status"></el-table-column>
        <el-table-column label="开始时间" prop="begin_time" width="200"></el-table-column>
        <el-table-column label="负责人" prop="charge"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="primary" @click="toDetail(scope.row.id)">详情 <i class='el-icon-arrow-right'></i> </el-link>
            <el-link :underline='false' type='primary' class='ml20' @click="delAll(scope.row.id)">
              删除<i class='el-icon-delete'></i>
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev,pager,next" :total="total" class="busiPage" @current-change="pageChan">
      </el-pagination>
      <el-dialog :visible.sync="dialogShow" title="请选择">
        <div class="dialog">
          <div v-for="(item,index) in typesArr" :key="index" @click="toCreate(index)">
            <img :src="item.img" />
            <div>{{item.label}}</div>
          </div>
          <!-- <div @click="toCreate(1)">
            <img :src="imgUrl" />
            <div>网站小程序任务</div>
          </div>
          <div @click="toCreate(2)">
            <img :src="imgUrl" />
            <div>平面电商任务</div>
          </div>
          <div @click="toCreate(3)">
            <img :src="imgUrl" />
            <div>投资理财</div>
          </div>
          <div @click="toCreate(4)">
            <img :src="imgUrl" />
            <div>工商财税任务</div>
          </div> -->
        </div>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgUrl: require("@/assets/logo.png"),
        dialogShow: false,
        searchVal: "",
        tableData: [],
        tempData: [],
        typesArr: [],
        res: '',
        total: 0,
        selected: ''
      };
    },
    methods: {
      delAll(id) {

        if (this.$http.testNum(id)) {//单独删除
          this.$http.conf().then(() => {
            this.$http.post('workorder/delall', {
              token: localStorage.getItem('token'),
              id: id
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getList()
              }
            })
          })
        } else {//批量删除
          if (this.selected.length) {
            this.$http.conf().then(() => {
              this.$http.post('workorder/delall', {
                token: localStorage.getItem('token'),
                id: this.$http.getIdsStrByObjArr(this.selected)
              }).then(res => {
                this.$message(res.msg)
                if (res.code == 1) {
                  this.getList()
                }
              })
            })
          } else {
            this.$message('请选择工单')
          }
        }
      },
      selChan(e) {
        this.selected = e
      },
      pageChan(page) {
        // this.tempData = this.$http.getCur(page,this.tableData)
        this.getList(page)
      },
      search(value) {
        this.$http.post('workorder/search', { token: localStorage.getItem('token'), keyword: value }).then(res => {
          this.tableData = res.msg
          this.tempData = res.msg.slice(0, 10)
        })
      },
      toCreate(index) {
        this.$router.push({ path: '/sheetSys/newSheet', query: { index: index } })
      },
      newSheet() {
        this.$router.push({ path: '/sheetSys/newSheet' })
        // this.dialogShow = true;
        // this.$router.push("/sheetSys/newSheet");
      },
      toDetail(id) {
        this.$router.push({ path: "/sheetSys/sheetDetl", query: { id: id } });
      },
      getList(page) {
        this.$http.get('workorder/index', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          // this.tableData = res.msg
          // this.tempData = res.msg.slice(0,10)
          this.res = res
          this.total = res.msg.total
          this.tempData = res.msg.data
        })
      },
      getTypes() {
        this.$http.get('/Workorder/type', { token: localStorage.getItem('token') }).then(res => {
          this.typesArr = res
        })
      }
    },
    watch: {
      $route(){
      this.getList()
      this.getTypes()}
    },
    created() {
      this.getList()
      this.getTypes()
      this.$bus.$on('listInit', () => {
        this.getList()
      })
      this.$bus.$emit('setIndex',6)
    }
  };
</script>
<style lang="less" scoped>
  .sheetSys {
    position: relative;
  }

  .search {
    width: 300px;
    display: inline-block;
  }

  .dialog>div {
    width: 24%;
    height: 50px;
    display: inline-block;
  }

  .dialog img {
    width: 80%;
    height: auto;
  }
  .tar{
    margin-bottom:10px;
  }
</style>