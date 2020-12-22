<template>
  <div class="chat contain">
    <div class="chat-container between">
      <Aside @click.self="searching = false" style="position:relative;">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search" @focus="focus" @change="searchMan">
        </el-input>
        <!-- @blur="blur" 独-->
        <el-collapse v-model="activeNames" @change="handleChange" accordion
          style="margin-top:20px;height:584px;overflow-y:scroll;" v-if="!searching" class="xyk-scroll">
          <el-collapse-item :title="item.label" :name="item.id" v-for="(item,index) in userList" :key="index"
            :class="hasNewMsgStructureArr.indexOf(item.label)!=-1?'structureRedStar':''">
            <ul class="user-item font14-isbold-3">
              <li v-for="(items,index) in item.user" :key="index" :style="items.user_id==userId?'background:#f7f7f7':''"
                @click="andMeTalk(items),delNewMsgStruInArr(item.label)"
                :class="hasNewMsgIdsArr.indexOf(items.user_id)!=-1?'has_new_message':''">
                <el-link :underline="false">{{items.name || '暂无人员'}}</el-link>
              </li>
            </ul>
          </el-collapse-item>
          <ul>
            <!-- 群 -->
            <el-popover trigger="hover" :content="item.membernames" v-for="(item,index) in mygroups" :key="index"
              placement="right">
              <li :style="heightlightgroupindex == index&&chatStatus=='group'?'background:#f7f7f7':''"
                style="display:flex;justify-content:space-between;align-items:center;padding:10px 0 10px 40px;padding-left:30px;border-bottom:1px solid #eee;text-align: left;font-size: 14px;"
                @click="chatwithmen(item),heightlightgroupindex = index" slot="reference"
                :class="newMsgGroupIdsArr.indexOf(item.id)!=-1?'has_new_message':''">{{item.groupname}} <i
                  class='el-icon-delete' style="float:right;margin-right:10px;" @click.stop="backwards(item)"></i> </li>
            </el-popover>

          </ul>
        </el-collapse>
        <!-- 搜索结果 -->
        <ul v-if="searching">
          <li style="padding:10px 0 10px 40px;border-bottom:1px solid #eee;text-align: left;font-size: 14px;"
            v-for="(item,index) in searchResult" :key="index" @click="andMeTalk(item)">{{item.name}}</li>
        </ul>

        <div style="position:absolute;bottom:0;width:100%;font-size: 16px;color:#343434;">
          <span @click="newgroupshow = true">创建聊天组</span>
        </div>
      </Aside>
      <Main>
        <!-- v-if="userId" 聊天窗口-->
        <Header>{{andMeTalkUser}}</Header>
        <div class="info-item" style="position:relative;padding:0;">
          <div class="mask" v-if="loading">
            <i class='el-icon-loading' style="font-size: 30px;"></i>
          </div>
          <div style="height: 100%;width:100%;overflow-y: scroll;padding:20px;box-sizing: border-box;"
            class="xyk-scroll" ref='scrollcon'>
            <ul class="" ref='ul'>
              <!-- <li class="left">
                              <el-avatar size="medium" :src="currentUser.path"></el-avatar>
                              <div class="user-text font14-nobold-9">
                                  <p>{{currentUser.name || '财务部-陈探探'}}</p>
                                  <div class="info-txt">
                                      <span v-if="you">{{currentUser.time || '14:30'}}</span>
                                      <p>{{currentUser.name + currentUser.user_id  || '请确认9月份工资'}}</p>
                                      <span>{{currentUser.time || '14:30'}}</span>
                                  </div>
                              </div>
                              <el-avatar size="medium" :src="currentUser.path" v-if="you"></el-avatar>
              </li>-->
              <li :class="item.from == user_id ? 'right' : 'left'" v-for="(item,index) in isUserData" :key="index">
                <!-- <el-avatar size="medium" :src="item.fromhead" v-if="item.from != user_id"></el-avatar> -->
                <div v-if="item.from != user_id"
                  style="display: inline-block;width:36px;height: 36px;background-size: cover;background-position: center;border-radius: 50%;"
                  :style="{backgroundImage:'url('+item.fromhead+')'}"></div>
                <div class="user-text font14-nobold-9">
                  <p>{{item.structure?item.structure+ ' - ' + item.fromname:'总经办'+ ' - ' + item.fromname}}</p>
                  <!-- + ' - ' + item.myname -->
                  <div class="info-txt">
                    <span v-if="item.from == user_id">{{item.create_time}}</span>
                    <p :style="item.from == user_id?'text-align:left;':''" style="max-width:200px;"
                      v-html="item.message" @click="getdetail"></p>
                    <!-- <p :style="item.from == user_id?'text-align:left;':''" style="max-width:200px;" v-html="htmltag"></p> -->
                    <span v-if="item.from != user_id">{{item.create_time}}</span>
                  </div>
                </div>
                <!-- <el-avatar size="medium" :src="item.fromhead" v-if="item.from == user_id"></el-avatar> -->
                <div v-if="item.from == user_id"
                  style="display: inline-block;width:36px;height: 36px;background-size: cover;background-position: center;border-radius: 50%;"
                  :style="{backgroundImage:'url('+item.fromhead+')'}"></div>
              </li>
              <!-- <li class="right">
                              <el-avatar size="medium" :src="currentUser.path" v-if="me"></el-avatar>
                              <div class="user-text font14-nobold-9">
                                  <p>{{currentUser.name || '财务部-陈探探'}}</p>
                                  <div class="info-txt">
                                      <span>{{currentUser.time || '14:30'}}</span>
                                      <p>{{currentUser.name + currentUser.user_id  || '请确认9月份工资'}}</p>
                                      <span v-if="me">{{currentUser.time || '14:30'}}</span>
                                  </div>
                              </div>
                              <el-avatar size="medium" :src="currentUser.path"></el-avatar>
              </li>-->
            </ul>
          </div>

        </div>
        <Footer>
          <div class="footer" style="display: flex;">
            <!-- <el-input placeholder="请输入" v-model="chatText" @keyup.enter.native="submit" @paste="pasting"></el-input> -->
            <div
              style="flex:1;margin-right: 10px;box-sizing: border-box;position:relative;height: 40px;border-radius: 4px;">
              <!-- overflow: hidden; -->
              <input type="textarea" v-model="chatText" v-html="chatText" v-on:keyup.13="submit"
                style="left:0;position:absolute;box-sizing: border-box;width: 100%;height: 100%;padding-left:4px;"
                :rows="5" ref="paster" @paste="pasting" @input="inputing" autofocus="autofocus">
              <!-- <div v-html="chatText" style="position:absolute;top:0;background:#fff;width:100%;height:100%;display: flex;" @click="focusdiv"></div> -->
              <!-- <textarea name="" id="" cols="30" rows="10" value="ldjfl" style="z-index: 999;background:#fff;"></textarea> -->
              </input>
            </div>

            <!-- <el-input type="textarea"></el-input> -->
            <!-- <textarea v-on:keyup.13="submit" cols="100" rows="3" v-model="chatText"
              style="margin-right:10px;"></textarea> -->
            <!-- <el-input type="textarea" v-model="chatText" style="margin-right:10px;" resize="none"></el-input> -->
            <el-button style="width:100px;" @click="submit" type="primary">发送</el-button>
            <el-button style="position:relative;">图片<input type="file" ref="file" id="file" @change="fileupload">
            </el-button>
            <!-- <el-button @click='keySreenshoot.startScreenShot()'>截图</el-button> -->
          </div>
        </Footer>
      </Main>
    </div>
    <el-dialog :visible.sync="newgroupshow" title="创建新的聊天组">
      <el-form label-width="120px">
        <el-form-item label="聊天组名称">
          <el-input placeholder="组名称" v-model="groupname"></el-input>
        </el-form-item>
        <el-form-item label="聊天组成员">
          <!-- <el-collapse>
            <el-collapse-item :title="item.label" :name="item.id" v-for="(item,index) in userList" :key="index"></el-collapse-item>
          </el-collapse> -->
          <menCheck :excuters="alluser" @theRes="topTwoChan">
            <template slot="title">
              <h3>组成员</h3>
            </template>
            <template slot="main">
              <el-input placeholder="组成员" slot="reference" v-model='nnames'></el-input>
            </template>
          </menCheck>
        </el-form-item>
        <div>
          <el-button type="primary" @click="creategroupnow">确定</el-button>
          <el-button @click="newgroupshow=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div class="mask" @click="closeperview" v-if="previewing"
      style="width:100%;height:100%;position:absolute;top:0;left:0;background:rgba(0,0,0,0.3);display: flex;justify-content: center;align-items: center;">
      <img :src="previewimgurl" alt="">
    </div>
  </div>
