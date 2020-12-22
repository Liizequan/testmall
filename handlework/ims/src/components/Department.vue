<!--部门-->
<template>
    <div>
        <el-select v-model="department" placeholder="请选择" style="width:100%">
            <el-option v-for="(item,index) in departments" :key="index" :label="item.label || item.name" :value="item.id">
                <p @click="toParent(item)">{{item.name || item.label}} </p>
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data(){
      return{
        departments: [],//所有部门
        department: '',//部门
      }
    },
    created() {
        // 部门
        var _this = this;
        this.$http.get('index/structure').then(res=>{
        // console.log(JSON.parse(JSON.stringify(res)))
        _this.departments = res
        })
    },
    methods: {
        toParent(data){
            this.$emit('customer',data.id)
            
        }
    },
}
</script>