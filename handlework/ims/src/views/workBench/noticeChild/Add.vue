<template>
  <div class="contain">
    <div class="notice-add">
      <div class="top">
          <h3>新建公告</h3>
          <p>基础信息</p>
      </div>
      <div class="content">
          <el-form ref="form" :model="form" label-width="85px" label-position="left">
              <el-form-item label="标题" class="redStar">
                  <el-input placeholder="请填标题(15字以内)" v-model="form.name" :maxlength="15"></el-input>
                  <!-- <span class="font14-nobold-9">30字内</span> -->
              </el-form-item>
              <el-form-item label="内容" class="redStar">
                  <el-input  placeholder="请填内容(1000字内)" type="textarea" v-model="form.desc" :maxlength="1000"></el-input>
                  <!-- <span class="font14-nobold-9">1000字内</span> -->
              </el-form-item>
              <el-form-item label="通知部门:" class="redStar">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="rankChange" style="margin-right:30px;">全公司</el-checkbox>
                  <el-checkbox-group v-model="form.type" style="display:inline-block;" @change="danrankChange" >
                    <el-checkbox v-for="(item,index) in department" :key="index" :label="item.id">
                      {{item.label}}
                    </el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
          </el-form>
      </div>
      <div class="bottom">
          <!-- <el-button type="primary" @click="Preservation">保存</el-button> -->
          <el-button type="primary" @click="Toexamine">提交</el-button>
          <el-button @click="back()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        type: [],
        desc: ""
      },
      department:[],//选择了的部门
      allDepartment:[],//所有部门
      checkAll: false,
      isIndeterminate: false,

    }
  },
  created() {
    // index/structure
    this.$http.get('index/structure',{token: localStorage.getItem("token")}).then(res=>{
      console.log(res)
      var department = res
      this.department = department
      for(var i of department){
        console.log(i.id)
        this.allDepartment.push(i.id)
      }
    })
  },
  methods: {
    onSubmit() {
    },
    rankChange(val){
      this.form.type = val ? this.allDepartment : []
      this.isIndeterminate = false
    },
    danrankChange(val){
      this.isIndeterminate = (JSON.stringify(val) != JSON.stringify(this.allDepartment))
      this.checkAll = (JSON.stringify(val) == JSON.stringify(this.allDepartment))
      if(val.length==0){
        this.isIndeterminate = false
      }else if(val.length == this.allDepartment.length){
        this.checkAll = true
        this.isIndeterminate = false
      }
    },
    // 保存
    Preservation(e) {
      // console.log(e);
      // console.log(JSON.parse(JSON.stringify(this.form.type)))
      // this.$http.post('index/addnoctice',{
      //   token:this.$token,
      //   title:this.form.name,
      //   content:this.form.desc,
      //   type:this.form.type
      // }).then(res=>{
      //   console.log(res)
      // })
    },
    // 提交审核
    Toexamine(e) {
      console.log(this.form.type)
      if(!this.form.name || !this.form.desc){
        return this.$message('标题/内容不能为空')
      }
      if(this.form.type.length == 0){
        return this.$message('通知部门不能为空')
      }
      this.$http.post('index/addnoctice',{
        token:localStorage.getItem('token'),
        title:this.form.name,
        content:this.form.desc,
        structure:this.$http.getIdsStr(this.form.type)
      }).then(res=>{
         if(res){
           this.$message(res.msg)
           if(res.code == 1){
             this.$router.back()
           }
         }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .notice-add{
      text-align: left;
      height: calc(100% - 40px);
      position: relative;
      h3{
          padding-bottom: 20px;
      }
      p{
          padding-left:10px;
          border-left:2px solid #409EFF;
          margin-bottom: 20px;
      }
      .bottom{
          text-align: center;
          margin:auto;
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