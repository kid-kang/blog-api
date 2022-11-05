const linkTable = require("../../mongodb/friends-link");

module.exports = async ctx => {
  let { _id } = ctx.request.body;
  // 友链存在，才进行删除
  let linkDoc = await linkTable.findById(_id);
  if (!linkDoc) return ctx.body = { code: 400, message: "_id不存在" };

  await linkTable.findByIdAndDelete(_id);
  ctx.body = { code: 200, message: "友链删除成功" };
};