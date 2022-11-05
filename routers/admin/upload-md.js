const { koaBody } = require('koa-body');
const { resolve } = require('path');
let last_path = '';

let opt = {
  multipart: false,//支持多文件上传
  encoding: "gzip",//接收的文件形式gzip压缩形式 但接收的是没有压缩的
  formidable: {
    maxFileSize: 1024 * 1024 * 100,
    // 保持默认文件后缀名
    keepExtensions: true,
    onFileBegin(name, file) {
      let lastpath = "/" + 'md_' + new Date().getTime() + '.md';
      file.path = resolve(__dirname, "../../public/md") + lastpath;
      last_path = lastpath;
    }
  }
};

const fileOpt = koaBody(opt);

const uploadMd = ctx => {
  ctx.body = {
    code: 200,
    message: "md文件上传成功",
    mdUrl: `/md${last_path}`
  };
};
module.exports = { uploadMd, fileOpt };