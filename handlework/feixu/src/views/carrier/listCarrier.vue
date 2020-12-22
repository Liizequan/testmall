<template>
    <div class="all-order payment-finace">
        <!-- 我是客户列表 -->
        <div class="top">
            <!-- <ul class="between">
                <li class="items-center">
                    <span>客户名称：</span>
                    <p><el-input v-model="search.username"></el-input></p>
                </li>
                <li class="items-center">
                    <span>地区筛选：</span>
                    <p><el-input v-model="search.addresss"></el-input></p>
                </li>
                <li class="items-center">
                    <span>添加时间：</span>
                    <p>
                        <el-date-picker
                            v-model="search.createTime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                </li>
            </ul> -->
            <el-row :gutter="20" class="ptop20">
                <el-col :span="8" class="items-center">
                    <span>司机名称：</span>
                    <p class="flex1"><el-input v-model="search.username"></el-input></p>
                </el-col>
                <el-col :span="8" class="items-center">
                    <span>联系电话：</span>
                    <p class="flex1"><el-input v-model="search.phone"></el-input></p>
                </el-col>
                <el-col :span="8" class="items-center">
                    <span>添加时间：</span>
                    <p class="flex1">
                        <el-date-picker
                            style="width:100%"
                            v-model="search.createTime"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                </el-col>
            </el-row>
            <div class="ptop30">
                <div class="btn">
                    <el-button type="primary" class="btn-elblue" style="width:180px;" @click="searchUser(currentPage,pageSize)">查询</el-button>
                </div>
            </div>
        </div>

        <div class="ptop40">
            
            <!-- 头部导航 -->
            <div class="nav-bar">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10px;" >
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="集团公司" name="second"></el-tab-pane>
                    <el-tab-pane label="个人司机" name="third"></el-tab-pane>
                </el-tabs>
                <import-export  :dataLength="(secled.length==0)" :isExport="true" :exportApi="this.$api.carrierExport+ '?exportId=' +daochuId">
                    <div slot="auto"><el-button @click="goAdd">新建</el-button></div>
                </import-export>
                
            </div>
            <!-- 数据列表 -->
             <el-table  :data="userList.data" stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="username"  label="司机名称">
                </el-table-column>
                <el-table-column  prop="contact"  label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话">
                </el-table-column>
                <el-table-column  prop="email"  label="联系邮箱">
                </el-table-column>
                <el-table-column  prop="addresss"  label="联系地址">
                    <template slot-scope="scope">
                        <p>{{scope.row.addresss + scope.row.detail}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="客户类型">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column  prop="name"  label="操作">
                    <template slot-scope="scope">
                        <p ><el-link @click="lookDetail(scope.row.id)" :underline="false" >详情 <i class="el-icon-arrow-right"></i></el-link></p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页列表 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                :hide-on-single-page="pagin"
                layout="total, sizes, prev, pager, next, jumper"
                background
                class="txt-center ptop40 pbom20"
                style="width:750px"
                :total="userList.totalSize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import ImportExport from "@/components/ImportExport.vue";
export default {
    components: { ImportExport },
    data() {
        return {
            checkList:[],
            activeName:'first',
            search:{
                username:'',//名称
                phone:'',//电话
                createTime:'',//时间
            },
            userList:[],
            userLists:[],
            currentPage:1,
            pagin:true,//是否显示
            orderData:[],//页面数据
            orderDatas:[],//所有数据
            pageSize:10,//一页的数据
            secled:[],//选中的
            daochuId:'',//选中的id
            api:'',
        }
    },
    created() {
        this.getUserList(this.$api.carrierList)
        this.api = this.$api.carrierList
    },
    methods: {
        getUserList(url,pageNum,pageSize){
            this.$http.get(url,{
                pageNum:pageNum || this.currentPage,
                pageSize:pageSize || this.pageSize,
            },res=>{
                console.log(res)
                this.userList = res.data
                // this.userList = res.data.slice(0,this.pageSize)
                if(res.data.data.length != 0){
                    this.pagin = false
                }else{
                    this.pagin = true
                }
            })
        },
        handleSelectionChange(val){
            console.log('选中')
            console.log(val )
            this.secled = val;
        },

        goAdd(){
            this.$router.push({
                path: '/add/carrier',
            })
        },
        lookDetail(val){
            console.log('查看详情')
            // this.$router.push('/custom/detail')
            
            this.$router.push({
                path: '/carrier/detail',
                query: {
                    id: val
                }
            })
        },
        // 搜索客户
        searchUser(pageNum,pageSize){
            var search = this.search
            if(!search.username && !search.phone && !search.createTime){
                return this.$message('请输入查询的内容')
            }
            this.$http.post(this.$api.carrierSearch,{
                username:search.username,
                phone:search.phone,
                createTime:search.createTime,
                pageNum:pageNum,
                pageSize:pageSize,
            },res=>{
                console.log(res)
                if(res.data.data.length==0){
                    this.$message('暂无查询到客户')
                }else{
                    console.log(this.userList)
                    this.activeName = 'first'
                    this.userList = res.data
                    // this.userList = res.data.slice(0,this.pageSize)
                    this.api = this.$api.carrierSearch;
                }
            })
        },
        handleClick(val){
            console.log(val.name)
            if(val.name == 'first'){
                this.getUserList(this.$api.carrierList)
                this.api = this.$api.carrierList
            }else if(val.name == 'second'){//集团
                this.getUserList(this.$api.carrierGroup)
                this.api = this.$api.carrierGroup
            }else{//个人
                this.getUserList(this.$api.carrierMysel)
                this.api = this.$api.carrierMysel
            }
        },
        handleSizeChange(){
            console.log('wizhi')
        },
        handleCurrentChange(){
            console.log('等待')
        },
        handleSizeChange(val){
            console.log(val)
            this.pageSize = val
            console.log('一页多少条数据')
            if(this.api == this.$api.carrierSearch){
                return this.searchUser(this.currentPage,val)
            }
            // this.userList = this.userLists.slice(0,val)
            this.getUserList(this.api,this.currentPage,val)
        },
        handleCurrentChange(val){
            console.log(val)
            console.log('切换页数')
            console.log(this.pageSize)
            console.log(this.userLists.slice(0,val*this.pageSize))
            // if(val!=1){
            //     this.orderData = this.userLists.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            // }else{
            //     this.orderData = this.userLists.slice(0,val*this.pageSize)
            // }
            
            if(this.api == this.$api.carrierSearch){
               return this.searchUser(val,this.pageSize)
            }
            this.getUserList(this.api,val,this.pageSize)
        }
        
    },
    watch: {
        'secled': function(newVal,oldVal){
            var selectId = [];
            for(var i of newVal){
                selectId.push(i.id)
            }
            this.daochuId = selectId.join(',')
        },
    },

}
</script>
<style lang="less" scoped>
    .all-order{
        .top{
            li>p{
                width: 340px;
                margin-left:20px;
            }
        }
    }
    .payment-finace{
        li.items-center>span{
            display: inline-block;
            width:70px;
        }
    }
</style>