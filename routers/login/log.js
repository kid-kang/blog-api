const UserTable = require("../../table/usertable")
const VisitorTable = require('../../table/visitortable')

//添加访客
async function addVisitor(userID){
    //通过id查找访客数据
    let doc = await VisitorTable.findOne({visitor:userID});
    if(doc){
        //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
        await VisitorTable.findOneAndUpdate({visitor:userID}, {date:Date.now()});
        // console.log(Date.now(),'时间改变');
        
    }else{
        //如果表中不存在该访客数据，添加访客到表中
        await VisitorTable.create({visitor:userID});
    }
}

const setState = (ctx, userInfo) => {
    // session在一开始就写好配置  而cookie要在登录时写
    // 写cookie时不能出现中文，中文不允许写入cookie会报错，需要进行URI编码
    const cookieConfig = {
      domain: "localhost",
      path: '/',
      maxAge: 36e5,
      httpOnly: false,
      overwrite: true
    }
    // userInfo.user = encodeURIComponent(userInfo.user)
    // 后端做规则验证
    ctx.cookies.set('userInfo', userInfo, cookieConfig)
  
    ctx.session = {
        userInfo
    }
}

const log = async ctx => {
    console.log("登录:", ctx.request.body);
    let { user, password } = ctx.request.body
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,8}$/.test(user) && /.{6,18}/.test(password) && password.match(/\d+/) && password.match(/\D+/)) {
        //验证用户名和密码是否正确
        let userDoc = await UserTable.findOne({ user });
        // null
        //用户不存在
        if (!userDoc) {
           ctx.body = {
                code: 2,
                message: "用户不存在，请先注册"
            };
            return
        }

        if (userDoc.password === password) {
            let userInfo = {
                user: userDoc.user,
                _id: userDoc._id,
                photo: userDoc.head_photo,
                admin: userDoc.admin,
            }

            setState(ctx, userInfo)
            addVisitor(userDoc._id)
            
            //密码正确  登录成功
            ctx.body = {
                code: 0,
                message: "登陆成功",
                data: userInfo
            };
            
        } else {
            //密码错误
            ctx.body = {
                code: 3,
                message: "密码错误"
            };
            return
        }

    } else {
        ctx.body = {
            code: 1, //你发过来的数据格式不规范
            message: "你发过来的数据格式不规范"
        }
    }
}

// 保持用户登录的活性【同步cookie和session】
const keepLog = async (ctx, next) => {
    if (ctx.session.isNew) { // true session不存在  false 有session
      let user = ctx.cookies.get("userInfo")
      if (user) { // true = 登录成功时设置的值，false=空字符串
        // 同步session
        ctx.session = {
            userInfo
        }
      }
    }
    // 上面已经同步了cookie和session，把控制权交到路由对应的处理中间手中
    await next()
}


module.exports = {keepLog,log}