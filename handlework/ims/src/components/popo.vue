<template>
  <div class='popo'>
    <el-popover placement="bottom-start" trigger="click" v-model="popoVisi">
      <div>
        <h3>关联客户</h3>
        <el-input placeholder="搜索成员"></el-input>
        <el-menu>
          <el-submenu v-for="(item,index) in customs" :key="index" :index="index+''">
            <template slot="title">
              <div>
                {{item.name}}
              </div>
            </template>
            <el-menu-item>
              <el-checkbox-group v-model="item.group">
                <el-checkbox v-for="it in item.customer" :key="it.id" :label="it.id">{{it.name}}</el-checkbox>
              </el-checkbox-group>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="popoBtns">
          <span class="popoCon" @click="confirm">确定</span>
          <span @click="closePopo">取消</span>
        </div>
      </div>
      <div slot="reference" style="width:100px;">
        <slot></slot>
      </div>
    </el-popover>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        popoVisi: false
      }
    },
    props: {
      customs: Array
    },
    methods: {
      closePopo() {
        // this.$emit('closePopo')
        this.popoVisi = false
      },
      confirm() {
        let count = 0
        for(let i in this.customs){
          count+=this.customs[i].group.length
        }
        if(count>1){
          this.$message('只能关联一个客户')
          return
        }
        this.$emit('confirm')
        this.popoVisi = false
      }
    },
    created() {
    }
  }
</script>
<style lang='less' scoped>
  .el-menu {
    border-right: none;
  }
  .popoCon {
    color: #44bcf0;
    margin-right: 6px;
  }
  .popoBtns {
    text-align: right;
  }
</style>