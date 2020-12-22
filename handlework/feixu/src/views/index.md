page (首页)

order(订单中心)

finance(财务中心)

custom(客户中心)    

carrier(客户中心的承运商)

analysis(数据分析)

admin(管理员)






方法

submit （确认） 
save (保存)
draft （草稿）


配置安装 
vue cli2
echarts  axios  vue-router  element



让表格居中

<!-- 属性定义 -->
:cell-style="cellStyle" :header-cell-style="rowClass"

<!-- method 定义 -->
cellStyle({row,column,rowIndex,columnIndex}){
    return 'text-align:center'
},  
rowClass({row,rowIndex}){
    return 'text-align:center'
},



this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
}).then(() => {
    this.$message({
    type: 'success',
    message: '删除成功!'
    });
}).catch(() => {
    this.$message({
    type: 'info',
    message: '已取消删除'
    });          
});



<!-- 分页 -->
    <!-- 层次 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="pageSize"
        :hide-on-single-page="pagin"
        layout="total, sizes, prev, pager, next, jumper"
        background
        class="txt-center ptop40 pbom20"
        style="width:750px"
        :total="orderDatas.length">
    </el-pagination>

    <!-- data -->
        orderData:[],//页面数据
        orderDatas:[],//所有数据
        pageSize:4,//一页的数据


    <!-- 方法 -->
    handleSizeChange(val){
        console.log(val)
        this.pageSize = val
        console.log('一页多少条数据')
        this.orderData = this.orderDatas.slice(0,val)
    },
    handleCurrentChange(val){
        console.log(val)
        console.log('切换页数')
        console.log(this.pageSize)
        console.log(this.orderDatas.slice(0,val*this.pageSize))
        if(val!=1){
            this.orderData = this.orderDatas.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
        }else{
            this.orderData = this.orderDatas.slice(0,val*this.pageSize)
        }
    }



    <!-- 导入导出组件 -->
    层次
    <import-export :importApi="this.$api.orderUpload" :exportApi="this.$api.orderExport"/>

    引入
    
    import ImportExport from "@/components/ImportExport.vue";
    export default {
        components: { ImportExport },



        http://47.115.119.6:888/phpmyadmin_3f87d1dd7fdf546f/sql.php?server=1&db=gzsfeixu_com&table=fx_order_carrier&pos=0

        gzsfeixu_com
        x8A8PWP58JAjCakb





        const promise = new Promise(function(resolve,reject)){
            if(resolve.code == 1){
                return resolve(value)
            } else {
                reject (err)
            }
        }

        promise.then(function(value){},function(err){})

        你让我脱下口罩，那你离我5米远

        你离开了我


        '我该做咪呀!','我跟着我吧!','我带你吃香的喝辣的','我不能吃辣,所以不能跟你一起了!'

        function timeout(ms){
            return new Promise((resolve,reject)=>{
                setTimeout(resolve,ms,'done')
            })
        }
        timeout(100).then((value)=>{
            console.log(value)
        })
        
        function loadImageAsync(url){
            return new Promise(function(resolve,reject){
                const image = new Image();

                image.onload = function(){
                    resolve(image)
                }

                image.onerror = function(){
                    reject(new Error('Could not load image at ' + url))
                }

                image.src = url;
            })
        }


        const getJSON = function(url){
            const promise = new Promise(function(resolve,reject){
                const handler = function(){
                    if(this.readyState != 4){
                        return;
                    }

                    if(this.status === 200){
                        resolve(this.response);
                    }else{
                        reject(new Error(this.statusText));
                    }
                }

                const client = new XMLHttpRequest();
                client.open("GET",url);
                client.onreadystatechange = handler;
                client.responseType = "json";
                client.setRequestHeader("Accept","application/json");
                client.send();
            })

            return promise;
        }

        getJSON("/posts.json").then(function(json){
            console.log('Contents:'+json)
        },function(error){
            console.log('出错了',error);
        })

        
