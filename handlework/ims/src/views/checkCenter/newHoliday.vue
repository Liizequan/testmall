<template>
  <div class="newHoliday">
    <h4>新建请假审批</h4>
    <div class="line_title">基础信息</div>
    <el-form label-width="120px" class="form_width">
      <el-form-item label="申请人:">
        <el-input v-model="req_man" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <!-- <el-input v-model="depart"></el-input> -->
        <!-- <el-select v-model="department" placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in departments" :key="index" :label="item.name" :value="item.id">
            {{item.name}}
          </el-option>
        </el-select> -->
        <Department @customer="getCustomerData" />
      </el-form-item>
      <el-form-item label="请假事项:" class="redStar">
        <el-select v-model="thing" class="el_date">
          <el-option v-for="(item,index) in leaves" :key="index" :label="item.name" :value="item.name">
            {{item.name}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请假事由:" class="redStar">
        <el-input type="textarea" :rows="8" v-model="reason" maxlength="255" placeholder='请填写请假事由'></el-input>
      </el-form-item>
      <!-- 时间修改start -->
      <el-form-item label="开始时间:" class="redStar">
        <el-date-picker style="width:50%;display:inline-block;" type="date" v-model="start_time" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" placeholder='请填写开始时间'>
        </el-date-picker>
        <div style="box-sizing:border-box;padding-left:10px;width:50%;display:inline-block;">
          <el-radio v-model="startradio" :label="1">一天</el-radio>
          <el-radio v-model="startradio" :label="2">半天</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="结束时间:" class="redStar">
        <el-date-picker type="date" v-model="end_time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          style="width:50%;display:inline-block;" placeholder='请填写结束时间'>
        </el-date-picker>
        <div v-if="days!=1" style="box-sizing:border-box;padding-left:10px;width:50%;display:inline-block;">
          <el-radio v-model="endradio" :label="1">一天</el-radio>
          <el-radio v-model="endradio" :label="2">半天</el-radio>
        </div>
      </el-form-item>
      <!-- 时间修改end-->
      <el-form-item label="请假天数:">
        <el-input v-model="realdays" disabled placeholder='请假天数'></el-input>
      </el-form-item>
      <el-form-item label="审批人:" class="redStar">
        <Approval :approvalId="approvalId" @approData="getApproData" :width='parseInt(250)' :placement='placement' />
      </el-form-item>
      <el-form-item label="抄送:">
        <Approval :approvalId="approvalId" @approData="getApproDatacao" :width='parseInt(250)' :placement='placement' />
      </el-form-item>
    </el-form>
    <div class="btm_btns">
      <el-button type="primary" @click="Approval">提交</el-button>
      <el-button type="primary" @click="tempSave">暂存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import Department from "@/components/table/Departmentnoall.vue";
  import Approval from "@/components/staff/radio.vue";
  export default {
    components: {
      Department,
      Approval
    },
    data() {
      return {
        // 时间修改start
        realdays: 0,
        startradio: 1,
        endradio: 1,
        // 时间修改end
        departments: [],//所有部门
        department: '',//部门
        req_man: "",//申请人
        depart: "",
        thing: "",//请假事项数据
        leaves: [],//请假事项
        reason: "",//请假事由
        start_time: "",
        end_time: "",
        days: "",
        approval: "",//审批人
        approvalcao: "",//抄送
        placement: 'right',//弹框显示的位置
        approvalId: null,//审批人
      };
    },
    watch: {
      // 时间修改start
      startradio() {
        if (this.days == 1) {
          if (this.startradio == 1) {
            this.realdays = 1
          } else {
            this.realdays = 0.5
          }
        } else {
          let kaishi
          let jieshu
          if (this.startradio == 1) {
            kaishi = 1
          } else {
            kaishi = 0.5
          }
          if (this.endradio == 1) {
            jieshu = 1
          } else {
            jieshu = 0.5
          }
          this.realdays = this.days - 2 + kaishi + jieshu
        }
      },
      endradio() {
        let kaishi
        let jieshu
        if (this.startradio == 1) {
          kaishi = 1
        } else {
          kaishi = 0.5
        }
        if (this.endradio == 1) {
          jieshu = 1
        } else {
          jieshu = 0.5
        }
        this.realdays = this.days - 2 + kaishi + jieshu
      },
      days() {
        if (this.days == 1) {
          if (this.startradio == 1) {
            this.realdays = 1
          } else {
            this.realdays = 0.5
          }
        } else {
          let kaishi
          let jieshu
          if (this.startradio == 1) {
            kaishi = 1
          } else {
            kaishi = 0.5
          }
          if (this.endradio == 1) {
            jieshu = 1
          } else {
            jieshu = 0.5
          }
          this.realdays = this.days - 2 + kaishi + jieshu
        }
      },
      // 时间修改end
      start_time() {
        console.log(this.start_time, this.end_time)
        if (this.end_time) {
          this.days = this.$http.getDays(this.start_time, this.end_time)
          if (this.days < 1 || this.end_time < this.start_time) {
            this.$message('时间有误')
          }
        }
      },
      end_time() {
        console.log(this.start_time, this.end_time)
        if (this.start_time || this.end_time < this.start_time) {
          this.days = this.$http.getDays(this.start_time, this.end_time)
          if (this.days < 1) {
            this.$message('时间有误')
          }
        }
      }
    },
    methods: {

      //部门
      getCustomerData(val) {
        console.log(val)
        this.department = val//
      },
      getApproData(data) {
        this.approval = data
      },
      getApproDatacao(data) {
        this.approvalcao = data
      },
      tempSave() {
        this.$http.post('approval/add', {
          structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
          matter: this.thing,
          reason: this.reason,
          begin_time: this.start_time,
          end_time: this.end_time,
          approval: this.approval.user_id ? this.approval.user_id : '',
          copy: this.approvalcao.user_id ? this.approvalcao.user_id : '',
          day: this.days,
          //  new Date(this.end_time).getDate()-new Date(this.start_time).getDate(),
          type: 2,
          is_storage: 1
        }).then(res => {
          this.$message(res.msg)
        })
      },
      Approval() {
        if (!this.thing) {
          return this.$message('请选择请假事项')
        }
        if (!this.reason) {
          return this.$message('请填写请假事由')
        }
        if (!this.start_time) {
          return this.$message('请选择开始时间')
        }
        if (!this.end_time) {
          return this.$message('请选择结束时间')
        }
        if (this.days < 1) {
          return this.$message('时间有误')
        }
        if (!this.approval) {
          this.$message('请选择审批人')
        }
        // if (!this.approvalcao) {
        //   this.$message('请选择抄送')
        // }
        var url = '',
          data = {
            token: localStorage.getItem('token'),
            structure: JSON.parse(localStorage.getItem('login_status')).info.structure_id,
            matter: this.thing,
            reason: this.reason,
            begin_time: this.start_time,
            end_time: this.end_time,
            approval: this.approval.user_id ? this.approval.user_id : '',
            copy: this.approvalcao.user_id ? this.approvalcao.user_id : '',
            day: new Date(this.end_time).getDate() - new Date(this.start_time).getDate(),
            type: 2,
            is_storage: 0
          };
        if (this.$route.query.id) {
          url = 'approval/edit'
          data = Object.assign({ id: this.$route.query.id }, data)
        } else {
          url = 'approval/add'
        }

        this.$http.post(url, data).then(res => {
          console.log(res)
          if (res.code == 1) {
            this.back()
            this.$message({
              message: res.msg,
              type: 'success'
            });
          } else {
            this.$message({
              // message: '提交失败，请检查数据是否有误',
              message:res.msg,
              type: 'warning'
            });
          }
        }).catch(res => {
          this.$message.error('请求失败');
        })
      },
      detailData(id) {
        this.applicationId = parseInt(id)
        this.$http.get('approval/look', {
          // token:this.$token,
          id: id
        }).then(res => {
          console.log(res)
          this.reason = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
          this.start_time = res.begin_time;
          this.end_time = res.end_time;
          this.days = res.day
          this.thing = res.matter
          this.approvalId = parseInt(res.approval)
        })
      },
    },
    created() {
      // 部门
      if (this.$route.query.id) {
        this.detailData(this.$route.query.id)
      }
      this.req_man = JSON.parse(localStorage.getItem('login_status')).info.name
      var _this = this;
      this.$http.get('index/structure').then(res => {
        console.log(res)
        _this.departments = res
      })
      this.$http.get('approval/type').then(res => {
        console.log(res)
        _this.leaves = res
      })
      this.$http.get('approval/check', { type: 2 }).then(res => {
        if (res.code == 1) {
          res = res.msg
          this.reason = res.reason
          this.approvalId = parseInt(res.approval)
          this.approval = res.approval;
          this.start_time = res.begin_time;
          this.end_time = res.end_time;
          this.days = res.day
          this.thing = res.matter
          this.approvalId = parseInt(res.approval)
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  .newHoliday {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
  }
</style>