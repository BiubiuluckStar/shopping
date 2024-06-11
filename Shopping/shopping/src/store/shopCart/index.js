import {reqCartList,reqDeleteCartList,reqUpdateCheckedById} from '@/API'

const actions={
// 获取购物车列表的数据
   async cartList({commit}){
   let result = await reqCartList()
 if(result.code == 200){
  commit('CartList',result.data)
 }
   },
  //  删除购物车商品
   async deleteCartList({commit},skuId){
   let result = await reqDeleteCartList(skuId)
   if(result.code == 200){
    return 'ok'
   }
   else{
    return Promise.reject(new Error('faile'))
   }
   },
  //  修改购物车被选中产品的状态
   async updateCheckedById({commit},{skuId,isChecked}){
         let result = await reqUpdateCheckedById(skuId,isChecked)
         if(result.code == 200){
          return 'ok'
         }else{
          return Promise.reject(new Error('faile'))
         }
   },
  //  删除全部勾选的产品通过多次调用单个删除进行
  deleteAllCheckedCart({dispatch,getters}){
    // context:小仓库,由commit,dispatch,getters,state
    // 通过多次调用删除一个商品的actions删除全部勾选商品
    // 通过循环getters下的数组长度来获取遍历几次
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1?dispatch('deleteCartList',item.skuId):''
    // 将每一次返回的promise添加到数组当中
    promiseAll.push(promise)
    });
    // 返回成功或者失败
    return Promise.all(promiseAll)
  },
  // 全选
  updateALlCartChecked({dispatch,getters,state},isChecked){
  let promiseAll = []
  getters.cartList.cartInfoList.forEach(item=>{
    let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
    promiseAll.push(promise)
  })
  return Promise.all(promiseAll)
  }
}
const mutations ={
  CartList(state,val){
  state.cartList = val
  }
}
const getters ={
  cartList(state){
    return state.cartList[0] ||{}
  },
}
const state ={
  cartList:[]
}
export default{
  namespaced:true,
  actions,
  mutations,
  getters,
  state
}