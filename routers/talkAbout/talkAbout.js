const TalkTable = require("../../table/talktable")  //留言表

//鉴权：判断用户是否在线（登录）
const root = async (ctx,next) => {
    if (ctx.session.userInfo) { next(); } else {
        return ctx.body = {
            code: 7,
            message: "用户未登录，不能发表留言"
        }
    }
}

//发表留言
const talkAbout = async ctx => {
    let msg = ctx.request.body.textarea.trim()
    //验证数据格式是否正确
    if(!msg || msg.length > 200){
        return ctx.body = {
            code:1,
            message:"你发表的评论内容格式不正确！"
        };
    }
    //将评论存到数据库
    TalkTable.create({
        content: msg,
        author: ctx.session.userInfo._id  //发表这条评论的作者id
    })
    ctx.body = {
        code:0,
        message:"评论发表成功"
    }
}
module.exports = {talkAbout,root}