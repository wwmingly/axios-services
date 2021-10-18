export default function BaseServer(ajax, config) {
  return {
    // 根据城市名称模糊搜索
    queryList: opt =>
      ajax({
        url: "/order/lost",
        method: "get",
        ...opt
      })
  };
}
