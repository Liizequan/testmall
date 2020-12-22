<template>
    <div>
        <!-- 我是首页 -->
        <!-- 头部 -->
        <header class="day-item  border-bottom pbom20">
            <ul class="between">
                <li class="day-list between">
                    <div>
                        <span>总订单量</span>
                        <div class="flex"><h3>{{allorder}}</h3> 单</div>
                    </div>
                    <p style="width:100px; height:120px;">
                        <img src="@/assets/img/data/01.png" alt="" style="width:100%;height:100%">
                    </p>
                </li>
                <li class="day-list between">
                    <div>
                        <span>总收入</span>
                        <div class="flex"><h3>{{allReceive}}</h3> ¥</div>
                    </div>
                    <p style="width:100px; height:120px;">
                        
                        <img src="@/assets/img/data/02.png" alt="" style="width:100%;height:100%">
                    </p>
                </li>
                <li class="day-list between">
                    <div>
                        <span>总支出</span>
                        <div class="flex"><h3>{{allPay}}</h3> ¥</div>
                    </div>
                    <p style="width:120px; height:120px;">
                        
                        <img src="@/assets/img/data/03.png" alt="" style="width:100%;height:100%">
                    </p>
                </li>
            </ul>
        </header>

        <div class="between ptop20 items-center">
            <h2 class="columnar-title">订单量</h2>
            <div>
                <el-select v-model="order.company"
                @change="orderChange" style="width:160px;" placeholder="公司名称">
                    <el-option
                    v-for="item in company"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="order.project"
                @change="orderChange" style="width:160px;padding-left:15px;" placeholder="项目名称">
                    <el-option
                    v-for="item in project"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="order.value"
                @change="orderChange" style="width:160px;padding-left:15px;" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        
        <div id="myChartB">
        </div>

        
        <div class="between ptop20 items-center">
            <h2 class="columnar-title">实际统计</h2>
            <div>
                <el-select v-model="statistics.company"
                    @change="statisChange"
                    style="width:160px;" placeholder="请选择">
                    <el-option
                    v-for="item in company"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="statistics.project"
                    @change="statisChange"
                    style="width:160px;padding-left:15px;" placeholder="请选择">
                    <el-option
                    v-for="item in project"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="statistics.value"
                    @change="statisChange"
                    style="width:160px;padding-left:15px;" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div id="myChart">
        </div>

        <div class="between ptop20 items-center">
            <h2 class="columnar-title">预算统计</h2>
            <div>
                <el-select v-model="datas"
                    @change="budgetChange"
                    style="width:160px;padding-left:15px;" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div id="myChart2">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            xData: [],
            yData: [],
            xData1: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天","第八天","第九天","第十天"],
            yData1: [],
            xData2: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天","第八天","第九天","第十天"],
            yData2: [],
            yBack: {first:'#55D8FE',last:'#54D8FF'},
            yBack1: {first:'#55D8FE',last:'#54D8FF'},
            yBack2: {first:'#55D8FE',last:'#54D8FF'},

            
            company:[],
            project:[],
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

            isGetData:false,
            allorder:'',//单量
            allReceive:'',//收入
            allPay:'',//支出
            order:{
                company:'',//客户名称
                project:'',//项目名称
                value:'1',
            },
            statistics:{
                company:'',//客户名称
                project:'',//项目名称
                value:'1',
            },

            datas:'1',//周期


        }
    },
    mounted() {
        this.drawLine();
        this.drawBar();
        this.drawLine2();
    },
    created() {
        this.getData()
    },
    methods: {
        orderChange(){
            this.drawBar()
        },
        statisChange(){
            // console.log(this.statistics)
            this.drawLine()
        },
        budgetChange(){
            this.drawLine2()
        },
        getData(){
            this.$http.get(this.$api.dataIndex,{},res=>{
                console.log(res)
                this.allorder = res.data.allorder;
                this.allReceive = res.data.allReceive;
                this.allPay = res.data.allPay
                this.company = res.data.company;
                this.project = res.data.project;
            })
        },
        drawBar(){//柱
            var url = ''
            console.log(this.order.value)
            if(this.order.value == 2){
                url = this.$api.ordergetMonth
            }else if(this.order.value == 3){
                url = this.$api.ordergetsixMonth
            }else if(this.order.value == 4){
                url = this.$api.datagetYear
            }else{
                url = this.$api.ordergetWeek
            }
            this.$http.post(url,{
                company:this.order.company,
                project:this.order.project,
            },res=>{
                if(res.code == 1){
                    var xData = [], yData = []; 
                    var orderData = res.data;
                    var order = Object.entries(orderData)
                    for (var i of order){
                        xData.push(i[0])
                        yData.push(i[1])
                    }
                    console.log(yData)
                    var allNum = 0;
                    var subtext = '';
                    for(var i of yData){
                        allNum+=parseInt(i)
                    }
                    // console.log(allNum)
                    if(this.order.value == 1){
                        subtext = '最近一周共有'+allNum+'单,平均'+parseFloat((allNum/(yData.length))).toFixed(2)+'单/天'
                    }else if(this.order.value == 2){
                        subtext = '最近一月共有'+allNum+'单,平均'+parseFloat((allNum/(yData.length))).toFixed(2)+'单/天'
                    }else if(this.order.value == 3){
                        subtext = '最近半年共有'+allNum+'单,平均'+parseFloat((allNum/(yData.length))).toFixed(2)+'单/月'
                    }else{
                        subtext = '最近年共有'+allNum+'单,平均'+parseFloat((allNum/(yData.length))).toFixed(2)+'单/月'
                    }
                    

                    let myChartB = this.$echarts.init(document.getElementById('myChartB'));
                    myChartB.setOption({ // 绘制图表
                        title: {
                            text: '',
                            subtext: subtext,
                            subtextStyle: {//副标题的属性
                                color: '#00A1E9',
                            },
                    
                        },
                        legend: {
                            data: ['收入', '支出'],
                            bottom:5,
                            left:10
                        },
                        color: ['#3398DB'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '10',
                            right: '10',
                            bottom: '5%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                // data: ['2019-12-1', '2019-12-2', '2019-12-3', '2019-12-4', '2019-12-5', '2019-12-6', '2019-12-7','2019-12-8','2019-12-0','2019-12-10','2019-12-11','2019-12-12'],
                                data:xData,
                                axisTick: {
                                    alignWithLabel: true
                                },
                                splitLine: {
                                    show: true, // 网格线是否显示
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    show: true, // 网格线是否显示
                                }
                            },
                            
                        ],
                        series: [
                            {
                                name: '订单量',
                                type: 'bar',
                                barWidth: '40%',
                                data: yData
                            }
                        ]
                    });
                    
                    window.addEventListener('resize',function() {myChartB.resize()});

                }

            })
        },
        drawLine() {//线
            // 基于准备好的dom，初始化echarts实例
            var url = ''
            console.log(this.statistics.value)
            if(this.statistics.value == 2){
                url = this.$api.statisMonth
            }else if(this.statistics.value == 3){
                url = this.$api.statisSixMonth
            }else if(this.statistics.value == 4){
                url = this.$api.statisYear
            }else{
                url = this.$api.statisWeek
            }

            this.$http.post(url,{
                company:this.statistics.company,
                project:this.statistics.project,
            },res=>{
                console.log(res)
                if(res.code == 1){
                    var xData = [], yData = []; 
                    var xData1= [], yData1= [];

                    var payChart = res.data.payChart;//紫色
                    var payArr = Object.entries(payChart)
                    for (var i of payArr){
                        xData.push(i[0])
                        yData.push(i[1])
                    }
                    var receiveChart = res.data.receiveChart;//蓝色
                    var receiveArr = Object.entries(receiveChart)
                    for (var i of receiveArr){
                        xData1.push(i[0])
                        yData1.push(i[1])
                    }
                    console.log(xData,yData)
                    console.log(xData1,yData1)
                    
                    let myChart = this.$echarts.init(document.getElementById('myChart'));
                    myChart.setOption({ // 绘制图表
                        title: {
                            text: '',
                        },
                        legend: {
                            data: ['收入', '支出'],
                            bottom:5,
                            left:10
                        },
                        grid: {
                            right: '10',
                            left:'10',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            
                            formatter:function(params){
                                // console.log(params)
                                if(params.length>1){
                                    return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"元" + 
                                    "<br>"+params[1].seriesName+":"+params[1].data+"元" ;
                                }else{
                                    return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"元";
                                }
                            },
                        },
                        xAxis: {
                            data:xData,
                            boundaryGap: false,
                            lineStyle: {
                                color: '#3594FF',
                                width: '180px'
                            },
                            splitLine: {
                                show: true, // 网格线是否显示
                            }
                        },
                        yAxis: {
                            axisLabel: {
                                formatter: '¥{value}'
                            },
                            lineStyle: {
                                color: '#3594FF',
                                width: '180px'
                            },
                            splitLine: {
                                show: true, // 网格线是否显示
                            }
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
                                data: yData,
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
                                data: yData1,
                            }
                        ]
                    });
                    
                    window.addEventListener('resize',function() {myChart.resize()});

                }
            })


        },
        
        drawLine2() {//线
            // 基于准备好的dom，初始化echarts实例
            var url = ''
            console.log(this.datas)
            if(this.datas == 2){
                url = this.$api.amountMonth
            }else if(this.datas == 3){
                url = this.$api.amountSix
            }else if(this.datas == 4){
                url = this.$api.amountYear
            }else{
                url = this.$api.amountWeek
            }
            console.log(url)
            
            this.$http.get(url,{
                // company:this.statistics.company,
                // project:this.statistics.project,
            },res=>{
                console.log(res)
                
                if(res.code == 1){
                    var xData = [], yData = []; 
                    var xData1= [], yData1= [];

                    var payChart = res.data.pay;//紫色
                    var payArr = Object.entries(payChart)
                    for (var i of payArr){
                        xData.push(i[0])
                        yData.push(i[1])
                    }
                    var receiveChart = res.data.receive;//蓝色
                    var receiveArr = Object.entries(receiveChart)
                    for (var i of receiveArr){
                        xData1.push(i[0])
                        yData1.push(i[1])
                    }
                    console.log(xData,yData)
                    console.log(xData1,yData1)
                    
                    let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
                    console.log(myChart2)
                    
                    myChart2.setOption({ // 绘制图表
                        title: {
                            text: '',
                        },
                        legend: {
                            data: ['应收', '应付'],
                            bottom:5,
                            left:10
                        },
                        grid: {
                            right: '10',
                            left:'10',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            
                            formatter:function(params){
                                console.log(params)
                                if(params.length>1){
                                    return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"元" + 
                                    "<br>"+params[1].seriesName+":"+params[1].data+"元" ;
                                }else{
                                    return params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"元";
                                }
                            },
                        },
                        xAxis: {
                            data:xData,
                            boundaryGap: false,
                            lineStyle: {
                                color: '#3594FF',
                                width: '180px'
                            },
                            splitLine: {
                                show: true, // 网格线是否显示
                            }
                        },
                        yAxis: {
                            axisLabel: {
                                formatter: '¥{value}'
                            },
                            lineStyle: {
                                color: '#3594FF',
                                width: '180px'
                            },
                            splitLine: {
                                show: true, // 网格线是否显示
                            }
                        },
                       
                        series: [
                            {
                                name: '应付',
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
                                data: yData,
                            },
                            {
                                name: '应收',
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
                                data: yData1,
                            },
                        ]
                        
                    });
                    
                    window.addEventListener('resize',function() {myChart2.resize()});

                }
                 
            })
            


        },
       
    }
}
</script>
<style lang="less" scoped>
@col9:#999;
@rem:256/16rem;
@green:#3CC480;
@red:#FF4141;
@blue:#00A1E9;
    #myChart, #myChartB,#myChart2{
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
        .day-list+.day-list{
            margin-left:40px;
        }
        .day-list{
            // width:440px;
            flex:1;
            padding:30px 20px;
            padding-bottom:10px;
            // background-color: #F7F7F7;
            // box-shadow:0px 2px 6px rgba(0,0,0,0.04);
            background-color: #fff;
            box-shadow:0px 2px 12px rgba(0,0,0,0.04);
            display: flex;
            span{
                font-size:16/@rem;
            }
            h3{
                font-size: 25/@rem;
                float: left;
                color: @blue;
                line-height: 20px;
                padding-right: 10px;
                padding-top:10px;
            }
            .flex{
                align-items: flex-end;
                color:@col9;
            }
        }   
        .day-list:nth-child(2){
            h3{
                color:@green
            }
        }
        .day-list:nth-child(3){
            h3{
                color:@red
            }
        }
        .day-list>span{
            color: @col9;
        }
    }
    .columnar-title{
        font-size: 24/@rem;
    }
</style>