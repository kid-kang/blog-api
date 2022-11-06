const userTable = require("../../mongodb/user");

//修改密码
module.exports = async ctx => {
  let { oldPassword, newPassword } = ctx.request.body;

  if (/^[a-zA-Z0-9_]{6,18}$/.test(newPassword)) {
    //传过来的新密码和旧密码是否一致
    if (oldPassword === newPassword) {
      return ctx.body = {
        code: 100,
        message: "新旧密码不能相同"
      };
    }

    //判断旧密码 是否 和数据库里的密码一致
    let doc = await userTable.findById(ctx.session.userInfo.id);
    if (doc.password !== oldPassword) {
      return ctx.body = {
        code: 100,
        message: "旧密码输入不正确"
      };
    }

    //到数据库中修改密码内容
    await userTable.findByIdAndUpdate(ctx.session.userInfo.id, { password: newPassword });
    //销毁当前的session，因为修改密码后必须重新登录
    ctx.session = {};
    ctx.body = {
      code: 200,
      message: "密码修改成功，请重新登录"
    };
  } else {
    ctx.body = {
      code: 400,
      message: "密码由数字、字母及下划线组成"
    };
  }
};