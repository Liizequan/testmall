<template>
    <div class="fd-index">
        <div class="banner">
          <!-- 图片 -->
          <div class="banner-img">
            <ul>
              <li v-for="(item,index) in banner" :key="index">
                <img :src="item.src" alt="">
              </li>
            </ul>
          </div>
          <!-- 选框 -->
          <div class="banner-direction">
            <ul>
              <li v-for="(item,index) in banner.length" :key="index">
                {{item}}
              </li>
            </ul>
          </div>
          <!-- 方向 -->
          <div class="banner-radius">

          </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      banner:[
        {src:require('../image/banner01.png')},
        {src:require('../image/banner01.png')},
        {src:require('../image/banner01.png')},
      ]
    }
  },
}
</script>
<style>
  .banner{
    position: relative;
    width:100%;
    height:100%;
    min-width:1200px;
    max-height:600px;
    margin:auto;
  }
  .banner-img li{
    width:100%;
    min-width: 1200px;
    max-height:600px;
    overflow: hidden;
    position: absolute;
    top:0;
  }
  .banner-img li img{
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
    top:500px;
    left:50%;
    transform: translateX(-50%);
  }
  .banner-direction ul{
    display: flex;
  }
</style>
