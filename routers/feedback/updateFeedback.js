const FeedbackTable = require('../../table/feedbacktable')

const updateFeedback = async ctx => {
    let {id, reading} = ctx.request.body;
    //数据校验id是否存在
    await FeedbackTable.findByIdAndUpdate(id, {reading});
    ctx.body = {code:0, message:"成功修改状态"};
}

module.exports = updateFeedback