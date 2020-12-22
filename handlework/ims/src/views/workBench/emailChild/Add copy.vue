<template>
  <div class="contain">
    <div class="notice-add">
        <div class="top">
            <h3>我是新建邮箱</h3>
        </div>
        <div class="content">
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <el-form-item label="收件人 : ">
                    <div style='position:relative;overflow: hidden;' @click="isShowTrue">
                        <el-input v-model="form.name1" placeholder="+ 添加收件人"></el-input>
                        <div class="text">
                            <span v-for="(item,index) in rightLatelys" :key="index">
                                {{item.name}} ；
                            </span> 
                        </div>   
                    </div>
                </el-form-item>
                <el-form-item label="抄送 : ">
                    <div style='position:relative;overflow: hidden;' @click="isShowTrue">
                        <el-input v-model="form.name2" placeholder="+ 添加收件人"></el-input>
                        <div class="text">
                            <span v-for="(item,index) in list2" :key="index">
                                {{item.name}} ；
                            </span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="密送 : ">
                    <div style='position:relative;overflow: hidden;' @click="isShowTrue">
                        <el-input v-model="form.name3" placeholder="+ 添加收件人"></el-input>
                        <div class="text">
                            <span v-for="(item,index) in list2" :key="index">
                                {{item.name}} ；
                            </span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="主题 : ">
                    <div><el-input v-model="form.name4"></el-input></div>
                </el-form-item>
                <el-form-item label="">
                    <div style="color:#409EFF;"><i class="el-icon-paperclip"></i> 添加附件 :</div>
                </el-form-item>
                <el-form-item label="内容 : ">
                     <div style='position:relative;overflow: hidden;'>
                        <div class="edict">
                            富文本
                        </div>
                        <div>发送人：<span>李先生</span></div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom">
            <el-button type="primary" @click="Preservation">发送</el-button>
            <el-button type="primary" @click="Toexamine">保存为草稿</el-button>
            <el-button>返回</el-button>
        </div>

        <!-- 弹框 -->

        <!-- <ElasticFrame name='你好，我是自定义自检' v-if="isShow" @close='close'>
            <div class="elastic-slot">
                <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="请输入城市拼音"
                    v-model="value"
                    titles="联系人,收件人"
                    :data="data">
                </el-transfer>
                <div class="btn">
                    <el-button type="primary">确定</el-button>
                    <el-button >取消</el-button>
                </div>
            </div>
        </ElasticFrame> -->
        <ElasticFrame name='你好，我是自定义自检' v-if="isShow" @close='close'>
            <div class="elastic-slot">
                <div class="left">
                    <div class="search">
                        联系人：
                    </div>
                    <div class="left-box">
                        <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="filterText">
                        </el-input>
                        <div class="container font14-nobold-6">
                            <!-- 最近联系人 -->
                            <div class="lately">
                                <div class="lately-txt between">
                                    <span>最近联系人</span>
                                    <span @click="deleteStroge">清空</span>
                                </div>
                                <ul>
                                    <li v-for="(item,index) in latelys" :key="index" @click="contacts(item)" class="lately-list"  :class="[latelyIndex == index ? 'active' : '']">
                                        <a href="javascript:;">{{item.name}}</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 所有人 -->
                            <div class="lately">
                                <el-collapse v-model="activeNames" @change="handleChange">
                                    <div v-for="(item,index) in allLately" :key="index">
                                        <el-collapse-item :title="item.text" :name="index">
                                            <div v-for="(items,index) in item.latelys" style="padding:0 10px;" class="lately-lists" :key="index" @click="contacts(items)">
                                                <a  class="font14-nobold-6" href="javascript:;">{{items.name}}</a>
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
                                    <a href="javascript:;" :class="[latelyIndex == index ? 'active' : '']">{{item.name}}</a>
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
  </div>
