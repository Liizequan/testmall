<template>
    <div class='undersDocu contain'>
        <el-table :data="list.data" stripe :header-cell-style="$store.state.headStyle">
            <el-table-column type="index"></el-table-column>
            <el-table-column label='文档名称' prop='document_name'></el-table-column>
            <el-table-column label='描述' prop='describe'></el-table-column>
            <!-- <el-table-column label='状态' prop='status'></el-table-column> -->
            <el-table-column label='上传时间' prop='create_time'></el-table-column>
            <el-table-column label="关注">
                <template slot-scope="scope">
                    <div @click="viewpoint(scope.row)">
                        <el-rate :max="1" v-model="scope.row.is_viewpoint" disabled></el-rate>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="210">
                <template slot-scope="scope">
                    <div class="action">
                        <!-- <el-link :underline='false' type='primary' @click="check(scope.row)">审核 <i
                                class='el-icon-search'></i></el-link>

                        <menRadio :excuters="excuters" @theRes="execuRes">
                            <template slot="title">
                                <h3>审批人</h3>
                            </template>
                            <template slot="main">
                                <el-link :underline='false' type='primary' style="margin-left:30px;"
                                    @click="getRowId(scope.row.document_id)">分享 <i class='el-icon-top-right'></i>
                                </el-link>
                            </template>
                        </menRadio> -->
                        <el-link :underline='false' type='primary' class='ml20' @click="download(scope.row)">下载 <i
                                class='el-icon-download'></i>
                        </el-link>
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
        <el-dialog :visible.sync="checkDia" title="审核">
            <el-form label-width="120px">
                <el-form-item label="状态">
                    <el-select v-model="checkStatus" placeholder="请选择" style="width:100%">
                        <el-option label="通过" value="1"></el-option>
                        <el-option label="不通过" value="0">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" v-model="describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="checkCon">确定</el-button>
                    <el-button @click="checkDia = false">取消</el-button>
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
                list: '',
                uploadingDia: false,
                describe: '',
                checkStatus: '',
                checkDia: false,
                id: '',
                excuters: '',
                execuResVal: '',
                document_id: ''
            }
        },
        components: { menRadio },
        methods: {
            getRowId(id) {
                this.document_id = id
            },
            execuRes(res) {
                this.execuResVal = res
                this.$http.post('document/sharedocument', {
                    document_id: this.document_id,
                    approval_id: res.id
                }).then(res => {
                    this.$message(res.msg)
                })
            },
            upload() {
                this.uploadingDia = true
            },
            getList() {
                this.$http.get('document/undersdocumentlist').then(res => {
                    this.list = res.msg
                })
            },
            download(row) {
                this.$http.download(row.document_url)
            },
            check(row) {
                this.checkDia = true
                this.id = row.id
            },
            checkCon() {
                this.$http.post('document/checkunderdocument', {
                    status: this.checkStatus,
                    describe: this.describe,
                    id: this.id
                }).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.getList()
                    }
                })
            },
            viewpoint(row) {
                if (!row.is_viewpoint) {
                    this.$http.post('document/viewpointundersdocument', {
                        document_id: row.id
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                } else {
                    this.$http.post('document/unviewpointundersdocument', {
                        document_id: row.id
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                }
            },
            getMen() {
                this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
                    for (let i in res) {
                        res[i].group = []
                    }
                    this.excuters = res
                    if (res) {
                        if (this.$route.query.who == 'edit') {
                            this.who = 'edit'
                            this.editInit()
                        }
                    }
                })
            }
        },
        created() {
            this.getList()
            this.getMen()
        }
    }
</script>
<style lang='less' scoped>
    .action {
        display: flex;
    }

    /deep/.el-link--primary>.el-link--inner {
        display: flex;
        align-items: center;
        width: 50px;
    }

    .is-underline.el-link--primary {
        height: 24px;
    }
  /deep/.el-dialog{
    width:560px;
  }
</style>