const articleTable = require("../../mongodb/article");

module.exports = async ctx => {
  const { id } = ctx.params;
  const doc = await articleTable.findByIdAndDelete(id);
  if (!doc) return ctx.body = { code: 400, message: "文章id不存在" };
  ctx.body = { code: 200, message: "删除成功" };
};