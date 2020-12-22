<template>
    <div>
        <div class="pages">
            
        </div>
    </div>
</template>
<script>
export default {
    props:{
        number:{
            type:Number,
            
        },
        array:{
            type:Array,
            default(){
                return []
            }
        },
        object:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data() {

    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },

}
</script>
<style lang="less" scoped>
    
</style>