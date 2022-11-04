const isAdmin =  (ctx) => {
    if(ctx.session.userInfo && ctx.session.userInfo.admin){
        ctx.body = {code:0, message:"欢迎管理员登录"};
    }else{
        //非管理员
        ctx.body = {code:6, message:"您没有管理员权限，请以管理员的账号登录"};
    }
}

module.exports = isAdmin