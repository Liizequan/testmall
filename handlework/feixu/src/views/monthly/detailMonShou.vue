<template>
    <div>
        <!-- <button v-print="'#printTest'">打印</button> 
        <div id="printTest" >
            <h2 class="title">运费收款账单</h2>
            <ul class="bankInfo">
                <li>
                    <b>收款单位：</b>
                    <span>{{monthlyData.carrier}}</span>
                </li>
                <li>
                    <b>收款户名：</b>
                    <span>{{monthlyData.name}}</span>
                </li>
                <li>
                    <b>收款账号：</b>
                    <span>{{monthlyData.account}}</span>
                </li>
                <li>
                    <b>收款银行：</b>
                    <span>{{monthlyData.bank}}</span>
                </li>
            </ul>
            <ul class="autoInfo">
                <li><b>总费用：</b><span class="oringe">¥{{monthlyData.cost}}</span>（大写人民币 <span class="oringe">{{monthlyData.cost | toChies}}</span> ）</li>
                <li><b>单数：</b><b>{{monthlyData.count}}单</b></li>
                <li><b>汇款识别码：</b><b>{{monthlyData.receiveNo}}</b></li>
            </ul>
            <p>
                <i></i>
                请使用
                <span class="">对公账户</span>转账，在网银转账时务必将
                <span class="">18位转账识别码</span>填写到
                <span class="">用途或备注（多个汇款单请用，隔开）</span>中，柜台存款请将转账识别码填写到
                <span class="">转账用途</span> 中
            </p>
　　　　</div> -->
        <div class="table">
            <div class="between items-center">
                <div>
                    <span>月收单号：{{monthlyData.receiveNo}}</span>
                    <span>月收费用：{{monthlyData.cost}}</span>
                    <span>公司名称：{{monthlyData.customer}}</span>
                    <span>生成人：{{monthlyData.user}}</span> 
                </div>
                <div style="float: right;padding-bottom: 20px;">
                    <import-export :isExport="true" :exportApi="this.$api.Receiveexport+'?id='+$route.query.id">
                    </import-export>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column prop="orderNo" label="单号">
                    <template slot-scope="scope">
                        <div>
                            系统订单号： <el-link :underline="false" type="primary" @click="goOrder(scope.row.orderId)">{{scope.row.orderNo}}</el-link>
                            <span>业务单号： {{scope.row.numberOne}}</span>
                            <span>DN单号： {{scope.row.numberTwo}}</span>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="username" label="司机名称" width="80px">
                </el-table-column> -->
                <el-table-column prop="customer" label="客户名称">
                </el-table-column>
                <el-table-column prop="cost" label="总费用">
                </el-table-column>
                <el-table-column prop="project" label="项目名称">
                </el-table-column>
                <el-table-column prop="contact" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="receive" label="起止地">
                    <template slot-scope="scope">
                        <div>
                           {{scope.row.receive}} {{scope.row.deliver ? '至 '+ scope.row.deliver : ''}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="deliveryTime" label="提货时间">
                </el-table-column>
                <el-table-column prop="arrivalTime" label="到货时间">
                </el-table-column>
            </el-table>
        </div>
    </div>
    
</template>
<script>
import ImportExport from "@/components/ImportExport.vue";
export default {
    components: { ImportExport },
    data(){
        return{
            addtotal:123,
            toChies:'',
            tableData: [],
            monthlyData:{},
        }
    },
    filters:{//局部过滤器
        toChies:function(amount){//形参
            if(!amount){
                return
            }
            console.log()

            // 汉字的数字
            const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
            // 基本单位
            const cnIntRadice = ["", "拾", "佰", "仟"];
            // 对应整数部分扩展单位
            const cnIntUnits = ["", "万", "亿", "兆"];
            // 对应小数部分单位
            const cnDecUnits = ["角", "分"];
            // 整数金额时后面跟的字符
            const cnInteger = "整";
            // 整型完以后的单位
            const cnIntLast = "元";
            // 最大处理的数字
            const maxNum = 9999999999999999.99;
            // 金额整数部分
            let integerNum;
            // 金额小数部分
            let decimalNum;
            // 输出的中文金额字符串
            let chineseStr = "";
            // 分离金额后用的数组，预定义
            let parts;
            if (amount === "") {
                return "";
            }
            amount = parseFloat(amount);
            if (amount >= maxNum) {
                // 超出最大处理数字
                return "";
            }
            if (amount === 0) {
                chineseStr = cnNums[0] + cnIntLast + cnInteger;
                return chineseStr;
            }
            // 转换为字符串
            amount = amount.toString();
            if (amount.indexOf(".") === -1) {
                integerNum = amount;

                decimalNum = "";
            } else {
                parts = amount.split(".");
                integerNum = parts[0];
                decimalNum = parts[1].substr(0, 4);
            }
            // 获取整型部分转换
            if (parseInt(integerNum, 10) > 0) {
                let zeroCount = 0;
                const IntLen = integerNum.length;
                for (let i = 0; i < IntLen; i++) {
                    const n = integerNum.substr(i, 1);
                    const p = IntLen - i - 1;
                    const q = p / 4;
                    const m = p % 4;
                    if (n === "0") {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            chineseStr += cnNums[0];
                        }
                        // 归零
                        zeroCount = 0;
                        //alert(cnNums[parseInt(n)])
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m === 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                }
                chineseStr += cnIntLast;
            }
            // 小数部分
            if (decimalNum !== "") {
                const decLen = decimalNum.length;
                for (let i = 0; i < decLen; i++) {
                    const n = decimalNum.substr(i, 1);
                    if (n !== "0") {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (chineseStr === "") {
                chineseStr += cnNums[0] + cnIntLast + cnInteger;
            } else if (decimalNum === "") {
                chineseStr += cnInteger;
            }
            return chineseStr;
        }
    },
    created() {
        this.getMonthlyData();
    },
    methods: {
        getMonthlyData(){
            console.log('优乐美')
            this.$http.get(this.$api.receiveReceivelook,{
                id:this.$route.query.id
            },res=>{
                console.log(res)
                this.monthlyData = res.data;
                this.tableData = res.data.item
            })
        },
        // 前往订单
        goOrder(val){
           this.$router.push({
                path: '/order/detail',
                query: {
                    id: val
                }
            })
        }
    },
    
}
</script>
<style lang="less" scoped  media="printTest">
    @page{
        size:  auto;   /* auto is the initial value */
        margin: 3mm;  /* this affects the margin in the printer settings */
    }
    
    b{
        font-size: 20px;
    }
    .oringe{
        color: #DD4B39;
        font-weight: bold;
    }
    .title{
        text-align: center;
        font-size: 20px;
    }
    .bankInfo{
        //   padding:20px 0;
        font-weight: 500;
        border: 1px solid #e5e5e5;
        li{
            padding:10px;
            border-bottom: 1px solid #e5e5e5;
            span{
                color:#333;
                font-size: 18px;
                font-weight: bold;
            }
        }
        li:last-child{
            border:0;
        }
        margin:20px 0;
    }
    .autoInfo{
        li{
            padding-bottom:10px;
            font-size: 18px;
            .oringe{
                
            }
        }
    }
    .table{
        // margin-top:40px;
    }
    p{
        font-size: 16px;
        color: #333;
    }
</style>