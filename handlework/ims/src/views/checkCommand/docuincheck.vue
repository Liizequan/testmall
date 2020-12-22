<template>
    <div class='myDocu contain'>
        <!-- <div class="topBtns">
            <el-button @click="upload" type="primary">上传文档</el-button>
        </div> -->
        <el-table :data="list.data" stripe :header-cell-style="$store.state.headStyle">
            <el-table-column type="index"></el-table-column>
            <el-table-column label='文档名称' prop='document_name'></el-table-column>
            <el-table-column label='描述' prop='describe'></el-table-column>
            <el-table-column label='状态' prop='status'></el-table-column>
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
                        <el-link :underline='false' type='primary' @click="download(scope.row.document_url)">下载 <i
                                class='el-icon-download'></i>
                        </el-link>
                        <el-link :underline='false' type='primary' class='ml20' @click="pass(scope.row.id,1)">通过 <i
                                class='el-icon-finished'></i></el-link>
                        <el-link :underline='false' type='primary' class='ml20' @click="pass(scope.row.id,-1)">不通过 <i
                                class='el-icon-scissors'></i></el-link>
                        <!-- <el-link :underline='false' type='primary' class='ml20' @click="del(scope.row.document_id)">删除 <i class='el-icon-delete'></i></el-link> -->
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
                <el-form-item label="关注:">
                    <el-checkbox v-model="is_viewpoint"></el-checkbox>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input type="textarea" label="请输入文档描述" v-model="discribe"></el-input>
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
                list: [],
                uploadingDia: false,
                documentName: '',
                documentId: '',
                execuResVal: '',
                excuters: '',
                is_viewpoint: false,
                discribe: ''
            }
        },
        methods: {
            pass(id, status) {
                this.$confirm('是否确认'+(status==1?'':'不')+'通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    if (res == 'confirm') {
                        this.$http.post('document/approval', {
                            id: id,
                            status: status
                        }).then(res => {
                            this.$message(res.msg)
                            if (res.code == 1) {
                                this.getList()
                            }
                        })
                    }
                })
            },
            download(url) {
                console.log(url,'uuuuuuuuuuuuu')
                // this.$http.download(url)
            },
            del(id) {
                this.$http.post('document/delmydocument', {
                    document_id: id
                }).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.getList()
                    }
                })
            },
            viewpoint(row) {
                if (!row.is_viewpoint) {
                    this.$http.post('document/viewpointmydocument', {
                        document_id: row.id
                    }).then(res => {
                        this.$message(res.msg)
                        this.getList()
                    })
                } else {
                    this.$http.post('document/unviewpointmydocument', {
                        document_id: row.id
                    }).then(res => {
                        this.$message(res.msg)
                        this.getList()
                    })
                }

            },
            execuRes(res) {
                this.execuResVal = res
            },
            upload() {
                this.uploadingDia = true
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
            getMen() {
                this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
                    for (let i in res) {
                        res[i].group = []
                    }
                    this.excuters = res
                })
            },
            confirm() {
                this.$http.post('document/upload', {
                    document_id: this.documentId,
                    approval_id: this.execuResVal.id,
                    is_viewpoint: this.is_viewpoint ? 1 : 0,
                    describe: this.describe
                }).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.uploadingDia = false
                        this.getList()
                    }
                })
            },
            getList() {
                this.$http.get('document/checkdocumentlist').then(res => {
                    this.list = res.msg
                })
            }
        },
        components: { menRadio },
        created() {
            this.getList()
        }
    }
</script>
<style lang='less' scoped>
</style>