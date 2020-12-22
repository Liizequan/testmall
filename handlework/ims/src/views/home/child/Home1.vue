<template>
  <div class="home1">
    <h1>This is an home1 page</h1>
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{
            data.day
              .split("-")
              .slice(1)
              .join("-")
          }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>
    <div class="block">
      <span class="demonstration">年</span>
      <el-date-picker v-model="value3" type="year" placeholder="选择年">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.is-selected {
  color: #1989fa;
}
</style>
