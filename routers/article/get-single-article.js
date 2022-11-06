const articleTable = require("../../mongodb/article");

module.exports = async ctx => {
  const { id } = ctx.request.query;
  const doc = await articleTable.findById(id);
  if (!doc) return ctx.body = { code: 400, message: "id不存在" };

  //设置readingNum字段值自增1 -> $inc 自增
  await articleTable.findByIdAndUpdate(id, { $inc: { readingNum: 1 } });

  ctx.body = { code: 200, message: "成功获取文章详情", data: doc };
};