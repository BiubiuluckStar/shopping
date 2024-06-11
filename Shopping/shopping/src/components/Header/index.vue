<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 判断是否有username，若是有显示，没有则显示请登录 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航务必要用to属性，往哪跳 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 登陆了 -->
          <p v-else>
            <span>你好</span>
            <!-- 声明式导航务必要用to属性，往哪跳 -->
            <a>{{userName}}</a>
            <a @click="logOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link :to="{name:'myOrder'}">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">合作招商</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 单页面应用程序，router-link中只保留类名 -->
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            v-model="keyword"
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button
            @click="goSearch"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  // 通过全局事件总线联合search组件关键字面包屑清除关键字
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  methods: {
    // 搜索按钮的回调函数，需要向search路由进行跳转
    // 编程式导航利用push|replace,可 以传递数据，
    goSearch() {
      // 判断如果有query参数的话，连带过去
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录
    async logOut(){
      // 退出登录需要做的事情
      // 1.需要发请求通知服务器退出登录（清除token）
      // 2.清除项目当中的数据（userInfo,token)
      try {
        await this.$store.dispatch('user/userLogOut')
        // 回到首页
        this.$router.push('/home')
      } catch (error) {
        alert(error)
      }
     
    }
  },
  computed:{
    // 用户名信息
    userName(){
      return this.$store.state.user.userInfo.name
    }
  }
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>