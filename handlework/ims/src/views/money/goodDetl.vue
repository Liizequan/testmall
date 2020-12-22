<template>
  <div class="goodDetl contain">
    <div class="topBtns">
      <h4>{{res.name}} {{res.model}}</h4>
      <div>
        <el-button type="primary" @click="getout">出库</el-button>
        <el-button type="primary" @click="editDialogShow = true">编辑</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </div>
    <div class="table">
      <el-row>
        <!-- <el-col>序号</el-col> -->
        <el-col>编码</el-col>
        <el-col>物品</el-col>
        <el-col>数量</el-col>
        <el-col>单位</el-col>
        <el-col>型号</el-col>
        <el-col>单价</el-col>
        <el-col>总价</el-col>
        <el-col>最后更新时间</el-col>
        <el-col>备注</el-col>
      </el-row>
      <el-row>
        <!-- <el-col>{{res.num}}</el-col> -->
        <el-col>{{res.no}}</el-col>
        <el-col>{{res.name}}</el-col>
        <el-col>{{res.num}}</el-col>
        <el-col>{{res.unit}}</el-col>
        <el-col>{{res.model}}</el-col>
        <el-col>{{res.price}}</el-col>
        <el-col>{{res.num*res.price}}</el-col>
        <el-col>{{res.update_time}}</el-col>
        <el-col>{{res.remark}}</el-col>
      </el-row>
    </div>
    <h4 class="record" v-if="tempLine&&tempLine.length">变更记录</h4>
    <el-timeline>
      <el-timeline-item v-for="(item, index) in tempLine" :timestamp="item.create_time" :key="index">
        {{ item.user + " " + item.type+" "+item.name+" 数量："+item.num}}
      </el-timeline-item>
    </el-timeline>
    <el-link type="primary" @click="showMore" v-if="moreShow&&res.record&&res.record.length>4">查看更多>></el-link>
    <el-dialog :visible.sync="getoutDialogShow" title="出库">
      <el-form label-width="120px">
        <el-form-item label="出库数量：">
          <el-input placeholder="请输入本产品的出库数量" maxlength="10" v-model="outNumber"
            @input="outNumber = outNumber.replace(/\D/,'')"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="getoutConfirm">确定</el-button>
          <el-button @click="getoutDialogShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editDialogShow" title="编辑">
      <el-form label-width="120px">
        <el-form-item label="编码:" class="redStar">
          <el-input maxlength="20" v-model="inForm.no" placeholder="相同物品编码需相同，系统以编码来区分归类物品"></el-input>
        </el-form-item>
        <el-form-item label="物品名称:" class="redStar">
          <el-input maxlength="15" v-model="inForm.name" placeholder='请输入物品名称'></el-input>
        </el-form-item>
        <el-form-item label="型号:" class="">
          <el-input maxlength="20" v-model="inForm.model" placeholder='请输入物品型号'></el-input>
        </el-form-item>
        <el-form-item label="数量:" class="redStar">
          <el-input v-model="inForm.num" maxlength="10" placeholder='请输入数量'></el-input>
        </el-form-item>
        <el-form-item label="单位:" class="redStar">
          <el-input v-model="inForm.unit" maxlength="1" placeholder='请输入单位'></el-input>
        </el-form-item>
        <el-form-item label="单价:" class="">
          <el-input v-model="inForm.price" maxlength="10" placeholder='请输入单价'></el-input>
        </el-form-item>
        <el-form-item label="入库时间:" class="redStar">
          <el-date-picker suffix-icon="el-icon-date" class="el_date" v-model="inForm.update_time" placeholder='请选择'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" class="">
          <el-input type="textarea" v-model="inForm.remark" maxlength="255" placeholder='请填写备注'></el-input>
        </el-form-item>
      </el-form>
      <div class="tac">
        <el-button type="primary" @click="editInputStoreConfirm">确定</el-button>
        <el-button @click="editDialogShow = false">取消</el-button>
      </div class="tac">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inForm: {
          // code: '',
          // name: '',
          // model: '',
          // num: '',
          // unit: '',
          // price: '',
          // time: '',
          // attachmentlanguage: '',
        },
        editDialogShow: false,
        getoutDialogShow: false,
        moreShow: true,
        id: '',
        tableData: [
        ],
        res: '',
        outNumber: '',
        tempLine: [],
        lines: [
          {
            man: "行政文员-陈先生",
            detail: "入库黑色签字笔 50支",
            time: "2019.12.23"
          },
          {
            man: "行政文员-陈先生",
            detail: "入库黑色签字笔 50支",
            time: "2019.12.23"
          },
          {
            man: "行政文员-陈先生",
            detail: "入库黑色签字笔 50支",
            time: "2019.12.23"
          },
          {
            man: "行政文员-陈先生",
            detail: "入库黑色签字笔 50支",
            time: "2019.12.23"
          }
        ]
      };
    },
    methods: {
      editInputStoreConfirm(){
        if (!this.inForm.no) {
          this.$message('请填写编码')
          return
        }else if(this.$re.hasCc(this.inForm.no)){
          this.$message('编码不能有中文')
          return
        }
        if (!this.inForm.name) {
          this.$message('请填写物品名称')
          return
        }
        if (!this.inForm.num) {
          this.$message('请填写数量')
          return
        }
        else if(!this.$re.onlyNum(this.inForm.num)){
          this.$message('数量有误')
          return
        }
        if (!this.inForm.unit) {
          this.$message('请填写单位')
          return
        }else if(!this.$re.onlyCc(this.inForm.unit)){
          this.$message('单位只能有中文')
          return
        }
        if (!this.inForm.update_time) {
          this.$message('请填写入库时间')
          return
        }
        this.$http.post('warehouse/editInputStore', {
          id:this.id,
          no: this.inForm.code,
          name: this.inForm.name,
          num: this.inForm.num,
          unit: this.inForm.unit,
          model: this.inForm.model,
          price: this.inForm.price,
          create_time: this.inForm.update_time,
          remark: this.inForm.remark
        }).then(res => {
          if (res.code == 1) {
            this.editDialogShow = false
            this.getList()
          }
          this.$message(res.msg)
        })
      },
      getoutConfirm() {
        console.log(this.outNumber>this.res.num)
        if (!this.outNumber) {
          return this.$message('请填写出库数量')
        }else if(this.outNumber>this.res.num){
          return this.$message('出库数量不能大于库存数量')
        }
        this.$http.post('warehouse/getout', {
          goods_id: this.id,
          out_num: this.outNumber
        }).then(res => {
          this.$message(res.msg)
          if (res.code == 1) {
            this.getoutDialogShow = false
            this.getList()
          }
        })
      },
      getout() {
        this.getoutDialogShow = true
      },
      back() {
        this.$router.back();
      },
      getList() {
        this.$http.get('warehouse/look', { token: localStorage.getItem('token'), id: this.id }).then(res => {
          this.res = res.msg
          this.inForm = this.res
          this.tempLine = res.msg.record.slice(0, 4)
        })
      },
      showMore() {
        this.tempLine = this.res.record
        this.moreShow = false
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getList()
    }
  };
</script>
<style lang="less" scoped>
  .goodDetl {
    text-align: left;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: 100%;
  }

  .record {
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
    margin-bottom: 20px;
  }

  .table {
    border: 1px solid #ccc;
    text-align: center;
    margin: 10px 0;
  }

  .el-row {
    display: flex;
    line-height: 40px;

    .el-col {
      flex: 1;
      border-right: 1px solid #ccc;
    }

    .el-col:nth-last-of-type(1) {
      border: none;
    }
  }

  .el-row:nth-of-type(1) {
    border-bottom: 1px solid #ccc;
  }
</style>