</template>
<script>
  import menCheck from '@/components/menCheckcopy.vue'
  // import kscreenshot from 'kscreenshot'
  export default {
    components: { menCheck },
    data() {
      return {
        // keySreenshoot:new kscreenshot(
        //   {
        //     key:65,
        //     needDownload:true,
        //     endCB(a){

        //     }
        //   }
        // ),
        previewing: false,
        previewimgurl: '',
        htmltag: '<img src="http://ims.gzfloat.com/file/20200305/5e51cc41cc323ff6e798d12b41a42423.jpg" style="width:40px;height:40px;"/>',
        newMsgGroupIdsArr: [],
        groupPageDetail: [],
        heightlightgroupindex: '',
        mygroups: '',
        groupname: '',
        iidsstr: '',
        nnames: '',
        newgroupshow: false,
        quns: ['群一', '群二'],
        loading: false,
        search: "", //搜索人员
        userList: "", //所有人员
        activeNames: null, //是否显示下拉人员
        andMeTalkUser: "待选择人员", //姓名
        andMeTalkImg: "", //选择人员的头像
        currentUser: "", //当前需要聊天的用户id
        chatText: "", //聊天内容
        isUserData: [], //当前客户聊天记录
        you: false,
        me: true,
        userId: "",
        divDom: '',
        ulDom: '',
        ws: '',
        client_id: '',
        user_id: '',
        tempDataArr: [],
        withwhoIndex: '',
        hadTalk: false,
        login_status: '',
        hasNewMsgIdsArr: [],
        hasNewMsgStructureArr: [],
        memberPageDetail: [],
        searching: false,
        searchResult: [],
        chatStatus: '',
        groupMemberIds: [],
        groupId: '',
        creategroupidsArr: [],
        groupMsgTempArr: [],
        hasthroughgroup: false,
        currentgroupindex: ''
      };
    },
    // watch: {
    //   $router(to, from) {
    //     if (to.path == "/chat") {
    //         console.log('chat')
    //     }else{
    //         console.log('no chat')
    //     }
    //   }
    // },
    methods: {
      closeperview() {
        this.previewing = false
      },
      getdetail(e) {
        // console.log(e.target.src)
        // let a = document.createElement('a')
        // let href = e.target.src
        // a.href=e.target.src
        // a.target='_self'
        // a.click()
        // console.log(a)
        this.previewimgurl = e.target.src
        this.previewing = true
      },
      focusdiv() {
        console.log('lsdfjljl')
      },
      inputing(e) {
        console.log(e.target.value)
        this.chatText = e.target.value
      },
      pasting(e) {
        // console.log(e.clipboardData.files[0])
        if (e.clipboardData.files[0]) {
          this.$http.Imgupload(e.clipboardData.files[0]).then(res => {
            let imgtaghtml = '<img src="' + this.$baseURL + res.data.msg.path + '" style="width:80px;height:80px;"/>'
            console.log('00000:' + this.chatText)
            this.chatText = this.chatText + imgtaghtml
            console.log('1111:' + this.chatText)
          })
        }
        // else{
        //   this.chatText +=e.target.value
        // }
      },
      fileupload(e) {
        this.$http.Imgupload(this.$refs.file.files[0]).then(res => {
          console.log(this.$baseURL + res.data.msg.path, 'rrrrrrrrrrrrr')
          let imgtaghtml = '<img src="' + this.$baseURL + res.data.msg.path + '" style="width:40px;height:40px;" class="imgsendbyme"/>'
          this.chatText = imgtaghtml
          this.submit()
        })
      },
      getMoreGroup() {
        this.loading = true
        let page
        for (let i in this.groupPageDetail) {
          if (this.groupPageDetail[i].group_id == this.groupId) {
            if (this.groupPageDetail[i].current_page == 1) {
              this.loading = false
              this.$message('没有更多数据')
              return
            }
            page = --this.groupPageDetail[i].current_page
            break
          }
        }
        this.$http.get('index/getchatgrouplog', { group_id: this.groupId, page: page }).then(res => {
          if (res) {
            this.loading = false
          }
          if (res.code == 1) {
            let tempResArr = []
            for (let i in res.msg.data) {
              tempResArr.push(res.msg.data[res.msg.data.length - 1 - i])
            }
            this.isUserData = [...tempResArr, ...this.isUserData]
            this.groupMsgTempArr[this.currentgroupindex].message = [...tempResArr, ...this.groupMsgTempArr[this.currentgroupindex].message]
          }
        })
      },
      backwards(group) {
        console.log(group)
        this.$confirm('是否退出群聊', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          if (res == 'confirm') {
            this.$http.post('index/backwards', {
              group_id: group.id
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getallgroup()
              }
            })
          }
        })
      },
      chatwithmen(group) {
        if (this.loading) {
          return this.$message('数据加载中...')
        }
        if (this.newMsgGroupIdsArr.indexOf(group.id) != -1) {
          this.newMsgGroupIdsArr.splice(this.newMsgGroupIdsArr.indexOf(group.id), 1)
        }
        this.chatStatus = 'group'
        this.andMeTalkUser = group.groupname
        this.groupMemberIds = group.memberids.split(',')
        this.groupId = group.id
        this.userId = group.memberids
        this.isUserData = []
        this.hasthroughgroup = false
        for (let i in this.groupMsgTempArr) {
          if (group.id == this.groupMsgTempArr[i].group_id) {
            console.log('已在该群聊过')
            this.hasthroughgroup = true
            this.currentgroupindex = i
            this.isUserData = [...this.groupMsgTempArr[i].message]
            break
          }
        }
        if (!this.hasthroughgroup) {//没在该群聊过
          this.groupMsgTempArr.push({ group_id: group.id, message: [] })
          this.currentgroupindex = this.groupMsgTempArr.length - 1
          console.log(this.groupMsgTempArr)
          console.log('添加聊天人的id为：' + this.userId)
          this.loading = true
          this.$http.get('index/getchatgrouplog', { group_id: this.groupId }).then(res => {
            if (res.code == 1) {
              let tempResArr = []
              for (let i in res.msg.data) {
                tempResArr.push(res.msg.data[res.msg.data.length - 1 - i])
              }
              this.isUserData = [...tempResArr]
              this.groupMsgTempArr[this.currentgroupindex].message = [...tempResArr]
              this.groupPageDetail.push({ group_id: this.groupId, total: res.msg.total, current_page: res.msg.last_page })
              this.loading = false
            }
          })
        }
      },
      getallgroup() {
        this.$http.get('index/getmygroup').then(res => {
          if (res.code == 1) {
            this.mygroups = res.msg
          }
        })
      },
      creategroupnow() {
        console.log(this.groupname, this.iidsstr)
        if (!this.groupname.trim()) {
          return this.$message('请输入组名')
        } else if (!this.iidsstr) {
          return this.$message('请选择成员')
        } else if (this.creategroupidsArr.length <= 1) {
          return this.$message('群聊不能少于1人')
        }
        this.$http.post('index/newgroup', {
          groupname: this.groupname,
          memberids: this.iidsstr
        }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.newgroupshow = false
            this.getallgroup()
          }
        })
      },
      getIdsStr(val) {
        let ids = []
        for (let i in val) {
          ids.push(val[i].id)
        }
        return ids.join(',')
      },
      getNames(val) {
        let names = []
        for (let i in val) {
          names.push(val[i].name)
        }
        return names.join('  ')
      },
      topTwoChan(val) {
        this.creategroupidsArr = val
        this.iidsstr = this.getIdsStr(val)
        this.nnames = this.getNames(val)
        let selfid = JSON.parse(localStorage.getItem('login_status')).info.user_id
        for (let i in val) {
          if (val[i].id == selfid) {
            return
          }
        }
        this.nnames += ' ' + JSON.parse(localStorage.getItem('login_status')).info.name
        this.iidsstr += ',' + selfid
        this.creategroupidsArr.push(selfid)
        console.log(this.iidsstr, this.nnames)
      },
      selectOne(e) {
        console.log(e)
        this.userId = e
        this.searching = false
      },
      searchMan(e) {
        // console.log(e,this.userList)
        this.searchResult = []
        for (let i in this.userList) {
          for (let j in this.userList[i].user) {
            if (this.userList[i].user[j].name.indexOf(e) != -1) {
              this.searchResult.push(this.userList[i].user[j])
            }
          }
        }
      },
      blur() {
        this.searching = false
      },
      focus() {
        console.log('focusfocusfocusfocus')
        this.searching = true
      },
      getMore() {
        this.loading = true
        this.userId//跟谁聊天
        let page
        for (let i in this.memberPageDetail) {
          if (this.memberPageDetail[i].user_id == this.userId) {
            if (this.memberPageDetail[i].current_page == 1) {
              this.loading = false
              this.$message('没有更多数据')
              return
            }
            page = --this.memberPageDetail[i].current_page
            break
          }
        }
        // if (page <= 0) {
        //   this.loading = false
        //   return this.$message('没有更多数据')
        // }
        this.$http.get('index/getchat', { user_id: this.userId, page: page }).then(res => {
          if (res) {
            this.loading = false
          }
          if (res.code == 1) {
            let tempResArr = []
            for (let i in res.msg.data) {
              tempResArr.push(res.msg.data[res.msg.data.length - 1 - i])
            }
            this.isUserData = [...tempResArr, ...this.isUserData]
            this.tempDataArr[this.withwhoIndex].messages = [...tempResArr, ...this.tempDataArr[this.withwhoIndex].messages]
          }
        })
      },
      delNewMsgStruInArr(name) {
        console.log(name)
        if (this.hasNewMsgStructureArr.indexOf(name) != -1) {
          this.hasNewMsgStructureArr.splice(this.hasNewMsgStructureArr.indexOf(name), 1)
        }
      },
      handleChange(val) { },
      andMeTalk(val) {
        if (this.loading) return this.$message('数据加载中...')
        this.isUserData = []
        this.andMeTalkUser = val.name;
        this.chatStatus = 'single'
        this.userId = val.user_id;
        console.log(this.hasNewMsgIdsArr, val.user_id, 'iiiiiiiiiiii')
        if (this.hasNewMsgIdsArr.indexOf(val.user_id) != -1) {
          this.hasNewMsgIdsArr.splice(this.hasNewMsgIdsArr.indexOf(val.user_id), 1)
        }
        this.hadTalk = false
        for (let i in this.tempDataArr) {
          if (this.tempDataArr[i].withwho == this.userId) {
            this.withwhoIndex = i
            this.hadTalk = true
            this.isUserData = [...this.tempDataArr[i].messages]
            console.log('跟此人已聊过：' + this.userId)
            break
          }
        }
        if (!this.hadTalk) {
          this.tempDataArr.push({ withwho: this.userId, messages: [] })
          this.withwhoIndex = this.tempDataArr.length - 1
          console.log('添加聊天人的id为：' + this.userId)
          this.loading = true
          this.$http.get('index/getchat', { user_id: this.userId }).then(res => {
            if (res.code == 1) {
              let tempResArr = []
              for (let i in res.msg.data) {
                tempResArr.push(res.msg.data[res.msg.data.length - 1 - i])
              }
              this.isUserData = [...tempResArr]
              this.tempDataArr[this.withwhoIndex].messages = [...tempResArr]
              this.memberPageDetail.push({ user_id: this.userId, total: res.msg.total, current_page: res.msg.last_page })
              this.loading = false
            }
          })

        }
        this.getData();

      },
      timer() {
        // let timer = localStorage.getItem("timer");
        // clearInterval(timer);
        // timer = setInterval(() => {
        //   this.getData();
        //   console.log("定时器进行中...");
        // }, 5000);
        // localStorage.setItem("timer", timer);
        // return timer;
      },
      // 获取数据
      getData() {
        // this.$http
        //   .get("index/getchat", {
        //     token: localStorage.getItem("token"),
        //     user_id: this.userId
        //   })
        //   .then(res => {
        //     if (res.code == 1) {
        //       var userInfo = JSON.parse(localStorage.getItem("login_status"));
        //       var myId = userInfo.info.user_id;
        //       var res = res.msg;
        //       for (var i in res) {
        //         if (myId == res[i].user_id) {
        //           res[i] = Object.assign({ status: 1 }, res[i]);
        //         }
        //       }
        //       this.isUserData = res;
        //       this.$nextTick(()=>{
        //         console.log(this.ulDom.offsetHeight)
        //         this.divDom.scrollTop = this.ulDom.offsetHeight
        //       })
        //     }
        //   });
      },
      mounted() {
        // if (document.getElementsByClassName('imgsendbyme').length) {
        //   console.log(document.getElementsByClassName('imgsendbyme'))
        // document.getElementsByClassName('imgsendbyme').addEventListener('click', (e) => {
        //   console.log(e)
        // })
        // }
      },

      // 发送
      submit() {
        // this.$http
        //   .post("index/sendchat", {
        //     // token:this.$token,
        //     receiver_id: this.userId,
        //     content: this.chatText
        //   })
        //   .then(res => {
        //     console.log(res);
        //     if (res.code == 1) {
        //       this.getData();
        //       this.chatText = "";
        //     }
        //   });
        if (!this.userId) {
          return this.$message("请选择聊天人员");
        } else if (!this.chatText) {
          return this.$message("不能发送空白内容");
        }
        // this.userId
        this.$store.state.ws.send(JSON.stringify({ group_id: this.groupId, message: this.chatText, from: this.user_id, to: this.userId, withwho: this.chatStatus }))
        if (this.user_id != this.userId) {
          //from: 31
          // to: 29
          // message: "收到啦"
          // create_time: "2020-03-10 09:56:19"
          // fromname: "林金鹏"
          // toname: "林晓生"
          // fromhead: "http://ims.gzfloat.com/file/20200212/1c50cd259b98bc0ce28d261a454ddd12.png"
          // tohead: "http://ims.gzfloat.com/file/20200213/4f1623b6204d1ba54fd6ad99cd69b828.jpg"
          // structure: "科技研发中心"
          if (this.chatStatus == 'single') {
            this.isUserData.push({
              from: this.login_status.info.user_id,
              to: this.userId,
              fromhead: this.$baseURL + this.login_status.info.head,
              structure: this.login_status.info.structure_name,
              message: this.chatText,
              fromname: this.login_status.info.name,
              create_time: this.$http.getDateTime(new Date())
            })
            this.tempDataArr[this.withwhoIndex].messages.push({
              from: this.login_status.info.user_id,
              to: this.userId,
              fromhead: this.$baseURL + this.login_status.info.head,
              structure: this.login_status.info.structure_name,
              message: this.chatText,
              fromname: this.login_status.info.name,
              create_time: this.$http.getDateTime(new Date())
            })
            this.$nextTick(() => {
              this.divDom.scrollTop = this.ulDom.offsetHeight
            })
          } else {
            this.isUserData.push({
              from: this.login_status.info.user_id,
              to: this.userId,
              fromhead: this.$baseURL + this.login_status.info.head,
              structure: this.login_status.info.structure_name,
              message: this.chatText,
              fromname: this.login_status.info.name,
              create_time: this.$http.getDateTime(new Date())
            })
            this.groupMsgTempArr[this.currentgroupindex].message.push({
              from: this.login_status.info.user_id,
              to: this.userId,
              fromhead: this.$baseURL + this.login_status.info.head,
              structure: this.login_status.info.structure_name,
              message: this.chatText,
              fromname: this.login_status.info.name,
              create_time: this.$http.getDateTime(new Date())
            })
            this.$nextTick(() => {
              this.divDom.scrollTop = this.ulDom.offsetHeight
            })
          }
        }
        this.chatText = ''
      },
      link() {
        // this.ws = new WebSocket('ws://ims.gzfloat.com:2348?user_id=' + this.user_id);//本人
        // this.ws.onopen = (res) => {

        // }
        this.$store.state.ws.onmessage = (result) => {
          console.log('resulttttttttttt:', result)
          if (JSON.parse(result.data).withwho == "single") {
            console.log('独聊')
            if (this.$route.path != '/chat') {
              this.$bus.$emit('topHasNewMsg')
            }
            if (this.userId != JSON.parse(result.data).from) {
              if (this.hasNewMsgIdsArr.indexOf(JSON.parse(result.data).from) == -1) {
                this.hasNewMsgIdsArr.push(JSON.parse(result.data).from)
              }
            }
            if (JSON.parse(result.data).from) {
              this.$http.get('user/frominfo', {
                user_id: JSON.parse(result.data).from
              }).then(res => {
                if (res.code == 1) {
                  if (JSON.parse(result.data).type == 'send') {//&& this.userId==JSON.parse(res.data).from
                    if (this.hasNewMsgStructureArr.indexOf(res.msg.from_structrure) == -1) {
                      this.hasNewMsgStructureArr.push(res.msg.from_structrure)
                    }
                    this.hadTalk = false
                    for (let i in this.tempDataArr) {
                      if (this.tempDataArr[i].withwho == JSON.parse(result.data).from) {
                        this.hadTalk = true
                        if (this.userId == JSON.parse(result.data).from) {
                          this.isUserData.push({
                            from: JSON.parse(result.data).from,
                            to: this.login_status.info.user_id,
                            fromhead: res.msg.from_head,
                            structure: res.msg.from_structrure,
                            message: JSON.parse(result.data).message,
                            fromname: res.msg.from_name,
                            create_time: this.$http.getDateTime(new Date())
                          })
                        }
                        this.tempDataArr[i].messages.push({
                          from: JSON.parse(result.data).from,
                          to: this.login_status.info.user_id,
                          fromhead: res.msg.from_head,
                          structure: res.msg.from_structrure,
                          message: JSON.parse(result.data).message,
                          fromname: res.msg.from_name,
                          create_time: this.$http.getDateTime(new Date())
                        })
                        break
                      }
                    }
                    if (!this.hadTalk) {
                      this.tempDataArr.push({ withwho: this.userId, messages: [] })
                      this.tempDataArr[this.tempDataArr.length - 1].messages.push({
                        from: JSON.parse(res.data).from,
                        to: this.login_status.info.user_id,
                        fromhead: res.msg.from_head,
                        structure: res.msg.from_structrure,
                        message: JSON.parse(res.data).message,
                        fromname: res.msg.from_name,
                        create_time: this.$http.getDateTime(new Date())
                      })
                    }
                    this.$nextTick(() => {
                      this.divDom.scrollTop = this.ulDom.offsetHeight
                    })
                  }
                }
              })

            }
            this.userId//跟谁在聊天
          } else {
            console.log('群聊:', JSON.parse(result.data))
            let group_id = JSON.parse(result.data).group_id
            if (this.mygroups.indexOf(group_id) == -1) {
              this.getallgroup()
            }
            if (this.newMsgGroupIdsArr.indexOf(group_id) == -1 && (this.groupId != group_id || JSON.parse(result.data).from != this.user_id)) {
              //当前聊天窗口群是当前接收新消息的群，并且是接收人就显示红点
              this.newMsgGroupIdsArr.push(group_id)
            }
            for (let i in this.groupMsgTempArr) {
              if (this.groupMsgTempArr[i].group_id == group_id) {
                console.log('有在该群聊过')
                this.$http.get('user/frominfo', {
                  user_id: JSON.parse(result.data).from
                }).then(res => {
                  if (res.code == 1) {
                    if (JSON.parse(result.data).type == 'send') {
                      if (this.user_id != JSON.parse(result.data).from) {
                        if (this.groupId == group_id) {
                          this.isUserData.push({
                            from: JSON.parse(result.data).from,
                            to: this.login_status.info.user_id,
                            fromhead: res.msg.from_head,
                            structure: res.msg.from_structrure,
                            message: JSON.parse(result.data).message,
                            fromname: res.msg.from_name,
                            create_time: this.$http.getDateTime(new Date())
                          })
                        }
                        this.groupMsgTempArr[i].message.push({
                          from: JSON.parse(result.data).from,
                          to: this.login_status.info.user_id,
                          fromhead: res.msg.from_head,
                          structure: res.msg.from_structrure,
                          message: JSON.parse(result.data).message,
                          fromname: res.msg.from_name,
                          create_time: this.$http.getDateTime(new Date())
                        })
                        this.$nextTick(() => {
                          this.divDom.scrollTop = this.ulDom.offsetHeight
                        })
                      }

                    }
                  }
                  console.log('发送人信息：', res.msg)
                  console.log('是否本人：', this.user_id, JSON.parse(result.data).to)

                })
              }
            }
          }
        }
      },
    },
    watch: {
      isUserData() {
        this.timer();
      }
    },
    destroyed() {
      clearTimeout(this.timer);
    },
    created() {
      // this.$refs.paster.onpaste = function(){
      //   console.log('ljljlj')
      // }
      // document.getElementsByClassName('imgsendbyme')


      this.getallgroup()
      this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
        for (let i in res) {
          res[i].group = []
        }
        this.alluser = res

      })
      this.$nextTick(() => {
        this.ulDom = this.$refs.ul
        this.divDom = this.$refs.scrollcon
        this.divDom.addEventListener('scroll', () => {
          if (this.divDom.scrollTop == 0) {
            if (!this.loading) {
              if (this.chatStatus == 'single') {
                this.getMore()
              } else if (this.chatStatus == 'group') {
                this.getMoreGroup()
              }
            }
          }
        })
      })
      this.hasNewMsgIdsArr = this.$store.state.hasNewMsgIdsArr
      this.hasNewMsgStructureArr = this.$store.state.hasNewMsgStructureArr
      this.newMsgGroupIdsArr = this.$store.state.newMsgGroupIdsArr
      this.login_status = JSON.parse(localStorage.getItem('login_status'))
      this.user_id = this.login_status.info.user_id
      this.link()
      this.$http
        .get("user/index", {
          token: localStorage.getItem("token")
        })
        .then(res => {
          var id = res.user_id;
          var text = res.name;
          var img = res.head;
          this.userList = res;
        });

      this.getData();
    }
  };
