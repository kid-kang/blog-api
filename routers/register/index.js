const userTable = require("../../mongodb/user");

module.exports = async ctx => {
  console.log("注册账号密码：:", ctx.request.body);
  const { user = '', password = '' } = ctx.request.body;
  
  if (/^[a-zA-Z0-9_]{3,18}$/.test(user) && /^[a-zA-Z0-9_]{6,18}$/.test(password)) {
    let resDB = await userTable.findOne({ user });
    if (resDB) {
      //有存在相同用户数据
      ctx.body = {
        code: 100,
        message: "用户已存在"
      };
    } else {
      await userTable.create({ user, password });
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