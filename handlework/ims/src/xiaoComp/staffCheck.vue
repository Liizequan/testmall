<template>
    <div class='staffCheck'>
        <el-popover placement="bottom-start" trigger="click" v-model="excuPopo">
            <div>
                <slot name="title"></slot>
                <el-input placeholder="搜索成员" @change="searchMenber" v-model="memberKey"></el-input>
                <el-collapse accordion style="height:350px;border-bottom:0;overflow:auto;" class="xyk-scroll">
                    <el-collapse-item>
                        <template slot="title">
                            <div>
                                搜索结果
                            </div>
                        </template>
                        <div>
                            <el-checkbox-group v-model="searchSeled">
                                <ul style="display: flex;flex-direction:column;">
                                    <li style="height:30px;line-height: 30px;" v-for="(item,index) in memberRes"
                                        :key="index">
                                        <el-checkbox :label="item.user_id">{{item.name}}</el-checkbox>
                                    </li>
                                </ul>
                            </el-checkbox-group>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item v-for="(item,index) in excuters" :key="index">
                        <template slot="title">
                            {{item.label}}
                        </template>
                        <div>
                            <el-checkbox-group v-model="item.group" style="flex-direction: column;">
                                <el-checkbox v-for="it in item.user" :key="it.user_id" :label="it.user_id"
                                    style="display:block">
                                    {{it.name}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-collapse-item>
                </el-collapse>

                <div class="popoBtns">
                    <el-link :underline="false" @click="excuConf"><span class="popoCon">确定</span></el-link>
                    <el-link :underline="false" @click="excuPopo = false"><span>取消</span></el-link>
                </div>
            </div>
            <div slot="reference" style="width:100px;" class="Excu">
                <el-input placeholder="请选择执行人" v-model="excuter"></el-input>
            </div>
        </el-popover>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                memberKey: '',
                excuPopo:false
            }
        },
        methods: {
            excuConf(){
                console.log('我确定')
            },
            searchMenber() {
                this.$http.get('user/search', { name: this.memberKey }).then(res => {
                    this.memberRes = res
                })
            }
        },
        created() {
        },
        props:['excuters'],
    }
</script>
<style lang='less' scoped>
</style>