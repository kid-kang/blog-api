const linkTable = require("../../mongodb/friends-link");

module.exports = async ctx => {
  let { _id, name, home, logo, describe } = ctx.request.body;

  const doc = await linkTable.findByIdAndUpdate(_id, { name, home, logo, describe }); //到数据表中修改数据
  if (!doc) return ctx.body = { code: 400, message: "友链_id不存在" };
  ctx.body = { code: 200, message: "友链修改成功" };
};