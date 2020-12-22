<template>
    <div class='vPointDocu contain'>
        <!-- <div class="topBtns">
                    <el-button @click="upload" type="primary">上传文档</el-button>
                </div> -->
        <el-table :data="list.data" stripe
        :header-cell-style="$store.state.headStyle">
            <el-table-column type="index"></el-table-column>
            <el-table-column label='文档名称' prop='document_name'></el-table-column>
            <el-table-column label='描述' prop='describe'></el-table-column>
            <!-- <el-table-column label='状态' prop='status'></el-table-column> -->
            <el-table-column label='上传时间' prop='create_time'></el-table-column>
            <el-table-column label="关注">
                <template slot-scope="scope">
                    <div @click="viewpoint(scope.row.id)">
                        <el-rate :max="1" v-model="scope.row.is_viewpoint" disabled></el-rate>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-link :underline='false' type='primary' @click="download(scope.row.document_url)">下载 <i class='el-icon-download'></i></el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="uploadingDia" title="上传文档">
            <el-form label-width="100px" style="text-align:left;">
                <el-form-item label="文档上传:">
                    <el-link :underline='false' type='primary'>上传</el-link>
                </el-form-item>
                <el-form-item label="审批人:">
                    <el-input placeholder="请选择审批人"></el-input>
                </el-form-item>
                <el-form-item label="关注:">
                    <el-checkbox></el-checkbox>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input type="textarea" label="请输入文档描述"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '已通过', star: 1 },
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '未通过', star: 1 },
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '已通过', star: 1 },
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '已通过', star: 1 }
                ],
                uploadingDia: false
            }
        },
        methods: {
            download(url){
                this.$http.download(url)
            },
            viewpoint(id){
                this.$http.post('document/unviewpoint',{document_id:id}).then(res=>{
                    this.$message(res.msg)
                    if(res.code ==1){
                        this.getList()
                    }
                })
            },
            upload() {
                this.uploadingDia = true
            },
            getList(){
                this.$http.get('document/viewpointdocumentlist').then(res=>{
                    this.list =res.msg
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>
<style lang='less' scoped>
</style>