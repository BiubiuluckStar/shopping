import { reqGoodsInfo,reqAddOrderUpdateShopCart } from "@/API"
// 封装游客临时模块uuid--->生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'
const actions={
  // 获取产品信息的actions
 async getGoodsInfo({commit},skuId){
  let result =await reqGoodsInfo(skuId)
  if(result.code ==200){
    commit('GetGoodInfo',result.data)
  }
 },
//  将产品添加到购物车中 || 修改一个产品的数量
async addOrderUpdateShopCart({commit},{skuId,skuNum}){
  let result = await reqAddOrderUpdateShopCart(skuId,skuNum)
   // result结果中并没有返回有用的数据，只是返回code:200代表请求成功
   // 因为服务器没有返回其余数据，所以仓库不需要三连环
   //  当前的这个函数如果执行返回promise
   if(result.code == 200){  //代表服务器加入购物车成功
    return 'ok'
   }else{
   return Promise.reject('error')
   }
}
}
const mutations={
  GetGoodInfo(state,val){
  state.goodInfo = val
  }
}
const getters={
  // 路径导航简化数据
  categoryView(){
    // state.goodInfo初始值为空对象，打点categoryView为undefined
    // 当前计算出来的初始值至少是一个空对象
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息
  skuInfo(){
    return state.goodInfo.skuInfo || {}
  },
  // 简化售卖属性的信息
  spuSaleAttrList(){
    return state.goodInfo.spuSaleAttrList || []
  }
}
const state={
  goodInfo:{},
  uuid_token:getUUID()
}
export default {
  namespaced:true, //开启命名空间
  actions,
  mutations,
  state,
  getters
}
