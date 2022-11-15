const linkTable = require("../../mongodb/friends-link");

module.exports = async ctx => {
  let { id } = ctx.request.body;
  // 友链存在，才进行删除
  let doc = await linkTable.findById(id);
  if (!doc) return ctx.body = { code: 400, message: "友链id不存在" };

  await linkTable.findByIdAndDelete(id);
  ctx.body = { code: 200, message: "友链删除成功" };
};