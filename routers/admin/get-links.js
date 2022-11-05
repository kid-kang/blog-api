const linkTable = require("../../mongodb/friends-link");

module.exports = async ctx => {
  let res = await linkTable.find();
  ctx.body = {
    code: 200,
    message: "成功获取友链数据",
    data: res
  };
};