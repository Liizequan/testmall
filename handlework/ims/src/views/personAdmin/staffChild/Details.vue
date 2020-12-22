<template>
    <div class="staff-add">
        <!-- 顶部信息 -->
        <header class="between">
            <div class="left user-img" :style="'background-image:url('+(this.$baseURL + logoImg)+')'">
                <!-- <el-image
                style="width: 180px; height: 180px"
                :src="this.$baseURL + logoImg"
                fit="cover"></el-image> -->
            </div>
            <div class="right font14-nobold-6">
                <div class="user-name">
                    <div><h3>{{userName}}</h3><span>{{status}}</span></div>
                    <!-- <el-button @click="goto">编辑</el-button> -->
                </div>
                <ul class="basic-info">
                    <li><i class="el-icon-postcard"></i>部门：{{department}}</li>
                    <li><i class="el-icon-suitcase-1"></i>职位：{{position}}</li>
                    <li><i class="el-icon-s-operation"></i>工号：{{jobnumber}}</li>
                    <li><i class="el-icon-time"></i>入职时间：{{entrytime}}</li>
                </ul>
            </div>
        </header>

        <!-- 基础信息 -->
        <main class="main-one">
            <p class="top-title">基础信息</p>
            <ul class="main-item font14-isbold-3">
                <li class="main-list" v-for="(item,index) in basics" :key="index" v-if="basics.length">
                    <!-- :class="(basics.length==index+1)&&(basics.length/2!=0)?'lastStyle':''" -->
                    <span class="name">{{item.name}}</span>
                    <span class="text" v-if="item.text">{{item.text}}</span>
                    <span class="text" v-else>-</span>
                </li>
            </ul>
        </main>

        <!-- 个人信息 -->
        <main class="main-one main-two">
            <p class="top-title">个人信息</p>
            <ul class="main-item font14-isbold-3">
                <li class="main-list" v-for="(item,index) in personal" :key="index" v-if="basics.length">
                    <span class="name">{{item.name}}</span>
                    <span class="text" v-if="item.text">{{item.text}}</span>
                    <span class="text" v-else>-</span>
                </li>
            </ul>
        </main>

        <!-- 合同信息 -->
        <main class="main-one main-two">
            <p class="top-title">合同信息</p>
            <ul class="main-item font14-isbold-3">
                <li class="main-list" v-for="(item,index) in contract" :key="index" v-if="contract.length">
                    <span class="name">{{item.name}}</span>
                    <!-- <span class="text" v-if="item.text && item.text.length>0">{{item.text}}</span> -->
                    <span class="text" v-if="item.text">{{item.text}}</span>
                    <span class="text" v-else>-</span>
                </li>
            </ul>
            <div class="contract-text  font14-isbold-3">
                <p>合同内容</p>
                <div>
                    {{contractext}}
                </div>
            </div>
        </main>
        
        <!-- 底部附件及按钮 -->
        <footer>
            <div class="eclosure">
                <span class="font14-nobold-3">附件 : </span>
                <ul>
                    <li v-for="(item,index) in files " :key="index" v-if="item&&files.length">
                        <span>{{item.name}}</span>{{item.size}}
                        <!-- <el-link :href="this.$baseURL" :underline="false" style="display:inline-block; padding:0 10px;">下载</el-link> -->
                        <el-link :href="url +'/'+item.path">下载</el-link>
                        <!-- <el-link :underline="false" style="display:inline-block; padding:0 10px;">预览</el-link> -->
                    </li>
                    <!-- <li><span>附件名称</span>(50KB)<el-link :underline="false" style="display:inline-block; padding:0 10px;">下载</el-link><el-link :underline="false" style="display:inline-block; padding:0 10px;">预览</el-link></li>
                    <li><span>附件名称</span>(50KB)<el-link :underline="false" style="display:inline-block; padding:0 10px;">下载</el-link><el-link :underline="false" style="display:inline-block; padding:0 10px;">预览</el-link></li>
                    <li><span>附件名称</span>(50KB)<el-link :underline="false" style="display:inline-block; padding:0 10px;">下载</el-link><el-link :underline="false" style="display:inline-block; padding:0 10px;">预览</el-link></li> -->
                </ul>
            </div>

            <div class="btn">
                <el-button type="primary" @click="goto" v-if="editStaff">编辑</el-button>
                <el-button @click="back()">返回</el-button>
            </div>
        </footer>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName:'',//用户名
            status:'',//在职，离职
            logoImg:'',//头像
            department:'部门',
            position:'职位',
            jobnumber:'工号',
            entrytime:'入职时间',
            files:'',
            url: this.$baseURL,

            basics:[
                //    { name:'名称',text:'kings',},
                //    { name:'性别',text:'man',},
                //    { name:'联系电话',text:'kings',},
                //    { name:'微信/QQ',text:'kings',},
                //    { name:'电子邮箱',text:'kings',},
                //    { name:'工号',text:'kings',},
                //    { name:'部门',text:'kings',},
                //    { name:'职位',text:'kings',},
                //    { name:'职级',text:'kings',},
                //    { name:'证件类型',text:'kings',},
                //    { name:'上级',text:'kings',},
                //    { name:'证件号',text:'kings',},
                //    { name:'其他上级',text:'kings',},
                //    { name:'入职时间',text:'kings',},
                //    { name:'个人工龄',text:'kings',},
                //    { name:'状态',text:'kings',},
                //    { name:'助理',text:'kings',},
                //    { name:'权限开设',text:'kings',},
            ],//基础
            personal:[
                //    { name:'证件姓名',text:'kings',},
                //    { name:'身份证号码',text:'man',},
                //    { name:'出生日期',text:'kings',},
                //    { name:'年龄',text:'kings',},
                //    { name:'民族',text:'kings',},
                //    { name:'籍贯',text:'kings',},
                //    { name:'最高学历',text:'kings',},
                //    { name:'毕业院校',text:'kings',},
                //    { name:'专业',text:'kings',},
                //    { name:'毕业时间',text:'kings',},
                //    { name:'户口类型',text:'kings',},
                //    { name:'户口所在地',text:'kings',},
                //    { name:'现居地',text:'kings',},
                //    { name:'政治面貌',text:'kings',},
                //    { name:'紧急联系人',text:'kings',},
                //    { name:'紧急联系人电话',text:'kings',},
                //    { name:'子女状态',text:'kings',},
                //    { name:'-',text:'-',},
            ],//个人
            contract:[
                //    { name:'合同编号',text:'kings',},
                //    { name:'合同类型',text:'man',},
                //    { name:'聘用形式',text:'kings',},
                //    { name:'职位',text:'kings',},
                //    { name:'开始时间',text:'kings',},
                //    { name:'到期时间',text:'kings',},
                //    { name:'试用期结束日',text:'kings',},
                //    { name:'其他',text:'kings',},
            ],//合同
            contractext:null,


        }
    },      
    methods: {
        goto(){
            this.$router.push({path:'/staff/add',query:{id:this.$route.params.detail_Id}})
        },

    },
    created() {
        this.editStaff = this.$http.allow('编辑员工')
        this.$http.get('user/detail',{
            token:localStorage.getItem("token"),
            id:this.$route.params.detail_Id
        }).then(res=>{
            this.status = res.user.status
            this.userName = res.user.name
            this.department = res.user.structure;//部门
            this.position = res.greement.position;//职位
            this.jobnumber = res.user.job_number;//工号
            this.entrytime = res.greement.begin_time;//入职时间
            this.logoImg = res.user.head
            this.contractext = res.greement.content
            this.files = res.greement.file
            var greement = res.greement,
            info = res.info,
            user = res.user;
            
            var allow = [];
            for(var i of user.allow){
                allow.push(i.name)
            }
            console.log(allow.join(','))
            var basics = [
            //    { name:'姓名',text:res.user.name},
               { name:'性别',text:res.user.gender},
               { name:'联系电话',text:res.user.account},
               { name:'微信/QQ',text:res.user.wechat},
               { name:'电子邮箱',text:res.user.email},
               { name:'工号',text:res.user.job_number},
               { name:'部门',text:res.user.structure?res.user.structure:'全部'},
               { name:'状态',text:res.user.status},
               { name:'职级',text:res.user.rank},
               { name:'婚育状况',text:res.user.role_id},
               { name:'上级',text:JSON.parse(JSON.stringify(res.user.superior_group1)).join(',')},
               { name:'下级',text:JSON.parse(JSON.stringify(res.user.superior_group2)).join(',')},
               { name:'权限',text:allow.join(',')}
            ]
            this.basics = basics;

            var personal = [
                // {name:'证件姓名',text:info.name},
                { name:'身份证号码',text:info.id_card},
                { name:'出生日期',text:info.birthday},
                { name:'年龄',text:info.age},
                { name:'民族',text:info.nation},
                { name:'籍贯',text:info.native_place},
                { name:'最高学历',text:info.education},
                { name:'毕业院校',text:info.school},
                { name:'专业',text:info.major},
                { name:'毕业时间',text:info.graduation},
                { name:'户口类型',text:info.node_type},
                { name:'户口所在地',text:info.registered_residence},
                { name:'现居地',text:info.residence},
                { name:'政治面貌',text:info.political_outlook},
                { name:'紧急联系人',text:info.contacts_name},
                { name:'紧急联系人电话',text:info.contacts_phone},
                { name:'子女状态',text:info.children}
            ]

            this.personal = personal

            var contract = [
               { name:'合同编号',text:greement.number},
               { name:'合同类型',text:greement.type},
               { name:'聘用形式',text:greement.modality},
               { name:'职位',text:greement.position},
               { name:'开始时间',text:greement.begin_time},
               { name:'到期时间',text:greement.end_time},
               { name:'试用期结束日',text:greement.trial_time},
               { name:'其他',text:greement.other},
            ]

            this.contract = contract

        })
    },

}
</script>
<style lang="less" scoped>
    .top-title{
        margin: 40px 0 20px;
        padding-left: 10px;
        text-align: left;
        font-weight: bold;
        border-left: 2px solid #409EFF;
    }
    .mandatory{
        text-align: right;
        span{
            color: #F56C6C;
        }
    }
    header{
        .user-img{
            width:150px;
            height: 180px;
            overflow: hidden;
            border:1px solid #ddd;
            background-size:cover;
            background-position:center center;
            img {
                width:100%;
                height:100%;
            }
        }
        .right{
            flex:1;
            text-align: left;
            padding-left:30px;
            .user-name{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:10px 0;
                border-bottom:1px solid #ddd;
                div{
                    position: relative;
                    span{
                        position: absolute;
                        right: -50px;
                        top:0;
                        display:inline-block;
                        padding:2px 8px;
                        background-color: #409EFF;
                        color: #fff;
                        border-radius: 5px;
                    }
                }
            }
            h3{
                height: 32px;
                line-height: 32px;
                font-size: 24px;
                color: #333;
            }
            .basic-info{
                li{
                    padding-top:10px;
                    i{
                        display: inline-block;
                        padding-right:4px;
                    }
                }
            }
        }

    }
    main{
        .form-one-input{
            display: flex;
            align-items: center;
            width:500px;
            margin-bottom: 20px;
            .mandatory{
                width:130px;
            }
            .input{
                width:280px;
                margin-left: 20px;
            }
        }
        .main-item{
            display:flex;
            flex-wrap:wrap;
            border-left:1px solid rgba(0,0,0,.1);
            border-bottom:1px solid rgba(0,0,0,.1);
            .main-list{
                height:40px;line-height:40px;
                overflow: hidden;
                .name{
                    display:inline-block;
                    width:157px;
                    background-color:rgba(0,0,0,.01);
                    border-top:1px solid #ddd;
                    border-right:1px solid #ddd;
                    box-sizing: content-box;
                }
                .text{
                    display:inline-block;
                    width:410px; 
                    border-right:1px solid #ddd;
                    border-top:1px solid #ddd; 
                    box-sizing: content-box;

                }
            }
        }
        // 合同内容
        .contract-text{
            text-align: left;
            margin:30px  0;
            div{
                border:1px solid rgba(0,0,0,.1);
                margin-top:20px;
                padding:10px;
            }
        }
    }
    footer{
        .eclosure{
            text-align: left;
            li{
                padding-top:10px;
                span{
                    font-size: 16px;
                    color: #409EFF;
                    font-weight: bold;
                }
            }
        }
        .btn{
            padding-top:40px;   
        }
    }
</style>