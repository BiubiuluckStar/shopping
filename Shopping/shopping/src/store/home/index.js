import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/API"


const actions={
  async categoryList({commit}){
    // 通过API里面的接口函数调用向服务器发请求，获取服务器的数据
   let result = await reqCategoryList(); //await后面是一个promise对象，返回值
  //  console.log(result);
   if(result.code == 200){
   commit('CategoryList',result.data)
   }
  },
 async getBannerList({commit}){
  let result = await reqGetBannerList()
  if(result.code == 200){
   commit('GetBannerList',result.data)
  }
},
async getFloorList({commit}){
  let result = await reqFloorList()
  if(result.code == 200){
    commit('GetFloorList',result.data)
   }
}
}

// 业务逻辑，异步操作
const mutations={
  CategoryList(state,val){
    state.categoryList = val
  },
  GetBannerList(state,val){
    state.BannerList = val
  },
  GetFloorList(state,val){
    state.FloorList = val
  }
}

// 用于简化仓库数据，让组件获取仓库的数据更加方便,计算属性
const getters={

}
const state={
  // state中的数据默认初始值为空数组，根据接口的返回值初始化
  categoryList:[],
  BannerList:[],
  FloorList:[]
}
export default {
  namespaced:true, //开启命名空间
  actions,
  mutations,
  getters,
  state
}