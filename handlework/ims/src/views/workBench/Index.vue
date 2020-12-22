<template>
  <div class="index contain">
    <div class="index-container content-backfff">
      <!-- 1 公告 notice -->
      <el-card class="index-list t notice" body-style="dispaly:flex; flex-direction: column; justify-content: space-between;
                height: calc(100% - 109px);">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">公告栏 <span class="i" :class="announcement?'':'huiground'">{{announcement}}</span></span>
          <el-button style="padding:8px 15px" @click="goNoties">更多</el-button>
        </div>
        <div v-for="(item, index) in notice" :key="index" class="text item xyk-scroll" v-if="index<2"
          @click="togonggaodetail(item)">
          <p class="between flex-items-center">
            <span class="font16-nobold-3 veticel1" style="max-width:400px">{{ item.title }}</span>
            <span class="left font14-nobold-9">{{ item.create_time }}</span>
          </p>
          <p class="left font14-nobold-9">
            <span class="veticel4 is-kai-font fortwoline" style="font-size: .975rem;">{{ item.content }}</span>
          </p> 
        </div>
      </el-card>
      <!-- 2 备忘录 memorial -->
      <!-- <el-card class="index-list t memorial" body-style="dispaly:flex; flex-direction: column; justify-content: space-between;
                height: calc(100% - 109px);">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">备忘录</span>
          <el-button style="padding:8px 15px" @click="goMemorial">更多</el-button>
        </div>
        <div v-for="(item, index) in forgets" :key="index" class="text item" v-if="index < 3">
          <p class="between" style="padding-bottom:10px">
            <span class="font16-nobold-3  veticel1" style="max-width:400px">{{ item.title }}</span>
            <span class="left font14-nobold-9">{{ item.create_time }}</span>
          </p>
          <p class="left font14-nobold-9">
            <span class="veticel2 is-kai-font">{{ item.content }}</span>
          </p>
        </div>
      </el-card> -->
      <!-- 3 邮箱 email -->
      <el-card class="index-list t email" body-style="padding-top:0">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">邮箱</span>
          <el-button style="padding:8px 15px" @click="goEmail">更多</el-button>
        </div>
        <ul>
          <li class="index-list-table" v-for="(item, index) in emailData" :key="index" @click="toyouxiangdetl(item)">
            <h4 class="left font14-isbold-6">{{ item.title }}</h4>
            <span class="right font14-nobold-9">{{ item.create_time }}</span>
          </li>
          <div v-if="!emailData.length" style="text-align: center;color:#ccc;font-size:15px;margin-top:60px;">暂无数据</div>
        </ul>
      </el-card>

      <!-- 5 审批 approval -->
      <el-card class="index-list t approval" body-style="padding-top:0">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">待办审批</span>
          <el-button style="padding:8px 15px" @click="goApproval">更多</el-button>
        </div>
        <el-table :data="approval" style="width: 100%" @row-click="dairowclick">
          <el-table-column label="申请时间" prop="create_time"> </el-table-column>
          <el-table-column label="申请人" prop="user_id"> </el-table-column>
          <el-table-column label="审批类型" prop="type"> </el-table-column>
          <el-table-column label="审批状态" prop="status"> </el-table-column>
          <el-table-column label="审批人" prop="approval"> </el-table-column>
        </el-table>
      </el-card>
      <!-- 6 日历 calendar -->
      <el-card class="index-list t calendar" body-style="padding-top:0;">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">日历日程</span>
          <el-button style="padding:8px 15px" @click="goCalendar">更多</el-button>
        </div>
        <el-calendar v-model="theMonth">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected' : ''" @click="getMonth">
              <!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}} -->
              <div class="calender-fixed">
                <p @click="closeBox">
                  {{ data.day.split("-")[2] }}
                  <span class="calender-color" v-if="dateList.indexOf(data.day)!=-1"></span>
                </p>
                <!-- <div v-if="data.isSelected">
                  <ElasticFrame name="你好，我是自定义自检" v-if="isShow" @close="close">
                    {{ data.isSelected ? "hi ✔️" : "" }}
                    {{ total }}
                    {{ data.day.split("-")[2]}}
                  </ElasticFrame>
                </div> -->
              </div>
            </div>
          </template>
        </el-calendar>
      </el-card>
      <!-- 4 工单 workorder -->
      <el-card class="index-list t workorder" body-style="padding-top:0">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">新工单</span>
          <el-button style="padding:8px 15px" @click="goWorkorder">更多</el-button>
        </div>
        <el-table :data="workOrder" style="width: 100%" @row-click="gongdanrowclick">
          <el-table-column label="项目名称" prop="title"> </el-table-column>
          <el-table-column label="执行人" prop="executor"> </el-table-column>
          <el-table-column label="开始时间" prop="begin_time"> </el-table-column>
          <el-table-column label="负责人" prop="charge"> </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import ElasticFrame from "../../components/ElasticFrame.vue";
  export default {
    data() {
      return {
        theMonth: new Date(),
        announcement: '',//公告栏提示文字
        today: new Date('2020-01-02'),
        // 备忘录
        forgets: [],
        // 公告
        notice: [],
        // 日历
        value: "",
        // 工单
        workOrder: [],
        // 邮箱
        emailData: [],
        // 审批中心
        approval: [],
        tableData: [],
        total: 0,
        isShow: false,
        dateList: []
      };
    },
    components: {
      ElasticFrame
    },
    methods: {
      gongdanrowclick(row){
        this.$router.push({ path: "/sheetSys/sheetDetl", query: { id: row.id } });
      },
      dairowclick(row) {
        console.log(row)
        let index = row
        if (index.type == '普通') {
          this.$router.push({ path: "/checkCenter/normalDetl", query: { id: index.id } });
        } else if (index.type == '请假') {
          this.$router.push({ path: "/checkCenter/holidayDetl", query: { id: index.id } });
        } else if (index.type == '加班') {
          this.$router.push({ path: "/checkCenter/overtimeDetl", query: { id: index.id } });
        } else if (index.type == '出差') {
          this.$router.push({ path: "/checkCenter/outsideDetl", query: { id: index.id } });
        } else if (index.type == '外勤') {
          this.$router.push({ path: "/checkCenter/travelDetl", query: { id: index.id } });
        } else if (index.type == '借支') {
          this.$router.push({ path: "/checkCenter/debitDetl", query: { id: index.id } });
        } else if (index.type == '差旅') {
          this.$router.push({ path: "/checkCenter/reimbDetl", query: { id: index.id } });
        }
      },
      toyouxiangdetl(e) {
        // console.log(e)query:{navIndex:this.navIndex}
        this.$router.push({path:'/email/detail/'+e.id})
      },
      togonggaodetail(e) {
        this.$router.push('/notice/detail/' + e.id)
      },
      getMonth() {
      },
      getSchedule() {
        this.$http.get('index/indexschedule', {
          token: localStorage.getItem('token')
        }).then(res => {
          for (let i in res.msg) {
            this.dateList = [...this.dateList, ...this.formatEveryDay(res.msg[i].start, res.msg[i].end)]
          }
        })
      },
      formatEveryDay(start, end) {
        let dateList = [];
        var startTime = this.getDate(start);
        var endTime = this.getDate(end);

        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear();
          var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
          var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
          dateList.push(year + "-" + month + "-" + day);
          startTime.setDate(startTime.getDate() + 1);
        }
        return dateList;
      },
      getDate(datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1] - 1, temp[2]);
        return date;
      },
      indexMethod(index) {
        return index * 2;
      },
      //1前往公告栏
      goNoties() {
        this.$router.push("/notice");
      },
      //2前往备忘录
      goMemorial() {
        this.$router.push('/memorial')
      },
      //3前往邮箱
      goEmail() {
        this.$router.push('/email')
      },
      //4前往工单
      goWorkorder() {
        this.$router.push('/sheetSys')
      },
      //5前往审批
      goApproval() {
        this.$router.push('/checkCenter')
      },
      //6前往日历
      goCalendar() {
        this.$router.push('/calendar')
      },
      // 显示弹框
      closeBox() {
        this.isShow = true;
        // console.log(this.theMonth, 'tttttttttttttttt')
        this.$router.push({ path: '/calendar', query: { curDate: JSON.stringify(this.theMonth) } })
      },
      // 关闭
      close(isShow) {
        // console.log('关闭')
        this.isShow = isShow;
        console.log(this.isShow);
      },
      init() {
        this.$http.get('index/main', { token: localStorage.getItem('token') }).then(res => {
          this.forgets = res.memorial  //备忘录
          this.notice = res.notice //公告栏
          this.workOrder = res.workorder//工单
          this.emailData = res.email//邮箱
          this.approval = res.approval
          this.announcement = res.announcement//公告栏提示
          localStorage.setItem('logo', JSON.stringify(res.logo))
          this.$store.state.logo = JSON.stringify(res.logo)
        })
      }
    },
    created() {
      this.init()
      this.getSchedule()
    },
    mounted() {
      document.body.style.setProperty('--themeColor', localStorage.getItem('themeColor'));
    },
  };
