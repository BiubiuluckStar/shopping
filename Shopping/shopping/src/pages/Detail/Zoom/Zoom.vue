<template>
  <div class="spec-preview">
    <!-- 图片 -->
    <img :src="skuImageObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 大图 -->
    <div class="big">
      <img :src="skuImageObj.imgUrl" ref="big"/>
    </div>
    <!-- 蒙版，绿色的小方块 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
    return {
      currentIndex:0
    }
    },
    props:['skuImageList'],
    mounted(){
      this.$bus.$on('receiveImgIndex',this.changeImg)
    },
   computed:{
    skuImageObj(){
      return this.skuImageList[this.currentIndex] || {}
    }
   },
   methods:{
    changeImg(index){
     this.currentIndex = index
    },
    handler(e){
    let mask = this.$refs.mask
    let big = this.$refs.big
    let left = e.offsetX -mask.offsetWidth/2
    //因为鼠标一直在蒙版的中心，所以蒙版的左侧距离是鼠标距离左侧的距离减去蒙版宽度的一半，top同理
    let top = e.offsetY -mask.offsetHeight/2
    // 约束范围
    if(left<0 ) left = 0
    if(top<0)  top = 0
    if(left>=mask.offsetWidth )left = mask.offsetWidth
    if( top>=mask.offsetHeight)top = mask.offsetHeight
    // 修改元素的left|top属性值
    mask.style.left = left +'px'
    mask.style.top = top +'px'
    // 2倍的关系
    big.style.left = -2*left +'px'
    big.style.top = -2*top +'px'
    console.log(big.style.left);
    }
   }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>