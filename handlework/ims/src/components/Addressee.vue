<template>
    <div>
        <div class="elastic-slot">
            <div class="left">
                <div class="search">
                    联系人：
                </div>
                <div class="left-box">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="filterText">
                    </el-input>
                    <div class="container font14-nobold-6">
                        <!-- 最近联系人 -->
                        <div class="lately">
                            <div class="lately-txt between">
                                <span>最近联系人</span>
                                <span @click="deleteStroge">清空</span>
                            </div>
                            <ul>
                                <li v-for="(item,index) in latelys" :key="index" @click="contacts(item)" class="lately-list"  :class="[latelyIndex == index ? 'active' : '']">
                                    <a href="javascript:;">{{item.name}}</a>
                                </li>
                            </ul>
                        </div>
                        <!-- 所有人 -->
                        <div class="lately">
                            <el-collapse v-model="activeNames" @change="handleChange">
                                <div v-for="(item,index) in allLately" :key="index">
                                    <el-collapse-item :title="item.text" :name="index">
                                        <div v-for="(items,index) in item.latelys" style="padding:0 10px;" class="lately-lists" :key="index" @click="contacts(items)">
                                            <a  class="font14-nobold-6" href="javascript:;">{{items.name}}</a>
                                        </div>
                                    </el-collapse-item>
                                </div>
                            </el-collapse>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center">
                <i class="el-icon-right"></i>
            </div>
            <div class="right">
                收件人：
                <div class="right-box">
                    <div class="container">
                        <ul class="right-box-ul">
                            <li v-for="(item,index) in rightLatelys" :key="index" class="between">
                                <a href="javascript:;" :class="[latelyIndex == index ? 'active' : '']">{{item.name}}</a>
                                <i class="el-icon-remove-outline" @click="deteleContacts(index)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn">
            <el-button type='primary' @click="submitLately">确定</el-button>
            <el-button @click="cancelLately">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    

}
</script>
<style lang="less" scoped> 
    
</style>