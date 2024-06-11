import { reqGetSearchInfo } from "@/API"
const actions={
  async getSearchInfo({commit},val={}){
    // val={}默认参数，若传递参数，则用参数，反之，用{}
    // val形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
  let result = await reqGetSearchInfo(val)
  if(result.code == 200){
  commit('GetSearchInfo',result.data)
  }
  }
}
// 业务逻辑，异步操作
const mutations={
  GetSearchInfo(state,val){
  state.searchList = val
  }
}
// 用于简化仓库数据，计算属性，在项目当中是为了简化仓库当中的数据
// 将仓库中的数据进一步进行拆分，细化
const getters={
 goodsList(state){
  // 形参state,当前仓库的state
  return state.searchList.goodsList ||[] //如果没网，返回的数据是undefined,所以防止这种现象，写或者[ ]
 },
 trademarkList(state){
  // 形参state,当前仓库的state
  return state.searchList.trademarkList || []
 },
 attrsList(state){
  return state.searchList.attrsList || []
 }

}
const state={
  searchList:{} //里面包含很多的对象数据，可由getters进一步映射拆分
}
export default {
 namespaced:true,
  actions,
  mutations,
  getters,
  state
}