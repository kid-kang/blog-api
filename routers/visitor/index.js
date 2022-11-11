const visitorTable = require('../../mongodb/visitor');

module.exports = async ctx => {
  const doc = await visitorTable.find().populate("visitor", { password: 0 });
  ctx.body = { code: 200, data: doc };
};