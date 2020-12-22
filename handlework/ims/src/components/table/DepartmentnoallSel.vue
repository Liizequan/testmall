<!--部门-->
<template>
    <div>
        <el-select v-model="structure" placeholder="请选择" style="width:100%">
            <el-option v-for="(item,index) in departments" :key="index" :label="item.label || item.name" :value="item.id">
                <p @click="toParent(item)">{{item.name || item.label}} </p>
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props: {
      departmentId: String,
      structure:''
    },
    data(){
      return{
        departments: [],//所有部门
        department: '',//部门
      }
    },
    // props:['structureId'],
    computed: {
    },
    created() {
        this.structure = JSON.parse(localStorage.getItem('login_status')).info.structure_id
        // 部门
        this.$http.get('index/structure').then(res=>{
            this.departments = res.slice(1)
            if(this.departmentId){
                for(var i of res){
                    if(this.departmentId == i.label){
                        this.department = i.id
                    }
                }
            }
        })
    },
    methods: {
        toParent(data){
            this.$emit('customer',data.id)
            this.$emit('department',data)
        }
    },
    watch: {
        departmentId(newValue,oldValue){
            if(newValue != oldValue){
                this.$http.get('index/structure').then(res=>{
                    this.departments = res.slice(1)
                    if(this.departmentId){
                        for(var i of res){
                            if(this.departmentId == i.label){
                                this.department = i.id
                                this.$emit('customer',i.id)
                            }
                        }
                    }
                })
            }
        }
    },
}
</script>