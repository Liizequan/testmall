<template>
    <div class='menRadio'>
        <el-popover placement="bottom-start" trigger="click" v-model="charPopo">
            <div>
                <slot name="title"></slot>
                <el-input placeholder="搜索成员" v-model="keyword" @input="search"></el-input>
                <el-menu>
                    <el-checkbox-group v-model="theRadio">
                        <el-submenu v-if="searchRes.length" index="999">
                            <template slot="title">
                                <div>
                                    搜索结果
                                </div>
                            </template>
                            <el-menu-item>
                                <el-checkbox v-for="item in searchRes" :key="item.user_id" :label="item.user_id">
                                    {{item.name}}
                                </el-checkbox>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu v-for="(item,index) in excuters" :key="index" :index="index+''">
                            <template slot="title">
                                <div>
                                    {{item.label}}
                                </div>
                            </template>
                            <el-menu-item>
                                <el-checkbox v-for="it in item.user" :key="it.user_id" :label="it.user_id">{{it.name}}
                                </el-checkbox>
                            </el-menu-item>
                        </el-submenu>
                    </el-checkbox-group>
                </el-menu>
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
                            this.$emit('theRes', { name: this.excuters[i].user[j].name, id: this.theRadio, depart: this.excuters[i].label })
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
        /* height: 300px;
        overflow-y: scroll; */
    }
</style>