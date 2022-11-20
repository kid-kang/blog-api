const Koa = require('koa');
const app = new Koa;

const cors = require('@koa/cors');
app.use(cors({
  // origin: "http://localhost:8080",
  credentials: true
}));

const { koaBody } = require('koa-body');
app.use(koaBody());

const koaStatic = require('koa-static');
app.use(koaStatic("./public"));

const router = require("./routers/router");

//提前配置好session
const session = require('koa-session');
app.keys = ['userInfo'];
const CONFIG = {
  key: 'userInfo',
  maxAge: 6048e5, // 七天的有效期
  overwrite: true,
  httpOnly: true,
  singed: true,
  rolling: true,
};

// 处理类似404请求
app.use(async (ctx, next) => {
  await next();
  if (ctx.status >= 400) {
    ctx.body = ctx.status;
  }
});

app
  .use(session(CONFIG, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3300);

// 根据项目的路径导入生成的证书文件
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, './certificate/private.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './certificate/certificate.pem'), 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
};

const https = require('https');
const httpsServer = https.createServer(credentials, app.callback());
// 设置https的访问端口号
const SSLPORT = 3301;

// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
  console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`);
});