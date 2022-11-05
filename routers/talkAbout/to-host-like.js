const talkTable = require("../../mongodb/talk");

module.exports = async ctx => {
  let { hostId } = ctx.request.body;  // 该留言宿主的id
  //判断hostId存不存在
  if (!hostId) {
    return ctx.body = {
      code: 400,
      message: "请传入hostId"
    };
  }

  let resDB = await talkTable.findById(hostId);
  //判断resDB存不存在
  if (!resDB) {
    return ctx.body = {
      code: 400,
      message: "hostId不存在"
    };
  }

  let userId = ctx.session.userInfo._id; //当前发起请求的用Id
  //判断用户是否点过赞 - 判断当前点击按钮的用户是否存在likes数组中
  if (resDB.likes.includes(userId)) {
    //存在，点过赞了，则要取消赞
    await talkTable.findByIdAndUpdate(hostId, { $pull: { likes: userId } }); //在数组中删除该用户Id
    ctx.body = {
      code: 200,
      message: "已取消点赞"
    };
  } else {
    //没点过赞，要点赞
    await talkTable.findByIdAndUpdate(hostId, { $push: { likes: userId } }); //在数组中删除该用户Id
    ctx.body = {
      code: 200,
      message: "已点赞"
    };
  }
};