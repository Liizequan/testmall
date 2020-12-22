<template>
    <div class="fd-index">
        <div class="banner">
          <!-- 图片 -->
          <div class="banner-img">
            <ul>
              <li v-for="(item,index) in banner" :key="index" ref="element" v-show="index===mark" >
                <img :src="item.src" alt="">
              </li>
            </ul>
          </div>
          <!-- 选框 -->
          <div class="banner-direction">
            <img src="../image/banner01.png" alt="" style=' opacity: 0'>
            <ul>
              <li v-for="(item,index) in banner.length" :key="index" :class="{'active':index==mark}">
              </li>
            </ul>
          </div>
          <!-- 方向 -->
          <div class="banner-radius">
            <!-- <img src="../image/banner01.png" alt="" style=' opacity: 0'> -->
            <div>
              <i class="el-icon-arrow-left" @click="bannerLeft"></i>
              <i class="el-icon-arrow-right" @click="bannerRight"></i>
            </div>
          </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      mark:0,
      banner:[
        {src:require('../image/banner01.png')},
        {src:require('../image/banner02.png')},
        {src:require('../image/banner03.png')},
      ]
    }
  },
  methods: {
    bannerLeft: function () {
      this.mark--;
       if (this.mark < 0) { //当图片回到第一张在次点击时跳到最后一张
        this.mark = this.banner.length-1
      }
    },
    bannerRight:function(){
      this.autoPlay();
    },
    // 自动轮播
    autoPlay () {
      this.mark++;
      if (this.mark === this.banner.length) { //当遍历到最后一张图片置零
        this.mark = 0
      }
    },
    play () {
      setInterval(this.autoPlay, 4000)
    },
  },
  created () {
    this.play()
  }
}
</script>
<style>
  .banner{
    position: relative;
    width:100%;
    height:100%;
    min-width:1200px;
    max-height:600px;
    overflow: hidden;
    margin:auto;
  }
  .banner-img li{
    width:100%;
    min-width: 1200px;
    max-height:600px;
    position: absolute;
    top:0;
  }
  .banner-img li img,.banner-direction img{
    width: 100%;
    min-width: 1200px;
    margin:auto;
    display: block;
  }
  /* 边框 */
  .banner-direction{
    position: relative;
  }
  .banner-direction ul{
    position: absolute;
    z-index:10;
    left:50%;
    bottom:30px;
    display: flex;
    transform: translateX(-50%);
  }
  .banner-direction li{
    width:10px;
    height:10px;
    border-radius: 50%;
    background:#fff;
    opacity: 0.1;
    margin:0px 5px;
  }
  .banner-direction li.active{
    opacity: 1;
  }
  /* 小圆点 */
  .banner-radius{
    position:absolute;
    width:100%;
    top:45%;
    color:#fff;
    transform: translateY(-50%);
  }
  .banner-radius div{
    width:1200px;
    margin:auto;
    position: relative;
  }
  .banner-radius div i{
    width:50px;
    height:50px;
    background:#000;
    opacity:0.5;
    text-align:center;
    line-height: 50px;
    border-radius:50%;
  }
  .banner-radius .el-icon-arrow-left{
    position: absolute;
    left:-50px;
  }
  .banner-radius .el-icon-arrow-right{
    position: absolute;
    right:-50px;
  }
</style>
