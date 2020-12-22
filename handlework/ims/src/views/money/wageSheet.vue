<template>
  <div class="wageSheet contain">
    <div v-if="this.$route.path == '/wageSheet'">
      <div class="topBtns">
        <h4 class="font18-bold-3">我的工资单-{{name}}</h4>
        <div>
          日期筛选：
          <el-date-picker v-model="dateVal" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            range-separator="至" start-placeholder="开始日期" @change="search" end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" style="margin-left:10px" @click="getList">全部</el-button>
          <el-button type="primary" @click="toMembers" v-if="isCaiwu">我是财务</el-button>
        </div>

      </div>
      <div class="selects line">
        <div class="font16-isbold-3">
          <!-- 月份<el-select class="search" v-model="selectVal">
            <el-option label="one" value="one"></el-option>
            <el-option label="two" value="two"></el-option>
          </el-select>
          日期<el-date-picker v-model="dateVal" class="search"></el-date-picker> -->
          <!-- <p class="flex-items-center between">月份：
            <el-date-picker v-model="dateVal"  format="yyyy-MM" value-format="yyyy-MM"  type="month" placeholder="选择月">
            </el-date-picker>
          </p> -->

          <!-- 时间段：<el-date-picker v-model="dateVal" type="daterange" range-separator="至"></el-date-picker> -->
        </div>
        <div v-if="outputwagessheet">
          <!-- <i class="el-icon-upload2" style="position:relative;">导入<input type="file" @change="fileSel" id="file"></i> -->
          <i class="el-icon-download ml" @click="output">导出</i>
        </div>
      </div>
      <div style="color:#ccc;padding:10px;font-size:14px;text-align:center;" v-if="list&&!list.length">暂无工资单</div>
      <div class="item font14-nobold-3" v-for="(item,index) in list" :key="index">
        <div class="topSelect">
          <div>
            姓名：
            <h4 class="font18-bold-3">{{item.name}}</h4>
          </div>
          <div>
            日期：
            <h4>{{item.create_time}}</h4>
          </div>
        </div>
        <div class="table">
          <el-row>
            <el-col>姓名</el-col>
            <el-col>基本工资(+)</el-col>
            <el-col>绩效工资(+)</el-col>
            <el-col>津贴(+)</el-col>
            <el-col>奖金(+)</el-col>
            <el-col>出勤天数</el-col>
            <el-col>其他应发(+)</el-col>
            <el-col>所得税(-)</el-col>
            <el-col>社保(-)</el-col>
            <el-col>其他扣款(-)</el-col>
            <el-col>本月实发</el-col>
          </el-row>
          <el-row>
            <el-col>{{item.name}}</el-col>
            <el-col>{{item.base}}</el-col>
            <el-col>{{item.merits}}</el-col>
            <el-col>{{item.allowance}}</el-col>
            <el-col>{{item.bonus}}</el-col>
            <el-col>{{item.day}}</el-col>
            <el-col>{{item.other}}</el-col>
            <el-col>{{item.tax}}</el-col>
            <el-col>{{item.security}}</el-col>
            <el-col>{{item.deduction}}</el-col>
            <el-col>{{item.wages}}</el-col>
          </el-row>
        </div>
        <div class="topSelect topSelect-btn">
          <div class="total">
            实发工资：
            <h4 class="font18-bold-3">8000</h4>
            （元）
          </div>
          <el-button v-if="item.status">已确认</el-button>
          <el-button type="primary" v-else @click="confirm(item.id)">确认</el-button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCaiwu:false,
        user_id:'',
        selectVal: "",
        dateVal: "",
        list: '',
        name: ''
      };
    },
    methods: {
      search(date) {
        this.$http.get('wages/search', {
          token: localStorage.getItem('token'),
          begin_time: date[0],
          end_time: date[1]
        }).then(res => {
          this.list = res.data
        })
      },
      confirm(id) {
        this.$confirm("工资详情是否正确", "工资详情", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type:'warning'
        }).then(() => {
          this.$http.post('wages/comfirm', {
            token: localStorage.getItem('token'),
            id: id
          }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getList()
              }
            }
          })
        })
      },
      fileSel(e) {
        let file = e.target.files[0]
        let arr = file.name.split('.')
        let ext = arr[arr.length - 1]
        if (ext == 'xlsx') {
          localStorage.setItem('idForWage', this.list[0].user_id)
          this.$http.uploadFile(file, '/wages/index').then(res => {
            this.$message(res.data.msg)
            if (res.data.code == 1) {
              this.getList()
            }
          })
        }
      },
      output() {
        this.$http.downloadFile('wages/export')
      },
      toMembers() {
        this.$router.push("/wageSheet/members");
      },
      getList() {
        this.$http.get('wages/index', { token: localStorage.getItem('token') }).then(res => {
          // if(res.code==1){
            this.list = res.data
            // this.name = res.data[0].name
          // }
        })
      }
    },
    created() {
      this.outputwagessheet = this.$http.allow('财务导出工资单')
      this.getList()
      this.name = JSON.parse(localStorage.getItem('login_status')).info.name
      // this.user_id = JSON.parse(localStorage.getItem('login_status')).info.user_id
      var allow = JSON.parse(localStorage.getItem('login_status')).info.allow;
      for(var i of allow){
        if(i.name == '新建工资单'){
          this.isCaiwu = true
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .wageSheet {
    text-align: left;
  }

  .topBtns {
    margin-bottom: 20px;
  }

  .topSelect {
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .topSelect-btn {
    padding: 10px 0;
  }

  .table {
    border: 1px solid #ccc;
    text-align: center;
    margin: 10px 0;
  }

  .el-row {
    display: flex;
    line-height: 40px;

    .el-col {
      flex: 1;
      border-right: 1px solid #ccc;
    }

    .el-col:nth-last-of-type(1) {
      border: none;
    }
  }

  .el-row:nth-of-type(1) {
    border-bottom: 1px solid #ccc;
  }

  .search {
    width: 200px;
    margin-left: 10px;
  }

  .total {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  h4 {
    display: inline;
  }

  .line {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }

  .item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  #file {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
  }
</style>