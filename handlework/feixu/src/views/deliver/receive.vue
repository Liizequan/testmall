<template>
    <div class="all-order payment-finace">
        <!-- 我是收发人列表 -->
        <div class="top">
            <el-row :gutter="20" class="ptop20">
                <el-col :span="8" class="items-center">
                    <span>名称：</span>
                    <p class="flex1"><el-input v-model="search.username"></el-input></p>
                </el-col>
                <el-col :span="8" class="items-center">
                    <span>地区筛选：</span>
                    <p class="flex1"><el-input v-model="search.addresss"></el-input></p>
                </el-col>
                <el-col :span="8" class="items-center">
                    <span>联系电话：</span>
                    <p class="flex1"><el-input v-model="search.phone"></el-input></p>
                </el-col>
            </el-row>
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
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                </li>
            </ul> -->
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
                </el-tabs>
                <!-- <import-export :isExport="true" :exportApi="this.$api.userExport"/> -->
            </div>
            <!-- 数据列表 -->
             <el-table  :data="userList.data" stripe style="width: 100%">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="name"  label="名称">
                </el-table-column>
                <el-table-column  prop="address"  label="地址">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话">
                </el-table-column>
            </el-table>
            <!-- 分页列表 -->
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[4, 8, 12, 16]"
                :page-size="pageSize"
                :hide-on-single-page="pagin"
                layout="total, sizes, prev, pager, next, jumper"
                background
                class="txt-center ptop40 pbom20"
                style="width:750px"
                :total="userList.length">
            </el-pagination> -->
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
                addresss:'',//地区
                phone:'',//时间
            },
            userList:[],
            userLists:[],
            
            payDatas:[],//所有数据
            
            currentPage:1,
            pagin:true,//是否显示
            payData:[],//页面数据
            pageSize:10,//一页的数据
            totalSize:0,//所有数据的条数
            api:'',
        }
    },
    created() {
        this.getUserList(this.$api.address)
        this.api = this.$api.address
    },
    methods: {
        getUserList(url,pageNum,pageSize){
            this.$http.get(url,{
                pageNum:pageNum || this.currentPage,
                pageSize:pageSize || this.pageSize,
            },res=>{
                console.log(res)
                // this.userList = res.data.data
                // this.totalSize = res.data.totalSize
                if(res.data.data.length != 0){
                    this.pagin = false
                    this.userList = res.data
                }else{
                    this.pagin = true
                }
            })
        },
        lookDetail(val){
            console.log('查看详情')
            this.$router.push({
                path: '/custom/detail',
                query: {
                    id: val
                }
            })
        },
        // 搜索客户
        searchUser(pageNum,pageSize){
            var search = this.search
            this.$http.post(this.$api.searchAdres,{
                name:search.username,
                address:search.addresss,
                phone:search.phone,
                pageNum:pageNum,
                pageSize:pageSize,
            },res=>{
                console.log(res)
                if(res.data.length==0){
                    this.$message('暂无查询到客户')
                }else{
                    console.log(this.userList)
                    this.activeName = 'first'
                    this.userList = res.data
                    this.api = this.$api.searchAdres
                    // this.totalSize = res.data.length
                    // this.userList = res.data.slice(0,this.pageSize)
                }
            })
        },
        handleClick(val){
            this.getUserList(this.$api.address)
            console.log(this.currentPage)
            this.api = this.$api.address
        },
        handleSizeChange(val){
            // 条码
            this.pageSize = val
            // this.$http.get(this.$api.address,{
            //     pageNum:this.currentPage,
            //     pageSize:val,
            // },res=>{
            //     this.userList = res.data.data
            // })
            if(this.api == this.$api.searchAdres){
                return this.searchUser(this.currentPage,val)
            }
            this.getUserList(this.$api.address,this.currentPage,val)
        },
        handleCurrentChange(val){
            // 页码
            this.currentPage = val
            // this.$http.get(this.$api.address,{
            //     pageNum:val,
            //     pageSize:this.pageSize,
            // },res=>{
            //     this.userList = res.data.data
            // })
            
            if(this.api == this.$api.searchAdres){
                return this.searchUser(val,this.pageSize)
            }
            this.getUserList(this.$api.address,val,this.pageSize)
        }
        
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