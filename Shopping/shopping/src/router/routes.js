// 路由配置信息
// 路由懒加载
// import Home from '@/pages/Home'
// const foo = ()=> import ('@/pages/Home')
// component:foo
export default
  [
    {
      path: '/center',
      component: ()=> import ('@/pages/Center'),
      meta: { show: true },
      children: [
        {
          name: 'myOrder',
          path: 'myOrder',
          component: ()=> import ('@/pages/Center/MyOrder'),
          meta: { show: true },
        },
        {
          name: 'groupOrder',
          path: 'groupOrder',
          component: ()=> import ('@/pages/Center/GroupOrder'),
          meta: { show: true },
        },
        // 重定向
        {
          path: '/center',
          redirect: '/center/myOrder'
        }
      ]

    },
    {
      path: '/paySuccess',
      component: ()=> import ('@/pages/PaySuccess'),
      meta: { show: true },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 去交易页面必须是从购物车来
        if (from.path == '/pay') {
          next()
        }
        // 其他的停留在当前
        else {
          next(false) //false 相当于from.path 从哪来回哪去
        }
      }
    },
    {
      path: '/pay',
      component: ()=> import ('@/pages/Pay'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        }
        else {
          next(false)
        }
      }
    },
    {
      path: '/trade',
      component:()=> import ('@/pages/Trade'),
      meta: { show: true },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 去交易页面必须是从购物车来
        if (from.path == '/shopCart') {
          next()
        }
        // 其他的停留在当前
        else {
          next(false) //false 相当于from.path 从哪来回哪去
        }
      }
    },
    {
      path: '/shopCart',
      component: ()=> import ('@/pages/ShopCart'),
      meta: { show: true }
    },
    {
      path: '/addCartSuccess',
      component:()=> import ('@/pages/AddCartSuccess'),
      meta: { show: true }
    },
    {
      path: '/detail/:skuId',
      component:()=> import ('@/pages/Detail'),
      meta: { show: true }
    },
    {
      path: '/home',
      component: ()=> import ('@/pages/Home'),
      meta: { show: true }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      // path:'/search/k?', ?表示可传可不传
      component:  ()=> import ('@/pages/Search'), //路由懒加载
      meta: { show: true },
    },
    {
      path: '/login',
      component:  ()=> import ('@/pages/Login'),
      meta: { show: false }

    },
    {
      path: '/register',
      component: ()=> import ('@/pages/Register'),
      meta: { show: false }
    },
    //  重定向，当项目跑起来的时候，访问/，定向到home
    {
      path: '*',
      redirect: '/home'
    }
  ]
