const linkTable = require("../../mongodb/friends-link");

module.exports = async ctx => {
  let doc = await linkTable.find();
  ctx.body = {
    code: 200,
    data: doc
  };
};