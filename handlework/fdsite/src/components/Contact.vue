<template>
    <div class="section section-bg">
      <section>
        <div class="contact between">
          <div class="section-left column">
            <ul>
              <li class="tel">
                <span>24小时服务热线：</span>
                <p>020-89855824</p>
              </li>
              <li class="between">
                <div>
                  <span>联系手机：</span>
                  <p>131 4371 8588</p>
                </div>
                <div>
                  <span>邮箱：</span>
                  <p>261884421@qq.com</p>
                </div>
              </li>
              <li class="between">
                <div>
                  <span>公司地址</span>
                  <p>广州市黄埔区开创大道108号锦昊智樽仺217/257/259号</p>
                </div>
              </li>
            </ul>
            <div class="btn"><el-button type="primary" round>立即联系</el-button></div>
          </div>
          <div class="section-right">
						<el-form ref="form" label-width="80px">
							<div class="form-input">
								<h1>免费互联网咨询服务</h1>
								<p class="name"><input type="text" placeholder="你的姓名" v-model="name"></p>
								<p class="tel"><input type="text" placeholder="联系电话" v-model="tel"></p>
								<p class="text"><textarea placeholder="其他内容" id="" cols="30" rows="10" v-model="text"></textarea></p>
							</div>
							<!-- <p class="submit"><button type="submit">提交咨询</button></p> -->
							<div class="btn"><el-button type="primary" @click="submitInfo" round>提交咨询</el-button></div>
						</el-form>
          </div>
        </div>	
      </section>
    </div>
</template>
<script>
import { constants } from 'fs';
export default {
    data(){
      return{
        name:'',
        tel:"",
        text:'',
        url:fudian.host,
      }
    },
    methods:{
      submitInfo:function(){
        console.log(this.name)
        console.log(this.tel)
        console.log(this.text)
        /*
        // 跨域
        this.$http.post(
          this.url+"/api/index/contact.html",
          {name:this.name,phone:this.tel,content:this.text},
          {emulateJSON: true},
          {headers: {'Content-Type':'aplication/x-www/form-urlencoded'}}
        ).then(
          (res)=>{
            console.log(res)
            // console.log(res.data); 
            // return res.data
            // alert(res.data.msg)
            this.$alert(res.data.msg, {
              confirmButtonText: '确定',
            });
            if(res.data.msg=="咨询成功"){
              this.name = '';
              this.tel = '';
              this.text = '';
            }
          },(error)=>{
            console.log(error);
          }
        );
        */
        //本地  
        var that = this;
        this.$axios({
          method: 'post',
          url: that.url+"/api/index/contact.html",
          data: {
            name:that.name,
            phone:that.tel,
            content:that.text
          } 
        }).then(function (res) {
          console.log(res);
          that.$alert(res.data.msg, {
            confirmButtonText: '确定',
          });
          if(res.data.msg=="咨询成功"){
            that.name = '';
            that.tel = '';
            that.text = '';
          }
        })

        
        // this.$axios.post("http://float.lihope88.com/api/index/contact.html",{
        //   name:this.name,
        //   phone:this.tel,
        //   content:this.text
        // }).then((response)=>{
        //   return Promise.resolve(res.data)
        //   let res = response.data;
        //   console.log(res)
        //   console.log('提交成功')
        // });
      }
    }
}
</script>
<style scoped>
/* 图文7 */
  .section-bg{
    width:100%;
    height:600px;
    background:url(../image/banner03.png) no-repeat 50% 50%;
  }
  .contact{
    width:1200px;
    margin:auto;
    padding:80px 0;
    /* background:whitesmoke; */
  }
  .contact .section-left{
    background-color: #fff;
    /* opacity:1; */
    width:460px;
    height:380px;
    font-size:18px;
    color:#999999;
    padding:30px 60px;
  }
  .contact .section-left li{
    border-bottom:1px solid #E5E5E5;
  }
  .contact .el-button.is-round {
    padding: 12px 51px;
  }
  .section-left .tel p{
    font-size:36px;
    color:#1371FF;
    padding-bottom:20px;
  }
  .section-left .between{
    padding:20px 0 25px;
  }
  .section-left .between p{
    color:#333333;
    height: 35px;
    line-height:35px;
  }
  .btn{
    width:100%;
    text-align: center;
    padding:30px 0;
  }
  .section-right .btn button{
    /* background-color: #1371FF;
    border:1px solid #1371FF; */
  }
	/* 右边部分 */
	.section-right {
		flex:1;
		text-align: left;
		padding:30px 50px 30px 80px;
		/* background:pink; */
		height:380px;
	}
	.section-right h1{
		font-size:32px;
		color:#fff;
	}
	.section-right input{
		width:100%;
		height:40px;
		line-height:40px;
		border:0;
		color:#999999;
		outline:none;
		background-color: #070F29;
	}
	.section-right .name,	.section-right .tel,.section-right .text{
		padding-left:10px;
		background-color: #070F29;
		margin:23px 0;
	} 
	.section-right .text{
		height:110px;
		overflow: hidden;
		margin-bottom: 0;
	}
	.section-right textarea{
		width:100%;
		height:100%;
		resize: none;
		border:none;
		outline: none;
		color:#999999;
		background-color: #070F29;
	}
</style>

