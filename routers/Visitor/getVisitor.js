const VisitorTable = require('../../table/visitortable')

const getVisitor = async ctx => {
    let doc = await VisitorTable.find().populate("visitor", {password:0});
    ctx.body = { code:0, message:"查询成功", data:doc};
}

module.exports = getVisitor