const Koa = require('koa')
const app = new Koa

const cors = require('@koa/cors')
app.use(cors({
  // origin: "http://localhost:8080",
  credentials: true
}))

const body = require('koa-body')
app.use(body())

const koaStatic = require('koa-static')
app.use(koaStatic("./public"))

const router = require("./routers/router")

//提前配置好session
const session = require('koa-session')
app.keys = ['userInfo']
const CONFIG = {
  key: 'userInfo',
  maxAge: 36e5, // 一小时的有效期
  overwrite: true,
  httpOnly: true,
  singed: true,
  rolling: true,
}

// 处理类似404请求
app.use(async (ctx, next) => {
  await next()
  if (ctx.status >= 400) {
    ctx.body = ctx.status
  }
})


app
  .use(session(CONFIG, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(80)