</script>

<style lang="less" scoped>
  .index {
    padding-bottom: 0px;

    .veticel1 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .veticel4 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-align: justify;
    }

    .index-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .index-list {
        width: 540px;
        height: 320px;
        padding: 0;
        margin-bottom: 30px;
        box-sizing: border-box;
        text-align: left;
        // background:pink;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        position: relative;
        transition: all .05s linear;

        .calender-color {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #f56c6c;
          border-radius: 50%;
          position: absolute;
          margin-left: 4px;
          margin-top: 4px;
        }

        .prev .calender-color,
        .next .calender-color {
          opacity: 0.5;
        }

        .calender-fixed {
          position: relative;
        }

        .item {
          flex: 1;
          height: 33%;
          overflow: auto;
        }

        .clearfix {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .el-table th:nth-child(2) {
            text-align: right;
          }

          span {
            position: relative;

            .i {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: -25px;
              color: #f56c6c;
              background: red;
              display: inline-block;
              height: 20px;
              width: 20px;
              border-radius: 10px;
              text-align: center;
              color: #fff;
              /* font-family:normal; */
            }
            .huiground{
              background:#ccc;
            }
          }
        }

        .index-list-table {
          height: 47px;
          line-height: 47px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e5e5;
        }

        .index-list-table:hover {
          background: #f5f7fa;
        }

        .el-table .cell {
          height: 37px;
          line-height: 37px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }

      .index-list:hover {
        box-shadow: 0 0px 10px 0px #6895c2;
        transform: scale(1.01);
        opacity: 1;
        /* rgba(111, 173, 192, 0.1); */
      }
    }
  }
  .fortwoline{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical;
  }
  /deep/.notice .el-card__body{
    display:flex;
  }
  /deep/.notice .xyk-scroll p:nth-of-type(1){
    margin-bottom:10px;
  }
  .is-kai-font{
    font-family: '微软雅黑' !important;
    font-size: 14px !important;
  }
</style>