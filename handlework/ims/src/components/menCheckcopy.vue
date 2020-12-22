<template>
    <!-- 公司员工popover弹窗，可用 -->
    <div class='menRadio'>
        <el-popover placement="bottom-start" trigger="click" v-model="charPopo">
            <div>
                <slot name="title"></slot>
                <el-input placeholder="搜索成员" v-model="keyword" @input="search"></el-input>
                <el-collapse>
                    <el-checkbox-group v-model="theRadio" class="xyk-scroll">
                        <el-collapse-item>
                            <template slot="title">
                                <div>
                                    搜索结果
                                </div>
                            </template>
                            <div style="display: flex;flex-direction: column;">
                                <ul>
                                    <li v-for="item in searchRes" :key="item.user_id">
                                        <el-checkbox :label="item.user_id">
                                            {{item.name}}
                                        </el-checkbox>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item v-for="(item,index) in excuters" :key="index">
                            <template slot="title">
                                <div>
                                    {{item.label}}
                                </div>
                            </template>
                            <div style="display: flex;flex-direction: column;">
                                <ul>
                                    <li v-for="it in item.user" :key="it.user_id">
                                        <el-checkbox :label="it.user_id">{{it.name}}
                                        </el-checkbox>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-checkbox-group>
                </el-collapse>
                <div class="popoBtns">
                    <span class="popoCon" @click="charConf">确定</span>
                    <span @click="closePopo">取消</span>
                </div>
            </div>
            <div slot="reference">
                <slot name="main"></slot>
            </div>
        </el-popover>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                charPopo: false,
                theRadio: [],
                keyword: '',
                searchRes: ''
            }
        },
        props: ['excuters'],
        methods: {
            closePopo() {
                this.charPopo = false
            },
            charConf() {
                // console.log(this.theRadio)
                this.charPopo = false
                let list = []
                // for (let i in this.excuters) {
                //     for (let j in this.excuters[i].user) {
                //         if (this.excuters[i].user[j].user_id == this.theRadio) {
                //             this.$emit('theRes', { name: this.excuters[i].user[j].name, id: this.theRadio, depart: this.excuters[i].label ,departId:this.excuters[i].id})
                //         }
                //     }
                // }
                for (let i in this.excuters) {
                    for (let j in this.excuters[i].user) {
                        for(let m in this.theRadio){
                            if (this.excuters[i].user[j].user_id == this.theRadio[m]) {
                                list.push({ name: this.excuters[i].user[j].name, id: this.theRadio[m], depart: this.excuters[i].label ,departId:this.excuters[i].id})
                            }
                        }
                    }
                }
                this.$emit('theRes', list)
            },
            search() {
                this.$http.get('user/search', { token: localStorage.getItem('token'), name: this.keyword }).then(res => {
                    this.searchRes = res
                })
            }
        },
        created() {
        }
    }
</script>
<style lang='less' scoped>
    .el-menu {
        border-right: none;
    }

    .el-radio-group {
        width: 100%;
    }

    .popoBtns {
        text-align: right;
    }

    .popoCon {
        color: #44bcf0;
        margin-right: 6px;
    }

    .el-radio-group {
        height: 300px;
        overflow-y: scroll;
    }

     /deep/.el-menu .el-menu--inline{
        height: 300px;
        overflow-y: scroll;
    }
    /*label{
        display: block;
    } */
    /deep/.el-checkbox-group{
        height: 300px !important;
        overflow-y:scroll !important;
    }
</style>