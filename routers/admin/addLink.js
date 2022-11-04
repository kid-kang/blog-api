const LinkTable = require("../../table/linktable")
const {URL} = require("url");

const addLink = async ctx => {
    //数据格式的校验： 鉴定各字段是否为空;  鉴定2个url是否为url的格式
    console.log(ctx.request.body);
    
    let {origin} = new URL(ctx.request.body.home);
    //根据正则匹配查询home字段值里有没有同一个网站的友链
    let linkDoc = await LinkTable.findOne({home: new RegExp(origin)}); 
    if(linkDoc) return ctx.body = {code:10, message:"请不要重复添加相同网站下的友链！"};

    await LinkTable.create(ctx.request.body);
    ctx.body = {code:0, message:"添加友链成功"};
}

module.exports = addLink