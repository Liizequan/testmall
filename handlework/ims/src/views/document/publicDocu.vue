<template>
    <div class='publicDocu contain'>
        <div v-if="this.$route.path == '/publicDocu'">
            <div class="topBtns" v-if="newdepartmentfolder">
                <el-button type="primary" @click="newDia=true">新建部门文件夹</el-button>
                <!-- <el-button type="primary" @click="managing = !managing">管理文件夹</el-button> -->
            </div>
            <div class="list">
                <div class="item" v-for="(item,index) in list" :key="index" @click="toDeep(item.folder_name,item.id)">
                    <img :src="item.url">
                    <span>{{item.folder_name}}<el-link :underline='false' type='primary' class='ml20' v-if="managing"
                            @click.stop="del(item.id)">删除</el-link></span>
                </div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
            <el-dialog :visible.sync="newDia" title="新建文件夹">
                <el-form label-width="100px">
                    <el-form-item label="文件夹名称">
                        <el-input placeholder="请输入文件夹名称" v-model="documentName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.enter="save">保存</el-button>
                        <el-button @click="newDia=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                managing: false,
                newDia: false,
                documentName: '',
                list: [
                ]
            }
        },
        methods: {
            toDeep(name, folder_id) {
                this.$router.push({ path: '/publicDocu/deepPublic', query: { name: name, folder_id: folder_id } })
            },
            save() {
                this.$http.post('document/newfolder', {
                    folder_name: this.documentName
                }).then(res => {
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.getList()
                        this.newDia = false
                        this.documentName = ''
                    }
                })
            },
            getList() {
                this.$http.get('document/folderlist').then(res => {
                    for (let i in res.msg) {
                        res.msg[i].url = require('@/assets/docu.jpg')
                    }
                    this.list = res.msg
                })
            },
            del(id) {
                this.$http.conf().then(() => {
                    this.$http.post('document/delfolder', {
                        folder_id: id
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                })
            }
        },
        created() {
            this.newdepartmentfolder = this.$http.allow('新建部门文件夹')
            this.getList()
        }
    }
</script>
<style lang='less' scoped>
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .item {
        margin: 20px 40px;
        display: flex;
        flex-direction: column;
        width: 230px;
        align-items: center;
    }

    .item img {
        width: 160px;
        height: 160px;
    }
</style>