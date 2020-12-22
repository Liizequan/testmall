<!--职位-->
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
    props: {
      departmentId: String
    },
    data(){
      return{
        departments: [],//所有部门
        department: '',//部门
      }
    },
    created() {
        // 部门
        this.$http.get('user/positions',{
            token:localStorage.getItem("token")
        }).then(res=>{
            this.departments = res
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
                this.$http.get('user/positions',{
                    token:localStorage.getItem("token")
                }).then(res=>{
                    this.departments = res
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