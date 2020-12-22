<template>
  <div class="contact contain">
    <div v-if="this.$route.path == '/contact'">
      <!-- <div class="topBtns"> -->
      <div class="between">
        <div>
          <!-- <el-button type="primary" @click="createNew"
            ><i class="el-icon-plus"></i>新建联系人</el-button
          > -->
          <el-button @click="openEdit">编辑组</el-button>
          <el-popover trigger="hover" placement="bottom" title="客户分组">
            <el-radio-group v-model="groupRadio">
              <el-radio v-for="(item,index) in group" :key="index" :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
            <div style="text-align:right;">
              <el-link type="primary" :underline="false" @click="move">确定</el-link>
              <!-- <el-link :underline="false">取消</el-link :underline="false"> -->
            </div>
            <el-button slot="reference" style="margin-left:10px;">移动到组</el-button>
          </el-popover>
        </div>
        <!-- <el-link :underline="false" @click="goEmail"><i class="el-icon-back back">返回邮箱</i></el-link> -->
      </div>
      <div class="rightBtns">
        <!-- <el-link :underline="false"><i class="el-icon-upload2 ml">导入</i></el-link> -->
        <el-link :underline="false" @click="getout"><i class="el-icon-download ml">导出</i></el-link>
        <el-link :underline="false" @click="delSel"><i class="el-icon-delete ml">批量刪除</i></el-link>
      </div>
      <el-table :data="tableData" @selection-change="selChan" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            {{scope.row.email ? scope.row.email : '暂无邮箱'}}
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="分组" prop="group"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="edit(scope.row.id)">编辑<i class="el-icon-edit"></i>
            </el-link>
            <el-link :underline="false" type="primary" class="ml20" @click="delSel(scope.row.id)">删除<i
                class="el-icon-delete"></i></el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination :total="tableData.length"  layout="prev,pager,next" background class="busiPage"></el-pagination> -->
      <div class="busiPage">
        <el-pagination background layout="prev, pager, next" :total="res.total" @current-change="pageChan">
        </el-pagination>
      </div>

    </div>
    <router-view></router-view>
    <el-dialog :visible.sync="editDia" title="编辑组">
      <div class="title">新增编辑组:</div>
      <div class="new">
        <el-input v-model="newVal" maxlength="10"></el-input>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
      <div class="title" style="margin-top:20px;">现有分组:</div>
      <div>
        <block v-for="(item,index) in group" :key="index"><span>{{item.name}}</span><i class="el-icon-remove"
            @click="del(item.id)"></i></block>
      </div>
      <!-- <div class="tac">
        <el-button type="primary" @click="editDia=false">确定</el-button>
        <el-button @click="editDia=false">返回</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        groupRadio: '',
        newVal: '',
        editDia: false,
        res: '',
        tableData: [],
        group: '',
        seleted: ''
      };
    },
    methods: {
      edit(id) {
        this.$router.push({
          path: "/customMana/newCustom", query: {
            id: id
          }
        });
      },
      move() {
        if (!this.groupRadio) {
          this.$message('请选择分组');
          return
        } else if (!this.seleted.length) {
          this.$message('请选择客户');
          return
        }
        console.log(this.getSelIdsStr())
        this.$http.post('marketing/setGroup', {
          customer_id: this.getSelIdsStr(),
          group: this.groupRadio
        }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.getList()
          }
        })
      },
      getout() {
        this.$http.downloadFile('marketing/exportcustomer')
      },
      getSelIdsStr() {
        let ids = ''
        for (let i in this.seleted) {
          if (this.seleted.length - 1 == i) {
            ids += this.seleted[i].id
          } else {
            ids += this.seleted[i].id + ','
          }
        }
        return ids
      },
      delSel(id) {
        if (/^\d*$/.test(id)) {//单独删除
          this.$http.conf().then(() => {
            this.$http.post('marketing/delcustomer', {
              customer_id: id
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getList()
              }
            })
          })
        } else {//批量删除
          if (this.seleted.length) {
            let ids = this.getSelIdsStr()
            this.$http.conf().then(() => {
              this.$http.post('marketing/delcustomer', {
                customer_id: ids
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
        }
      },
      selChan(e) {
        this.seleted = e
      },
      add() {
        if (!this.newVal) {
          this.$message('请填分组名称')
        } else {
          this.$http.post('marketing/addGroup', {
            name: this.newVal
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.editDia = false
              this.getGroup()
            }
          })
        }

      },
      del(id) {
        this.$http.conf().then(() => {
          this.$http.post('marketing/delGroup', {
            id: id
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getGroup()
            }
          })
        })
      },
      createNew() {
        this.$router.push("/contact/newContact");
      },
      openEdit() {
        this.editDia = true;
      },
      newEmail() {
        this.$router.push({ path: "/email/add", query: { id: id } });
      },
      pageChan(page) {
        this.getList(page)
      },
      // 前往邮箱
      goEmail() {
        this.$router.push("/email");
      },
      getList(page) {
        this.$http.get('marketing/userlist', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.res = res
          this.tableData = res.data
        })
      },
      pageChan(page) {
        this.getList(page)
      },
      getGroup() {
        this.$http.get('marketing/grouplist').then(res => {
          this.group = res
        })
      }
    },
    watch: {
      $route(){
      this.getList()
      this.getGroup()}
    },
    created() {
      this.getList()
      this.getGroup()
    }
  };
</script>
<style lang="less" scoped>
  .contact {
    text-align: left;
  }

  .back {
    float: right;
  }

  .rightBtns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .new {
    display: flex;

    button {
      margin-left: 20px;
    }
  }

  .title {
    color: #ccc;
    margin-bottom: 10px;
  }

  block {
    margin-right: 10px;
  }

  .rightBtns {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .new {
    display: flex;

    button {
      margin-left: 20px;

      .tac {
        margin-top: 10px;
      }
    }
  }

  .el-radio-group label {
    display: block;
  }
</style>