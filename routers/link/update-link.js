const linkTable = require("../../mongodb/friends-link");

module.exports = async ctx => {
  let { id, name, home, logo, describe } = ctx.request.body;

  const doc = await linkTable.findByIdAndUpdate(id, { name, home, logo, describe }); //到数据表中修改数据
  if (!doc) return ctx.body = { code: 400, message: "友链id不存在" };
  ctx.body = { code: 200, message: "友链修改成功" };
};