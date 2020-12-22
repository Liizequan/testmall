<template>
  <div class="index">
    <div class="index-container">
      <!-- 1 公告 notice -->
      <el-card
        class="index-list t notice"
        body-style="dispaly:flex; flex-direction: column; justify-content: space-between;
                height: calc(100% - 109px);"
        >
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">公告栏</span>
          <el-button style="padding:8px 15px" @click="goNoties">更多</el-button>
        </div>
        <div v-for="(item, index) in notice" :key="index" class="text item">
          <p class="between">
            <span class="font16-nobold-3">{{ item.name }}</span>
            <span class="left font14-nobold-9">{{ item.time }}</span>
          </p>
          <p class="left font14-nobold-9">
            <span>{{ item.text }}</span>
          </p>
        </div>
      </el-card>
      <!-- 2 备忘录 memorial -->
      <el-card
        class="index-list t memorial"
        body-style="dispaly:flex; flex-direction: column; justify-content: space-between;
                height: calc(100% - 109px);"
        >
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">备忘录</span>
          <el-button style="padding:8px 15px" @click="goNoties">更多</el-button>
        </div>
        <div v-for="(item, index) in notice" :key="index" class="text item">
          <p class="between">
            <span class="font16-nobold-3">{{ item.name }}</span>
            <span class="left font14-nobold-9">{{ item.time }}</span>
          </p>
          <p class="left font14-nobold-9">
            <span>{{ item.text }}</span>
          </p>
        </div>
      </el-card>
      <!-- 3 邮箱 email -->
      <el-card class="index-list t email" body-style="padding-top:0">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">邮箱</span>
          <el-button style="padding:8px 15px">更多</el-button>
        </div>
        <ul>
          <li
            class="index-list-table"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <h4 class="left font14-isbold-6">{{ item.name }}</h4>
            <span class="right font14-nobold-9">{{ item.data }}</span>
          </li>
        </ul>
      </el-card>
      <!-- 4 工单 workorder -->
      <el-card class="index-list t workorder" body-style="padding-top:0">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">新增工单</span>
          <el-button style="padding:8px 15px">更多</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" stripe
        :header-cell-style="$store.state.headStyle">
          <el-table-column label="商品 ID" prop="id"> </el-table-column>
          <el-table-column label="商品名称" prop="name"> </el-table-column>
          <el-table-column label="店铺地址" prop="address"> </el-table-column>
          <el-table-column label="商品描述" prop="desc"> </el-table-column>
        </el-table>
      </el-card>
      <!-- 5 审批 approval -->
      <el-card class="index-list t approval" body-style="padding-top:0">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">待办审批</span>
          <el-button style="padding:8px 15px">更多</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" stripe
        :header-cell-style="$store.state.headStyle">
          <el-table-column label="商品 ID" prop="id"> </el-table-column>
          <el-table-column label="商品名称" prop="name"> </el-table-column>
          <el-table-column label="店铺地址" prop="address"> </el-table-column>
          <el-table-column label="商品描述" prop="desc"> </el-table-column>
          <el-table-column label="商品店名" prop="shop"> </el-table-column>
        </el-table>
      </el-card>
      <!-- 6 日历 calendar -->
      <el-card class="index-list t calendar" body-style="padding-top:0;">
        <div slot="header" class="clearfix">
          <span class="font18-bold-6">日历日程</span>
          <el-button style="padding:8px 15px">更多</el-button>
        </div>
        <el-calendar>
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected' : ''">
              <!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}} -->
              <div class="calender-fixed">
                <p @click="closeBox">
                  {{ data.day.split("-")[2] }} 
                  <span class="calender-color"></span>
                </p>
                <div v-if="data.isSelected">
                  <ElasticFrame name='你好，我是自定义自检' v-if="isShow" @close='close'>
                    {{ data.isSelected ? "hi ✔️" : "" }}
                    {{total}}
                    {{ data.day.split("-")[2] }} 
                  </ElasticFrame>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </el-card>
    </div>
  </div>
</template>

<script>
import ElasticFrame from "../../components/ElasticFrame.vue";
export default {
  data() {
    return {
      // 公告
      notice: [
        { name: "我是标题1", text: "我是正文1", time: "20.9.1.1" },
        { name: "我是标题1", text: "我是正文1", time: "20.9.1.1" }
      ],

      // 日历
      value: "",
      // 工单
      workorder:[
        {label:'商品 ID',prop:'id'},
        {label:'商品名称',prop:'name'},
        {label:'店铺地址',prop:'address'},
        {label:'商品描述',prop:'desc'},
        {label:'商品店名',prop:'shop'},
      ],
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃",
          desc: "荷兰优质淡奶",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: "2019-11-29"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃",
          desc: "荷兰优质淡奶",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: "2019-11-29"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃",
          desc: "荷兰优质淡奶",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: "2019-11-29"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃",
          desc: "荷兰优质淡奶",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: "2019-11-29"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃",
          desc: "荷兰优质淡奶",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: "2019-11-29"
        }
      ],
      total:0,
      isShow:false,
    };
  },
  components: {
    ElasticFrame
  },
  methods: {
    indexMethod(index) {
      return index * 2;
    },
    //前往公告栏
    goNoties: function name(params) {
      this.$router.push("/home");
    },
    // 显示弹框
    closeBox(){
      this.isShow = true
      // console.log('显示')
    },
    // 关闭
    close(isShow){
      // console.log('关闭')
      this.isShow = isShow
      console.log(this.isShow)
    },
  }
};
</script>

<style lang="less" scoped>
.index {
  padding-bottom: 40px;
  .index-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .index-list {
      width: calc(45%);
      height: 320px;
      padding: 0;
      margin-top: 40px;
      text-align: left;
      // background:pink;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      .calender-color{
        display: inline-block;
        width:6px;
        height: 6px;
        background-color: #F56C6C;
        border-radius: 50%;
        position: absolute;
        margin-left: 4px;
        margin-top: 4px;
      }
      .prev .calender-color,.next .calender-color{
        opacity: .5;
      }
      .calender-fixed{
        position: relative;
      }
      .item {
        flex: 1;
        height: 50%;
      }
      .clearfix {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-table th:nth-child(2) {
          text-align: right;
        }
      }
      .index-list-table {
        height: 47px;
        line-height: 47px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
      }
      .index-list-table:hover {
        background: #f5f7fa;
      }
      .el-table .cell {
        height: 37px;
        line-height: 37px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
