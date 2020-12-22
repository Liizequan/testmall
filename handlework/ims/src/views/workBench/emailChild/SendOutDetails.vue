<template>
    <div class="contain">
        <div class="content-back">
            <div class="sendout">
                <header>
                    <div class="between">
                        <h3 class="font20-bold-3">邮件主题邮件主题邮件主题邮件主题邮件主题邮件主题邮件主题</h3>
                        <span>删除</span>
                    </div>  
                    <ul class="font14-nobold-9">
                        <li class="user-info">
                            <span>发件人 :</span>
                            <p>
                                <span>{{userList.text}}</span>
                                <span>{{userList.email}}</span>
                            </p>
                        </li>
                        <li class="user-info">
                            <span>时&nbsp;&nbsp;&nbsp;&emsp;&emsp;间 :</span>
                            <p>
                                <span>{{userList.time}}</span>
                            </p>
                        </li>
                        <li class="user-info">
                            <span>收件人 :</span>
                            <p>
                                <span>{{userList.text}}</span>
                                <span>{{userList.semail}}</span>
                            </p>
                        </li>
                        <li class="user-info">
                            <span>附&emsp;&emsp;件 :</span>
                            <p>
                                <span>{{userList.fujian}}个（附件名称）</span>
                            </p>
                        </li>
                    </ul>  
                </header>
                <aside>
                    <div>
                        我是富文本内容
                    </div>
                </aside>
                <footer>
                    <div class="fujian">
                        <p><i class="el-icon-paperclip"></i><span>附件（1个）</span></p>
                        <div class="fujian-len">
                            <img src="../../../assets/logo.png" alt="">
                            <div class="fujian-len-text"> 
                                <p>文件名称文件名称（文件大小）</p>
                                <p><a href="javascript:;">下载</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button type="primary">再次编辑</el-button>
                        <el-button>返回</el-button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userList:{
                name:'浮点动力 ',
                email:'3425929027@qq.com',
                time:'2019年10月30号（星期三） 09：25',
                sendout:'陈先生',
                semail:'2567929027@qq.com',
                fujian:'1',
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .sendout{
        padding:20px;
        header{
            padding-bottom: 20px;
            border-bottom: 1px solid #D7D7D7;
            ul{
                padding-top:10px;
                li>span{
                    display: inline-block;
                    width:60px;
                    text-align: left;
                }
            }
            .user-info{
                display: flex;
                padding-top:10px;
            }
        }
        aside{
            padding:20px;
        }
        footer{
            .fujian{
                background-color: #fff;
                text-align: left;
                padding:0 10px;
                p{
                    padding:10px 0;
                    border-bottom: 1px solid #F2F2F2;
                }
                .fujian-len{
                    display: flex;
                    padding:20px 10px;
                    .fujian-len-text{
                        padding:9px;
                    }
                    img{
                        width:60px;
                        height: 60px;
                    }
                    p{
                        border:0;
                        padding:0;
                    }
                }
            }
            .btn{
                padding:40px 0 20px;
            }
        }
    }
</style>