const TalkTable = require("../../table/talktable")  //留言表
const likes =  async ctx => {
    let {fatherId} = ctx.request.body; //评论fatherId
    //判断fatherId存不存在
    if(!fatherId){
        return ctx.body = {
            code:1,
            message:"你没发评论的fatherId过来"
        };
    }

    let commentDoc = await TalkTable.findById(fatherId);
    //判断commentDoc存不存在
    if(!commentDoc){
        return ctx.body = {
            code:1,
            message:"你发过来的评论fatherId在数据库中查找不到"
        };
    }

    let userId = ctx.session.userInfo._id; //当前发起请求的用Id
    //判断用户是否点过赞 / 判断当前点击按钮的用户是否存在likes数组中
    if(commentDoc.likes.includes(userId)){
        //存在，点过赞了，要取消赞
        await TalkTable.findByIdAndUpdate(fatherId, {$pull:{likes:userId}}); //在数组中删除该用户Id
    }else{
        //没点过赞，要点赞
        await TalkTable.findByIdAndUpdate(fatherId, {$push:{likes:userId}}); //在数组中删除该用户Id
    }
    ctx.body = {
        code:0,
        message:"点赞/取消点赞的操作已经完成"
    }
}

module.exports = likes