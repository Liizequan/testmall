<template>
  <div class="contain">
    <div style="margin-bottom:20px;">
      <el-button type="primary" @click="createNew">新建日程</el-button>
      <el-button type="primary" @click="change">日程管理</el-button>
      <el-button @click="isList = false" v-show="isList">返回</el-button>
      <el-button type="primary" @click="backCur" v-show="!isList">回到今天</el-button>
    </div>
    <!-- <div class="content-backfff">
    <div class="between flex-items-center calendar-top">
      <span @click="onClickNavi($event)">
        <el-button type="button" class="btn btn-default btn-sm move-day" data-action="move-prev">上一个</el-button>
        <el-button type="button" class="btn btn-default btn-sm move-today" data-action="move-today">今天</el-button>
        <el-button type="button" class="btn btn-default btn-sm move-day" data-action="move-next">下一个</el-button>
      </span>
      <span class="render-range">{{dateRange}}</span>
      
      <el-select v-model="selectedView">
        <el-option v-for="(options, index) in viewModeOptions" :value="options.value" :key="index">
          {{options.title}}
        </el-option>
      </el-select>
    </div>
    <calendar style="height: 620px"
      ref="tuiCal"
      :useDetailPopup="useDetailPopup"
      :view="selectedView"
      :calendars="calendarList"
      :schedules="scheduleList"
      :theme="theme"
      :template="template"
      :taskView="false"
      :scheduleView="true"
      :month="month"
      :week="week"
      :timezones="timezones"
      :disableDblClick="disableDblClick"
      :isReadOnly="isReadOnly"
      @clickSchedule="onClickSchedule"
      @clickDayname="onClickDayname"
      @beforeDeleteSchedule="onBeforeDeleteSchedule"
      @afterRenderSchedule="onAfterRenderSchedule"
      @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
    />
  </div> -->
    <!--  @dayClick="dayClick" @changeMonth="changeMonth" -->
    <el-table :data="tableData" v-if="isList" stripe
    :header-cell-style="$store.state.headStyle">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="主题内容" prop="title"></el-table-column>
      <el-table-column label='开始时间' prop='start'></el-table-column>
      <el-table-column label='结束时间' prop='end'></el-table-column>
      <el-table-column label='客户' prop='customer.name'></el-table-column>
      <el-table-column label='备注' prop='remark'></el-table-column>
      <el-table-column label='操作'>
        <template slot-scope="scope">
          <div>
            <el-link :underline='false' type='primary' @click="getDetl(scope.row.id)">详情 <i class='el-icon-arrow-right'></i></el-link>
            <el-link :underline='false' type='primary'  class='ml20' @click="del(scope.row.id)">删除 <i class='el-icon-delete'></i></el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <full-calendar :events="fcEvents" :firstDay="1" ref="calen" @eventClick="eventClick" locale="zh" v-else>
    </full-calendar>
    <el-dialog :visible.sync="createDia" :title="who=='edit'?'编辑日程':'新增日程'">
      <el-form label-width="100px">
        <el-form-item label='主题内容:'>
          <el-input placeholder="请填主题内容（30之内）" v-model="dia.content" maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item label='开始时间:'>
          <el-date-picker placeholder="请选择" class="el_date" v-model="dia.start_time"></el-date-picker>
        </el-form-item>
        <el-form-item label='结束时间:'>
          <el-date-picker placeholder="请选择" class="el_date" v-model="dia.end_time"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <menRadio :excuters="men" @theRes="chanExcu" class="ofs">
            <template slot="title">
              <h3>关联客户</h3>
            </template>
            <template slot="main">
              <el-link><i class='el-icon-link'>关联客户</i></el-link>
              <div v-if="radioRes"><i class='el-icon-link'></i>{{radioRes.depart}}-{{radioRes.name}}</div>
            </template>
          </menRadio>
        </el-form-item> -->
        <el-form-item label='关联客户:'>
          <Customer class="el_date" :customId="customId" :linkTitle="linkTitle" :boxTitle="boxTitle"
            @customerId="getAdmin" />
        </el-form-item>
        <el-form-item label='备注:'>
          <el-input type="textarea" placeholder="请填备注255字内" max-length="255" v-model="dia.remark" clearable></el-input>
        </el-form-item>
        <el-form-item label='标记:'>
          <div class="colorCon">
            <div v-for="(item,index) in colors" :key="index" :class="item" @click="selColor(index)">
              <i class='el-icon-check' v-if="curIndex == index"></i>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="addCal">确定</el-button>
        <el-button @click="createDia = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="日程详情" :visible.sync="detlDia">
      <el-form label-width="100px">
        <el-form-item label='主题内容:'>{{itemDetl.title}}</el-form-item>
        <el-form-item label='开始时间:'>{{itemDetl.start}}</el-form-item>
        <el-form-item label='结束时间:'>{{itemDetl.end}}</el-form-item>
        <el-form-item label='客户名称:'>{{customerName}}</el-form-item>
        <el-form-item label='备注:'>{{itemDetl.remark}}</el-form-item>
        <!-- <el-form-item label='标记:'>
          <div class="colorCon">
            <div v-for="(item,index) in colors" :key="index" :class="item">
              <i class='el-icon-check' v-if="itemDetl.cssClass == item"></i>
            </div>
          </div>
        </el-form-item> -->
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="editCal">编辑</el-button>
        <el-button @click="del(itemDetl.id)">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import menRadio from '@/components/menRadio.vue'
  import Customer from "@/components/custom/radio.vue"

  import 'tui-time-picker/dist/tui-time-picker.css';
  import 'tui-date-picker/dist/tui-date-picker.css';
  import 'tui-calendar/dist/tui-calendar.css';
  import './calendarChild/app.css';

  // import {Calendar} from '../src/index';

  import Calendar from "@/components/Calendar.vue";
  import myTheme from './calendarChild/myTheme';

  const today = new Date();

  const getDate = (type, start, value, operator) => {
    start = new Date(start);
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (operator === '+') {
      start[`set${type}`](start[`get${type}`]() + value);
    } else {
      start[`set${type}`](start[`get${type}`]() - value);
    }

    return start;
  };
  var events = [
    // {
    //   title: '约客户',
    //   start: '2020-01-01',
    //   cssClass: 'family',
    //   YOUR_DATA: {}
    // },
    // {
    //   title: '签合同',
    //   start: '2020-01-04',
    //   end: '2020-01-10',
    //   cssClass: ['full_cal_red', 'career'],
    //   YOUR_DATA: {}
    // },
    // {
    //   title: '签合同',
    //   start: '2021-01-04',
    //   end: '2021-01-10',
    //   cssClass: ['full_cal_red', 'career'],
    //   YOUR_DATA: {}
    // }
  ]
  export default {
    name: 'App',
    components: {
      'calendar': Calendar,
      'full-calendar': require('@/components/vue-fullcalendar'),
      menRadio,
      Customer,
    },
    data() {
      return {
        tableData: '',
        // 弹linkTitle
        linkTitle: '添加',
        boxTitle: '请选择关联客户',
        itemDetl: '',
        detlData: [],
        customer: '',//关联客户
        customId: null,//关联用户id
        customerName: '',//关联用户名
        detlDia: false,
        dia: {
          content: '',
          start_time: '',
          end_time: '',
          remark: '',
          mark: ''
        },
        radioRes: "",
        men: '',
        curIndex: 0,
        colors: ['full_cal_red', 'full_cal_purple', 'full_cal_brown', 'full_cal_blue', 'full_cal_yellow', 'full_cal_orange'],
        createDia: false,
        fcEvents: events,
        viewModeOptions: [
          {
            title: '月份',
            value: 'month'
          },
          {
            title: '周期',
            value: 'week'
          },
          {
            title: '日期',
            value: 'day'
          }
        ],
        dateRange: '',
        selectedView: 'month',
        //颜色
        calendarList: [
          {
            id: '0',
            name: '蓝色',
            bgColor: 'blue',
            borderColor: 'blue'
          },
          {
            id: '1',
            name: '黑色',
            bgColor: 'black',
            borderColor: 'black'
          }
        ],
        // 后台数据
        scheduleList: [],
        timezones: [{
          timezoneOffset: 540,
          displayLabel: '09:00',
          tooltip: 'Seoul'
        },
        ],
        theme: myTheme,
        template: {
          // milestone(schedule) {
          //   return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
          // },
          // milestoneTitle() {
          //   return 'Milestone';
          // },
          allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
          },
          alldayTitle() {
            return '全天';
          }
        },
        month: {
          startDayOfWeek: 0
        },
        week: {
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true
        },
        taskView: true,
        scheduleView: true,
        useDetailPopup: true,
        disableDblClick: true,
        isReadOnly: false,
        who: '',
        isCid: '',//显示的id
        isList: false
      };
    },
    watch: {
      createDia() {
        if (!this.createDia) {
          this.who = ''
        }
      }
      // selectedView(newValue) {
      //   this.$refs.tuiCal.invoke('changeView', newValue, true);
      //   this.setRenderRangeText();
      // }
    },
    methods: {
      change() {
        this.isList = true
      },
      // 获取关联客户
      getAdmin(val) {
        this.customer = val
      },
      del(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('index/delschedule', {
            id: id
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getCal()
              this.detlDia = false
            }
          })
        }).catch(() => {
        });
      },
      editCal() {
        this.detlDia = false
        this.createDia = true
        this.who = 'edit'
        // this.getDetl(this.isCid)
      },
      moreClick(date, events, jsEvent) {
        
      },
      getCal() {
        this.$http.get('index/indexschedule').then(res => {
          this.fcEvents = res.msg
        })
      },
      getList(){
        this.$http.get('index/indexscheduletwo').then(res=>{
          // for(let i in res.msg){
          //   res.msg[i].name = res.msg[i].customer.name
          // }
          this.tableData = res.msg
        })
      },
      addCal() {
        if (!this.dia.content) {
          this.$message('请填主题内容');
        } else if (!this.dia.start_time) {
          this.$message('请选开始时间')
        } else if (!this.dia.end_time) {
          this.$message('请选结束时间')
        } else if (this.dia.start_time > this.dia.end_time) {
          this.$message('开始时间不能大于结束时间')
        } else {
          let api
          let reqBody = {
            token: localStorage.getItem('token'),
            title: this.dia.content,
            start: this.$http.getDate(this.dia.start_time),
            end: this.$http.getDate(this.dia.end_time),
            customer: this.customer,
            remark: this.dia.remark,
            cssClass: this.colors[this.curIndex]
          }
          if (this.who == 'edit') {
            reqBody.id = this.itemDetl.id
            api = 'index/editschedule'
          } else {
            api = 'index/addschedule'
          }
          this.$http.post(api, reqBody).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              this.getCal()
              this.getList()
              this.createDia = false
              this.who = ''
            }
          })
        }
      },
      chanExcu(e) {
        
        this.radioRes = e
      },
      getMen() {
        this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
          for (let i in res) {
            res[i].group = []
          }
          this.men = res
        })
      },
      selColor(index) {
        this.curIndex = index
      },
      createNew() {
        this.createDia = true
        this.dia = {
          content: '',
          start_time: '',
          end_time: '',
          remark: '',
          mark: ''
        }
      },
      backCur() {
        this.$refs.calen._data.currentDate = new Date()
      },
      eventClick(event, jsEvent, pos) {
        
        this.isCid = event.id
        this.detlDia = true

        this.getDetl(event.id)

      },
      getDetl(id) {
        this.$http.get('index/lookschedule', { id: id }).then(res => {
          this.detlDia = true
          this.itemDetl = res.msg
          // this.itemDetl.cusName = this.$http.getOneCustomer(this.men,res.msg.customer).name
          this.dia.content = res.msg.title
          this.dia.start_time = new Date(res.msg.start)
          this.dia.end_time = new Date(res.msg.end)
          // this.radioRes = this.$http.getOneCustomer(this.men,res.msg.customer)
          this.customId = parseInt(res.msg.customer)
          this.dia.remark = res.msg.remark
          this.curIndex = this.getColorIndex(res.msg.cssClass)

          
          this.$http.get('marketing/group', {
            // token: this.$token
          }).then(res => {
            
            // this.data = res
            var newArray = [];
            for (var i of res) {
              for (var j of i.customer) {
                
                newArray.push(j)
                if (this.customId == j.id) {
                  return this.customerName = j.name
                }
                else {
                  // this.customerName = null
                  // this.customId = null
                }
              }
            }

            if (newArray.indexOf(this.customId) == '-1') {
              this.customerName = null
            }
          })
        })
      },
      getColorIndex(colorName) {
        for (let i in this.colors) {
          if (this.colors[i] == colorName) {
            return i
          }
        }
      },
      changeMonth(start, end, current) {
        
      },
      hide() {
        
      },
      init() {
        // this.setRenderRangeText();
      },
      // setRenderRangeText() {
      //   const { invoke } = this.$refs.tuiCal;
      //   const view = invoke('getViewName');
      //   const calDate = invoke('getDate');
      //   const rangeStart = invoke('getDateRangeStart');
      //   const rangeEnd = invoke('getDateRangeEnd');
      //   let year = calDate.getFullYear();
      //   let month = calDate.getMonth() + 1;
      //   let date = calDate.getDate();
      //   let dateRangeText = '';
      //   let endMonth, endDate, start, end;
      //   switch (view) {
      //     case 'month':
      //       dateRangeText = `${year}-${month}`;
      //       break;
      //     case 'week':
      //       year = rangeStart.getFullYear();
      //       month = rangeStart.getMonth() + 1;
      //       date = rangeStart.getDate();
      //       endMonth = rangeEnd.getMonth() + 1;
      //       endDate = rangeEnd.getDate();

      //       start = `${year}-${month}-${date}`;
      //       end = `${endMonth}-${endDate}`;
      //       dateRangeText = `${start} ~ ${end}`;
      //       break;
      //     default:
      //       dateRangeText = `${year}-${month}-${date}`;
      //   }
      
      //   //周
      
      //   // 日
      
      //   this.dateRange = dateRangeText;
      // },

      // onClickNavi(event) {
        
      //   if (event.target.tagName === 'BUTTON') {
      //     const { target } = event;
      //     let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
      //     action = action.replace('move-', '');

      //     this.$refs.tuiCal.invoke(action);
      //     this.setRenderRangeText();
      //   }
      // },
      onClickSchedule(res) {
        console.group('onClickSchedule');
        console.groupEnd();
      },
      onClickDayname(res) {
        // view : week, day
        console.group('onClickDayname');
        console.groupEnd();
      },
      onBeforeDeleteSchedule(res) {
        console.group('onBeforeDeleteSchedule');
        console.groupEnd();

        const idx = this.scheduleList.findIndex(item => item.id === res.schedule.id);
        this.scheduleList.splice(idx, 1);
      },
      onAfterRenderSchedule(res) {
        console.group('onAfterRenderSchedule');
        console.groupEnd();
      },
      onClickTimezonesCollapseBtn(timezonesCollapsed) {
        // view : week, day
        console.group('onClickTimezonesCollapseBtn');
        console.groupEnd();

        if (timezonesCollapsed) {
          this.theme['week.timegridLeft.width'] = '100px';
          this.theme['week.daygridLeft.width'] = '100px';
        } else {
          this.theme['week.timegridLeft.width'] = '50px';
          this.theme['week.daygridLeft.width'] = '50px';
        }
      }

    },
    mounted() {
      this.init();
    },
    created() {
      this.getMen()
      this.getCal()
      this.getList()
      this.$nextTick(()=>{
        if(this.$route.query.curDate){
          this.$refs.calen._data.currentDate =new Date(JSON.parse(this.$route.query.curDate))
        }
      })
      this.$bus.$emit('setIndex',0)
    }
  };
