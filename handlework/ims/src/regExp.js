function hasCc(v){//has Chinese character包含汉字
    return /[\u4e00-\u9fa5]{1,}/.test(v)
}
function onlyCc(v){//only Chinese character只有汉字
    return /^[\u4e00-\u9fa5]{0,}$/.test(v)
}
function tfCc(v){//two to four Chinese character只有2-4个汉字（用于名字）
    return /^[\u4e00-\u9fa5]{2,4}$/.test(v)
}
function hasNum(v){//包含数字(可以是整数也可以是小数)
    return /\d+/.test(v)
}
function onlyNum(v){//只有数字
    return /^\d+$/.test(v)
}
function isInt(v){//正整数
    return /^[1-9][0-9]*$/.test(v)
}
function mtf(v){//most two float最多两位小数
    return /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(v)
}
function onlyCcEn(v){//only Chinese character English只有中英文（例：用于名字）
    return /^[a-zA-Z\u4e00-\u9fa5]{0,}$/.test(v)
}
function onlyne(v){//only Number English只有数字和英文（例：用于银行卡）
    return /^[a-zA-Z0-9]{0,}$/.test(v)
}
function isContract(v){//合同编号
    return /^[a-zA-Z0-9]{16}$/.test(v)
}
function isPhone(v){//是否正确的手机号
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(v)
}
function entprisCode(v){//企业组织机构代码,允许格式： ABCDE012-D || ABCDE012-D-12
    // return /[A-Z0-9]{8}-[A-Z0-9]$|[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/.test(v)
    return /^[A-Z0-9]{18}$/.test(v)
}
function idCode(v){//验证身份证号
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(v)
}
function isUrl(v){//网站域名
    return /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(v)
}
function isEmail(v){//邮箱验证
    return /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(v)
}
function workNum(v){
    return /^[A-Z]{4}[0-9]{4}$/.test(v)
}
export default {
    workNum,
    hasCc,
    onlyCc,
    hasNum,
    onlyNum,
    isInt,
    mtf,
    onlyCcEn,
    onlyne,
    isPhone,
    entprisCode,
    idCode,
    isUrl,
    isEmail,
    tfCc,
    isContract
}