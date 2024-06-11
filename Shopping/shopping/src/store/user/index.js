import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqUserLogOut} from '@/API'
// Token
import {setToken,getToken,removeToken} from '@/utils/token'
// 登录注册
const actions ={
// 获取验证码
async getCode({commit},phone){
  // 获取验证码的接口是将验证码返回，但是正常情况下是将验证码发到用户手机上
  let result = await reqGetCode(phone)
  if(result.code == 200){
    commit('GetCode',result.data)
    return 'ok'
  }
  else{
    return Promise.reject(new Error('faile'))
  }
},
// 用户注册
async userRegister({commit},userObj){
let result =await reqUserRegister(userObj)
if(result.code == 200){
  return 'ok'
}
else{
  return Promise.reject(new Error('faile'))
}
},
// 用户登录
async userLogin({commit},data){
let result = await reqUserLogin(data)
//服务器下发token,用户唯一标识
if(result.code == 200){
  // 用户登录成功，持久化存储token
  setToken(result.data.token) 
commit('UserLogin',result.data.token)
  return'ok'
}
else{
  Promise.reject(new Error('faile'))
}
},
// 首页获取用户信息
async getUserInfo({commit}){
 let result = await reqGetUserInfo()
 if(result.code == 200){
  // 存储用户信息
  commit('GetUserInfo',result.data)
  return 'ok'
 }
 else{
  return Promise.reject(new Error('faile'))
 }
},
// 退出登录
async userLogOut({commit}){
  // 向服务器发请求，通知服务器清除token,本地的也要清除
  let result = await reqUserLogOut()
  if(result.code == 200){
    commit('ClearAllLogOut')
    return 'ok'
  }
 else{
  return Promise.reject(new Error('faile'))
 }
}
}
const mutations ={
  GetCode(state,val){
    state.code = val
  },
  UserLogin(state,val){
    state.token = val
  },
  GetUserInfo(state,val){
    state.userInfo = val
  },
  // 清除本地数据
  ClearAllLogOut(state){
    // 将仓库中相关用户信息清空，本地也清空
  state.token = '',
  state.userInfo = {}
  removeToken()
  }
}
const getters ={

}
const state ={
code:'',
token:getToken(), //初始化未登录的时候是null与空字符串一样
userInfo:[] //用户信息
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
