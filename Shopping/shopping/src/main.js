import Vue from 'vue'
import App from './App.vue'
// 引入router路由器
import router from '@/router'
// 引入Vuex
import store from '@/store/index'
// 引入mockServer.js
import '@/mock/mockServer'
// 引入使用弹框element-ui
import { MessageBox } from 'element-ui';
// 引入lazyLoad插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载图片
import loadimage from '@/assets/images/lazy.webp'

// 引入swiper样式
import 'swiper/css/swiper.css'
// 注册轮播图公用组件
import Carousel from '@/components/Carousel'
// 注册全局组件分页器
import Pagination from '@/components/Pagination'
// 注册三级联动全局组件
import TypeNav from '@/components/TypeNav'
// 引入表单校验插件
import '@/plugin/validate'

// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,//懒加载默认图
})
// element-ui注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 阻止生成生产提示
Vue.config.productionTip = false
// 统一引入
import * as API from '@/API'

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 配置全局事件总线$bus
    Vue.prototype.$bus = this
    Vue.prototype.$API = API  //挂载上
  },
  // 注册路由，下面的写法KV一致，router小写
  // 注册路由组件，当这里书写router的时候，组件身上都有$router与$route属性
  router,
  store  //注册store仓库，组件实例的身上会多一个$store属性
}).$mount('#app')
