<template>
    <!-- 尾部 -->
    <div>
        <div class="footer">
            <table>
                <tr>
                    <th>商务办公</th>
                    <th>工商代理</th>
                    <th>财税服务</th>
                    <th>政府补贴</th>
                    <th>上市辅导</th>
                </tr>
                <tr>
                    <td><router-link to="/affairs">户型推荐</router-link></td>
                    <td><router-link to="/business">公司注册</router-link></td>
                    <td><router-link to="/finance">代理记账</router-link></td>
                    <td><router-link to="/government">高企育培</router-link></td>
                    <td><router-link to="/market">新四板挂牌</router-link></td>
                </tr>
                <tr>
                    <td rowspan="3"><router-link to="/affairs">注册选址</router-link></td>
                    <td><router-link to="/business">公司转让</router-link></td>
                    <td><router-link to="/finance">审计服务</router-link></td>
                    <td><router-link to="/government">高企认定</router-link></td>
                    <td><router-link to="/market">新三板挂牌</router-link></td>
                </tr>
                <tr>
                    <td><router-link to="/business">公司变更</router-link></td>
                    <td><router-link to="/finance">税务服务</router-link></td>
                    <td><router-link to="/government">科技小巨人</router-link></td>
                    <td><router-link to="/market">国内IPO</router-link></td>
                </tr>
                <tr>
                    <td colspan="3"><router-link to="/business">许可证办理</router-link></td>
                    <td><router-link to="/market">香港IPO</router-link></td>
                </tr>
            </table>  
            <div class="footer-lihao">
                <p><i><img src="../image/lihao.png" alt=""></i></p>
                <p class="footer-lihao-text">扫描二维码 关注更多信息</p>
            </div>   
            <div class="footer-right">
                <div class="footer-right-contact">
                    <p>全国免费服务热线</p>
                    <p class="red">020 8201-6711</p>
                </div>
                 <div class="footer-right-contact footer-right-two">
                    <p>业务总监联系方式</p>
                    <p class="red">134 1111 3429</p>
                </div>
                <div class="footer-right-conpany">
                    <p>广州浮点动力科技服务有限公司</p>
                    <p>地址：广州市黄埔区开创大道108号锦昊智樽仺217号</p>
                </div>
                <div class="footer-right-small">
                    <i><img src="../image/qq.png" alt=""></i>
                    <i><img src="../image/wx.png" alt=""></i>
                </div>
            </div>
        </div>     
        <div class="footer-bottom">
            <div class="footer-bottom-flex">
                <p>Copyright © 2019-2025 广州浮点动力科技服务有限公司 版权所有 <a href="http://www.beian.miit.gov.cn">粤ICP备18159670号-1</a></p>
                <p>技术支持：浮点科技</p>
            </div>
        </div>
    </div>
</template>
<style >
    .footer table a{
        color:#888;
        font-size:13px;
    }
    .footer-bottom-flex span{
        padding-left:10px;
    }
    .footer-right .footer-right-two p.red{
        font-size: 24px;
        padding-bottom: 0px;
        border:0;
    }
    .footer-bottom-flex a{
        color:#89898a;
    }
</style>