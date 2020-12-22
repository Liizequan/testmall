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
                    <el-button type="primary" class="btn-elblue" style="width:180px;" @click="searchUser">查询</el-button>
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
             <el-table  :data="userList" stripe style="width: 100%">
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
                :page-sizes="[4, 8, 12, 16]"
                :page-size="pageSize"
                :hide-on-single-page="pagin"
                layout="total, sizes, prev, pager, next, jumper"
                background
                class="txt-center ptop40 pbom20"
                style="width:750px"
                :total="userLists.length">
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
            currentPage:1,
            pagin:true,//是否显示
            payData:[],//页面数据
            payDatas:[],//所有数据
            pageSize:4,//一页的数据
        }
    },
    created() {
        this.getUserList(this.$api.address)
    },
    methods: {
        getUserList(url){
            this.$http.get(url,{},res=>{
                console.log(res)
                this.userLists = res.data
                this.userList = res.data.slice(0,this.pageSize)
                if(res.data.length != 0){
                    this.pagin = false
                }else{
                    this.pagin = true
                }
            })
        },
        lookDetail(val){
            console.log('查看详情')
            // this.$router.push('/custom/detail')
            
            this.$router.push({
                path: '/custom/detail',
                query: {
                    id: val
                }
            })
        },
        // 搜索客户
        searchUser(){
            var search = this.search
            // if(!search.username && !search.addresss && !search.phone){
            //     return this.$message('请输入查询的内容')
            // }
            this.$http.post(this.$api.searchAdres,{
                name:search.username,
                address:search.addresss,
                phone:search.phone,
            },res=>{
                console.log(res)
                if(res.data.length==0){
                    this.$message('暂无查询到客户')
                }else{
                    console.log(this.userList)
                    this.activeName = 'first'
                    this.userLists = res.data
                    this.userList = res.data.slice(0,this.pageSize)
                }
            })
        },
        handleClick(val){
            console.log(val.name)
            if(val.name == 'first'){
                this.getUserList(this.$api.userList)
            }else if(val.name == 'second'){//集团
                this.getUserList(this.$api.userGroup)
            }else{//个人
                this.getUserList(this.$api.userMysel)
            }
        },
        handleSizeChange(val){
            console.log(val)
            this.pageSize = val
            console.log('一页多少条数据')
            this.userList = this.userLists.slice(0,val)
        },
        handleCurrentChange(val){
            console.log(val)
            console.log('切换页数')
            console.log(this.pageSize)
            console.log(this.userLists.slice(0,val*this.pageSize))
            if(val!=1){
                this.userList = this.userLists.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            }else{
                this.userList = this.userLists.slice(0,val*this.pageSize)
            }
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