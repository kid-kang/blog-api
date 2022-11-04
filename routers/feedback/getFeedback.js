const FeedbackTable = require('../../table/feedbacktable')

const getFeedback = async ctx => {
    let doc = await FeedbackTable.find();
    if(doc.length === 0){
        ctx.body = {code:6, message:"没有反馈数据"};
    }else{
        ctx.body = {code:0, message:"获取反馈数据成功", data:doc};
    }
}

module.exports = getFeedback