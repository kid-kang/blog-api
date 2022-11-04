const ArticleTable = require("../../table/articletable")

const deleteArticle = async ctx => {
    let {id} = ctx.params;
    console.log(id);
    await ArticleTable.findByIdAndDelete(id);//到表中删除文章数据
    //id是否存在的校验
    ctx.body = {code:0, message:"删除成功"};
}

module.exports = deleteArticle