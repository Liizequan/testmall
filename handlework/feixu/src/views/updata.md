
<el-upload
    class="upload-demo"
    :action="this.$http.fileUrl"
    :beforeUpload="beforeAvatarUploadPdf"  
    :on-success="handleAvatarSuccess"
    :before-remove="removeUpload"
    :file-list="form.fileList">
    <!-- <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    <div class="items-center">
        <span>附件：</span>
        <p style="margin-left:40px;text-align:left">
            <el-button>上传回单</el-button>
            <el-button>支付凭证</el-button>
            <el-button>其他</el-button>
        </p>
    </div>  
    <p style="margin-left: 85px;padding-top: 15px" slot="tip" >
        * 附件格式仅支持：word、pdf、excel、jpg、png格式文件
    </p>
</el-upload>


    
    @selection-change="handleSelectionChange"

    :dataLength="secled"
    
    secled:[],//选中的
    daochuId:'',//选中的id
    
    handleSelectionChange(val){
        console.log('选中')
        console.log(val )
        this.secled = val;
    },

    watch: {
        'secled': function(newVal,oldVal){
            var selectId = [];
            for(var i of newVal){
                selectId.push(i.id)
            }
            this.daochuId = selectId.join(',')
        },
    },


