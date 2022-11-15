const friendsLinkTable = require("../../mongodb/friends-link");
const { URL } = require("url");

module.exports = async ctx => {
  //数据格式的校验： 鉴定各字段是否为空;  鉴定2个home是否为home的格式

  try {
    new URL(ctx.request.body.home); // 检查url是否符合规范

    await friendsLinkTable.create(ctx.request.body);
    ctx.body = { code: 200, message: "添加友链成功" };
  } catch (error) {
    ctx.body = { code: 400, message: "无效URL" };
  }
};