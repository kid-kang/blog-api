const userTable = require("../../mongodb/user");
const visitorTable = require('../../mongodb/visitor');

//添加访客
async function addVisitor(userID) {
  //通过id查找访客数据
  let resDB = await visitorTable.findOne({ visitor: userID });
  if (resDB) {
    //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
    await visitorTable.findOneAndUpdate({ visitor: userID }, { date: Date.now() });

  } else {
    //如果表中不存在该访客数据，添加访客到表中
    await visitorTable.create({ visitor: userID });
  }
}

const setState = (ctx, userInfo) => {
  // session在一开始就写好配置  而cookie要在登录时写
  // 写cookie时不能出现中文，需要进行URI编码
  const cookieConfig = {
    domain: "localhost",
    path: '/',
    maxAge: 36e5,
    httpOnly: false,
    overwrite: true
  };
  // userInfo.user = encodeURIComponent(userInfo.user)
  // 后端做规则验证
  ctx.cookies.set('userInfo', userInfo, cookieConfig);

  ctx.session = {
    userInfo
  };
};

const login = async ctx => {
  console.log("登录:", ctx.request.body);
  const { user = '', password = '' } = ctx.request.body;

  if (/^[a-zA-Z0-9_]{3,18}$/.test(user) && /^[a-zA-Z0-9_]{6,18}$/.test(password)) {
    //验证用户名和密码是否正确
    let resDB = await userTable.findOne({ user });
    if (!resDB) { // null ->  用户不存在
      ctx.body = {
        code: 100,
        message: "用户不存在，请先注册"
      };
      return;
    }

    if (resDB.password === password) {
      let userInfo = {
        user: resDB.user,
        _id: resDB._id,
        photo: resDB.avatar,
        admin: resDB.admin,
      };

      setState(ctx, userInfo);
      addVisitor(resDB._id);

      ctx.body = {
        code: 200,
        message: "登陆成功",
        data: userInfo
      };

    } else {
      ctx.body = {
        code: 100,
        message: "密码错误"
      };
      return;
    }

  } else {
    ctx.body = {
      code: 400,
      message: "用户名和密码由数字、字母及下划线组成"
    };
  }
};

// 保持用户登录的活性【同步cookie和session】
const keepLogin = async (ctx, next) => {
  if (ctx.session.isNew) { // true session不存在  false 有session
    let user = ctx.cookies.get("userInfo");
    if (user) { // true = 登录成功时设置的值，false=空字符串
      // 同步session
      ctx.session = {
        userInfo
      };
    }
  }
  // 上面已经同步了cookie和session，把控制权交到路由对应的处理中间手中
  await next();
};


module.exports = { keepLogin, login };