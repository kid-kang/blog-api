const userTable = require("../../mongodb/user");

module.exports = async ctx => {
  let { user } = ctx.request.body;
  if (/^[a-zA-Z0-9_]{3,18}$/.test(user)) {
    // 判断新名字与数据库里的名字是否一致
    if (user === ctx.session.userInfo.user) {
      return ctx.body = {
        code: 100,
        message: "用户名一致"
      };
    }

    //验证用户名重名
    let resDB = await userTable.findOne({ user });

    if (resDB) {
      return ctx.body = {
        code: 100,
        message: "用户名已存在"
      };
    }

    //修改数据库中该数据的用户名
    await userTable.findByIdAndUpdate(ctx.session.userInfo._id, { user });

    //更新session里存储的用户的名字
    ctx.session.userInfo.user = user;
    ctx.body = {
      code: 200,
      message: "修改成功",
      data: ctx.session.userInfo   //提供最新的用户信息给前端
    };

  } else {
    ctx.body = {
      code: 400,
      message: "用户名由数字、字母及下划线组成"
    };
  }
};