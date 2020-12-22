<template>
  <div class="email">
    <!-- 我是公告栏 -->
    <div class="contain email-child" v-if="isShow">
      <!-- 头部 -->
      <div class="top">
        <div class="left">
          <el-button type='primary' @click="goto"><i class="el-icon-plus"></i>新建邮件</el-button>
        </div>
        <div class="center">
          <span style="padding-right:0;" v-for="(item,index) in navbar" :key="index"
            :class="index==navIndex?'is-el-blue':''" @click="emailBar(index)">
            <a href="javascript:;" :class="index==navIndex?'font16-bold-3 is-el-blue':'font16-bold-3'">{{item}}</a>
          </span>

        </div>
        <div class="right between">
          <!-- <el-button @click="goContact" style="margin:0 20px ">客户通讯录</el-button> -->
          <el-link @click="batchDelete" :underline="false"><i class="el-icon-delete"></i>批量删除</el-link>
        </div>
      </div>
      <!-- 表格 -->
      <div class="is-table" v-if="navIndex!=3">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align:center"
          :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange" stripe
          :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="send_man" label="发送人" width="180" v-if="navIndex==0">
          </el-table-column>
          <el-table-column prop="receiver" label="接收人" width="180" v-else>
          </el-table-column>
          <el-table-column prop="title" label="主题">
          </el-table-column>
          <el-table-column sortable prop="create_time" label="发送时间" width="180">
          </el-table-column>
          <el-table-column label="标星邮箱" width="180">
            <template slot-scope="scope">
              <div class="block" @click="startChange(tableData[scope.$index].id , tableData[scope.$index].newStart)">
                <el-rate v-model="tableData[scope.$index].star" :max="maxNum"></el-rate>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" class="btn">
            <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
            <template slot-scope="scope">
              <div>
                <!-- <el-link type="primary" @click="goNoticeDetail(tableData[scope.$index].id)" :underline="false">详情<i class="el-icon-arrow-right"></i> </el-link>
                            <el-link type="primary" @click="del(scope.row.id)">删除<i class="el-icon-delete"></i></el-link> -->

                <el-link :underline="false" type="primary" style="margin-right:20px;"
                  @click="goNoticeDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i></el-link>
                <el-link :underline="false" type="primary" @click="del(scope.row.id)">删除<i class="el-icon-delete"></i>
                </el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="is-table" v-if="navIndex==3">
        <template>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align:center"
          :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange" stripe
          :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="send_man" label="发送人" width="180" v-if="navIndex==0">
          </el-table-column>
          <el-table-column prop="receiver" label="发送人/接收人" width="180" v-else>
          </el-table-column>
          <el-table-column prop="title" label="主题">
          </el-table-column>
          <el-table-column sortable prop="create_time" label="发送时间" width="180">
          </el-table-column>
          <el-table-column label="标星邮箱" width="180">
            <template slot-scope="scope">
              <div class="block" @click="startChange(tableData[scope.$index].id , tableData[scope.$index].newStart)">
                <el-rate v-model="tableData[scope.$index].star" :max="maxNum"></el-rate>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" class="btn">
            <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
            <template slot-scope="scope">
              <div>
                <!-- <el-link type="primary" @click="goNoticeDetail(tableData[scope.$index].id)" :underline="false">详情<i class="el-icon-arrow-right"></i> </el-link>
                          <el-link type="primary" @click="del(scope.row.id)">删除<i class="el-icon-delete"></i></el-link> -->

                <el-link :underline="false" type="primary" style="margin-right:20px;"
                  @click="goNoticeDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i></el-link>
                <el-link :underline="false" type="primary" @click="del(scope.row.id)">删除<i class="el-icon-delete"></i>
                </el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        </template>
        
      </div>
      <!-- 分页 -->
      <div class="paging">
        <!-- <el-pagination background layout="prev, pager, next" :total="tableData.length" prev-text='上一页' next-text='下一页'>
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
        //   搜索内容
        searchText: '',
        navbar: ['收件箱', '已发送', '草稿箱', '回收站'],
        navIndex: 0,
        arrId: [],//多选人员

        // 星标
        start: null,
        maxNum: 1,

        res: '',
        tableData: [],

        isShow: true,
      }
    },

    methods: {
      // 前往详情
      goNoticeDetail(index, rows) {
        console.log('详情')
        // console.log(index)//下标或者详情id
        // console.log(rows)
        this.$router.push({ path: '/email/detail/' + index, query: { navIndex: this.navIndex } })
      },
      // 单条删除
      del(id) {
        var url = '',
          title = '';
        if (this.navIndex == 3) {
          url = 'email/comfirmdel'
          title = '此操作将永久删除, 是否继续?'
        } else {
          url = 'email/del'
          title = '此操作将加入回收站, 是否继续?'
        }
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url, {
            token: localStorage.getItem('token'),
            id: id
          }).then(res => {
            if (res.code == 1) {
              this.$message(res.msg)
              this.getEmailData()
            }
          })
        })
      },
      // 选择人员
      handleSelectionChange(val) {
        var arrId = [];
        for (let i of val) {
          arrId.push(i.id)
          this.arrId = arrId
        }
        console.log(arrId)
      },
      // 多条删除
      batchDelete() {
        console.log('批量删除')
        console.log(this.arrId)
        var url = '', title = '';
        console.log(this.navIndex)
        if (this.navIndex != '3') {
          console.log('不是3')
          url = 'email/delall'
          title = '此操作将加入回收站, 是否继续?'
        } else {
          url = 'email/comfirmdelall'
          title = '此操作将永久删除, 是否继续?'
          console.log('3')
        }
        if (this.arrId.length != 0) {
          this.$confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.$http.post(url, {
              // token:this.$token,
              id: this.arrId.join(',')
            }).then(res => {
              console.log(res)
              if (res.code == 1) {
                this.$message(res.msg)
                this.pageChan()
              }
            })
          })
        } else {
          return this.$message('请先选择')
        }
      },
      formatter(row, column) {
        return row.address;
      },
      // 星标
      startChange(id, val) {
        var url = '';
        if (val == 0) {
          url = 'email/star'//3.标星
        } else {
          url = 'email/unstar'//4.取消标星
        }
        console.log(url)
        this.$http.post(url, {
          // token:this.$token,
          id: id
        }).then(res => {
          console.log(res)
          if (res.codo == 1) {
            this.$message(res.msg)
            if (val == 0) {
              this.$message(res.msg)
            } else {
              this.$message('取消成功')
            }
          }
          this.getEmailData()
        })
      },
      //前往添加
      goto() {
        // console.log('添加')
        this.$router.push('/email/add')
      },
      // 前往通訊錄
      goContact() {
        this.$router.push('contact')
      },
      // 路由切换内容变换
      emailBar(index) {
        this.navIndex = index
        this.getEmailData()
      },
      getEmailData(page) {
        var url = '';
        // 收件箱
        if (this.navIndex == 0) {
          url = 'email/inbox'
        }// 发送箱
        else if (this.navIndex == 1) {
          url = 'email/send'
        }
        // 草稿箱
        else if (this.navIndex == 2) {
          url = 'email/drafts'
        }
        // 回收站
        else {
          url = 'email/recycle'
        }

        this.$http.get(url, {
          token: localStorage.getItem("token"),
          page: page || 1
        }).then(res => {
          // console.log(res)
          this.res = res
          var tableData = res.data
          for (var i in tableData) {
            var newStart = tableData[i].star
            tableData[i] = Object.assign({ newStart: newStart }, tableData[i])
          }
          // console.log(tableData)
          this.tableData = res.data
        })
      },

      pageChan(page) {
        // this.tempData = this.$http.getCur(page,this.tableData)
        this.getEmailData(page)
      },
    },
    // 开始
    created() {
      if (this.$route.path === "/email") {
        // console.log("yes");
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.getEmailData()
      this.$bus.$emit('setIndex', 0)
    },
    // 监听路由
    watch: {
      $route(to, from) {
        this.getEmailData()
        // console.log(to.path)
        if (to.path === "/email") {
          // console.log('yes')
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .email {
    height: 100%;

  }

  .email-child {
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
        width: auto;
        align-items: center;

        .el-input {
          flex: 1;
          margin-left: 10px;
          border-radius: 30px;
        }
      }
    }

    .center {
      flex: 1;
      display: flex;
      text-align: left;
      align-items: center;

      span {
        display: inline-block;
        padding: 9px 20px;

        a {
          text-decoration: none;
        }
      }
    }
  }
</style>