</script>
<style lang="less" scoped>
  .chat {
    height: 680px;
  }

  aside {
    width: 280px;
    margin-right: 20px;
    height: 680px;

    .has_new_message {
      position: relative;

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        background: red;
        position: absolute;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        border-radius: 50%;
      }

    }

    .user-item {
      text-align: left;

      li:hover {
        color: #409eff;
      }
    }
  }

  main {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    height: 680px;

    header {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }

    .info-item {
      height: 460px;
      overflow: auto;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
      padding: 20px;
    }

    .info-item li {
      display: flex;
      margin: 30px 0;

      .user-text {
        padding-left: 20px;

        .info-txt {
          display: flex;

          p {
            color: #fff;
            border-radius: 4px;
            padding: 8px 12px;
            margin: 10px;
            margin-left: 0;
            background-color: #409eff;
            position: relative;
          }

          span {
            display: inline-block;
            margin: 10px;
            padding: 8px 12px;
            padding-left: 0;
          }
        }
      }
    }

    .info-item li.left {
      text-align: left;

      .user-text {
        .info-txt {
          p:after {
            content: "";
            position: absolute;
            top: -15px;
            left: 10px;
            border: 10px solid transparent;
            border-bottom: 10px solid #409eff;
          }
        }
      }
    }

    .info-item li.right {
      display: flex;
      text-align: right;
      justify-content: flex-end;

      .user-text {
        padding-right: 20px;

        .info-txt {
          p {
            margin-right: 0;
          }

          p:after {
            content: "";
            position: absolute;
            top: -15px;
            right: 10px;
            border: 10px solid transparent;
            border-bottom: 10px solid #409eff;
          }
        }
      }
    }

    footer {
      /* background-color: #fff; */

      .footer {
        /* position: absolute;
      bottom: 0;
      left: 0; */
        width: 100%;
        display: flex;
        margin-top: 30px;

        input {
          flex: 1;
          margin-right: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        input:focus {
          box-shadow: none;
        }
      }
    }
  }

  .window_con {
    height: 460px;
    overflow-y: scroll;
  }

  .structureRedStar {
    position: relative;

    &::after {
      content: '';
      width: 8px;
      height: 8px;
      background: red;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 50%;
    }
  }

  .contain {
    background: #f7f7f7;
    padding: 0;
  }

  .between aside {
    background: #fff;
    box-sizing: border-box;

    .el-input {
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .xyk-scroll {
    background: #fff;
    border-radius: 4px;
  }

  /deep/.el-collapse-item__header {
    padding-left: 30px !important;
  }

  .el-collapse-item__content li {
    padding-left: 12px !important;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .el-collapse-item__content li {
    /* margin:5px 0; */
    padding: 10px 0;
    padding-left: 40px !important;
  }

  /deep/.el-input__prefix {
    left: 24px;
  }

  main {
    padding-top: 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  /deep/.el-input__inner {
    left: 24px;
    height: 32px;
  }

  /deep/.el-collapse {
    margin-top: 0 !important;
  }

  /deep/.el-collapse-item__content {
    padding-bottom: 0 !important;
  }

  #file {
    width: 70px;
    height: 40px;
    position: absolute;
    top: 20px;
    left: 0;
  }

  /deep/.el-form-item .el-input__inner {
    border-radius: 4px;
    height: 40px;
  }

  /deep/.el-dialog {
    width: 500px;
  }
</style>