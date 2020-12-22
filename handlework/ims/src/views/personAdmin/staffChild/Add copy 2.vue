<template>
   <div class="staff-add">
        <!-- 顶部信息 -->
        <header class="between">
            <div class="left user-img">
                <!-- <img :src="this.$baseURL + logoImg.path" alt=""> -->
                <el-image
                style="width: 180px; height: 180px"
                :src="this.$baseURL + logoImg.path"
                fit="cover"></el-image>
                <div>
                    <span> 上传图片 </span>
                    <p><input type="file" ref="files" id="files" @change="ImgChan" name="files"></p>    
                </div>
            </div>
            <div class="right font14-nobold-6">
                <span  class="bitianstyle"><span>*</span>为必填项</span>
                <h3>用户名：{{base.name}}</h3>
                <ul class="basic-info">
                    <li><i class="el-icon-circle-plus-outline"></i>部门：{{department.label}}</li>
                    <li><i class="el-icon-circle-plus-outline"></i>职位：{{position.label}}</li>
                    <li><i class="el-icon-circle-plus-outline"></i>工号：{{base.num}}</li>
                    <li><i class="el-icon-circle-plus-outline"></i>入职时间：{{contract.sta_time}}</li>
                </ul>
            </div>
        </header>
   </div>
</template>


<script>
export default {
    data() {
        return {
            logoImg:'',//用户头像
            base:{},
        }
    },
    methods: {
        ImgChan() {
            console.log('上传')
            console.log(this.$refs.files.files[0])
            this.$http.Imgupload(this.$refs.files.files[0]).then(res => {
                console.log(res)
                this.logoImg = res.data.msg;
            })
        },
    },
}
</script>



<style lang="less" scoped>
    .top-title {
        margin: 40px 0 20px;
        padding-left: 10px;
        text-align: left;
        font-weight: bold;
        border-left: 2px solid #409EFF;
    }

    .mandatory {
        text-align: right;

        span {
            color: #F56C6C;
        }
    }

    header {
        .user-img{
            position: relative;
            width: 150px;
            height: 180px;
            overflow: hidden;
            border: 1px solid #ddd;
            img {
                width:100%;
                height:100%;
            }
            div,p{
                position: absolute;
                bottom: 0px;
                left: 50%;
                background: orange;
                transform: translateX(-50%);
                width: 100%;
                height: 34px;
                line-height: 34px;
                color: #fff;
                font-size: 16px;
                input,p{
                    width:100%;
                    opacity: 0;
                }
            }
        }

        .right {
            flex: 1;
            text-align: left;
            padding-left: 30px;

            h3 {
                border-bottom: 1px solid #ddd;
                height: 32px;
                line-height: 32px;
            }

            .basic-info {
                li {
                    padding-top: 10px;

                    i {
                        display: inline-block;
                        padding-right: 4px;
                    }
                }
            }
        }

    }

    main {
        .form-one-input {
            display: flex;
            align-items: center;
            width: 500px;
            margin-bottom: 20px;

            .mandatory {
                width: 130px;
            }

            .input {
                width: 280px;
                margin-left: 20px;
            }
        }
    }

    footer {
        .eclosure {
            display: flex;
            align-items: center;

            p {
                width: 130px;
                text-align: right;
                margin-right: 20px;
            }
        }

        .btn {
            padding-top: 40px;
        }
    }


    .upBtn {
        position: relative;
    }
</style>