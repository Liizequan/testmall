
<template>
    <div class='deepPublic'>
        <!-- <div class="topBtns">
            <el-button @click="upload" type="primary">上传文档</el-button>
        </div> -->
        <div class="topBtns">
            <span class="title">{{title}}</span>
            <div>
                <el-button type="primary" @click="uploadingDia = true">上传文档</el-button>
                <el-button @click="back">返回</el-button>
            </div>
        </div>
        <el-table :data="list" stripe :header-cell-style="$store.state.headStyle">
            <el-table-column type="index"></el-table-column>
            <el-table-column label='文档名称' prop='document_name'></el-table-column>
            <el-table-column label='描述' prop='describe'></el-table-column>
            <!-- <el-table-column label='状态' prop='status'></el-table-column> -->
            <el-table-column label='上传时间' prop='create_time'></el-table-column>
            <!-- <el-table-column label="关注">
                <template slot-scope="scope">
                    <div @click="viewpoint(scope.row)">
                        <el-rate :max="1" v-model="scope.row.is_viewpoint" disabled></el-rate>
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-link :underline='false' type='primary' @click="download(scope.row)">下载</el-link>
                        <el-link v-if="deletepublicdocument" :underline='false' type='primary' class='ml20' @click="del(scope.row.id)">删除
                            <i class='el-icon-delete'></i></el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="uploadingDia" title="上传文档">
            <el-form label-width="100px" style="text-align:left;">
                <el-form-item label="文档上传:">
                    <el-link :underline='false' type='primary'><input type="file" name="file" id="file" ref="file"
                            @change="fileChan" />上传</el-link><span>{{documentName}}</span>
                </el-form-item>
                <el-form-item label="审批人:">
                    <menRadio :excuters="excuters" @theRes="execuRes">
                        <template slot="title">
                            <h3>审批人</h3>
                        </template>
                        <template slot="main">
                            <el-input v-model="execuResVal.name" placeholder='请选择'></el-input>
                        </template>
                    </menRadio>
                </el-form-item>
                <!-- <el-form-item label="关注:">
                    <el-checkbox v-model="is_viewpoint"></el-checkbox>
                </el-form-item> -->
                <el-form-item label="描述:">
                    <el-input type="textarea" label="请输入文档描述" v-model="describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="confirm">确定</el-button>
                    <el-button @click="uploadingDia = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import menRadio from '@/components/menRadiocopy.vue'
    export default {
        data() {
            return {
                list: [
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '已通过', star: 1 },
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '未通过', star: 1 },
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '已通过', star: 1 },
                    { name: '名称.docx', create_time: '2020-02-02', describe: '描述', status: '已通过', star: 1 }
                ],
                uploadingDia: false,
                title: '',
                name: '',
                folder_id: '',
                documentName: '',
                excuters: '',
                execuResVal: '',
                describe: '',
                is_viewpoint: true,
                documentId: ''
            }
        },
        components: { menRadio },
        methods: {
            download(e){
                console.log(e.document_url)
                this.$http.download(e.document_url)
            },
            del(id) {
                this.$http.conf().then(() => {
                    this.$http.post('document/delfolderdocument', {
                        // folder_id: this.folder_id,
                        id: id
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                })

            },
            viewpoint(row) {
                if (!row.is_viewpoint) {
                    this.$http.post('document/viewpointpublicdocument', {
                        document_id: row.id
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                } else {
                    this.$http.post('document/unviewpointpublicdocument', {
                        document_id: row.id
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                }
            },
            confirm() {
                this.$http.post('document/uppublicdocument', {
                    document_id: this.documentId,
                    approval: this.execuResVal.id,
                    // is_viewpoint: this.is_viewpoint ? 1 : 0,
                    describe: this.describe,
                    folder_id: this.folder_id
                }).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.uploadingDia = false
                        this.getList()
                    }
                })
            },
            execuRes(res) {
                this.execuResVal = res
            },
            getMen() {
                this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
                    for (let i in res) {
                        res[i].group = []
                    }
                    this.excuters = res
                })
            },
            fileChan() {
                this.$http.upload(this.$refs.file.files[0]).then(res => {
                    if (res.data.code == 1) {
                        this.$message('上传成功')
                        this.documentId = res.data.msg.id
                        this.documentName = this.$refs.file.files[0].name
                    } else {
                        this.$message('上传失败')
                    }
                })
            },
            upload() {
                this.uploadingDia = true
            },
            getList() {
                this.$http.get('document/folderdocument', {
                    folder_id: this.folder_id
                }).then(res => {
                    this.list = res.msg
                })
            }
        },
        created() {
            this.deletepublicdocument = this.$http.allow('删除公共文件')
            this.title = this.$route.query.name
            this.folder_id = this.$route.query.folder_id
            this.getList()
            this.getMen()
        }
    }
</script>
<style lang='less' scoped>
    .deepPublic {
        text-align: left;
    }

    .title {
        font-size: 1rem;
        color: #303133;
        font-weight: bold;
    }
</style>