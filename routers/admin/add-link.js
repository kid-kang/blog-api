const friendsLinkTable = require("../../mongodb/friends-link");
const { URL } = require("url");

module.exports = async ctx => {
  //数据格式的校验： 鉴定各字段是否为空;  鉴定2个home是否为home的格式

  let { origin } = new URL(ctx.request.body.home);
  //根据正则匹配查询home字段值里有没有同一个网站的友链
  let resDB = await friendsLinkTable.findOne({ home: new RegExp(origin) });
  if (resDB) return ctx.body = { code: 100, message: "请不要重复添加相同网站下的友链！" };

  await friendsLinkTable.create(ctx.request.body);
  ctx.body = { code: 200, message: "添加友链成功" };
};