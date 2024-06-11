// 当前的这个模块：对所有的API进行统一管理
// 引入封装好的axios
import requests from './request'
import mockRequests from './mockRequest'
// 三级联动
// /api/product/getBaseCategoryList get  无参数

export const reqCategoryList = () => {
  // 发请求:axios发请求返回的结果是Promise对象
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取banner(home首页轮播图)
export const reqGetBannerList = () => {
  // 发请求:axios发请求返回的结果是Promise对象
  return mockRequests.get('/banner')
}

// 获取floor组件数据
export const reqFloorList = () => {
  return mockRequests.get('/floor')
}
// 获取trade中的address信息
export const reqAddressInfo = () => {
  return mockRequests.get('/address')
}

// 获取Search模块数据，地址：/api/list，请求方式：POST 参数：
// {
// "category3Id": "61",
// "categoryName": "手机",
// "keyword": "小米",
// "order": "1:desc",
// "pageNo": 1,
// "pageSize": 10,
// "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
// "trademark": "4:小米"
// }
// 当前这个函数需要接受外部传递参数，给服务器传递参数，返回相应的数据
export const reqGetSearchInfo = (params) => {
  // 当前的接口给服务器传递的参数params至少是一个空对象(返回结果就是serach的全部数据)
  return requests({ url: "/list", method: "post", data: params })
}
// 获取商品详情的接口   请求的地址/api/item/{ skuId } 请求方式get 参数skuId
export const reqGoodsInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: 'get' })
}
// 将产品添加到购物车中（或者更新某一个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrderUpdateShopCart = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
// 获取购物车列表数据接口  /cart/cartList
export const reqCartList = () => {
  return requests({ url: '/cart/cartList', method: 'get' })
}
// 删除购物车商品数据接口 /cart/deleteCart/{skuId}
export const reqDeleteCartList = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}
// 改变产品的状态/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}
// 获取验证码/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
// 用户注册 /user/passport/register
export const reqUserRegister = (data) => {
  return requests({ url: '/user/passport/register', method: 'post', data })
}
// 用户登录/user/passport/login
export const reqUserLogin = (data) => {
  return requests({ url: '/user/passport/login', method: 'post', data })
}
// 首页用户信息的展示/user/passport/auth/getUserInfo,需要带着token向用户请求用户信息
export const reqGetUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}
// 退出登录/user/passport/logout
export const reqUserLogOut = () => {
  return requests({ url: '/user/passport/logout', method: 'get' })
}

// 获取用户商品清单/order/auth/trade
export const reqOrderInfo = () => {
  return requests({ url: '/order/auth/trade', method: 'get' })
}
// 提交订单/order/auth/submitOrder?tradeNo={tradeNo}
export const reqOrderList = (tradeNo, data) => {
  return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
}
// 获取支付信息/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
  return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}
// 获取支付订单状况
export const reqOrderStatus = (orderId) => {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}

// 获取我的订单列表/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}