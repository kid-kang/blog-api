module.exports = (ctx) => {
  if (ctx.session.userInfo && ctx.session.userInfo.admin) {
    ctx.body = { code: 200, message: "欢迎管理员登录" };
  } else {
    ctx.body = { code: 100, message: "您没有管理员权限" };
  }
};