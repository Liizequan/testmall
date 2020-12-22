<template>
    <!-- 公司员工popover弹窗，可用 -->
    <div class='menRadio'>
        <el-popover placement="bottom-start" trigger="click" v-model="charPopo">
            <div>
                <slot name="title"></slot>
                <el-input placeholder="搜索成员" v-model="keyword" @input="search"></el-input>
                <el-collapse>
                    <el-radio-group v-model="theRadio" class="xyk-scroll">
                        <el-collapse-item>
                            <template slot="title">
                                <div>
                                    搜索结果
                                </div>
                            </template>
                            <div style="display: flex;flex-direction: column;">
                                <ul>
                                    <li v-for="item in searchRes" :key="item.user_id">
                                        <el-radio :label="item.user_id">
                                            {{item.name}}
                                        </el-radio>
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
                                        <el-radio :label="it.user_id">{{it.name}}
                                        </el-radio>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-radio-group>
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
                theRadio: '',
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
                this.charPopo = false
                for (let i in this.excuters) {
                    for (let j in this.excuters[i].user) {
                        if (this.excuters[i].user[j].user_id == this.theRadio) {
                            this.$emit('theRes', { name: this.excuters[i].user[j].name, id: this.theRadio, depart: this.excuters[i].label ,departId:this.excuters[i].id})
                        }
                    }
                }
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

    /* /deep/.el-menu .el-menu--inline{
        overflow-y: scroll;
    }
    label{
        display: block;
    } */
</style>