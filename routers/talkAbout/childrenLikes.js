const TalkTable = require("../../table/talktable");  //留言表
const { log } = require("../login/log");

const childrenLikes = async ctx => {
  let { parentId, childId, childIndex } = ctx.request.body;
  let parentDoc = await TalkTable.findById(parentId);//父文档
  let childDoc = await parentDoc.children.id(childId);//子文档。当前点赞的子级回复数据

  //父级评论的id是否存在
  if (!parentDoc) return ctx.body = { code: 1, message: "父级评论的id不存在，没有这条父评论" };
  //子级评论的id是否存在
  if (!childDoc) return ctx.body = { code: 1, message: "子级评论的id不存在，没有这条子回复" };

  //修改子评论的likes
  let selfId = ctx.session.userInfo._id; //当前发起请求的用户的id
  //判断用户是否点过赞
  if (childDoc.likes.includes(selfId)) {
    //存在，点过赞了，要取消赞
    await TalkTable.findByIdAndUpdate(parentId, {
      $pull: {
        [`children.${childIndex}.likes`]: selfId
      }
    });
  } else {
    //没点过赞，要点赞
    await TalkTable.findByIdAndUpdate(parentId, {
      $push: {
        [`children.${childIndex}.likes`]: selfId
      }
    });
  }
  ctx.body = {
    code: 0,
    message: "点赞/取消点赞的操作已经完成"
  };
};
module.exports = childrenLikes;