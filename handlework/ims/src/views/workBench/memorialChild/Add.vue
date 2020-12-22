<template>
  <div class="">
    <div class="notice-add">
      <div class="top">
          <h3 v-if="!edit">新建备忘</h3>
          <h3 v-else>编辑备忘</h3>
          <p>基础信息</p>
      </div>
      <div class="content">
          <el-form ref="form" :model="form" label-width="80px" label-position="left">
              <el-form-item label="主题">
                  <el-input v-model="form.name" placeholder="请填主题" :value="form.name" :maxlength="30"></el-input>
                  <span class="font14-nobold-9">30字内</span>
              </el-form-item>
              <el-form-item label="主题内容">
                  <el-input type="textarea" placeholder="请填主题内容"  v-model="form.desc" :value="form.desc" :maxlength="1000"></el-input>
                  <span class="font14-nobold-9">1000字内</span>
              </el-form-item>
          </el-form>
      </div>
      <div class="bottom">
          <el-button type="primary" @click="Preservation">
            <!-- <span v-if="!edit">保存</span>
            <span v-else>编辑</span> -->
            <span>完成</span>
          </el-button>
          <el-button @click="back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id:'',
      form: {
        name: "",
        desc: ""
      },
      edit:false,//false为添加，true为修改
    }
  },
  created() {
    console.log(this.$route.query.id)
    var id = this.$route.query.id
    this.id = id
    var _this = this;
    if(id){//有参数就是编辑
      this.edit = true
      this.$http.get('index/memorial',{
        // token:this.$token,
        id:id
      }).then(res=>{
        console.log(res)
        _this.form.name = res.msg.title,
        _this.form.desc = res.msg.content
      })
    }else{
      return
    }
    // this.$http.get('index/memorial')
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 保存
    Preservation(e) {
      var _this = this;
      console.log(e);
      if(_this.form.name=='' || _this.form.desc == ''){
        return this.$message({
          message: '内容不能为空',
          type: 'warning'
        });
      }

      // 添加edit = false
      let api
      let reqBody = {
        // token:this.$token,
        title:_this.form.name,
        content:_this.form.desc,
        id:this.id
      }
      if(!this.edit){
        api = 'index/addmemorial'
      }else{
        api='index/editmemorial'
      }
      this.$http.post(api,reqBody).then(res=>{
        if(res.code == 1){
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.$router.back()
          this.$bus.$emit('memoryInit')
        }else{
          this.$message(res.msg)
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .notice-add{
      text-align: left;
      height: calc(100% - 40px);
      position: relative;
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
          margin:auto;
          padding:10px 0;
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
  }
</style>