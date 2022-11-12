const articleTable = require("../../mongodb/article");

module.exports = async ctx => {
  const { title, describe, mdUrl, coverUrl } = ctx.request.body;
  //将文章数据存到数据表
  const doc = await articleTable.create({
    title: title || undefined,
    describe: describe || undefined,
    mdUrl,
    coverUrl: coverUrl || undefined,
    author: ctx.session.userInfo._id
  });
  ctx.body = { code: 200, message: "文章发表成功", data: { id: doc._id } };  //返回文章id
};