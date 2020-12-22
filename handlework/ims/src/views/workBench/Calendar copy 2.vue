<template>
  <div class="calendar contain">
    <div class="calendar-container content-backfff flex-items-center">
      <div class="add">
        <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-plus"></i> 添加</el-button>
      </div>
      <div class="calendar-router">
        <el-button style="padding:0;"><router-link to="/calendar/month" style="text-align:center;display:block; padding:12px 20px;">月</router-link></el-button>
        <el-button style="padding:0;"><router-link to="/calendar/week" style="text-align:center;display:block; padding:12px 20px;">周</router-link></el-button>
        <el-button style="padding:0;"><router-link to="/calendar/day" style="text-align:center;display:block; padding:12px 20px;">日</router-link></el-button>
        <!-- <el-button @click="calendarType" type="month">月</el-button>
        <el-button type="week">周</el-button>
        <el-button type="day">日</el-button> -->
        <!-- <el-button v-for="(item,index) in calendarType" :key="index" :type="calendarTypeIndex == index ? 'primary' : ''" @click="calendarTap(index)">{{item}}</el-button> -->
        <!-- <el-button>今天</el-button> -->
      </div>
    </div>

    <el-dialog title="新增日程" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form">
        <el-form-item label="活动名称 :" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 :" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.start_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间 :" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.end_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <Customer @customer="getCustomer"/>
        </el-form-item>
        <el-form-item label="备注 :" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="标记 :" :label-width="formLabelWidth">
          <span class="text-left">
            <!-- <i class="el-icon-success"></i>
            <i class="el-icon-success"></i>
            <i class="el-icon-success"></i>
            <i class="el-icon-success"></i>
            <i class="el-icon-success"></i>
            <i class="el-icon-success"></i> -->
            <i v-for="(item,index) in colors" @click="colorsIndexs(index)" :class="(colorsIndex == index) ? 'el-icon-success' :'el-icon-remove' " :style="{'color':item.text}"></i>
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


    <router-view></router-view>
  </div>
</template>

<script>
// import Customer from '@components/Customer.vue'
import Customer from "../../components/Customer.vue";
export default {
  components:{
    Customer
  },
  data() {
    return{
      // 日历类型
      calendarType:['月','周','日'],
      calendarTypeIndex:0,

      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        start_time: '',//开始时间
        end_time: '',//结束时间
        textarea:'',//描述
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',

      colors:[
        {icon:'el-icon-success',text:'#62A8EA'},
        {icon:'el-icon-error',text:'#57C7D4'},
        {icon:'el-icon-error',text:'#46BE8A'},
        {icon:'el-icon-error',text:'#F2A654'},
        {icon:'el-icon-error',text:'#FF4A4A'},
        {icon:'el-icon-error',text:'#926DDE'},
      ],
      colorsIndex:0,
    }
  },
  methods: {
    // 月 周 日
    calendarTap(index){
      this.calendarTypeIndex = index
    },
    colorsIndexs(index){
      console.log(index)
      this.colorsIndex = index
    },
    getCustomer(val){
      console.log(val)
    }
  },
};
</script>

<style lang="less" scoped>
  .calendar-container{
    display: flex;
    justify-content: space-between;
      padding-bottom:20px;
  }
  .text-left {
    display:block;
    height:40px;
    line-height:45px;
    text-align:left;
    i{
      margin:0 4px;
      font-size:20px;
    }
  }
</style>
