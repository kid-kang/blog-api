const ArticleTable = require("../../table/articletable")

const getArticle = async ctx => {
    let {id} = ctx.request.query; //文章id
    let doc = await ArticleTable.findById(id); 
    if(!doc) return ctx.body = { code:1, message:"文章id有误，查不到这篇文章"};

    await ArticleTable.findByIdAndUpdate(id, { $inc:{readingNum:1} });//设置readingNum字段值自增1
    //查到文章数据时
    ctx.body = {code:0, message:"查询成功", data:doc};
}

module.exports = getArticle