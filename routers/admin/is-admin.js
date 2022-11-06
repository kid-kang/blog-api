// 响应给前端是否是管理员
const isAdmin = ctx => {
  if (ctx.session.userInfo && ctx.session.userInfo.admin) {
    ctx.body = { code: 200, message: "欢迎管理员登录" };
  } else {
    ctx.body = { code: 100, message: "您没有管理员权限" };
  }
};

// 后端中间件 - 判断请求用户是否是管理员在操作
const isAdminMiddleware = (ctx, next) => {
  if (ctx.session.userInfo && ctx.session.userInfo.admin) {
    next();
  } else {
    ctx.body = { code: 100, message: "您没有管理员权限" };
  }
};

module.exports = { isAdmin, isAdminMiddleware };