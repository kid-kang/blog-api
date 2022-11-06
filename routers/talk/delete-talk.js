const talkTable = require("../../mongodb/talk");

module.exports = async ctx => {
  const { hostId } = ctx.params;
  // 留言存在，才进行删除
  const doc = await talkTable.findById(hostId);
  if (!doc) return ctx.body = { code: 400, message: "hostId不存在" };

  await talkTable.findByIdAndDelete(hostId);
  ctx.body = { code: 200, message: "留言删除成功" };
};