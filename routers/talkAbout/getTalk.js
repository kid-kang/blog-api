const talkTable = require("../../mongodb/talk");

module.exports = async (ctx) => {
  let resDB = await talkTable
    .find({}, {}, { sort: { date: -1 } })
    .populate("author", { password: 0, __v: 0, admin: 0 })
    .populate("children.author", { password: 0, __v: 0, admin: 0 }) //同时查询写子级回复的用户信息;
    .populate("children.toId", { password: 0, __v: 0, admin: 0 }); //查询子级回复里存储的父级评论的用户信息
  ctx.body = {
    code: 200,
    message: "留言请求成功",
    data: resDB
  };
};