</template>
<script>
import ElasticFrame from "../../../components/ElasticFrame.vue";
export default {
    data() {
        
        return {
            
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
            isShow:false,//用来显不显示父路由内容

            filterText:'',//搜索内容
            latelys:[
                {
                    id:1,name:'陈平安经理1',
                },
                {
                    id:2,name:'陈平安经理2',
                },
                {
                    id:3,name:'陈平安经理3',
                },
                {
                    id:4,name:'陈平安经理4',
                },
                {
                    id:5,name:'陈平安经理5',
                },
                {
                    id:6,name:'陈平安经理6',
                }
            ],//最近联系人，添加为本地
            allLately:[
                {
                    text:'理财客户',
                    latelys:[
                        {
                            id:1,
                            name:'陈总'
                        },
                        {
                            id:2,
                            name:'陈总'
                        },
                        {
                            id:3,
                            name:'陈总'
                        },
                        {
                            id:4,
                            name:'陈总'
                        },
                        {
                            id:5,
                            name:'陈总'
                        }
                    ]
                },
                {
                    text:'理财客户',
                    latelys:[
                        {
                            id:1,
                            name:'陈总'
                        },
                        {
                            id:2,
                            name:'陈总'
                        },
                        {
                            id:3,
                            name:'陈总'
                        },
                        {
                            id:4,
                            name:'陈总'
                        },
                        {
                            id:5,
                            name:'陈总'
                        }
                    ]
                },
                {
                    text:'理财客户',
                    latelys:[
                        {
                            id:1,
                            name:'陈总'
                        },
                        {
                            id:2,
                            name:'陈总'
                        },
                        {
                            id:3,
                            name:'陈总'
                        },
                        {
                            id:4,
                            name:'陈总'
                        },
                        {
                            id:5,
                            name:'陈总'
                        }
                    ]
                }
            ],//所有联系人，为数据库访问数据
            latelyIndex:null,//是否添加为联系人
            rightLatelys:[],//右边添加后的联系人


            activeNames:'',
            list1:[],
            list2:[],
            list3:[],
        }
    },
    components: {
        ElasticFrame
    },
    computed: {

    },  
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        // 显示弹框
        isShowTrue(){
            this.isShow = true
        },
        // 保存
        Preservation(e){
            console.log(e)
        },
        // 提交审核
        Toexamine(e){
            console.log(e)
        },
        // 关闭弹框
        close(isShow){
            // console.log('关闭')
            this.isShow = isShow
        },

        // 弹框
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 添加为收件人
        contacts(index){
            console.log(JSON.parse(JSON.stringify(index)))
            // console.log('联系人')latelys
            // var lately = JSON.parse(JSON.stringify(this.latelys[index]));
            var lately = JSON.parse(JSON.stringify(index))
            // console.log(lately)
            var rightLatelys = this.rightLatelys;
            rightLatelys = JSON.parse(JSON.stringify(rightLatelys))
            // console.log(rightLatelys)
            for(let i of rightLatelys){
                if(JSON.stringify(i) === JSON.stringify(lately)){
                    return this.$message('您已添加该联系人');
                }
            }
            rightLatelys.push(lately)
            this.rightLatelys = JSON.parse(JSON.stringify(rightLatelys))
            this.latelyIndex = index
            // console.log(this.rightLatelys)
        },
        // 删除收件人
        deteleContacts(index){
            this.rightLatelys.splice(index,1)
            console.log(this.rightLatelys)
        },
        handleChange(){
            console.log('展开')
        },
        // 清空最近联系人
        deleteStroge(){
            this.latelys=[]
        },
        // 添加收件人
        submitLately(){
            console.log('添加成功')
            this.isShow = false
        },
        // 取消联系人
        cancelLately(){
            console.log('取消成功')
            this.isShow = false
        }
    },
    filterText(val) {
        this.$refs.tree.filter(val);
    }
}
</script>
<style lang="less" scoped>
    .notice-add{
        text-align: left;
        height: calc(100% - 40px);
        position: relative;
        .content{
            .text{
                position: absolute;
                top:0;
                left:10px;
                span{
                    display: inline-block;
                    padding:0 10px;
                }
            }
            .edict{
                border:1px solid #303133;
                height:400px;
                padding:10px;
            }
        }
        h3{
            padding-bottom:20px;
        }
        p{
            padding-left:10px;
            border-left:2px solid #409EFF;
            margin-bottom: 20px;
        }
        .bottom{
            text-align: center;
            margin: auto;
        }
        .elastic-slot{
            display: flex;
            justify-content: space-between;
            padding:20px;
            .left-box,
            .right-box{
                margin-top:20px;
                .lately-txt{
                    padding-bottom:10px;
                }
                .lately-list a{
                    display: inline-block;
                    color: #303133;
                    text-decoration: none;
                    padding:5px 10px;
                }
                .lately-list:hover,
                .lately-lists:hover{
                    background:#409EFF;
                }
                .right-box-ul .between{
                    padding:10px 10px 0px;
                    a{
                        color: #303133;
                        text-decoration: none;
                        font-size: .875rem;
                    }
                }
            }
            .center{
                padding:10px;
                display: flex;
                align-items: center;
                font-weight: bold;
                font-size: 26px;
            }
            .left-box>.container,
            .right-box>.container{
                border:1px solid #303133;
                width:240px;
                padding:10px;
                overflow: overlay;
            }
            .left-box>.container{
                height: 350px;
                margin-top: 10px;
            }
            .right-box>.container{
                height:400px;
            }
            .left-box>.container::-webkit-scrollbar ,
            .right-box>.container::-webkit-scrollbar{
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
        .btn{
            text-align: right;
            padding:0 20px 20px 20px;
        }
        .el-button{
            width:120px;
        }
        .el-form-item__label{
            text-align: center;
        }
        .font14-nobold-9{
            padding-left:20px;
        }
        .el-transfer{
            padding:20px;
        }
    }
</style>
