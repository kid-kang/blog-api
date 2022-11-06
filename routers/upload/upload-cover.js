const { koaBody } = require('koa-body');
const { resolve } = require('path');
let last_path = '';

let opt = {
  multipart: false,//支持多文件上传
  encoding: "gzip",
  formidable: {
    maxFileSize: 1024 * 1024 * 5,
    // 保持默认文件后缀名
    keepExtensions: true,
    onFileBegin(name, file) {
      let lastpath = "/" + 'cover_' + new Date().getTime() + '.jpg';
      file.path = resolve(__dirname, "../../public/cover") + lastpath;
      last_path = lastpath;
    }
  }
};

let coverFileOpt = koaBody(opt);

const uploadCover = ctx => {
  ctx.body = {
    code: 200,
    message: "封面图片上传成功",
    coverUrl: `/cover${last_path}`
  };
};
module.exports = { uploadCover, coverFileOpt };