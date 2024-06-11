// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入,json数据格式没有对外暴露，但是可以引入
// webpack默认对外暴露的有图片，json数据格式
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'


// mock数据:参数一，请求地址   第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner}) //模拟轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor}) //模拟floor数据
Mock.mock('/mock/address',{code:200,data:address}) //模拟address数据
