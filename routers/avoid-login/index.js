const visitorTable = require('../../mongodb/visitor');

//添加访客
const addVisitor = async userID => {
  //通过id查找访客数据
  let doc = await visitorTable.findOne({ visitor: userID });
  if (doc) {
    //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
    await visitorTable.findOneAndUpdate({ visitor: userID }, { data: Date.now() });
  } else {
    //如果表中不存在该访客数据，添加访客到表中
    await visitorTable.create({ visitor: userID });
  }
};

module.exports = ctx => {
  const data = ctx.session.userInfo;
  if (data) {
    addVisitor(data._id);
    ctx.body = {
      code: 200,
      message: "免登录服务生效",
      data,
    };
  } else {
    ctx.body = {
      code: 400,
      message: "请登录",
    };
  }
};