const talkTable = require("../../mongodb/talk");

//鉴权：判断用户是否在线（登录）
const root = async (ctx, next) => {
  if (ctx.session.userInfo) { next(); } else {
    return ctx.body = {
      code: 400,
      message: "请登录后再留言"
    };
  }
};

//发表留言
const addTalk = async ctx => {
  let msg = ctx.request.body.textarea.trim();
  //验证数据格式是否正确
  if (!msg) {
    return ctx.body = {
      code: 400,
      message: "内容不符"
    };
  }
  //将评论存到数据库
  talkTable.create({
    content: msg,
    author: ctx.session.userInfo.id  //发表这条评论的作者id
  });
  ctx.body = {
    code: 200,
    message: "留言发表成功"
  };
};
module.exports = { addTalk, root };