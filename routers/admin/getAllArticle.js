const ArticleTable = require("../../table/articletable")

const getAllArticle = async ctx => {
    let articleDoc = await ArticleTable.find({},{}, {sort: {readingNum:-1}});//阅读数大的排前面
    if(articleDoc.length === 0){
       ctx.body = {code:1,message:"暂无文章，请通知管理员上传文章"};
    }else{
        ctx.body = {code:0,message:"成功获取所有的文章数据",data: articleDoc};
    }
}

module.exports = getAllArticle