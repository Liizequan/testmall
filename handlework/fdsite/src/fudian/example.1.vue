<template>
    <div class="example">
        <div class="section">
            <section>
                <div class="section6">
                    <div class="section-top">
                        <p class="bold5">合作案例</p>
                        <p class="gray9">十年经验总结，不断积累、不断完善、不断创新只为您提供最成熟最合适的方案</p>
                    </div>
                    <div class="section-case">
                        <ul class="section-case-title">
                        <li v-for="(item,index) in title" :key="index" @click="titleClick(index)" :class="{'active':activeTitle == index}">
                            <button>{{item}}</button>
                        </li>
                        </ul>
                        <ul class="wrap">
                        <li v-for="(item,index) in cooperate" :key="index">
                            <router-link to="/example/child">
                              <p class="section-ul-li-img">
                                  <i><img :src="item.img" alt=""></i>
                              </p>
                              <div class="section-ul-li-div">
                                  <p class="section-ul-li-title">{{item.title}}</p>
                                  <p class="between">
                                  <span>Details</span>
                                  <i><img src="../image/auto_right.png" alt=""/></i>
                                  </p>
                              </div>
                            </router-link>
                        </li>
                        </ul>
                        <p class="btn" v-if="cooperateLength"><el-button size="medium">查看更多</el-button></p>
                    </div>
                    <div class="section-footer">
                        <div class="block">
                            <!-- <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pages"
                                background
                                :page-sizes="6"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tobal">
                            </el-pagination> -->
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pages"
                                background
                                layout="total, prev, pager, next, jumper"
                                :total="tobal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </section> 
        </div> 
        <div>
            <my-footer></my-footer>
        </div>
    </div>
</template>

<script>
import myFooter from '../components/Footer';

export default {
    components:{
        myFooter
    },
    data(){
        return{
            activeTitle:0,
            title:['全部案例','品牌网站','微信开发','电商平台'],
            cooperateLength:false,//否则是否显示查看更多button
            cooperate:[
                {img:require('../image/cooperate1.png'),title:'NO尔斯水杯'},
                {img:require('../image/cooperate2.png'),title:'农情商事官网'},
                {img:require('../image/cooperate3.png'),title:'宁波霍科电器有限公司'},
                {img:require('../image/cooperate4.png'),title:'金箔娱乐'},
                {img:require('../image/cooperate5.png'),title:'吉利新能源汽车'},
                {img:require('../image/cooperate6.png'),title:'杭城物联网'},
                {img:require('../image/cooperate1.png'),title:'NO尔斯水杯'},
                {img:require('../image/cooperate2.png'),title:'农情商事官网'},
                {img:require('../image/cooperate3.png'),title:'宁波霍科电器有限公司'},
                {img:require('../image/cooperate4.png'),title:'金箔娱乐'},
                {img:require('../image/cooperate5.png'),title:'吉利新能源汽车'},
                {img:require('../image/cooperate6.png'),title:'杭城物联网'},
            ],
            currentPage: 1,
            tobal:30,//总数据
            pages:10,//每页数据

        }
    },
    methods:{
        titleClick:function(e){
            console.log(e)
            this.activeTitle = e
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    },
    created:function(){
        // 请求数据
        // 获取页数
        // 数据总数据
        this.tobal = this.cooperate.length
        var url = "http://float.lihope88.com/api/index/example";
        this.$http.get(url).then(result=>{
          console.log(result)
        })


        // var url = "http://float.lihope88.com/api/index/example/id/";
        // this.$http.get(url).then(result=>{
        //   console.log(result)
        // })
    },
}
</script>

<style scoped>
.section-top{
  text-align: center;
}

.section-top .gray9{
  padding:20px 0 50px;
}
.section6 {
  width:1200px;
  margin:auto;
  padding-top:40px;
}
.section-case .section-case-title{
  display: flex;
  justify-content: center;
  text-align: center;
  padding:0;
}
.section-case .section-case-title li{
  width:120px;
  margin:0 10px;
}
.section-case .section-case-title li button{
  background:#E5E5E5;
  color:#999999;
  font-size:14px;
  border-radius:16px;
  border:0;
  width:120px;
  height:32px;
  line-height: 32px;
  outline: none;
}
.section-case .section-case-title .active button{
  background:#1371FF;
  color:#fff;
}

  /* 面包屑内容 */
  .section6 .el-tabs__content{
    width: 1200px;
    margin: auto;
    padding:0;
  }
  .section-case ul{
    padding:25px 0;
  }
  .section-case li{
    width:380px;
    overflow: hidden;
    margin:15px 0;
  }
  .section-case li a{
    color:#333333;
    font-size:14px;
    text-decoration: none;
  }
  .section-case .section-ul-li-img{
    width:380px;
    height:250px;
    overflow: hidden;
    position:relative;
  }
  .section-case .section-ul-li-img::after{
    content:'查看详情';
    position:absolute;
    top:100%;
    left:0;
    width:380px;
    height:250px;
    color:#fff;
    line-height: 250px;
    text-align: center;
    transition: all .3s linear;
    background:rgba(0, 0, 0, .72);
  }
  .section-case li:hover .section-ul-li-img::after{
    top:0;
  }
  .section-ul-li-div{
    border:1px solid #E5E5E5;
    border-top:none;
    padding:0 20px;
  }
  .section-ul-li-title{
    height:50px;
    line-height:50px;
  }
  .section-case .between{
    height:42px;
    line-height:42px;
    border-top:1px solid #e5e5e5;
  }
  .section-case .btn{
    width:100%;
    text-align: center;
    padding:10px 0;
  }
  .section-case .btn button{
    border-radius:none;
  }
</style>

