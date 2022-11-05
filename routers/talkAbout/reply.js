const talkTable = require("../../mongodb/talk");
const userTable = require("../../mongodb/user");

module.exports = async ctx => {
  const { hostId, content, toId } = ctx.request.body;
  //判断数据格式：数据是否为空 / 数据长度是否超过200
  if (!content) return ctx.body = { code: 100, message: "内容为空" };
  if (content.length > 200) return ctx.body = { code: 400, message: "内容超过200" };

  // 判断当前这条父评论是否存在    父级评论的作者是否存在
  const resDB1 = await talkTable.findById(hostId);
  if (!resDB1) return ctx.body = { code: 400, message: "hostId不存在" };
  const resDB2 = await userTable.findById(toId);
  if (!resDB2) return ctx.body = { code: 400, message: "toId不存在" };

  await talkTable.findByIdAndUpdate(hostId, {  //往这条父评论下的children数组中添加回复数据
    $push: {
      children: {
        content,
        author: ctx.session.userInfo._id,
        toId
      }
    }
  });
  ctx.body = { code: 200, message: "回复成功" };
};