<template>
    <div>
        <!-- 我是首页 -->
        <!-- 头部 -->
        <header class="day-item  border-bottom pbom20">
            <ul class="between">
                <li class="day-list">
                    <span>今日订单量</span>
                    <div class="between">
                        <div>
                            <h3>{{dayorder}}</h3>
                            <p :class="staOrder=='el-icon-top' ? 'green' : staOrder == 'el-icon-bottom' ? 'red' : ''">
                                <small>
                                    <i :class="staOrder"></i>
                                    <!-- <i class="el-icon-top"></i>
                                    <i class="el-icon-right"></i> -->
                                    <!-- 13.8%     -->
                                    {{perOrder}}%
                                </small>
                            </p>
                        </div>
                        <div v-if="isGetData">
                            <columnar :xData = "xData" :yData = "yData" :yBack = "yBack1"></columnar>
                        </div>
                    </div>
                </li>
                <li class="day-list">
                    <span>今日收入</span>
                    <div class="between">
                        <div>
                            <h3>¥{{dayReceive}}</h3>
                             <p :class="staReceive=='el-icon-top' ? 'green' : staReceive == 'el-icon-bottom' ? 'red' : ''"> 
                                <small>
                                    <!-- <i class="el-icon-bottom"></i> -->
                                    <i :class="staReceive"></i>
                                    <!-- <i class="el-icon-right"></i> -->
                                    <!-- 13.8% -->
                                    {{perReceive}}%
                                </small>
                            </p>
                        </div>
                        <div v-if="isGetData">
                            <columnar1 :xData = "xData1" :yData = "yData1" :yBack = "yBack"></columnar1>
                        </div>
                    </div>
                </li>
                <li class="day-list">
                    <span>今日支出</span>
                    <div class="between">
                        <div>
                            <h3>¥{{dayPay}}</h3>
                            <p :class="staPay=='el-icon-top' ? 'green' : staPay == 'el-icon-bottom' ? 'red' : ''">
                                <small>
                                    <i :class="staPay"></i>
                                    <!-- <i class="el-icon-top"></i>
                                    <i class="el-icon-right"></i> -->
                                    <!-- 13.8%     -->
                                    {{perPay}}%
                                </small>
                            </p>
                        </div>
                        <div v-if="isGetData">
                            <columnar2 :xData = "xData2" :yData = "yData2" :yBack = "yBack"></columnar2>
                        </div>
                    </div>
                </li>
            </ul>
        </header>

        <div class="between ptop20 items-center">
            <h2 class="columnar-title">统计</h2>
            <el-select v-model="value" style="width:160px;" 
                @change="timeChange" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div id="myChart">
        </div>

        <div class="table">
            <h2 class="columnar-title">最近订单</h2>
            <el-table
                class="ptop20"
                ref="filterTable"
                :data="latestOrder"
                style="width: 100%">
                <el-table-column prop="numberOne" label="业务单号" width="" column-key="date">
                    <template slot-scope="scope">
                        <el-link :underline="false" @click="goOrder(scope.row.id)">
                            {{scope.row.numberOne}}
                        </el-link>
                    </template>   
                </el-table-column>
                <el-table-column prop="deliver" label="发货地" width="" column-key="date">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.deliver || '暂无收货地址'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="开单时间" width="" column-key="date">
                </el-table-column>
                <el-table-column prop="cartType" label="用车类型" width="" column-key="date">
                </el-table-column>
                <el-table-column prop="weight" label="重量/件数" width="" column-key="date">
                    <template slot-scope="scope">
                        <div>
                            {{(scope.row.weight || '') +'/' + (scope.row.num || '')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cost" label="总费用（￥）" width="" column-key="date">
                </el-table-column>
                <el-table-column prop="date" label="订单状态" width="" column-key="date">
                    <template slot-scope="scope">
                        <div class="fan-btn"
                            :class="scope.row.status== 1 ? 'backf' 
                            : scope.row.status== 2 ? 'backy' 
                            : scope.row.status== 3 ? 'backo' 
                            : scope.row.status== 4 ? 'backz'  
                            : scope.row.status== 5 ? 'backb' 
                            : scope.row.status== 6 ? 'backg' : 'backd' "
                        >
                            {{
                                scope.row.status== 1 ? '进行中' : scope.row.status == 2 ? '待发货' : scope.row.status == 3 ? '运输中' :
                                scope.row.status== 4 ? '待提货' : scope.row.status == 5 ? '待回单' : scope.row.status== 6 ? '已完成' : 
                                scope.row.status== 7 ? '异常' :'取消' 
                            }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import columnar from '@/components/columnar.vue'
import columnar1 from '@/components/columnar1.vue'
import columnar2 from '@/components/columnar2.vue'
export default {
    components:{
        columnar,
        columnar1,
        columnar2
    },
    data(){
        return{
            xData: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天","第八天","第九天","第十天"],
            yData: [],
            xData1: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天","第八天","第九天","第十天"],
            yData1: [],
            xData2: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天","第八天","第九天","第十天"],
            yData2: [],
            yBack: {first:'#55D8FE',last:'#54D8FF'},
            yBack1: {first:'#55D8FE',last:'#54D8FF'},



            options: [
                {
                value: '1',
                label: '最近一周'
                }, {
                value: '2',
                label: '最近一个月'
                }, {
                value: '3',
                label: '最近六个月'
                }, {
                value: '4',
                label: '最近一年'
                }, 
            ],
            value: '1',


            dayorder:'',//订单量
            perOrder:'',//订单量%
            staOrder:'',//订单量状态
            dayPay:'',//今日支出
            perPay:'',//今日支出$
            staPay:'',//今日支出状态
            dayReceive:'',//今日收入
            perReceive:'',//今日收入%
            staReceive:'',//今日收入状态
            latestOrder:[],//最近订单
            isGetData:false,//默认不显示echart
        }
    },
    created() {
        this.getIndexData();
    },
    mounted() {
        this.drawLine(this.$api.budgetWeek);
    },
    methods: {
        // 前往订单详情
        goOrder(val){
            console.log(val)
            this.$router.push({
                path: '/order/detail',
                query: {
                    id: val
                }
            })
        },
        // 时间选择
        timeChange(val){
            console.log(val)
            if(val == 1){
                this.drawLine(this.$api.budgetWeek);
            }else if(val == 2){
                this.drawLine(this.$api.budgetMonth);
            }else if(val==3){
                this.drawLine(this.$api.budgetSixMonth);
            }else{
                this.drawLine(this.$api.budgetYear);
            }
        },
        // 获取数据
        getIndexData(){
            this.$http.get(this.$api.indexMain,{},res=>{
                if(res.data.perOrder.toString().search("-") != -1) {
                    this.staOrder = 'el-icon-bottom'
                }else if(res.data.perOrder == 0){
                    this.staOrder = 'el-icon-right'
                }else{
                    this.staOrder = 'el-icon-top'
                }

                if(res.data.perPay.toString().search("-") != -1) {
                    this.staPay = 'el-icon-bottom'
                }else if(res.data.perPay == 0){
                    this.staPay = 'el-icon-right'
                }else{
                    this.staPay = 'el-icon-top'
                }
                
                if(res.data.perReceive.toString().search("-") != -1) {
                    this.staReceive = 'el-icon-bottom'
                }else if(res.data.perReceive == 0){
                    this.staReceive = 'el-icon-right'
                }else{
                    this.staReceive = 'el-icon-top'
                }
                
                // staPay
                // staReceive
                this.dayorder = res.data.dayorder;
                this.perOrder = res.data.perOrder; 
                this.dayPay = res.data.dayPay
                this.perPay = res.data.perPay;
                this.dayReceive =res.data.dayReceive;
                this.perReceive =res.data.perReceive;
                this.latestOrder = res.data.latestOrder;
                this.yData = res.data.tendayorder
                this.yData1 = res.data.tendayReceive
                this.yData2 = res.data.tendayPay

                var xData = [], yData = []; 
                var xData1= [], yData1= [];
                if(res.code==1){
                    this.isGetData = true
                }

                // var payChart = res.data.payChart;//紫色
                // var payArr = Object.entries(payChart)
                // for (var i of payArr){
                //     xData.push(i[0])
                //     yData.push(i[1])
                // }
                // var receiveChart = res.data.receiveChart;//蓝色
                // var receiveArr = Object.entries(receiveChart)
                // for (var i of payArr){
                //     xData1.push(i[0])
                //     yData1.push(i[1])
                // }
                

            })
        },
        // 绘图
        drawLine(url) {
            // 基于准备好的dom，初始化echarts实例
            this.$http.post(url,{},res=>{
                console.log(res)
                var xData = [], yData = []; 
                var xData1= [], yData1= [];

                var payChart = res.data.payChart;//紫色
                var payArr = Object.entries(payChart)
                for (var i of payArr){
                    xData.push(i[0])
                    yData.push(i[1])
                }
            //     this.xData = xData;
            //     this.yData = yData;

                var receiveChart = res.data.receiveChart;//蓝色
                var receiveArr = Object.entries(receiveChart)
                for (var i of receiveArr){
                    xData1.push(i[0])
                    yData1.push(i[1])
                }
            //     this.xData1 = xData1;
            //     this.yData1 = yData1;
                console.log(xData)
                console.log(yData)
                console.log(xData1)
                console.log(yData1)
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                myChart.setOption({ // 绘制图表
                    title: {text: ''},
                    legend: {
                        data: ['收入', '支出'],
                        bottom:5,
                        left:10,
                    },
                    grid: {
                        right: '10',
                        left:'10',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        
                        formatter:function(params){
                            if(params.length>1){
                                return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"元"+"<br>"+
                                params[1].seriesName+":"+params[1].data+"元"+"<br>";
                            }else{
                                return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"元";
                            }
                        },
                    },
                    xAxis: {
                        // data: ["一月", "二月", "三月", "四月", "五月", "六月"],
                        data:xData,
                        boundaryGap: false,
                        lineStyle: {
                        color: '#3594FF',
                        width: '180px'
                        },
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: '{value}¥'
                        }
                    },
                    axisLabel: {
                        interval: 40,//横轴信息全部显示
                        rotate:90,//60度角倾斜显示
                    },
                    series: [
                        {
                            name: '支出',
                            // type: 'bar',
                            smooth: true,
                            type: 'line',
                            label:{
                                show:true,
                                position:'indide'
                            },
                            symbol: 'circle',
                            symbolSize: 5,
                            sampling: 'average',
                            itemStyle: {
                                //循环多种颜色 
                                normal: {
                                    //这里是重点
                                    color: function(params) {
                                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                        var colorList = ['#00A1E9','#00A1E9', '#00A1E9', '#00A1E9', '#00A1E9','#00A1E9', '#00A1E9'];
                                        return colorList[params.dataIndex]
                                    }
                                },

                                // 一种颜色
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#54D8FF',
                                        width: '40px'
                                    }])
                                
                                },
                            },
                            areaStyle: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#54D8FF'
                                }, {
                                    offset: 1,
                                    color: '#fff'
                                }])
                            },
                            label: {
                                show: true,
                                position: 'top'
                            },
                            // data: [22, 28, 34, 15, 18, 24, 16],
                            data:yData
                        },
                        {
                            name: '收入',
                            // type: 'bar',
                            smooth: true,
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 5,
                            sampling: 'average',
                            itemStyle: {
                                //循环多种颜色 
                                normal: {
                                    //这里是重点
                                    color: function(params) {
                                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                        var colorList = ['#00A1E9','#00A1E9', '#00A1E9', '#00A1E9', '#00A1E9','#00A1E9', '#00A1E9'];
                                        return colorList[params.dataIndex]
                                    }
                                },
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#A3A0FB',
                                        width: '40px'
                                    }])
                                
                                },
                            },
                            areaStyle: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#A3A0FB'
                                }, {
                                    offset: 1,
                                    color: '#fff'
                                }])
                            },
                            label: {
                                show: true,
                                position: 'top'
                            },
                            // data: [52, 28, 34, 10, 54, 2, 11],
                            data:yData1
                        }
                    ]
                });
                window.addEventListener('resize',function() {myChart.resize()});
            })


            
        },

    },
}
</script>
<style lang="less" scoped>
@col9:#999;
@rem:256/16rem;
@green:#3CC480;
@red:#FF4141;
    #myChart{
        width: 100%;
        height: 500px;
    }
    .red{
        color: @red;
    }
    .green{
        color:@green;
    }
    .day-item{
        .day-list{
            // width:440px;
            flex:1;
            height: 140px;
            padding:30px 20px;
            background-color: #fff;
            box-shadow:0px 2px 12px rgba(0,0,0,0.04);
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            h3{
                font-size: 25/@rem;
            }
        }   
        .day-list+.day-list{
            margin-left:20px;   
        }
        .day-list>span{
            color: @col9;
        }
    }
    .columnar-title{
        font-size: 24/@rem;
    }
    .table{
        // padding-top:60px;
        padding-top: 40px;
        margin-top: 20px;
        border-top: 1px solid #e5e5e5;
    }
</style>