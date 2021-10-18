// 接口和页面初始化配置中心
// 在前置配置之前，需要搞清楚后端微服务前缀路由是什么，然后再配置到该文件下面
const gateway = "";
let service = {
  domainName: "", // 主域名
  gateway, // 流量网关前缀,后面的才是微服务后端代码前缀
  BaseServer: gateway + "/order", // 公共服务
  MovieServer: gateway + "" // 公共服务
};
console.log("当前环境", process.env.VUE_APP_NODE_ENV);
switch (process.env.VUE_APP_NODE_ENV) {
  // 当走淘宝mock的情况
  case "rapmock": {
    service = {
      ...service
    };
    break;
  }
  // 开发, 本地开发走vue代理
  case "development": {
    service = {
      ...service,
      domainName: ""
    };
    break;
  }
  // 测试环境
  case "staging": {
    service = {
      ...service,
      domainName: ""
    };
    break;
  }
  // 生产
  case "production": {
    service = {
      ...service,
      domainName: ""
    };
    break;
  }
}

export default service;
