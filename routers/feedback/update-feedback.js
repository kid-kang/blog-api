const feedbackTable = require('../../mongodb/feedback');

module.exports = async ctx => {
  const { id, reading } = ctx.request.body;
  const doc = await feedbackTable.findByIdAndUpdate(id, { reading });
  if(!doc) return ctx.body = { code: 400, message: "id不存在" };
  ctx.body = { code: 200, message: "成功修改状态" };
};