import axios from 'axios';
import qs from 'qs';
import router from "./router";
import { Message, MessageBox } from "element-ui";
import Store from '@/store/index';
// let baseURL = 'http://192.168.0.6'
let baseURL = 'http://ims.gzfloat.com'
axios.defaults.baseURL = baseURL
let dotArr
let extArr = ['rar', 'zip', 'doc', 'docx', 'pdf', 'ppt', 'pptx', 'jpg', 'png', 'PNG', 'xlsx', 'xml']
let legal = false
let i
//12M,日期，聊天
function upload(file) {
    let size = Math.round(file.size / 1024 / 1024 * 100) / 100
    if (size > 12) {
        Message('上传文件不能大于12M')
        return false
    }
    // dotArr = file.name.split('.')
    // for (i in extArr) {
    //     if (extArr[i] == dotArr[dotArr.length - 1]) {
    //         legal = true
    //     }
    // }
    // if (!legal) {
    //     Message('不支持此文件')
    //     return false
    // }
    let form = new FormData();
    form.append("file", file);
    form.append("token", localStorage.getItem('token'))
    let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (progressEvent) {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            Store.state.progress = complete
        }
    }
    Store.state.progress = '0%'
    return axios.post(baseURL + '/index/upload', form, config)
    // .then(
    //    (res)=> {
    //      return res
    //     //  this.files.push({name:this.$refs.file.files[0].name,msg:res.msg})
    //    })
    //   .catch( (err) =>{
    //   });
}

let j
let isImg
let imgArr = ['webp', 'jpg', 'png', 'jpeg', 'PNG']

function Imgupload(file) {
    let size = Math.round(file.size / 1024 / 1024 * 100) / 100
    if (size > 12) {
        Message('上传文件不能大于12M')
        return false
    }
    isImg = file.name.split('.')
    for (j in imgArr) {
        if (imgArr[j] == isImg[isImg.length - 1]) {
            legal = true
        }
    }
    if (!legal) {
        Message('不支持此文件')
        return false
    }
    let form = new FormData();
    form.append("file", file);
    form.append("token", localStorage.getItem('token'))
    let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" }
    }
    return axios.post(baseURL + '/index/upload', form, config)
}


// function downloadFile(api) {
function downloadFile(api, id = '') {
    const a = document.createElement('a')
    document.body.appendChild(a);
    a.setAttribute('download', '')
    a.setAttribute('href', baseURL + '/' + api + '?token=' + localStorage.getItem('token') + '&id=' + id)
    a.setAttribute('id', 'downloadBtn')
    a.click();
    document.body.removeChild(document.getElementById('downloadBtn'))
}
function download(api) {
    const a = document.createElement('a')
    document.body.appendChild(a);
    a.setAttribute('download', '')
    a.setAttribute('href', api + '?token=' + localStorage.getItem('token'))
    a.setAttribute('id', 'downloadBtn')
    a.click();
    document.body.removeChild(document.getElementById('downloadBtn'))
}
function uploadFile(file, api) {
    let form = new FormData();
    form.append("file", file);
    form.append("token", localStorage.getItem('token'))
    form.append("user_id", localStorage.getItem('idForWage'))
    localStorage.setItem('idForWage', "")
    let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" }
    }
    return axios.post(baseURL + '/' + api, form, config)
}
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 注意这里的content-type,可以跟axios.defaults.headers.post['Content-Type']对比一下，传递到后端的数据格式是不一样的，一种是json一种是form data
// axios.defaults.headers["Accept"] = "*/*";
axios.interceptors.request.use(function (config) {
    // config.headers.token = ''
    // config.headers = {
    //     'Content-Type':'application/x-www-form-urlencoded'
    //   }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    if (response.data.code == -1) {
        // || response.data.msg == 'token值不能为空'
        router.push('/login')
    }
    if (response.data.code == -2) {
        //  && response.data.msg == '找不到用户信息' || response.data.msg == '登录已经过期'
        localStorage.setItem("login_status", JSON.stringify(response.data));
        router.push('/login')
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
let get = function (url, params = {}) {
    params.token = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
let post = function (url, params = {}) {
    params.token = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
function getCur(curPage, tableData, onePageItemNum = 10) {
    return tableData.slice(onePageItemNum * (curPage - 1), onePageItemNum * (curPage - 1) + onePageItemNum)
}
let idsStr
function getIdsStr(arr) {
    idsStr = ''
    for (let i in arr) {
        if (i == arr.length - 1) {
            idsStr += arr[i]
        } else {
            idsStr += arr[i] + ','
        }
    }
    return idsStr
}
let date
function getDate(stick) {
    date = new Date(stick)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
function getDateTime(stick) {
    date = new Date(stick)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
function getOneCustomer(customers, id) {
    for (let i in customers) {
        for (let j in customers[i].user) {
            if (customers[i].user[j].user_id == id) {
                return { id: customers[i].user[j].user_id, name: customers[i].user[j].name, depart: customers[i].label }
            }
        }
    }
}
function getIdsStrByObjArr(arr) {
    let idsStr = ''
    for (let i in arr) {
        if (arr.length - 1 == i) {
            idsStr += arr[i].id
        } else {
            idsStr += arr[i].id + ','
        }
    }
    return idsStr
}
function conf() {
    return MessageBox.confirm('此操作将永久删除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}
function testNum(num) {
    return /^\d*$/.test(num)
}
let startTime, endTime
function getDays(start, end, hastime = false) {
    startTime = getdate(start, hastime);
    endTime = getdate(end, hastime);
    return (endTime.getTime() - startTime.getTime()) / (60 * 60 * 24 * 1000) + 1
}
let temp, temDate
function getdate(datestr, hastime) {
    if (hastime) {
        temp = datestr.split(' ')[0].split("-")
    } else {
        temp = datestr.split("-");
    }
    temDate = new Date(temp[0], temp[1] - 1, temp[2]);
    return temDate;
}
function getMen() {
    get('user/index').then(res => {
        for (let i in res) {
            res[i].group = []
        }
        return res
    })
}
function getManById(men, id) {
    for (let i in men) {
        for (let j in men[i].user) {
            if (men[i].user[j].user_id == id) {
                return { depart: men[i].label, departId: men[i].id, user_name: men[i].user[j].name, head: men[i].user[j].head }
            }
        }
    }
}
let customers = []
function getCustomers() {
    get('marketing/group').then(res => {
        for (let i in res) {
            customers = [...customers, ...res[i].customer]
        }
        return customers
    })
}
function getCustomerById(customers, id) {
    for (let i in customers) {
        if (customers[i].id == id) {
            return customers[i]
        }
    }
}
function forNum(value) {
    return value.replace(/\D/g, '')
}
function allow(name) {
    let allow = JSON.parse(localStorage.getItem('login_status')).info.allow;
    for (var i of allow) {
        if (i.name == name) {
            return true
        }
    }
    return false
}
export default {
    allow,
    forNum,
    getCustomerById,
    getManById,
    getCustomers,
    getMen,
    get,
    post,
    upload,
    Imgupload,
    getCur,
    getIdsStr,
    baseURL,
    getDate,
    uploadFile,
    downloadFile,
    getOneCustomer,
    getIdsStrByObjArr,
    conf,
    testNum,
    getDays,
    download,
    getDateTime
}
