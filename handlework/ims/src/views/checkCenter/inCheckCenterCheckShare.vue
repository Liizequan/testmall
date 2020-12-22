<template>
  <div class="checkCenter contain">
    <div v-if="this.$route.path == '/inCheckCenterCheckShare'">
      <div class="top topBtns">
        <div class="leftBtns">
          <!-- <el-button type="primary" @click="createNew" style="margin-right:20px;"><i class="el-icon-plus">新建审批</i>
          </el-button> -->
          <!-- <el-link :underline="false" style="color:#303133; margin-left:40px;" class="btn font16-bold-3">全部</el-link>
            <el-link :underline="false" style="color:#303133; margin-left:40px;" class="btn font16-bold-3">我发起的</el-link>
            <el-link :underline="false" style="color:#303133; margin-left:40px;" class="btn font16-bold-3">我审批的</el-link> -->
          <!-- <el-link :underline="false" @click="tabbar = 0" :type='tabbar ==0 ? "primary" : ""' 
                style="margin-left:30px;" class="font18-bold-3">全部</el-link>
            <el-link :underline="false" @click="tabbar = 1" :type='tabbar ==1 ? "primary" : ""' 
                style="margin-left:30px;" class="font18-bold-3">我发起的</el-link>
            <el-link :underline="false" @click="tabbar = 2" :type='tabbar ==2 ? "primary" : ""' 
                style="margin-left:30px;" class="font18-bold-3">我审批的</el-link> -->
          <!-- <span v-for="(item,index) in tabbars" :key="index">
            <el-link :underline="false" @click="tabbarTap(tabbar = index)" :type='tabbar ==index ? "primary" : ""'
              style="padding:0 20px;" class="font18-bold-3">{{item}}</el-link>
          </span> -->
        </div>
        <div class="right">
          日期筛选：
          <el-date-picker type="daterange" :picker-options="pickerOptions" v-model="date" range-separator="至"
            start-placeholder='开始时间' end-placeholder='结束时间'>
          </el-date-picker>
          <!-- <el-button type="primary" class="ml10" @click="isCheckCnterData">全部</el-button> -->
          <el-button type="primary" class="ml10" @click="getList">全部</el-button>
        </div>
      </div>
      <div style="height: 20px;text-align:right;">
        <el-link :underline='false' v-if="tabbar == 1" @click="delAll"><i class='el-icon-delete'>批量删除</i></el-link>
      </div>
      <el-table :data="tableData" @selection-change="selChan" stripe
      :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="审批事由" prop="reason"></el-table-column>
        <el-table-column label="审批类型" prop="type" :filter-method="filterTag">
          <!-- :filters="approvalType" -->
        </el-table-column>
        <el-table-column label="申请人" prop="create_man"></el-table-column>
        <el-table-column label="申请时间" prop="create_time" sortable></el-table-column>
        <el-table-column label="审批人" prop="approval_man"></el-table-column>
        <el-table-column label="审批时间" prop="create_time" sortable></el-table-column>
        <el-table-column label="审批状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="">
              <!-- <menRadio :excuters="excuters" @theRes="execuRes">
                <template slot="title">
                  <h3>审批人</h3>
                </template>
                <template slot="main">
                  <el-link :underline='false' type='primary' style="margin-right:20px;">分享</el-link>
                </template>
              </menRadio> -->
              <el-link type="primary" @click="toDetail(tableData[scope.$index])">详情 <i class="el-icon-arrow-right"></i>
              </el-link>
              <el-link :underline='false' type='primary' class='ml20' v-if="tabbar==1" @click="delAll(scope.row.id)">
                删除<i class='el-icon-delete'></i>
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
        class="busiPage"
      >
      </el-pagination> -->

      <el-pagination background layout="prev, pager, next" :total="res.msg.total" style="padding-top:30px;"
        @current-change="pageChan">
      </el-pagination>
      <el-dialog :visible.sync="dialogShow" title="请选择审批类型" width="40%">
        <div class="dialog">
          <div @click="normal">
            <!-- <img :src="imgUrl" /> -->
            <div class="img">
              <img src="@/assets/checkicon/01-1.png" />
              <img src="@/assets/checkicon/01.png" />
            </div>
            <div class="dialog-txt">普通审批</div>
          </div>
          <div @click="holiday">
            <!-- <img :src="imgUrl" /> -->
            <div class="img">
              <img src="@/assets/checkicon/02-2.png" />
              <img src="@/assets/checkicon/02.png" />
            </div>
            <div class="dialog-txt">请假审批</div>
          </div>
          <div @click="overtime">
            <!-- <img :src="imgUrl" /> -->
            <div class="img">
              <img src="@/assets/checkicon/03-3.png" />
              <img src="@/assets/checkicon/03.png" />
            </div>
            <div class="dialog-txt">加班审批</div>
          </div>
          <div @click="outside">
            <!-- <img :src="imgUrl" /> -->

            <div class="img">
              <img src="@/assets/checkicon/04-4.png" />
              <img src="@/assets/checkicon/04.png" />
            </div>
            <div class="dialog-txt">外勤审批</div>
          </div>
          <div @click="travel">
            <!-- <img :src="imgUrl" /> -->

            <div class="img">
              <img src="@/assets/checkicon/05-5.png" />
              <img src="@/assets/checkicon/05.png" />
            </div>
            <div class="dialog-txt">出差审批</div>
          </div>
          <div @click="debit">
            <!-- <img :src="imgUrl" /> -->

            <div class="img">
              <img src="@/assets/checkicon/06-6.png" />
              <img src="@/assets/checkicon/06.png" />
            </div>
            <div class="dialog-txt">借支审批</div>
          </div>
          <div @click="reimburt">
            <!-- <img :src="imgUrl" /> -->

            <div class="img">
              <img src="@/assets/checkicon/07-7.png" />
              <img src="@/assets/checkicon/07.png" />
            </div>
            <div class="dialog-txt">差旅审批</div>
          </div>
        </div>
      </el-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import menRadio from '@/components/menRadiocopy.vue'
  export default {
    data() {
      return {
        selected: '',
        canDelAll: false,
        bySearch: false,
        res: '',
        imgUrl: require("@/assets/logo.png"),
        dialogShow: false,
        // 导航
        tabbar: 2,
        tabbars: ["全部", "我发起的", "我审批的"],
        tableData: [],
        tempData: [],
        // 审批类型
        approvalType: [],
        date: "",
        excuters: '',
        execuResVal: '',
        pickerOptions: {
          onPick: (dateRange => {
            if (!dateRange.maxDate) {
              return;
            }
            // this.dateVal = [dateRange.minDate, dateRange.maxDate];
            // this.searchChangeDate();
            // console.log(dateRange)
            // console.log(new Date(dateRange.minDate))
            // console.log(new Date(dateRange.maxDate))
            var minDate = new Date(dateRange.minDate)
            var maxDate = new Date(dateRange.maxDate)
            const resminDate = minDate.getFullYear() + '-' + (minDate.getMonth() + 1) + '-' + minDate.getDate()
            const resmaxDate = maxDate.getFullYear() + '-' + (maxDate.getMonth() + 1) + '-' + maxDate.getDate()
            this.bySearch = true
            this.getTimeData(resminDate, resmaxDate)
          })
        },//日期选择器
      };
    },
    components: { menRadio },
    methods: {
      delAll(id) {
        if (this.$http.testNum(id)) {//单独删除
          this.$http.conf().then(() => {
            this.$http.post('approval/delall', {
              token: localStorage.getItem('token'),
              id: id
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.isCheckCnterData()
              }
            })
          })
        } else {//批量删除
          if (this.canDelAll && this.selected.length) {
            this.$http.conf().then(() => {
              this.$http.post('approval/delall', {
                token: localStorage.getItem('token'),
                id: this.$http.getIdsStrByObjArr(this.selected)
              }).then(res => {
                this.$message(res.msg)
                if (res.code == 1) {
                  this.isCheckCnterData()
                }
              })
            })
          } else {
            this.$message('请选择审批项')
          }
        }
      },
      selChan(e) {
        this.selected = e
        if (this.tabbar == 1) {
          this.canDelAll = true
        } else {
          this.canDelAll = false
        }
      },
      pageChan(page) {
        // this.tempData = this.$http.getCur(e, this.tableData)
        if (this.bySearch) {

        } else {
          this.isCheckCnterData(page)
        }
      },
      getTimeData(min, max, page = 1) {
        var type = this.tabbar
        // this.$http.get('approval/search', {
        //   token: this.$token,
        //   begin: min,
        //   end: max,
        //   type: type,
        //   page: page
        // }).then(res => {
        //   this.res = res
        //   this.tableData = res.data
        // })
        this.$http.get('approval/sharechecksearch', {
          start_time: min,
          end_time: max,
          // type: type,
          page: page
        }).then(res => {
          this.res = res
          this.tableData = res.data
        })
      },
      timeTap(val) {
        console.log(val)
        console.log('我是时间')
      },
      // 导航切换
      tabbarTap() {
        this.bySearch = false
        this.isCheckCnterData()
      },
      createNew() {
        this.dialogShow = true;
      },
      // 前往详情
      toDetail(index) {
        console.log(index, 'iiiiiiiii')
        if (index.type == '普通') {
          this.$router.push({ path: "/checkCenter/normalDetl", query: { id: index.action_id } });
        } else if (index.type == '请假') {
          this.$router.push({ path: "/checkCenter/holidayDetl", query: { id: index.action_id } });
        } else if (index.type == '加班') {
          this.$router.push({ path: "/checkCenter/overtimeDetl", query: { id: index.action_id } });
        } else if (index.type == '出差') {
          this.$router.push({ path: "/checkCenter/outsideDetl", query: { id: index.action_id } });
        } else if (index.type == '外勤') {
          this.$router.push({ path: "/checkCenter/travelDetl", query: { id: index.action_id } });
        } else if (index.type == '借支') {
          this.$router.push({ path: "/checkCenter/debitDetl", query: { id: index.action_id } });
        } else if (index.type == '差旅') {
          this.$router.push({ path: "/checkCenter/reimbDetl", query: { id: index.action_id } });
        }
        // console.log(index)
      },
      normal() {
        this.$router.push("/checkCenter/newNormal");
        this.dialogShow = false;
      },
      holiday() {
        this.$router.push("/checkCenter/newHoliday");
        this.dialogShow = false;
      },
      overtime() {
        this.$router.push("/checkCenter/newOvertime");
        this.dialogShow = false;
      },
      outside() {
        this.$router.push("/checkCenter/newTravel");
        this.dialogShow = false;
      },
      travel() {
        this.$router.push("/checkCenter/newOutside");
        this.dialogShow = false;
      },
      debit() {
        this.$router.push("/checkCenter/newDebit");
        this.dialogShow = false;
      },
      reimburt() {
        this.$router.push("/checkCenter/newReimb");
        this.dialogShow = false;
      },

      // 决定页面数据 
      isCheckCnterData(page) {
        var url = '';
        if (this.tabbar == 0) {
          // 全部审批数据
          url = 'approval/index'
        } else if (this.tabbar == 1) {
          // 我发起审批的
          url = 'approval/mystart'
        } else {
          // 我审批的
          url = 'approval/myapproval'
        }

        this.$http.get(url, {
          token: localStorage.getItem("token"),
          page: page || 1
        }).then(res => {
          console.log(res)
          this.res = res
          this.tableData = res.data
          // this.tempData = res.slice(0, 10)
        })
      },


      // 审批类型筛选
      filterTag(value, row) {
        console.log(value)
        console.log(row)
        return row.tag === value;
      },
      execuRes(res) {
        this.execuResVal = res
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.excuters = res
          if (res) {
            if (this.$route.query.who == 'edit') {
              this.who = 'edit'
              this.editInit()
            }
          }
        })
      },
      getList(){
        this.$http.get('approval/shareactionlist').then(res=>{
          this.res = res
          this.tableData = res.msg.data
        })
      }
    },
    created() {
      // 审批类型
      // this.$http.get('approval/type', {
      //   // token: this.$token
      // }).then(res => {
      //   // console.log(JSON.parse(JSON.stringify(res)))
      //   // this.approvalType = JSON.parse(JSON.stringify(res))
      //   let approvalType = JSON.parse(JSON.stringify(res));
      //   for (var item of approvalType) {
      //     var text = { text: item.name }
      //     var value = { value: item.name }
      //     Object.assign(item, text, value)
      //   }
      //   this.approvalType = approvalType
      // })
      // this.isCheckCnterData();
      this.getList()
      this.getMen()
    },
    watch: {
      $route(to, from) {
        console.log('路由变化')
        this.isCheckCnterData();
      }
    },
  };
</script>
<style lang="less" scoped>
  .top {
    margin-bottom: 20px;
  }

  .btn {
    border: none;
  }

  .dialog>div {
    width: 24%;
    display: inline-block;
  }

  .dialog>div:hover {
    color: #6464E4;
  }

  .dialog {
    .img {
      text-align: center;
      margin: auto;

      img {
        width: 40px;
        height: 40px;
      }

      img:nth-child(2) {
        display: none;
      }
    }

    .img:hover img:nth-child(1) {
      display: none;
    }

    .img:hover img:nth-child(2) {
      display: inline-block;
    }

    .dialog-txt {
      padding: 5px 0 20px;
    }
  }
  .action{
    display: flex;
  }
  /deep/.el-table__body,/deep/.el-table__header{
        width:100% !important;
    }
</style>