<template>
    <div class="" v-loading="loading">
        <div class="notice-detail">
            <!-- <h3>我是公告详情</h3> -->
            <div class="top">
                <div class="title">
                <h3>{{memorial.title}}</h3>
                <p class="font14-nobold-9"><span>{{memorial.create_time}}</span></p>
                </div>
            </div>
            <div class="centent font14-nobold-9">
                {{memorial.content}}
            </div>
            <div>
              <el-button @click="edits">编辑</el-button>
              <el-button @click="back()">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // title:'公告标题公告标题公告标题公告标题公告标题公告标题',
      // time:'2019-10-28  17：30',
      // author:'人事部',
      // content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'
      memorial:{},
      loading:true
    }
  },
  created() {
    // index/memorial
    const detail_Id = this.$route.params.detail_Id;
    // console.log(detail_Id)
    this.$http.get('index/memorial',{
      // token:this.$token,
      id:detail_Id,
    }).then(res=>{
      console.log(res)
      this.memorial = res.msg
      this.loading = false
    })
  },
  methods: {
    edits(){
      // console.log('编辑')
      // console.log(this.$route.params.detail_Id)
      this.$router.push({path:'/memorial/add',query: {
        id: this.$route.params.detail_Id,
      }})
    }
  },
};
</script>
<style lang="less" scoped>
  .notice-detail{
    padding:20px;
    .top{
      border-bottom: 1px solid #ddd;
      .btn{
        text-align: right;
      }
      .title p{
        padding:10px;
      }
    }
    .centent{
      padding:20px;
      text-align: left;
    }
  }
</style>
