// 对外暴露函数
// 持久化存储Token
export const setToken =(token)=>{
  localStorage.setItem('Token',token)
}
// 获取token
export const getToken =()=>{
  return localStorage.getItem('Token')
}
// 清除本地存储token
export const removeToken =()=>{
  return localStorage.removeItem('Token')
}