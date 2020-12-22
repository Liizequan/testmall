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
                            <button>{{item.title}}</button>
                        </li>
                      </ul>
                      <ul class="wraps">
                        <li v-for="(item,index) in cooperate" :key="index" @click="routerList(index)">
                          <router-link :to="'/example/child/'+item.id">
                            <p class="section-ul-li-img">
                              <!-- {{item}} -->
                              <i><img :src="url+item.img" alt=""></i>
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
                        <!-- 分页 -->
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
import { connect } from 'net';

export default {
    components:{
        myFooter
    },
    data(){
        return{
            url:fudian.host,
            activeTitle:0,//控制title
            title:['全部案例','品牌网站','微信开发','电商平台'],
            cooperateLength:false,//否则是否显示查看更多button
            cooperate:'',//需要渲染的数据
            cooperates:'',//临时存储全部数据库数据
            currentPage: 1,//表示当前数字分业的样式
            tobal:30,//总数据
            pages:6,//每页数据

        }
    },
    methods:{
        //导航 
        titleClick:function(e){
            console.log('我是当前的下标'+e)
            this.activeTitle = e ;
            // console.log('currentPage'+this.currentPage)
            console.log(typeof(e))
            var pages = this.pages;
            if(e==0){//所有数据
              var url = this.url+"/api/index/example";
              this.$http.get(url).then(result=>{
                console.log(result.data.list)
                var list = result.data.list
                this.tobal = list.length
                this.cooperates = list
                this.cooperate = list.slice(0,pages)
                this.currentPage = e-list.length
              })
            }else{//类别数据
              var url = this.url+"/api/index/example?id="+e;
              this.$http.get(url).then(result=>{
                console.log(result.data.list)
                var list = result.data.list
                this.tobal = list.length
                this.cooperates = list
                this.cooperate = list.slice(0,pages)
                this.currentPage = e-list.length
              })
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            // 数据分页
            var pages = this.pages;//检索数据的多少
            var cooperates = this.cooperates;//总数据
            var start = (val-1)*pages;//起始位置
            var end = (val-1)*pages+pages;//结束位置
            this.cooperate = cooperates.slice(start,end);//需要渲染页面的数据
        },
        routerList:function(e){
          console.log(e);
          console.log(this.cooperates)
        }
    },
    // 页面渲染
    created:function(){
        // 请求数据
        // 获取页数
        // 数据总数据
        // this.tobal = this.cooperate.lengt
        var id = this.$route.params.id
        this.activeTitle = id
        console.log(id)
        var pages = this.pages;
        var url = this.url+"/api/index/example";
        this.$http.get(url).then(result=>{
          console.log(result)
          var list = result.data.list
          this.title = result.data.cate
          this.tobal = list.length
          this.cooperates = list
          this.cooperate = list.slice(0,pages)
        })
        if(id!=0){//类别数据
          var url = this.url+"/api/index/example/id/"+id;
          this.$http.get(url).then(result=>{
            console.log(result.data.list)
            var list = result.data.list
            this.tobal = list.length
            this.cooperates = list
            this.cooperate = list.slice(0,pages)
            this.currentPage = id-list.length
          })
        }
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
  /* .section-case li{
    width:380px;
    overflow: hidden;
    margin:15px 0;
  } */
  .section-case li{
    width:380px;
    padding:0 10px;
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

