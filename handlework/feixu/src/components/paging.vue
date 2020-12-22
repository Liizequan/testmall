<template>
    <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            background
            class="txt-center ptop40 pbom20"
            style="width:750px"
            :total="100">
        </el-pagination>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    
</style>