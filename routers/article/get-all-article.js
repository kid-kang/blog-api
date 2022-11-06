const articleTable = require("../../mongodb/article");

module.exports = async ctx => {
  //阅读数大的排前面
  const doc = await articleTable.find({}, {}, { sort: { readingNum: -1 } });
  if (doc.length === 0) {
    ctx.body = { code: 100, message: "暂无文章，请通知管理员上传文章" };
  } else {
    ctx.body = { code: 200, message: "成功获取所有的文章数据", data: doc };
  }
};