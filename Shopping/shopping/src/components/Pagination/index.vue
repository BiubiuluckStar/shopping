<template>
  <div class="pagination" >
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pagNumber-1)">上一页</button>
    <!-- 如果当前页的起始数大于1的时候才展示1页数 -->
    <button v-if="startAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <!-- 如果当前页的起始数大于2的时候才展示... -->
    <button v-if="startAndEndNum.start>2">···</button>
     <!-- 中间部分 -->
    <button v-for="(page,index) in startAndEndNum.end" :key="index" v-show="(page)>=startAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{ page }}</button>

    <button v-if="startAndEndNum.end< totalPage-1" >···</button>
    <button v-if="startAndEndNum.end<totalPage"  @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pagNumber+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>

export default {
  name: "Pagination",
  data(){
    return{
      pagNumber:''
    }
  },
  mounted(){
    this.pagNumber = this.pageNo
  },
  // 父组件传递给子组件的数据
  props:['pageNo','pageSize','total','continues','getPageNo'],
computed:{
    // 计算属性计算出一共多少页
  totalPage(){
    // 向上取整
    return Math.ceil(this.total/this.pageSize)
  },
  // 计算出连续的页码的起始数字与结束的数字
  startAndEndNum(){
  //  先定义两个变量存储起始与结束的数字[连续的页码数字至少是continues]
  let start = 0
  let end = 0
  // 判断有几页【若页数少于continues】不正常现象
  if(this.continues>this.totalPage){
   start = 1
   end = this.totalPage
  return{start,end}
  }
  else{
    // 正常现象
    start = this.pageNo - parseInt(this.continues/2)
    end = this.pageNo + parseInt(this.continues/2)
    // 把出现不正常的现象（start有0与负数）
    if(start<1){
      start = 1,
      end = this.continues
    }
    // end
    if(end>this.totalPage){
      end = this.totalPage
      start = this.totalPage - (this.continues - 1)
    }
    return{start,end}
  }
  }

}
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ea7e7e;
      color: #fff;
    }
  }
}
</style>