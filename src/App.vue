<template>
  <div id="app">
    <el-button @click="handleClick(false)">请求时，不出现loading</el-button>
    <el-button type="primary" @click="handleClick(true)"
      >请求时，出现loading</el-button
    >

    <h1>{{ movieInfo.originalName }}</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
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
  data() {
    return {
      movieInfo: {}
    };
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
    this.handleClick(true);
  },
  methods: {
    handleClick(loading) {
      Api.MovieServer.queryList({
        data: {
          id: "1302425"
        },
        loading
      }).then(res => {
        console.log("isResponse=false时，拿到一定是正确的数据", res);
        this.movieInfo = res;
      });
    },
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
