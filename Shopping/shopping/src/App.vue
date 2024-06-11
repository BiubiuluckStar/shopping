<template>
  <div id="app">
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home,search显示，login,register隐藏 -->
    <!-- <Footer v-show="$route.path ==='/home' || $route.path ==='/search'" /> -->
    <Footer v-show="$route.meta.show" />

  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
      // 通知vuex发请求（actions异步），获取数据，存储于仓库中
  this.$store.dispatch('home/categoryList') //放到app中发请求，只执行一次

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
