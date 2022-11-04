const UserTable = require("../../table/usertable")

const personal = async ctx => {
    let {user} = ctx.request.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)){
        // 判断新名字与数据库里的名字是否一致
        if(user === ctx.session.userInfo.user){
            return ctx.body = {
                code: 2, 
                message:"新用户名与原用户名是相同的，不可以修改"
            }
        }

        //验证用户名重名
        let userDoc = await UserTable.findOne({user});
        
        if(userDoc){
            return ctx.body = {
                code: 3, 
                message:"该用户名已经被别人用了，请更换一个"
            }
        }

        //修改数据库中该数据的用户名
        await UserTable.findByIdAndUpdate(ctx.session.userInfo._id, {user});

        //更新session里存储的用户的名字
        ctx.session.userInfo.user = user;
        ctx.body = {
            code: 0, 
            message:"修改成功",
            data:ctx.session.userInfo   //提供最新的用户信息给前端
        }

    }else{
        ctx.body = {
            code: 1,
            message:"你发过来的数据格式不规范"
        }
    }
}

module.exports = personal