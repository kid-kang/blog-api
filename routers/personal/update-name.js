const userTable = require("../../mongodb/user");

module.exports = async ctx => {
  let { name } = ctx.request.body;

  if (!(/^([a-zA-Z0-9\u4e00-\u9fa5]{2,8})$/.test(name) || /^([a-zA-Z0-9_\s]{3,20})$/.test(name))) {
    return ctx.body = {
      code: 400,
      message: "昵称不符合规范"
    };
  }

  if (name === ctx.session.userInfo.name) {
    return ctx.body = {
      code: 100,
      message: "昵称一致"
    };
  }

  //修改数据库中该数据的用户名
  await userTable.findByIdAndUpdate(ctx.session.userInfo._id, { name });
  //更新session里存储的用户的名字
  ctx.session.userInfo.name = name;
  ctx.body = {
    code: 200,
    message: "修改成功",
    data: ctx.session.userInfo   //提供最新的用户信息给前端
  };
};