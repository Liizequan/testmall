<template>
    <div class="index between">
        <aside class="index-aside" v-if="isTrue">
            <!-- 我是首页模板 -->
            <div class="logo">
                <img src="@/assets/img/left/logo.png" alt="">
            </div>
            <div class="nav xyk-scroll">
                <!-- 首页 -->
                <el-menu  default-active="1"  class="el-menu-vertical-demo"
                    @open="handleOpen" background-color="#444260" text-color="#fff" >
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i> -->
                            <div class="items-center">
                                <!-- <img src="@/assets/img/left/icon (1).png" alt="" style="width:25px;height:25px;margin-right:10px;">
                                <img src="@/assets/img/left/h_icon (1).png" alt="" style="width:25px;height:25px;margin-right:10px;"> -->
                                <img src="@/assets/img/left/icon1.png" alt="" style="width:16px;height:16px;margin-right:10px;">
                                <span>首页</span>
                            </div>
                        </template>
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="首页" name="index" style="height:53px;line-height:53px;"></el-tab-pane>
                        </el-tabs>
                    </el-submenu>
                </el-menu>
                <!-- 订单中心 -->
                <el-menu  default-active="2"  class="el-menu-vertical-demo"
                    @open="handleOpen" background-color="#444260" text-color="#fff" >
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i>
                            <span>订单中心</span> -->
                            <div class="items-center">
                                <!-- <img src="@/assets/img/left/icon (2).png" alt="" style="width:25px;height:25px;margin-right:10px;">
                                <img src="@/assets/img/left/h_icon (2).png" alt="" style="width:25px;height:25px;margin-right:10px;"> -->
                                <img src="@/assets/img/left/icon2.png" alt="" style="width:16px;height:16px;margin-right:10px;">
                                <span>订单中心</span>
                            </div>
                        </template>
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="新建订单" name="add/order" style="height:53px;line-height:53px;"></el-tab-pane>
                            <el-tab-pane label="全部订单" name="all/order" style="height:53px;line-height:53px;"></el-tab-pane>
                            <!-- <el-tab-pane label="取消订单" name="del/order" style="height:53px;line-height:53px;"></el-tab-pane> -->
                        </el-tabs>
                    </el-submenu>
                </el-menu>
                <!-- 财务中心 -->
                <el-menu  default-active="3"  class="el-menu-vertical-demo"
                    @open="handleOpen" background-color="#444260" text-color="#fff" >
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i>
                            <span>财务中心</span> -->
                            <div class="items-center">
                                <!-- <img src="@/assets/img/left/icon (3).png" alt="" style="width:25px;height:25px;margin-right:10px;">
                                <img src="@/assets/img/left/h_icon (3).png" alt="" style="width:25px;height:25px;margin-right:10px;"> -->
                                <img src="@/assets/img/left/icon3.png" alt="" style="width:16px;height:16px;margin-right:10px;">
                                <span>财务中心</span>
                            </div>
                        </template>
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="付款列表" name="payment/finance" style="height:53px;line-height:53px;"></el-tab-pane>
                            <el-tab-pane label="收款列表" name="receiva/finance" style="height:53px;line-height:53px;"></el-tab-pane>
                            <el-tab-pane label="现付审批" name="approva/finance" style="height:53px;line-height:53px;"></el-tab-pane>
                            <el-tab-pane label="月结付款" name="approva/monthly" style="height:53px;line-height:53px;"></el-tab-pane>
                            <el-tab-pane label="月结收款" name="approvaShou/monthly" style="height:53px;line-height:53px;"></el-tab-pane>
                        </el-tabs>
                    </el-submenu>
                </el-menu>
                <!-- 客户中心 -->
                <el-menu  default-active="4"  class="el-menu-vertical-demo"
                    @open="handleOpen" background-color="#444260" text-color="#fff" >
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i>
                            <span>客户中心</span> -->
                            <div class="items-center">
                                <!-- <img src="@/assets/img/left/icon (4).png" alt="" style="width:25px;height:25px;margin-right:10px;">
                                <img src="@/assets/img/left/h_icon (4).png" alt="" style="width:25px;height:25px;margin-right:10px;"> -->
                                <img src="@/assets/img/left/icon4.png" alt="" style="width:16px;height:16px;margin-right:10px;">
                                <span>客户中心</span>
                            </div>
                        </template>
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="收/发货人" name="deliver/receive" style="height:53px;line-height:53px;"></el-tab-pane>
                            <!-- <el-tab-pane label="新增客户" name="add/custom" style="height:53px;line-height:53px;"></el-tab-pane> -->
                            <el-tab-pane label="客户中心" name="list/custom" style="height:53px;line-height:53px;"></el-tab-pane>
                            <!-- <el-tab-pane label="新增承运商" name="add/carrier" style="height:53px;line-height:53px;"></el-tab-pane> -->
                            <el-tab-pane label="承运中心" name="list/carrier" style="height:53px;line-height:53px;"></el-tab-pane>
                        </el-tabs>
                    </el-submenu>
                </el-menu>
                <!-- 数据分析 -->
                <el-menu  default-active="5"  class="el-menu-vertical-demo"
                    @open="handleOpen" background-color="#444260" text-color="#fff" >
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i>
                            <span>数据分析</span> -->
                            <div class="items-center">
                                <!-- <img src="@/assets/img/left/icon (5).png" alt="" style="width:25px;height:25px;margin-right:10px;">
                                <img src="@/assets/img/left/h_icon (5).png" alt="" style="width:25px;height:25px;margin-right:10px;"> -->
                                <img src="@/assets/img/left/icon5.png" alt="" style="width:16px;height:16px;margin-right:10px;">
                                <span>数据分析</span>
                            </div>
                        </template>
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="数据分析" name="data/analysis" style="height:53px;line-height:53px;"></el-tab-pane>
                        </el-tabs>
                    </el-submenu>
                </el-menu>
                <!-- 管理员 -->
                <el-menu  default-active="6"  class="el-menu-vertical-demo"
                    @open="handleOpen" background-color="#444260" text-color="#fff" >
                    <el-submenu index="1">
                        <template slot="title">
                            <!-- <i class="el-icon-message"></i>
                            <span>管理员</span> -->
                            <div class="items-center">
                                <!-- <img src="@/assets/img/left/icon (6).png" alt="" style="width:25px;height:25px;margin-right:10px;">
                                <img src="@/assets/img/left/h_icon (6).png" alt="" style="width:25px;height:25px;margin-right:10px;"> -->
                                <img src="@/assets/img/left/icon6.png" alt="" style="width:16px;height:16px;margin-right:10px;">
                                <span>管理员</span>
                            </div>
                        </template>
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="管理员" name="index/admin" style="height:53px;line-height:53px;"></el-tab-pane>
                            <el-tab-pane label="角色管理" name="role/admin" style="height:53px;line-height:53px;"></el-tab-pane>
                        </el-tabs>
                    </el-submenu>
                </el-menu>
            </div>
        </aside>
        <main class="index-main">
            <header>
                <div class="top items-center between">
                    <el-button @click="leftTrue"><i class="el-icon-s-fold" v-if="isTrue"></i><i class="el-icon-s-unfold" v-else></i></el-button>
                    <div class="flex1 items-center" style="justify-content: flex-end;">
                        <el-popover placement="bottom" width="400" trigger="click" popper-class="popover">
                            <div class="infos-list">
                                <div class="title">
                                    <h3>通知事项</h3> 
                                </div>
                                <ul>
                                    <li v-for="(item,index) in noRead" :key="index"><el-link :underline="false">{{item.content}}</el-link></li>  
                                </ul>
                                <el-button style="width:100%;border:0;height: 60px;line-height: 40px;" @click="allRead">全部已读</el-button>
                            </div>
                            <el-button slot="reference" style="border:0;">
                                <i class="el-icon-message-solid" v-if="noRead.length==0"></i>
                                <el-badge is-dot class="item" v-else><i class="el-icon-message-solid"></i></el-badge>
                            </el-button>
                        </el-popover>
                        <el-dropdown style="padding:0 20px; border-left:1px solid #EBEBF2;" @command="system">
                            <span class="el-dropdown-link">
                                <el-link :underline="false">{{form.name}}<i class="el-icon-arrow-down el-icon--right"></i></el-link> 
                            </span>
                            <el-dropdown-menu slot="dropdown" style="min-width:100px;">
                                <el-dropdown-item command="upload" >更改密码</el-dropdown-item>
                                <el-dropdown-item command="SignOut" >退出系统</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!-- <el-avatar size="medium" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=136502938,503168035&fm=26&gp=0.jpg"></el-avatar> -->
                        <div class="logo" style="background:#292745;width:40px;height:40px;border-radius:50%;overflow: hidden">
                            <img src="@/assets/img/left/logo.png" alt="" style="height:40px;">
                        </div>
                    </div>
                </div>
                <div class="bottom flex between">
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:20px;height: 44px;line-height: 44px;">
                        <el-breadcrumb-item :to="{ path: '/' }"><el-button type="text" @click="isActiveName"  style="font-size:12px;color:#999;">首页</el-button></el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-link style="font-size:12px;" :underline="false" v-if="isBack" @click="back()">返回</el-link>
                </div>
            </header>
            <div class="index-main-route">
                <div class="index-main-route-scoll xyk-scroll">
                    <div class="route-container">
                        <router-view/>
                    </div>
                    <el-backtop target=".index-main-route-scoll">
                    </el-backtop>
                </div>
            </div>
        </main>
        <el-dialog title="更改密码" width="500px" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="管理员名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.ispwd" value="" autocomplete="new-password" minlength="8" maxlength="16"  @blur="prePwd(form.ispwd)" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input v-model="form.nextPwd" value="" autocomplete="new-password" minlength="8" maxlength="16" @blur="nextPwd(form.nextPwd)" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="upLoad">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
