const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
productionSourceMap:false,
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave:false, //关闭语法检查
  // 配置代理服务器解决代理跨域
  devServer: { // 请求前缀，如果有/api就走代理
    proxy: {
      '/api': {
        target: ' http://gmall-h5-api.atguigu.cn',//目标地址
        // pathRewrite: { '^/api': '' },  //检查代理服务器是否有/api若有将其替代为空字符串
        // 因为本项目的接口都带有/api，所以不用重写
      }, 
    },
    client:{
      overlay:false
    }
  },

  
})
