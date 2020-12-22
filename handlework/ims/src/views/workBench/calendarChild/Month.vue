<template>
  <div class="calendar ">
    <div class="calendar-container content-backfff">
      <div class="index-list t calendar" body-style="padding-top:0;">
        <el-calendar>
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected' : ''">
              <!-- {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}  -->
              <div class="calender-fixed">
                <p @click="closeBox">
                  {{ data.day.split("-")[2] }}
                  <span class="calender-color"></span>
                </p>
                <div v-if="data.isSelected">
                  <ElasticFrame
                    name="你好，我是自定义自检"
                    v-if="isShow"
                    @close="close"
                  >
                    {{ data.isSelected ? "hi ✔️" : "" }}
                    <p>我是日期{{ data.day }}</p>
                  </ElasticFrame>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import ElasticFrame from "../../../components/ElasticFrame.vue";
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
      workorder: [
        { label: "商品 ID", prop: "id" },
        { label: "商品名称", prop: "name" },
        { label: "店铺地址", prop: "address" },
        { label: "商品描述", prop: "desc" },
        { label: "商品店名", prop: "shop" }
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
      isShow: false
    };
  },
  components: {
    ElasticFrame
  },
  methods: {
    indexMethod(index) {
      return index * 2;
    },
    //1前往公告栏
    goNoties() {
      this.$router.push("/notice");
    },
    //2前往备忘录
    goMemorial() {
      this.$router.push("/memorial");
    },
    //3前往邮箱
    goEmail() {
      this.$router.push("/email");
    },
    //4前往工单
    goWorkorder() {
      this.$router.push("/");
    },
    //5前往审批
    goApproval() {
      this.$router.push("/");
    },
    //6前往日历
    goCalendar() {
      this.$router.push("/calendar");
    },
    // 显示弹框
    closeBox() {
      this.isShow = true;
      // console.log('显示')
    },
    // 关闭
    close(isShow) {
      this.isShow = isShow;
      console.log(this.isShow);
    }
  }
};
</script>

<style lang="less" scoped>
.calender-fixed p {
  height: 69px;
  line-height: 69px;
}
</style>
