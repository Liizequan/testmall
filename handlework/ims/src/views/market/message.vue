<template>
  <div class="message contain">
    <div v-if="this.$route.path == '/message'">
      <div class="topBtns">
        <div class="leftBtns">
          <el-button type="primary" @click="createNew" v-if="!threeShow&&newqunfa">
            <i class="el-icon-plus">新建群发</i>
          </el-button>
          <el-button type="primary" v-if="threeShow&&newmuban">
            <i class="el-icon-plus" @click="newModel">新建模板</i>
          </el-button>
          <!-- <el-button v-if="threeShow" @click="cateDiaShow" style="float:right;"><i class="el-icon-s-operation"></i>分类管理</el-button> -->
          <el-button class="btn font16-bold-3" :class="tabIndex==0?'tabClass':''" @click="tableOne">群发记录</el-button>
          <el-button class="btn font16-bold-3" :class="tabIndex==1?'tabClass':''" @click="tableTwo">群发审核</el-button>
          <el-button class="btn font16-bold-3" :class="tabIndex==2?'tabClass':''" @click="tableThree">群发模板</el-button>
          <el-link :underline='false' style="float:right;height: 40px;" v-if="deleteAll"><i class="el-icon-delete"
              @click="delAll">批量删除</i></el-link>
        </div>
      </div>
      <!-- <div class="rightBtns">
        <el-link :underline='false'><i class="el-icon-delete" @click="delAll">批量删除</i></el-link> -->
      <!-- <i class="el-icon-upload2 ml">导入</i>
        <i class="el-icon-download ml">导出</i> -->
      <!-- </div> -->
      <el-table :data="records" v-show="oneShow" @selection-change="oneSelection" stripe
        :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="短信内容" prop="content"></el-table-column>
        <!-- <el-table-column label="接收人" prop="receiver"></el-table-column> -->
        <el-table-column label="群发状态" prop="status" column-key="status" :filters="[
            { text: '已发送', value: '已发送' },
            { text: '发送失败', value: '发送失败' }
          ]" :filter-method="recordFilt"></el-table-column>
        <!-- <el-table-column labe--l="已发数量" prop="num"></el-table-column> -->

        <el-table-column label="提交时间" prop="create_time" sortable></el-table-column>
        <el-table-column label="发送时间" prop="update_time" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="openOneDetl(scope.row.id)">详情<i
                class="el-icon-arrow-right"></i></el-link>
            <el-link :underline='false' type='primary' class="ml20" @click="delRecord(scope.row.id)" v-if="deletequnfa">删除<i
                class="el-icon-delete"></i></el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="checks" v-show="twoShow" @selection-change="twoSelection" stripe
        :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column label="短信内容" prop="content"></el-table-column>
        <el-table-column label="接收人" prop="receiver"></el-table-column> -->
        <el-table-column label="群发状态" prop="status"></el-table-column>
        <el-table-column label="提交人员" prop="user_id" :filters="member" :filter-method="memChan">
        </el-table-column>
        <el-table-column label="发送时间" prop="create_time" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline='false' type='primary' @click="getCheckDetl(scope.row.id)">
              详情<i class="el-icon-arrow-right"></i></el-link>
            <el-link :underline='false' type='primary' class='ml20' @click="checkConf(scope.row.id)">
              确认<i class="el-icon-check"></i></el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="modelData" v-show="threeShow" @selection-change="threeSelection" stripe
        :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="短信内容" prop="content"></el-table-column>
        <el-table-column label="模板码" prop="code" :filters="tempCode" :filter-method="codeChan">
        </el-table-column>

        <el-table-column label="创建人" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="update_time" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-link :underline='false' type='primary' @click="getModeDetl(scope.row.id)">
              详情<i class="el-icon-arrow-right"></i></el-link>
            <el-link :underline='false' type='primary' class='ml20' @click="delTemplate(scope.row.id)" v-if="deletemuban"> 删除<i
                class="el-icon-delete delRed"></i></el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next"
        :total="oneShow?recordRes.total:(twoShow?willRes.total:modelRes.total)" class="busiPage"
        @current-change="pageChan">
      </el-pagination>
    </div>
    <router-view></router-view>
    <el-dialog :visible.sync="detlDia" title="短信内容">
      <el-form label-width="120px">
        <el-form-item label="模板名称:">
          {{modeDetl.name}}
        </el-form-item>
        <el-form-item label="模板code:">
          {{modeDetl.code}}
        </el-form-item>
        <el-form-item label="模板内容:">
          {{modeDetl.content}}
        </el-form-item>
        <el-form-item label="创建时间:">
          {{$http.getDate(modeDetl.update_time)}}
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="editMode" v-if="reedit">重新编辑</el-button>
        <el-button @click="detlDia=false">返回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建模板" :visible.sync="modelDia">
      <el-form>
        <el-form-item label='模板名称:'>
          <!-- <el-link type="primary">管理分类</el-link> -->
          <el-input v-model="model.name" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label='模板CODE:'>
          <el-input v-model="model.code" placeholder="格式：SMS_123456789" maxlength="13"></el-input>
        </el-form-item>
        <el-form-item label='模板内容:'>
          <el-input type="textarea" v-model="model.content" maxlength="255"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <div>模板内容不能多于65个字，当前已输入40个字</div>
          <div>
            <span>
              特别说明：
            </span>
            1、请不要在短信模板内容中填写特殊字符，包括换行符。
            2、短信模板内容不能多于65个字（其中空格、数字、字母、汉字均为一个字）
          </div>
        </el-form-item> -->
      </el-form>
      <div class="cateBtns">
        <el-button @click="canclSaveMod">取消</el-button>
        <el-button type="primary" @click="modelSave">确认保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="短信模板分类" :visible.sync="categoryDia">
      <div class="cateTop">
        分类名称:<el-input></el-input>
        <el-radio label="1" v-model="abledis">启用</el-radio>
        <el-radio label="2" v-model="abledis">禁用</el-radio>
        <el-button type="primary">确定新增</el-button>
      </div>
      <div>已保存分类名称: <i class='el-icon-delete cateDete'>删除</i> </div>
      <el-table :data="cateData" stripe :header-cell-style="$store.state.headStyle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="time"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-radio label="1" v-model="scope.row.abledis">启用</el-radio>
              <el-radio label="2" v-model="scope.row.abledis">禁用</el-radio>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="cateBtns">
        <el-button>取消</el-button>
        <el-button type="primary">确认保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="checkDetlDia" title="群发详情">
      <el-form>
        <el-form-item label='群发状态:'>{{checkDetl.status}}</el-form-item>
        <el-form-item label='提交人员:'>{{checkDetl.user_id}}</el-form-item>
        <el-form-item label='发送时间:'>{{checkDetl.create_time}}</el-form-item>
        <el-form-item label='短信内容:'>{{checkDetl.content}}</el-form-item>
        <el-form-item label='接收人:'>{{checkDetl.contact}}</el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="editCheck(checkDetl.id)">编辑</el-button>
        <el-button @click="delTwoDetl(checkDetl.id)" v-if="deletequnfa">删除</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="recordDetlDia" title="群发记录详情">
      <el-form label-width="120px">
        <el-form-item label="接受人:">
          {{recordDetl.contact}}
        </el-form-item>
        <el-form-item label="短信内容:">
          {{recordDetl.content}}
        </el-form-item>
        <el-form-item label="发送人:">
          {{recordDetl.user_id}}
        </el-form-item>
        <el-form-item label="发送时间:">
          {{recordDetl.update_time}}
        </el-form-item>
        <el-form-item label="发送状态:">
          {{recordDetl.status}}
        </el-form-item>
        <el-form-item label="提交时间:">
          {{recordDetl.create_time}}
        </el-form-item>
        <el-form-item label="审核人:">
          {{recordDetl.name}}
        </el-form-item>
        <el-form-item label="审核结果:">
          {{recordDetl.status}}
        </el-form-item>
        <el-form-item label="审核时间:">
          {{recordDetl.update_time}}
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="checkConf(recordDetl.id)">重新发送</el-button>
        <el-button @click="delRecord(recordDetl.id)" v-if="deletequnfa">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        recordDetl: '',
        recordDetlDia: false,
        tabIndex: 0,
        checkDetl: '',
        checkDetlDia: false,
        who: '',
        modeDetl: {
          name: '',
          code: '',
          content: '',
          update_time: ''
        },
        modelData: [],
        cateData: [{ name: '节日', time: '2019-02-03', abledis: '1' }],
        abledis: '1',
        categoryDia: false,
        modelDia: false,
        detlDia: false,
        oneShow: true,
        twoShow: false,
        threeShow: false,
        // dialogShow: false,
        records: [],
        checks: [],
        model: [],
        res: '',
        willRes: '',
        recordRes: '',
        modelRes: '',
        oneSeled: '',
        twoSeled: '',
        threeSeled: '',
        member: [],
        tempCode: []
      };
    },
    methods: {
      codeChan(value, row) {
        return value == row.code
      },
      memChan(value, row) {
        return value == row.user_id
      },
      getTempCode() {
        this.$http.get('message/indextemplate').then(res => {
          for (let i in res) {
            this.tempCode.push({ text: res[i].code, value: res[i].code })
          }
        })
      },
      getMember() {
        this.$http.get('user/index').then(res => {
          for (let i in res) {
            for (let j in res[i].user) {
              this.member.push({ text: res[i].label + '-' + res[i].user[j].name, value: res[i].user[j].name })
            }
          }
        })
      },
      delAll() {
        if (this.tabIndex == 0) {
          if (!this.oneSeled.length) {
            this.$message('请选择要删除的内容')
            return
          }
          this.$http.conf().then(() => {
            this.$http.post('message/delall', {
              id: this.getIdsStr(this.oneSeled)
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getRecord()
              }
            })
          })
        } else if (this.tabIndex == 1) {
          if (!this.twoSeled.length) {
            this.$message('请选择要删除的内容')
            return
          }
          this.$http.conf().then(() => {
            this.$http.post('message/delall', {
              id: this.getIdsStr(this.twoSeled)
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getWill()
              }
            })
          })
        } else if (this.tabIndex == 2) {
          if (!this.threeSeled.length) {
            this.$message('请选择要删除的内容')
            return
          }
          this.$http.conf().then(() => {
            this.$http.post('message/delalltemplate', {
              id: this.getIdsStr(this.threeSeled)
            }).then(res => {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getTemplate()
              }
            })
          })
        }
      },
      getIdsStr(arr) {
        let idsStr = ''
        for (let i in arr) {
          if (arr.length - 1 == i) {
            idsStr += arr[i].id
          } else {
            idsStr += arr[i].id + ','
          }
        }
        return idsStr
      },
      oneSelection(e) {
        console.log(e)
        this.oneSeled = e
      },
      twoSelection(e) {
        this.twoSeled = e
      },
      threeSelection(e) {
        this.threeSeled = e
      },
      sendAgain() { },
      openOneDetl(id) {
        this.recordDetlDia = true
        this.$http.get('message/look', {
          token: localStorage.getItem('token'),
          id: id
        }).then(res => {
          this.recordDetl = res
        })
      },
      delTwoDetl(id) {
        this.$http.post('message/del', { token: localStorage.getItem('token'), id: id }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.checkDetlDia = false
            if (this.tabIndex == 0) {
              this.getRecord()
            } else if (this.tabIndex == 1) {
              this.getWill()
            } else if (this.tabIndex == 2) {
              this.getTemplate()
            }
          }
        })
      },
      recordFilt(value, row) {
        return row.status === value
      },
      delRecord(id) {
        this.$http.conf().then(() => {
          this.recordDetlDia = false
          this.$http.get('message/del', { token: localStorage.getItem('token'), id: id }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getRecord()
              }
            }
          })
        })
      },
      pageChan(page) {
        if (this.oneShow) {
          this.getRecord(page)
        } else if (this.twoShow) {
          this.getWill(page)
        } else if (this.threeShow) {
          this.getTemplate(page)
        }
      },
      editCheck(id) {
        this.$router.push({ path: '/message/newMessage', query: { who: 'edit', id: id } })
        this.checkDetlDia = false
      },
      checkConf(id) {
        this.$confirm('是否确认群发短信？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('message/do', { token: localStorage.getItem('token'), id: id }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.recordDetlDia = false
                this.getWill()
              }
            }
          })
        })
      },
      getCheckDetl(id) {
        this.checkDetlDia = true
        this.$http.get('message/look', { token: localStorage.getItem('token'), id: id }).then(res => {
          this.checkDetl = res
        })
      },
      getWill(page) {
        this.$http.get('message/verify', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.checks = res.data
          this.willRes = res
        })
      },
      getRecord(page) {
        this.$http.get('message/already', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          this.records = res.data
          this.recordRes = res
        })
      },
      editMode() {
        this.who = 'edit'
        this.detlDia = false
        this.modelDia = true
        this.model = this.modeDetl
      },
      getModeDetl(id) {
        this.detlDia = true;
        this.$http.get('message/gettemplate', { id: id }).then(res => {
          this.modeDetl = res
        })
      },
      delTemplate(id) {
        this.$http.conf().then(() => {
          this.$http.post('message/deltemplate', {
            token: localStorage.getItem('token'),
            id: id
          }).then(res => {
            if (res) {
              this.$message(res.msg)
              if (res.code == 1) {
                this.getTemplate()
              }
            }
          })
        })
      },
      getTemplate(page) {
        this.$http.get('message/indextemplatepage', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
          for (let i in res.data) {
            res.data[i].update_time = this.$http.getDate(res.data[i].update_time)
          }
          this.modelData = res.data
          this.modelRes = res
        })
      },
      canclSaveMod() {
        this.modelDia = false
      },
      modelSave() {
        if (!this.model.name) {
          this.$message('请填写模板名称')
          return
        } else if (!this.model.code) {
          this.$message('请填写模板code')
          return
        } else if (!/^SMS\_\d{9}$/.test(this.model.code)) {
          this.$message('code格式错误')
          return
        } else if (!this.model.content) {
          this.$message('请填写模板内容')
          return
        }
        let api
        let reqBody = {
          token: localStorage.getItem('token'),
          name: this.model.name,
          code: this.model.code,
          content: this.model.content
        }
        if (this.who == 'edit') {
          api = 'message/edittemplate'
          reqBody.id = this.model.id
        } else {
          api = 'message/addtemplate'
        }
        this.$http.post(api, reqBody).then(res => {
          if (res) {
            this.$message(res.msg)
            if (res.code == 1) {
              this.modelDia = false
              this.who = ''
              this.getTemplate()
            }
          }
        })
      },
      cateDiaShow() {
        this.categoryDia = true
      },
      newModel() {
        this.modelDia = true
      },
      createNew() {
        this.$router.push("/message/newMessage");
      },
      toDetail() { },
      tableOne() {
        this.tabIndex = 0
        this.oneShow = true;
        this.twoShow = false;
        this.threeShow = false;
        this.getRecord()
      },
      tableTwo() {
        this.tabIndex = 1
        this.oneShow = false;
        this.twoShow = true;
        this.threeShow = false;
        this.getWill()
      },
      tableThree() {
        this.tabIndex = 2
        this.oneShow = false;
        this.twoShow = false;
        this.threeShow = true;
        this.getTemplate()
      }
    },
    watch: {
      $route() {
        this.getTemplate()
        this.getRecord()
        this.getWill()
        this.getMember()
        this.getTempCode()
      }
    },
    created() {
      this.newqunfa = this.$http.allow('新建群发')
      this.deletemuban = this.$http.allow('删除模板')
      this.deletequnfa = this.$http.allow('删除群发')
      this.deleteAll = this.$http.allow('批量删除模板')
      this.newmuban = this.$http.allow('新建模板')
      this.reedit = this.$http.allow('编辑模板')
      this.getTemplate()
      this.getRecord()
      this.getWill()
      this.getMember()
      this.getTempCode()
      this.$bus.$off()
      this.$bus.$on('getMessageList', () => {
        this.getWill()
        this.getTemplate()
        this.getRecord()
      })
    }
  };
</script>
<style lang="less" scoped>
  .message {
    text-align: left;
  }

  .btn {
    border: none;
    background: none !important;
  }

  .dialog {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    div {
      width: 24%;
      height: 50px;
    }
  }

  .rightBtns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .cateTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .cateTop>div:nth-of-type(1) {
    width: 250px;
  }

  .cateDete {
    float: right;
  }

  .cateBtns {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .tabClass {
    color: #409EFF;
  }

  .leftBtns {
    width: 100%;
  }
</style>