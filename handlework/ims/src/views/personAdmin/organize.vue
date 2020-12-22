<template>
  <div class="email">
    <!-- 我是公告栏 -->
    <div class="contain email-child" v-if="this.$route.path =='/organize'">
      <div class="top">
        <!-- <div class="center font18-bold-3">
          <span v-for="(item,index) in navbar" :key="index" :class="index==navIndex?'is-el-blue':''"
            @click="emailBar(index)">{{item}}</span>
        </div> -->
        <div class="right between">
          <el-button type="primary" style="width:120px;" @click="addPosition" v-if="navIndex == '0'">新增</el-button>
        </div>
      </div>
      <div v-if="navIndex != '2'">
        <div class="is-table">
          <div v-if="navIndex == 0">
            <Manage :isTitle="isTitle" @load="dataLoad" :tableData="tableData" :dialog="dialogFormVisible"
              @close="dialogFormTap" />
          </div>
          <div v-if="navIndex == 1">
            <Plan :dialogTableVisible="dialogTableVisible" @close="dialogTableVisible=false" />
          </div>
        </div>
        <div class="paging" v-if="navIndex == 0">
          <el-pagination background layout="prev, pager, next" :total="res.total" @current-change="pageChan">
          </el-pagination>
        </div>
      </div>
      <div v-else class="framework">
        <vo-basic v-if="chartData" :data="chartData" :pan="true" :zoom="true" :export-button="false" export-button-name="导出"
          :draggable="true" :toggle-siblings-resp="true" parent-node-symbol="fa-users">
        </vo-basic>
        <div class="block">
          <div class="between my-component">
            <span>总经理</span>
            <el-link @click="addNewPosition" type="primary" :underline="false" v-if="newChildMen">新增子部门</el-link>
          </div>
          <el-tree v-if="treeData" :data="treeData" node-key="id" default-expand-all style="padding:10px;">
            <div class="custom-tree-node between" slot-scope="{ node, data }">
              <span>{{node.label}}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)" v-if="data.children&&newChildMen">
                  新增子部门
                </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)" v-if="deleteMen">
                  删除
                </el-button>
              </span>
            </div>
          </el-tree>
          <el-dialog title="新增部门、职务" :visible.sync="dialogTreeVisible" class="my-tree">
            <div>
              <el-input placeholder="新增部门" v-model="form1.name1" maxlength="10" />
            </div>
            <div v-if="form1true">
              <div>
                <Rank @customer="getRinkData" />
              </div>
              <el-input placeholder="岗位名称" v-model="form1.name2" maxlength="10" />
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTreeVisible = false">取 消</el-button>
              <el-button type="primary" @click="treeDefine">确 定</el-button>
            </div>
          </el-dialog>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import "vue-orgchart/dist/style.min.css";
  import { VoBasic } from "vue-orgchart";
  import Manage from "./positionChild/Manage.vue";
  import Plan from "./positionChild/Plan.vue";
  import Rank from "@/components/table/Rank.vue";
  export default {
    components: { VoBasic, Manage, Plan, Rank },
    data() {
      return {
        defaultProps: {
          children: "positions",
          label: "name"
        },
        isTitle: '新增职务',
        //   搜索内容
        searchText: "",
        navbar: ["职位管理", "职级规划", "组织架构"],
        navIndex: 2,

        form: {},
        // 树形增加
        form1: {
          name1: '',
          name2: '',
        },
        form1true: false,
        value: "",
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogTreeVisible: false,//树形弹框
        formLabelWidth: "80px",

        // cities
        cities: [{ label: "3435", value: "353" }],
        treeData: "",

        // 树形图
        tableData: [],//职位管理
        planData: [],//职务规划
        chartData: '',

        res: '',
        isShow: true,
        data: [],
        rank: '',
        structure: '',
      };
    },
    methods: {
      // 新增
      addPosition() {
        this.dialogFormVisible = true
      },
      dialogFormTap() {
        this.dialogFormVisible = false
      },
      getRinkData(val) {
        console.log(val)
        this.rank = val;
      },
      // 树形图
      append(data) {
        // const newChild = { id: id++, label: "testtest", children: [] };
        // if (!data.children) {
        //   this.$set(data, "children", []);
        // }
        // data.children.push(newChild);
        this.structure = data;
        if (!data.children) {
          return this.$message('已不能再次添加')
        } else {
          console.log('新增职位');
          this.form1 = {
            name1: data.label,
            name2: '',
          }
          console.log(this.form1)
          this.form1true = true
          this.dialogTreeVisible = true
          // this.$http.post('',{
          //   token:this.$token,
          //   id:data.id,
          //   content:this.form1.name2
          // }).then(res=>{
          //   console.log(res)
          // })
        }
      },
      addNewPosition() {
        this.dialogTreeVisible = true
        this.form1true = false
      },
      filterNode() { },
      // 职位管理
      getManaList(page) {
        this.$http.get("work/index", { token: localStorage.getItem("token"), page: page || 1 })
          .then(res => {
            this.res = res
            var res = res.data
            this.tableData = res;
          });
      },
      // 组织架构
      getDepart() {
        this.$http.get("work/structure").then(res => {
          var res = res.data
          this.treeData = res;
          this.chartData = []
          // 组织架构数据转换
          var chartData = JSON.parse(JSON.stringify(res));
          // 将name值插入到data中
          for (var i in chartData) {
            var name = { name: chartData[i].label }
            var newI = Object.assign(name, chartData[i])
            chartData[i] = name
            for (var j in chartData[i].children) {
              var jname = { name: chartData[i].children[j].label }
              var newJ = Object.assign(jname, chartData[i].children[j])
              chartData[i].children[j] = newJ
            }
          }
          var newChartData = {
            name: '总经理',
            children: [],
          };
          newChartData.children = chartData
          this.chartData = newChartData
        });
      },
      dataLoad() {
        this.pageChan()
      },
      pageChan(page) {
        this.getManaList(page)
      },
      formatter(row, column) {
        return row.address;
      },
      //前往添加
      goto() {
        // console.log('添加')
        this.$router.push("/email/add");
      },
      // 前往详情
      goNoticeDetail(index, rows) {
        // console.log('详情')
        // console.log(index)//下标或者详情id
        // console.log(rows)
        this.$router.push("/email/detail/" + index);
      },
      // 路由切换内容变换
      emailBar(index) {
        this.navIndex = index;
      },


      // 架构添加
      treeDefine() {
        console.log(this.form1)
        if (!this.form1true) {//部门添加
          if (!this.form1.name1) {
            return this.$message('新增部门不能为空')
          }
          this.$http.post('work/addstructure', {
            token: localStorage.getItem("token"),
            label: this.form1.name1
          }).then(res => {
            console.log(res)
            this.$message(res.msg);
            if (res.code == 1) {
              this.dialogTreeVisible = false
            }
            this.getManaList();
            this.getDepart();
          })
        } else {//职位添加
          if (!this.form1.name2) {
            return this.$message('职位不能为空')
          }
          if (!this.structure.id) {
            return this.$message('岗位名称不能为空')
          }
          this.$http.post('work/add', {
            // token: this.$token,
            label: this.form1.name2,
            structure: this.structure.id,
            rank: this.rank

          }).then(res => {
            console.log(res)
            this.$message(res.msg);
            if (res.code == 1) {
              this.dialogTreeVisible = false
            }
            this.getManaList();
            this.getDepart();
          })
        }
      },
      // 架构删除
      remove(node, data) {
        // work/delstructure
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (data.children) {
            this.$http.post('work/delstructure',
              {
                id: data.id
              }).then(res => {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
                this.getManaList();
                this.getDepart();
                this.$message({
                  message: res.msg
                });
              })
          } else {//职位删除
            const id = node.id;
            console.log(id)
            const parent = node.parent.data.children;
            for (var i in parent) {
              if (id == parent[i].$treeNodeId) {
                parent.splice(i, 1);
              }
            }
            this.$http.post('work/del', {
              // token: this.$token,
              id: data.id
            }).then(res => {
              this.getManaList();
              this.getDepart();
              this.$message(res.msg)
            })
          }
        })
        // var _this = this
        // setTimeout(function () {
        //   console.log(_this)
        //   console.log(_this.chartData)
        // }, 5000)
      },
    },
    // 开始
    created() {
      this.newChildMen = this.$http.allow('新增部门')
      this.deleteMen =  this.$http.allow('删除部门')
      this.getManaList();
      this.getDepart();
    },
    // 监听路由
    watch: {}
  };
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
      }
    }

    .paging {
      padding-top: 30px;
    }
  }

  .framework .my-component {
    padding: 20px 15px 10px 30px;
  }

  .my-tree div {
    padding-bottom: 20px;
  }

  .my-tree div:last-child {
    padding-bottom: 0;
  }

  .custom-tree-node {
    width: 100%;
  }

  .el-tree-node__content {
    padding: 10px;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
  }

  .jOrgChart .node {
    width: 120px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    margin: 0 8px;
  }

  // 树形
  #chart-container {
    position: relative;
    display: inline-block;
    /* top: 10px; */
    left: 10px;
    height: auto;
    width: calc(100% - 24px);
    border-radius: 5px;
    overflow: auto;
    overflow-x: hidden;
    text-align: center;
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    overflow: hidden;
  }

  .orgchart .node .title {
    border: 4px;
  }
</style>