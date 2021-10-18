import { BaseApi } from "./couplingAjax";
import config from "./config";

// import Nbs from "./apis/Nbs";
import BaseServer from "./apis/BaseServer";
import MovieServer from "./apis/MovieServer";
// 针对不同服务进行差异化定制
const movieServer = opt =>
  BaseApi(opt, {
    prefix: config.gateway, // 路径前缀
    // dataField: "data", // 取值字段
    // codeField: "success", // 判断正确错误字段
    // codeNum: true, // 返回是否正确取值
    // msgField: "message", // 提示信息获取
    // tipsCode: "errorCode", // 错误号,
    isResponse: true // 直接返回数据
  });

const baseServer = opt => BaseApi(opt, { prefix: config.BaseServer });

export default {
  BaseServer: BaseServer(baseServer, config),
  MovieServer: MovieServer(movieServer, config)
};
