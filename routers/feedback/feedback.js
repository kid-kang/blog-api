const FeedbackTable = require('../../table/feedbacktable')

const feedback = async ctx => {
    let {name, email, message} = ctx.request.body;
    if(name && email && message){
        //存到数据库中
        await FeedbackTable.create({name, email, message});
        ctx.body = {code: 0, message:"反馈成功"};
    }else{
        ctx.body = {code: 1, message:"反馈的数据不规范"};
    }
}

module.exports = feedback