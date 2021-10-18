<template>
  <div id="app">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>

    <img @click="handle" alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { success } from "./services/base/tips";
import { throttle } from "./utils/antiShakingAndThrottling";
import Api from "./services";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  computed: {
    add() {
      // return throttle(() => {
      //   success({
      //     msg: "success"
      //   });
      // }, 1000);
    }
  },
  mounted() {
    Api.MovieServer.queryList({
      data: {
        type: "movie",
        tag: "热门",
        page_limit: 50,
        page_start: 0
        // ?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0
      }
      // loading: true
      // success: true
    }).then(res => {
      console.log("拿到一定是正确的数据", res);
    });
  },
  methods: {
    handle() {
      this.add();
    },
    detail() {
      console.log(123123123);
    }
  }
};
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
