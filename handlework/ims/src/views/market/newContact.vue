<template>
  <div class="newContact contain">
    <div class="topBtns">
      <h4>新建客户</h4>
      <span class="bitianstyle">*为必填项</span>
    </div>
    <el-form label-width="120px" class="form_width" :rules="rules">
      <el-form-item label="姓名:" prop="name" class="efi">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="个人邮箱:" prop="email" class="efi">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone" class="efi">
        <el-input v-model="phone"></el-input>
      </el-form-item>
      <el-form-item label="公司:" prop="company" class="efi">
        <el-input v-model="company"></el-input>
      </el-form-item>
      <el-form-item label="分组:" prop="group" class="efi">
        <el-select style="width:100%;" v-model="group">
          <el-option labe="one" value="one"></el-option>
          <el-option labe="two" value="two"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述:" prop="desc" class="efi">
        <el-input type="textarea" v-model="desc"></el-input>
      </el-form-item>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: "返回",
        email: "3432423",
        phone: "12341324",
        company: "暗色调",
        group: "工作",
        desc: "是打发打发",
        rules: {
          // name: [{ required: true, message: '请填写手机号码' }],
          // email: [{ required: true, message: '请填写个人邮箱' }],
          // phone: [{ required: true, message: '请填写手机号码' }],
          // company: [{ required: true, message: '请填写公司' }],
          // group: [{ required: true, message: '请选择分组' }],
          // desc: [{ required: true, message: '请填写描述' }]
          name: [{ required: true, message: ' ' }],
          email: [{ required: true, message: ' ' }],
          phone: [{ required: true, message: ' ' }],
          company: [{ required: true, message: ' ' }],
          group: [{ required: true, message: ' ' }],
          desc: [{ required: true, message: ' ' }]
        }
      };
    },
    methods: {},
    created() { }
  };
</script>
<style lang="less" scoped>
  .newContact {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .el-form-item::after {
    height: 16px;
  }
</style>