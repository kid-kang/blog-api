const LinkTable = require("../../table/linktable")

const updateLink = async ctx => {
    let {_id, name, home, logo, describe} = ctx.request.body;

    //数据校验： 友链id是否存在  
    
    await LinkTable.findByIdAndUpdate(_id, {name, home, logo, describe}); //到数据表中修改数据
    ctx.body = {code:0, message:"友链修改成功"};
}

module.exports = updateLink