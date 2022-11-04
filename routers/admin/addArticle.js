const ArticleTable = require("../../table/articletable")

const addArticle = async ctx => {
    let {title, describe, mdUrl, coverUrl} = ctx.request.body;
    //将文章数据存到数据表
    let doc = await ArticleTable.create({ 
        title: title || undefined,
        describe: describe || undefined,
        mdUrl,
        coverUrl: coverUrl  || undefined,
        author:ctx.session.userInfo._id
    });
    ctx.body = {code:0, message:"文章发表成功", data:{id:doc._id}};  //返回文章id
}

module.exports = addArticle