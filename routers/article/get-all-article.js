const articleTable = require("../../mongodb/article");

module.exports = async ctx => {
  //阅读数大的排前面
  const doc = await articleTable
    .find({}, {}, { sort: { readingNum: -1 } })
    .populate("author", { password: 0, __v: 0, admin: 0 });
  if (doc.length === 0) {
    ctx.body = { code: 100, message: "暂无文章" };
  } else {
    ctx.body = { code: 200, data: doc };
  }
};