export default function MovieServer(ajax, config) {
  return {
    // 根据城市名称模糊搜索
    queryList: opt =>
      ajax({
        url: "/api",
        method: "get",
        ...opt
      })
  };
}
