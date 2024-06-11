// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// npmprogress start进度条开始  done：进度条结束
// 引入进度条的样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create,去创建一个axios实例
// 2.requests 就是axios,只不过可以在里面配置
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候路径当中会出现/api
  baseURL:'/mock',
  // 代表请求超时的事件5s
  timeout:5000,
});
// 请求拦截器，再发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
  // 进度条开始动
  nprogress.start();
  // config 配置对象，对象里面有一个属性很重要，header请求头
  return config;
});
// 响应拦截器
requests.interceptors.response.use((res,err)=>{
  // 进度条结束
  nprogress.done()
  // 成功的回调函数，服务器响应相应数据回来以后，相应拦截器就可以检测到，可以做一些事情
  return res.data
},(error)=>{
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'))
}
)
// 对外暴露
export default requests;