var number = document.querySelectorAll('.el-pager .number')
console.log(number)
export default {
    data() {
        return {
            activeName: 'index',
            tabPosition: 'right',
            activeNames:1,
            // 未读信息
            noRead:[],
            isTrue:true,
            dialogFormVisible:false,
            formLabelWidth:'100',
            form:{
                name:'',
                ispwd:'',
                nextPwd:'',
            },
            isBack:false,
        }
    },
    // updated() {
    //     console.log('updated')
    //     this.getNoticeData()
    // },
    created() {
        this.getNoticeData()
        this.activeName = this.$route.path.slice(1)
        var info = JSON.parse(localStorage.getItem("info"));
        this.form.name = info.username
    },
    methods: {
        // 通知列表
        getNoticeData(){
            this.$http.post(this.$api.noticeList,{},res=>{
                console.log(res)
                this.noRead = res.data
            })
        },
        leftTrue(){
            this.isTrue = !this.isTrue;
        },
        handleOpen(){
            console.log('展开收起')
            console.log(this.activeName)
            if(this.activeName=='index' && this.$route.path=='/index'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[0];
                isd.style.height = '53px'
            }
            if(this.activeName=='add/order'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[1];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(0px)';   
            }
            if(this.activeName=='all/order'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[1];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(53px)';   
            }
            if(this.activeName=='del/order'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[1];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(106px)';   
            }
            if(this.activeName=='payment/finance'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[2];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(0px)';  
            }
            if(this.activeName=='receiva/finance'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[2];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(53px)';  
            }
            if(this.activeName=='approva/finance'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[2];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(106px)';  
            }
            if(this.activeName=='approva/monthly'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[2];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(159px)';  
            }
            if(this.activeName=='approvaShou/monthly'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[2];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(212px)';  
            }
            if(this.activeName=='deliver/receive'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[3];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(0px)';  
            }
            // if(this.activeName=='add/custom'){
            //     var isd = document.getElementsByClassName('el-tabs__active-bar')[3];
            //     isd.style.height= '53px';
            //     isd.style.transform = 'translateY(53px)';  
            // }
            if(this.activeName=='list/custom'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[3];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(53px)';  
            }
            // if(this.activeName=='add/carrier'){
            //     var isd = document.getElementsByClassName('el-tabs__active-bar')[3];
            //     isd.style.height= '53px';
            //     isd.style.transform = 'translateY(159px)';  
            // }
            if(this.activeName=='list/carrier'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[3];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(106px)';  
            }
            if(this.activeName=='data/analysis'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[4];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(0px)';  
            }
            if(this.activeName=='index/admin'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[5];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(0px)';  
            }
            if(this.activeName=='role/admin'){
                var isd = document.getElementsByClassName('el-tabs__active-bar')[5];
                isd.style.height= '53px';
                isd.style.transform = 'translateY(53px)';  
            }

        },
        isActiveName(){
            console.log('路由切换')
            this.activeName = 'index'
        },
        // 路由跳转
        handleClick(tab, event) {
            console.log(tab, event);
            console.log(tab.label)
            this.activeName = tab.name
            // if(tab.name == 'addOrder'){
            //     this.$router.push('add/order')
            // }else if(tab.name == 'allOrder'){
            //     this.$router.push('all/order')
            // }
            this.$router.push('/'+tab.name)
        },
        // 退出系统
        system(val){
            console.log('退出登录')
            if(val === 'SignOut'){
                this.$http.post(this.$api.userLogout,{},res=>{
                    console.log(res)
                    if(res.code === 1){
                        this.$message(res.msg)
                        this.$router.push('/login')
                    }
                })
            }else{//更改密码
                this.dialogFormVisible = true
            }
        },
        // 全部已读
        allRead(){
            console.log('全部已读')
            if(this.noRead.length!=0){
                this.$confirm('是否全部已读?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(this.$api.allRead,{},res=>{
                        console.log(res)
                        this.$message(res.msg)
                        if(res.code==1){    
                            this.getNoticeData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消全部已读'
                    });          
                });
            }else{
                this.$message({
                    type: 'info',
                    message: '暂无可读通知事项'
                }); 
                return 
            }
        },
        prePwd(val){
            if(!this.$reg.isPwd(val)){
                return this.$message({
                    message:'密码错误，请以8~16为英文、数字为密码',
                    center: true
                })
            }
        },
        // 确认密码
        nextPwd(val){
            if(!this.$reg.isPwd(val)){
                return this.$message({
                    message:'密码错误，请以8~16为英文、数字为密码',
                    center: true
                })
            }
            if(val != this.form.ispwd){
                this.$message('两次密码不一致，请重新输入')
            }
        },
        // 更改密码
        upLoad(){
            console.log(!this.$reg.isPwd(this.form.ispwd))
            console.log(!this.$reg.isPwd(this.form.nextPwd))
            if(!this.$reg.isPwd(this.form.ispwd)){
                return this.$message({
                    message:'密码错误，请以8~16为英文、数字为密码',
                    center: true
                })
            }
            if(!this.$reg.isPwd(this.form.nextPwd)){
                return this.$message({
                    message:'密码错误，请以8~16为英文、数字为密码',
                    center: true
                })
            }
            if(this.form.ispwd == this.form.nextPwd){
                this.$http.post(this.$api.changePwd,{
                    password:this.form.ispwd
                },res=>{
                    this.$message(res.msg)
                    if(res.code == 1){  
                        this.dialogFormVisible = false
                    }
                })
            }
        }
    },
    watch:{
        $route(to,from){
            console.log(to);
            console.log(from);
            console.log(window.location.search)
            console.log(this.$route.query)
            // if(window.location.search){
            //     console.log('nihao')
            // }
            var obj = to.query;
            var arr = [];
            for(var key in obj){
            if(!obj.hasOwnProperty(key)){
            continue;
            }
            var item = {};
            item[key] = obj[key];
            arr.push(item);
            }
            console.log(arr);
            if(to.path=='/add/custom' || to.path=='/add/carrier'){
                return this.isBack = true
            }

            if(arr.length>0){
                console.log('年号')
                this.isBack = true
            }else{
                console.log('bibbi')
                this.isBack = false
            }
        }
    },
}
</script>
<style lang="less" scoped>
@rem:256/16rem;
@backcol:#2E2B4A;
@col_f:#fff;
@col_3:#333;

    .index>aside{
        // width:260px;
        width:15%;
        min-width:160px;
        height: 100px;
        background-color: @backcol;
        color: @col_f;
        .logo{
            padding:15px 0;
            background-color: @backcol;
        }
        .logo img{
            margin:auto;
            padding:10px 0;
        }
        .el-menu-vertical-demo{
            border-bottom: 3px solid #292745;
        }
        .nav{
            height: calc(100vh - 120px);
            background-color: #292745;
        }
        // .items-center{
        //     img:nth-child(2){
        //         display: none;
        //     }
        // }
        // .items-center:hover{
        //     img{
        //         display: none;
        //     }
        //     img:nth-child(2){
        //         display: block;
        //     }
        // }
    }
    .index>main{
        flex:1;
        background-color:#F5F7F9;
        .top{
            padding:16px 40px;
            display: flex;
            justify-content: flex-end;
            background-color: #fff;
        }
        .bottom{
            padding: 0px 20px;
            border:1px solid #F7F7F7;
            box-shadow:0px 1px 2px rgba(0,0,0,0.16);
        }
        .index-main-route{
            // min-width: 1200px;
            // width:90%;
            // overflow: hidden;
            // margin:40px auto;
            // margin-bottom: 0;
            // margin-top:2px;
            // background-color: #fff;
            width: 100%;
            overflow: hidden;
            margin: 40px auto;
            margin-bottom: 0;
            margin-top: 2px;
            // padding:25px;
            .index-main-route-scoll{
                height: calc(100vh - 170px);
                padding: 25px;
                overflow: auto;
                .route-container{
                    width:94%;
                    margin:auto;
                    background: #fff;
                    padding: 20px;
                }
            }
        }
    }
    .infos-list{
        .title{
            h3{
                color: @col_3;
                font-size: 16/@rem;
            }
            text-align: center;
            margin:auto;
            padding:18px 0;
            border-bottom: 1px solid #F1F1F3;
        }
        ul{
            background-color: #F9FBFC;
            li{
                height: 60px;
                line-height: 60px;
                padding:0 30px;
                border-bottom: 1px solid #F1F1F3;
            }
        }
    }
    .go-top{
        position: fixed;
        bottom:20px;
        right:20px;
        padding:15px;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    }
</style>