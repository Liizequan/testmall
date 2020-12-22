<template>
    <div class="notice">
        <!-- 我是公告栏 -->
        <div class="notice-child">
            <div class="top">
                <div class="left">
                    <el-button><i class="el-icon-plus"></i>新建公告</el-button>
                </div>
                <div class="right between">
                    <p>搜索</p>
                    <el-input
                        placeholder="搜索员工、客户、公司名称"
                        prefix-icon="el-icon-search"
                        v-model="searchText"
                        circle
                    >
                    </el-input>
                </div>
            </div>
            <el-table stripe
            :header-cell-style="$store.state.headStyle"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;text-align:center"
                :default-sort = "{prop: 'date', order: 'descending'}"
                border>
                <el-table-column  type="selection"  width="55">
                </el-table-column>
                <el-table-column prop="title"  label="标题">
                </el-table-column>
                <el-table-column prop="name" label="创建人" width="180">
                </el-table-column>
                <el-table-column sortable prop="date" label="更新时间" width="180">
                </el-table-column>
                <el-table-column prop="status" label="当前状态" width="180">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    详情 <i class="el-icon-arrow-right"></i>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        //   搜索内容
        searchText:'你好',
        tableData: [{
          id:1,
          title:'最新活动安排',
          name: '王小虎',
          date: '2016-05-02',
          status:'已发布',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id:2,
          title:'最新活动安排',
          name: '王小虎',
          date: '2016-05-01',
          status:'已发布',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id:3,
          title:'最新活动安排',
          name: '王小虎',
          date: '2016-05-03',
          status:'已发布',
          address: '上海市普陀区金沙江路 1518 弄',
        }],
      }
    },

    methods: {
        formatter(row, column) {
            return row.address;
        }
    }
}
</script>
<style lang="less" scoped>
.notice-child{
    padding:40px;
    .top{
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;
        .right{
            width:400px;
            align-items: center;
            .el-input{
                flex:1;
                margin-left: 10px;
                border-radius: 30px;
            }
        }
    }
}
</style>