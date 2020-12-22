<template>
    <div>
        <el-table stripe
        :header-cell-style="$store.state.headStyle"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;text-align:center"
            :default-sort="{prop: 'date', order: 'descending'}"
            >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="label"
              label="职位名称"
              placeholder="请填职位名称（10字之内）"
              >
            </el-table-column>
            <el-table-column
              prop="structure"
              label="所属部门">
            </el-table-column>
            <el-table-column
              prop="name"
              label="对应职级"
              >
            </el-table-column>
            <el-table-column
              label="对应权限"
              prop="rank"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              class="btn"
              v-if="deletePosition">
              <template slot-scope="scope">
                  <!-- style="margin-left:20px;" <el-link type="primary" @click="goNoticeDetail(tableData[scope.$index])">编辑<i class="el-icon-edit"></i> </el-link> -->
                  <el-link type="primary" @click="NoticeDelete(tableData[scope.$index].id)">删除<i class="el-icon-delete"></i> 
                  </el-link>
              </template>
            </el-table-column>
          </el-table>
    
    
        
    
        <!-- 职为管理弹框 -->
        <el-dialog :title="isTitle" :visible.sync="dialog"  width='600px' @close="closeDialog">
            <el-form>
                <el-form-item label="职位名称" :label-width="formLabelWidth" >
                <el-input v-model="name" autocomplete="off" placeholder="请填职位名称（10字之内）" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item  label="所属部门"  :label-width="formLabelWidth" >
                  <Department @customer="getDeparData"/>
                </el-form-item>
                <el-form-item label="对应职级" :label-width="formLabelWidth">
                  <Rank @customer="getRinkData"/>
                </el-form-item>
                <!-- <el-form-item label="对应权限" :label-width="formLabelWidth">
                  <Position @customer="getPositionData"/>
                </el-form-item> -->
            </el-form>
            <div slot="footer"  class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button
                type="primary"
                @click="define"
                >确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>

import Department from "@/components/table/Department.vue";
import Rank from "@/components/table/Rank.vue";
import Position from "@/components/table/Position.vue";

export default {
    components:{
      Department,
      Rank,
      Position
    },
    props:{
        tableData:{
            type:Array
        },
        dialog:{
            type:Boolean
        },
        isTitle:{
          type:String
        }
        
    },
    data() {
        return {
            formLabelWidth: "80px",
            cities: [{ label: "3435", value: "353" }],
            value:'',
            name:'',
            structure:'',
            word:'',
            rank:'',
            
        }
    },
    methods: {
        //删除
        NoticeDelete(val) {
          console.log(val)
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('work/del',{
              // token:this.$token,
              id:val
            }).then(res=>{
              console.log(res)
              this.$message(res.msg)
              if(res.code == 1){
                console.log('刷新数据')
                this.$emit('load','isload')
              }
            })
          }).catch(() => {});
        },
        goNoticeDetail(val){
            this.name = val.label
            this.isTitle = '编辑职务'
            this.dialog = true
            localStorage.setItem('helloworld',JSON.stringify(val))
            this.$bus.$emit('helloworld')
            this.structure = val.structure_id
            this.rank = val.rank
        },
        closeDialog(){
          console.log('关闭')
          this.dialog = false
          this.$emit('close')   
        },
        // 获取部门数据
        getDeparData(val){
          console.log(val)
          this.structure = val
        },
        // 获取级别数据
        getRinkData(val){
          console.log(val)
          this.rank = val
        },
        // 获取职务数据
        getPositionData(val){
          console.log(val)
          this.word = val
        },
        // 添加
        define(){
          if(!this.name){
            return this.$message('职位名称不能为空')
          }
          if(!this.structure){
            return this.$message('所属部门不能为空')
          }
          if(!this.rank){
            return this.$message('对应职级不能为空')
          }
          // work/add
          this.$http.post('work/add',{
            // token:this.$token,
            label:this.name,
            structure:this.structure,
            // word:this.word,
            rank:this.rank
          }).then(res=>{
            console.log(res)
            this.$message(res.msg);
            if(res.code == 1){
              this.$emit('close')   
              this.dialog = false
            }
          })
        }
    },
    created() {
      this.deletePosition = this.$http.allow('删除职务')
    },
}
</script>