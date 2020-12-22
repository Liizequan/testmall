<template>
  <div class="customMana contain">
    <div v-if="this.$route.path == '/customMana'">
      <div class="weight font18-bold-3">
        <div>
          <h4>全部客户</h4>
          <div class="num">32323</div>
        </div>
        <div>
          <h4>我的客户</h4>
          <div class="num">32323</div>
        </div>
        <div>
          <h4>公海客户</h4>
          <div class="num">32323</div>
        </div>
      </div>
      <div class="searchCon">
        <h4 class=" font18-bold-3">查询已属客户</h4>
        <div class="search">
          <el-input placeholder="请输入查询的客户信息，如客户名称，联系电话" prefix-icon="el-icon-search" class="searchInp"
            v-model="searchInp">
          </el-input>
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <div class="tableCon">
        <div class="between">
          <el-button type="primary" @click="createNew">
            <i class="el-icon-plus"></i>新增客户
          </el-button>
          <div class="my-client flex-items-center">
            <!-- <el-button type="text" class="btn font16-bold-3">我的客户</el-button>
            <el-button type="text" class="btn font16-bold-3">我已成交的客户</el-button>
            <el-button type="text" class="btn font16-bold-3">共享客户</el-button>
            <el-button type="text" class="btn font16-bold-3">公海客户</el-button> -->
            <el-link :underline="false" :type="tabbarIndex == index ? 'primary' : ''" class="btn font16-bold-3" v-for="(item,index) in tabbar" :key="index" @click="tabbarTap(index)">{{item}}</el-link>
          </div>
          <!-- <el-button class="bin" type="warning">回收站</el-button> -->
          <el-button type="warning" >回收站</el-button>
        </div>
        <div class="onBtns font14-nobold-9">
          <el-link :underline="false"><i class="el-icon-plus">添加成员</i></el-link>
          <el-link :underline="false"><i class="el-icon-plus">移除成员</i></el-link>
          <el-link :underline="false"><i class="el-icon-plus">分配</i></el-link>
          <el-link :underline="false"><i class="el-icon-plus">移入公海</i></el-link>
          <el-link :underline="false"><i class="el-icon-plus">删除</i></el-link>
          <div class="rightBtns">
            <i class="el-icon-upload2">导入</i>
            <i class="el-icon-download">导出</i>
          </div>
        </div>
        <el-table :data="tableData" v-if="!pass" stripe
        :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="num" label="客户编号"></el-table-column>
          <el-table-column prop="name" label="客户名称"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="line" label="行业" :filters="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 }
            ]"></el-table-column>
          <el-table-column prop="source" label="客户来源" :filters="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 }
            ]"></el-table-column>
          <el-table-column prop="status" label="客户状态" :filters="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 }
            ]"></el-table-column>
          <el-table-column prop="manager" label="客户经理"></el-table-column>
          <el-table-column prop="date" sortable label="创建日期"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-link type="primary" @click="toDetail">详情<i class="el-icon-arrow-right"></i></el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="tableData" v-else stripe
        :header-cell-style="$store.state.headStyle">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="num" label="客户编号"></el-table-column>
          <el-table-column prop="name" label="客户名称"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="line" label="成交时间" sortable></el-table-column>
          <el-table-column prop="source" label="合同金额" sortable></el-table-column>
          <el-table-column prop="status" label="款项状态" :filters="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 }
            ]"></el-table-column>
          <el-table-column prop="manager" label="关联订单"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-link type="primary">详情 <i class="el-icon-arrow-right"></i></el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev,pager,next" :total="tableData.length" background class="busiPage"></el-pagination>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pass:false,
      searchInp: "",
      // 导航
      tabbar:["我的客户","我已成交的客户","共享客户","公海客户"],
      tabbarIndex:0,
      tableData: [
        {
          num: "234",
          name: "林晓生",
          phone: "1241234213",
          line: "互联网",
          source: "网络",
          status: "VIP",
          manager: "林",
          date: "2019-02-03"
        }
      ]
    }
  },
  methods: {
    // 头部切换数据
    tabbarTap(index){
      this.tabbarIndex = index;
      console.log('访问数据')
    },
    createNew() {
      this.$router.push("/customMana/newCustom");
    },
    toDetail() {
      this.$router.push("/customMana/cusDetl");
    },
    getList(){//indexcustomer
      this.$http.get('marketing/index',{token:localStorage.getItem('token')}).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.customMana {
  text-align: left;
}
.newCustom .line_title{
    margin: 0px 0 20px;
}
.num {
  font-size: 54px;
  font-weight: bold;
}

.weight {
  display: flex;
  justify-content: space-between;

  &>div {
    width: 32%;
    // background: #eee;
    // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    // border:1px solid rgba(0, 0, 0, 0.08);
    height: 200px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
  }

  .num {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
}

.searchCon {
  // background: #eee;
  // border:1px solid rgba(0, 0, 0, 0.08);
  // box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
  // margin-top: 20px;
  padding: 20px 0;
}

.search {
  display: flex;
  align-items: center;
}

.searchCon {
  // background: #eee;
  // border:1px solid rgba(0, 0, 0, 0.08);
  // box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
  // margin-top: 20px;
  padding: 30px 0 10px;
}
.searchInp {
  flex: 1;
  margin: 20px;
  margin-left: 0;
}

.btn {
  border: none;
}
.tableCon {
  /* padding: 20px; */
  // margin-top: 20px;
  /* background: #eee; */
  .my-client{
    flex:1;
    justify-content: flex-start;
    padding-left:20px;
    .btn{
      // padding:0 20px; 
      padding-left:20px;
    }
  }
}

  .onBtns {
    display: flex;
    position: relative;
    margin: 20px 0;

    i {
      margin-right: 30px;
    }
  }

  .rightBtns {
    position: absolute;
    right: 0;
  }

  .btn {
    background: none !important;
  }

  .curIndex {
    color: #66b1ff;
  }

  .trash {
//     float: right;
  }
</style>