const UserTable = require("../../table/usertable")

//修改密码
const pass = async ctx=>{
    let {oldPassword,newPassword} = ctx.request.body;
    
    if(/^[a-zA-Z]\w{5,17}$/.test(newPassword)){

        //传过来的新密码和旧密码是否一致
        if(oldPassword === newPassword){
            return ctx.body = {
                code: 6, 
                message:"新旧密码不能相同"
            };
        }

        //判断旧密码 是否 和数据库里的密码一致
        let doc = await UserTable.findById(ctx.session.userInfo._id);
        if(doc.password !== oldPassword){ //不一致
            return ctx.body = {
                code: 5, 
                message:"旧密码不正确"
            };
        }

        //到数据库中修改密码内容
        await UserTable.findByIdAndUpdate(ctx.session.userInfo._id, {password:newPassword});
        ctx.session = {}; //销毁当前的session，因为修改密码后必须重新登录
        ctx.body = {
            code: 0, 
            message:"密码修改成功，请重新登录"
        }
    }else{
        ctx.body = {
            code: 4, 
            message:"你发过来的数据格式不规范"
        }
    }
};
module.exports = pass