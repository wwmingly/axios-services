# service-utils

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 使用配置

    详情请查看博客 https://www.kancloud.cn/vvmily_king/vvmily/2501168

    Ajax请求配置以及请求后数据统一处理配置，如下
  
|  配置项   |   说明  |  是否必填   |  类型   |  默认值  |
| --- | --- | --- | --- | --- |
| url | 请求Api | 是 | string |   |
| loading | 加载拦截，全屏 | 否 | boolean | false |
| baseURL | 基础路径 | 否 | string |  |
| data | 请求发送数据 | 否 | object |  |
| params | 地址栏拼接数据，仅限于'put', 'post', 'patch' | 否 | object |  |
| timeout | 超时时间 | 否 | number | 30 * 1000 |
| method | 请求方法：get、post、put、patch、jsonp  | 否 | string | get |
| headers | 请求头 | 否 | object | { "Content-Type": "application/json" } |
| success | 请求成功时，是否提示 | 否 | boolean | false |
| error | 请求失败时，是否提示 | 否 | boolean | true |
| jsonp | 是否使用jsonp请求接口 | 否 | boolean | false |
| jsonpOpt | jsonp库的options参数，配合jsonp使用 | 否 | object | false |
| file | 是否为文件模式 | 否 | boolean | false |
| mock | 是否为mock模式 | 否 | boolean | false | 
| responseType | 数据格式 | 否 | string | json |
| isResponse | 是否简化数据 | 否 | boolean | false | 
| reLogin | 是否校验登录 | 否 | boolean | true |

