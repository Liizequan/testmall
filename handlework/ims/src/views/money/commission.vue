<template>
  <div class="commission contain">
    <div class="topBtns">
      <div class="leftBtns">
        <h4>我的业绩提成</h4>
      </div>
      <div class="right">
        <el-button class="btn" type="primary" @click="toMembers"
          >我是财务</el-button
        >
      </div>
    </div>
    <div class="selects">
      <div>
        月份：<el-select v-model="selectVal">
          <el-option label="one" value="one"></el-option>
          <el-option label="two" value="two"></el-option>
        </el-select>
      </div>
      <div>
        <i class="el-icon-upload2">导入</i>
        <i class="el-icon-download ml">导出</i>
      </div>
    </div>
    <div class="topSelect">
      <div>
        姓名：
        <h4>林先生</h4>
      </div>
      <div>
        日期：
        <h4>2019年12月12日</h4>
      </div>
    </div>
    <div class="table">
      <el-row>
        <el-col>姓名</el-col>
        <el-col>基本工资</el-col>
        <el-col>绩效工资</el-col>
        <el-col>津贴</el-col>
        <el-col>奖金</el-col>
        <el-col>出勤天数</el-col>
        <el-col>其他应发</el-col>
        <el-col>所得税</el-col>
        <el-col>社保</el-col>
        <el-col>其他扣款</el-col>
        <el-col>本月实发</el-col>
      </el-row>
      <el-row>
        <el-col>1</el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
        <el-col></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogShow: false,
      selectVal: ""
    };
  },
  methods: {
    toMembers() {
      this.$router.push("/wageSheet/members");
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.btn {
  border: none;
}

.dialog {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  div {
    width: 24%;
    height: 50px;
  }
}

.search {
  width: 200px;
}

.topSelect {
  display: flex;
  justify-content: space-between;
}

.table {
  border: 1px solid #ccc;
  text-align: center;
  margin: 10px 0;
}

.el-row {
  display: flex;
  line-height: 40px;

  .el-col {
    flex: 1;
    border-right: 1px solid #ccc;
  }

  .el-col:nth-last-of-type(1) {
    border: none;
  }
}

.el-row:nth-of-type(1) {
  border-bottom: 1px solid #ccc;
}

h4 {
  display: inline;
}
</style>
