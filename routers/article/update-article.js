const articleTable = require("../../mongodb/article");

module.exports = async ctx => {
  const { id, doc } = ctx.request.body;
  const res = await articleTable.findByIdAndUpdate(id, doc);
  //id是否存在的校验
  if (!res) return ctx.body = { code: 400, message: "文章id不存在" };
  ctx.body = { code: 0, message: "修改成功" };
};