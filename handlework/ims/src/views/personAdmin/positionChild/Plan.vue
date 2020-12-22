<template>
    <div>
        <!-- <el-table
            ref="multipleTable"
            :data="planData"
            style="width: 100%;text-align:center"
            :default-sort="{prop: 'date', order: 'descending'}"
            border >
            <el-table-column
              width="55">
            </el-table-column>
            <el-table-column
              prop="label"
              label="职级名称"
              >
            </el-table-column>
            <el-table-column
              prop="rank"
              label="职级权限">
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="权限说明"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              class="btn">
              <template slot-scope="scope">
                <div @click="goNoticeDetail(tableData[scope.$index].id)">
                  <el-link type="primary"><i class="el-icon-edit"></i> 编辑</el-link>
                  <el-link
                    type="danger"
                    style="margin-left:20px;"><i class="el-icon-delete"></i> 删除
                  </el-link>
                </div>
              </template>
            </el-table-column>
        </el-table> -->
        <el-table
        :data="planData"
        style="width: 100%;text-align:center"
        >
        <el-table-column
          prop="label"
          label="职级名称"
         >
        </el-table-column>
        <el-table-column
          prop="rank"
          label="职级权限"
          >
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="权限说明">
        </el-table-column>
      </el-table>

        <!-- <el-dialog
          title="新增职级"
          :visible.sync="dialogTableVisible"
          width='600px'
          @close="closeDialog"
        >
          <el-form>
            <el-form-item
              label="职级名称"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="对应权限"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="rank"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="其他"
              :label-width="formLabelWidth"
            >
              <el-input
                type="textarea"
                v-model="auto"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="closeDialog">取 消</el-button>
            <el-button
              type="primary"
              @click="define">确 定</el-button>
          </div>
        </el-dialog> -->

    </div>
    
</template>
<script>
export default {
    props:{
        // planData:{
        //     type:Array
        // },
        dialogTableVisible:{
            type:Boolean
        }
    },
    data() {
      return {
        name:'',
        rank:'',
        auto:'',
        value:'',
        planData:[],
        formLabelWidth: "80px",
      }
    },
    methods: {
      define(){
        console.log(this.name)
        console.log(this.quanzhi)
        console.log(this.auto)

        // work/addrank  方法post 参数（label 职级名称rank 对应权限other 其他
        
      },
      closeDialog(){
          console.log('关闭')
            this.$emit('close')   
      },
    },
    created() {
        this.$http.get('work/indexrank',{
          // token:this.$token,
        }).then(res=>{
          console.log(res)
          this.planData = res
        })
    },
}
</script>