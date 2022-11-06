const feedbackTable = require('../../mongodb/feedback');

module.exports = async ctx => {
  const { name, email, message } = ctx.request.body;
  if (name && email && message) {
    //存到数据库中
    await feedbackTable.create({ name, email, message });
    ctx.body = { code: 200, message: "反馈成功" };
  } else {
    ctx.body = { code: 400, message: "姓名、邮箱、内容为必传" };
  }
};