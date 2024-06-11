import {reqAddressInfo,reqOrderInfo} from '@/API'
const actions={
  // 获取用户地址信息
  async getAddressInfo({commit}){
     let result =await reqAddressInfo()
     console.log(result);
     if(result.code == 200){
      commit('GetAddressInfo',result.data)
     }
  },
  // 获取商品清单数据
 async  getOrderInfo({commit}){
   let result = await reqOrderInfo()
   console.log(result.data);
   if(result.code == 200){
    commit('GetOrderInfo',result.data)
   }
  },
}
const mutations={
  GetAddressInfo(state,val){
   state.address = val
  },
  GetOrderInfo(state,val){
    state.orderInfo = val
  }
}
const getters={

}
const state={
  address:[],
  orderInfo:{}
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}
