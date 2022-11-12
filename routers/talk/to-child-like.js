const talkTable = require("../../mongodb/talk");

module.exports = async ctx => {
  const { hostId, childId, childIndex } = ctx.request.body;
  const hostDB = await talkTable.findById(hostId);
  const childReply = await hostDB.children.id(childId); //当前点赞的子级回复数据
  // mongoDB做了处理,有属性为数组对象的话,每个对象就定义为子文档，子文档有自己的_id, 并且在属性上可以调用.id(_id)方法查询某个子文档

  //父级评论的id是否存在
  if (!hostDB) return ctx.body = { code: 400, message: "hostDB不存在" };
  //子级评论的id是否存在
  if (!childReply) return ctx.body = { code: 400, message: "childId不存在" };

  //修改子评论的likes
  const selfId = ctx.session.userInfo._id; //当前发起请求的用户的id
  //判断用户是否点过赞
  if (childReply.likes.includes(selfId)) {
    //存在，点过赞了，要取消赞
    await talkTable.findByIdAndUpdate(hostId, {
      $pull: {
        // 属性要用[]来识别 - mongo语法：数组下标用.下标来查询
        [`children.${childIndex}.likes`]: selfId
      }
    });
    ctx.body = {
      code: 200,
      message: "取消点赞"
    };
  } else {
    //没点过赞，要点赞
    await talkTable.findByIdAndUpdate(hostId, {
      $push: {
        [`children.${childIndex}.likes`]: selfId
      }
    });
    ctx.body = {
      code: 200,
      message: "已点赞"
    };
  }
};