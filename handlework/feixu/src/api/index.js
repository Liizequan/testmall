import Vue from 'vue'
import axios from 'axios';
import router from "../router";
import { MessageBox } from "element-ui";

// const url = 'http://192.168.0.7/';
// const noUrl = 'http://192.168.0.7';
const url = 'http://gzsfeixu.com/'
const noUrl = 'http://gzsfeixu.com'


const fileUrl = url + 'tool/upload'

let http = axios.create({
  baseURL: url,
  withCredentials: true,//跨域请求
  changeOrigin:true,//是否跨域
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData; 
  }]
});


function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(res=> {
    // console.log(res)
    if(res.data.code === 1 || res.code === 1){
      return  response(res.data || res);
    }else if(res.data.code == '-1' || res.code == '-1'){
      return router.push('/login')
    }else{
      return  response(res.data || res);
      console.log('数据读取失败',res.msg || res.data.msg)
    }
  }).catch(err=> {
    // console.log(err)
    return  response(err.data || err);
  })
}



export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  },
  fileUrl,url,noUrl
  
}