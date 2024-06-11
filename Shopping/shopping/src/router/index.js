// 配置路由的地方

import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

import routes  from './routes';
// 引入store
import store from '@/store'
// 先把VueRouter原型对象的push先保存一份，在原始的push方法进行改写
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push与replace方法,给其传递成功失败的回调
// 第一个参数，告诉原来的push方法，往哪里跳（传递哪些参数）
// 第二个参数成功的回调
// 第三个参数失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
 if(resolve&&reject){
  // call||apply区别
  // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
  // 不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
  originPush.call(this,location,resolve,reject)
 }
 else{
  originPush.call(this,location,()=>{},()=>{})
 }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve&&reject){
    originReplace.replace(this,location,resolve,reject)
  }
  else{
    originReplace.replace(this,location,()=>{},()=>{})
  }
 }
//  router实例
let router =   new VueRouter({
  // 配置路由规则
  routes,
  // 滚动行为，控制水平竖直方向的位置，使每次路由跳转的时候都让滚动条在最上方
  scrollBehavior(to,from,savePosition){
    return {x:0,y:0}
  }
})
// 全局前置守卫（在路由跳转之前判断）
router.beforeEach(async (to, from, next) => {
  // to:跳转的目标路由
  // from可以获取到从哪个路由来
  // next:是否放行,放行函数
  // next() next('path') 放行到指定的路由中
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  // 如果登录了
  if (token) {
    // 用户登录过再去登录页跳转到home页
    if (to.path == '/login') {
      next('/')
    }
        // 登录了但是去的不是login
    else {
      // 如果有name
      if (name) {
        next()
      }
      else {
        // 如果没有用户信息派发actions捞取用户信息再跳转
        // 获取用户信息在首页展示
        try {
          // 获取用户信息
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // token失效
          // 清除token
          await store.dispatch('user/userLogOut')
          next('/login')
        }
      }
    }
  } 
  // 未登录
  else {
    let toPath = to.path
    // 未登录不能去交易相关，也不能去支付相关【pay,paysuccess】，不能去个人中心
    if(toPath == '/trade' ||toPath == '/pay' || toPath== '/paySuccess'|| toPath.indexOf('/center')!=-1 ){
      alert('请登录')
      //将未登录的时候想去而没有去的信息，以query的形式存储在地址栏中【路由】
      next('/login?redirect'+'='+toPath)
    }
    else{
        // 如果不是上述路由，则放行
      next()
    }
  }
})
// 向外暴露
export default router;