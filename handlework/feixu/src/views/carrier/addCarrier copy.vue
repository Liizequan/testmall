<template>
    <div class="add-order">
        <!-- 新建承运商 -->
        <div >
            <div class="between items-center order-top">
                <h4 class="top-title">{{this.$route.query.id ? '编辑' : '新建'}}客户</h4>
                <span>{{this.$route.query.id ? custom.createTime : newTime}}</span>
            </div>
            <ul>
                <!-- 基本信息 -->
                <li class="base ptop20">
                    <!-- 8位日期+6位随机数字 -->
                    <p style="font-size:18px;font-weight:bold">基本信息</p>
                    <el-row :gutter="20" class="is-row  ptop40">
                        <el-col :span="6">
                            <div class="items-center">
                                <span> 客户类型：</span>
                                <p style="width:140px;margin-left:10px;"><el-input></el-input></p>
                            </div>
                        </el-col>
                    </el-row>
                    <div v-if="mysql">
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="8">
                                <div class="between">
                                    <span>司机名称：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between">
                                    <span>联系电话：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between ">
                                    <span>联系邮箱：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="8">
                                <div class="between items-center">
                                    <span>联系地址：</span>
                                    <p class="between" style="padding-top:0;">
                                        <el-input></el-input>
                                        <el-input style="padding-left:10px;"></el-input>
                                    </p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between">
                                    <span>车牌号：  </span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between">
                                    <span>车型/大小：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="8">
                                <div class="between">
                                    <span>公司名称：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between">
                                    <span>联系人：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between ">
                                    <span>联系电话：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="8">
                                <div class="between">
                                    <span>联系邮箱： </span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between items-center">
                                    <span>联系地址：</span>
                                    <p class="between" style="padding-top:0;">
                                        <el-input></el-input>
                                        <el-input style="padding-left:10px;"></el-input>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </li>
                <!-- 收付账号 -->
                <li class="goods-list ptop40">
                    <div class="list-title">
                        <p>收付账号</p>
                    </div>
                    <div class="receive-border">
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="8">
                                <div class="between" style="width:460px; padding-top:0">
                                    <span style="width:50px;">名称：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between" style="padding-top:0">
                                    <span>银行账号：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="between " style="padding-top:0">
                                    <span>所属银行：</span>
                                    <p><el-input></el-input></p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </li>
                <!-- 其他备注及附件 -->
                <li class="goods-list autofu">
                    <div class="list-title">
                        <p>其他备注及附件</p>
                    </div>
                    
                    <div class="receive-border receivable">
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="12">
                                <div class="flex">
                                    <span style="display:inline-block;width:70px;">备注：</span>
                                    <el-input type="textarea" style=""></el-input>
                                </div> 
                            </el-col>
                            <el-col :span="12">
                            </el-col>
                        </el-row>
                        <div class="items-center ptop20">
                            <span style="display:inline-block;width:65px;">附件：</span>
                            <p>
                                <el-button>上传</el-button>
                            </p>
                        </div>  
                        <p style="margin-left: 65px;padding-top: 15px;color:#999">
                            * 附件格式仅支持：word、pdf、excel、jpg、png格式文件
                        </p>
                    </div>
                </li>
            </ul>
            <div class="btn">
                <div class="txt-center">
                    <el-button style="width:160px" type="primary" class="btn-elblue">保存订单</el-button>
                    <el-button style="width:160px" >存到草稿</el-button>
                    <el-button style="width:160px" >重置表单</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            mysql: false,//个人 true  集团 false
            newTime:'',//当前时间
            carrier:{
                type:'',//类型
                username:'',//司机名称	
                plate:'',//车牌
                phone:'',//联系电话	
                email:'',//联系邮箱	
                addresss:'',//联系地址	
                detail:'',//详细地址	
                name:'',//开户人	
                account:'',//银行账号	
                bank:'',//所属银行	
                remark:'',//备注	
                model:'',//车型
                file:'',//
                detail:'',//
            }
        }
    },
    created() {
        var day2 = new Date();
        this.newTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
    },
    methods: {
        
    },
}
</script>
<style lang="less" scoped>
@backblue:#00A1E9;
@backorange:#FF5531;
// #F5F7F9
@rem:256/16rem;
@colf:#fff;
@col3:#333;
@col9:#999;
@border:1px solid #E5E5E5;
    .add-order{
        // padding:25px;
        color:@col3;
        // 新增
        .add-list{
            color:@col9;
            font-size: 14/@rem;
            padding:10px 0;
        }
        .goods-list{
            margin-top:20px;
        }
        // 头部
        .list-title{
            padding:15px 20px;
            font-size: 16/@rem;
            font-weight: bold;
            background-color: #F7F6F9;
            border: @border;
        }
        .order-top{
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #F7F7F7;
        }
        .is-row {
            .between{
                width:480px;
                display: flex;
                padding-top:20px;
                align-items: center;
            }
            .between>span{
                display: inline-block;
                width:80px;
            }
            .between>p{
                // flex:1;
                // width:260px;
                width:85%;
            }
        }
        // 基础
        
        // 收发
        .receive{
            padding-top:40px;
            .backblue{
                background-color: @backblue;
            }
            .backorange{
                background-color: @backorange;
            }
            .receive-box>p{
                height: 52px;
                line-height: 52px;
                padding-left:20px;
                color: @colf;
                font-size: 16/@rem
            }
        }
        .receive-border .is-row{
            display: flex;
            justify-content: space-between;
        }
        .receive-border .is-row .between{
            width:470px;
        }
        .receive-border .is-norow .between{
            width:100%;
        }
        // 货物
        .goods-list .goods{
            padding-top:0;
        }
        .receive-border{
            border:@border;
            border-top:transparent;
            padding:20px;
            // padding-top:10px;
        }

        // 其他备注及附件.
        .autofu{
            padding-top:20px;
        }
        .beizhu{
            margin:10px 0 20px;
        }
        .btn{
            margin:60px 0 40px;
            .status{
                span{
                    display: inline-block;
                    padding-right: 20px;
                }
            }

        }
    }
</style>