import {v4 as uuidv4} from 'uuid'
// 要生成一个随机字符串,且每次执行不能发生改变,游客身份持久存储
export const getUUID =()=>{
  // 先从本地存储获取uuid,看下本地存储中是否由uuid
  let uuid_token = localStorage.getItem('UuidToken')
  // 如果没有生成uuid
  if(!uuid_token){
    uuid_token = uuidv4()
    // 本地存储一次
    localStorage.setItem('UuidToken',uuid_token)
  }
  return uuid_token
}