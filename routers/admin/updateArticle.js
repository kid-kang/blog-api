const ArticleTable = require("../../table/articletable")

const updateArticle = async ctx => {
    let {id, doc} = ctx.request.body;
    await ArticleTable.findByIdAndUpdate(id, doc);
    //id是否存在的校验
    ctx.body = {code:0, message:"修改成功"};
}

module.exports = updateArticle