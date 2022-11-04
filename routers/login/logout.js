const logout = async ctx => {
    ctx.session = {}//销毁session
    ctx.cookies.set('userInfo','',{signed:false,maxAge:-1})
    
    ctx.body = {
        code: 9,
        message: "已退出 请重新登录"
    }
}

module.exports = logout