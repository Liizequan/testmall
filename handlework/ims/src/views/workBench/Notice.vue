<template>
  <div class="notice">
    <!-- 我是公告栏 -->
    <div class="contain notice-child" v-if="this.$route.path == '/notice'">
      <!-- 头部 -->
      <div class="top">
        <div class="left">
          <el-button type='primary' @click="goto" v-if="newGonggao"><i class="el-icon-plus"></i>新建公告</el-button>
        </div>
        <div class="right between flex-items-center">
          <p>搜索</p>
          <el-input placeholder="请输入公告标题" prefix-icon="el-icon-search" v-model="searchText" circle @change="searChan"
            style="margin:0 20px;">
          </el-input>
          <el-link @click="batchDelete" :underline="false" v-if="deleteGonggaoAll"><i class="el-icon-delete"></i>批量删除</el-link>
        </div>
      </div>
      <!-- 表格 -->
      <div class="is-table">
        <el-table ref="multipleTable" :data="tempData" tooltip-effect="dark" style="width: 100%;text-align:center"
          @selection-change="handleSelectionChange" :default-sort="{prop: 'date', order: 'descending'}" stripe
          :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="content" label="创建人" width="180">
          </el-table-column>
          <el-table-column sortable prop="create_time" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="status" label="当前状态" width="180">
          </el-table-column>
          <el-table-column label="操作" width="180" class="btn">
            <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" style="margin-right:20px;"
                @click="goNoticeDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i></el-link>
              <el-link :underline="false" type="primary" @click="del(scope.row.id)" v-if="deleteGonggaoSingle">删除<i class="el-icon-delete"></i>
              </el-link>
              <!-- <div @click="goNoticeDetail(tableData[scope.$index].id)">
                        <a href="javascript:;" style="color:#409EFF;text-decoration: none;">详情 <i class="el-icon-arrow-right"></i> </a>
                    </div> -->

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <!-- <el-pagination background layout="prev, pager, next" :total="tableData.length" prev-text='上一页' next-text='下一页' @current-change="pageChan">
            </el-pagination> -->

        <el-pagination background layout="prev, pager, next" :total="res.total" style="padding-top:30px;"
          @current-change="pageChan">
        </el-pagination>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // headStyle:{'background-color': '#f5dcdc'},
        //   搜索内容
        searchText: "",
        tableData: [],
        tempData: [],
        isNotice: true,
        res: '',
        arrId: []
      };
    },
    methods: {
      handleSelectionChange(val) {
        var arrId = [];
        for (let i of val) {
          arrId.push(i.id)
          this.arrId = arrId
        }
      },
      // 单条删除
      del(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('index/delnoctice', { id: id, token: localStorage.getItem('token') }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()
            }
          })
        }).catch(() => {
        });
      },
      // 批量删除
      batchDelete() {
        console.log('批量')
        console.log(this.arrId)
        if (this.arrId.length) {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('index/delallnoctice', { id: this.arrId.join(','), token: localStorage.getItem('token') }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getList()
              }
            })
          }).catch(() => {
          });
        } else {
          this.$message('请选择删除公告')
        }
      },
      searChan(value) {
        this.$http.get('index/searchnoctice', {
          token: localStorage.getItem('token'),
          keyword: value
        }).then(res => {
          this.res = Object.assign({ total: 1, res })
          this.tempData = res
        })
      },
      pageChan(page) {
        // this.tempData = this.$http.getCur(page,this.tableData)
        this.getList(page)
      },
      formatter(row, column) {
        return row.address;
      },
      //前往添加
      goto() {
        // console.log('添加')
        this.$router.push('/notice/add')
      },
      // 前往详情
      goNoticeDetail(index, rows) {
        // console.log('详情')
        // console.log(index)//下标或者详情id
        // console.log(rows)
        this.$router.push('/notice/detail/' + index)
      },
      getList(page) {
        this.$http.get('index/indexnoctice', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.res = res
          var res = res.data
          this.tableData = res
          this.tempData = res.slice(0, 10)
        })
      }

    },
    // 开始
    created() {
      this.deleteGonggaoSingle = this.$http.allow('删除公告（单条）')
      this.deleteGonggaoAll = this.$http.allow('删除公告（批量）')
      this.newGonggao = this.$http.allow('新建公告')
      this.getList()
      this.$http.get('index/structure').then(res => {
        console.log(res)
      })
    },
    // 监听路由
    watch: {
      $route(to, from) {
        this.getList()
      }
    }
  };
</script>
<style lang="less" scoped>
  .rightBtns {
    text-align: right;
    padding-bottom: 20px;
  }

  .notice-child {
    // padding:40px;
    position: relative;

    .top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 30px;

      .left .el-icon-plus {
        font-weight: bold;
        padding-right: 4px;
      }

      .right {
        width: 400px;
        align-items: center;

        .el-input {
          flex: 1;
          margin-left: 10px;
          border-radius: 30px;
        }
      }
    }
  }

  .stripeClass {
    background: red;
  }
</style>