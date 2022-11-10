const userTable = require("../../mongodb/user");

module.exports = async ctx => {
  console.log("注册账号密码：:", ctx.request.body);
  const { user = '', password = '', name } = ctx.request.body;

  if (!/([a-zA-Z0-9_]{1,16})|([\u4e00-\u9fa5]{2,8})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,12})/.test(name)) {
    return ctx.body = {
      code: 100,
      message: "昵称超出规定范围"
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