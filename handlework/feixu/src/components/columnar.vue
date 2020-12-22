<template>
    <div>
        <!-- 我是首页 -->
        <div id="myCharts"></div>
    </div>
</template>
<script>
export default {
    props:{
        xData:{
            type:Array
        },
        yData:{
            type:Array
        },
        yBack:{
            type:Object
        }

    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        
        let myCharts = this.$echarts.init(document.getElementById('myCharts'));
        // var xdata = ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天","第八天","第九天","第十天"]
        // var ydata = [22, 28, 24, 155, 18, 24, 16, 23, 20, 100]
        myCharts.setOption({ // 绘制图表
            title: {text: ''},
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            
            grid: {
                
                left:'-1',
            },
            xAxis: {
                data: this.xData,
                scale: true,
                show:false,
                lineStyle: {
                  color: '#3594FF',
                  width: '180px'
                }
            },
            yAxis: {
                splitLine:{
            　　　　show:false
            　　}
            },
            series: [{
                name: '订单量',
                type: 'bar',
                // type: 'line',
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
                            // color: '#55D8FE',
                            color:this.yBack.first,
                            width: '40px'
                        }, {
                            offset: 1,
                            color: '#54D8FF',
                            color:this.yBack.last,
                            width: '40px'
                        }])
                    
                    }   
                },
                data: this.yData,
            }]
        });
        
        window.addEventListener('resize',function() {myCharts.resize()});

      }
    }
}
</script>
<style lang="less" scoped>
    #myCharts{
        width: 110px;
        height: 40px;
        // width:400px;
        // height: 300px;
    }
</style>