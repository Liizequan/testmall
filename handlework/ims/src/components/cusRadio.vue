<template>
    <div class='cusRadio'>
        <el-popover placement="bottom-start" trigger="click" v-model="popoVisi">
            <div>
                <slot name="title"></slot>
                <el-input placeholder="搜索成员" v-model="searchVal" @change="searchCus"></el-input>
                <el-menu>
                    <el-radio-group v-model="theRadio" class="xyk-scroll" style="height:300px; overflow:auto">
                        <el-collapse accordion>
                            <el-collapse-item>
                                <template slot="title">
                                    <div>
                                        搜索结果
                                    </div>
                                </template>
                                <div>
                                    <ul style="display: flex;flex-direction:column;">
                                        <li style="height:30px;line-height: 30px;" v-for="item in searchRes"
                                            :key="item.id">
                                            <el-radio :label="item.id">{{item.name}}</el-radio>
                                        </li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item v-for="(item,index) in customs" :key="index">
                                <template slot="title">
                                    {{item.name}}
                                </template>
                                <div>
                                    <ul class="">
                                        <li v-for="it in item.customer" :key="it.id"
                                            style="height:30px;line-height: 30px;">
                                            <el-radio :label="it.id">{{it.name}}</el-radio>
                                        </li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-radio-group>
                </el-menu>
                <div class="popoBtns">
                    <el-link :underline="false" @click="confirm"><span class="popoCon">确定</span></el-link>
                    <el-link :underline="false" @click="popoVisi = false"><span>取消</span></el-link>
                </div>
            </div>
            <div slot="reference" style="width:100px;">
                <slot name="main"></slot>
            </div>
        </el-popover>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                popoVisi: false,
                searchVal: '',
                searchRes: [],
                theRadio: '',
                radioChan: '',
                finalRes: ''
            }
        },
        props: ['customs'],
        methods: {
            searchCus() {
                if (this.searchVal) {
                    this.$http.get('/marketing/serach', { keyword: this.searchVal }).then(res => {
                        this.searchRes = res
                    })
                } else {
                    this.searchRes = []
                }
            },
            confirm() {
                this.popoVisi = false
                for (let i in this.customs) {
                    for (let j in this.customs[i].customer) {
                        if (this.customs[i].customer[j].id == this.theRadio) {
                            this.finalRes = { id: this.theRadio, name: this.customs[i].customer[j].name }
                        }
                    }
                }
                this.$emit('setRes', this.finalRes)
            }
        },
        created() {
        }
    }
</script>
<style lang='less' scoped>
    .cusRadio {
        width: 100% !important;
    }

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
    .el-popover__reference{
        width:100% !important;
    }
</style>