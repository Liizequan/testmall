<template>
    <div class="contain">
        <div class="notice-add">
            <div class="top">
                <h3>{{!isReply?'新建邮件':'回复邮件'}}</h3>
            </div>
            <div class="content">
                <el-form ref="form" :model="form" label-width="80px" label-position="left">
                    <el-form-item label="收件人 : " class="redStar">
                        <div style='position:relative;overflow: hidden;' @click="isShowTrue(1)">
                            <el-input v-model="form.name1" :placeholder="list1.length==0?'+ 添加收件人':''"></el-input>
                            <div class="text">
                                <span v-for="(item,index) in list1" :key="index">
                                    {{item.name}}
                                </span>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="抄送 : ">
                    <div style='position:relative;overflow: hidden;' @click="isShowTrue(2)">
                        <el-input v-model="form.name2" placeholder="+ 添加收件人"></el-input>
                        <div class="text">
                            <span v-for="(item,index) in list2" :key="index">
                                {{item.name}} ；
                            </span>
                        </div>
                    </div>
                </el-form-item> -->
                    <!-- <el-form-item label="密送 : ">
                    <div style='position:relative;overflow: hidden;' @click="isShowTrue(3)">
                        <el-input v-model="form.name3" placeholder="+ 添加收件人"></el-input>
                        <div class="text">
                            <span v-for="(item,index) in list3" :key="index">
                                {{item.name}} ；
                            </span>
                        </div>
                    </div>
                </el-form-item> -->
                    <el-form-item label="主题 : " class="redStar">
                        <div>
                            <el-input type="textarea" placeholder="请填主题（15字内）" v-model="form.name4" maxlength="15">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="">
                        <!-- <div style="color:#409EFF;"><i class="el-icon-paperclip"></i> 添加附件 :</div> -->
                        <div class="textarea font14-nobold-9">
                            <el-link :underline="false" style="margin-right:20px;border:0;" class="upBtn"><i
                                    class="el-icon-plus"></i>上传附件<input type="file" ref="file" id="file"
                                    @change="upChan" name="file"></el-link>
                        </div>
                        <div class="eclosure" style="margin-top:10px;">
                            <div class="textarea font14-nobold-9 fordel" v-for="(item,index) in files" :key="index">
                                <i class='el-icon-folder'>{{item.name}}</i>
                                <i class='el-icon-delete' @click="delfile(index)"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="内容 : " class="redStar">
                        <div style='position:relative;overflow: hidden;'>
                            <!-- 富文本 -->
                            <div class="edict" id="editor" ref="editor">
                            </div>
                            <!-- <div class="a-btn" @click="editorTap">
                            <a href="javascript:void(0)">提交</a>
                        </div> -->

                            <!-- <div>发送人：<span>李先生</span></div> -->
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bottom">
                <el-button type="primary" @click="Preservation">发送</el-button>
                <el-button type="primary" @click="Toexamine">保存为草稿</el-button>
                <el-button @click="back()">返回</el-button>
            </div>

            <!-- 弹框 -->

            <ElasticFrame name='请选择您的收件人' v-if="isShow" @close='close'>
                <div class="elastic-slot">
                    <div class="left">
                        <div class="search">
                            联系人：
                        </div>
                        <div class="left-box">
                            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="filterText"
                                @change="searchUser">
                            </el-input>
                            <div class="container font14-nobold-6">
                                <!-- 最近联系人 -->
                                <div class="lately">
                                    <div class="lately-txt between">
                                        <span class="font14-bold-3">所有联系人</span>
                                        <span @click="deleteStroge" v-if="latelys.length!=0">清空</span>
                                    </div>

                                    <el-collapse v-model="activeNames" @change="handleChange"
                                        v-if="searchRes.length!=0">
                                        <el-collapse-item title="搜索人员" name="activeNames">
                                            <div v-for="(items,index) in searchRes" style="padding:0 10px;"
                                                class="lately-lists" :key="index" @click="contacts(items)">
                                                <el-link :underline="false" class="font14-nobold-6" href="javascript:;">
                                                    {{items.name}}</el-link>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                    <ul>
                                        <li v-for="(item,index) in latelys" :key="index" @click="contacts(item)"
                                            class="lately-list" :class="[latelyIndex == index ? 'active' : '']">
                                            <el-link :underline="false">{{item.name}}</el-link>
                                        </li>
                                    </ul>
                                </div>
                                <!-- 所有人 -->
                                <div class="lately">
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <div v-for="(item,index) in allLately" :key="index">
                                            <el-collapse-item :title="item.label + '(' + item.user.length + ')'"
                                                :name="index">
                                                <div v-for="(items,index) in item.user" style="padding:0 10px;"
                                                    class="lately-lists" :key="index" @click="contacts(items)">
                                                    <el-link :underline="false" class="font14-nobold-6"
                                                        href="javascript:;">{{items.name}}</el-link>
                                                </div>
                                            </el-collapse-item>
                                        </div>
                                    </el-collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="center">
                        <i class="el-icon-right"></i>
                    </div>
                    <div class="right">
                        收件人：
                        <div class="right-box">
                            <div class="container">
                                <ul class="right-box-ul">
                                    <li v-for="(item,index) in rightLatelys" :key="index" class="between">
                                        <a href="javascript:;"
                                            :class="[latelyIndex == index ? 'active' : '']">{{item.name}}</a>
                                        <i class="el-icon-remove-outline" @click="deteleContacts(index)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <el-button type='primary' @click="submitLately">确定</el-button>
                    <el-button @click="cancelLately">取消</el-button>
                </div>
            </ElasticFrame>
        </div>
        <el-dialog :visible.sync="signDia" title="提示" :modal="false">
            <div style="margin-bottom:10px;">是否将以下内容保存为签名</div>
            <div>
                <el-button type="primary" @click="sign">确定</el-button>
                <el-button @click="signDia = false">取消</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import E from 'wangeditor'
    import ElasticFrame from "../../../components/ElasticFrame.vue";

    export default {
        data() {
            return {
                isReply:'',
                signContent: '',
                signEditor: '',
                signDia: false,
                searchRes: [],//搜索人员
                form: {
                    name1: '',
                    name2: '',
                    name3: '',
                    name4: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },//表单数据
                isShow: false,//用来显不显示父路由内容

                filterText: '',//搜索内容
                latelys: [
                    // {
                    //     id: 1, name: '陈平安经理1',
                    // },
                    // {
                    //     id: 2, name: '陈平安经理2',
                    // },
                    // {
                    //     id: 3, name: '陈平安经理3',
                    // },
                    // {
                    //     id: 4, name: '陈平安经理4',
                    // },
                    // {
                    //     id: 5, name: '陈平安经理5',
                    // },
                    // {
                    //     id: 6, name: '陈平安经理6',
                    // }
                ],//最近联系人，添加为本地
                allLately: [],//所有联系人，为数据库访问数据
                latelyIndex: null,//是否添加为联系人
                rightLatelys: [],//右边添加后的联系人


                activeNames: '',
                list1: [],
                list2: [],
                list3: [],
                listIndex: null,


                receiver: [],//收件人
                files: [],
                file_ids: [],
                ids_str: '',
                editor: "",
                emailDetal: '',//邮箱详情
            }
        },
        components: {
            ElasticFrame,
            E
        },
        computed: {

        },
        watch: {
            // signDia(){
            //     if(this.signDia){
            //        this.signEditor.create()
            //     }
            // }
            rightLatelys(){
                console.log(this.rightLatelys,'llllllllll')
            }
        },
        // 与富文本有关
        mounted() {
            var _this = this;
            this.editor = new E("#editor");//new即可
            // this.signEditor = new E("#signEditor");
            //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                //'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                //'video',  // 插入视频
                //'code',  // 插入代码
                //'undo',  // 撤销
                //'redo'  // 重复
            ];
            // this.signEditor.customConfig.menus = [
            //     'head',  // 标题
            //     'bold',  // 粗体
            //     'fontSize',  // 字号
            //     'fontName',  // 字体
            //     'italic',  // 斜体
            //     'underline',  // 下划线
            //     'strikeThrough',  // 删除线
            //     'foreColor',  // 文字颜色
            //     'backColor',  // 背景颜色
            // ];
            this.editor.customConfig.customUploadImg = function (files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法

                // 上传代码返回结果之后，将图片插入到编辑器中
                console.log(files)
                for (let i in files) {
                    _this.$http.Imgupload(files[i]).then(res => {
                        insert(_this.$baseURL + res.data.msg.path)
                    })
                }
            }
            this.editor.customConfig.pasteFilterStyle = false
            this.editor.create();//以上配置完成之后调用其create()方法进行创建
            // this.signEditor.create();
            let father = document.getElementsByClassName('w-e-toolbar')[0]
            //插入签名
            let child = document.createElement('div')
            child.id = 'signP'
            let signImg = document.createElement('img')
            signImg.src = require("@/assets/sign.png")
            signImg.onmouseover = () => {
                signImg.src = require("@/assets/signS.png")
            }
            signImg.onmouseleave = () => {
                signImg.src = require("@/assets/sign.png")
            }
            signImg.id = 'signImg'
            child.append(signImg)
            child.onclick = () => {
                console.log('插入个性签名', this.signContent)
                if (/<\/p>$/.test(this.editor.txt.html())) {
                    // let tempArr = this.editor.txt.html().split('</p>')
                    // let content = tempArr.join('')+this.signContent+'</p>'
                    this.editor.txt.append(this.signContent)
                } else {
                    // console.log(this.signContent)
                    // this.editor.txt.append('<p>'+this.signContent+'</p>')
                    this.editor.txt.append(this.signContent)
                }
            }
            //编辑签名
            let child2 = document.createElement('div')
            let td = document.createElement('td')
            child2.id = 'signP2'
            let signImg2 = document.createElement('img')
            signImg2.src = require("@/assets/add.png")
            signImg2.onmouseover = () => {
                signImg2.src = require("@/assets/addS.png")
            }
            signImg2.onmouseleave = () => {
                signImg2.src = require("@/assets/add.png")
            }
            signImg2.id = 'signImg2'
            child2.append(signImg2)
            child2.onclick = () => {
                // this.$confirm('是否将以下内容设为个性签名', '提示').then(() => {
                this.signDia = true
                // })
                // if (/<\/p>$/.test(this.editor.txt.html())) {
                //     console.log('设置个性签名' + this.editor.txt.html())
                // tempArr= this.editor.txt.html().split('</p>')
                // tempArr.splice(tempArr.length-1)
                // content = tempArr.join('')
                // console.log(content)
                // tempArr = content.split('>')
                // tempArr.splice(0,1)
                // content = tempArr.join('')+'>'
                // content = '<' + this.editor.txt.html().split('</p>')[0].split('><')[1]
                //     content = this.editor.txt.html()
                // } else {
                //     console.log('设置个性签名' + this.editor.txt.html())
                //     content = this.editor.txt.html()
                // }

            }
            father.append(child); 
            father.append(child2);
            // father.append(child)
            // father.append(child2)
        },
        methods: {
            delfile(i){
                this.files.splice(i,1)
                this.file_ids.splice(i,1)
            },
            sign() {
                this.signDia = false
                let content
                let tempArr
                content = this.editor.txt.html()
                if (content.length > 255) {
                    this.$message('内容太长')
                    return
                }
                this.$http.post('email/addsign', {
                    content: content
                }).then(res => {
                    if (res.code == 1) {
                        this.editor.txt.clear()
                        this.getSign()
                        this.$message('保存签名成功')
                    } else {
                        this.$message(res.msg)
                    }
                })
            },
            // 搜索人员
            // user/search
            searchUser(val) {
                if (val) {
                    this.$http.get('/user/search', { name: val, token: this.$token }).then(res => {
                        this.searchRes = res
                    })
                } else {
                    this.searchRes = []
                }
            },
            onSubmit() {
                console.log('submit!');
            },
            // 显示弹框
            isShowTrue(index) {
                this.isShow = true
                console.log('显示弹框')
                console.log(index)
                this.listIndex = index
                if (index == 1) {
                    this.rightLatelys = this.list1
                }
                if (index == 2) {
                    this.rightLatelys = this.list2
                }
                if (index == 3) {
                    this.rightLatelys = this.list3
                }
            },
            // 发送
            Preservation(e) {
                if (!this.list1.length) {
                    this.$message('请选择收件人')
                } else if (!this.form.name4) {
                    this.$message('请填写主题')
                } else if (
                    this.editor.txt.html() == '<p><br></p>') {
                    this.$message('请输入内容')
                } else {
                    this.$http.post('email/add', {
                        // token: this.$token,
                        receiver: this.receiver.join(','),
                        title: this.form.name4,
                        file: this.$http.getIdsStr(this.file_ids),
                        status: 1,
                        content: this.editor.txt.html()
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.back()
                        }
                    })
                }
                // token,receiver(接收人1,2,3), title, file(附件1,2,3), status(传1), content（发送内容）
            },
            // 保存为草稿
            Toexamine(e) {
                if (!this.list1.length) {
                    this.$message('请选择收件人')
                } else if (!this.form.name4) {
                    this.$message('请填写主题')
                } else if (
                    this.editor.txt.html() == '<p><br></p>') {
                    this.$message('请输入内容')
                } else {
                    this.$http.post('email/add', {
                        // token: this.$token,
                        receiver: this.receiver.join(','),
                        title: this.form.name4,
                        file: this.$http.getIdsStr(this.file_ids),
                        status: 0,
                        content: this.editor.txt.html()
                    }).then(res => {
                        this.$message(res.msg)
                        if (res.codo == 1) {
                            this.back()
                        }
                    })
                }
            },
            // 关闭弹框
            close(isShow) {
                // console.log('关闭')
                this.isShow = isShow
            },

            //上传文件
            upChan() {
                this.$http.upload(this.$refs.file.files[0], { token: this.$token }).then(res => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.$message('上传成功')
                        this.files.push({ name: this.$refs.file.files[0].name, msg: res.data.msg })
                        this.file_ids.push(res.data.msg.id)
                        // for (let i in this.file_ids) {
                        //     if (i == this.file_ids.length - 1) {
                        //         this.ids_str += this.file_ids[i]
                        //     } else {
                        //         this.ids_str += this.file_ids[i] + ','
                        //     }
                        // }
                    }
                })
            },
            // 弹框
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            // 添加为收件人
            contacts(index) {
                console.log(JSON.parse(JSON.stringify(index)))
                // console.log('联系人')latelys
                var lately = index
                var rightLatelys = this.rightLatelys;
                rightLatelys = rightLatelys
                // console.log(rightLatelys)
                for (let i of rightLatelys) {
                    if (JSON.stringify(i) === JSON.stringify(lately)) {
                        return this.$message('您已添加该联系人');
                    }
                }
                this.receiver.push(lately.user_id)
                rightLatelys.push(lately)
                this.rightLatelys = rightLatelys
                this.latelyIndex = index
                // console.log(this.rightLatelys)
            },
            // 删除收件人
            deteleContacts(index) {
                this.rightLatelys.splice(index, 1)
                console.log(this.rightLatelys)
            },
            handleChange() {
                console.log('展开')
            },
            // 清空最近联系人
            deleteStroge() {
                this.latelys = []
            },
            // 添加确定
            submitLately() {
                console.log('添加成功')
                this.isShow = false
                console.log(this.rightLatelys)
                console.log(this.listIndex)
                // if (this.listIndex == 1) {
                //     this.list1 = this.rightLatelys
                // }
                // if (this.listIndex == 2) {
                //     this.list2 = this.rightLatelys
                // }
                // if (this.listIndex == 3) {
                //     this.list3 = this.rightLatelys
                // }
            },
            // 取消联系人
            cancelLately() {
                console.log('取消成功')
                this.isShow = false
                this.list1 = []
                this.receiver = []
            },
            getSign() {
                this.$http.get('email/getsign').then(res => {
                    if (res.code == 1) {
                        this.signContent = res.msg.content
                    }
                })
            }
        },
        created() {
            // 传参表示编辑
            this.receiveId = this.$route.query.id
            if (this.$route.query.id) {
                this.$http.get('email/look', {
                    token: localStorage.getItem("token"),
                    id: this.$route.query.id
                }).then(res => {
                    this.emailDetal = res
                    this.isReply = this.$route.query.navIndex
                    if(this.$route.query.navIndex!=0){//如果是重新新建邮箱就渲染，如果是回复就不渲染
                        this.form.name4 = res.title
                        this.editor.txt.html(res.content)
                    }
                    let obj = {
                        id:res.send_id,
                        name:res.send
                    }
                    this.receiver.push(res.send_id)
                    this.list1 = [obj]
                })
            }
            this.getSign()
            this.$http.get('user/index', {
                token: localStorage.getItem("token")
            }).then(res => {
                console.log(res)
                this.allLately = res
            })
        },
    };
