const LinkTable = require("../../table/linktable")

const deleteLink = async ctx => {
    console.log(ctx.request.body);
    
    let {_id} = ctx.request.body; //友链id
    // 友链存在，才进行删除
    let linkDoc = await LinkTable.findById(_id);
    if(!linkDoc) return ctx.body = {code:1, message:"你要删除的这条友链不存在，请检查！"};

    await LinkTable.findByIdAndDelete(_id); //根据id删除数据
    ctx.body = {code:0, message:"友链删除成功"};
}
module.exports = deleteLink