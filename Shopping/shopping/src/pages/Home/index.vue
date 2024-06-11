<template>
  <div>
    <!-- 直接使用三级联动全局组件 -->
    <TypeNav />
    <listContainer />
    <todayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in FloorList" :key="floor.id" :floor="floor"/>
    <Brand />
  </div>
</template>

<script>
import listContainer from '@/pages/Home/listContainer'
import todayRecommend from '@/pages/Home/todayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex';

export default {
name:'Home',
components:{
  listContainer,
  todayRecommend,
  Rank,
  Like,
  Floor,
  Brand
},
mounted(){
  // 派发actions,获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
    // 获取用户信息
    this.$store.dispatch('user/getUserInfo')
  },
  computed:{
    ...mapState('home',['FloorList'])
  }
}
</script>

<style>

</style>