<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派，将事件委派给父亲来执行 -->
      <div @mouseleave="cancelStyle" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show" @mouseleave="moveShow">
            <!-- 利用事件委派+编程式导航+自定义属性实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 遍历得到的数据 一级分类-->
              <div
                class="item"
                :class="{ addClass: currentIndex === index }"
                v-for="(category, index) in categoryList"
                :key="category.categoryId"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="category.categoryName"
                    :data-category1Id="category.categoryId"
                    >{{ category.categoryName }}</a
                  >
                </h3>
                <!-- 通过js控制二三级样式的显示和隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <!-- 遍历二级分类 -->
                  <div
                    class="subitem"
                    v-for="category2 in category.categoryChild"
                    :key="category2.categoryId"
                  >
                    <dl class="fore">
                      <!-- 二级 -->
                      <dt>
                        <a
                          :data-categoryName="category2.categoryName"
                          :data-category2Id="category2.categoryId"
                          >{{ category2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级 -->
                        <em
                          v-for="category3 in category2.categoryChild"
                          :key="category3.categoryId"
                        >
                          <a
                            :data-categoryName="category3.categoryName"
                            :data-category3Id="category3.categoryId"
                            >{{ category3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <h3>
                <a href="">箱包</a>
              </h3>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 这种引入方法，是把lodash所有的函数功能引入
// import _ from 'lodash'
// 最好的引入方式，按需加载
import throttle from "lodash/throttle";
// import router from '@/router'
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  // 当组件挂载完毕，可以向服务器发请求
  mounted() {
    // 当组件在search路由中挂载完毕，让show变为false
    if (this.$route.name === "search") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // throttle回调函数要写成键值对的形式，要不然会有this上下文的问题
    changeIndex: throttle(function (index) {
      // 正常情况(用户慢慢操作)：鼠标进入，每一个都会触发鼠标进入事件
      // 非正常情况(用户操作很快)：本身全部的以及分类都应该触发鼠标进入事件，但是经过测试，只有部分触发事件
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能会出现卡顿现象
      this.currentIndex = index;
    }, 50),
    cancelStyle() {
      this.currentIndex = -1;
    },
    goSearch(e) {
      // 最好的解决方案就是利用编程式导航与事件的回派
      // 如果利用事件的回派，会出现的问题1.点击的一定是a标签呢？2.如何获取参数？
      // 存在的问题：事件委派，是把全部的子节点[h3,dt,dl,em]的事件委派给父亲节点
      // 点击a标签的时候，才会进行路由跳转【那问题就是怎么确定点击的一定是a标签呢】
      // 解决方法：把子节点中a标签，加上自定义属性data-category，其余子节点是没有的，通过event获取
      let Element = e.target; //获取当前触发事件的节点，我们需要的是data-category
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值,自定义属性值是小写的
      let { categoryname, category1id, category2id, category3id } =
        Element.dataset; //解构赋值 
        console.log(Element.dataset); 
      // 如果标签身上有categoryname属性一定是a标签
      if (categoryname) {
        // 另一个问题，即使能确定点击的是a标签，怎么确定是几级分类的标签
        // 区分 一级分类，二级分类，三级分类的a标签
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //  合并参数
        // 判断：如果路由跳转的时候，带有params参数，捎带传递过去
        if (this.$route.params) {
          location.query = query;
          location.params = this.$route.params;
          this.$router.push(location); //跳转
        }
      }
    },
    enterShow() {
      this.show = true;
    },
    moveShow() {
      // 判断只有是search组件的时候才执行鼠标移除事件
      if (this.$route.name == "search") this.show = false;
    },
  },
};
</script>

<style lang="less">
.addClass {
  background-color: skyblue;
}
.type-nav {
  border-bottom: 2px solid #e1251b;
  cursor: pointer;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            a:hover {
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
      }
    }
    // 过度动画的样式
    // 过度动画进入开始状态
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}
</style>