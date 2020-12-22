<!---->
<template>
  <div class="parent" v-if="isShow">
      <div class="child" :style="{ width: winWidth + 'px' }">
        <div class="child-box">
          <div class="top">
              <span>{{name}}</span>
              <i class="el-icon-close"  @click="close"></i>
          </div>  
          <div class="centent">
              <slot></slot>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        isShow:true,
        // width:winWidth
        counter:0
    };
  },
  props: {
    name: {
      type: String
    },
  },
  computed: {
    // 浏览器宽度
    winWidth: function() {
      return window.innerWidth;
    }
  },
  methods: {
    close(){
        // console.log('我是子组件')
        this.isShow = !this.isShow
        this.$emit('close',this.isShow)
    },
  },
};
</script>
<style lang="less" scoped>
.parent{
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 10002;
}
.child {
  // width:100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  .child-box{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      z-index: 1000;
      -webkit-animation:myfirst .2s ease-in; /* Safari and Chrome */
      @keyframes myfirst{
        0%{
          top:49%;
          opacity: 0;
        }
        100%{
          top:50%;
          opacity: 1;
        }
      }
      .top{
        padding: 15px 40px 15px 20px;
        position: relative;
        background-color: #303133;
        color: #fff;
        text-align: left;
        min-width: 300px;
        overflow: hidden;
        .el-icon-close{
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            display: inline-block;
            font-weight: bold;
            font-size: 24px;
            background-color: #303133;
        }
      }
  }
}
</style>
