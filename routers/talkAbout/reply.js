const TalkTable = require("../../table/talktable")  //留言表
const UserTable = require("../../table/usertable")

const reply = async ctx => {
    let {fatherId, content, toId} = ctx.request.body; //获取前端发来的请求数据
    //判断数据格式：数据是否为空 / 数据长度是否超过100
    if(!content) return ctx.body = {code:1, message:"回复的内容为空"};
    if(content.length > 100) return ctx.body = {code:2, message:"回复的内容超过100了"};

    // 判断当前这条父评论是否存在    父级评论的作者是否存在...............先不写
    let doc1 = await TalkTable.findById(fatherId)
    if(!doc1) return ctx.body = {code:1, message:"评论id错误"};
    let doc2 = await UserTable.findById(toId);
    if(!doc2) return ctx.body = {code:3, message:"你要回复的用户的id错误，用户不存在"};

    await TalkTable.findByIdAndUpdate(fatherId, {  //往这条父评论下的children数组中添加回复数据
        $push:{
            children:{
                content,
                author: ctx.session.userInfo._id,  //selfId
                toId  //被回复的那个人Id
            }
        }
    });
    ctx.body = {code:0, message:"回复成功"}
}

module.exports = reply