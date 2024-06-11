<template>
  <div>
            <!--列表-->
            <div class="list-container">
            <div class="sortList clearfix">
                <div class="center">
                    <!--banner轮播-->
               <carousel :List="BannerList" />
                </div>
                <div class="right">
                    <div class="news">
                        <h4>
                            <em class="fl">尚品汇快报</em>
                            <span class="fr tip">更多 ></span>
                        </h4>
                        <div class="clearix"></div>
                        <ul class="news-list unstyled">
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[公告]</span>备战开学季 全民半价购数码
                            </li>
                            <li>
                                <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                            </li>
                        </ul>
                    </div>
                    <ul class="lifeservices">
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">话费</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">机票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">电影票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">游戏</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">彩票</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">加油站</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">酒店</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">火车票</span>
                        </li>
                        <li class=" life-item ">
                            <i class="list-item"></i>
                            <span class="service-intro">众筹</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">理财</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">礼品卡</span>
                        </li>
                        <li class=" life-item">
                            <i class="list-item"></i>
                            <span class="service-intro">白条</span>
                        </li>
                    </ul>
                    <div class="ads">
                        <img src="./images/ad1.png" />
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入swiper,css样式因为两个以上的组件要用，所以在main.js中引入
import Swiper from 'swiper';
export default {
name:'listContainer',
// mounted：组件挂载完毕，正常说结构（DOM)已经出来了
// 为什么swiper实例在mounted当中直接不能书写：因为结构并不完整（有axios发请求，请求数据）
mounted(){
  // 派发action，发请求
  this.$store.dispatch('home/getBannerList') //异步请求
  // new Swiper实例之前，页面中结构必须有
  // 但是new Swiper放在这里，虽然请求到了服务器数据，但是还未将数据放到仓库里面，就new 了swiper实例
  // // 就是说结构还没完整就执行了，所以不生效 
},
computed:{
  ...mapState('home',['BannerList'])
},
watch:{
  // 监听bannerList数据的变化，因为这个数据发生过变化---[空数组->新的元素]
  BannerList:{
    immediate:true,
    // 现在通过watch监听bannerList属性的属性值的变化
    // 如果执行handler方法，代表组件实例身上这个属性的属性值已经有了【数组，值】
    handler(newValue,oldValue){
     // 若将new Swiper实例放在这，当前这个函数执行：只能保证bannerList数据已经有了，但是并未能保证v-for已经执行结束了，不能确定将结构遍历出来了
    //     var mySwiper = new Swiper(document.querySelector(".swiper-container"),{
  //   loop:true,
  //   // 如果需要分页器
  //   pagination:{
  //     el:".swiper-pagination",
  //     clickable:true //点击小球切换图片
  //   },
  //   // 如果需要前进后退按钮
  //   navigation:{
  //     nextEl:".swiper-button-next",
  //     prevEl:".swiper-button-prev",
  // }
    // })
    // nextTick:在下次DOM更新(向服务器请求回来数据之后)循环结束（v-for循环结束后）之后执行延迟回调。在修改数据之后（服务器数据返回后）立即使用这个方法，获取更新后的DOM
    this.$nextTick(()=>{
      // 当执行这个回调的时候，保证服务器数据回来了，v-for执行完毕了【轮播图的结构已经有了】
         var mySwiper = new Swiper(this.$refs.mySwiper ,{
          loop:true,
          // 如果需要分页器
          pagination:{
          el:".swiper-pagination",
          clickable:true //点击小球切换图片
       },
         // 如果需要前进后退按钮
          navigation:{
          nextEl:".swiper-button-next",
          prevEl:".swiper-button-prev",
  }
    })
    })
    }
  }
}
}
</script>

<style lang="less">
    .list-container {
        width: 1200px;
        margin: 0 auto;

        .sortList {
            height: 464px;
            padding-left: 210px;

            .center {
                box-sizing: border-box;
                width: 740px;
                height: 100%;
                padding: 5px;
                float: left;
            }

            .right {
                float: left;
                width: 250px;

                .news {
                    border: 1px solid #e4e4e4;
                    margin-top: 5px;

                    h4 {
                        border-bottom: 1px solid #e4e4e4;
                        padding: 5px 10px;
                        margin: 5px 5px 0;
                        line-height: 22px;
                        overflow: hidden;
                        font-size: 14px;

                        .fl {
                            float: left;
                        }

                        .fr {
                            float: right;
                            font-size: 12px;
                            font-weight: 400;
                        }
                    }

                    .news-list {
                        padding: 5px 15px;
                        line-height: 26px;

                        .bold {
                            font-weight: 700;
                        }
                    }
                }

                .lifeservices {
                    border-right: 1px solid #e4e4e4;
                    overflow: hidden;
                    display: flex;
                    flex-wrap: wrap;

                    .life-item {
                        border-left: 1px solid #e4e4e4;
                        border-bottom: 1px solid #e4e4e4;
                        margin-right: -1px;
                        height: 64px;
                        text-align: center;
                        position: relative;
                        cursor: pointer;
                        width: 25%;

                        .list-item {
                            background-image: url(~@/assets/images/icons.png);
                            width: 61px;
                            height: 40px;
                            display: block;
                        }

                        .service-intro {
                            line-height: 22px;
                            width: 60px;
                            display: block;
                        }

                        &:nth-child(1) {
                            .list-item {
                                background-position: 0px -5px;
                            }
                        }

                        &:nth-child(2) {
                            .list-item {
                                background-position: -62px -5px;
                            }
                        }

                        &:nth-child(3) {
                            .list-item {
                                background-position: -126px -5px;
                            }
                        }

                        &:nth-child(4) {
                            .list-item {
                                background-position: -190px -5px;
                            }
                        }

                        &:nth-child(5) {
                            .list-item {
                                background-position: 0px -76px;
                            }
                        }

                        &:nth-child(6) {
                            .list-item {
                                background-position: -62px -76px;
                            }
                        }

                        &:nth-child(7) {
                            .list-item {
                                background-position: -126px -76px;
                            }
                        }

                        &:nth-child(8) {
                            .list-item {
                                background-position: -190px -76px;
                            }
                        }

                        &:nth-child(9) {
                            .list-item {
                                background-position: 0px -146px;
                            }
                        }

                        &:nth-child(10) {
                            .list-item {
                                background-position: -62px -146px;
                            }
                        }

                        &:nth-child(11) {
                            .list-item {
                                background-position: -126px -146px;
                            }
                        }

                        &:nth-child(12) {
                            .list-item {
                                background-position: -190px -146px;
                            }
                        }
                    }
                }

                .ads {
                    margin-top: 5px;

                    img {
                        opacity: 0.8;
                        transition: all 400ms;

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

</style>