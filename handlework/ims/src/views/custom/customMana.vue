<template>
  <div class="customMana contain">
    <div v-if="this.$route.path == '/customMana'">
      <div class="weight font18-bold-3">
        <div>
          <h4>全部客户</h4>
          <div class="num">{{allData}}</div>
        </div>
        <div>
          <h4>我的客户</h4>
          <div class="num">{{myData}}</div>
        </div>
        <div>
          <h4>共享客户</h4>
          <div class="num">{{fenpei}}</div>
        </div>
        <div>
          <h4>分配客户</h4>
          <div class="num">{{gongx}}</div>
        </div>
      </div>
      <div class="searchCon" v-if="searchCustomer">
        <h4 class=" font18-bold-3">查询已属客户</h4>
        <div class="search">
          <el-input placeholder="请输入查询的客户信息，如客户名称，联系电话" prefix-icon="el-icon-search" class="searchInp"
            v-model="searchInp" @keyup.enter.native="submit">
          </el-input>
          <el-button type="primary" @click="submit" class="submit">查询</el-button>
        </div>
      </div>
      <div class="tableCon">
        <div class="between">
          <el-button type="primary" @click="createNew" v-if="newCustomer">
            <i class="el-icon-plus"></i>新增客户
          </el-button>
          <div class="my-client flex-items-center">
            <!-- <el-button type="text" class="btn font16-bold-3">我的客户</el-button>
            <el-button type="text" class="btn font16-bold-3">我已成交的客户</el-button>
            <el-button type="text" class="btn font16-bold-3">共享客户</el-button>
            <el-button type="text" class="btn font16-bold-3">公海客户</el-button> -->
            <el-link :underline="false" :type="tabbarIndex == index ? 'primary' : ''" class="btn font16-bold-3"
              v-for="(item,index) in tabbar" :key="index" @click="tabbarTap(index)">{{item}}</el-link>
          </div>
          <!-- <el-button class="bin" type="warning">回收站</el-button> -->
          <el-button @click="rubbish">回收站</el-button>
        </div>
        <div class="onBtns font14-nobold-9">
          <el-link :underline="false" v-if="tabbarIndex==0" @click="addUser"><i class="el-icon-plus">添加成员</i></el-link>
          <el-link :underline="false" v-if="tabbarIndex==0" @click="removeUser"><i class="el-icon-bottom-left">移除成员</i>
          </el-link>
          <el-link :underline="false" v-if="tabbarIndex==2&&distribute" @click="distributionUser"><i class="el-icon-sort">分配</i>
          </el-link>
          <el-link :underline="false" v-if="tabbarIndex!==2" @click="publicUser"><i class="el-icon-top-right">移入公海</i>
          </el-link>
          <el-link :underline="false" @click="delateUser"><i class="el-icon-delete">删除</i></el-link>
          <!-- <div class="rightBtns">
            <i class="el-icon-upload2">导入</i>
            <i class="el-icon-download">导出</i>
          </div> -->
        </div>

        <el-table :data="tableData" v-if="!pass" @selection-change="allChan" stripe
        :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="客户编号" width="80"></el-table-column>
          <el-table-column prop="name" label="客户名称"></el-table-column>
          <el-table-column prop="phone" label="联系电话" width="120px;"></el-table-column>
          <el-table-column prop="industry" label="行业" :filters="industry" :filter-method="filterIndustry">
          </el-table-column>
          <el-table-column prop="source" label="客户来源"></el-table-column>
          <el-table-column prop="status" label="客户状态" :filters="[
              { text: '重要', value: '重要' },
              { text: '普通', value: '普通' },
              { text: '潜在', value: '潜在' },
              { text: '失败', value: '失败' }
              
            ]" :filter-method="filterStatus"></el-table-column>
          <el-table-column prop="user_id" label="客户经理"></el-table-column>
          <el-table-column prop="create_time" sortable label="创建日期" width="160px;"></el-table-column>
          <el-table-column label="关注" v-if="tabbarIndex==0">
            <template slot-scope="scope">
              <div @click="setStar(scope.row.id,scope.row.is_follow)">
                <el-rate :max="1" v-model="scope.row.is_follow" disabled></el-rate>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <!-- <template>
              <el-link type="primary" @click="toDetail">详情<i class="el-icon-arrow-right"></i></el-link>
            </template> -->
            <template slot-scope="scope">
              <div>
                <a href="javascript:scrollTo(0,0);" style="color:#409EFF;text-decoration: none;"
                  @click="toDetail(tableData[scope.$index].id)">详情 <i class="el-icon-arrow-right"></i></a>
                <!-- <el-link type="primary" @click="addUser(scope.row.id)">添加成员</el-link> -->
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-table :data="tableData" v-else stripe
        :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="客户编号"></el-table-column>
          <el-table-column prop="contacts" label="客户名称"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="line" label="成交时间" sortable></el-table-column>
          <el-table-column prop="source" label="合同金额" sortable></el-table-column>
          <el-table-column prop="status" label="款项状态" :filters="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 }
            ]"></el-table-column>
          <el-table-column prop="manager" label="关联订单"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-link type="primary">详情 <i class="el-icon-arrow-right"></i></el-link>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination layout="prev,pager,next" :total="tableData.length" background class="busiPage"></el-pagination> -->
        <el-pagination background layout="prev, pager, next" :total="res?res.msg.total:0"
          style="padding-top:30px;text-align:center" @current-change="pageChan">
        </el-pagination>
      </div>
    </div>
    <router-view></router-view>


    <!-- 弹框 -->
    <div>

      <!-- 添加 -->
      <el-dialog title="添加成员" width="400px" :visible.sync="addFormVisible">
        <div>
          <p class="old-user">原有成员：{{oneCusDetl.already}}</p>
          <el-select class="el_date" v-model="form.member">
            <!-- <el-option value="1">1</el-option>
            <el-option value="2">2</el-option> -->
            <el-option v-for="(item,index) in addressMen " :key="index" :label="item.name" :value="item.user_id"
              :disabled="item.name == form.user_id">
              {{item.name}}
            </el-option>
          </el-select>
        </div>
        <div slot="footer" class="dialog-footer">

          <!-- this.addFormVisible = true -->
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </div>
      </el-dialog>


      <!-- 移除 -->
      <el-dialog title="移除成员" width="400px" :visible.sync="dialogFormVisible">
        <!-- <div>
          <el-link @click="moveUser" :underline="false" class="old-user">{{form.user_id}} <i class="el-icon-circle-close"></i></el-link>
        </div> -->
        <el-popover placement="top" width="160" v-model="visible">
          <p>是否确认删除</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="moveUser">确定</el-button>
          </div>
          <el-link slot="reference" :underline="false" class="old-user">{{form.user_id}} <i
              class="el-icon-circle-close"></i></el-link>
        </el-popover>
      </el-dialog>

      <!-- 公海 -->
      <el-dialog title="分配成员" width="400px" :visible.sync="bluewater">
        <!-- <div>
          <el-link @click="moveUser" :underline="false" class="old-user">{{form.user_id}} <i class="el-icon-circle-close"></i></el-link>
        </div> -->
        <el-select class="el_date" v-model="form.member">
          <!-- <el-option value="1">1</el-option>
          <el-option value="2">2</el-option> -->
          <el-option v-for="(item,index) in addressMen " :key="index" :label="item.name" :value="item.user_id"
            :disabled="item.name == form.user_id">
            {{item.name}}
          </el-option>
        </el-select>
        <div style="text-align: right; margin-top: 20px">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="addNewUser">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-dialog title="回收站" :visible.sync="rubbishShow">
      <el-table :data="rubData" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column prop="id" label="客户编号" width="80"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="industry" label="行业"></el-table-column>
        <el-table-column prop="source" label="客户来源"></el-table-column>
        <!-- <el-table-column prop="status" label="客户状态"></el-table-column> -->
        <el-table-column prop="user_id" label="客户经理"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-link type="primary" @click="delRub(scope.row.id)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="rubRes?rubRes.total:0"
        style="padding-top:30px;text-align:center" @current-change="rubbish">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        rubRes: '',
        rubData: '',
        gonghai: 0,
        pass: false,
        fenpei: 0,
        gongx: 0,
        searchInp: "",
        // 导航
        tabbar: [
          "我的客户",
          "我已成交的客户",
          // "共享客户",
          "公海客户"],
        tabbarIndex: 0,
        tableData: [],
        selected_ids: '',//选中的成员
        industry: [],//行业
        allData: '',//所有客户
        myData: '',//我的客户
        addressMen: [],//归属人员
        res: '',
        // 添加成员弹框
        addFormVisible: false,
        dialogFormVisible: false,
        bluewater: false,
        visible: false,
        form: {
          user_id: '',//原有人员
          member: '',//新增人员
        },
        oneCusDetl: '',
        rubbishShow: false
      };
    },
    computed: {
    },
    methods: {
      setStar(id,is_follow) {
        if (!is_follow) {
          this.$http.post('customer/dofollow', { customer_id: id }).then(res => {
            this.$message(res.msg)
            if(res.code ==1){
              this.getList()
            }
          })
        }else{
          this.$http.post('customer/delfollow', { customer_id: id }).then(res => {
            this.$message(res.msg)
            if(res.code ==1){
              this.getList()
            }
          })
        }
      },
      delRub(id) {
        this.$http.post('marketing/del', {
          token: localStorage.getItem('token'),
          id: id
        }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.rubbish()
          }
        })
      },
      rubbish(page) {
        this.rubbishShow = true
        this.$http.get('marketing/recovery', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.rubData = res.msg.data
          this.rubRes = res.msg
        })
      },
      // 头部切换数据
      tabbarTap(index) {
        this.tabbarIndex = index;
        console.log('访问数据')
        this.getList()
      },
      // 查询客户
      submit() {
        console.log(this.searchInp)
        if (this.searchInp != '') {
          this.$http.get('marketing/search', { 
            // token: this.$token, 
            keyword: this.searchInp }).then(res => {
            console.log(res)
            this.tabbarIndex = null
            this.tableData = res.data
          })
        } else {
          this.tabbarIndex = 0
          this.getList()
        }
      },
      // 选中用户
      allChan(val) {
        this.selected_ids = ''
        this.form.user_id = ''
        for (let i in val) {
          if (i == val.length - 1) {
            this.selected_ids += val[i].id
            this.form.user_id += val[i].user_id
          } else {
            this.selected_ids += val[i].id + ','
            this.form.user_id += val[i].user_id + ','
          }
        }
      },
      // 添加成员
      addUser(id) {
        if (this.selected_ids.split(',').length > 1) {
          return this.$message('最多可以选择一个客户')
        }
        if (this.selected_ids) {
          this.addFormVisible = true
          this.getOneCusDetal(this.selected_ids)
        } else {
          this.$message('请选择客户')
        }
      },
      getOneCusDetal(id) {
        this.$http.get('marketing/look', {
          // token: this.$token,
          id: id
        }).then(res => {
          this.oneCusDetl = res
          console.log(res, 'rrrrrrrr')
        })
      },
      // 确定添加成员
      define() {
        console.log(this.selected_ids, 'iiiiiiii')
        this.$confirm('此操作将添加指定归属人，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.post('marketing/addmy', {
            token: localStorage.getItem('token'),
            id: this.selected_ids,
            user_id: this.form.member
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              // this.getList()
            }
          })
          this.addFormVisible = false

        })
      },
      // 移除
      removeUser() {
        if (this.selected_ids.split(',').length > 1) {
          return this.$message('最多可以选择一个客户移除成员')
        }
        if (this.selected_ids) {
          // this.dialogFormVisible = true
          this.$confirm('此操作将移除其他归属人，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('marketing/move', {
              token: localStorage.getItem('token'),
              id: this.selected_ids
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getList()
              }
            })
          })
        } else {
          this.$message('请选择客户')
        }
      },
      // 确定移除成员
      moveUser() {
        this.$message('确定就移除成功')
        this.dialogFormVisible = false
        this.visible = false
      },
      // 分配成员
      distributionUser() {
        console.log('分配')
        if (this.selected_ids && this.tabbarIndex == 2) {
          this.bluewater = true
        } else {
          this.$confirm('请先选择客户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          })
        }
      },
      // 确认分配成员
      addNewUser() {
        console.log('分配成员')
        // console.log(this.selected_ids)
        // console.log(this.form.member)
        this.$confirm('此操作将分配指定归属人，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('marketing/distribution', {
            // token: this.$token,
            id: this.selected_ids,
            user_id: this.form.member
          }).then(res => {
            if (res.code == 1) {
              this.getList()
              this.$message(res.msg)
            }
            this.bluewater = false
          })
        })
      },
      // 移入公海
      publicUser() {
        console.log('移入公海')

        if (this.selected_ids) {
          this.$confirm('此操作将移入公海, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('marketing/dosea', { token: localStorage.getItem('token'), id: this.selected_ids }).then(res => {
              console.log(res)
              this.getList()
              this.$message({
                type: 'success',
                message: '移入成功!'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消移入'
            });
          });
        } else {
          this.$message('请选择移入的客户')
        }
      },
      // 删除客户
      delateUser() {
        console.log('删除客户')
        if (this.selected_ids) {
          this.$confirm('此操作将删除保存到回收站, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('marketing/dorecovery', { token: localStorage.getItem('token'), id: this.selected_ids }).then(res => {
              if (res.code == 1) {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  message: res.msg
                });
              }

            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message('请选择')
        }
      },
      createNew() {
        this.$router.push("/customMana/newCustom");
      },
      // 前往详情
      toDetail(index) {
        this.$router.push({
          path: "/customMana/cusDetl", query: {
            id: index
          }
        });
      },
      // 获取数据
      getList(page) {//indexcustomer
        // 所有客户
        this.$http.get('marketing/indexlist').then(res => {
          this.allData = res.msg.length
          var res = res.msg
          var fenpei = [], gongx = [];
          for (var i of res) {
            if (i.source == "分配") {
              fenpei.push(i)
              this.fenpei = fenpei.length
            }
            if (i.source == "共享") {
              gongx.push(i)
              this.gongx = gongx.length
            }
          }
        })

        // 行业数据
        this.$http.get('Marketing/industry').then(res => {
          for (var i in res) {
            res[i] = Object.assign({ value: res[i].name, text: res[i].name }, res[i])
          }
          this.industry = res
        })

        // 归属人
        this.$http.get('user/index', { token: localStorage.getItem("token") }).then(res => {
          // console.log(res)
          var addressMen = [];
          for (var i of res) {
            var user = i.user
            for (var j = 0; j < user.length; j++) {
              // console.log(user[j])
              if (user[j]) {
                addressMen.push(user[j])
              }
            }
          }
          // console.log(addressMen)
          this.addressMen = addressMen
        })

        var url = '';

        // 我的客户
        this.$http.get('marketing/my', { token: localStorage.getItem('token') }).then(res => {
          console.log(res)
          this.myData = res.msg.total
        })
        this.$http.get('marketing/sealist', { token: localStorage.getItem('token') }).then(res => {
          console.log(res)
          this.gonghai = res.msg.total
        })

        if (this.tabbarIndex == 0) {
          url = 'marketing/my'
        } else if (this.tabbarIndex == 1) {
          url = 'marketing/mydeal'
        } else {
          url = 'marketing/sealist'
        }
        this.$http.get(url, { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.res = res
          this.tableData = res.msg.data
        })

      },
      pageChan(page) {
        this.getList(page)
      },
      // 筛选
      filterIndustry(value, row) {
        return row.industry === value;
      },
      filterStatus(value, row) {
        return row.status === value;
      }
    },
    created() {
      this.searchCustomer = this.$http.allow('查询客户')
      this.distribute = this.$http.allow('分配客户')
      this.newCustomer = this.$http.allow('新增客户')
      this.getList()
      this.$bus.$on('addSuccess', () => {
        this.getList()
      })
    },
    watch: {
      $route(to, from) {
        this.getList()
      }
    },
  }
