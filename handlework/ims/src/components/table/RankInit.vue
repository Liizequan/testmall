<!--职级-->
<template>
    <div>
        <el-select v-model="department" placeholder="请选择" style="width:100%">
            <el-option v-for="(item,index) in departments" :key="index" :label="item.label || item.name" :value="item.id">
                <p @click="toParent(item)">{{item.name || item.label}} （{{item.rank}}）</p>
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props: {
      departmentId: String,
      department:'',
    },
    data(){
      return{
        departments: [],//所有部门
        // department: '',//部门
      }
    },
    created() {
        // 部门
        this.$http.get('user/rank',{
            token:localStorage.getItem("token")
        }).then(res=>{
            this.departments = res
            if(this.departmentId){
                for(var i of res){
                    // console.log(JSON.parse(JSON.stringify(i)))
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
            this.$emit('alow',data.allow)
        }
    },
    watch: {
        departmentId(newValue,oldValue){
            if(newValue != oldValue){
                // console.log('旧值和新值一样')
                this.$http.get('user/rank',{
                    token:localStorage.getItem("token")
                }).then(res=>{
                    // console.log('加载一')
                    // console.log(res)
                    this.departments = res
                    if(this.departmentId){
                        for(var i of res){
                            // console.log(JSON.parse(JSON.stringify(i)))
                            if(this.departmentId == i.label){
                                this.department = i.id
                                this.$emit('customer',i.id)
                                this.$emit('alow',i.allow)
                            }
                        }
                    }
                })
            }
        }
    },
}
</script>