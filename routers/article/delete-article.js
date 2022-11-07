const articleTable = require("../../mongodb/article");
const { resolve } = require('path');
const fs = require("fs");

module.exports = async ctx => {
  const { id } = ctx.params;

  //删除对应的文件
  const doc = await articleTable.findById(id);
  const coverPath = resolve(__dirname, "../../public/cover") + doc.coverUrl;
  const mdPath = resolve(__dirname, "../../public/md") + doc.mdUrl;

  fs.unlink(coverPath, err => {
    if (err) console.log('cover文件:' + coverPath + '删除失败！');
    console.log('cover文件:' + coverPath + '删除成功！');
  });
  fs.unlink(mdPath, err => {
    if (err) console.log('md文件:' + mdPath + '删除失败！');
    console.log('md文件:' + mdPath + '删除成功！');
  });

  const res = await articleTable.findByIdAndDelete(id);
  if (!res) return ctx.body = { code: 400, message: "文章id不存在" };
  ctx.body = { code: 200, message: "删除成功" };
};