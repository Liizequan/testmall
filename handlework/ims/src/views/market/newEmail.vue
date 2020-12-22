<template>
  <div class="newEmail">
    <h4>新建邮件</h4>
    <el-form label-width="120px">
      <el-form-item label="收件人:">
        <el-input v-model="manDetl.name" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="抄送:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密送:">
        <el-input></el-input>
      </el-form-item> -->
      <el-form-item label="主题:">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-link">添加附件 <input type="file" ref="file" name="file" id="file" @change="upload"></i>
        <div>
          <span v-for="(item,index) in files" :key="index" style="margin-right:10px;"><i class='el-icon-folder'>{{item.name}}</i></span></div>
      </el-form-item>
      <el-form-item label="内容:">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <div>发件人：{{sendMan.name}}（{{sendMan.email}}）</div>
      </el-form-item>
    </el-form>
    <div class="tac">
      <el-button type="primary" @click="send">发送</el-button>
      <el-button type="primary" @click="save">保存为草稿</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  export default {
    data() {
      return {
        editor: '',
        id: '',
        manDetl: '',
        title: "",
        files: [],
        fileIds:[],
        sendMan:''
      };
    },
    methods: {
      save(){
        this.$http.post('email/add', {
          token: localStorage.getItem('token'),
          receiver: this.manDetl.id,
          title: this.title,
          file: this.$http.getIdsStr(this.fileIds),
          status: 0,
          content: this.editor.txt.html()
        }).then(res => {
          this.$message(res.msg)
        })
      },
      upload() {
        this.$http.upload(this.$refs.file.files[0]).then(res => {
          if (res.data.code == 1) {
            this.files.push({ name: this.$refs.file.files[0].name, id: res.data.msg.id, path: res.data.msg.path })
            this.fileIds.push(res.data.msg.id)
          } else {
            this.$message('上传失败')
          }
        })
      },
      send() {
        this.$http.post('email/add', {
          token: localStorage.getItem('token'),
          receiver: this.manDetl.id,
          title: this.title,
          file: this.$http.getIdsStr(this.fileIds),
          status: 1,
          content: this.editor.txt.html()
        }).then(res => {
          this.$message(res.msg)
        })
      },
      getManDetl() {
        this.$http.get('marketing/look', {
          id: this.id
        }).then(res => {
          this.manDetl = res
        })
      }
    },
    mounted() {
      let _this = this
      this.editor = new E('#editor')
      this.editor.customConfig.customUploadImg = function (files, insert) {
        for (let i in files) {
          _this.$http.Imgupload(files[i]).then(res => {
            insert(_this.$baseURL + res.data.msg.path)
          })
        }
      }
      this.editor.create()
    },
    created() {
      this.id = this.$route.query.id
      this.getManDetl()
      this.sendMan = JSON.parse(localStorage.getItem('login_status')).info
    }
  };
</script>
<style lang="less" scoped>
  .newEmail {
    text-align: left;
  }

  h4 {
    margin-bottom: 20px;
  }

  #editor {
    height: 400px;
  }
</style>