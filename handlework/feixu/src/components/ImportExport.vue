<template>
    <div class="inport-and-export">
        <div 
        v-if="loading"
        v-loading="loading"
        element-loading-text="拼命导入中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        style="width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;">
        </div>
        <div class="imports flex">
            <slot name='auto'></slot>
            <el-upload
                class="no-need-uplod-list"
                :action="this.$http.url+importApi"
                :beforeUpload="beforeUpload"  
                v-if="isImport"
                :on-success="submitUpload">
                <el-button title="导入" >导入</el-button>
            </el-upload>
            <el-button class='download' v-if="isExport">
                <el-link :underline="false" :href='this.$http.url+exportApi' target='_blank' :disabled="dataLength" download="" title="导出" style="display:block">导出</el-link>
            </el-button>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    props:{
        isImport:{
            type:Boolean,
        },
        isExport:{
            type:Boolean,
        },
        importApi:{//导入api
            type:String,
        },
        exportApi:{//导出api
            type:String
        },
        dataLength:{
            type:Boolean,
        },
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        // 导入时的情况
        beforeUpload(val){
            console.log(val)
            this.loading = true
        },
        // 导入成功后的情况
        submitUpload(val){
            console.log(val)
            if(val.code==1){
                this.loading = false
                this.$message(val.msg);
                this.reload();
            }else{
                this.loading = false;
                this.$message(val.msg);
            }
        },
        // 导出
        outPut(){
            console.log('导出')
        },
    },
}
</script>
<style lang="less" scoped>

</style>