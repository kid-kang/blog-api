module.exports = ctx => {
  //销毁session
  ctx.session = {};
  ctx.cookies.set('userInfo', '', { signed: false, maxAge: -1 });

  ctx.body = {
    code: 200,
    message: "已退出登录"
  };
};