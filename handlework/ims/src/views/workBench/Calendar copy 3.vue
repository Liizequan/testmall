<template>
<div class="contain">
  <div class="content-backfff">
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
  </div>
</div>
</template>
<script>
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

export default {
  name: 'App',
  components: {
    'calendar': Calendar
  },
  data() {
    return {
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
      scheduleList: [
        // {
        //   id: '1',
        //   calendarId: '0',
        //   title: 'TOAST UI Calendar Study',
        //   category: 'time',
        //   dueDateClass: '',
        //   start: today.toISOString(),
        //   end: getDate('hours', today, 3, '+').toISOString()
        // },
        // {
        //   id: '2',
        //   calendarId: '1',
        //   title: 'Practice',
        //   category: 'milestone',
        //   dueDateClass: '',
        //   start: getDate('date', today, 1, '+').toISOString(),
        //   end: getDate('date', today, 1, '+').toISOString(),
        //   isReadOnly: true
        // },
        // {
        //   id: '3',
        //   calendarId: '1',
        //   title: 'FE Workshop',
        //   category: 'allday',
        //   dueDateClass: '',
        //   start: getDate('date', today, 2, '-').toISOString(),
        //   end: getDate('date', today, 1, '-').toISOString(),
        //   isReadOnly: true
        // },
        // {
        //   id: '4',
        //   calendarId: '1',
        //   title: 'Report',
        //   category: 'time',
        //   dueDateClass: '',
        //   start: today.toISOString(),
        //   end: getDate('hours', today, 1, '+').toISOString()
        // }
      ],
      timezones: [{
        timezoneOffset: 540,
        displayLabel: '09:00',
        tooltip: 'Seoul'
      }, 
      // {
      //   timezoneOffset: -420,
      //   displayLabel: '08:00',
      //   tooltip: 'Los Angeles'
      // }
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
      isReadOnly: false
    };
  },
  watch: {
    selectedView(newValue) {
      this.$refs.tuiCal.invoke('changeView', newValue, true);
      this.setRenderRangeText();
    }
  },
  methods: {
    init() {
      this.setRenderRangeText();
    },
    setRenderRangeText() {
      const {invoke} = this.$refs.tuiCal;
      const view = invoke('getViewName');
      const calDate = invoke('getDate');
      const rangeStart = invoke('getDateRangeStart');
      const rangeEnd = invoke('getDateRangeEnd');
      let year = calDate.getFullYear();
      let month = calDate.getMonth() + 1;
      let date = calDate.getDate();
      let dateRangeText = '';
      let endMonth, endDate, start, end;

      switch (view) {
        case 'month':
          dateRangeText = `${year}-${month}`;
          break;
        case 'week':
          year = rangeStart.getFullYear();
          month = rangeStart.getMonth() + 1;
          date = rangeStart.getDate();
          endMonth = rangeEnd.getMonth() + 1;
          endDate = rangeEnd.getDate();

          start = `${year}-${month}-${date}`;
          end = `${endMonth}-${endDate}`;
          dateRangeText = `${start} ~ ${end}`;
          break;
        default:
          dateRangeText = `${year}-${month}-${date}`;
      }
      this.dateRange = dateRangeText;
    },
    onClickNavi(event) {
      if (event.target.tagName === 'BUTTON') {
        const {target} = event;
        let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
        action = action.replace('move-', '');

        this.$refs.tuiCal.invoke(action);
        this.setRenderRangeText();
      }
    },
    onClickSchedule(res) {
      console.group('onClickSchedule');
      console.log('MouseEvent : ', res.event);
      console.log('Calendar Info : ', res.calendar);
      console.log('Schedule Info : ', res.schedule);
      console.groupEnd();
    },
    onClickDayname(res) {
      // view : week, day
      console.group('onClickDayname');
      console.log(res.date);
      console.groupEnd();
    },
    onBeforeDeleteSchedule(res) {
      console.group('onBeforeDeleteSchedule');
      console.log('Schedule Info : ', res.schedule);
      console.groupEnd();

      const idx = this.scheduleList.findIndex(item => item.id === res.schedule.id);
      this.scheduleList.splice(idx, 1);
    },
    onAfterRenderSchedule(res) {
      console.group('onAfterRenderSchedule');
      console.log('Schedule Info : ', res.schedule);
      console.groupEnd();
    },
    onClickTimezonesCollapseBtn(timezonesCollapsed) {
      // view : week, day
      console.group('onClickTimezonesCollapseBtn');
      console.log('Is Collapsed Timezone? ', timezonesCollapsed);
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
  }
};
</script>
<style lang="less" >
</style>