</script>
<style lang="less" scoped>
  .customMana {
    text-align: left;
  }

  .newCustom {
    .line_title {
      margin: 0px 0 20px;
    }
  }

  .num {
    font-size: 54px;
    font-weight: bold;
  }

  .weight {
    display: flex;
    justify-content: space-between;

    &>div {
      width: 23%;
      // background: #eee;
      // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
      // border:1px solid rgba(0, 0, 0, 0.08);
      height: 200px;
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-sizing: border-box;
    }

    .num {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  }

  .searchCon {
    // background: #eee;
    // border:1px solid rgba(0, 0, 0, 0.08);
    // box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    // margin-top: 20px;
    padding: 20px 0;
  }

  .search {
    display: flex;
    align-items: center;
    margin-bottom:20px;
  }

  .searchCon {
    // background: #eee;
    // border:1px solid rgba(0, 0, 0, 0.08);
    // box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
    // margin-top: 20px;
    padding: 30px 0 10px;
  }

  .searchInp {
    flex: 1;
    margin: 20px;
    margin-left: 0;
  }

  .btn {
    border: none;
  }

  .tableCon {

    /* padding: 20px; */
    // margin-top: 20px;
    /* background: #eee; */
    .my-client {
      flex: 1;
      justify-content: flex-start;
      /* padding-left: 20px; */

      .btn {
        // padding:0 20px; 
        padding-left: 20px;
      }
    }
  }

  .onBtns {
    display: flex;
    position: relative;
    margin: 20px 0;

    i {
      margin-right: 30px;
    }
  }

  .rightBtns {
    position: absolute;
    right: 0;
  }

  .btn {
    background: none !important;
  }

  .curIndex {
    color: #66b1ff;
  }

  .trash {
    float: right;
  }

  .old-user {
    padding-bottom: 10px;
  }

  .btn:hover {
    border: none;
  }
  .submit{
    width:120px;
  }
</style>