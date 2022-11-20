const userTable = require("../../mongodb/user");

module.exports = async ctx => {
  const { user = '', password = '', name = '' } = ctx.request.body;

  if (!(/^([a-zA-Z0-9\u4e00-\u9fa5]{2,8})$/.test(name) || /^([a-zA-Z0-9_\s]{3,20})$/.test(name))) {
    return ctx.body = {
      code: 100,
      message: "昵称不符合规范"
    };
  }

  if (/^[a-zA-Z0-9_]{5,18}$/.test(user) && /^[a-zA-Z0-9_]{6,18}$/.test(password)) {
    let doc = await userTable.findOne({ user });
    if (doc) {
      //有存在相同用户数据
      ctx.body = {
        code: 100,
        message: "用户已存在"
      };
    } else {
      await userTable.create({ name, user, password });
      ctx.body = {
        code: 200,
        message: "注册成功"
      };
    }
  } else {
    ctx.body = {
      code: 400,
      message: "用户名和密码由数字、字母及下划线组成"
    };
  }
};