</script>
<style lang="less" scoped>
    .notice-add {
        text-align: left;
        height: calc(100% - 40px);
        position: relative;

        .content {
            .text {
                position: absolute;
                top: 0;
                left: 10px;
                top: 1px;

                span {
                    display: inline-block;
                    padding: 0 10px;
                    background-color: #fff;
                    height: 36px;
                }
            }

            .edict {
                // border:1px solid #303133;
                height: 400px;
                // padding:10px;
            }
        }

        h3 {
            padding-bottom: 20px;
        }

        p {
            padding-left: 10px;
            border-left: 2px solid #409EFF;
            margin-bottom: 20px;
        }

        .bottom {
            text-align: center;
            margin: auto;
        }

        .elastic-slot {
            display: flex;
            justify-content: space-between;
            padding: 20px;

            .left-box,
            .right-box {
                margin-top: 20px;

                .lately-txt {
                    padding-bottom: 10px;
                }

                .lately-list a {
                    display: inline-block;
                    color: #303133;
                    text-decoration: none;
                    padding: 5px 10px;
                }


                .right-box-ul .between {
                    padding: 10px 10px 0px;

                    a {
                        color: #303133;
                        text-decoration: none;
                        font-size: .875rem;
                    }
                }
            }

            .center {
                padding: 10px;
                display: flex;
                align-items: center;
                font-weight: bold;
                font-size: 26px;
            }

            .left-box>.container,
            .right-box>.container {
                border: 1px solid #303133;
                width: 240px;
                padding: 10px;
                overflow: overlay;
            }

            .left-box>.container {
                height: 350px;
                margin-top: 10px;
            }

            .right-box>.container {
                height: 400px;
            }

            .left-box>.container::-webkit-scrollbar,
            .right-box>.container::-webkit-scrollbar {
                width: 8px;
                /*高宽分别对应横竖滚动条的尺寸*/
                height: 8px;
            }

            /*滚动条里面小方块*/
            .left-box>.container::-webkit-scrollbar-thumb,
            .right-box>.container::-webkit-scrollbar-thumb {
                border-radius: 5px;
                height: 5px;
                -webkit-box-shadow: inset 0 0 5px rgb(84, 92, 100);
                background: rgb(84, 92, 100);
            }

            /*滚动条里面轨道*/
            .left-box>.container::-webkit-scrollbar-track,
            .right-box>.container::-webkit-scrollbar-track {
                border-radius: 0;
            }
        }

        .btn {
            text-align: right;
            padding: 0 20px 20px 20px;
        }

        .el-button {
            width: 120px;
        }

        .el-form-item__label {
            text-align: center;
        }

        .font14-nobold-9 {
            padding-left: 20px;
        }

        .el-transfer {
            padding: 20px;
        }
    }
    /deep/.el-dialog__header{
        background:none;
        text-align:center;
    }
    /deep/.el-dialog__title{
        color:#000 !important;
    }
    /deep/.el-dialog{
        width:300px;
    }
    /deep/.el-dialog__body{
        padding: 0px 20px 20px;
    }
</style>
<style>
    #signImg,
    #signImg2 {
        width: 19px;
        margin-left: 4px;
    }

    #signImg2 {
        width: 23px;
        margin-left: 4px;
    }

    #signP,
    #signP2 {
        display: flex;
        align-items: center;
    }

    #signP2 {
        margin-left: 4px;
    }

    #signEditor {
        height: 200px;
    }
    .fordel{
        width:30%;
        display: flex;
        justify-content: space-between;
        margin-bottom:10px;
    }
</style>