</script>
<style scoped>
  /deep/.el-popover__reference {
    display: inline;
  }

  .contain {
    text-align: left;
  }

  .btns {
    text-align: center;
  }
</style>
<style>
  .full-calendar-header .title {
    width: 130px !important;
    display: inline-block !important;
  }

  .header-center>.prev-year {
    background: #409EFF;
    color: #fff;
    user-select: none;
  }

  .header-center>.prev-year:nth-of-type(1) {
    border-radius: 4px 0 0 4px;
    padding: 4px 0;
    padding-left: 8px;
  }

  .header-center>.prev-year:nth-of-type(2) {
    border-radius: 0 4px 4px 0;
    padding: 4px 0;
    padding-right: 8px;
  }

  .header-center>.prev-month {
    margin-left: 10px;
    user-select: none;
    background: #409EFF;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .header-center>.next-year {
    background: #409EFF;
    color: #fff;
    user-select: none;
  }

  .header-center>.next-year:nth-last-of-type(2) {
    border-radius: 4px 0 0 4px;
    padding: 4px 0;
    padding-left: 8px;
  }

  .header-center>.next-year:nth-last-of-type(1) {
    border-radius: 0 4px 4px 0;
    padding: 4px 0;
    padding-right: 8px;
  }

  .header-center>.next-month {
    margin-right: 10px;
    user-select: none;
    background: #409EFF;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .full_cal_red {
    background: #62A8EA !important;
  }

  .full_cal_purple {
    background: #57C7D4 !important;
  }

  .full_cal_brown {
    background: #46BE8A !important;
  }

  .full_cal_blue {
    background: #F2A654 !important;
  }

  .full_cal_yellow {
    background: #FF4A4A !important;
  }

  .full_cal_orange {
    background: #926DDE !important;
  }

  div.full_cal_red,
  div.full_cal_purple,
  div.full_cal_brown,
  div.full_cal_blue,
  div.full_cal_yellow,
  div.full_cal_orange {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
  }

  .colorCon {
    display: flex;
    align-items: center;
    vertical-align: middle;
    height: 40px;
  }

  .el-icon-check {
    color: #fff;
  }

  .event-item {
    color: #fff !important;
  }
</style>