<template>
  <div class="home">
    <!-- <h1>This is an home page</h1> -->
    <!-- 左导航 -->
    <el-container style="border: 1px solid #eee" v-if="isHome">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <el-table :data="tableData" stripe
          :header-cell-style="$store.state.headStyle">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      isHome: false
    };
  },
  // 开始
  created() {
    if (this.$route.path === "/home") {
      console.log("yes");
      this.isHome = true;
    } else {
      this.isHome = false;
    }
    // console.log(this.$route.path)
  },
  // 监听路由
  watch: {
    $route(to, from) {
      // console.log(to.path)
      if (to.path === "/home") {
        // console.log('yes')
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    }
  }
};
</script>

<style>
.home {
  width: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
