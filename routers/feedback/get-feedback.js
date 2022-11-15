const feedbackTable = require('../../mongodb/feedback');

module.exports = async ctx => {
  let doc = await feedbackTable.find();
  if (doc.length === 0) {
    ctx.body = { code: 100, message: "无反馈数据" };
  } else {
    ctx.body = { code: 200, data: doc };
  }
};