const LinkTable = require("../../table/linktable")

const getLinkData = async ctx => {
    let linkDoc = await LinkTable.find();
    ctx.body = {
        code:0,
        message:"成功获取友链数据",
        data: linkDoc
    };
}

module.exports = getLinkData