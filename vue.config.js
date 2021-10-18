"use strict";
const path = require("path");

// const TerserPlugin = require("terser-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "vvmily"; // page title
// const baseUrl = "http://10.150.134.130:8081";
const baseUrl = "https://movie.douban.com";

const port = 8085; // dev port

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: process.env.NODE_ENV === "development",
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/order": {
        // 权限
        target: baseUrl, // 后台接口域名
        // ws: true,        //如果要代理 websockets，配置这个参数
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // '^/system': '/',
        }
      },
      "/j": {
        // 权限
        target: baseUrl, // 后台接口域名
        // ws: true,        //如果要代理 websockets，配置这个参数
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // "^/j": ""
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    mode: process.env.NODE_ENV,
    optimization:
      process.env.NODE_ENV === "production"
        ? {
            minimize: true,
            minimizer: [
              // new TerserPlugin({
              //   test: /\.js(\?.*)?$/i, // 匹配参与压缩的文件
              //   parallel: true, // 使用多进程并发运行
              //   terserOptions: {
              //     ecma: undefined,
              //     warnings: false,
              //     parse: {},
              //     output: { comments: false },
              //     compress: {
              //       drop_console: true,
              //       drop_debugger: false,
              //       pure_funcs: ['console.log'] // 移除console
              //     }
              //   }
              // })
            ]
          }
        : {},
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });

      config.optimization.runtimeChunk("single");
    });
  }
};
