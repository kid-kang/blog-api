const VisitorTable = require('../../table/visitortable')

//添加访客
const addVisitor = async (userID)=>{
    //通过id查找访客数据
    let doc = await VisitorTable.findOne({visitor:userID});
    if(doc){
        //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
        await VisitorTable.findOneAndUpdate({visitor:userID}, {data:Date.now()});
    }else{
        //如果表中不存在该访客数据，添加访客到表中
        await VisitorTable.create({visitor:userID});
    }
}

const isCheck =  ctx => {
    
    let data = ctx.session.userInfo;
    
    if(data){
        // console.log(data._id,'这是免登录cookie里的id');
        addVisitor(data._id)
        ctx.body = {
            code: 0,
            message: "根据上次登录信息直接登录",
            data,
        };
    }else{
        ctx.body = {
            code: 1,
            message: "未登录",
            // data: {}
        };
    }
}
module.exports = isCheck